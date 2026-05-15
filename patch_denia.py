import json
import os

file_path = r'c:\Users\User\Desktop\rira game hub\game-hub\common-hub\locales\ww\ww_characters_ko.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if "character.denia.skillInput.overview" in data:
    overview = data["character.denia.skillInput.overview"]
    if overview.startswith("[공명 회로 게이지.webp]\n\n"):
        data["character.denia.skillInput.overview"] = overview.replace("[공명 회로 게이지.webp]\n\n", "", 1)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Patch applied successfully.")
