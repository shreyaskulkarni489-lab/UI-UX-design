const IMG={couple:"assets/couple.webp",bride:"assets/bride.jpg",groom:"assets/groom.jpg"};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';

/* images from one source */
$$('[data-img]').forEach(el=>{const u=IMG[el.dataset.img]; if(el.tagName.toLowerCase()==='image'){el.setAttribute('href',u)}else el.src=u});

/* mandala line art */
function mandala(){
  const petals=(n,r1,r2,w)=>{let s='';for(let i=0;i<n;i++)s+=`<path transform="rotate(${(i*360/n).toFixed(2)})" d="M0,${-r1} Q${w},${-(r1+r2)/2} 0,${-r2} Q${-w},${-(r1+r2)/2} 0,${-r1}Z"/>`;return s};
  let dots='';for(let i=0;i<48;i++){const a=i*Math.PI*2/48;dots+=`<circle cx="${(178*Math.cos(a)).toFixed(1)}" cy="${(178*Math.sin(a)).toFixed(1)}" r="${i%2?1.3:2.1}" fill="currentColor" stroke="none"/>`}
  return `<svg viewBox="-200 -200 400 400" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><circle r="196" stroke-dasharray="2 5"/><circle r="188"/><circle r="168"/>${dots}${petals(24,120,166,15)}${petals(16,80,124,20)}${petals(12,44,84,17)}${petals(8,16,48,10)}<circle r="118"/><circle r="78"/><circle r="12"/></svg>`;
}
$$('[data-mandala]').forEach(el=>el.innerHTML=mandala());

/* diya */
const diyaSVG=`<svg viewBox="0 0 64 60" aria-hidden="true"><circle class="halo" cx="32" cy="22" r="26" fill="url(#haloGrad)"/><path d="M4 32C10 50 54 50 60 32C46 38 18 38 4 32Z" fill="url(#goldGrad)"/><path d="M4 32C1 30 0 27 2 25C8 28 12 30 16 31" fill="url(#goldGrad)"/><path d="M24 46h16v4a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" fill="#B98526"/><path d="M8 34C20 39 44 39 56 34" stroke="#8A5B12" stroke-width="1.2" fill="none" opacity=".7"/><path class="flame" d="M32 33C22 24 29 12 32 2C35 12 42 24 32 33Z" fill="url(#flameGrad)"/><path class="flame b" d="M32 32C27 26 30 20 32 15C34 20 37 26 32 32Z" fill="#FFF7D0" opacity=".9"/></svg>`;
$$('[data-diya]').forEach(el=>el.innerHTML=diyaSVG);

/* toran (marigold garland) */
function marigold(x,y,r,alt){
  const g=alt?'mrose':'mgold';
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})"/><circle cx="${x}" cy="${y}" r="${r*.62}" fill="none" stroke="#FFE39A" stroke-opacity=".55" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${r*.28}" fill="#FFF1BF" fill-opacity=".85"/></g>`;
}
function buildToran(){
  const host=$('#toran'); const W=host.clientWidth||innerWidth; const seg=W<600?66:92, n=Math.ceil(W/seg)+1, sag=W<600?22:30, fr=W<600?6.2:7.6;
  const Hh=host.clientHeight||150;
  let s=`<svg viewBox="0 0 ${W} ${Hh}" aria-hidden="true"><rect x="0" y="0" width="${W}" height="5" fill="url(#goldGrad)"/>`;
  for(let i=0;i<n;i++){
    const x0=i*seg, x1=x0+seg, mx=(x0+x1)/2, y0=4, cy=y0+2*sag;
    s+=`<path d="M${x0},${y0} Q${mx},${cy} ${x1},${y0}" fill="none" stroke="#3E6B3A" stroke-width="3.4" stroke-linecap="round"/>`;
    const k=7;
    for(let j=0;j<k;j++){const t=(j+.5)/k, x=(1-t)*(1-t)*x0+2*(1-t)*t*mx+t*t*x1, y=(1-t)*(1-t)*y0+2*(1-t)*t*cy+t*t*y0; s+=marigold(x.toFixed(1),(y+1).toFixed(1),fr,(i+j)%2)}
    const by=y0+sag+2, len=(i%2?52:34);
    s+=`<g class="dangle" style="transform-origin:${mx}px ${by}px;animation-delay:${(-i*.45).toFixed(2)}s"><line x1="${mx}" y1="${by}" x2="${mx}" y2="${by+len}" stroke="#D9A441" stroke-width="1.6"/>`;
    for(let b=1;b<=2;b++)s+=`<circle cx="${mx}" cy="${by+len*b/3}" r="2.6" fill="#F0CF86"/>`;
    s+=(i%2?`<path d="M${mx},${by+len} c-8,4 -9,12 0,20 c9,-8 8,-16 0,-20z" fill="url(#goldGrad)"/><circle cx="${mx}" cy="${by+len+22}" r="2.4" fill="#B98526"/>`:marigold(mx,by+len+8,7.2,i%3===0))+`</g>`;
  }
  host.innerHTML=s+'</svg>';
}
buildToran(); let rt; addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{buildToran();buildVine()},200)});

