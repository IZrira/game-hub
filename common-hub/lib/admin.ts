export const ADMIN_IDS = [
  '9ba8bfc5-f680-444d-8720-192f471610d3' // RIRA Master ID
];

export const isAdmin = (userId: string | undefined) => {
  if (!userId) return false;
  return ADMIN_IDS.includes(userId);
};
