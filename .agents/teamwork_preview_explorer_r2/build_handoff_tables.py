import json
import os

with open(r'c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r2\full_contrast_scan_results.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

# Contrast ratios dictionary vs #0a0a0a
contrast_info = {
    'text-gray-900': ('#111827', '1.08:1 (FAIL)', 'text-gray-300', '11.97:1 (PASS AAA)'),
    'text-gray-800': ('#1f2937', '1.26:1 (FAIL)', 'text-gray-300', '11.97:1 (PASS AAA)'),
    'text-gray-700': ('#374151', '1.78:1 (FAIL)', 'text-gray-400', '7.60:1 (PASS AA/AAA)'),
    'text-gray-600': ('#4b5563', '2.71:1 (FAIL)', 'text-gray-400', '7.60:1 (PASS AA/AAA)'),
    'text-gray-500': ('#6b7280', '4.21:1 (FAIL)', 'text-gray-400', '7.60:1 (PASS AA/AAA)'),
    'placeholder:text-gray-600': ('#4b5563', '2.71:1 (FAIL)', 'placeholder:text-gray-400', '7.60:1 (PASS AA/AAA)'),
    'placeholder:text-gray-800': ('#1f2937', '1.26:1 (FAIL)', 'placeholder:text-gray-400', '7.60:1 (PASS AA/AAA)'),
}

hubs = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub']

hub_files = {h: {} for h in hubs}

for file_path, entries in raw_data.items():
    hub = file_path.split(os.sep)[0]
    if hub in hub_files:
        hub_files[hub][file_path] = entries

print("Summary breakdown:")
for h, files in hub_files.items():
    cnt = sum(len(e) for e in files.values())
    print(f"  {h}: {len(files)} files, {cnt} occurrences")
