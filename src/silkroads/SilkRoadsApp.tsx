import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, BookOpen, Check, ChevronRight, Copy, Crown, Globe2, MapPin, Route, Send, Users, X } from "lucide-react";
import "./SilkRoadsApp.css";
import { DEFAULT_ZONES, GUIDES, REGIONS, scoreMerchant, type RegionId, type SilkRoom } from "./engine";

const API = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : "");
type View = "map" | "market" | "journal";

export default function SilkRoadsApp() {
  const [code,setCode]=useState(""); const [name,setName]=useState(""); const [region,setRegion]=useState<RegionId>("china");
  const [room,setRoom]=useState<SilkRoom|null>(null); const [playerId,setPlayerId]=useState(""); const [playerToken,setPlayerToken]=useState(""); const [hostToken,setHostToken]=useState("");
  const [joinMode,setJoinMode]=useState<"create"|"join">("create"); const [view,setView]=useState<View>("map");
  const [zones,setZones]=useState(DEFAULT_ZONES); const [targetId,setTargetId]=useState("");
  const [give,setGive]=useState<string[]>([]); const [want,setWant]=useState<string[]>([]); const [via,setVia]=useState<string[]>([]);
  const [error,setError]=useState(""); const [notice,setNotice]=useState(""); const [busy,setBusy]=useState(false);

  const request=useCallback(async(path:string,body?:unknown,method="POST")=>{
    const response=await fetch(API+"/api/silk-roads"+path,{method,headers:{"Content-Type":"application/json"},body:body===undefined?undefined:JSON.stringify(body)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(data.error||"Request failed");
    return data;
  },[]);
  const me=useMemo(()=>room?.players.find(p=>p.id===playerId)??null,[room,playerId]);
  const target=room?.players.find(p=>p.id===targetId);
  const incoming=room?.offers.filter(o=>o.toPlayerId===playerId&&o.status==="pending")??[];
  const outgoing=room?.offers.filter(o=>o.fromPlayerId===playerId)??[];

  const refresh=useCallback(async()=>{
    if(!code||!playerId)return;
    try{const data=await request("/rooms/"+code+"?playerId="+playerId,undefined,"GET");setRoom(data.room);}
    catch(e){setError(e instanceof Error?e.message:"Unable to refresh classroom");}
  },[code,playerId,request]);

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search); const roomCode=params.get("room");
    if(roomCode){const c=roomCode.toUpperCase();setCode(c);setJoinMode("join");const saved=localStorage.getItem("silk-player-"+c);const host=localStorage.getItem("silk-host-"+c);if(saved)setPlayerId(saved);const player=localStorage.getItem("silk-token-"+c);if(player)setPlayerToken(player);if(host)setHostToken(host);}
  },[]);
  useEffect(()=>{if(!code||!playerId)return;const timer=window.setInterval(()=>void refresh(),2500);return()=>window.clearInterval(timer);},[code,playerId,refresh]);

  const joinRoom=async(c:string,n:string,r:RegionId,token?:string)=>{
    const data=await request("/rooms/"+c+"/join",{name:n,region:r,hostToken:token});
    setCode(c);setPlayerId(data.player.id);setPlayerToken(data.playerToken);setRoom(data.room);setHostToken(token??"");
    localStorage.setItem("silk-player-"+c,data.player.id);localStorage.setItem("silk-token-"+c,data.playerToken);if(token)localStorage.setItem("silk-host-"+c,token);
    window.history.replaceState({},"",window.location.pathname+"?room="+c);
    setNotice("Joined the "+r+" trade group.");
  };
  const createRoom=async()=>{
    setBusy(true);setError("");
    try{const data=await request("/rooms",{hostName:name,zones});await joinRoom(data.room.code,name,region,data.hostToken);}
    catch(e){setError(e instanceof Error?e.message:"Could not create classroom");}finally{setBusy(false);}
  };
  const joinExisting=async()=>{
    setBusy(true);setError("");
    try{await joinRoom(code.trim().toUpperCase(),name.trim(),region);}
    catch(e){setError(e instanceof Error?e.message:"Could not join classroom");}finally{setBusy(false);}
  };
  const advance=async()=>{
    if(!room)return;setBusy(true);setError("");
    try{const data=await request("/rooms/"+room.code+"/round",{hostToken,playerId,playerToken,round:room.round+1});setRoom(data.room);setNotice(data.message);}
    catch(e){setError(e instanceof Error?e.message:"Could not advance round");}finally{setBusy(false);}
  };
  const sendOffer=async()=>{
    if(!room||!target)return;setBusy(true);setError("");
    try{const data=await request("/rooms/"+room.code+"/trades",{playerId,playerToken,targetPlayerId:target.id,offeredItemIds:give,requestedItemIds:want,intermediaries:via});setRoom(data.room);setGive([]);setWant([]);setVia([]);setNotice("Offer sent. The other merchant must accept it.");}
    catch(e){setError(e instanceof Error?e.message:"Trade failed");}finally{setBusy(false);}
  };
  const respond=async(id:string,accept:boolean)=>{
    if(!room)return;setBusy(true);
    try{const data=await request("/rooms/"+room.code+"/trades/"+id+"/respond",{playerId,playerToken,accept});setRoom(data.room);setNotice(accept?"Trade completed.":"Trade declined.");}
    catch(e){setError(e instanceof Error?e.message:"Could not respond");}finally{setBusy(false);}
  };
  const discard=async(id:string)=>{
    if(!room)return;
    try{const data=await request("/rooms/"+room.code+"/discard",{playerId,playerToken,itemId:id});setRoom(data.room);setNotice("Card removed for the China silk tax.");}
    catch(e){setError(e instanceof Error?e.message:"Could not discard card");}
  };
  const copyInvite=async()=>{await navigator.clipboard?.writeText(window.location.origin+window.location.pathname+"?room="+code);setNotice("Classroom link copied.");};

  if(!room||!me)return <main className="sr-entry">
    <section className="sr-intro"><div className="sr-kicker">WORLD HISTORY · c. 1200–1450</div><h1>SILK ROADS<br/><em>SIMULATION</em></h1><p>Six regions. Three rounds. One interconnected world.</p><div className="sr-route-word">CHINA <i/> CENTRAL ASIA <i/> PERSIA <i/> BYZANTIUM</div></section>
    <section className="sr-entry-card"><div className="sr-brand"><Globe2/> SILK ROADS LAB <small>CLASSROOM EDITION</small></div>
      <div className="sr-tabs"><button className={joinMode==="create"?"active":""} onClick={()=>setJoinMode("create")}>Create classroom</button><button className={joinMode==="join"?"active":""} onClick={()=>setJoinMode("join")}>Join with code</button></div>
      <label>Your name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name"/>
      {joinMode==="join"&&<><label>Classroom code</label><input className="sr-code" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} maxLength={6} placeholder="6-character code"/></>}
      <label>Home region</label><select value={region} onChange={e=>setRegion(e.target.value as RegionId)}>{REGIONS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
      {joinMode==="create"&&<div className="sr-zone-config"><strong>Teacher setup · Trade zones</strong><p>Default groups follow the OER activity. Change them if your class uses different regional groupings.</p>{REGIONS.map(r=><label key={r.id}>{r.name}<select value={zones[r.id]} onChange={e=>setZones(z=>({...z,[r.id]:e.target.value as "A"|"B"|"C"}))}><option value="A">Zone A</option><option value="B">Zone B</option><option value="C">Zone C</option></select></label>)}</div>}
      {error&&<p className="sr-error">{error}</p>}<button className="sr-primary" disabled={busy||!name.trim()||(joinMode==="join"&&code.length!==6)} onClick={()=>void(joinMode==="create"?createRoom():joinExisting())}>{busy?"Connecting…":joinMode==="create"?"Create classroom":"Join simulation"} <ChevronRight size={16}/></button>
      <small className="sr-foot">A classroom adaptation of the OER Project Silk Road Simulation.</small>
    </section>
  </main>;

  const isHost=Boolean(hostToken);
  const scores=room.players.map(p=>({p,...scoreMerchant(p)})).sort((a,b)=>b.score-a.score);
  const itemName=(id:string)=>room.players.flatMap(p=>p.items).find(i=>i.id===id)?.name??"Card";
  return <main className="sr-app">
    <header className="sr-top"><div className="sr-brand"><Globe2/> SILK ROADS LAB <small>CLASSROOM SIMULATION</small></div><div className="sr-top-right"><b>ROUND {room.round} / 3</b><span>{room.code}</span><button onClick={()=>void copyInvite()} title="Copy invite"><Copy size={16}/></button></div></header>
    <section className="sr-hero"><div><div className="sr-kicker">AFRO-EURASIA · c. 1200–1450</div><h1>The network is <em>in your hands.</em></h1><p>Trade beyond your home region. Build relationships. Discover the costs and consequences of connectivity.</p></div><div className="sr-player"><span>{me.name.slice(0,1).toUpperCase()}</span><div><b>{me.name}</b><small>{REGIONS.find(r=>r.id===me.region)?.name} · Merchant</small></div>{isHost&&<Crown size={17}/>}</div></section>
    <nav className="sr-nav"><button className={view==="map"?"active":""} onClick={()=>setView("map")}><MapPin size={15}/> Trade map</button><button className={view==="market"?"active":""} onClick={()=>setView("market")}><ArrowLeftRight size={15}/> Market {incoming.length>0&&<b>{incoming.length}</b>}</button><button className={view==="journal"?"active":""} onClick={()=>setView("journal")}><BookOpen size={15}/> Merchant journal</button><span>● LIVE CLASSROOM</span></nav>
    {(error||notice)&&<div className={error?"sr-alert error":"sr-alert"}>{error||notice}<button onClick={()=>{setError("");setNotice("");}}><X size={14}/></button></div>}
    {view==="map"&&<div className="sr-layout"><section className="sr-panel"><div className="sr-panel-head"><div><small>THE KNOWN WORLD</small><h2>Trade zones & routes</h2></div><span>SCHEMATIC · NOT TO SCALE</span></div>
      <div className="sr-map"><svg viewBox="0 0 1000 620" role="img" aria-label="Schematic map of six Silk Roads regions"><path className="sr-land" d="M80 170L145 100 255 90 330 130 420 90 520 120 590 80 700 120 790 110 900 170 940 270 890 350 830 390 790 480 710 530 625 510 580 570 480 545 420 470 330 500 270 440 190 420 120 330Z"/><path className="sr-route-line" d="M820 210Q700 170 585 275T420 345T255 475T170 220"/><path className="sr-route-line secondary" d="M585 275Q650 390 665 475M420 345Q540 390 665 475"/>{REGIONS.map(r=><g key={r.id} className={r.id===me.region?"sr-node home":"sr-node"}><circle cx={r.x} cy={r.y} r="32"/><circle className="sr-node-dot" cx={r.x} cy={r.y} r="7"/><text x={r.x} y={r.y+52} textAnchor="middle">{r.name.toUpperCase()}</text><text className="sr-node-count" x={r.x} y={r.y+69} textAnchor="middle">{room.players.filter(p=>p.region===r.id).length} MERCHANTS</text></g>)}</svg><div className="sr-map-legend"><span>● Your region</span><span>┄ Trade route</span></div></div>
      <div className="sr-zones">{(["A","B","C"] as const).map(z=><div key={z}><b>ZONE {z}</b><span>{REGIONS.filter(r=>room.zones[r.id]===z).map(r=>r.name).join(" · ")}</span></div>)}</div>
    </section><aside className="sr-side"><section className="sr-card dark"><small>CURRENT OBJECTIVE · ROUND {room.round}</small><div className="sr-big">0{room.round}</div><h3>{["","Local exchange","Regional connections","Intermediary networks"][room.round]}</h3><p>{["","Trade only within your own regional group.","Trade within your home region and the other group in your assigned trade zone.","Use neighboring merchants as intermediaries to access distant markets."][room.round]}</p>{isHost&&room.round<3?<button className="sr-outline" disabled={busy} onClick={()=>void advance()}>Advance to Round {room.round+1} <ChevronRight size={15}/></button>:!isHost?<small>Waiting for teacher to advance</small>:null}</section>
      <section className="sr-card"><small><Users size={14}/> CLASSROOM MERCHANTS · {room.players.length}</small>{room.players.map(p=><div className="sr-player-row" key={p.id}><span>{p.name.slice(0,1).toUpperCase()}</span><div><b>{p.name}</b><small>{REGIONS.find(r=>r.id===p.region)?.name}</small></div>{p.id===playerId&&<i>YOU</i>}</div>)}</section>
      <section className="sr-card"><small><BookOpen size={14}/> YOUR REGIONAL GUIDE</small><h3>{REGIONS.find(r=>r.id===me.region)?.name}</h3><p>{room.round===1?"Trade locally and identify what your region can and cannot produce.":GUIDES[me.region][room.round===2?"round2":"round3"]}</p></section></aside></div>}
    {view==="market"&&<div className="sr-market">
      <section className="sr-card"><small>YOUR HOLDINGS</small><h2>Merchant inventory</h2>{me.items.map(item=><div className={"sr-item "+item.kind} key={item.id}><span>{item.kind==="technology"?"⚙":item.kind==="belief"?"✦":item.kind==="disease"?"☣":"◆"}</span><div><b>{item.name}</b><small>Origin · {item.origin==="unknown"?"Unknown":REGIONS.find(r=>r.id===item.origin)?.name}</small></div>{room.round===2&&me.region==="china"&&item.kind==="goods"&&<button title="Discard for silk tax" onClick={()=>void discard(item.id)}><X size={14}/></button>}</div>)}
        {room.round===2&&me.region==="china"&&<p className="sr-note">China merchants must remove one food- or goods-related card before Round 3. Trade for one if needed.</p>}</section>
      <section className="sr-card"><small>NEGOTIATION DESK</small><h2>Propose an exchange</h2><label>Trade with</label><select value={targetId} onChange={e=>setTargetId(e.target.value)}><option value="">Choose a merchant</option>{room.players.filter(p=>p.id!==playerId).map(p=><option key={p.id} value={p.id}>{p.name} · {p.region}</option>)}</select>
        {target&&<><div className="sr-trade-cols"><div><label>You offer</label>{me.items.map(i=><label className="sr-check" key={i.id}><input type="checkbox" checked={give.includes(i.id)} onChange={e=>setGive(v=>e.target.checked?[...v,i.id]:v.filter(x=>x!==i.id))}/>{i.name}</label>)}</div><div><label>You request</label>{target.items.map(i=><label className="sr-check" key={i.id}><input type="checkbox" checked={want.includes(i.id)} onChange={e=>setWant(v=>e.target.checked?[...v,i.id]:v.filter(x=>x!==i.id))}/>{i.name}</label>)}</div></div>
          {room.round===3&&target.region!==me.region&&<div className="sr-intermediaries"><label>Intermediary merchants</label><p>Select the connecting regions in route order.</p>{room.players.filter(p=>p.id!==playerId&&p.id!==target.id).map(p=><label className="sr-check" key={p.id}><input type="checkbox" checked={via.includes(p.id)} onChange={e=>setVia(v=>e.target.checked?[...v,p.id]:v.filter(x=>x!==p.id))}/>{p.name} · {p.region}</label>)}</div>}
          <button className="sr-primary" disabled={busy||!give.length||!want.length} onClick={()=>void sendOffer()}><Send size={15}/> Send offer</button></>}
      </section>
      <section className="sr-card"><small>TRADE DESK · {incoming.length} INCOMING</small><h2>Offers</h2>{incoming.length?incoming.map(o=><div className="sr-offer" key={o.id}><b>{room.players.find(p=>p.id===o.fromPlayerId)?.name} proposes</b><p>Gives: {o.offeredItemIds.map(itemName).join(", ")}</p><p>Requests: {o.requestedItemIds.map(itemName).join(", ")}</p><button onClick={()=>void respond(o.id,true)}>Accept</button><button className="muted" onClick={()=>void respond(o.id,false)}>Decline</button></div>):<p className="sr-muted">No incoming offers.</p>}{outgoing.map(o=><p className="sr-muted" key={o.id}>To {room.players.find(p=>p.id===o.toPlayerId)?.name}: {o.status}</p>)}</section>
    </div>}
    {view==="journal"&&<div className="sr-journal"><section className="sr-card"><small>MERCHANT'S RECORD</small><h2>Trade history</h2>{room.log.slice().reverse().map(l=><p className="sr-log" key={l.id}>{new Date(l.at).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})} · {l.message}</p>)}</section><section className="sr-card"><small>FOREIGN-ORIGIN COLLECTION</small><h2>Regional scores</h2>{scores.map((s,i)=><p className="sr-score" key={s.p.id}><span>{i+1}. {s.p.name}</span><b>{s.score}</b></p>)}</section><section className="sr-card sr-reflection"><small>HISTORIAN'S REFLECTION</small><h2>After the exchange</h2>{["What is the purpose of passing the disease cards with each exchange?","How would religions and beliefs actually have been transferred between the regions?","How did the Silk Road impact communities at this time in history?","How did the Silk Road impact production and distribution?","How did the Silk Road impact networks?"].map((q,i)=><p key={q}><b>0{i+1}</b> {q}</p>)}</section></div>}
    <footer className="sr-footer">OER PROJECT · SILK ROAD SIMULATION ADAPTATION <span>Trade connects. Exchange transforms.</span></footer>
  </main>;
}
