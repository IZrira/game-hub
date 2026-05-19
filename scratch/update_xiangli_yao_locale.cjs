const fs = require('fs');
const path = 'common-hub/locales/ww/ww_characters_ko.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const id = 'xiangli_yao';

data[`character.${id}.name`] = "상리요";
data[`character.${id}.briefInfo`] = "만물은 손에서 끊임없이 분열하고, 변화하며, 재구성한다.\n개조는 새로운 생명을 부여하며, 이러한 창조물은 마치 별들에게서 따온 것처럼 기묘하면서도 아름답다.";

data[`character.${id}.skills.0.name`] = "일반 공격";
data[`character.${id}.skills.0.description`] = "토론\n최대 5단 연속 공격을 가하여 전도 피해를 입힌다.\n\n강공격\n스태미나를 소모하여 목표를 공격하고 전도 피해를 입힌다.\n\n공중 공격\n스태미나를 소모하여 공중 낙하 공격을 가하고 전도 피해를 입힌다.\n\n회피 반격\n==회피== 성공 후 일정 시간 내에 ==일반 공격==을 짧게 누르면 목표를 공격하여 전도 피해를 입힌다";

data[`character.${id}.skills.1.name`] = "공명 스킬";
data[`character.${id}.skills.1.description`] = "기본 추론\n목표를 공격하여 전도 피해를 입힌다";

data[`character.${id}.skills.2.name`] = "공명 회로";
data[`character.${id}.skills.2.description`] = "이론의 일치\n**공명 스킬 · 해답**\n「연산 효과」 100pt 도달 시, 공명 스킬 ==기본 추론==이 ==해답==으로 대체된다.\n공명 스킬 ==해답== 발동 시, 「연산 효과」 100pt를 소모하여 목표를 공격하고 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**공명 스킬 · 만물의 법칙**\n공명 해방 ==통찰== 상태 기간 「강력 연산 효과」 5pt 도달 시, 공명 스킬 ==하나의 이치==가 ==만물의 법칙==으로 대체된다.\n공명 스킬 ==만물의 법칙== 발동 시, 「강력 연산 효과」 5pt를 소모하여 목표를 공격하고 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**공중 공격 · 해체와 재구성**\n공명 스킬 ==해답== 혹은 공명 스킬 ==하나의 이치== 발동 후 일정 시간 내에 ==일반 공격==을 짧게 누르면 스태미나를 소모하여 공중 공격 ==해체와 재구성==을 발동하여 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**「연산 효과」 획득 규칙**\n「연산 효과」 최대 누적 가능: 100pt\n기본 공격 ==토론==으로 목표 명중 시 「연산 효과」를 회복한다.\n공명 스킬 ==기본 추론==으로 목표 명중 시 「연산 효과」를 회복한다.\n\n**「강력 연산 효과」 획득 규칙**\n「강력 연산 효과」 최대 누적 가능: 5pt\n공명 해방 ==통찰== 상태 기간 동안:\n일반 공격 ==논리 · 간파 1단==으로 목표 명중 시 「강력 연산 효과」 1pt를 회복한다.\n일반 공격 ==논리 · 간파 2단, 3단==으로 목표 명중 시 「강력 연산 효과」 2pt를 회복한다.\n공명 스킬 ==하나의 이치== 발동 시 「강력 연산 효과」 2pt를 회복한다.\n공중 공격 ==해체와 재구성==으로 목표 명중 시 「강력 연산 효과」 3pt를 회복한다.\n회피 반격 ==탐구의 관점==으로 목표 명중 시 「강력 연산 효과」 2pt를 회복한다";

data[`character.${id}.skills.3.name`] = "공명 해방";
data[`character.${id}.skills.3.description`] = "사고의 배열\n목표를 공격하여 전도 피해를 입히며, ==통찰== 상태에 진입한다.\n==통찰== 상태:\n· 판타지 큐브 3개를 획득하게 되며, 공명 스킬 ==만물의 법칙==을 발동할 시 판타지 큐브 1개를 소모하게 되고, 모든 판타지 큐브가 소진되면 ==통찰== 상태가 종료된다.\n· ==일반 공격==과 ==강공격==은 일반 공격 ==논리 · 간파==로 대체되며, 최대 3단 연속 공격을 가하여 전도 피해를 입힌다.\n· 공명 스킬 ==기본 추론==이 공명 스킬 ==하나의 이치==로 대체되며 전도 피해를 입힌다.\n· ==회피 반격==이 회피 반격 ==탐구의 관점==으로 대체되며, 해당 피해는 공명 해방 피해로 적용된다";

data[`character.${id}.skills.4.name`] = "변주 스킬";
data[`character.${id}.skills.4.description`] = "진리\n목표를 공격하여 전도 피해를 입힌다";

data[`character.${id}.skills.5.name`] = "반주 스킬";
data[`character.${id}.skills.5.description`] = "연쇄 법칙\n다음 등장 캐릭터가 ==일반 공격==으로 목표 명중 시, 상리요가 목표를 공격하여 상리요 공격력의 237.63%에 해당하는 전도 피해를 입힌다. 8초간 지속되고, 2초마다 1회 발생할 수 있으며, 최대 3회 발생할 수 있다";