/* arch: beads, rays, stars, plinth */
(()=>{
  const p=$('#beadPath'), L=p.getTotalLength(), g=$('#beads'); let out='';
  for(let d=6;d<L-6;d+=15){const pt=p.getPointAtLength(d); out+=`<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="${Math.round(d/15)%5===0?3.4:2.2}"/>`}
  g.innerHTML=out;
  let r='';for(let i=0;i<24;i++){const a1=i*15*Math.PI/180,a2=(i*15+7)*Math.PI/180,R=520;r+=`<path d="M260,470 L${(260+R*Math.cos(a1)).toFixed(1)},${(470+R*Math.sin(a1)).toFixed(1)} L${(260+R*Math.cos(a2)).toFixed(1)},${(470+R*Math.sin(a2)).toFixed(1)}Z" fill="#FFE39A" fill-opacity=".14"/>`}
  $('#rays').innerHTML=r;
  let st='';const pts=[[110,300],[420,290],[150,200],[380,190],[260,110],[90,420],[440,430],[200,150],[330,140],[130,520],[410,520]];
  pts.forEach(([x,y],i)=>{st+=`<path class="twinkle" style="transform-origin:${x}px ${y}px;animation-delay:${(i*.37).toFixed(2)}s" d="M${x},${y-9} Q${x},${y} ${x+9},${y} Q${x},${y} ${x},${y+9} Q${x},${y} ${x-9},${y} Q${x},${y} ${x},${y-9}Z" fill="#FFF1BF"/>`});
  $('#stars').innerHTML=st;
  let pl=`<rect x="56" y="640" width="408" height="60" fill="url(#floor)"/><rect x="56" y="640" width="408" height="4" fill="#8A5B12" opacity=".6"/><rect x="66" y="654" width="388" height="36" rx="3" fill="none" stroke="#F0CF86" stroke-opacity=".7"/>`;
  for(let i=0;i<13;i++){const x=90+i*30;pl+=`<path d="M${x},662 l7,10 -7,10 -7,-10z" fill="#F0CF86" fill-opacity="${i%2?.55:.9}"/>`}
  $('#plinth').innerHTML=pl;
})();

/* gate + staging */
(()=>{
  const gate=$('#gate'), root=document.documentElement; let done=false;
  const ready=()=>root.classList.add('ready');
  if(reduce){gate.remove();ready();return}
  const T=[];
  const finish=()=>{if(done)return;done=true;T.forEach(clearTimeout);gate.classList.add('lit','open');ready();setTimeout(()=>gate.classList.add('done'),1500)};
  T.push(setTimeout(()=>gate.classList.add('lit'),300));
  T.push(setTimeout(()=>gate.classList.add('open'),1700));
  T.push(setTimeout(()=>{ready()},2500));
  T.push(setTimeout(()=>{done=true;gate.classList.add('done')},3700));
  gate.addEventListener('click',finish);
  addEventListener('keydown',e=>{if(!done&&(e.key==='Escape'||e.key==='Enter'||e.key===' '))finish()});
})();

