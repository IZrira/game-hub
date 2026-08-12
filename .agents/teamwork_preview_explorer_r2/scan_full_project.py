import os
import re
import json

base_dir = r'c:\Users\User\Desktop\rira game hub\game-hub'
ignore_dirs = {'.git', 'node_modules', 'dist', '.agents', '40_템플릿', '00_Raw', '10_Wiki', '20_Meta'}

pattern = re.compile(r'\b(text-(?:gray|slate|zinc|neutral)-(?:500|600|700|800|900)|placeholder:text-(?:gray|slate|zinc|neutral)-(?:500|600|700|800|900))\b')

results = []

for root, dirs, files in os.walk(base_dir):
    # filter ignore dirs
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
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

print(f"Total occurrences found across active project: {len(results)}")

by_file = {}
for r in results:
    f = r['file']
    if f not in by_file:
        by_file[f] = []
    by_file[f].append(r)

out_path = r'c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r2\full_contrast_scan_results.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(by_file, f, indent=2, ensure_ascii=False)

print(f"Saved results to {out_path}")

# Print breakdown by hub
hub_counts = {}
for f, items in by_file.items():
    hub = f.split(os.sep)[0]
    hub_counts[hub] = hub_counts.get(hub, 0) + len(items)

for h, c in hub_counts.items():
    print(f"  {h}: {c} occurrences in {len([f for f in by_file if f.startswith(h)])} files")
