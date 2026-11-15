import re

with open('nihongo-app/src/scripts/stroke.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"([^"\n]+)":\s*\[', text)
print('Total keys in STROKE_VECTORS:', len(matches))
print('Sample keys:', matches[:40])

# Check renderStrokeOrder function
if 'renderStrokeOrder' in text:
    print("renderStrokeOrder found!")
else:
    print("renderStrokeOrder NOT found!")
