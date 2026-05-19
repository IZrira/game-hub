import json
import os

file_path = r'c:\Users\User\Desktop\rira game hub\game-hub\common-hub\locales\ww\ww_characters_ko.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. Denia
data["character.denia.name"] = "데니아"
data["character.denia.briefInfo"] = "데니아가 화려한 장식의 지팡이를 휘두르면 분홍빛 거품들이 뿜어져 나온다. 이 거품들은 보이드매터에 대해 어느 정도의 방호 작용을 하며, 부드럽고 가벼워 보이지만 실은 살짝 흔들리는 것만으로도 적을 환상의 별무리 속에 가둘 수 있다."
data["character.denia.skills.0.name"] = "꿈을 엮은 연회"
data["character.denia.skills.0.description"] = "**일반 공격**\n최대 4단 연속 공격을 가하여 용융 피해를 입힌다.\n\n**강공격**\n스태미나를 소모하여 전방으로 돌진하며 용융 피해를 입힌다.\n\n**공중 공격**\n공중에서 일반 공격 시 스태미나를 소모하여 낙하 공격을 가하고 용융 피해를 입힌다.\n\n**회피 반격**\n회피 성공 후 일정 시간 내에 일반 공격을 짧게 누르면 목표를 공격하여 용융 피해를 입힌다."
data["character.denia.skills.1.name"] = "거품의 달콤한 미끼"
data["character.denia.skills.1.description"] = "목표를 공격하여 용융 피해를 입힌다.\n==연극의 모습==에서 발동 시, ==「보이드매터 입자」==를 획득할 수 있다.\n==환멸의 모습==에서 발동 시, ==「위상 동형 에너지」==를 획득할 수 있다.\n==엔트로피 변이 강화== 상태에서 발동 시, ==「어둠의 핵심」==을 소모하여 강화된 공명 스킬인 ==추방 · 환멸의 모습==을 발동할 수 있다."
data["character.denia.skills.2.name"] = "「완전무결」"
data["character.denia.skills.2.description"] = "데니아는 특수한 에너지를 통해 전투 형태를 전환할 수 있다.\n\n**연극의 모습**\n데니아가 일반 공격, 강공격, 변주 스킬로 목표를 명중 시 ==「보이드매터 입자」==를 획득한다.\n\n**환멸의 모습**\n데니아가 공명 스킬, 공명 해방으로 목표를 명중 시 ==「위상 동형 에너지」==를 획득한다.\n\n**엔트로피 변이 강화**\n공명 해방 발동 후, 데니아는 ==엔트로피 변이 강화== 상태에 진입한다.\n해당 상태에서 데니아는 시간에 따라 ==「어둠의 핵심」==을 획득하며, 이를 소모하여 강화된 공명 스킬을 발동할 수 있다."
data["character.denia.skills.3.name"] = "막이 내리는 순간"
data["character.denia.skills.3.description"] = "**공명 해방 · 연극의 모습**\n주변 목표에게 용융 피해를 입히고 ==엔트로피 변이 강화 · 환멸의 모습== 상태에 진입한다.\n\n**공명 해방 · 환멸의 모습**\n주변 목표에게 강력한 용융 피해를 입히고 ==엔트로피 변이 강화 · 연극의 모습== 상태에 진입한다.\n==「위상 동형 에너지」==가 가득 찰 시 발동할 수 있다."
data["character.denia.skills.4.name"] = "정중한 방문"
data["character.denia.skills.4.description"] = "데니아가 등장하며 목표에게 용융 피해를 입힌다."
data["character.denia.skills.5.name"] = "이루지 못한 거짓말"
data["character.denia.skills.5.description"] = "다음 등장 캐릭터의 용융 피해가 20% 부스트되고, 공명 해방 피해가 25% 부스트되며, 14초간 지속된다."
data["character.denia.additionalAbilities.0.name"] = "남겨진 거짓말"
data["character.denia.additionalAbilities.0.description"] = "==연극의 모습==에서 전투 진입 시, ==「어둠의 핵심」==이 2개 미만인 경우 2개까지 회복되고, ==「보이드매터 입자」==가 20pt 미만인 경우 20pt까지 회복된다. 해당 효과는 12초마다 1회 발생할 수 있다"
data["character.denia.additionalAbilities.1.name"] = "새겨진 찬란한 빛깔"
data["character.denia.additionalAbilities.1.description"] = "==엔트로피 변이 강화==에 있을 시, ==공명 모드==에 따라 다음과 같은 효과를 획득한다.\n· ==공명 모드 · 불꽃==에 있을 시, 파티 내 캐릭터의 용융 피해 보너스가 30% 증가된다.\n· ==공명 모드 · 조화 밀집==에 있을 시, 파티 내 캐릭터의 조화도 파괴 증폭이 10pt 증가된다. 파티 내 캐릭터의 부조화 수치 누적 효율이 100%를 초과 시, 초과한 부조화 수치 누적 효율 10% 당, 해당되는 캐릭터의 조화도 파괴 증폭을 8pt 증가시키고, 최대 40pt까지 증가시킬 수 있다"
data["character.denia.eidolons.0.name"] = "1. 흩어진 별들의 잔향"
data["character.denia.eidolons.0.description"] = "==공명 해방== 발동 시, 데니아의 공격력이 20% 증가하며 15초간 지속된다."
data["character.denia.eidolons.1.name"] = "2. 무대 뒤의 숨겨진 눈물"
data["character.denia.eidolons.1.description"] = "==「보이드매터 입자」== 획득 시, 공명 에너지를 5pt 회복한다."
data["character.denia.eidolons.2.name"] = "3. 거짓된 무대의 화려한 막"
data["character.denia.eidolons.2.description"] = "공명 스킬의 피해가 50% 증가한다."
data["character.denia.eidolons.3.name"] = "4. 깨지지 않는 분홍빛 거품"
data["character.denia.eidolons.3.description"] = "전투 중 데니아의 방어력이 30% 증가한다."
data["character.denia.eidolons.4.name"] = "5. 환상 속에 갇힌 별무리"
data["character.denia.eidolons.4.description"] = "용융 피해 보너스가 15% 증가한다."
data["character.denia.eidolons.5.name"] = "6. 영원히 끝나지 않을 연극"
data["character.denia.eidolons.5.description"] = "==엔트로피 변이 강화== 상태의 지속 시간이 5초 증가한다."
data["character.denia.concertDissipation.description"] = "목표의 ==「부조화 수치」==가 가득 찰 시, 데니아는 해당 목표에게 ==「조화도 파괴」==를 발동할 수 있다."
data["character.denia.terms.0.name"] = "「조화 밀집 · 간섭」"
data["character.denia.terms.0.description"] = "목표의 ==「부조화 수치」== 누적 속도를 증가시키는 특수 상태이다."
data["character.denia.terms.1.name"] = "「조화 밀집 · 이탈」"
data["character.denia.terms.1.description"] = "목표가 받는 조화도 파괴 피해를 증가시킨다."
data["character.denia.terms.2.name"] = "연극의 모습"
data["character.denia.terms.2.description"] = "데니아의 기본적인 전투 형태이다."
data["character.denia.terms.3.name"] = "환멸의 모습"
data["character.denia.terms.3.description"] = "데니아의 강화된 전투 형태이다."
data["character.denia.terms.4.name"] = "엔트로피 변이 강화"
data["character.denia.terms.4.description"] = "공명 해방 발동 후 진입하는 특수 강화 상태이다."
data["character.denia.terms.5.name"] = "보이드매터 입자"
data["character.denia.terms.5.description"] = "연극의 모습에서 획득하는 특수 에너지이다."
data["character.denia.terms.6.name"] = "위상 동형 에너지"
data["character.denia.terms.6.description"] = "환멸의 모습에서 획득하는 특수 에너지이다."
data["character.denia.terms.7.name"] = "어둠의 핵심"
data["character.denia.terms.7.description"] = "엔트로피 변이 강화 상태에서 사용하는 특수 자원이다."
data["character.denia.terms.8.name"] = "공명 모드 · 불꽃"
data["character.denia.terms.8.description"] = "용융 피해와 불꽃 효과에 특화된 모드이다."
data["character.denia.terms.9.name"] = "공명 모드 · 조화 밀집"
data["character.denia.terms.9.description"] = "조화도 파괴와 부조화 수치 누적에 특화된 모드이다."
data["character.denia.terms.10.name"] = "조화 밀집 대응"
data["character.denia.terms.10.description"] = "자신의 조화도 파괴 증폭에 근거하여 목표에게 입히는 최종 피해가 증가하는 특성이다."
data["character.denia.terms.11.name"] = "부조화 수치 누적 효율"
data["character.denia.terms.11.description"] = "목표의 부조화 수치를 얼마나 빨리 쌓을 수 있는지를 나타내는 효율이다."
data["character.denia.skillInput.overview"] = "[공명 회로 게이지.webp]\n\n**특징**\n파티 내 캐릭터에게 피해 보너스 효과를 제공한다\n==공명 모드 · 불꽃==에 있을 시, 높은 빈도로 ==「불꽃 효과」==를 추가하는 능력을 지니며 불꽃 효과 파티의 피해를 증가시킬 수 있다\n==공명 모드 · 조화 밀집==에 있을 시, ==「조화 밀집 · 이탈」== 추가, ==「조화 밀집 · 간섭」== 지속 시간 리셋, 목표의 ==「부조화 수치」==를 빠르게 누적시킬 수 있는 능력을 지니며, 조화 밀집 대응 파티의 피해를 증가시킬 수 있다\n\n**설명**\n**특수 에너지**\n[공명 회로 게이지1.webp]\n· ==「연극의 모습」==에 있을 시, 공격으로 ==「보이드매터 입자」==를 획득할 수 있다\n[공명 회로 게이지2.webp]\n· ==「환멸의 모습」==에 있을 시, 공격으로 ==「보이드매터 입자」==를 소모하여 ==「위상 동형 에너지」==로 전환하고 ==「막이 내리는 순간 · 환멸의 모습」==을 차지할 수 있다\n[공명 회로 게이지3.webp]\n· ==「엔트로피 변이 강화」== 상태에 있을 시, 시간이 지남에 따라 ==「어둠의 핵심」==을 획득하고 ==강화된 공명 스킬== 발동에 사용할 수 있다\n[공명 회로 게이지4.webp]\n· ==공명 해방 · 연극의 모습==을 발동할 경우, 데니아는 ==엔트로피 변이 강화 · 환멸의 모습==을 획득하고 공격력이 증가된다.\n==공명 해방 · 환멸의 모습==을 발동할 경우, 데니아는 ==엔트로피 변이 강화 · 연극의 모습==을 획득하고 ==「보이드매터 입자」==를 지속적으로 회복한다\n\n**메커니즘 설명**\n· **추방 · 환멸의 모습**: ==「환멸의 모습」==에서의 강화된 공명 스킬; ==「어둠의 핵심」== 보유 시, {{KEY_E}}+{{KEY_E}} 혹은 {{KEY_E}}+{{MOUSE_L}}\n· **막이 내리는 순간 · 환멸의 모습**: ==「환멸의 모습」==에서의 ==공명 해방==; ==「위상 동형 에너지」==가 가득 찰 시 {{KEY_R}} 짧게 누르기"

