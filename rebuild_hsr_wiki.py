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

hsr_dir = 'hsr-hub/data/characters/hsr'
wiki_dir = '10_Wiki/👥 Characters/HSR'

if not os.path.exists(wiki_dir):
    os.makedirs(wiki_dir, exist_ok=True)

element_map = {
    '바람': 'wind', '물리': 'physical', '화염': 'fire', '얼음': 'ice',
    '번개': 'lightning', '양자': 'quantum', '허수': 'imaginary'
}

path_map = {
    '지식': 'erudition', '파멸': 'destruction', '수렵': 'hunt',
    '화합': 'harmony', '공허': 'nihility', '보존': 'preservation',
    '풍요': 'abundance', '기억': 'remembrance'
}

def generate_markdown(char, hsr_parties, hsr_tiers):
    char_id = char['id']
    char_name = char.get('name', char_id)
    eng_element = element_map.get(char.get('attribute', ''), char.get('attribute', '').lower())
    eng_path = path_map.get(char.get('path', ''), char.get('path', '').lower())
    
    quote = ''
    brief = char.get('briefInfo', '')
    if '——' in brief:
        parts = brief.split('——')
        quote = parts[-1].strip().replace('\r', '').replace('\n', ' ')
        if quote.startswith('「') and quote.endswith('」'):
            quote = quote[1:-1]
    elif '-\n' in brief:
        parts = brief.split('-\n')
        quote = parts[-1].strip().replace('\r', '').replace('\n', ' ')
        
    tags = ['hsr', eng_element.lower(), eng_path.lower()]
    if char.get('affiliation'):
        tags.append(char['affiliation'].lower())
    if char.get('version'):
        tags.append(f"v{char['version'].replace('.', '-')}")
        
    # Core Gameplay / Role analysis (HSR is stats and skills based)
    
    # Party Synergy
    parties_md = ""
    matched_parties = []
    for party in hsr_parties:
        is_member = False
        for member in party.get('members', []):
            if member.get('folderName') == char_name or member.get('name') == char_name or member.get('id') == f"char_{char_id}" or member.get('id') == char_id:
                is_member = True
                break
        if is_member:
            matched_parties.append(party)
            
    if matched_parties:
        for p in matched_parties:
            members_list = []
            for m in p.get('members', []):
                sub_str = ""
                if m.get('substitutes'):
                    subs = [sub.get('name') for sub in m.get('substitutes', [])]
                    sub_str = f" (대체 아군: {', '.join(subs)})"
                members_list.append(f"**{m.get('role', '')}**: [[{m.get('folderName', m.get('name'))}]] ({m.get('name')}){sub_str}")
            
            parties_md += f"""### ⚔️ {p.get('name', '')}
- **한줄 요약:** {p.get('description', '')}
- **파티 구성:**
{chr(10).join(['  - ' + m for m in members_list])}
"""
    else:
        parties_md += "> 대표적인 파티 조합 전략이 아직 데이터베이스에 등록되어 있지 않습니다.\n"

    # Tier Placements
    chaos_tier = "미지정"
    fiction_tier = "미지정"
    shadow_tier = "미지정"
    divergent_tier = "미지정"
    
    for group in hsr_tiers.get('chaos', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}" or c.get('id') == char_id:
                chaos_tier = group.get('tier', '미지정')
                break
                
    for group in hsr_tiers.get('fiction', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}" or c.get('id') == char_id:
                fiction_tier = group.get('tier', '미지정')
                break
                
    for group in hsr_tiers.get('shadow', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}" or c.get('id') == char_id:
                shadow_tier = group.get('tier', '미지정')
                break
                
    for group in hsr_tiers.get('divergent', []):
        for c in group.get('characters', []):
            if c.get('folderName') == char_name or c.get('name') == char_name or c.get('id') == f"char_{char_id}" or c.get('id') == char_id:
                divergent_tier = group.get('tier', '미지정')
                break

    md = f"""---
id: hsr-char-{char_id}
category: "[[10_Wiki/👥 Characters/HSR]]"
confidence_score: 1.0
tags: [{', '.join(tags)}]
rarity: {char.get('rarity', 5)}
element: {char.get('attribute', '')}
path: {char.get('path', '')}
release_version: "{char.get('releaseVersion', char.get('version', '1.0'))}"
last_reinforced: 2026-05-19
---

# [[{char_id}]] ({char_name})

## 핵심 요약/통찰 (The Karpathy Summary)
> "{quote or char_name}" - {char.get('affiliation', '은하열차')} 소속의 {char.get('rarity', 5)}성 {char.get('attribute', '')} 속성 {char.get('path', '')} 운명의 길 캐릭터. {char.get('briefInfo', '').split('——')[0].strip().replace('\n', ' ') if char.get('briefInfo') else ''}

## 대표 파티 조합 (Party Synergy)
{parties_md}
## 티어표 공략 (Tier Placements)
- **혼돈 12층 (Memory of Chaos):** **{chaos_tier}** 등급 (와류 반영 기준)
- **허구 이야기 (Pure Fiction):** **{fiction_tier}** 등급 (범위 공격 메타 기준)
- **종말의 환영 (Apocalyptic Shadow):** **{shadow_tier}** 등급 (전투 환경 기준)
- **차분화 우주 - 이상 중재 (Divergent Universe):** **{divergent_tier}** 등급 (하프 시뮬 기준)

## 상세 프로필 및 능력치 (Stats)
- **성우진:** {char.get('voiceActors', '미등록')}
- **소속:** {char.get('affiliation', '미등록')}
- **언어별 표기:** {char.get('languageNames', char_name)}

### 기초 능력치 테이블
| 레벨 | 기초 HP | 기초 공격력 | 기초 방어력 |
| :--- | :--- | :--- | :--- |
"""

    stats = char.get('baseStats', {})
    levels = ['lv1', 'lv20', 'lv30', 'lv40', 'lv50', 'lv60', 'lv70', 'lv80']
    for lv in levels:
        if lv in stats:
            data = stats[lv]
            md += f"| {lv.upper().replace('LV', 'Lv ')} | {data.get('기초 HP', 0)} | {data.get('기초 공격력', 0)} | {data.get('기초 방어력', 0)} |\n"
            
    md += f"""
- **기타 스탯:** 속도 **{stats.get('speed', 0)}** | 도발 **{stats.get('taunt', 0)}** | 에너지 최대치 **{stats.get('energy', 0)}**

## 스킬 및 메커니즘 (Skills & Traces)
"""

    skills = char.get('skills', [])
    if skills:
        for skill in skills:
            md += f"### 🌀 {skill.get('name', '')} ({skill.get('tag', '스킬')})\n"
            if skill.get('energyRegen') or skill.get('toughnessDMG') or skill.get('spRecovery'):
                md += f"- **효과:** {skill.get('energyRegen', '')} | {skill.get('toughnessDMG', '')} | SP 변동: {skill.get('spRecovery', '')}\n"
            md += f"- **상세:** {skill.get('description', '').replace('\\n', ' ').replace('\\r', '').replace('\n', ' ')}\n\n"

    abilities = char.get('additionalAbilities', [])
    if abilities:
        md += "### 🌟 추가 행적 패시브 (Bonus Traces)\n"
        for ability in abilities:
            md += f"- **{ability.get('name', '')}:** {ability.get('description', '').replace('\\n', ' ').replace('\\r', '').replace('\n', ' ')}\n"
        md += "\n"

    eidolons = char.get('eidolons', [])
    if eidolons:
        md += "## 성혼 돌파 효과 (Eidolons)\n"
        for eid in eidolons:
            md += f"- **{eid.get('rank', '')} [{eid.get('name', '')}]:** {eid.get('description', '').replace('\\n', ' ').replace('\\r', '').replace('\n', ' ')}\n"
        md += "\n"

    materials = char.get('materials_v2', {})
    if materials:
        md += "## 육성 재료 (Materials)\n### 캐릭터 승급 재료 (Ascension)\n"
        ascension = materials.get('ascension', [])
        if ascension:
            for mat in ascension:
                md += f"- **{mat.get('name', '')}:** {mat.get('count', 0)}개 (Rarity: {mat.get('rarity', 1)})\n"
        md += "\n### 스킬 행적 육성 재료 (Traces)\n"
        traces = materials.get('traces', [])
        if traces:
            for mat in traces:
                md += f"- **{mat.get('name', '')}:** {mat.get('count', 0)}개 (Rarity: {mat.get('rarity', 1)})\n"
        md += "\n"

    terms = char.get('specialTerms', {})
    if terms:
        md += "## 고유 메커니즘 용어 정의 (Special Terms)\n"
        for key, val in terms.items():
            md += f"- **{key}:** {val}\n"
        md += "\n"

    md += f"""## 데이터베이스 연결 (Data Hooks)
- `[[hsr-hub/data/characters/hsr/{char_id}.ts]]`
"""
    return md

