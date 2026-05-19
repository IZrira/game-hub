const fs = require('fs');
const path = 'c:/Users/User/Desktop/rira game hub/game-hub/common-hub/locales/ww/ww_characters_ko.json';

try {
    const content = fs.readFileSync(path, 'utf8');
    // Remove the last closing brace and any trailing whitespace
    let newContent = content.trim().replace(/}\s*$/, '');
    
    // Check if the last character is a comma
    if (!newContent.endsWith(',')) {
        newContent += ',';
    }
    
    const xiangliYaoData = {
        "character.xiangli_yao.name": "상리요",
        "character.xiangli_yao.briefInfo": "만물은 손에서 끊임없이 분열하고, 변화하며, 재구성한다.\n개조는 새로운 생명을 부여하며, 이러한 창조물은 마치 별들에게서 따온 것처럼 기묘하면서도 아름답다.",
        "character.xiangli_yao.skills.0.name": "일반 공격",
        "character.xiangli_yao.skills.0.description": "토론\n최대 5단 연속 공격을 가하여 전도 피해를 입힌다.\n\n강공격\n스태미나를 소모하여 목표를 공격하고 전도 피해를 입힌다.\n\n공중 공격\n스태미나를 소모하여 공중 낙하 공격을 가하고 전도 피해를 입힌다.\n\n회피 반격\n==회피== 성공 후 일정 시간 내 ==일반 공격==을 짧게 누르면 목표를 공격하여 전도 피해를 입힌다",
        "character.xiangli_yao.skills.1.name": "공명 스킬",
        "character.xiangli_yao.skills.1.description": "기본 추론\n목표를 공격하여 전도 피해를 입힌다",
        "character.xiangli_yao.skills.2.name": "공명 회로",
        "character.xiangli_yao.skills.2.description": "이론의 일치\n**공명 스킬 · 해답**\n「연산 효과」 100pt 도달 시, 공명 스킬 ==기본 추론==이 ==해답==으로 대체된다.\n공명 스킬 ==해답== 발동 시, 「연산 효과」 100pt를 소모하여 목표를 공격하고 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**공명 스킬 · 만물의 법칙**\n공명 해방 ==통찰== 상태 기간 「강력 연산 효과」 5pt 도달 시, 공명 스킬 ==하나의 이치==가 ==만물의 법칙==으로 대체된다.\n공명 스킬 ==만물의 법칙== 발동 시, 「강력 연산 효과」 5pt를 소모하여 목표를 공격하고 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**공중 공격 · 해체와 재구성**\n공명 스킬 ==해답== 혹은 공명 스킬 ==하나의 이치== 발동 후 일정 시간 내에 ==일반 공격==을 짧게 누르면 스태미나를 소모하여 공중 공격 ==해체와 재구성==을 발동하여 전도 피해를 입히며, 해당 피해는 공명 해방 피해로 적용된다.\n\n**「연산 효과」 획득 규칙**\n「연산 효과」 최대 누적 가능: 100pt\n기본 공격 ==토론==으로 목표 명중 시 「연산 효과」를 회복한다.\n공명 스킬 ==기본 추론==으로 목표 명중 시 「연산 효과」를 회복한다.\n\n**「강력 연산 효과」 획득 규칙**\n「강력 연산 효과」 최대 누적 가능: 5pt\n공명 해방 ==통찰== 상태 기간 동안:\n일반 공격 ==논리 · 간파 1단==으로 목표 명중 시 「강력 연산 효과」 1pt를 회복한다.\n일반 공격 ==논리 · 간파 2단, 3단==으로 목표 명중 시 「강력 연산 효과」 2pt를 회복한다.\n공명 스킬 ==하나의 이치== 발동 시 「강력 연산 효과」 2pt를 회복한다.\n공중 공격 ==해체와 재구성==으로 목표 명중 시 「강력 연산 효과」 3pt를 회복한다.\n회피 반격 ==탐구의 관점==으로 목표 명중 시 「강력 연산 효과」 2pt를 회복한다",
        "character.xiangli_yao.skills.3.name": "공명 해방",
        "character.xiangli_yao.skills.3.description": "사고의 배열\n목표를 공격하여 전도 피해를 입히며, ==통찰== 상태에 진입한다.\n==통찰== 상태:\n· 판타지 큐브 3개를 획득하게 되며, 공명 스킬 ==만물의 법칙==을 발동할 시 판타지 큐브 1개를 소모하게 되고, 모든 판타지 큐브가 소진되면 ==통찰== 상태가 종료된다.\n· ==일반 공격==과 ==강공격==은 일반 공격 ==논리 · 간파==로 대체되며, 최대 3단 연속 공격을 가하여 전도 피해를 입힌다.\n· 공명 스킬 ==기본 추론==이 공명 스킬 ==하나의 이치==로 대체되며 전도 피해를 입힌다.\n· ==회피 반격==이 회피 반격 ==탐구의 관점==으로 대체되며, 해당 피해는 공명 해방 피해로 적용된다",
        "character.xiangli_yao.skills.4.name": "변주 스킬",
        "character.xiangli_yao.skills.4.description": "진리\n목표를 공격하여 전도 피해를 입힌다",
        "character.xiangli_yao.skills.5.name": "반주 스킬",
        "character.xiangli_yao.skills.5.description": "연쇄 법칙\n다음 등장 캐릭터가 ==일반 공격==으로 목표 명중 시, 상리요가 목표를 공격하여 상리요 공격력의 237.63%에 해당하는 전도 피해를 입힌다. 8초간 지속되고, 2초마다 1회 발생할 수 있으며, 최대 3회 발생할 수 있다",
        "character.xiangli_yao.additionalAbilities.0.name": "예지",
        "character.xiangli_yao.additionalAbilities.0.description": "공명 스킬 발동 시, 전도 피해 보너스가 5% 증가되고, 8초간 지속되며, 최대 4스택 중첩이 가능하다",
        "character.xiangli_yao.additionalAbilities.1.name": "집중",
        "character.xiangli_yao.additionalAbilities.1.description": "공명 해방 ==통찰== 기간 경직 저항력이 증가된다",
        "character.xiangli_yao.eidolons.0.name": "청출어람",
        "character.xiangli_yao.eidolons.0.description": "공명 스킬 ==만물의 법칙== 발동 시, 추가로 6개의 회선 매트릭스를 생성하여 목표를 공격하고, 피해 배율은 공명 스킬 ==만물의 법칙==의 8%에 해당하며, 해당 피해는 공명 해방 피해로 적용된다",
        "character.xiangli_yao.eidolons.1.name": "선구자의 발자취",
        "character.xiangli_yao.eidolons.1.description": "공명 스킬 혹은 공명 해방 ==사고의 배열== 발동 시, 자신의 크리티컬 피해가 30% 증가되며, 8초간 지속된다",
        "character.xiangli_yao.eidolons.2.name": "고대 유적지",
        "character.xiangli_yao.eidolons.2.description": "공명 해방 ==사고의 배열== 발동 후, 다음 효과를 얻을 수 있다.\n공명 스킬 ==해답==, 공명 스킬 ==기본 추론==, 공명 스킬 ==하나의 이치== 혹은 공명 스킬 ==만물의 법칙==의 피해가 63% 증가되며, 24초간 지속되고, 최대 5회 발생할 수 있다",
        "character.xiangli_yao.eidolons.3.name": "육체 재구성",
        "character.xiangli_yao.eidolons.3.description": "공명 해방 ==사고의 배열== 발동 시, 파티 내 캐릭터의 공명 해방 피해 보너스가 25% 증가되며, 30초간 지속된다",
        "character.xiangli_yao.eidolons.4.name": "뭇별의 가장자리",
        "character.xiangli_yao.eidolons.4.description": "반주 스킬 ==연쇄 법칙== 피해 배율이 222% 증가되며, 공명 해방 ==사고의 배열== 피해 배율이 100% 상승된다",
        "character.xiangli_yao.eidolons.5.name": "도시의 연기",
        "character.xiangli_yao.eidolons.5.description": "공명 해방 ==사고의 배열== 발동 시 획득한 판타지 큐브를 강화하고, 공명 스킬 ==만물의 법칙== 피해 배율을 76% 상승시킨다",
        "character.xiangli_yao.concertDissipation.description": "**조화도 파괴 · 권갑**\n\n목표의 ==「부조화 수치」== 가 가득 찰 시, 해당 목표에게 ==「조화도 파괴」== 를 발동한다",
        "character.xiangli_yao.terms.0.name": "「조화도 파괴」",
        "character.xiangli_yao.terms.0.description": "목표의 ==「부조화 수치」== 가 가득 찰 시, ==조화 소실== 상태에 진입한다.\n파티 내 등장 캐릭터는 해당 목표에게 ==「조화도 파괴 스킬」== 을 발동하여 피해를 입히고, 이후 목표의 ==조화 소실== 상태가 종료된다.\n목표가 경파급일 경우, 파티 내 캐릭터의 일부 스킬이 목표에 명중 시, 목표에게 ==조화도 파괴 피해==를 1회 입히며, 이후 목표의 ==조화 소실== 상태가 종료된다",
        "character.xiangli_yao.terms.1.name": "통찰",
        "character.xiangli_yao.terms.1.description": "==통찰== 상태:\n· 판타지 큐브 3개를 획득하게 되며, 공명 스킬 ==만물의 법칙==을 발동할 시 판타지 큐브 1개를 소모하게 되고, 모든 판타지 큐브가 소진되면 ==통찰== 상태가 종료된다.\n· ==일반 공격과 강공격==은 일반 공격 ==논리 · 간파==로 대체되며, 최대 3단 연속 공격을 가하여 전도 피해를 입힌다.\n· 공명 스킬 ==기본 추론==이 공명 스킬 ==하나의 이치==로 대체되며 전도 피해를 입힌다.\n· ==회피 반격==이 회피 반격 ==탐구의 관점==으로 대체되며, 해당 피해는 공명 해방 피해로 적용된다",
        "character.xiangli_yao.skillInput.overview": "[공명 회로 게이지.webp]\n\n개요\n\n상리요는 「연산력」을 축적하여 ==강공격 · 만물의 근원==을 발동해 피해를 입힐 수 있다.\n==공명 해방 · 생과 사의 한 수== 발동 시 [초기화] 상태에 진입하며, 공명 스킬이 ==공명 스킬 · 규칙 위반==으로 대체된다.\n[초기화] 상태에서 공명 스킬 사용 혹은 기본 공격 적중 시 「데이터」를 축적하며, 「데이터」가 가득 찰 시 공명 스킬이 ==공명 스킬 · 규칙 해독==으로 대체되어 강력한 피해를 입힌다.",
        "character.xiangli_yao.skillInput.inputs.0": "· 기본 공격/공명 스킬: [초기화] 상태에서 「데이터」 축적",
        "character.xiangli_yao.skillInput.inputs.1": "· 「데이터」가 가득 찰 시: [key e.webp]를 눌러 ==공명 스킬 · 규칙 해독== 발동",
        "character.xiangli_yao.skillInput.inputs.2": "· 「연산력」이 가득 찰 시: [mouse left.webp] 길게 눌러 ==강공격 · 만물의 근원== 발동"
    };

    const yuanwuData = {
        "character.yuanwu.name": "연무",
        "character.yuanwu.briefInfo": "연무는 뇌전의 힘을 모아 온 힘을 다해 적에게 공격을 가한다. 뛰어난 권법은 마치 천둥과 같았고, 눈부신 천둥은 삽시간에 하늘을 가른다.\n\n**공명 어빌리티: 팔방의 뇌정**",
        "character.yuanwu.skills.0.name": "뇌황권",
        "character.yuanwu.skills.0.description": "**일반 공격**\n최대 5단 연속 공격을 가하여 전도 피해를 가한다.\n\n**강공격**\n스태미나를 소모하여 목표를 향해 공격을 가하여 전도 피해를 가한다.\n\n**공중 공격**\n스태미나를 소모하여 공중 낙하 공격을 가하여 전도 피해를 가한다.\n\n**회피 반격**\n==회피== 성공 후 일정 시간 내 ==일반 공격==을 짧게 누르면 목표를 공격하여 전도 피해를 가한다",
        "character.yuanwu.skills.1.name": "진동의 일격",
        "character.yuanwu.skills.1.description": "**뇌전의 쐐기**\n==뇌전의 쐐기==를 소환해 전도 피해를 가하고 ==뇌전의 쐐기==를 중심으로 ==뇌전의 늪==을 형성한다. ==뇌전의 쐐기==는 12초 동안 지속된다.\n공명 회로 ==계곡의 뇌전==과 공명 해방 ==적토중명==을 발동할 시, 즉시 공명 스킬 ==뇌전의 쐐기==가 발동되어 전도 피해를 가한다. 해당 피해는 공명 스킬 피해로 적용된다.\n\n**뇌전의 늪**\n파티 중 출전한 캐릭터가 ==뇌전의 늪==에 있으면 지속적 효과를 획득한다. 목표를 명중할 시, 공명 스킬 ==뇌전의 쐐기==가 협동 공격하여 전도 피해를 가한다. 1.2초당 1회 발동되며 1.5초간 지속된다",
        "character.yuanwu.skills.2.name": "숨은 뇌전",
        "character.yuanwu.skills.2.description": "**계곡의 뇌전**\n「예리한 뇌전」이 가득찰 시, ==공명 스킬==을 길게 누르면 모든 「예리한 뇌전」을 소모하여 ==계곡의 뇌전==을 발동시켜 전도 피해를 입히고 연무로 하여금 ==뇌전의 집행== 상태로 진입하게 한다.\n\n**신뢰**\n「예리한 뇌전」이 가득찰 시, 공명 스킬 ==뇌전의 쐐기==가 있으면 ==신뢰==를 발동해 추가로 전도 피해를 가한다.\n\n**뇌전의 집행**\n==뇌전의 집행== 상태에서 캐릭터의 경직 저항력이 증가한다.\n연무가 해당 상태에 진입할 시:\n· ==일반 공격==의 공격 범위가 확장되며 몬스터의 공진 수치를 감소시키는 능력이 증가한다.\n· ==강공격==의 공격이 더욱 맹렬해지며 몬스터의 공진 수치를 감소시키는 능력이 증가한다.\n· ==회피 반격==의 공격이 더욱 맹렬해지며 몬스터의 공진 수치를 감소시키는 능력이 증가한다.\n· ==강공격==을 발동하거나 ==패링== 발동이 성공 후, 3초 내에 ==일반 공격==을 짧게 누르면, ==천둥 쫓기==가 발동되어 목표를 공격하여 전도 피해를 가한다. 해당 피해는 일반 공격 피해로 적용된다.\n· 「예리한 뇌전」은 회복되지 않는다.\n\n**예리한 뇌전 획득 규칙**\n「예리한 뇌전」 최대 누적 가능: 100pt\n필드에 공명 스킬 ==뇌전의 쐐기==가 있을 경우 초마다 「예리한 뇌전」 6pt를 회복시키며, 연무가 없을 때에도 해당 효과는 여전히 유효한다.\n공명 스킬 ==뇌전의 쐐기==로 협동 공격을 가하여 목표 명중 시 「예리한 뇌전」 5pt를 회복한다",
        "character.yuanwu.skills.3.name": "적토중명",
        "character.yuanwu.skills.3.description": "뇌전의 힘을 일깨워 근처 파티의 모든 캐릭터에게 10초간 지속되는 ==뇌전의 집행== 상태를 제공하며 전력으로 목표를 공격하여 전도 피해를 가한다",
        "character.yuanwu.skills.4.name": "천둥의 울림",
        "character.yuanwu.skills.4.description": "목표를 공격하여, 전도 피해를 가한다",
        "character.yuanwu.skills.5.name": "번개의 팬텀",
        "character.yuanwu.skills.5.description": "스킬 목표를 중심으로 번개를 내리쳐, 명중하는 적에게 대량의 공진 수치 피해를 가한다",
        "character.yuanwu.additionalAbilities.0.name": "결전",
        "character.yuanwu.additionalAbilities.0.description": "공명 스킬 ==신뢰==의 피해 배율이 40% 상승하고 , 몬스터의 공진 수치를 감소시키는 능력이 향상된다",
        "character.yuanwu.additionalAbilities.1.name": "빛의 제약",
        "character.yuanwu.additionalAbilities.1.description": "공명 스킬 ==뇌전의 늪== 및 공명 스킬 ==신뢰==의 범위가 대폭 증가하며, 전투 상태 중 퇴장 시, 「예리한 뇌전」이 가득 차 있지 않은 경우, 연무는 자동으로 그 자리에 공명 스킬 ==뇌전의 쐐기== 1개를 남긴다",
        "character.yuanwu.eidolons.0.name": "1. 차 한잔의 여유",
        "character.yuanwu.eidolons.0.description": "연무가 공명 회로 ==뇌전의 집행== 상태일 시, 자신의 일반 공격 공격 속도가 20%, 강공격 공격 속도가 20% 증가한다",
        "character.yuanwu.eidolons.1.name": "2. 정직한 마음",
        "character.yuanwu.eidolons.1.description": "변주 스킬 ==천둥의 울림== 발동 시, 연무는 15pt의 공명 에너지를 추가로 회복한다",
        "character.yuanwu.eidolons.2.name": "3. 정의의 화신",
        "character.yuanwu.eidolons.2.description": "공명 스킬 ==뇌전의 쐐기==의 협동 공격이 목표에 명중 시, 연무 방어력 20%를 기반으로 피해가 추가로 증가한다",
        "character.yuanwu.eidolons.3.name": "4. 극기의 권법",
        "character.yuanwu.eidolons.3.description": "공명 해방 ==적토중명== 발동 시, 파티 내 파티원은 자체 연무 방어력 200%의 실드를 획득하며, 10초간 지속된다",
        "character.yuanwu.eidolons.4.name": "5. 절대적인 보호",
        "character.yuanwu.eidolons.4.description": "공명 스킬 ==천둥의 쐐기==가 있을 시, 연무의 공명 해방 피해 보너스가 50% 증가한다",
        "character.yuanwu.eidolons.5.name": "6. 평화를 위하여",
        "character.yuanwu.eidolons.5.description": "공명 스킬 ==천둥의 쐐기==의 범위 내에 있는 전체 파티원의 방어력이 32% 증가하며 3초간 지속된다",
        "character.yuanwu.concertDissipation.description": "목표의 ==「부조화 수치」== 가 가득 찰 시, 해당 목표에게 ==「조화도 파괴」== 를 발동한다",
        "character.yuanwu.terms.0.name": "「조화도 파괴」",
        "character.yuanwu.terms.0.description": "목표의 ==「부조화 수치」== 가 가득 찰 시, ==조화 소실== 상태에 진입한다.\n파티 내 등장 캐릭터는 해당 목표에게 ==「조화도 파괴 스킬」== 을 발동하여 피해를 입히고, 이후 목표의 ==조화 소실== 상태가 종료된다.\n목표가 경파급일 경우, 파티 내 캐릭터의 일부 스킬이 목표에 명중 시, 목표에게 ==조화도 파괴 피해==를 1회 입히며, 이후 목표의 ==조화 소실== 상태가 종료된다",
        "character.yuanwu.skillInput.overview": "[공명 회로 게이지.webp]\n\n개요\n\n천둥의 쐐기가 지속되는 동안, 협동 공격이 발동될 시, 특수 에너지를 회복할 수 있다\n\n특수 에너지가 상한에 도달 시, 공명 스킬을 길게 눌러 계곡의 뇌전을 발동하는 동시에 뇌전의 집행 상태에 진입할 수 있다",
        "character.yuanwu.skillInput.inputs.0": "· 계곡의 뇌전: 특수 에너지 충만 시, [key e] 길게 누르기"
    };

    const combinedData = { ...xiangliYaoData, ...yuanwuData };
    
    for (const [key, value] of Object.entries(combinedData)) {
        newContent += `\n  "${key}": ${JSON.stringify(value, null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')},`;
    }
    
    // Remove the last comma and close
    newContent = newContent.replace(/,$/, '') + '\n}';
    
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('Successfully merged Xiangli Yao and Yuanwu data into ko.json');
} catch (e) {
    console.error('Merge failed:', e);
}
