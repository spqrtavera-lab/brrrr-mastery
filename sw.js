// The Wealth Bible service worker: offline cache, stale-while-revalidate
const V="wb-2026.10.04-1";
const FILES=["./", "index.html", "app.js", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png", "content/extras.js", "content/fl.js", "content/m01.js", "content/m02.js", "content/m03.js", "content/m04.js", "content/m05.js", "content/m06.js", "content/m07.js", "content/m08.js", "content/m09.js", "content/m10.js", "content/m11.js", "content/m12.js", "content/m13.js", "content/m14.js", "content/m15.js", "content/m16.js", "content/oh.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));});
self.addEventListener("message",e=>{if(e.data==="skip")self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET")return;
  if(u.origin!==location.origin){ // fonts: cache-first
    e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n;}).catch(()=>r))));return;}
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>{
    const net=fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n;}).catch(()=>r);
    return r||net;})));
});
