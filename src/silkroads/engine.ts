export type RegionId = "china" | "central-asia" | "india" | "persia" | "arabia" | "byzantium";
export type ItemKind = "goods" | "technology" | "belief" | "disease";
export interface TradeItem { id: string; name: string; origin: RegionId | "unknown"; kind: ItemKind }
export interface Merchant { id: string; name: string; region: RegionId; items: TradeItem[] }
export interface SilkRoom {
  code: string; round: 1 | 2 | 3; status: string;
  zones: Record<RegionId, "A" | "B" | "C">;
  players: Merchant[]; offers: any[];
  log: { id: string; message: string; at: string }[];
}
export const REGIONS: { id: RegionId; name: string; x: number; y: number }[] = [
  {id:"china",name:"China",x:820,y:210},
  {id:"central-asia",name:"Central Asia",x:585,y:275},
  {id:"india",name:"India",x:665,y:475},
  {id:"persia",name:"Persia",x:420,y:345},
  {id:"arabia",name:"Arabia",x:255,y:475},
  {id:"byzantium",name:"Byzantium",x:170,y:220},
];
export const DEFAULT_ZONES: Record<RegionId,"A"|"B"|"C"> = {
  byzantium:"A",arabia:"A",persia:"B",india:"B","central-asia":"C",china:"C"
};
export const STARTER: Record<RegionId,string[]> = {
  china:["Silk-making technology","Gunpowder","Paper money","Farming techniques","Silk","Ginger","Rice","Wheat","Confucianism","Legalism","Taoism"],
  "central-asia":["Saddle","Stirrups","Livestock","Animal hides","Central Asian Horses","Animism"],
  india:["Medicine","Cotton","Pepper","Spices","Barley","Wheat","Hinduism","Buddhism"],
  persia:["Ammonium Chloride","Wool","Dates","Lapis lazuli","Grain","Zoroastrianism"],
  arabia:["Algebra","Cartography","Medical techniques","Dyes","Copper metal","Islam"],
  byzantium:["Glass-making techniques","Glass","Olive oil","Wine","Gold"],
};
export const GUIDES: Record<RegionId,{round2:string;round3:string}> = {
  china:{round2:"The emperor demands taxes in silk. Each merchant removes one food- or goods-related card. Gold acquired is worth double at the end.",round3:"Subtract 1 point for each remaining silk item. Each disease card counts −1."},
  "central-asia":{round2:"Your population is growing. Seek food for your people, especially from China.",round3:"Food-related cards are worth double, regardless of origin. Each disease card counts −1."},
  india:{round2:"Your population is increasing. Your group needs more food for its people.",round3:"Foreign-origin religion cards are worth double. Each disease card counts −1."},
  persia:{round2:"Your location gives you an opportunity to act as a middleman. Negotiate useful deals between regions.",round3:"Foreign-origin luxury goods (not technologies or beliefs) are worth double. Each disease card counts −1."},
  arabia:{round2:"Your technologies and belief systems are taking root abroad. Consider cultural influence.",round3:"All belief cards are worth double, regardless of origin. Each disease card counts −1."},
  byzantium:{round2:"Your glass-making techniques and wealth attract interest. Silk from China is especially valuable.",round3:"Remaining gold counts −1; silk counts double. Each disease card counts −1."},
};
export function scoreMerchant(player: Merchant) {
  const foreign = player.items.filter(i=>i.kind!=="disease"&&i.origin!==player.region&&i.origin!=="unknown");
  const count=(name:string)=>player.items.filter(i=>i.name===name).length;
  const food=player.items.filter(i=>["Rice","Wheat","Barley","Grain","Dates","Ginger"].includes(i.name)).length;
  const foreignGoods=foreign.filter(i=>i.kind==="goods").length;
  const foreignBeliefs=foreign.filter(i=>i.kind==="belief").length;
  let score=foreign.length-player.items.filter(i=>i.kind==="disease").length;
  if(player.region==="china") score+=count("Gold")-count("Silk");
  if(player.region==="central-asia") score+=food;
  if(player.region==="india") score+=foreignBeliefs;
  if(player.region==="persia") score+=foreignGoods;
  if(player.region==="arabia") score+=player.items.filter(i=>i.kind==="belief").length;
  if(player.region==="byzantium") score+=count("Silk")-count("Gold");
  return {score,foreignItems:foreign.length};
}
