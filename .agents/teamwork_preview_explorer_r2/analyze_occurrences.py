import json
import os

with open(r'c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r2\full_contrast_scan_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Analyze background context & replacement logic
def analyze_replacement(matches, line_content):
    content_lower = line_content.lower()
    replacements = {}
    
    for match in matches:
        if 'placeholder:text-' in match:
            # Placeholders on dark input fields
            replacements[match] = 'placeholder:text-gray-400'
        elif 'text-gray-700' in match:
            # Very dark gray on dark background (~1.7:1 -> ~7.5:1)
            replacements[match] = 'text-gray-400'
        elif 'text-gray-600' in match:
            # Dark gray on dark background (~2.6:1 -> ~7.5:1)
            replacements[match] = 'text-gray-400'
        elif 'text-gray-500' in match:
            # Medium gray on dark background (~4.1:1 -> ~7.5:1 / ~11.8:1)
            # Check if it's small text (e.g. text-[9px], text-[10px], text-xs)
            if 'text-[9px]' in line_content or 'text-[10px]' in line_content or 'text-[11px]' in line_content or 'text-xs' in line_content:
                replacements[match] = 'text-gray-400' # or text-gray-300
            else:
                replacements[match] = 'text-gray-400'
        elif 'text-gray-800' in match or 'text-gray-900' in match:
            # Black/near-black text on dark background
            replacements[match] = 'text-gray-300'
        elif 'text-slate-600' in match or 'text-slate-700' in match or 'text-slate-500' in match:
            replacements[match] = 'text-slate-300'
        elif 'text-zinc-600' in match or 'text-zinc-700' in match or 'text-zinc-500' in match:
            replacements[match] = 'text-zinc-300'
        elif 'text-neutral-600' in match or 'text-neutral-700' in match or 'text-neutral-500' in match:
            replacements[match] = 'text-neutral-300'
        else:
            replacements[match] = 'text-gray-400'
            
    return replacements

# Group by hub
hubs_data = {'common-hub': {}, 'hsr-hub': {}, 'ww-hub': {}, 'nte-hub': {}}

for filepath, entries in sorted(data.items()):
    hub = filepath.split(os.sep)[0]
    if hub in hubs_data:
        hubs_data[hub][filepath] = []
        for entry in entries:
            reps = analyze_replacement(entry['matches'], entry['content'])
            entry['proposed'] = reps
            hubs_data[hub][filepath].append(entry)

out_summary = r'c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r2\analyzed_summary.json'
with open(out_summary, 'w', encoding='utf-8') as f:
    json.dump(hubs_data, f, indent=2, ensure_ascii=False)

print("Analysis complete.")
for h, files in hubs_data.items():
    tot = sum(len(e) for e in files.values())
    print(f"Hub: {h} | Files: {len(files)} | Occurrences: {tot}")
