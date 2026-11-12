export const REGION_EDGES = {
  china: ["central-asia"],
  "central-asia": ["china", "india", "persia"],
  india: ["central-asia", "persia"],
  persia: ["central-asia", "india", "arabia"],
  arabia: ["persia", "byzantium"],
  byzantium: ["arabia"],
};

export function canTradeBetween(round, from, to, intermediaries = [], zones = {}) {
  if (from === to) return true;
  if (round === 1) return false;
  if (round === 2) return zones[from] === zones[to];
  const path = [from, ...intermediaries, to];
  return path.length === 2
    ? (REGION_EDGES[from] || []).includes(to)
    : path.slice(0, -1).every((region, i) => (REGION_EDGES[region] || []).includes(path[i + 1]));
}
