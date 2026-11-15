with open('nihongo-app/src/scripts/stroke.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip().startswith('function'):
        print(f"Line {i+1}: {line.strip()}")
