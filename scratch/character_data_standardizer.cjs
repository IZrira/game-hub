const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/characters/hsr/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    const pathMatch = content.match(/path:\s*["']([^"']+)["']/);
    const rarityMatch = content.match(/rarity:\s*(\d+)/);
    
    if (nameMatch && pathMatch && rarityMatch) {
        const charName = nameMatch[1];
        const pathVal = pathMatch[1];
        const rarity = parseInt(rarityMatch[1]);
        const isTrailblazer = charName.includes('개척자');

        // --- 1. Credit & Trace Material Counts ---
        let tc = []; // Tracks, PathT1, PathT2, PathT3, Weekly, MobT1, MobT2, MobT3
        let targetTraceCredits = '';
        
        if (isTrailblazer) {
            if (pathVal === '환락') {
                targetTraceCredits = '1,808,000';
                tc = ["3", "9", "40", "79", "9", "23", "37", "24"];
            } else if (pathVal === '기억') {
                targetTraceCredits = '1,777,200';
                tc = ["3", "6", "39", "78", "9", "24", "33", "24"];
            } else {
                targetTraceCredits = '1,758,000';
                tc = ["3", "8", "42", "77", "9", "22", "35", "20"];
            }
        } else if (rarity === 4) {
            targetTraceCredits = '1,758,000';
            tc = ["3", "8", "42", "77", "9", "22", "35", "20"];
        } else if (rarity === 5) {
            if (pathVal === '환락') {
                targetTraceCredits = '2,260,000';
                tc = ["6", "14", "53", "104", "9", "33", "49", "36"];
            } else if (pathVal === '기억') {
                targetTraceCredits = '2,221,500';
                tc = ["6", "12", "54", "102", "9", "33", "48", "30"];
            } else {
                targetTraceCredits = '2,197,500';
                tc = ["6", "12", "53", "101", "9", "33", "46", "28"];
            }
        }

        const tracesRegex = /(traces:\s*\[([\s\S]*?)\])/;
        const tracesMatch = content.match(tracesRegex);
        if (tracesMatch) {
            let tracesBlock = tracesMatch[1];
            const itemRegex = /({\s*name:\s*["']([^"']+)["'],\s*count:\s*["']([^"']+)["'],\s*rarity:\s*(\d+)\s*}|createMaterial\(["']([^"']+)["'],\s*([^,]+),\s*(\d+)\))/g;
            let items = [];
            let m;
            while ((m = itemRegex.exec(tracesBlock)) !== null) {
                items.push({ fullMatch: m[0], isObject: !!m[2], name: m[2] || m[5], count: m[3] || m[6] });
            }
            
            if (items.length === 9) {
                // Update Credits (Index 0)
                if (targetTraceCredits) {
                    const creditItem = items[0];
                    const newRow = creditItem.isObject 
                        ? creditItem.fullMatch.replace(/count:\s*["'][^"']+["']/, `count: "${targetTraceCredits}"`)
                        : creditItem.fullMatch.replace(/createMaterial\((["'][^"']+["']),\s*([^,]+),/, `createMaterial($1, "${targetTraceCredits}",`);
                    tracesBlock = tracesBlock.replace(creditItem.fullMatch, newRow);
                }
                // Update Materials (Indices 1-8 mapped to User order 1,3,4,5,2,6,7,8)
                const mapIndices = [1, 3, 4, 5, 2, 6, 7, 8];
                mapIndices.forEach((fileIdx, userIdx) => {
                    const item = items[fileIdx];
                    const newCount = tc[userIdx];
                    const newRow = item.isObject
                        ? item.fullMatch.replace(/count:\s*["'][^"']+["']/, `count: "${newCount}"`)
                        : item.fullMatch.replace(/createMaterial\((["'][^"']+["']),\s*([^,]+),/, `createMaterial($1, "${newCount}",`);
                    tracesBlock = tracesBlock.replace(item.fullMatch, newRow);
                });
                content = content.replace(tracesMatch[1], tracesBlock);
            }
        }

        // --- 2. Ascension Counts ---
        const ascensionRegex = /(ascension:\s*\[([\s\S]*?)\])/;
        const ascMatch = content.match(ascensionRegex);
        if (ascMatch) {
            let ascBlock = ascMatch[1];
            const itemRegex = /({\s*name:\s*["']([^"']+)["'],\s*count:\s*["']([^"']+)["'],\s*rarity:\s*(\d+)\s*}|createMaterial\(["']([^"']+)["'],\s*([^,]+),\s*(\d+)\))/g;
            let items = [];
            let m;
            while ((m = itemRegex.exec(ascBlock)) !== null) {
                items.push({ fullMatch: m[0], isObject: !!m[2] });
            }
            
            let ascCounts = [];
            if (isTrailblazer) {
                ascCounts = ["28", "12", "13", "12"];
            } else if (rarity === 4) {
                ascCounts = ["50", "12", "13", "12"];
            } else if (rarity === 5) {
                ascCounts = ["65", "15", "15", "15"];
            }
            
            if (items.length === 5 && ascCounts.length === 4) {
                ascCounts.forEach((newCount, i) => {
                    const item = items[i+1];
                    const newRow = item.isObject
                        ? item.fullMatch.replace(/count:\s*["'][^"']+["']/, `count: "${newCount}"`)
                        : item.fullMatch.replace(/createMaterial\((["'][^"']+["']),\s*([^,]+),/, `createMaterial($1, "${newCount}",`);
                    ascBlock = ascBlock.replace(item.fullMatch, newRow);
                });
                content = content.replace(ascMatch[1], ascBlock);
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log("Universal Data Standardizer consolidation complete.");