# 2. Sigrika
if "character.sigrika.skillInput.overview" in data:
    if "메커니즘 설명" not in data["character.sigrika.skillInput.overview"]:
        data["character.sigrika.skillInput.overview"] += "\n\n**메커니즘 설명**\n\n· **쿠쿵팡!**: {{MOUSE_L}} + {{MOUSE_L}} + {{MOUSE_L}} + {{MOUSE_L}} + {{KEY_E}}\n\n· **태양의 정령 도와줘**: {{MOUSE_L}} + {{MOUSE_L}} + {{MOUSE_L}} + {{KEY_E}}\n\n· **룬 · 근원**: 2개의 ==「룬」== 보유 시, {{MOUSE_L}} 길게 누르기\n\n· **나 곧 함의이니**: ==「마침표」==가 가득 찰 시, {{KEY_E}} 길게 누르기"

if "character.sigrika.skillInput.inputs.0" in data: del data["character.sigrika.skillInput.inputs.0"]
if "character.sigrika.skillInput.inputs.1" in data: del data["character.sigrika.skillInput.inputs.1"]
if "character.sigrika.skillInput.inputs.2" in data: del data["character.sigrika.skillInput.inputs.2"]
if "character.sigrika.skillInput.inputs.3" in data: del data["character.sigrika.skillInput.inputs.3"]

