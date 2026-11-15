with open('nihongo-app/src/scripts/stroke.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
for i in range(235, 340):
    if i < len(lines):
        print(f"{i+1}: {lines[i]}")
