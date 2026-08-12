"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameData = void 0;
var index_1 = require("../../hsr-hub/data/index");
var index_2 = require("../../ww-hub/data/index");
var index_3 = require("../../nte-hub/data/index");
var index_4 = require("./index");
var i18n_1 = require("../i18n");
var notion_data_json_1 = require("./notion-data.json");
var getGameData = function (targetId) {
    var isEn = targetId === 'en';
    var gameId = isEn ? 'hsr' : targetId; // 기본적으로 'en' 요청은 HSR 번역용으로 처리
    // 1. Notion 데이터 파싱 및 매핑
    var typedNotionData = (notion_data_json_1.default || []);
    var notionWeapons = typedNotionData
        .filter(function (item) { return item.type && ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(item.type) && item.dbSource !== 'nte_weapons' && item.dbSource !== 'nte_characters'; })
        .map(function (item) {
        var atk = 500;
        var subStatName = '공격력';
        var subStatValue = '36.4%';
        var skillName = '노션 연동 스킬';
        var skillDescription = '노션에서 연동된 무기 스킬 설명입니다.';
        var description = item.content || '노션에서 연동된 무기 스토리입니다.';
        if (item.growthStats) {
            // 90레벨(또는 1~2성 무기의 경우 70레벨) 최종 스탯에서 고정밀 추출 시도
            var extractStats = function (level) {
                var regex = new RegExp("".concat(level, "\\s*:\\s*(?:\uAE30\uCD08\\s*)?\uACF5\uACA9\uB825\\s*\\*?\\*?(\\d+)\\*?\\*?\\s*\\/\\s*([^\\n*]+?)\\s*\\*?\\*?([\\d.]+%?)\\*?\\*?"), 'i');
                return item.growthStats.match(regex);
            };
            var lvMatch = extractStats(90) || extractStats(80) || extractStats(70);
            if (lvMatch) {
                atk = parseInt(lvMatch[1], 10);
                subStatName = lvMatch[2].trim();
                var parsedSubValue = lvMatch[3].trim();
                // 백분율 값 중 소수점 누락 오류 교차 검증 보정 (예: 201% -> 20.1%)
                if (parsedSubValue.endsWith('%')) {
                    var num = parseFloat(parsedSubValue);
                    if (num > 100) {
                        parsedSubValue = (num / 10).toFixed(1).replace(/\.0$/, '') + '%';
                    }
                }
                subStatValue = parsedSubValue;
            }
            else {
                // 폴백: 기존 라벨 기반 추출 시도 (부옵션명 공백 허용)
                var atkMatch = item.growthStats.match(/(?:기초\s*공격력|공격력)\s*:\s*(\d+)/i);
                if (atkMatch)
                    atk = parseInt(atkMatch[1], 10);
                var subNameMatch = item.growthStats.match(/(?:부옵션|서브\s*스탯|부스탯|부옵션명)\s*:\s*([^\d\n]+)/i);
                if (subNameMatch)
                    subStatName = subNameMatch[1].trim();
                var subValMatch = item.growthStats.match(/(?:부옵션|서브\s*스탯|부스탯)\s*:[^\n]*?([\d.]+%?)/i);
                if (subValMatch) {
                    var val = subValMatch[1].trim();
                    if (val.endsWith('%')) {
                        var num = parseFloat(val);
                        if (num > 100) {
                            val = (num / 10).toFixed(1).replace(/\.0$/, '') + '%';
                        }
                    }
                    subStatValue = val;
                }
            }
        }
        if (item.skillName)
            skillName = item.skillName.trim();
        if (item.skillDescription)
            skillDescription = item.skillDescription.trim();
        if (item.weaponStory)
            description = item.weaponStory.trim();
        return {
            id: item.id,
            gameId: 'ww',
            name: item.name,
            rarity: Number(item.rarity) || 5,
            type: (['대검', '직검', '권총', '권갑', '증폭기'].includes(item.type) ? item.type : '직검'),
            releaseVersion: item.releaseVersion || '1.0',
            obtain: item.obtain || '노션 연동',
            stats: {
                atk: atk,
                subStatName: subStatName,
                subStatValue: subStatValue
            },
            skill: {
                name: skillName,
                description: skillDescription
            },
            ascensionMaterials: item.ascensionMaterials || '',
            description: description,
            isNotion: true,
            content: item.content
        };
    });
    var notionCharacters = typedNotionData
        .filter(function (item) { return item.type === '캐릭터' && item.dbSource !== 'nte_characters'; })
        .map(function (item) {
        var attribute = item.itemAttribute || '회절';
        var weaponType = '직검';
        var releaseVersion = item.releaseVersion || '1.0';
        if (item.content) {
            if (!item.itemAttribute) {
                var attrMatch = item.content.match(/(?:속성|공명\s*속성)\s*:\s*([^\s\n]+)/i);
                if (attrMatch)
                    attribute = attrMatch[1].trim();
            }
            if (!item.weapon) {
                var wpMatch = item.content.match(/(?:무기|무기\s*종류|무기\s*타입)\s*:\s*([^\s\n]+)/i);
                if (wpMatch)
                    weaponType = wpMatch[1].trim();
            }
            if (!item.releaseVersion) {
                var verMatch = item.content.match(/(?:버전\s*정보|출시\s*버전)\s*:\s*([\d.]+)/i);
                if (verMatch)
                    releaseVersion = verMatch[1].trim();
            }
        }
        var parsedBaseStats = {};
        if (item.growthStats) {
            var lines = item.growthStats.split('\n');
            lines.forEach(function (line) {
                var match = line.match(/(\d+)\s*:\s*([\d,]+)\s+([\d,]+)\s+([\d,]+)/);
                if (match) {
                    var level = match[1];
                    parsedBaseStats["lv".concat(level)] = {
                        "기초 HP": parseInt(match[2].replace(/,/g, ''), 10),
                        "기초 공격력": parseInt(match[3].replace(/,/g, ''), 10),
                        "기초 방어력": parseInt(match[4].replace(/,/g, ''), 10)
                    };
                }
            });
        }
        var parsedAscension = [];
        if (item.ascensionMaterials) {
            var parts = item.ascensionMaterials.split(/\n/);
            parts.forEach(function (p) {
                var trimmed = p.trim();
                if (trimmed) {
                    var nameMatch = trimmed.match(/([^\dx*,]+)/);
                    var countMatch = trimmed.match(/[\dx*,]+$/);
                    if (nameMatch) {
                        parsedAscension.push({
                            name: nameMatch[1].trim(),
                            count: countMatch ? parseInt(countMatch[0].replace(/[x*,]/g, ''), 10) : 1
                        });
                    }
                }
            });
        }
        var parsedTraces = [];
        if (item.skillMaterials) {
            var parts = item.skillMaterials.split(/\n/);
            parts.forEach(function (p) {
                var trimmed = p.trim();
                if (trimmed) {
                    var nameMatch = trimmed.match(/([^\dx*,]+)/);
                    var countMatch = trimmed.match(/[\dx*,]+$/);
                    if (nameMatch) {
                        parsedTraces.push({
                            name: nameMatch[1].trim(),
                            count: countMatch ? parseInt(countMatch[0].replace(/[x*,]/g, ''), 10) : 1
                        });
                    }
                }
            });
        }
        var parsedSkills = [];
        var skillMap = [
            { key: 'basicAttack', name: '기본 공격', type: '기본 공격' },
            { key: 'resonanceSkill', name: '공명 스킬', type: '공명 스킬' },
            { key: 'resonanceCircuit', name: '공명 회로', type: '공명 회로' },
            { key: 'inherentSkill1', name: '고유 스킬 1', type: '고유 스킬' },
            { key: 'inherentSkill2', name: '고유 스킬 2', type: '고유 스킬' },
            { key: 'resonanceLiberation', name: '공명 해방', type: '공명 해방' },
            { key: 'introSkill', name: '변주 스킬', type: '변주 스킬' },
            { key: 'outroSkill', name: '반주 스킬', type: '반주 스킬' },
            { key: 'harmonyBreak', name: '조화도 파괴', type: '조화도 파괴' }
        ];
        skillMap.forEach(function (s) {
            if (item[s.key]) {
                var lines = item[s.key].split('\n');
                var skillName = lines[0].trim();
                var description = lines.slice(1).join('\n').trim();
                parsedSkills.push({
                    id: "notion_".concat(s.key),
                    name: skillName || s.name,
                    type: s.type,
                    tag: s.name, // Changed to s.name ('고유 스킬 1' instead of '고유 스킬') for WuwaSkillSection bonus parsing
                    description: description
                });
            }
        });
        if (parsedSkills.length === 0 && (item.skillName || item.skillDescription)) {
            parsedSkills.push({
                id: 'notion_skill',
                name: item.skillName || '공명 스킬',
                type: '공명 스킬',
                tag: '공명 스킬',
                description: item.skillDescription || '상세 내용 없음'
            });
        }
        var parsedChains = [];
        if (item.resonanceChains) {
            var chainText = item.resonanceChains;
            // Match "1. Title \n Description" until next number or end of string
            var regex = /(\d)\.\s*([^\n]+)\n([^]*?)(?=(?:\n\d\.\s)|$)/g;
            var match = void 0;
            while ((match = regex.exec(chainText)) !== null) {
                parsedChains.push({
                    id: "chain_".concat(match[1]),
                    rank: parseInt(match[1], 10),
                    name: match[2].trim(),
                    description: match[3].trim()
                });
            }
        }
        return {
            id: item.id,
            name: item.name,
            originalName: item.name,
            gameId: 'ww',
            folderName: item.name,
            attribute: attribute,
            weaponType: item.weapon || weaponType,
            rarity: Number(item.rarity) || 5,
            releaseVersion: releaseVersion,
            obtain: item.obtain || '노션 연동',
            briefInfo: item.briefInfo || item.name + ' - 노션 연동 캐릭터 정보',
            affiliation: item.affiliation,
            roles: item.combatRoles ? item.combatRoles.split('\n').map(function (r) {
                var parts = r.includes(':') ? r.split(':') : r.split('：');
                if (parts.length > 1) {
                    return { label: parts[0].trim(), description: parts.slice(1).join(':').trim() };
                }
                return { label: r.trim(), description: '' };
            }).filter(function (r) { return r.label; }) : [],
            locales: item.locales,
            voiceActors: item.voiceActors,
            glossary: item.glossary,
            isNotion: true,
            content: item.content,
            skillInputGuide: item.skillInputGuide,
            combatCycle: item.combatCycle,
            materials_v2: {
                ascension: parsedAscension,
                traces: parsedTraces
            },
            baseStats: Object.keys(parsedBaseStats).length > 0 ? parsedBaseStats : {},
            skills: parsedSkills,
            eidolons: parsedChains
        };
    });
    var notionLightcones = typedNotionData
        .filter(function (item) { return item.dbSource === 'weapons' && ['지식', '수렵', '파멸', '보존', '풍요', '공허', '화합'].includes(item.type || ''); })
        .map(function (item) { return ({
        id: item.id,
        gameId: 'hsr',
        name: item.name,
        rarity: Number(item.rarity) || 5,
        path: '파멸',
        releaseVersion: item.releaseVersion || '1.0',
        isNotion: true,
        content: item.content
    }); });
    var notionHsrCharacters = typedNotionData
        .filter(function (item) { return item.type === 'HSR 캐릭터'; })
        .map(function (item) {
        var attribute = '물리';
        var pathType = '파멸';
        var releaseVersion = item.releaseVersion || '1.0';
        if (item.content) {
            var attrMatch = item.content.match(/(?:속성|전투\s*속성)\s*:\s*([^\s\n]+)/i);
            if (attrMatch)
                attribute = attrMatch[1].trim();
            var pathMatch = item.content.match(/(?:운명의\s*길|클래스)\s*:\s*([^\s\n]+)/i);
            if (pathMatch)
                pathType = pathMatch[1].trim();
            var verMatch = item.content.match(/(?:버전\s*정보|출시\s*버전)\s*:\s*([\d.]+)/i);
            if (verMatch)
                releaseVersion = verMatch[1].trim();
        }
        return {
            id: item.id,
            name: item.name,
            originalName: item.name,
            gameId: 'hsr',
            folderName: item.name,
            attribute: attribute,
            path: pathType,
            rarity: Number(item.rarity) || 5,
            releaseVersion: releaseVersion,
            isNotion: true,
            content: item.content,
            materials_v2: {
                ascension: [],
                traces: []
            }
        };
    });
    // 노션 명조 아이템 추출
    var notionWwItems = typedNotionData
        .filter(function (item) { return item.dbSource === 'ww_items' || (!item.dbSource && (item.type === '아이템' || item.type === '소모품' || item.type === '재료' || item.type === '육성 아이템' || item.type === '성급' || !item.type)); })
        .map(function (item) {
        return {
            id: item.id,
            name: item.name,
            type: item.type || '아이템',
            rarity: item.rarity,
            desc: item.content || item.skillDescription || '',
            sources: item.obtain ? item.obtain.split(/[\n,]+/).map(function (s) { return s.trim(); }).filter(Boolean) : ["정보 없음"],
            folderName: item.name,
            fileName: item.fileName || '',
            gameId: 'ww',
            isNotion: true,
            itemAttribute: item.itemAttribute // 남여 분리 여부 등 확인을 위해 전달
        };
    });
    // 노션 이환(NTE) 아이템 추출
    var notionNteItems = typedNotionData
        .filter(function (item) { return item.dbSource === 'nte_items'; })
        .map(function (item) {
        return {
            id: item.id,
            name: item.name,
            type: item.type || '아이템',
            rarity: item.rarity,
            desc: item.content || item.skillDescription || item.briefInfo || '',
            sources: item.obtain ? item.obtain.split(/[\n,]+/).map(function (s) { return s.trim(); }).filter(Boolean) : ["정보 없음"],
            folderName: item.name,
            fileName: item.fileName || '',
            gameId: 'nte',
            isNotion: true,
            itemAttribute: item.itemAttribute
        };
    });
    // 노션 이환(NTE) 캐릭터 추출
    var notionNteCharacters = typedNotionData
        .filter(function (item) { return item.dbSource === 'nte_characters'; })
        .map(function (item) {
        return {
            id: item.id,
            name: item.name,
            originalName: item.name,
            gameId: 'nte',
            folderName: item.name,
            type: '캐릭터',
            itemAttribute: item.itemAttribute || '',
            attribute: item.abilityAttribute || item.itemAttribute || '',
            arc: item.arc || '',
            contract: item.contract || '',
            birthday: item.birthday || '',
            citySkill: item.citySkill || '',
            virailSkill: item.virailSkill || '',
            ultimateSkill: item.ultimateSkill || '',
            supportSkill: item.supportSkill || '',
            passiveSkill1: item.passiveSkill1 || '',
            passiveSkill2: item.passiveSkill2 || '',
            awakenings: item.awakenings || '',
            resonance: item.resonance || '',
            content: item.content || '',
            briefInfo: item.briefInfo || '',
            locales: item.locales || '',
            voiceActors: item.voiceActors || '',
            affiliation: item.affiliation || '',
            roles: item.combatRoles ? item.combatRoles.split('\n').filter(Boolean) : [],
            growthStats: item.growthStats || '',
            ascensionMaterials: item.ascensionMaterials || '',
            skillMaterials: item.skillMaterials || '',
            basicAttack: item.basicAttack || '',
            isNotion: true,
            fileName: item.fileName || '',
        };
    });
    // 노션 명조 에코 추출 및 매핑
    var notionWwEchoes = typedNotionData
        .filter(function (item) { return item.dbSource === 'ww_echoes'; })
        .map(function (item) {
        return {
            id: item.id,
            name: item.name,
            cost: item.cost,
            sonataSets: item.sonataSets || [],
            folderName: item.name,
            cooldown: item.cooldown,
            description: item.content || item.skillDescription || '',
            hasPhantom: item.hasPhantom || false,
            enemyInfo: {
                originalName: item.enemyOriginalName || '',
                grade: item.enemyGrade || '',
                description: item.enemyDescription || '',
                specialNote: item.enemySpecialNote || '',
                drops: item.drops || []
            }
        };
    });
    // 중복 제거 및 노션 오버라이드 병합 로직 (이름 기준)
    var wwCharMap = new Map();
    index_2.WW_DATA_ALL.CHARACTER_DB.forEach(function (c) {
        var key = (c.folderName || c.originalName || c.name || '').trim();
        if (key)
            wwCharMap.set(key, c);
    });
    var normalizeNotionGuide = function (text) {
        if (!text)
            return '';
        var normalized = text.replace(/\r\n/g, '\n');
        normalized = normalized.replace(/^스킬 입력 가이드[^\n]*\n?/i, '');
        normalized = normalized.replace(/(?<!\n)\n(?!\n)/g, '\n\n');
        normalized = normalized.replace(/\[공명 회로 게이지 이미지(\d*)(?:\.webp)?\]/g, '[공명 회로 게이지$1.webp]');
        return normalized.trim();
    };
    var extractOverviewAndInputs = function (text) {
        if (!text)
            return { overview: '', extractedInputs: [] };
        var match = text.match(/\n\n(메커니즘 설명|조작 입력)\n\n/);
        if (match) {
            var splitIndex = match.index;
            var overview = text.substring(0, splitIndex).trim();
            var mechText = text.substring(splitIndex).trim();
            var extractedInputs = mechText.replace(/^(메커니즘 설명|조작 입력)\n\n/, '').split('\n\n').filter(Boolean);
            return { overview: overview, extractedInputs: extractedInputs };
        }
        return { overview: text, extractedInputs: [] };
    };
    notionCharacters.forEach(function (c) {
        var _a, _b, _c, _d;
        var key = (c.folderName || c.originalName || c.name || '').trim();
        if (key) {
            var existing = wwCharMap.get(key);
            var rawGuide = c.skillInputGuide || '';
            if (rawGuide.trim().toLowerCase() === 'a')
                rawGuide = ''; // Ignore 'a' placeholder
            var normalizedGuide = rawGuide ? normalizeNotionGuide(rawGuide) : '';
            var _e = extractOverviewAndInputs(normalizedGuide), overview = _e.overview, extractedInputs = _e.extractedInputs;
            var finalInputs = c.combatCycle ? c.combatCycle.split('\n').filter(Boolean) : [];
            if (finalInputs.length === 0 && extractedInputs.length > 0) {
                finalInputs = extractedInputs;
            }
            if (finalInputs.length === 0 && ((_a = existing === null || existing === void 0 ? void 0 : existing.skillInput) === null || _a === void 0 ? void 0 : _a.inputs)) {
                finalInputs = existing.skillInput.inputs;
            }
            var finalOverview = overview || ((_b = existing === null || existing === void 0 ? void 0 : existing.skillInput) === null || _b === void 0 ? void 0 : _b.overview) || '';
            if (existing) {
                if (true) {
                    if (c.attribute && existing.attribute && existing.attribute !== c.attribute) {
                        console.warn("\u26A0\uFE0F [Data Mismatch] ".concat(c.name || existing.name, ": \uB85C\uCEEC \uC18D\uC131(").concat(existing.attribute, ")\uC774 \uB178\uC158 \uC18D\uC131(").concat(c.attribute, ")\uACFC \uB2E4\uB985\uB2C8\uB2E4. \uB178\uC158 \uB370\uC774\uD130\uB85C \uAC15\uC81C \uC624\uBC84\uB77C\uC774\uB4DC\uD569\uB2C8\uB2E4."));
                    }
                    if (c.weaponType && existing.weaponType && existing.weaponType !== c.weaponType) {
                        console.warn("\u26A0\uFE0F [Data Mismatch] ".concat(c.name || existing.name, ": \uB85C\uCEEC \uBB34\uAE30(").concat(existing.weaponType, ")\uAC00 \uB178\uC158 \uBB34\uAE30(").concat(c.weaponType, ")\uC640 \uB2E4\uB985\uB2C8\uB2E4. \uB178\uC158 \uB370\uC774\uD130\uB85C \uAC15\uC81C \uC624\uBC84\uB77C\uC774\uB4DC\uD569\uB2C8\uB2E4."));
                    }
                }
                // 기존 캐릭터가 있을 경우, 노션 데이터를 최우선으로 병합
                var mergedMetadata = __assign(__assign({}, existing.metadata), { element: c.attribute || ((_c = existing.metadata) === null || _c === void 0 ? void 0 : _c.element) || existing.attribute, weapon: c.weaponType || ((_d = existing.metadata) === null || _d === void 0 ? void 0 : _d.weapon) || existing.weaponType });
                wwCharMap.set(key, __assign(__assign({}, existing), { name: c.name || existing.name || '', attribute: c.attribute || existing.attribute || '', weaponType: c.weaponType || existing.weaponType || '', roles: c.roles && c.roles.length > 0 ? c.roles : existing.roles, materials_v2: c.materials_v2 && (c.materials_v2.ascension.length > 0 || c.materials_v2.traces.length > 0) ? c.materials_v2 : existing.materials_v2, skills: c.skills && c.skills.length > 0 ? c.skills : existing.skills, eidolons: c.eidolons && c.eidolons.length > 0 ? c.eidolons : existing.eidolons, baseStats: c.baseStats && Object.keys(c.baseStats).length > 0 ? c.baseStats : existing.baseStats, metadata: mergedMetadata, skillInput: __assign(__assign({}, existing.skillInput), { overview: finalOverview, inputs: finalInputs, hideGauge: true }), obtain: c.obtain !== '노션 연동' ? c.obtain : existing.obtain, releaseVersion: c.releaseVersion || existing.releaseVersion }));
            }
            else {
                // 기존에 없는 신규 캐릭터
                c.skillInput = {
                    overview: finalOverview,
                    inputs: finalInputs,
                    hideGauge: true
                };
                wwCharMap.set(key, c);
            }
        }
    });
    var mergedCharacters = Array.from(wwCharMap.values());
    var wwWeaponMap = new Map();
    index_2.WW_DATA_ALL.WEAPON_DATA.forEach(function (w) {
        var key = (w.folderName || w.originalName || w.name || '').trim();
        if (key)
            wwWeaponMap.set(key, w);
    });
    notionWeapons.forEach(function (w) {
        var key = (w.folderName || w.originalName || w.name || '').trim();
        if (key)
            wwWeaponMap.set(key, w);
    });
    var mergedWeapons = Array.from(wwWeaponMap.values());
    var hsrCharMap = new Map();
    index_1.HSR_DATA_ALL.CHARACTER_DB.forEach(function (c) {
        var key = (c.folderName || c.originalName || c.name || '').trim();
        if (key)
            hsrCharMap.set(key, c);
    });
    notionHsrCharacters.forEach(function (c) {
        var key = (c.folderName || c.originalName || c.name || '').trim();
        if (key)
            hsrCharMap.set(key, c);
    });
    var mergedHsrCharacters = Array.from(hsrCharMap.values());
    var hsrLcMap = new Map();
    index_1.HSR_DATA_ALL.LIGHTCONE_DB.forEach(function (lc) {
        var key = (lc.folderName || lc.originalName || lc.name || '').trim();
        if (key)
            hsrLcMap.set(key, lc);
    });
    notionLightcones.forEach(function (lc) {
        var key = (lc.folderName || lc.originalName || lc.name || '').trim();
        if (key)
            hsrLcMap.set(key, lc);
    });
    var mergedLightcones = Array.from(hsrLcMap.values());
    var wwEchoMap = new Map();
    index_2.WW_DATA_ALL.ECHO_DATA.forEach(function (e) {
        var key = (e.name || '').trim();
        if (key)
            wwEchoMap.set(key, e);
    });
    notionWwEchoes.forEach(function (e) {
        var _a, _b, _c, _d, _e;
        var key = (e.name || '').trim();
        if (key) {
            var existing = wwEchoMap.get(key);
            if (existing) {
                wwEchoMap.set(key, __assign(__assign({}, existing), { cost: e.cost || existing.cost, sonataSets: e.sonataSets && e.sonataSets.length > 0 ? e.sonataSets : existing.sonataSets, cooldown: e.cooldown || existing.cooldown, description: e.description || existing.description, hasPhantom: e.hasPhantom || existing.hasPhantom, enemyInfo: __assign(__assign({}, existing.enemyInfo), { originalName: e.enemyInfo.originalName || ((_a = existing.enemyInfo) === null || _a === void 0 ? void 0 : _a.originalName) || '', grade: e.enemyInfo.grade || ((_b = existing.enemyInfo) === null || _b === void 0 ? void 0 : _b.grade) || '', description: e.enemyInfo.description || ((_c = existing.enemyInfo) === null || _c === void 0 ? void 0 : _c.description) || '', specialNote: e.enemyInfo.specialNote || ((_d = existing.enemyInfo) === null || _d === void 0 ? void 0 : _d.specialNote) || '', drops: e.enemyInfo.drops && e.enemyInfo.drops.length > 0 ? e.enemyInfo.drops : ((_e = existing.enemyInfo) === null || _e === void 0 ? void 0 : _e.drops) || [] }) }));
            }
            else {
                wwEchoMap.set(key, e);
            }
        }
    });
    var mergedEchoes = Array.from(wwEchoMap.values());
    // 2. 도메인별 데이터를 독립적으로 정의합니다.
    var hsrData = {
        CHARACTER_DB: mergedHsrCharacters,
        LIGHTCONE_DB: mergedLightcones,
        RELIC_DB: index_1.HSR_DATA_ALL.RELIC_DB,
        ORNAMENT_DB: index_1.HSR_DATA_ALL.ORNAMENT_DB,
        INVENTORY_DB: Object.fromEntries(Object.entries(index_1.HSR_DATA_ALL.INVENTORY_DB).map(function (_a) {
            var k = _a[0], v = _a[1];
            return [k, __assign(__assign({}, v), { gameId: 'hsr' })];
        })),
        GUIDES: index_1.HSR_DATA_ALL.GUIDES
    };
    var wwData = {
        CHARACTER_DB: mergedCharacters,
        WEAPON_DB: mergedWeapons,
        WEAPON_DATA: mergedWeapons,
        ECHO_DB: mergedEchoes,
        INVENTORY_DB: __spreadArray(__spreadArray([], notionWwItems, true), (index_2.WW_DATA_ALL.ITEM_DATA || []), true).reduce(function (acc, item) {
            acc[item.name || item.folderName || item.id] = __assign(__assign({}, item), { gameId: 'ww' });
            return acc;
        }, {}),
        GUIDES: index_2.WW_DATA_ALL.GUIDES
    };
    // 3. 요청된 ID에 따라 관련 데이터셋을 선택합니다.
    var baseData;
    if (gameId === 'hsr') {
        baseData = {
            CHARACTER_DB: hsrData.CHARACTER_DB,
            LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
            RELIC_DB: hsrData.RELIC_DB,
            ORNAMENT_DB: hsrData.ORNAMENT_DB,
            HSR_INVENTORY: hsrData.INVENTORY_DB,
            INVENTORY_DB: hsrData.INVENTORY_DB,
            GUIDES: hsrData.GUIDES
        };
    }
    else if (gameId === 'ww') {
        baseData = {
            CHARACTER_DB: wwData.CHARACTER_DB,
            WEAPON_DB: wwData.WEAPON_DB,
            WEAPON_DATA: wwData.WEAPON_DB,
            ECHO_DB: wwData.ECHO_DB,
            WW_INVENTORY: wwData.INVENTORY_DB,
            INVENTORY_DB: wwData.INVENTORY_DB,
            GUIDES: wwData.GUIDES
        };
    }
    else if (gameId === 'nte') {
        baseData = {
            CHARACTER_DB: __spreadArray(__spreadArray([], index_3.NTE_DATA_ALL.CHARACTER_DB, true), notionNteCharacters, true),
            WEAPON_DB: index_3.NTE_DATA_ALL.WEAPON_DATA,
            WEAPON_DATA: index_3.NTE_DATA_ALL.WEAPON_DATA,
            ECHO_DB: index_3.NTE_DATA_ALL.ECHO_DATA,
            INVENTORY_DB: __spreadArray(__spreadArray([], notionNteItems, true), (index_3.NTE_DATA_ALL.ITEM_DATA || []), true).reduce(function (acc, item) {
                acc[item.name || item.id] = __assign(__assign({}, item), { gameId: 'nte' });
                return acc;
            }, {}),
            NOTICES: index_3.NTE_DATA_ALL.NOTICES,
            GUIDES: index_3.NTE_DATA_ALL.GUIDES
        };
    }
    else {
        // 폴백: 전체 병합 (언어 코드 'ko' 등이 들어왔을 때 데이터 유실 방지)
        baseData = {
            CHARACTER_DB: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], hsrData.CHARACTER_DB, true), wwData.CHARACTER_DB, true), notionNteCharacters, true), index_3.NTE_DATA_ALL.CHARACTER_DB, true),
            LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
            WEAPON_DB: __spreadArray(__spreadArray([], wwData.WEAPON_DB, true), index_3.NTE_DATA_ALL.WEAPON_DATA, true),
            WEAPON_DATA: __spreadArray(__spreadArray([], wwData.WEAPON_DB, true), index_3.NTE_DATA_ALL.WEAPON_DATA, true),
            ECHO_DB: __spreadArray(__spreadArray([], wwData.ECHO_DB, true), index_3.NTE_DATA_ALL.ECHO_DATA, true),
            RELIC_DB: hsrData.RELIC_DB,
            ORNAMENT_DB: hsrData.ORNAMENT_DB,
            INVENTORY_DB: __assign(__assign(__assign({}, hsrData.INVENTORY_DB), wwData.INVENTORY_DB), (__spreadArray(__spreadArray([], notionNteItems, true), (index_3.NTE_DATA_ALL.ITEM_DATA || []), true).reduce(function (acc, item) { acc[item.name || item.id] = item; return acc; }, {}))),
            GUIDES: __spreadArray(__spreadArray(__spreadArray([], hsrData.GUIDES, true), wwData.GUIDES, true), index_3.NTE_DATA_ALL.GUIDES, true)
        };
    }
    if (isEn) {
        var translatedCharacters = baseData.CHARACTER_DB.map(function (koChar) {
            var _a, _b, _c, _d;
            var enChar = index_4.CHARACTER_DB_EN.find(function (c) { return c.id === koChar.id; });
            // 1. 완전한 형태의 영어 파일(ashveil_en)이 존재하면 병합 없이 100% 통째로 교체합니다!
            if (enChar) {
                return __assign(__assign({}, enChar), { originalName: koChar.name });
            }
            // 2. 아직 영어 파일이 없는 캐릭터만 기존 KO 버전에 이름만 영어로 유지
            return __assign(__assign({}, koChar), { originalName: koChar.name, name: i18n_1.default.t(koChar.name), path: koChar.path ? i18n_1.default.t(koChar.path) : undefined, attribute: koChar.attribute ? i18n_1.default.t(koChar.attribute) : undefined, materials_v2: {
                    ascension: ((_b = (_a = koChar.materials_v2) === null || _a === void 0 ? void 0 : _a.ascension) === null || _b === void 0 ? void 0 : _b.map(function (m) { return (__assign(__assign({}, m), { name: i18n_1.default.t(m.name) })); })) || [],
                    traces: ((_d = (_c = koChar.materials_v2) === null || _c === void 0 ? void 0 : _c.traces) === null || _d === void 0 ? void 0 : _d.map(function (m) { return (__assign(__assign({}, m), { name: i18n_1.default.t(m.name) })); })) || []
                } });
        });
        return __assign(__assign({}, baseData), { CHARACTER_DB: translatedCharacters });
    }
    return __assign(__assign({}, baseData), { CHARACTER_DB: baseData.CHARACTER_DB.map(function (koChar) { return (__assign(__assign({}, koChar), { originalName: koChar.name })); }) });
};
exports.getGameData = getGameData;
