import re

path = 'c:/Users/Administrator/Desktop/Site/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the a tag for wa.me completely
new_content = re.sub(r'<a[^>]*href=["\']https://wa\.me/923046994699["\'][^>]*>.*?</a>', '', content, flags=re.DOTALL)

# But there is also text before it maybe?
# Let's save it.
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
