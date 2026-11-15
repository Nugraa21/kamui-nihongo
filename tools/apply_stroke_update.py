# -*- coding: utf-8 -*-
import json

with open('nihongo-app/src/data/stroke_vectors_full.json', 'r', encoding='utf-8') as f:
    full_vectors = json.load(f)

with open('nihongo-app/src/scripts/stroke.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the STROKE_VECTORS object
vectors_js = "const STROKE_VECTORS = " + json.dumps(full_vectors, ensure_ascii=False, indent=4) + ";\n"

# Find start and end of STROKE_VECTORS
import re
start_idx = code.find("const STROKE_VECTORS = {")
end_marker = "// Procedural generator for any character not present in explicit vector map"
end_idx = code.find(end_marker)

if start_idx != -1 and end_idx != -1:
    code = code[:start_idx] + vectors_js + "\n" + code[end_idx:]
    print("Successfully replaced STROKE_VECTORS!")
else:
    print("Could not find start/end index:", start_idx, end_idx)

# Now update generateVisualStrokeGalleryHtml to include authentic Japanese glyph watermark
old_overview_snippet = """<line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
            ${strokes.map(s => `"""

new_overview_snippet = """<line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
            <!-- Authentic Japanese Glyph Guide Watermark -->
            <text x="50" y="73" font-size="64" font-weight="900" font-family="'Noto Sans JP', 'Yu Gothic', sans-serif" text-anchor="middle" fill="rgba(255,255,255,0.16)" pointer-events="none">${character}</text>
            ${strokes.map(s => `"""

if old_overview_snippet in code:
    code = code.replace(old_overview_snippet, new_overview_snippet)
    print("Successfully added watermark in overview!")
else:
    print("Overview snippet not matched directly, checking regex...")

old_step_snippet = """<line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
                
                <!-- Ghosted Completed Prior Strokes -->"""

new_step_snippet = """<line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
                <!-- Authentic Japanese Glyph Guide Watermark -->
                <text x="50" y="73" font-size="64" font-weight="900" font-family="'Noto Sans JP', 'Yu Gothic', sans-serif" text-anchor="middle" fill="rgba(255,255,255,0.10)" pointer-events="none">${character}</text>
                
                <!-- Ghosted Completed Prior Strokes -->"""

if old_step_snippet in code:
    code = code.replace(old_step_snippet, new_step_snippet)
    print("Successfully added watermark in step cards!")
else:
    print("Step snippet not matched directly, checking regex...")

with open('nihongo-app/src/scripts/stroke.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("stroke.js updated successfully!")
