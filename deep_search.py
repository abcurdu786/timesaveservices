import glob
import re

files = glob.glob('c:/Users/Administrator/Desktop/Site/**/*.{html,js}', recursive=True)
for f in files:
    try:
        content = open(f, 'r', encoding='utf-8').read()
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if '2026' in line or 'مارچ' in line or 'March' in line:
                print(f"{f}:{i+1}: {line.strip()}")
    except Exception as e:
        print(f"Error reading {f}: {e}")
