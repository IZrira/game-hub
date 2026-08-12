import os
import re
import json

hubs = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub']
base_dir = r'c:\Users\User\Desktop\rira game hub\game-hub'

pattern = re.compile(r'\b(text-(?:gray|slate|zinc|neutral)-(?:500|600|700|800|900)|placeholder:text-(?:gray|slate|zinc|neutral)-(?:500|600|700|800|900))\b')

results = []

for hub in hubs:
    hub_path = os.path.join(base_dir, hub)
    if not os.path.exists(hub_path):
        continue
    for root, dirs, files in os.walk(hub_path):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js', '.html', '.css')):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                    for idx, line in enumerate(lines, start=1):
                        matches = pattern.findall(line)
                        if matches:
                            results.append({
                                'file': rel_path,
                                'line': idx,
                                'matches': list(set(matches)),
                                'content': line.strip()
                            })
                except Exception as e:
                    pass

print(f"Total occurrences found: {len(results)}")

# Group by hub and file
by_file = {}
for r in results:
    f = r['file']
    if f not in by_file:
        by_file[f] = []
    by_file[f].append(r)

out_path = r'c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r2\contrast_scan_results.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(by_file, f, indent=2, ensure_ascii=False)

print(f"Saved results to {out_path}")
