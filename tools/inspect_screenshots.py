import os
from PIL import Image

src_dir = r"nihongo-app\assets\sowfwereimgpreveu"
files = sorted(os.listdir(src_dir))
for f in files:
    full = os.path.join(src_dir, f)
    with Image.open(full) as img:
        print(f"{f} -> Size: {img.size}, Mode: {img.mode}")