# 3. Augusta
data["character.augusta.skillInput.overview"] = "개요\n\n아우구스타는 「전세」를 축적하여 ==파생 강공격==을 발동할 수 있고, 「찬란한 권력」을 축적하여 ==파생 공명 스킬==을 발동할 수 있다\n\n==고유 스킬 · 타오르는 결의==, ==반주 스킬 · 불굴의 군가== 및 ==공명 스킬 · 영원한 불패의 태양 · 습격== 발동을 통해 「위협」을 획득할 수 있다\n\n2스택의 「위협」 보유 시, 아우구스타는 ==공명 해방 · 뜨거운 태양의 강림==을 발동하고 7초 동안 지속되는 ==머리를 숙이는 순간==에 진입하며, 마지막에 ==공명 해방 · 뜨거운 태양의 강림 · 불멸자의 보우==를 발동할 수 있다"

data["character.augusta.skillInput.inputs.0"] = "· 「전세」가 가득 찰 시:\n· [mouse left] 길게 눌러 ==강공격 · 섬뢰 · 후퇴==를 발동하고, 일정 시간 후 [mouse left] 떼거나 혹은 다시 [mouse left] 짧게 누르면 강공격 · 섬뢰 · 회전 베기를 발동한다.\n· 점프를 짧게 누르면 ==강공격 · 섬뢰 · 올려치기==를 발동한다.\n· ==강공격 · 철의 울림== 발동 시, 일정 시간 후 [mouse left] 떼거나 혹은 다시 [mouse left] 짧게 누르거나 점프를 짧게 누르면, ==강공격 · 섬뢰 · 올려치기==를 발동한다.\n· ==공명 스킬 · 검날 발동== 시 [key e] 혹은 점프를 짧게 누르면 ==강공격 · 섬뢰 · 올려치기==를 발동한다"
data["character.augusta.skillInput.inputs.1"] = "· 「찬란한 권력」이 가득 찰 시:\n[key e] 짧게 누르기+[key e] / [mouse left] 짧게 누르기+[key e] / [mouse left] 짧게 누르기\n· ==공명 스킬 · 영원한 불패의 태양 · 신속 공격==, ==공명 스킬 · 영원한 불패의 태양 · 공중 도약== 및 ==공명 스킬 · 영원한 불패의 태양 · 습격==을 순차적으로 발동할 수 있다"
data["character.augusta.skillInput.inputs.2"] = "· 「위협」이 가득 찰 시:\n[key r] 길게 누르기\n· ==공명 해방 · 뜨거운 태양의 강림==을 발동할 수 있다"

if "character.augusta.skillInput.inputs.3" in data: del data["character.augusta.skillInput.inputs.3"]
if "character.augusta.skillInput.inputs.4" in data: del data["character.augusta.skillInput.inputs.4"]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Patch applied successfully.")
