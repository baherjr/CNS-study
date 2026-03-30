  // ── CONFIG ──
  const lecMeta = {
    1:{num:'01',title:'Security Overview',sub:'4 sections · CIA · Services · Mechanisms · Attacks'},
    2:{num:'02',title:'Number Theory',sub:'4 sections · Divisibility · GCD · Modular Arith. · Zₙ'},
    3:{num:'03',title:'Classical Ciphers',sub:'4 sections · Caesar · Vigenère · OTP'},
    4:{num:'04',title:'Block Ciphers & DES',sub:'4 sections · Feistel · DES · Avalanche'},
    5:{num:'05',title:'Finite Fields',sub:'4 sections · Groups · GF(p) · GF(2ⁿ) · Polynomials'},
  };
  const secConfigs = {
    l1:[{id:'summary',icon:'📋',label:'Summary Notes'},{id:'flashcards',icon:'🃏',label:'Flashcards'},{id:'quiz',icon:'❓',label:'Practice Q&A'},{id:'keyfacts',icon:'📊',label:'Key Facts'}],
    l2:[{id:'summary',icon:'📐',label:'Summary Notes'},{id:'tools',icon:'⚙️',label:'Interactive Tools'},{id:'quiz',icon:'❓',label:'Practice Q&A'},{id:'keyfacts',icon:'📊',label:'Key Facts'}],
    l3:[{id:'summary',icon:'🔐',label:'Summary Notes'},{id:'tools',icon:'⚙️',label:'Cipher Tools'},{id:'quiz',icon:'❓',label:'Practice Q&A'},{id:'keyfacts',icon:'📊',label:'Key Facts'}],
    l4:[{id:'summary',icon:'🧱',label:'Summary Notes'},{id:'flashcards',icon:'🃏',label:'Flashcards'},{id:'quiz',icon:'❓',label:'Practice Q&A'},{id:'keyfacts',icon:'📊',label:'Key Facts'}],
    l5:[{id:'summary',icon:'∞',label:'Summary Notes'},{id:'tools',icon:'⚙️',label:'Interactive Tools'},{id:'quiz',icon:'❓',label:'Practice Q&A'},{id:'keyfacts',icon:'📊',label:'Key Facts'}],
  };
  let curLec='l1', curSec='summary';

  function showLec(n, btn){
    curLec='l'+n; curSec='summary';
    document.querySelectorAll('.lec-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('lec'+n).classList.add('active');
    document.querySelectorAll('.lec-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.body.dataset.lec = n;
    const m = lecMeta[n]||{};
    document.getElementById('sb-num').textContent = m.num||('0'+n);
    document.getElementById('sb-title').textContent = m.title||('Lecture '+n);
    document.getElementById('sb-sub').textContent = m.sub||'';
    document.getElementById('brand-icon').textContent = ['🔒','📐','🔐','🧱','∞'][n-1]||'🔒';
    buildSecTabs();
    showSec('summary');
  }

  function buildSecTabs(){
    const c = document.getElementById('sec-tabs'); c.innerHTML='';
    (secConfigs[curLec]||[]).forEach(sec=>{
      const b = document.createElement('button');
      b.className = 'sec-btn' + (sec.id===curSec?' active':'');
      b.dataset.sec = sec.id;
      b.onclick = ()=>showSec(sec.id);
      b.innerHTML = `<span class="s-icon">${sec.icon}</span><span class="s-label">${sec.label}</span><span class="s-dot"></span>`;
      c.appendChild(b);
    });
  }

  function showSec(sec){
    curSec = sec;
    const num = curLec.slice(1);
    const panel = document.getElementById('lec'+num);
    if(panel){
      panel.querySelectorAll('.sec-panel').forEach(p=>p.classList.remove('active'));
      const t = document.getElementById('lec'+num+'-'+sec);
      if(t) t.classList.add('active');
    }
    document.querySelectorAll('.sec-btn').forEach(b=>b.classList.toggle('active', b.dataset.sec===sec));
    document.getElementById('main').scrollTop = 0;
  }

  // ── PRACTICE QUESTIONS ──
  const qReveal = {};
  function qClick(header){
    const card = header.closest('.q-card');
    const key = card.dataset.key, total = parseInt(card.dataset.total);
    const wasOpen = card.classList.contains('open');
    card.classList.toggle('open');
    if(!wasOpen && !card.dataset.counted){
      card.dataset.counted='1';
      qReveal[key] = (qReveal[key]||0)+1;
      const lbl = document.getElementById(key+'-lbl');
      const bar = document.getElementById(key+'-bar');
      if(lbl) lbl.textContent = qReveal[key]+' of '+total+' revealed';
      if(bar) bar.style.width = (qReveal[key]/total*100)+'%';
    }
  }

  // ── FLASHCARD DATA ──
  const flashcards = {
    l1:[
      {f:"What is the CIA Triad? Name all sub-concepts.",b:"CONFIDENTIALITY: Data confidentiality + Privacy\nINTEGRITY: Data integrity + System integrity + Nonrepudiation\nAVAILABILITY: Systems work promptly; service not denied to authorized users"},
      {f:"Under which CIA objective is nonrepudiation classified?",b:"INTEGRITY — specifically under data integrity.\nNeither sender nor receiver can later deny having processed the information."},
      {f:"Passive vs Active attacks — what's hard about each?",b:"Passive = hard to DETECT (doesn't affect resources).\nActive = hard to PREVENT (wide variety of vulnerabilities).\nPassive types: Release of message contents + Traffic analysis.\nActive types: Masquerade, Replay, Data Modification, DoS"},
      {f:"What are the 8 specific security mechanisms?",b:"1. Cryptographic algorithms (reversible + irreversible)\n2. Data integrity mechanisms\n3. Digital signature\n4. Authentication exchange\n5. Traffic padding\n6. Routing control\n7. Notarization (trusted third party)\n8. Access control"},
      {f:"What is traffic padding and what does it counter?",b:"Insertion of BITS INTO GAPS in a data stream to frustrate TRAFFIC ANALYSIS attempts.\nIt is a specific security mechanism (not a service)."},
      {f:"Two types of Authentication service (X.800).",b:"1. PEER ENTITY AUTHENTICATION — used during a connection; prevents masquerade and unauthorized replay of a previous connection.\n2. DATA ORIGIN AUTHENTICATION — corroborates source of a data unit; does NOT protect against duplication or modification; supports apps like e-mail."},
      {f:"Data Confidentiality service — two aspects.",b:"1. TRANSMISSION PROTECTION — broad (all user data) or narrow (single message/field).\n2. TRAFFIC FLOW PROTECTION — attacker cannot observe source, destination, frequency, length, or other traffic characteristics."},
      {f:"Data Integrity service — two types.",b:"1. CONNECTION-ORIENTED — deals with stream of messages; assures no duplication, insertion, modification, REORDERING, or replays.\n2. CONNECTIONLESS — deals with individual messages; protects against MESSAGE MODIFICATION ONLY."},
      {f:"Nonrepudiation service — two directions.",b:"PROOF OF ORIGIN: receiver can prove the alleged sender actually sent the message.\nPROOF OF DELIVERY: sender can prove the alleged receiver actually received the message."},
      {f:"Availability of Service — what does it counter and what does it depend on?",b:"Counters: DENIAL-OF-SERVICE (DoS) attacks.\nDepends on: proper management and control of system resources, ACCESS CONTROL service, and other security services."},
    ],
    l2:[
      {f:"Define 'b divides a' (b | a). Give 3 examples from the slides.",b:"b | a means a = mb for some integer m — no remainder on division.\n\nExamples: 13|182 · −5|30 · 17|289 · 17|0\n(Positive divisors of 24: 1,2,3,4,6,8,12,24)"},
      {f:"State the Division Algorithm. Why is −11 mod 7 = 3 and NOT −4?",b:"a = qn + r where 0 ≤ r < n and q = ⌊a/n⌋\n\n−11 mod 7 = 3 because: −11 = (−2)×7 + 3 and 0 ≤ 3 < 7 ✓\n(NOT −4 — remainder must be NON-NEGATIVE by definition)"},
      {f:"State all 5 divisibility properties. Which one needs a proof?",b:"P1: a|1 → a=±1\nP2: a|b and b|a → a=±b\nP3: Any b≠0 divides 0\nP4: a|b and b|c → a|c (transitivity; e.g. 11|66,66|198→11|198)\nP5: b|g and b|h → b|(mg+nh)\nProof of P5: g=b·g₁, h=b·h₁ → mg+nh=b(mg₁+nh₁) ∎"},
      {f:"Define GCD. What are gcd(60,−24), gcd(a,0), and gcd(8,15)?",b:"gcd(a,b)=max{k: k|a and k|b}\ngcd(60,−24)=gcd(60,24)=12  (uses |a|,|b|)\ngcd(a,0)=|a|  (all nonzero integers divide 0)\ngcd(8,15)=1 → relatively prime (divisors: {1,2,4,8}∩{1,3,5,15}={1})"},
      {f:"Compute gcd(710,310) using the Euclidean Algorithm (Fig 2.3).",b:"gcd(710,310):\n710 = 2×310 + 90\n310 = 3×90 + 40\n 90 = 2×40 + 10\n 40 = 4×10 + 0\ngcd = 10\n\nKey rule: gcd(a,b)=gcd(b, a mod b)"},
      {f:"In Table 2.2(c), which elements have a multiplicative inverse mod 8? Why?",b:"Elements with mult. inverse mod 8: {1,3,5,7} (the ODD numbers)\n1⁻¹=1 · 3⁻¹=3 · 5⁻¹=5 · 7⁻¹=7\n\nElements 0,2,4,6 have NO inverse because gcd(2,8)=2, gcd(4,8)=4, gcd(6,8)=2 ≠ 1.\nMult. inverse exists only when gcd(w,n)=1."},
      {f:"State the 3 properties of modular arithmetic (arithmetic operations).",b:"1. [(a mod n)+(b mod n)] mod n = (a+b) mod n\n2. [(a mod n)−(b mod n)] mod n = (a−b) mod n\n3. [(a mod n)×(b mod n)] mod n = (a×b) mod n\n\nExample: [(11 mod 8)×(15 mod 8)] mod 8 = (3×7) mod 8 = 21 mod 8 = 5 = (165 mod 8) ✓"},
      {f:"State the 3 properties of congruences. Give a slide example for property 1.",b:"1. a≡b(mod n) iff n|(a−b)\n2. a≡b(mod n) implies b≡a(mod n) [symmetry]\n3. a≡b and b≡c (mod n) implies a≡c(mod n) [transitivity]\n\nExample for P1: 23≡8(mod 5) because 23−8=15=5×3 ✓\nAlso: −11≡5(mod 8) because −11−5=−16=8×(−2) ✓"},
      {f:"State Table 2.3: Properties of Modular Arithmetic for Zₙ.",b:"Commutative: (w+x)modn=(x+w)modn · (w×x)modn=(x×w)modn\nAssociative: [(w+x)+y]modn=[w+(x+y)]modn  (same for ×)\nDistributive: [w×(x+y)]modn=[(w×x)+(w×y)]modn\nIdentities: (0+w)modn=wmodn · (1×w)modn=wmodn\nAdditive inverse: ∀w∈Zₙ, ∃z such that w+z≡0(modn)"},
    ],
    l3:[
      {f:"Caesar cipher: encrypt and decrypt formulas.",b:"Encrypt: C = E(k,p) = (p+k) mod 26\nDecrypt: p = D(k,C) = (C−k) mod 26\nOnly 25 possible keys → trivially broken by brute force"},
      {f:"Why is the monoalphabetic cipher insecure despite 26! keys?",b:"It PRESERVES the frequency distribution of the original language. Frequency analysis using letter/digram/trigram frequencies breaks it. Brute force alone is not enough to find it."},
      {f:"Playfair: inventor, year, and how it works.",b:"Invented by Wheatstone in 1854. Used by U.S. Army in WWII.\nEncrypts DIGRAMS (letter pairs) using a 5×5 keyword matrix.\nDefeats single-letter frequency analysis."},
      {f:"Two features ALL polyalphabetic ciphers share.",b:"1. A set of related monoalphabetic substitution rules is used\n2. A key determines which particular rule is chosen for each position"},
      {f:"Hill cipher: strength and weakness.",b:"Strength: hides single-letter frequencies (3×3 also hides 2-letter frequencies) → strong vs ciphertext-only attacks\nWeakness: easily broken with a KNOWN-PLAINTEXT attack"},
      {f:"Rail Fence cipher — how does it work?",b:"Simplest transposition cipher. Write plaintext diagonally across 'rails', then read off row by row.\nExample: 'meet me after...' depth 2 → MEMATRHTGPRY + ETEFETEOAAT"},
      {f:"Row Transposition: what is the key?",b:"The ORDER OF THE COLUMNS. Message written row by row, read column by column in key-permuted order.\nExample key 4312567 → determines column reading sequence."},
      {f:"Product cipher: why is Sub+Trans >> Sub+Sub or Trans+Trans?",b:"Sub+Sub = still a substitution\nTrans+Trans = still a transposition\nSub+Trans = NEW type of cipher — hard to attack with either frequency analysis or pattern analysis. Bridge to modern ciphers."},
      {f:"One-time pad: why unbreakable?",b:"Uses random key as long as message, used ONCE then discarded.\nProduces random output with NO statistical relationship to plaintext.\nOnly cryptosystem with PERFECT SECRECY."},
      {f:"Two practical difficulties of the one-time pad.",b:"1. Making large quantities of truly RANDOM keys is hard\n2. MAMMOTH KEY DISTRIBUTION — every message needs a key of equal length securely delivered to both parties"},
    ],
    l4:[
      {f:"What are the three key numerical parameters of DES?",b:"Block size: 64 bits\nKey size: 56 bits\nRounds: 16\nIssued 1977 as FIPS 46. Algorithm called DEA (Data Encryption Algorithm)."},
      {f:"Who introduced diffusion and confusion? Define each.",b:"Claude Shannon. Concern: thwart statistical cryptanalysis.\nDIFFUSION: plaintext statistics dissipated into ciphertext (via permutations)\nCONFUSION: key-ciphertext relationship made complex (via substitutions/S-boxes)"},
      {f:"Stream cipher vs block cipher — key difference.",b:"Stream: encrypts 1 bit/byte at a time via XOR with keystream\nBlock: treats a whole block (64 or 128 bits) as a unit, symmetric key\nMost network symmetric crypto uses BLOCK ciphers"},
      {f:"Feistel encryption round formulas.",b:"L_i = R_{i-1}\nR_i = L_{i-1} ⊕ F(R_{i-1}, K_i)\n\nAlternates substitutions and permutations. Used by DES, 3DES, Blowfish."},
      {f:"How does Feistel decryption work?",b:"SAME algorithm as encryption, but subkeys applied in REVERSE order (K_16 first → K_1 last).\nSame hardware/software works for both — only key schedule changes direction."},
      {f:"Define the avalanche effect.",b:"A small change in plaintext OR key produces a SIGNIFICANT change in ciphertext. Ideally 1 bit in → ~half the bits change out.\nCritical for security — prevents attackers learning anything from small changes."},
      {f:"DES key search: how long at 10¹³ dec/s?",b:"DES (56-bit): 1 HOUR\nAES-128: 5.3×10¹⁷ years\nTriple DES (168-bit): 5.8×10²⁹ years\n\nDES is considered broken at modern computation speeds."},
      {f:"What was the DES design controversy?",b:"1. 56-bit key chosen over Lucifer's 128-bit — suspected too small\n2. S-box design criteria were CLASSIFIED — suspected backdoor\nOutcome: public analysis confirmed design was appropriate."},
      {f:"List the 6 Feistel cipher design parameters.",b:"1. Block size (larger → more secure, slower)\n2. Key size (larger → more secure)\n3. Number of rounds (more → more secure; DES = 16)\n4. Subkey generation algorithm\n5. Round function F\n6. Fast software enc/dec"},
      {f:"What is Triple DES and why was it introduced?",b:"Applies DES 3 times: Encrypt(K1) → Decrypt(K2) → Encrypt(K3).\nEffective key length: 168 bits.\nIntroduced because 56-bit DES was too weak for modern threats. Replaced by AES in 2001."},
    ],
    l5:[
      {f:"List the 4 group axioms. What makes a group Abelian?",b:"A1 Closure · A2 Associativity · A3 Identity · A4 Inverse\n\nAdding A5 Commutativity (a•b = b•a) makes it an ABELIAN group."},
      {f:"What is the one axiom that makes a field different from an integral domain?",b:"M7 — MULTIPLICATIVE INVERSE: for each a ≠ 0 in F, there exists a⁻¹ ∈ F such that aa⁻¹ = 1.\n\nThis enables division: a/b = a(b⁻¹)."},
      {f:"What must the order of a finite field be?",b:"A POWER OF A PRIME: pⁿ where p is prime and n ≥ 1.\nNotation: GF(pⁿ) = Galois field.\nNamed after Évariste Galois (1811–1832, died age 20)."},
      {f:"What is GF(p) and how is arithmetic defined?",b:"Elements: {0, 1, …, p−1} where p is prime.\nArithmetic: addition and multiplication MOD p.\nEvery nonzero element has a multiplicative inverse."},
      {f:"In GF(2ⁿ), what does addition equal computationally?",b:"Addition = XOR of bit strings.\nSubtraction = same as addition (in mod 2).\nMultiplication = shift and XOR.\nModular reduction = repeated substitution using irreducible polynomial."},
      {f:"Explain the TWO uses of mod in GF(2ⁿ).",b:"Use 1: mod 2 (mod p) — reduces coefficients to 0 or 1 (binary coefficients only).\nUse 2: mod p(x) — reduces result polynomial using irreducible polynomial, keeping degree < n.\nBOTH are required."},
      {f:"Why are the integers ℤ NOT a field?",b:"ℤ is an integral domain but NOT a field because most integers have no multiplicative inverse within ℤ.\nExample: 2 × ? = 1 has no integer solution.\nRational numbers ℚ, reals ℝ, and GF(p) ARE fields."},
      {f:"What is a cyclic group and generator?",b:"G is cyclic if every element is a power aᵏ of a fixed element a.\nThat element a is the GENERATOR of G.\nA cyclic group is always Abelian. May be finite or infinite."},
      {f:"GF(2³) with x³+x+1: what is g³?",b:"g³ = g + 1  (binary 011, decimal 3).\nBecause g satisfies g³+g+1=0 → g³ = g+1 (mod 2).\nPowers g⁰–g⁶ generate all 7 nonzero elements of GF(2³)."},
      {f:"Why does AES use GF(2⁸) instead of ordinary integer arithmetic?",b:"GF(2⁸) provides:\n• Closure — all results stay in 8 bits\n• Multiplicative inverses — needed for S-box (confusion)\n• Efficient hardware — reduces to XOR and shifts\n• Well-defined algebraic structure for security\n\nIrreducible polynomial: x⁸+x⁴+x³+x+1"},
    ],
  };
  const fcIdx = {l1:0, l2:0, l3:0, l4:0, l5:0};

  function renderFC(lec){
    const cards = flashcards[lec]; if(!cards) return;
    const i = fcIdx[lec];
    const f = document.getElementById(lec+'-fc-front');
    const b = document.getElementById(lec+'-fc-back');
    if(f) f.textContent = cards[i].f;
    if(b) b.textContent = cards[i].b;
    const s = document.getElementById(lec+'-fc-scene');
    if(s) s.classList.remove('flipped');
    const ct = document.getElementById(lec+'-fc-count');
    if(ct) ct.textContent = (i+1)+'/'+cards.length;
    const lbl = document.getElementById(lec+'fc-lbl');
    if(lbl) lbl.textContent = 'Card '+(i+1)+' of '+cards.length;
    const bar = document.getElementById(lec+'fc-bar');
    if(bar) bar.style.width = ((i+1)/cards.length*100)+'%';
  }
  function fcFlip(lec){ const s=document.getElementById(lec+'-fc-scene'); if(s) s.classList.toggle('flipped'); }
  function fcNext(lec){ const c=flashcards[lec]; if(c && fcIdx[lec]<c.length-1){fcIdx[lec]++;renderFC(lec);} }
  function fcPrev(lec){ if(fcIdx[lec]>0){fcIdx[lec]--;renderFC(lec);} }

  // ── KEY FACTS SEARCH ──
  function filterFS(input){
    const q = input.value.toLowerCase().trim();
    const panel = input.closest('.sec-panel');
    if(!panel) return;
    panel.querySelectorAll('.fs-row').forEach(row=>{
      const t = (row.dataset.s||'')+' '+row.textContent;
      row.classList.toggle('hidden', q.length>0 && !t.toLowerCase().includes(q));
    });
    panel.querySelectorAll('.fs-group').forEach(grp=>{
      const any = [...grp.querySelectorAll('.fs-row')].some(r=>!r.classList.contains('hidden'));
      grp.classList.toggle('hidden', q.length>0 && !any);
    });
  }

  // ── TOOL: Modular Calculator ──
  function calcMod(){
    const a=parseInt(document.getElementById('mod-a').value);
    const b=parseInt(document.getElementById('mod-b').value);
    const n=parseInt(document.getElementById('mod-n').value);
    const op=document.getElementById('mod-op').value;
    const res=document.getElementById('mod-result');
    if(isNaN(a)||isNaN(n)||n<=0){res.textContent='Enter valid numbers (n > 0).';return;}
    let out;
    if(op==='mod'){
      const r=((a%n)+n)%n;
      out=`${a} mod ${n} = ${r}\n${a} = ${Math.floor(a/n)} × ${n} + ${r}   (0 ≤ ${r} < ${n} ✓)`;
    } else {
      if(isNaN(b)){res.textContent='Enter value for b.';return;}
      let sym,raw;
      if(op==='add'){sym='+';raw=a+b;}else if(op==='sub'){sym='−';raw=a-b;}else{sym='×';raw=a*b;}
      const r=((raw%n)+n)%n;
      const am=((a%n)+n)%n, bm=((b%n)+n)%n;
      const chk=(op==='add'?(am+bm):op==='sub'?(am-bm):(am*bm));
      const chkr=((chk%n)+n)%n;
      out=`(${a} ${sym} ${b}) mod ${n} = ${r}\nVerification: [(${a} mod ${n}) ${sym} (${b} mod ${n})] mod ${n} = [${am} ${sym} ${bm}] mod ${n} = ${chkr} ✓`;
    }
    res.textContent=out;
  }

  // ── TOOL: GCD Stepper ──
  function runGCD(){
    let a=parseInt(document.getElementById('gcd-a').value);
    let b=parseInt(document.getElementById('gcd-b').value);
    const container=document.getElementById('gcd-steps');
    container.innerHTML='';
    if(isNaN(a)||isNaN(b)||a<=0||b<0){container.innerHTML='<div style="color:var(--c-coral);font-size:13px">Enter positive integers.</div>';return;}
    const oa=a,ob=b;const steps=[];let step=0;
    while(b!==0){const q=Math.floor(a/b),r=a%b;steps.push({a,b,q,r,step:++step});a=b;b=r;}
    const gcd=a;
    steps.forEach((s,i)=>{
      const d=document.createElement('div');
      d.style.cssText='display:flex;align-items:center;gap:12px;padding:9px 14px;border-radius:7px;background:var(--c-green-l);border:1px solid var(--c-green-m);font-family:"DM Mono",monospace;font-size:12.5px;animation:fadein .3s ease both';
      d.style.animationDelay=(i*.06)+'s';
      d.innerHTML=`<span style="color:var(--ink3);min-width:24px">S${s.step}</span><span style="color:var(--ink)">${s.a} = <span style="color:var(--c-cyan)">${s.q}</span> × ${s.b} + <span style="color:var(--c-gold)">${s.r}</span></span><span style="color:var(--ink3)">→ gcd(${s.b},${s.r})</span>`;
      container.appendChild(d);
    });
    const res=document.createElement('div');
    res.style.cssText='margin-top:8px;padding:11px 16px;border-radius:9px;background:var(--c-green-l);border:1px solid var(--c-green-m);font-family:"DM Mono",monospace;font-size:1rem;color:var(--c-green);animation:fadein .3s ease both';
    res.style.animationDelay=(steps.length*.06)+'s';
    res.innerHTML=`gcd(${oa}, ${ob}) = <strong style="font-size:1.3rem">${gcd}</strong>`;
    container.appendChild(res);
  }

  // ── TOOL: Totient ──
  function gcd2(a,b){return b===0?a:gcd2(b,a%b);}
  function calcTotient(){
    const n=parseInt(document.getElementById('tot-n').value);
    const res=document.getElementById('tot-result');
    const grid=document.getElementById('tot-grid');
    if(isNaN(n)||n<2||n>500){res.textContent='Enter n between 2 and 500.';grid.innerHTML='';return;}
    const reduced=[];
    for(let i=1;i<n;i++) if(gcd2(i,n)===1) reduced.push(i);
    const phi=reduced.length;
    res.textContent=`ø(${n}) = ${phi}   |   Reduced set has ${phi} element${phi!==1?'s':''}`;
    grid.innerHTML='';
    if(n<=120){
      for(let i=1;i<n;i++){
        const s=document.createElement('span');
        const ok=gcd2(i,n)===1;
        s.style.cssText=`display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:6px;font-family:'DM Mono',monospace;font-size:11px;border:1px solid;`+(ok?'background:var(--c-violet-l);border-color:var(--c-violet-m);color:var(--c-violet);font-weight:500':'background:rgba(255,255,255,.02);border-color:rgba(255,255,255,.06);color:var(--ink3)');
        s.title=`gcd(${i},${n})=${gcd2(i,n)}`;s.textContent=i;grid.appendChild(s);
      }
      const leg=document.createElement('div');
      leg.style.cssText='width:100%;margin-top:8px;font-size:11.5px;color:var(--ink3)';
      leg.innerHTML='<span style="color:var(--c-violet)">■</span> coprime to n (in reduced set) &nbsp; <span style="color:var(--ink3)">■</span> not coprime';
      grid.appendChild(leg);
    }
  }

  // ── TOOL: Caesar Cipher ──
  function caesarRun(mode){
    const raw=document.getElementById('caesar-input').value;
    const k=((parseInt(document.getElementById('caesar-k').value)%26)+26)%26;
    const res=document.getElementById('caesar-result');
    const stepsEl=document.getElementById('caesar-steps');
    if(!raw){res.textContent='Enter a message.';return;}
    let out='',steps=[];
    for(const ch of raw){
      const lc=ch.toLowerCase();
      if(lc>='a'&&lc<='z'){
        const p=lc.charCodeAt(0)-97;
        const c=mode==='enc'?(p+k)%26:((p-k)+26)%26;
        const outCh=mode==='enc'?String.fromCharCode(c+65):String.fromCharCode(c+97);
        if(steps.length<6) steps.push(`${lc}(${p}) ${mode==='enc'?'+':'-'}${k} mod26 = ${c} → ${outCh}`);
        out+=outCh;
      } else out+=ch;
    }
    res.textContent=(mode==='enc'?'Encrypted: ':'Decrypted: ')+out;
    stepsEl.innerHTML=steps.length?'First steps:\n'+steps.join('\n'):'';
  }

  // ── TOOL: Frequency Analysis ──
  function runFreq(){
    const text=document.getElementById('freq-input').value.toUpperCase().replace(/[^A-Z]/g,'');
    if(!text) return;
    const counts={};for(let i=0;i<26;i++) counts[String.fromCharCode(65+i)]=0;
    for(const ch of text) counts[ch]++;
    const total=text.length;
    const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    const max=sorted[0][1];
    const barsEl=document.getElementById('freq-bars');
    const labelsEl=document.getElementById('freq-labels');
    const hintEl=document.getElementById('freq-hint');
    barsEl.innerHTML='';labelsEl.innerHTML='';
    const enTop=new Set(['E','T','A','O','I','N']);
    sorted.forEach(([letter,count])=>{
      const pct=max>0?(count/max*88):0;
      const isTop=count>0&&enTop.has(letter);
      const bar=document.createElement('div');
      bar.style.cssText=`flex:1;min-width:0;height:${pct}px;border-radius:3px 3px 0 0;background:${isTop?'rgba(167,139,250,.6)':'rgba(77,127,255,.25)'};transition:height .4s ease`;
      bar.title=`${letter}: ${count} (${(count/total*100).toFixed(1)}%)`;
      barsEl.appendChild(bar);
      const lbl=document.createElement('div');
      lbl.style.cssText='flex:1;min-width:0;text-align:center;font-family:"DM Mono",monospace;font-size:9px;color:'+(isTop?'var(--c-violet)':'var(--ink3)');
      lbl.textContent=letter;labelsEl.appendChild(lbl);
    });
    const top3=sorted.slice(0,3).map(([l])=>l).join(', ');
    hintEl.innerHTML=`Top 3: <strong style="color:var(--c-violet)">${top3}</strong> · English top: <strong style="color:var(--c-cyan)">E,T,A,O,I,N</strong> · <span style="color:var(--c-violet)">■</span> = likely high-freq English letter`;
  }

  // ── TOOL: Vigenère ──
  function runVig(){
    const plain=document.getElementById('vig-plain').value.toLowerCase().replace(/[^a-z]/g,'');
    const key=document.getElementById('vig-key').value.toLowerCase().replace(/[^a-z]/g,'');
    const res=document.getElementById('vig-result');
    if(!plain||!key){res.textContent='Enter plaintext and keyword.';return;}
    let cipher='',keyRow='';
    for(let i=0;i<plain.length;i++){
      const p=plain.charCodeAt(i)-97, k=key.charCodeAt(i%key.length)-97;
      cipher+=String.fromCharCode((p+k)%26+65);
      keyRow+=key[i%key.length].toUpperCase();
    }
    res.textContent=`Key:    ${keyRow}\nPlain:  ${plain.toUpperCase()}\nCipher: ${cipher}\n\nFormula: C[i] = (plain[i] + key[i % keylen]) mod 26`;
  }

  // ── TOOL: Feistel Round Simulator ──
  function runFeistel(){
    const L0 = parseInt(document.getElementById('f-l0').value, 16);
    const R0 = parseInt(document.getElementById('f-r0').value, 16);
    const K1 = parseInt(document.getElementById('f-k1').value, 16);
    const res = document.getElementById('feistel-result');
    if(isNaN(L0)||isNaN(R0)||isNaN(K1)){res.textContent='Enter valid hex values (00–FF).';return;}
    // Simple F function: rotate right by 2 bits then XOR with key (8-bit simulation)
    const mask = 0xFF;
    const fOut = (((R0 >> 2) | ((R0 & 0x3) << 6)) ^ K1) & mask;
    const L1 = R0;
    const R1 = (L0 ^ fOut) & mask;
    const h = v => v.toString(16).toUpperCase().padStart(2,'0');
    // Verify decryption reverses it
    const fOutD = (((L1 >> 2) | ((L1 & 0x3) << 6)) ^ K1) & mask;
    const XL = L1;
    const XR = (R1 ^ fOutD) & mask;
    res.textContent =
            `Encryption:\n  L₀=${h(L0)}  R₀=${h(R0)}  K₁=${h(K1)}\n  F(R₀,K₁) = rotate(${h(R0)}) ⊕ ${h(K1)} = ${h(fOut)}\n  L₁ = R₀ = ${h(L1)}\n  R₁ = L₀ ⊕ F = ${h(L0)} ⊕ ${h(fOut)} = ${h(R1)}\n\nDecryption reversal:\n  Input: L₁=${h(L1)}, R₁=${h(R1)}\n  F(L₁,K₁) = ${h(fOutD)}\n  XL = L₁ = R₀ = ${h(XL)} ✓\n  XR = R₁ ⊕ F = ${h(R1)} ⊕ ${h(fOutD)} = ${h(XR)} = L₀ ✓`;
  }

  // ── TOOL: Key Search Estimator ──
  function calcKeySearch(){
    const bits = parseInt(document.getElementById('ks-bits').value);
    const speed = parseFloat(document.getElementById('ks-speed').value);
    const res = document.getElementById('ks-result');
    if(isNaN(bits)||isNaN(speed)||bits<1||speed<=0){res.textContent='Enter valid values.';return;}
    const keys = Math.pow(2, bits);
    const avgKeys = keys / 2; // average case: half the key space
    const seconds = avgKeys / speed;
    const minutes = seconds / 60;
    const hours   = minutes / 60;
    const days    = hours   / 24;
    const years   = days    / 365.25;
    let timeStr;
    if(seconds < 1)       timeStr = `${(seconds*1000).toFixed(3)} milliseconds`;
    else if(seconds < 60) timeStr = `${seconds.toFixed(2)} seconds`;
    else if(minutes < 60) timeStr = `${minutes.toFixed(2)} minutes`;
    else if(hours < 24)   timeStr = `${hours.toFixed(2)} hours`;
    else if(days < 365)   timeStr = `${days.toFixed(1)} days`;
    else                  timeStr = `${years.toExponential(2)} years`;
    res.textContent =
            `Key size: ${bits} bits\nPossible keys: 2^${bits} ≈ ${keys.toExponential(3)}\nAvg keys to check: 2^${bits}/2 ≈ ${avgKeys.toExponential(3)}\nAt ${speed.toExponential(2)} dec/s:\n→ Average time: ${timeStr}\n→ Worst case: ${timeStr.replace(/[\d.]+/, (n=>parseFloat(n)*2).toString())} (roughly double)`;
  }

  // ── TOOL: Avalanche Visualizer ──
  function runAvalanche(){
    const a = parseInt(document.getElementById('av-a').value);
    const b = parseInt(document.getElementById('av-b').value);
    const res = document.getElementById('av-result');
    if(isNaN(a)||isNaN(b)||a<0||a>255||b<0||b>255){res.textContent='Enter values 0–255.';return;}
    const toBin = v => v.toString(2).padStart(8,'0');
    const countBits = v => v.toString(2).split('').filter(c=>c==='1').length;
    const diff0 = a ^ b;
    const bits0 = countBits(diff0);
    // Simulate 4 simple rounds: mix using XOR rotations (educational approximation)
    let va=a, vb=b;
    let lines=[`Round 0 (input):  A=${toBin(a)} (${a})  B=${toBin(b)} (${b})  XOR=${toBin(diff0)}  Δ bits=${bits0}`];
    for(let r=1;r<=6;r++){
      va = ((va*131 + 17) ^ (va << 3)) & 0xFF;
      vb = ((vb*131 + 17) ^ (vb << 3)) & 0xFF;
      const d = va^vb, db = countBits(d);
      lines.push(`Round ${r}:          A=${toBin(va)} (${va})  B=${toBin(vb)} (${vb})  XOR=${toBin(d)}  Δ bits=${db}`);
    }
    lines.push(`\nIdeal avalanche: Δ bits → ~4 (half of 8 bits) by round 3–4.\nNote: This is a simplified simulation for illustration purposes.`);
    res.textContent = lines.join('\n');
  }

  // ── TOOL: GF(p) Arithmetic ──
  function isPrime(n){ if(n<2) return false; for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0) return false; return true; }
  function modInverse(a, p){
    // Extended Euclidean algorithm
    a = ((a % p) + p) % p;
    if(a === 0) return null;
    let [old_r, r] = [a, p], [old_s, s] = [1, 0];
    while(r !== 0){ const q = Math.floor(old_r/r); [old_r,r]=[r,old_r-q*r]; [old_s,s]=[s,old_s-q*s]; }
    return ((old_s % p) + p) % p;
  }
  function calcGFp(){
    const a = parseInt(document.getElementById('gfp-a').value);
    const b = parseInt(document.getElementById('gfp-b').value);
    const p = parseInt(document.getElementById('gfp-p').value);
    const op = document.getElementById('gfp-op').value;
    const res = document.getElementById('gfp-result');
    if(isNaN(a)||isNaN(b)||isNaN(p)){res.textContent='Enter valid numbers.';return;}
    if(!isPrime(p)){res.textContent=`p = ${p} is NOT prime. GF(p) requires a prime modulus.`;return;}
    const am = ((a%p)+p)%p, bm = ((b%p)+p)%p;
    let result, sym, detail='';
    if(op==='add'){ sym='+'; result=(am+bm)%p; detail=`${am} + ${bm} = ${am+bm} ≡ ${result} (mod ${p})`; }
    else if(op==='sub'){ sym='−'; result=((am-bm)%p+p)%p; detail=`${am} − ${bm} = ${am-bm} ≡ ${result} (mod ${p})`; }
    else if(op==='mul'){ sym='×'; result=(am*bm)%p; detail=`${am} × ${bm} = ${am*bm} ≡ ${result} (mod ${p})`; }
    else {
      sym='÷';
      if(bm===0){ res.textContent='Division by zero is undefined.'; return; }
      const bInv = modInverse(bm, p);
      result=(am*bInv)%p;
      detail=`${am} ÷ ${bm} = ${am} × ${bm}⁻¹ mod ${p}\n${bm}⁻¹ mod ${p} = ${bInv}  (since ${bm} × ${bInv} = ${bm*bInv} ≡ 1 mod ${p})\n= ${am} × ${bInv} = ${am*bInv} ≡ ${result} (mod ${p})`;
    }
    res.textContent = `GF(${p}): ${am} ${sym} ${bm} = ${result}\n\n${detail}`;
  }

  // ── TOOL: Polynomial XOR ──
  function bitsToPolyStr(bits){
    const b = bits.replace(/[^01]/g,'');
    const n = b.length - 1;
    const terms = [];
    for(let i=0;i<b.length;i++){ if(b[i]==='1'){ const exp=n-i; if(exp>1) terms.push(`x${exp>1?'⁰¹²³⁴⁵⁶⁷⁸⁹'[exp]||'^'+exp:''}`); else if(exp===1) terms.push('x'); else terms.push('1'); } }
    return terms.length ? terms.join('+') : '0';
  }
  function bitsToPolyStrClean(bits){
    const b = bits.replace(/[^01]/g,'').replace(/^0+/,'') || '0';
    const n = b.length - 1;
    const terms = [];
    for(let i=0;i<b.length;i++){
      if(b[i]==='1'){
        const exp=n-i;
        const sup=['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];
        if(exp>1) terms.push('x'+sup[exp]||'x^'+exp);
        else if(exp===1) terms.push('x');
        else terms.push('1');
      }
    }
    return terms.length ? terms.join(' + ') : '0';
  }
  function calcPolyXOR(){
    const ra = document.getElementById('poly-a').value.replace(/[^01]/g,'');
    const rb = document.getElementById('poly-b').value.replace(/[^01]/g,'');
    const res = document.getElementById('poly-result');
    if(!ra||!rb){res.textContent='Enter binary strings.';return;}
    const maxLen = Math.max(ra.length, rb.length);
    const a = ra.padStart(maxLen,'0');
    const b = rb.padStart(maxLen,'0');
    let xorBits = '';
    for(let i=0;i<maxLen;i++) xorBits += (parseInt(a[i])^parseInt(b[i])).toString();
    const trimmed = xorBits.replace(/^0+/,'') || '0';
    res.textContent =
            `A  = ${a}  →  ${bitsToPolyStrClean(a)}\nB  = ${b}  →  ${bitsToPolyStrClean(b)}\nA⊕B = ${xorBits}  →  ${bitsToPolyStrClean(xorBits)}\n\nResult (trimmed): ${trimmed}\n\nNote: Addition in GF(2ⁿ) = XOR. Subtraction = same as addition.`;
  }

  // ── TOOL: Axiom Checker ──
  function checkAxioms(){
    const set = document.getElementById('axm-set').value;
    const res = document.getElementById('axm-result');
    const checks = {
      integers:{
        name:'Integers ℤ under + and ×',
        A1:'✓ Closed under +',A2:'✓ Associative under +',A3:'✓ Identity: 0',A4:'✓ Additive inverse: −n',A5:'✓ Commutative under +',
        M1:'✓ Closed under ×',M2:'✓ Associative under ×',M3:'✓ Distributive',M4:'✓ Commutative under ×',
        M5:'✓ Multiplicative identity: 1',M6:'✓ No zero divisors',M7:'✗ No mult inverse (e.g. 2⁻¹ ∉ ℤ)',
        verdict:'INTEGRAL DOMAIN (not a field)',color:'var(--c-gold)'
      },
      zn:{
        name:'Zn = {0,1,…,n−1} under + and × mod n',
        A1:'✓ Closed under + mod n',A2:'✓ Associative',A3:'✓ Identity: 0',A4:'✓ Additive inverse: n−a',A5:'✓ Commutative',
        M1:'✓ Closed under × mod n',M2:'✓ Associative',M3:'✓ Distributive',M4:'✓ Commutative',
        M5:'✓ Multiplicative identity: 1',M6:'✗ Zero divisors exist if n is composite (e.g. in Z6: 2×3=6≡0)',M7:'✗ Mult inverse only if gcd(a,n)=1',
        verdict:'RING (becomes a field when n is prime → GF(p))',color:'var(--c-violet)'
      },
      gfp:{
        name:'GF(p) = integers {0,…,p−1} mod prime p',
        A1:'✓ A2:✓ A3:✓ A4:✓ A5:✓ — Abelian group under +',
        M1:'✓ M2:✓ M3:✓ M4:✓ — Commutative ring',
        M5:'✓ Identity: 1',M6:'✓ No zero divisors (p is prime)',M7:'✓ Every nonzero element has mult inverse mod p',
        verdict:'FINITE FIELD — All 7 axioms satisfied (A1–M7)',color:'var(--c-green)'
      },
      gf2n:{
        name:'GF(2ⁿ) — polynomials mod irreducible poly of degree n',
        A1:'✓ Closed (XOR stays in n bits)',A2:'✓ A3:✓ (0 polynomial)',A4:'✓ (self-inverse under XOR)',A5:'✓ XOR is commutative',
        M1:'✓ Closed (mod irreducible polynomial)',M2:'✓ M3:✓ M4:✓ M5:✓ M6:'+'✓ (irreducible poly ensures no zero divisors)',M7:'✓ Extended Euclidean gives inverse',
        verdict:'FINITE FIELD GF(2ⁿ) — All axioms satisfied. Used in AES (GF(2⁸))',color:'var(--c-cyan)'
      }
    };
    const c = checks[set];
    const lines = [
      `Structure: ${c.name}`,''
    ];
    const axiomKeys = ['A1','A2','A3','A4','A5','M1','M2','M3','M4','M5','M6','M7'];
    axiomKeys.forEach(k => { if(c[k]) lines.push(c[k]); });
    lines.push('','Verdict: '+c.verdict);
    res.textContent = lines.join('\n');
  }

  // ── INIT ──
  document.querySelectorAll('.lec-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sec-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('lec1').classList.add('active');
  buildSecTabs();
  showSec('summary');
  ['l1','l2','l3','l4','l5'].forEach(lec=>renderFC(lec));
  // Run tools with defaults
  setTimeout(()=>{runGCD();calcMod();caesarRun('enc');runFreq();runVig();runFeistel();calcKeySearch();runAvalanche();calcGFp();calcPolyXOR();checkAxioms();},100);