def main():
    print("[HSR Wiki Builder] Loading metadata (parties & tiers)...")
    try:
        result = subprocess.run(
            ['node', 'scratch/get_metadata.cjs', 'hsr'],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )
        if result.returncode != 0:
            print("[Error] Failed to fetch metadata from get_metadata.cjs")
            sys.exit(1)
            
        metadata = json.loads(result.stdout.strip())
        hsr_parties = metadata.get('parties', [])
        hsr_tiers = metadata.get('tiers', {})
    except Exception as e:
        print(f"[Error] Failed to load metadata: {str(e)}")
        sys.exit(1)

    print("[HSR Wiki Builder] Scanning database files...")
    if not os.path.exists(hsr_dir):
        print(f"[Error] Directory not found: {hsr_dir}")
        sys.exit(1)
        
    files = [f for f in os.listdir(hsr_dir) if f.endswith('.ts')]
    print(f"[Info] Found {len(files)} character source files to process.")
    
    success_count = 0
    for file in files:
        char_id = file.replace('.ts', '')
        ts_path = os.path.join(hsr_dir, file)
        
        try:
            result = subprocess.run(
                ['node', 'scratch/parse_char.cjs', ts_path],
                capture_output=True,
                text=True,
                encoding='utf-8'
            )
            
            if result.returncode != 0:
                print(f"[Warning] Failed to parse: {file}")
                continue
                
            char_data = json.loads(result.stdout.strip())
            
            # Generate premium markdown
            markdown = generate_markdown(char_data, hsr_parties, hsr_tiers)
            
            # Save using utf-8-sig
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
                print(f"[Success] Rebuilt HSR Wiki: {char_id}")
                success_count += 1
            else:
                # Content is identical, skip writing
                pass
        except Exception as e:
            print(f"[Error] Rebuild failed for {file}: {str(e)}")
            
    print(f"\n[Completed] Successfully rebuilt HSR Wiki! Total processed (written): {success_count} characters.")

if __name__ == '__main__':
    main()
