import { getGameData } from '../common-hub/data/dataManager';

const { CHARACTER_DB } = getGameData('nte');
const charTasks = CHARACTER_DB.map((c: any) => ({
    id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
    name: c.name,
    folder_name: c.folderName || c.name,
    rarity: c.rarity || 5,
    attribute: c.attribute || '이능',
    path: c.arc || '결합',
    version: c.releaseVersion || '1.0'
}));

console.log(JSON.stringify(charTasks.slice(0, 5), null, 2));
