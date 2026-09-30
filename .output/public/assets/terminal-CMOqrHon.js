import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{n as t}from"./api-path-BoWlbS9q.js";import{t as n}from"./react-CABnUpkU.js";import{t as r}from"./preload-helper-CZgWQFsJ.js";import{t as i}from"./jsx-runtime-CoAZnjn0.js";import{i as a,n as o}from"./frame-s1aQjOJ4.js";import{h as s}from"./agent-chat-aSYjW5NM.js";var c=i(),l=e(n(),1),u=!1;function d(){if(u||typeof document>`u`)return;u=!0;let e=document.createElement(`style`);e.textContent=`
    .xterm { position: relative; user-select: none; }
    .xterm.focus, .xterm:focus { outline: none; }
    .xterm .xterm-helpers { position: absolute; top: 0; z-index: 5; }
    .xterm .xterm-helper-textarea {
      padding: 0; border: 0; margin: 0;
      position: absolute; opacity: 0; left: -9999em; top: 0;
      width: 0; height: 0; z-index: -5;
      white-space: nowrap; overflow: hidden; resize: none;
    }
    .xterm .composition-view { display: none; position: absolute; white-space: nowrap; z-index: 1; }
    .xterm .composition-view.active { display: block; }
    .xterm .xterm-viewport {
      background-color: var(--agent-terminal-background); overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: hsl(var(--muted-foreground) / 0.22) transparent;
      cursor: default; position: absolute; right: 0; left: 0; top: 0; bottom: 0;
    }
    .xterm .xterm-viewport::-webkit-scrollbar { width: 8px; height: 8px; }
    .xterm .xterm-viewport::-webkit-scrollbar-track { background: transparent; }
    .xterm .xterm-viewport::-webkit-scrollbar-thumb {
      background: hsl(var(--muted-foreground) / 0.22);
      border-radius: 999px;
    }
    .xterm .xterm-viewport::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--muted-foreground) / 0.36);
    }
    .xterm .xterm-screen { position: relative; }
    .xterm .xterm-screen canvas { position: absolute; left: 0; top: 0; }
    .xterm .xterm-scroll-area { visibility: hidden; }
    .xterm-char-measure-element {
      display: inline-block; visibility: hidden; position: absolute; top: 0; left: -9999em;
      line-height: normal;
    }
    .xterm.enable-mouse-events { cursor: default; }
    .xterm.xterm-cursor-pointer, .xterm .xterm-cursor-pointer { cursor: pointer; }
    .xterm.column-select.focus { cursor: crosshair; }
    .xterm .xterm-accessibility:not(.debug),
    .xterm .xterm-message { position: absolute; left: 0; top: 0; bottom: 0; right: 0; z-index: 10; color: transparent; pointer-events: none; }
    .xterm .xterm-accessibility-tree:not(.debug) *::selection { color: transparent; }
    .xterm .xterm-accessibility-tree { user-select: text; white-space: pre; }
    .xterm .live-region { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
    .xterm .xterm-dim { opacity: 0.5; }
    .xterm .xterm-underline-1 { text-decoration: underline; }
    .xterm .xterm-underline-2 { text-decoration: double underline; }
    .xterm .xterm-underline-3 { text-decoration: wavy underline; }
    .xterm .xterm-underline-4 { text-decoration: dotted underline; }
    .xterm .xterm-underline-5 { text-decoration: dashed underline; }
    .xterm .xterm-overline { text-decoration: overline; }
    .xterm .xterm-strikethrough { text-decoration: line-through; }
    .xterm .xterm-screen .xterm-decoration-container .xterm-decoration { z-index: 6; position: absolute; }
    .xterm .xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer { z-index: 7; }
    .xterm .xterm-decoration-overview-ruler { z-index: 8; position: absolute; top: 0; right: 0; pointer-events: none; }
    .xterm .xterm-decoration-top { z-index: 2; position: relative; }
  `,document.head.appendChild(e)}var f={background:`#111`,foreground:`#e0e0e0`,cursor:`#58a6ff`,selectionBackground:`#264f78`,black:`#484f58`,red:`#ff7b72`,green:`#3fb950`,yellow:`#d29922`,blue:`#58a6ff`,magenta:`#bc8cff`,cyan:`#39d353`,white:`#b1bac4`};function p(e){return e.includes(`:`)&&!e.startsWith(`[`)?`[${e}]`:e}function m({command:e,flags:n,wsUrl:i,hideInFrame:u=!0,theme:m,fontSize:h=12,autoFocus:g=!0,className:_,style:v,onConnectionChange:y,onAgentRunningChange:b,submitRequest:x,onPromptSubmitted:S}){let C=(0,l.useRef)(null),w=(0,l.useRef)(null),T=(0,l.useRef)(null),E=(0,l.useRef)(g);E.current=g;let D=(0,l.useRef)(null),O=(0,l.useRef)(S);O.current=S;let[k,A]=(0,l.useState)(!1),[j,M]=(0,l.useState)(null),[N,P]=(0,l.useState)(!1);if((0,l.useEffect)(()=>{if(!u)return;let e=()=>{o()&&P(!0)};e();let t=setTimeout(e,500);return()=>clearTimeout(t)},[u]),(0,l.useEffect)(()=>{y?.(k)},[k,y]),(0,l.useEffect)(()=>{if(g){D.current?.();return}let e=document.activeElement;e instanceof HTMLElement&&C.current?.contains(e)&&e.blur()},[g]),(0,l.useEffect)(()=>{if(typeof window>`u`||u&&N)return;let o=C.current;if(!o)return;let c=o,l=!1,g=null,_=null;async function v(){let[{Terminal:o},{FitAddon:u},{WebLinksAddon:v}]=await Promise.all([r(()=>import(`./xterm-U4TA8lIC.js`),[]),r(()=>import(`./addon-fit-DIOBYJe3.js`),[]),r(()=>import(`./addon-web-links-xF2oeMXv.js`),[])]);if(l||!c)return;d();let y=new o({cursorBlink:!0,fontSize:h,fontFamily:`'SF Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace`,theme:{...f,...m}}),x=new u,S=new v((e,t)=>{window.open(t,`_blank`,`noopener`)});y.loadAddon(x),y.loadAddon(S),y.open(c);let C=()=>y.focus();D.current=C,E.current&&C();let k=!1;function j(){k||(k=!0,requestAnimationFrame(()=>{if(k=!1,!(l||!c.isConnected||c.clientWidth<=0||c.clientHeight<=0))try{x.fit(),K()}catch{}}))}j();let N=[setTimeout(j,50),setTimeout(j,250)],P=()=>j();window.addEventListener(`focus`,P),document.addEventListener(`visibilitychange`,P);let F=new ResizeObserver(()=>{j()});F.observe(c);let I=!1;function L(){I||(I=!0,N.forEach(clearTimeout),window.removeEventListener(`focus`,P),document.removeEventListener(`visibilitychange`,P),F.disconnect(),D.current===C&&(D.current=null),y.dispose())}function R(){return l?(L(),!0):!1}let z=i,B=e;if(!z)try{let e=await fetch(t(`/_agent-native/agent-terminal-info`));if(R())return;let n=await e.json();if(R())return;if(!n.available){M(n.error||`Agent terminal not available`),L();return}z=`${location.protocol===`https:`?`wss:`:`ws:`}//${p(location.hostname)}:${n.wsPort}/ws`,!B&&n.command&&(B=n.command)}catch{if(R())return;M(`Failed to discover terminal server`),L();return}let V=new URL(z);B&&V.searchParams.set(`command`,B),n&&V.searchParams.set(`flags`,n);let H=!1,U=null,W=0;function G(e){let t=e.text.trim();if(t){if(!g||g.readyState!==WebSocket.OPEN){T.current=e;return}g.send(t+`\r`),H=!0,q(!0),T.current?.id===e.id&&(T.current=null),O.current?.(e)}}function K(){g&&g.readyState===WebSocket.OPEN&&y&&g.send(JSON.stringify({type:`resize`,cols:y.cols,rows:y.rows}))}function q(e){b?.(e),window.dispatchEvent(new CustomEvent(`agentNative.chatRunning`,{detail:{isRunning:e}}))}function J(e){let t=++W;g&&=(g.close(),null);let n=new WebSocket(e);n.binaryType=`arraybuffer`,g=n,n.onopen=()=>{A(!0),M(null),E.current&&C(),n.send(JSON.stringify({type:`resize`,cols:y.cols,rows:y.rows}));let e=T.current;e&&G(e)},n.onmessage=e=>{let t=e.data instanceof ArrayBuffer?new TextDecoder().decode(e.data):e.data;try{let e=JSON.parse(t);if(e.type===`setup-status`){(e.status===`not-found`||e.status===`failed`)&&(M(e.message),W++);return}}catch{}M(null),y.write(t),t.includes(`❯`)||t.includes(`\x1B[?25h`)?(U&&clearTimeout(U),U=setTimeout(()=>{H&&(H=!1,q(!1))},600)):H&&U&&clearTimeout(U)},n.onclose=()=>{A(!1),W===t&&!l&&setTimeout(()=>{W===t&&!l&&J(e)},3e3)},n.onerror=()=>n.close()}y.onData(e=>{g&&g.readyState===WebSocket.OPEN&&g.send(e)});let Y=e=>{if(!a(e))return;let t=s(e);t&&g&&g.readyState===WebSocket.OPEN&&(g.send(t.message+`\r`),H=!0,q(!0))};window.addEventListener(`message`,Y),_=()=>window.removeEventListener(`message`,Y),w.current=G;let X=T.current;return X&&G(X),J(V.toString()),()=>{l=!0,W++,U&&clearTimeout(U),L(),g&&=(g.close(),null),w.current=null}}let y;return v().then(e=>{if(l){e?.(),_?.();return}y=e}),()=>{l=!0,y?.(),_?.()}},[u,N,e,n,i]),(0,l.useEffect)(()=>{x&&(T.current=x,w.current?.(x))},[x?.id,x?.text]),u&&N)return null;let F=m?.background??f.background;return(0,c.jsx)(`div`,{ref:C,className:_,style:{width:`100%`,height:`100%`,padding:`4px 12px`,position:`relative`,...v,background:F,backgroundColor:F,"--agent-terminal-background":F},children:j&&(0,c.jsx)(`div`,{style:{position:`absolute`,inset:0,display:`flex`,alignItems:`center`,justifyContent:`center`,backgroundColor:F,color:`#ff7b72`,fontSize:`13px`,fontFamily:`monospace`,padding:`20px`,textAlign:`center`,zIndex:1},children:j})})}export{m as AgentTerminal};