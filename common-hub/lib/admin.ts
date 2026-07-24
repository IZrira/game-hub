export const ADMIN_IDS = [
  '9ba8bfc5-f680-444d-8720-192f471610d3', // RIRA Master ID (본계정)
  '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'  // RIRA Datahub ID (부계정)
];

export const isAdmin = (userId: string | undefined) => {
  if (!userId) return false;
  return ADMIN_IDS.includes(userId);
};