/* nav */
(()=>{
  const b=$('#burger'), m=$('#menu');
  b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  $$('#menu a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded',false)}));
  const links=$$('#menu a'), map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const ids=['home','about','wishes','schedule','location','gallery'];
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('act'));const a=map.get(e.target.id);a&&a.classList.add('act')}})},{rootMargin:'-45% 0px -50% 0px'});
  ids.forEach(id=>{const el=document.getElementById(id);el&&io.observe(el)});
})();

/* reveal on scroll */
(()=>{
  const els=$$('[data-reveal],.ev');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.18});
  els.forEach(e=>io.observe(e));
})();

/* hero pointer parallax */
(()=>{
  if(reduce||!matchMedia('(pointer:fine)').matches)return;
  const h=$('.hero'), a=$('.arch-wrap'); let raf;
  h.addEventListener('pointermove',e=>{const r=h.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{a.style.setProperty('--mx',x.toFixed(3));a.style.setProperty('--my',y.toFixed(3))})});
})();


/* arch poses rotation: 1 image at a time, switching every 1.5s with 0.4s crossfade & scale */
(()=>{
  const poseImgs = $$('.pose-img');
  if (!poseImgs.length) return;

  // Preload all 6 images
  poseImgs.forEach(el => {
    const src = el.getAttribute('href') || el.getAttribute('xlink:href');
    if (src) {
      const im = new Image();
      im.src = src;
    }
  });

  let curIdx = 0;
  function showPose(idx) {
    poseImgs.forEach((img, i) => {
      if (i === idx) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
    curIdx = idx;
  }
  showPose(0);

  if (reduce || poseImgs.length <= 1) return;

  let timer = null;
  function start() {
    stop();
    timer = setInterval(() => {
      if (document.hidden) return;
      showPose((curIdx + 1) % poseImgs.length);
    }, 1500);
  }
  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
})();

/* countdown to 31 Oct 2026, 11:00 IST */
(()=>{
  const target=new Date('2026-10-31T11:00:00+05:30').getTime();
  const els={d:$('#cd-d'),h:$('#cd-h'),m:$('#cd-m'),s:$('#cd-s')}, prev={};
  function set(k,v){const t=String(v).padStart(2,'0');if(prev[k]!==t){prev[k]=t;const el=els[k];el.textContent=t;if(!reduce){el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip')}}}
  function tick(){let ms=Math.max(0,target-Date.now());const s=Math.floor(ms/1000);set('d',Math.floor(s/86400));set('h',Math.floor(s%86400/3600));set('m',Math.floor(s%3600/60));set('s',s%60)}
  tick();setInterval(tick,1000);
})();

/* wishes carousel + form */
(()=>{
  const wishes=[
    {t:'May your engagement mark the beginning of a lifetime filled with love, joy, and unforgettable moments together.',n:'Mahesh'},
    {t:'Two beautiful souls, one beautiful beginning. Wishing you a lifetime of laughter and warm evenings together.',n:'Priya'},
    {t:'You two were made for each other. We cannot wait to dance at your wedding!',n:'Rohan'}
  ];
  const suggestions=[
    'Wishing you both a lifetime of love, laughter and chai together.',
    'May every day with each other feel like a celebration. Congratulations, Ananya and Aarav!',
    'Two hearts, two families, one beautiful beginning. Blessings to you both.',
    'So happy for you both! May your love grow stronger with every sunrise.',
    'Congratulations! May your journey together be filled with joy, patience and endless adventures.'
  ];
  const box=$('#wslides'), dots=$('#wdots'), cnt=$('#wcnt'); let cur=0, timer, sIdx=0;
  const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function build(){
    box.innerHTML=wishes.map(w=>`<figure class="wslide"><p>&ldquo;${esc(w.t)}&rdquo;</p><cite>&mdash; ${esc(w.n)}</cite></figure>`).join('');
    dots.innerHTML=wishes.map((w,i)=>`<button type="button" aria-label="Wish ${i+1} of ${wishes.length}" role="tab"></button>`).join('');
    $$('button',dots).forEach((b,i)=>b.addEventListener('click',()=>go(i,true)));
    measure();show();
  }
  function measure(){const h=Math.max(...$$('.wslide',box).map(s=>{s.style.position='static';const x=s.offsetHeight;s.style.position='';return x}));box.style.minHeight=h+'px'}
  function show(){
    $$('.wslide',box).forEach((s,i)=>{s.classList.toggle('on',i===cur);s.setAttribute('aria-hidden',i!==cur)});
    $$('button',dots).forEach((b,i)=>{b.classList.toggle('on',i===cur);b.setAttribute('aria-selected',i===cur)});
    cnt.textContent=`${cur+1}/${wishes.length}`;
  }
  function go(i,user){cur=(i+wishes.length)%wishes.length;show();if(user)restart()}
  function restart(){clearInterval(timer);if(!reduce)timer=setInterval(()=>go(cur+1),6500)}
  $('#wprev').addEventListener('click',()=>go(cur-1,true));$('#wnext').addEventListener('click',()=>go(cur+1,true));
  const card=$('.wcard'); card.addEventListener('pointerenter',()=>clearInterval(timer));card.addEventListener('pointerleave',restart);
  build();restart();addEventListener('load',measure);addEventListener('resize',measure);
  $('#wsuggest').addEventListener('click',()=>{$('#wtext').value=suggestions[sIdx++%suggestions.length];$('#werr').textContent=''});
  $('#wf').addEventListener('submit',e=>{
    e.preventDefault();const n=$('#wname').value.trim(), t=$('#wtext').value.trim(), err=$('#werr');
    if(!t){err.textContent='Write a wish first, or tap Suggest a wish.';$('#wtext').focus();return}
    err.textContent='';wishes.unshift({t,n:n||'A well-wisher'});cur=0;build();restart();
    $('#wname').value='';$('#wtext').value='';toast('Thank you! Your wish has been added.');burst();
  });
})();

/* toast */
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3200)}

/* schedule vine that grows with scroll */
let buildVine=()=>{};
(()=>{
  const tl=$('#tl'), vine=$('#vine'), evs=$$('.ev',tl); let nodes=[],leaves=[],pathEl;
  buildVine=function(){
    const H=tl.offsetHeight, w=vine.getBoundingClientRect().width||60, cx=w/2, amp=Math.min(14,w/4.5);
    vine.setAttribute('viewBox',`0 0 ${w} ${H}`);vine.setAttribute('height',H);
    let d=`M${cx},0`;for(let y=0;y<=H;y+=10)d+=` L${(cx+amp*Math.sin(y/46)).toFixed(1)},${y}`;
    let s=`<path d="${d}" fill="none" stroke="#3E6B3A" stroke-opacity=".28" stroke-width="3"/><path id="vgrow" d="${d}" pathLength="1" fill="none" stroke="#5E9A4E" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>`;
    leaves=[];for(let y=50,k=0;y<H-30;y+=78,k++){const sd=k%2?1:-1,x=cx+amp*Math.sin(y/46);leaves.push(y);s+=`<g transform="translate(${x.toFixed(1)},${y})"><path class="lf" data-y="${y}" d="M0,0 C${sd*12},-12 ${sd*26},-4 ${sd*32},8 C${sd*18},14 ${sd*5},9 0,0Z" fill="#5E9A4E" style="transform:scale(0);transition:transform .6s cubic-bezier(.3,1.5,.5,1)"/></g>`}
    nodes=evs.map(ev=>{const y=ev.offsetTop+ev.offsetHeight/2;s+=`<g class="nd" data-y="${y}" transform="translate(${cx},${y})"><circle r="17" fill="url(#haloGrad)" opacity="0" class="nh"/><g class="nf" style="transform:scale(.4);transition:transform .7s cubic-bezier(.3,1.6,.5,1)"><circle r="11" fill="url(#mgold)" stroke="#FFF1BF" stroke-width="1.6"/><circle r="4" fill="#FFF1BF"/></g></g>`;return y});
    vine.innerHTML=s;pathEl=$('#vgrow',vine);update();
  };
  function update(){
    if(!pathEl)return;const r=tl.getBoundingClientRect(),H=r.height;
    let p=(innerHeight*.62-r.top)/H;p=Math.max(0,Math.min(1,p));if(reduce)p=1;
    pathEl.setAttribute('stroke-dashoffset',(1-p).toFixed(4));
    const yy=p*H;
    $$('.lf',vine).forEach(l=>{l.style.transform=+l.dataset.y<=yy?'scale(1)':'scale(0)'});
    $$('.nd',vine).forEach((n,i)=>{const on=+n.dataset.y<=yy;$('.nf',n).style.transform=on?'scale(1)':'scale(.4)';$('.nh',n).setAttribute('opacity',on?1:0);evs[i].classList.toggle('on',on)});
  }
  let raf;addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update)},{passive:true});
  buildVine();addEventListener('load',buildVine);
})();

