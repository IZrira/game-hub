import os
import sys
import json
import subprocess

# Reconfigure output encoding to UTF-8 to prevent console crashes
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

ww_dir = 'ww-hub/data/characters/ww'
wiki_dir = '10_Wiki/👥 Characters/WW'
locale_path = 'common-hub/locales/ww/ww_characters_ko.json'

if not os.path.exists(wiki_dir):
    os.makedirs(wiki_dir, exist_ok=True)

# Helper to recursively localize keys in character object
def recursive_localize(data, locale_dict):
    if isinstance(data, dict):
        return {k: recursive_localize(v, locale_dict) for k, v in data.items()}
    elif isinstance(data, list):
        return [recursive_localize(item, locale_dict) for item in data]
    elif isinstance(data, str):
        if data in locale_dict:
            return locale_dict[data]
        return data
    return data

def generate_markdown(char, ww_parties, ww_tiers):
    char_id = char['id']
    char_name = char.get('folderName', char_id)
    rarity = char.get('rarity', 4)
    element = char.get('attribute', '')
    weapon = char.get('weaponType', '')
    affiliation = char.get('affiliation', '미등록')
    
    tags = ['ww', element, weapon]
    if affiliation != '미등록':
        tags.append(affiliation)
    if char.get('releaseVersion'):
        tags.append(f"v{char['releaseVersion'].replace('.', '-')}")
        
    brief_info = char.get('briefInfo', '')
    
    # Core Gameplay / Role analysis
    roles_md = ""
    roles = char.get('roles', [])
    if roles:
        for r in roles:
            roles_md += f"- **{r.get('label', '')}**: {r.get('description', '')}\n"
    else:
        roles_md += "- **미등록**: 주요 전투 역할 정보가 아직 등록되지 않았습니다.\n"

    # Core Combat Loop
    loop_md = ""
    skills = char.get('skills', [])
    if skills:
        loop_md += "스킬 구성 및 전투 메커니즘 설명입니다.\n\n"
        for s in skills:
            loop_md += f"- **{s.get('name', '')} ({s.get('tag', '')})**\n"
            desc = s.get('description', '').replace('\\n', '\n').replace('\\r', '').strip()
            # Indent descriptions
            desc_indented = '\n'.join([f"  {line}" for line in desc.split('\n')])
            loop_md += f"{desc_indented}\n\n"
            
    abilities = char.get('additionalAbilities', [])
    if abilities:
        loop_md += "#### 🌟 고유 패시브 (Additional Abilities)\n"
        for a in abilities:
            loop_md += f"- **{a.get('name', '')}**: {a.get('description', '').replace('\\n', ' ').strip()}\n"
        loop_md += "\n"

    # Party Synergy
    parties_md = ""
    matched_parties = []
    for party in ww_parties:
        is_member = False
        for member in party.get('members', []):
            if member.get('folderName') == char_name or member.get('name') == char_name or member.get('id') == char_id:
                is_member = True
                break
        if is_member:
            matched_parties.append(party)
            
    if matched_parties:
        for p in matched_parties:
            members_list = []
            for m in p.get('members', []):
                members_list.append(f"**{m.get('role', '')}**: [[{m.get('folderName', m.get('name'))}]] ({m.get('name')})")
            
            pros_list = ""
            for pro in p.get('pros', []):
                pros_list += f"  - {pro}\n"
            cons_list = ""
            for con in p.get('cons', []):
                cons_list += f"  - {con}\n"
                
            parties_md += f"""### ⚔️ {p.get('name', '')}
- **한줄 요약:** {p.get('description', '')}
- **파티 구성:**
  - {chr(10).join(['  - ' + m for m in members_list])}
"""
            if pros_list:
                parties_md += f"- **장점 (Pros):**\n{pros_list}"
            if cons_list:
                parties_md += f"- **단점 (Cons):**\n{cons_list}"
            parties_md += "\n"
    else:
        parties_md += "> 대표적인 파티 조합 전략이 아직 데이터베이스에 등록되어 있지 않습니다.\n"

    # Tier Placements
    tower_tier = "미지정"
    hologram_tier = "미지정"
    
    # Check Tower
    for group in ww_tiers.get('tower', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}":
                tower_tier = group.get('tier', '미지정')
                break
                
    # Check Hologram
    for group in ww_tiers.get('hologram', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}":
                hologram_tier = group.get('tier', '미지정')
                break

    md = f"""---
id: ww-char-{char_id}
category: "[[10_Wiki/👥 Characters/WW]]"
confidence_score: 1.0
tags: [{', '.join(tags)}]
rarity: {rarity}
element: {element}
weapon: {weapon}
release_version: "{char.get('releaseVersion', '1.0')}"
last_reinforced: 2026-05-19
---

# [[{char_id}]] ({char_name})

## 핵심 요약/통찰 (The Karpathy Summary)
> "{brief_info}" - {affiliation} 소속의 {rarity}성 {element} 속성 {weapon} 무기 캐릭터.

## 스스로 메커니즘 분석 (Mechanism Analysis)
### 1. 주요 전투 역할 (Roles)
{roles_md}
### 2. 핵심 전투 메커니즘 (Core Gameplay Loop)
{loop_md}
## 대표 파티 조합 (Party Synergy)
{parties_md}
## 티어표 공략 (Tier Placements)
- **역경의 탑 (Tower of Adversity):** **{tower_tier}** 등급 (심층 구역 기준)
- **홀로그램 (Hologram Tactical):** **{hologram_tier}** 등급 (전략적 대응 기준)

## 상세 프로필 및 능력치 (Profile & Stats)
- **성우진:** {char.get('voiceActors', '미등록')}
- **언어별 표기:** {char.get('languageNames', '미등록')}

### 기초 능력치 테이블 (레벨 1 ~ 90)
| 레벨 | 기초 HP | 기초 공격력 | 기초 방어력 |
| :--- | :--- | :--- | :--- |
"""

    stats = char.get('baseStats', {})
    levels = ['lv1', 'lv20', 'lv30', 'lv40', 'lv50', 'lv60', 'lv70', 'lv80', 'lv90']
    for lv in levels:
        if lv in stats:
            data = stats[lv]
            md += f"| {lv.upper().replace('LV', 'Lv ')} | {data.get('기초 HP', 0)} | {data.get('기초 공격력', 0)} | {data.get('기초 방어력', 0)} |\n"

    eidolons = char.get('eidolons', [])
    if eidolons:
        md += "\n## 공명 체인 돌파 효과 (Resonance Chain)\n"
        for eid in eidolons:
            md += f"- **{eid.get('rank', '')} [{eid.get('name', '')}]:** {eid.get('description', '').replace('\\n', ' ').strip()}\n"

    materials = char.get('materials_v2', {})
    if materials:
        md += "\n## 돌파 및 스킬 육성 재료 (Materials)\n### 캐릭터 승급 (돌파) 재료\n"
        ascension = materials.get('ascension', [])
        if ascension:
            for mat in ascension:
                md += f"- **{mat.get('name', '')}:** {mat.get('count', 0)}개 (Rarity: {mat.get('rarity', 1)})\n"
        md += "\n### 스킬 트레이스 레벨업 재료\n"
        traces = materials.get('traces', [])
        if traces:
            for mat in traces:
                md += f"- **{mat.get('name', '')}:** {mat.get('count', 0)}개 (Rarity: {mat.get('rarity', 1)})\n"

    # Collect all description texts to check how terms are referenced (bracketed vs unbracketed)
    all_desc_texts = []
    for skill in char.get('skills', []):
        if skill.get('description'):
            all_desc_texts.append(skill.get('description'))
    for ability in char.get('additionalAbilities', []):
        if ability.get('description'):
            all_desc_texts.append(ability.get('description'))
    for eid in char.get('eidolons', []):
        if eid.get('description'):
            all_desc_texts.append(eid.get('description'))
    concert_desc = char.get('concertDissipation', {}).get('description')
    if concert_desc:
        all_desc_texts.append(concert_desc)
    overview = char.get('skillInput', {}).get('overview')
    if overview:
        all_desc_texts.append(overview)
    big_desc_string = "\n".join(all_desc_texts)

    terms = char.get('terms', [])
    if terms:
        md += "\n## 고유 메커니즘 용어 정의 (Special Terms)\n"
        for term in terms:
            name = term.get('name', '')
            desc = term.get('description', '')
            if name and desc:
                display_name = name
                if not (name.startswith('「') and name.endswith('」')):
                    bracketed = f"「{name}」"
                    if bracketed in big_desc_string:
                        display_name = bracketed
                md += f"- **{display_name}:** {desc.replace('\\n', ' ').replace('\\r', '').strip()}\n"
        md += "\n"

    md += f"""
## 데이터베이스 연결 (Data Hooks)
- `[[ww-hub/data/characters/ww/{char_id}.ts]]`
- `[[common-hub/locales/ww/{os.path.basename(locale_path)}]]`
"""
    return md

