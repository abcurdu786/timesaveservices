import re

path = 'c:/Users/Administrator/Desktop/Site/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'<span class="news-date">([^<]+)</span>', content)
for m in set(matches):
    print(m)
