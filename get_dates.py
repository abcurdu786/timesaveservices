import re
html = open('c:/Users/Administrator/Desktop/Site/index.html', encoding='utf-8').read()
matches = set(re.findall(r'<span class="news-date">(.*?)</span>', html))
with open('c:/Users/Administrator/Desktop/Site/extracted_dates.txt', 'w', encoding='utf-8') as f:
    for m in matches:
        f.write("Found: " + m + "\n")
