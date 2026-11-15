import os
import shutil

src_dir = r"nihongo-app\assets\sowfwereimgpreveu"
dest_dir = r"website\assets\images\screenshots"
os.makedirs(dest_dir, exist_ok=True)

files = sorted(os.listdir(src_dir))
for idx, f in enumerate(files):
    src_file = os.path.join(src_dir, f)
    dest_file = os.path.join(dest_dir, f"screenshot-{idx+1}.png")
    shutil.copy(src_file, dest_file)
    print(f"Copied {f} -> screenshot-{idx+1}.png")

print(f"Successfully copied {len(files)} screenshots to {dest_dir}")
