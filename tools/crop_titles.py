import os
from PIL import Image

dir_path = r'nihongo-app\assets\sowfwereimgpreveu'
files = sorted(os.listdir(dir_path))

for idx, f in enumerate(files):
    full = os.path.join(dir_path, f)
    with Image.open(full) as img:
        # let's crop the page title (roughly x: 260 to 700, y: 70 to 140)
        crop = img.crop((260, 60, 800, 140))
        # let's save thumbnails in a temp directory
        os.makedirs('temp_thumbs', exist_ok=True)
        crop.save(f'temp_thumbs/crop_{idx+1}.png')
print("Saved cropped title images")
