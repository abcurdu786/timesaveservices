import re
import os

filepath = 'c:/Users/Administrator/Desktop/Site/index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find contact footers in modals.
# They look like:
# <a href="https://wa.me/923046994699" target="_blank" class="btn btn-primary" dir="ltr"
#                     onclick="closeModal('...')"><i class="fa-brands fa-whatsapp"></i> واٹس ایپ پر
#                     رابطہ کریں:
#                     03046994699</a>
#
# We want to change 'class="btn btn-primary"' to 'class="btn btn-whatsapp"'.
# To be safe, we look specifically for the whatsapp link and replace btn-primary with btn-whatsapp

# Split by segments that are anchor tags linking to wa.me
parts = content.split('href="https://wa.me/923046994699"')
for i in range(1, len(parts)):
    # We are inside the attributes of the anchor tag, or possibly the tag just closed.
    # We replace the first occurrence of btn btn-primary with btn btn-whatsapp within the next 200 characters.
    prefix = parts[i][:250]
    if 'btn-primary' in prefix:
        new_prefix = prefix.replace('btn btn-primary', 'btn btn-whatsapp', 1)
        # Note: if it's just btn-primary, we replace that too
        new_prefix = new_prefix.replace('class="btn btn-primary"', 'class="btn btn-whatsapp"')
        parts[i] = new_prefix + parts[i][250:]

new_content = 'href="https://wa.me/923046994699"'.join(parts)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"File {filepath} updated.")
