# 💎 Rira Game Hub Obsidian Dashboard

> **P-Reinforce** 지식 엔진 및 **Rira Game Hub** 실시간 통합 대시보드입니다.
> Obsidian에서 **Dataview** 플러그인이 활성화되어 있으면 아래 실시간 테이블과 목록이 동적으로 렌더링됩니다.

---

## 🛠️ 활성 프로젝트 & 로드맵 (Active Projects & Roadmap)
```dataview
table confidence_score as "확신도", last_reinforced as "최근 업데이트"
from "10_Wiki/🛠️ Projects"
sort last_reinforced desc
```

---

## 👥 캐릭터 도감 위키 현황 (Character Wiki DB)

### 🌌 붕괴: 스타레일 (Honkai: Star Rail)
```dataview
table element as "속성", path as "운명의 길", rarity as "성급"
from "10_Wiki/👥 Characters/HSR"
sort file.name asc
limit 10
```
> *HSR 전체 캐릭터: [[10_Wiki/👥 Characters/HSR/acheron|아케론]], [[10_Wiki/👥 Characters/HSR/firefly|반디]], [[10_Wiki/👥 Characters/HSR/feixiao|비소]] 등 총 93명*

### 🌊 명조 (Wuthering Waves)
```dataview
table element as "속성", weapon as "무기", rarity as "성급"
from "10_Wiki/👥 Characters/WW"
sort file.name asc
limit 10
```
> *WW 전체 캐릭터: [[10_Wiki/👥 Characters/WW/jinhsi|금희]], [[10_Wiki/👥 Characters/WW/changli|장리]], [[10_Wiki/👥 Characters/WW/camellya|카멜리아]] 등 총 58명*

### 🏙️ 이환 (Neverness to Everness)
```dataview
table element as "이능력 속성", role as "역할군", rarity_grade as "등급"
from "10_Wiki/👥 Characters/NTE"
sort rarity desc, file.name asc
```
> *NTE 전체 캐릭터 (총 21명): [[10_Wiki/👥 Characters/NTE/guwon|구원(S)]], [[10_Wiki/👥 Characters/NTE/lacrimosa|라크리모사(S)]], [[10_Wiki/👥 Characters/NTE/zhanhong|잔홍(S)]], [[10_Wiki/👥 Characters/NTE/shinku|신쿠(S)]], [[10_Wiki/👥 Characters/NTE/eloy|일로이(S)]], [[10_Wiki/👥 Characters/NTE/cheese|치즈(S)]], [[10_Wiki/👥 Characters/NTE/chaos|카오스(S)]], [[10_Wiki/👥 Characters/NTE/daffodil|다포딜(S)]], [[10_Wiki/👥 Characters/NTE/hotori|호토리(S)]], [[10_Wiki/👥 Characters/NTE/evaluator|감정사(S)]], [[10_Wiki/👥 Characters/NTE/fadia|파디아(S)]], [[10_Wiki/👥 Characters/NTE/hathor|하토르(S)]], [[10_Wiki/👥 Characters/NTE/baijiang|백장(S)]], [[10_Wiki/👥 Characters/NTE/nanari|나나리(S)]], [[10_Wiki/👥 Characters/NTE/sakiri|사키리(S)]], [[10_Wiki/👥 Characters/NTE/umitsuki|우미츠키(A)]], [[10_Wiki/👥 Characters/NTE/adler|아들러(A)]], [[10_Wiki/👥 Characters/NTE/edgar|에드가(A)]], [[10_Wiki/👥 Characters/NTE/haniel|하니엘(A)]], [[10_Wiki/👥 Characters/NTE/mint|민트(A)]], [[10_Wiki/👥 Characters/NTE/skia|스키아(A)]]*

---

## 🔮 장비 & 아크 도감 위키 현황 (Equipment & Arcs)
- **이환 아크 데이터베이스 (총 49종)**: [[nte-arc-database-guide]]
  - S등급 (5성 - 28종): `「마지막 장미」`, `「세상을 뒤흔든 비」`, `백만불짜리 미소`, `금기의 문` 등
  - A등급 (4성 - 16종): `물망산`, `뒤틀린 도시의 부름`, `때는 온다` 등
  - B등급 (3성 - 5종): `「우리.」`, `광란의 「전자음악」`, `미소 천사` 등
- **붕괴 스타레일 광추 데이터베이스**: [[lightcone-config]]
- **명조 무기 & 에코 데이터베이스**: [[ww-echo-mechanics]]

---

## 📚 표준 개발 & 시스템 가이드 (Standard Guides)
```dataview
list
from "docs/guides"
sort file.name asc
```

---

## ⚖️ 의사결정 및 작업 기록 (Decisions & Work Logs)
```dataview
table last_reinforced as "최종 갱신일", github_commit as "커밋"
from "10_Wiki/⚖️ Decisions"
sort last_reinforced desc
```

---

## 🏢 1인 기업 에이전트 시스템 (`_company/`)
- **공동 목표**: [[_company/_shared/goals|🎯 goals.md]]
- **의사결정 로그**: [[_company/_shared/decisions|⚖️ decisions.md]]
- **회사 정체성**: [[_company/_shared/identity|🏢 identity.md]]
- **통합 스케줄**: [[_company/_shared/schedule|📋 schedule.md]]

---

## 🔗 지식 연결 상태 (Quick Access)
- **통합 메인 인덱스**: [[Index]]
- **지식 강화 정책**: [[Policy]]
- **텍스트 포맷팅 가이드**: [[text-formatting-guide]]
- **이환 아크 가이드**: [[nte-arc-database-guide]]
- **옵시디언 설정 가이드**: [[obsidian-setup-guide]]
- **프리미엄 UI/UX 가이드**: [[obsidian-premium-enhancement]]