def main():
    print("[WW Wiki Builder] Loading metadata (parties & tiers)...")
    try:
        # Load parties and tiers using get_metadata.cjs
        result = subprocess.run(
            ['node', 'scratch/get_metadata.cjs', 'ww'],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )
        if result.returncode != 0:
            print("[Error] Failed to fetch metadata from get_metadata.cjs")
            sys.exit(1)
            
        metadata = json.loads(result.stdout.strip())
        ww_parties = metadata.get('parties', [])
        ww_tiers = metadata.get('tiers', {})
    except Exception as e:
        print(f"[Error] Failed to load metadata: {str(e)}")
        sys.exit(1)

    print("[WW Wiki Builder] Loading localizations...")
    if not os.path.exists(locale_path):
        print(f"[Error] Localization file not found: {locale_path}")
        sys.exit(1)
        
    try:
        with open(locale_path, 'r', encoding='utf-8') as f:
            locale_dict = json.load(f)
    except Exception as e:
        print(f"[Error] Failed to read localization: {str(e)}")
        sys.exit(1)

    print("[WW Wiki Builder] Scanning character database...")
    if not os.path.exists(ww_dir):
        print(f"[Error] Directory not found: {ww_dir}")
        sys.exit(1)
        
    files = [f for f in os.listdir(ww_dir) if f.endswith('.ts')]
    print(f"[Info] Found {len(files)} Wuthering Waves character source files.")
    
    success_count = 0
    for file in files:
        char_id = file.replace('.ts', '')
        ts_path = os.path.join(ww_dir, file)
        
        try:
            # Parse character using parse_ww_char.cjs
            result = subprocess.run(
                ['node', 'scratch/parse_ww_char.cjs', ts_path],
                capture_output=True,
                text=True,
                encoding='utf-8'
            )
            if result.returncode != 0:
                print(f"[Warning] Failed to parse character: {file}")
                continue
                
            raw_char = json.loads(result.stdout.strip())
            
            # Localize recursively
            char_data = recursive_localize(raw_char, locale_dict)
            
            # Generate premium markdown
            markdown = generate_markdown(char_data, ww_parties, ww_tiers)
            
            # Save using utf-8-sig (BOM) for Obsidian
            output_md_path = os.path.join(wiki_dir, f"{char_id.replace('_', '-')}.md")
            
            should_write = True
            if os.path.exists(output_md_path):
                try:
                    with open(output_md_path, 'r', encoding='utf-8-sig') as f:
                        existing_content = f.read()
                    if existing_content == markdown:
                        should_write = False
                except Exception:
                    pass
                    
            if should_write:
                with open(output_md_path, 'w', encoding='utf-8-sig') as f:
                    f.write(markdown)
                print(f"[Success] Rebuilt WW Wiki: {char_id}")
                success_count += 1
            else:
                # Content is identical, skip writing
                pass
        except Exception as e:
            print(f"[Error] Rebuild failed for {file}: {str(e)}")
            
    print(f"\n[Completed] Successfully rebuilt WW Wiki! Total processed (written): {success_count} characters.")

if __name__ == '__main__':
    main()