data[`character.${id}.additionalAbilities.0.name`] = "예지";
data[`character.${id}.additionalAbilities.0.description`] = "공명 스킬 발동 시, 전도 피해 보너스가 5% 증가되고, 8초간 지속되며, 최대 4스택 중첩이 가능하다";

data[`character.${id}.additionalAbilities.1.name`] = "집중";
data[`character.${id}.additionalAbilities.1.description`] = "공명 해방 ==통찰== 기간 경직 저항력이 증가된다";

data[`character.${id}.eidolons.0.name`] = "청출어람";
data[`character.${id}.eidolons.0.description`] = "공명 스킬 ==만물의 법칙== 발동 시, 추가로 6개의 회선 매트릭스를 생성하여 목표를 공격하고, 피해 배율은 공명 스킬 ==만물의 법칙==의 8%에 해당하며, 해당 피해는 공명 해방 피해로 적용된다";

data[`character.${id}.eidolons.1.name`] = "선구자의 발자취";
data[`character.${id}.eidolons.1.description`] = "공명 스킬 혹은 공명 해방 ==사고의 배열== 발동 시, 자신의 크리티컬 피해가 30% 증가되며, 8초간 지속된다";

data[`character.${id}.eidolons.2.name`] = "고대 유적지";
data[`character.${id}.eidolons.2.description`] = "공명 해방 ==사고의 배열== 발동 후, 다음 효과를 얻을 수 있다.\n공명 스킬 ==해답==, 공명 스킬 ==기본 추론==, 공명 스킬 ==하나의 이치== 혹은 공명 스킬 ==만물의 법칙==의 피해가 63% 증가되며, 24초간 지속되고, 최대 5회 발생할 수 있다";

data[`character.${id}.eidolons.3.name`] = "육체 재구성";
data[`character.${id}.eidolons.3.description`] = "공명 해방 ==사고의 배열== 발동 시, 파티 내 캐릭터의 공명 해방 피해 보너스가 25% 증가되며, 30초간 지속된다";

data[`character.${id}.eidolons.4.name`] = "뭇별의 가장자리";
data[`character.${id}.eidolons.4.description`] = "반주 스킬 ==연쇄 법칙== 피해 배율이 222% 증가되며, 공명 해방 ==사고의 배열== 피해 배율이 100% 상승된다";

data[`character.${id}.eidolons.5.name`] = "도시의 연기";
data[`character.${id}.eidolons.5.description`] = "공명 해방 ==사고의 배열== 발동 시 획득한 판타지 큐브를 강화하고, 공명 스킬 ==만물의 법칙== 피해 배율을 76% 상승시킨다";

data[`character.${id}.concertDissipation.description`] = "**조화도 파괴 · 권갑**\n\n목표의 ==「부조화 수치」== 가 가득 찰 시, 해당 목표에게 ==「조화도 파괴」== 를 발동한다";

data[`character.${id}.terms.0.name`] = "「조화도 파괴」";
data[`character.${id}.terms.0.description`] = "목표의 ==「부조화 수치」== 가 가득 찰 시, ==조화 소실== 상태에 진입한다.\n파티 내 등장 캐릭터는 해당 목표에게 ==「조화도 파괴 스킬」== 을 발동하여 피해를 입히고, 이후 목표의 ==조화 소실== 상태가 종료된다.\n목표가 경파급일 경우, 파티 내 캐릭터의 일부 스킬이 목표에 명중 시, 목표에게 ==조화도 파괴 피해==를 1회 입히며, 이후 목표의 ==조화 소실== 상태가 종료된다";

data[`character.${id}.terms.1.name`] = "통찰";
data[`character.${id}.terms.1.description`] = "==통찰== 상태:\n· 판타지 큐브 3개를 획득하게 되며, 공명 스킬 ==만물의 법칙==을 발동할 시 판타지 큐브 1개를 소모하게 되고, 모든 판타지 큐브가 소진되면 ==통찰== 상태가 종료된다.\n· ==일반 공격과 강공격==은 일반 공격 ==논리 · 간파==로 대체되며, 최대 3단 연속 공격을 가하여 전도 피해를 입힌다.\n· 공명 스킬 ==기본 추론==이 공명 스킬 ==하나의 이치==로 대체되며 전도 피해를 입힌다.\n· ==회피 반격==이 회피 반격 ==탐구의 관점==으로 대체되며, 해당 피해는 공명 해방 피해로 적용된다";

data[`character.${id}.skillInput.overview`] = `개요

기본 공격으로 목표 명중 혹은 공명 스킬 발동을 통해 특수 에너지를 회복할 수 있다

특수 에너지가 가득 찰 때 강화된 공명 스킬을 발동할 수 있다`;

data[`character.${id}.skillInput.inputs.0`] = `스킬 입력 가이드

[공명 회로 게이지.webp]`;

data[`character.${id}.skillInput.inputs.1`] = `**조작 입력**

· 해답: 특수 에너지가 가득 찬 후 [key e] + [mouse left] 누르기

· 만물의 법칙: 공명 해방 통찰 상태 기간 특수 에너지가 가득 찬 후 [key e] 누르기`;

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated Xiangli Yao locale');