/* lightbox */
(()=>{
  const lb=$('#lb'),im=$('#lbimg'); let last;
  $$('.gi').forEach(b=>b.addEventListener('click',()=>{last=b;im.src=IMG[b.dataset.full];im.alt=$('img',b).alt;lb.hidden=false;$('#lbx').focus()}));
  const close=()=>{lb.hidden=true;last&&last.focus()};
  $('#lbx').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close()});
})();

/* drifting marigold petals */
const PETAL_SECONDS = 8;
let burst = () => {};
(() => {
  if (reduce) return;
  const cv = $('#petals');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, dpr = Math.min(devicePixelRatio || 1, 2);
  let ps = [], running = false, raf = null;
  let elapsed = 0, lastTime = 0, started = false;
  let spawnAcc = 0;

  const cols = ['#F29F05', '#FFC94A', '#F3A8BC', '#F0761C', '#FFE39A'];

  function size() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function mk(top, burstFrom) {
    const s = 4 + Math.random() * 7;
    return {
      x: burstFrom ? burstFrom.x : Math.random() * W,
      y: burstFrom ? burstFrom.y : (top ? -20 - Math.random() * 30 : Math.random() * H),
      s,
      vy: burstFrom ? -(3 + Math.random() * 7) : 0.6 + Math.random() * 1.1,
      vx: burstFrom ? (Math.random() - 0.5) * 10 : 0,
      r: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.05,
      ph: Math.random() * 6.28,
      sw: 0.4 + Math.random() * 0.9,
      c: cols[Math.random() * cols.length | 0],
      life: burstFrom ? 1 : 0,
      b: !!burstFrom
    };
  }

  size();
  addEventListener('resize', size);

  function draw(p) {
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.r);
    cx.fillStyle = p.c;
    cx.globalAlpha = p.b ? Math.max(0, p.life) : 0.85;
    cx.beginPath();
    cx.moveTo(0, -p.s);
    cx.bezierCurveTo(p.s * 0.9, -p.s * 0.4, p.s * 0.7, p.s * 0.7, 0, p.s);
    cx.bezierCurveTo(-p.s * 0.7, p.s * 0.7, -p.s * 0.9, -p.s * 0.4, 0, -p.s);
    cx.fill();
    cx.restore();
  }

  function getIntensity(t) {
    if (t < 0) return 0;
    if (t < 1.0) return t / 1.0;
    if (t <= PETAL_SECONDS - 2.0) return 1.0;
    if (t < PETAL_SECONDS) return (PETAL_SECONDS - t) / 2.0;
    return 0;
  }

  function startLoop() {
    if (!running) {
      running = true;
      cv.style.display = 'block';
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  function stopLoop() {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    cx.clearRect(0, 0, W, H);
    cv.style.display = 'none';
  }

  function startPetals() {
    if (started || reduce) return;
    started = true;
    elapsed = 0;
    startLoop();
  }

  function frame(now) {
    if (!running) return;
    if (document.hidden) {
      lastTime = now;
      raf = requestAnimationFrame(frame);
      return;
    }

    const dt = Math.min((now - (lastTime || now)) / 1000, 0.1);
    lastTime = now;

    if (started && elapsed < PETAL_SECONDS) {
      elapsed += dt;
      const intensity = getIntensity(elapsed);
      const maxN = W < 700 ? 12 : 22;
      const targetAmbient = Math.round(maxN * intensity);
      const curAmbient = ps.filter(p => !p.b).length;

      if (curAmbient < targetAmbient) {
        spawnAcc += dt * (maxN / 1.0);
        while (spawnAcc >= 1 && ps.filter(p => !p.b).length < targetAmbient) {
          ps.push(mk(true));
          spawnAcc -= 1;
        }
      } else {
        spawnAcc = 0;
      }
    }

    cx.clearRect(0, 0, W, H);

    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      if (p.b) {
        p.vy += 0.22;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012;
        if (p.life <= 0 || p.y > H + 20) {
          ps.splice(i, 1);
          continue;
        }
      } else {
        p.ph += 0.012 * p.sw;
        p.x += Math.sin(p.ph) * p.sw + 0.15;
        p.y += p.vy;
        if (p.y > H + 20 || p.x > W + 30) {
          const maxN = W < 700 ? 12 : 22;
          const targetAmbient = started && elapsed < PETAL_SECONDS ? Math.round(maxN * getIntensity(elapsed)) : 0;
          if (ps.filter(pt => !pt.b).length <= targetAmbient && elapsed < PETAL_SECONDS) {
            Object.assign(p, mk(true));
          } else {
            ps.splice(i, 1);
            continue;
          }
        }
      }
      p.r += p.vr;
      draw(p);
    }

    if (ps.length === 0 && (!started || elapsed >= PETAL_SECONDS)) {
      stopLoop();
      return;
    }

    raf = requestAnimationFrame(frame);
  }

  burst = () => {
    if (reduce) return;
    const f = { x: innerWidth / 2, y: innerHeight * 0.7 };
    for (let i = 0; i < 60; i++) {
      ps.push(mk(false, f));
    }
    startLoop();
  };

  const root = document.documentElement;
  if (root.classList.contains('ready')) {
    startPetals();
  } else {
    const mo = new MutationObserver(() => {
      if (root.classList.contains('ready')) {
        mo.disconnect();
        startPetals();
      }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && running) {
      lastTime = performance.now();
    }
  });
})();

