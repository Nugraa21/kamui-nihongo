import os
from PIL import Image

src_dir = r"website\assets\images\screenshots"
for i in range(1, 14):
    p = os.path.join(src_dir, f"screenshot-{i}.png")
    with Image.open(p) as img:
        # Check colors or save a very small ascii description
        print(f"screenshot-{i}.png: {img.size}")
