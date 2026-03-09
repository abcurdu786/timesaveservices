import os
import re

out = open('c:/Users/Administrator/Desktop/Site/search_results.txt', 'w', encoding='utf-8')
for root, dirs, files in os.walk('c:/Users/Administrator/Desktop/Site'):
    if '.git' in root or '.gemini' in root:
        continue
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            path = os.path.join(root, f)
            try:
                content = open(path, 'r', encoding='utf-8').read()
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if '2026' in line or 'مارچ' in line or 'March' in line:
                        out.write(f"{path}:{i+1}: {line.strip()}\n")
            except Exception as e:
                out.write(f"Error reading {path}: {e}\n")
out.close()
