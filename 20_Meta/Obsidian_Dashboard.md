# 💎 Rira Game Hub Obsidian Dashboard

> **P-Reinforce** 엔진에 의해 관리되는 실시간 지식 대시보드입니다. 
> Obsidian에서 **Dataview** 플러그인을 설치하면 아래 쿼리들이 작동합니다.

## 🛠️ 활성 프로젝트 (Active Projects)
```dataview
list from "10_Wiki/🛠️ Projects"
where contains(tags, "roadmap") or confidence_score > 0.8
sort last_reinforced desc
```

## 🚀 최근 습득한 기술 (Recent Skills)
```dataview
table tags as "태그", confidence_score as "확신도"
from "10_Wiki/🚀 Skills"
sort last_reinforced desc
limit 5
```

## 💡 주요 개념 및 토픽 (Key Topics)
```dataview
list from "10_Wiki/💡 Topics"
sort file.name asc
```

## ⚖️ 의사결정 및 감사 (Audit & Decisions)
```dataview
table last_reinforced as "최종 강화일"
from "10_Wiki/⚖️ Decisions"
```

---

## 🔗 지식 연결 상태 (Graph Overview)
- **전체 인덱스**: [[Index]]
- **강화 정책**: [[Policy]]
- **설정 가이드**: [[obsidian-setup-guide]]
