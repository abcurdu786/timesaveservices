import re

# Update index.html
path_html = 'c:/Users/Administrator/Desktop/Site/index.html'
with open(path_html, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace any future dates
html_content = html_content.replace('25 مارچ 2026', '8 مارچ 2026')
html_content = html_content.replace('25 March 2026', '8 March 2026')

with open(path_html, 'w', encoding='utf-8') as f:
    f.write(html_content)

# Update lang.js
path_lang = 'c:/Users/Administrator/Desktop/Site/lang.js'
with open(path_lang, 'r', encoding='utf-8') as f:
    lang_content = f.read()

lang_content = lang_content.replace('"25 مارچ 2026": "25 March 2026"', '"8 مارچ 2026": "8 March 2026"')

# Try to find if '25 مارچ 2026' exists still
lang_content = lang_content.replace('25 مارچ 2026', '8 مارچ 2026')
lang_content = lang_content.replace('25 March 2026', '8 March 2026')

with open(path_lang, 'w', encoding='utf-8') as f:
    f.write(lang_content)
