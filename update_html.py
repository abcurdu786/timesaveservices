import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Categories mapping
mapping = {
    1: 'news_plra.png',
    8: 'news_plra.png',
    12: 'news_plra.png',
    22: 'news_plra.png',
    26: 'news_plra.png',
    
    2: 'news_edu.png',
    15: 'news_edu.png',
    27: 'news_edu.png',
    
    3: 'news_govt.png',
    9: 'news_govt.png',
    17: 'news_govt.png',
    20: 'news_govt.png',
    24: 'news_govt.png',
    
    4: 'news_nadra.png',
    11: 'news_nadra.png',
    13: 'news_nadra.png',
    16: 'news_nadra.png',
    30: 'news_nadra.png',
    
    5: 'news_vehicle.png',
    7: 'news_vehicle.png',
    14: 'news_vehicle.png',
    18: 'news_vehicle.png',
    21: 'news_vehicle.png',
    25: 'news_vehicle.png',
    29: 'news_vehicle.png',
    
    6: 'news_travel.png',
    19: 'news_travel.png',
    23: 'news_travel.png',
    
    10: 'news_design.png',
    28: 'news_design.png'
}

# Find all news-image divs
# We need to add style="background-image: url('assets/X.png'); background-size: cover; background-position: center;"
# It's tricky because some have img-news-X classes, some don't.
# We can find all <div class="news-item... "> blocks and inside them the <div class="news-image...">
# Let's use regex to find all <div class="news-image.*?> and replace.

matches = list(re.finditer(r'<div class="news-item.*?>\s*<div class="news-image(.*?)"(.*?)>', content, re.DOTALL))
print(f"Found {len(matches)} news items")

if len(matches) == 30:
    for i, match in enumerate(matches):
        idx = i + 1
        img = mapping.get(idx, 'news_plra.png')
        style_str = f' style="background-image: url(\'assets/{img}\'); background-size: cover; background-position: center;"'
        
        # Replace the <div class="news-image...">
        # We need to replace only that group
        old_div = match.group(0)
        # Find the <div class="news-image part
        sub_match = re.search(r'<div class="news-image.*?>', old_div)
        if sub_match:
            original_tag = sub_match.group(0)
            if 'style="background-image' not in original_tag:
                new_tag = original_tag.replace('>', style_str + '>')
                content = content.replace(original_tag, new_tag, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