/* soft raga: tanpura-like drone + sitar-like plucks (off until tapped) */
(()=>{
  const btn=$('#snd'); let ac,master,timer,drones=[],on=false,i=0;
  const scale=[261.63,293.66,329.63,369.99,392,440,493.88,523.25], phrase=[0,2,4,5,4,2,1,0,2,4,6,7,6,5,4,2,0,1,2,4,2,1,0,0];
  function pluck(f){const t=ac.currentTime,o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain(),lp=ac.createBiquadFilter();
    o.type='triangle';o.frequency.value=f;o2.type='sawtooth';o2.frequency.value=f*2.003;lp.type='lowpass';lp.frequency.setValueAtTime(3200,t);lp.frequency.exponentialRampToValueAtTime(500,t+1.2);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.012);g.gain.exponentialRampToValueAtTime(.001,t+1.7);
    const g2=ac.createGain();g2.gain.value=.18;o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(master);o.start(t);o2.start(t);o.stop(t+1.8);o2.stop(t+1.8)}
  function start(){
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();
    master=ac.createGain();master.gain.value=0;master.connect(ac.destination);master.gain.linearRampToValueAtTime(.14,ac.currentTime+2);
    const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=500;lp.connect(master);drones=[];
    [[130.81,.5],[196,.36],[261.63,.22],[65.41,.3]].forEach(([f,a],k)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sawtooth';o.frequency.value=f*(1+k*.0006);g.gain.value=a*.35;o.connect(g);g.connect(lp);o.start();drones.push(o)});
    timer=setInterval(()=>{if(Math.random()>.12)pluck(scale[phrase[i++%phrase.length]])},640);
  }
  function stop(){clearInterval(timer);if(master){master.gain.cancelScheduledValues(ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+.5)}const d=drones;setTimeout(()=>d.forEach(o=>{try{o.stop()}catch(e){}}),600)}
  btn.addEventListener('click',()=>{on=!on;btn.setAttribute('aria-pressed',on);btn.setAttribute('aria-label',on?'Turn music off':'Play soft Indian classical music');on?start():stop()});
})();
