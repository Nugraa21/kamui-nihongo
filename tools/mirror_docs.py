import shutil
import os

src = "website"
dst = "docs"

if os.path.exists(dst):
    shutil.rmtree(dst)

shutil.copytree(src, dst)
print("Mirrored website/ to docs/ for GitHub Pages zero-config hosting!")
