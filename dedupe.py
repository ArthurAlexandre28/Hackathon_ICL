"""pptxgenjs writes a fresh media part per addImage() call, even for identical
data. Collapse them to one part per distinct image and repoint the rels."""
import hashlib, re, shutil, sys, zipfile

src, dst = sys.argv[1], sys.argv[2]
zin = zipfile.ZipFile(src)

media = {n: zin.read(n) for n in zin.namelist() if re.match(r"ppt/media/.+\.(png|jpg|jpeg|gif)$", n)}
canon, alias = {}, {}
for name in sorted(media):
    h = hashlib.sha256(media[name]).hexdigest()
    if h in canon:
        alias[name] = canon[h]
    else:
        canon[h] = name

if not alias:
    shutil.copyfile(src, dst)
    print("nothing to dedupe")
    sys.exit()

drop = set(alias)
with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        if item.filename in drop:
            continue
        data = zin.read(item.filename)
        if item.filename.endswith(".rels"):
            txt = data.decode("utf-8")
            for old, new in alias.items():
                txt = txt.replace("../media/" + old.split("/")[-1],
                                  "../media/" + new.split("/")[-1])
            data = txt.encode("utf-8")
        zout.writestr(item, data)

print(f"{len(media)} media parts -> {len(canon)} unique ({len(drop)} removed)")
