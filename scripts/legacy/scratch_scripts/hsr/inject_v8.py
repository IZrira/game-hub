import json, os, re

# Map Korean Path names to file names
PATH_MAP = {
    '풍요': 'abundance.ts',
    '파멸': 'destruction.ts',
    '환락': 'elation.ts',
    '지식': 'erudition.ts',
    '화합': 'harmony.ts',
    '수렵': 'hunt.ts',
    '공허': 'nihility.ts',
    '보존': 'preservation.ts',
    '기억': 'remembrance.ts'
}

FILE_TO_PATH = {v: k for k, v in PATH_MAP.items()}

def get_stats_string(stats):
    hp = stats.get('hp', 0)
    atk = stats.get('atk', 0)
    def_ = stats.get('def', 0)
    return f'createLv80Stats({hp}, {atk}, {def_})'

def format_lc(lc):
    name = lc['name']
    id = f'lc_{name.replace(" ", "_").replace("•", "_").replace("·", "_")}'
    skill_name = lc['skill']['name']
    skill_desc = lc['skill']['description']
    story = lc['story']
    stats_str = get_stats_string(lc['stats'])
    path_name = lc.get('path', '미분류')
    
    # Escape quotes in story and description
    skill_desc = skill_desc.replace('"', '\\"')
    story = story.replace('"', '\\"')
    
    return f'''  {{
    id: "{id}",
    name: "{name}",
    folderName: "{name}",
    rarity: {lc.get('rarity', 5)},
    path: "{path_name}",
    baseStats: {stats_str},
    skill: {{
      name: "{skill_name}",
      description: "{skill_desc}"
    }},
    story: "{story}"
  }}'''

# Load parsed data
parsed_json_path = r'c:\Users\User\Desktop\rira game hub\game-hub\scratch\hsr\parsed_v8.json'
with open(parsed_json_path, 'r', encoding='utf-8') as f:
    parsed_lcs = json.load(f)

# Identify Path for each parsed LC
for lc in parsed_lcs:
    desc = lc['skill']['description']
    name = lc['name']
    
    # Heuristics for path based on keywords
    if any(k in desc for k in ['치유량', 'HP 회복', 'HP를 회복']): lc['path'] = '풍요'
    elif '기억 정령' in desc: lc['path'] = '기억'
    elif any(k in desc for k in ['환락', '추가 공격']): lc['path'] = '환락'
    elif any(k in desc for k in ['지속 피해', '디버프', '효과 명중']): lc['path'] = '공허'
    elif any(k in desc for k in ['실드', '방어력 무시']): 
        if '실드' in desc: lc['path'] = '보존'
        else: lc['path'] = '공허'
    elif any(k in desc for k in ['모든 아군', '아군이 가하는 피해']): lc['path'] = '화합'
    elif any(k in desc for k in ['적 처치', '모든 적']): lc['path'] = '지식'
    elif '행동 게이지' in desc: lc['path'] = '기억'
    else: lc['path'] = '파멸'

# Hardcoded overrides for key v8 light cones
if '거짓말의 종막' in name: lc['path'] = '파멸'
if '그녀의 불꽃을 잊지 말라' in name: lc['path'] = '파멸'
if '이 순간처럼 영원한 사랑' in name: lc['path'] = '기억'
if '긴 밤의 별빛에게' in name: lc['path'] = '기억'

# Distribution
file_contents = {fname: [] for fname in PATH_MAP.values()}
for lc in parsed_lcs:
    fname = PATH_MAP.get(lc['path'], 'destruction.ts')
    file_contents[fname].append(lc)

# Write files
output_dir = r'c:\Users\User\Desktop\rira game hub\game-hub\hsr-hub\data\lightcones'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for fname, lcs_in_file in file_contents.items():
    path_name = FILE_TO_PATH[fname]
    variable_name = fname.replace('.ts', 'Lightcones')
    
    lcs_in_file.sort(key=lambda x: x['name'])
    
    body = ',\n'.join([format_lc(lc) for lc in lcs_in_file])
    full_content = f'''import {{ LightCone }} from '../../../common-hub/types';
import {{ createLv80Stats }} from '../dataFactory';

export const {variable_name}: LightCone[] = [
{body}
];
'''
    with open(os.path.join(output_dir, fname), 'w', encoding='utf-8') as f:
        f.write(full_content)

print(f'Successfully updated 9 destination files with {len(parsed_lcs)} light cones.')
