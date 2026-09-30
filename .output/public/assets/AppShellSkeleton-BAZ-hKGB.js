import{t as e}from"./jsx-runtime-CoAZnjn0.js";var t=e(),n={display:`block`,backgroundColor:`hsl(var(--muted, 240 5% 96.1%))`,borderRadius:6,opacity:.7};function r({style:e}){return(0,t.jsx)(`span`,{"aria-hidden":!0,style:{...n,...e}})}function i({ariaLabel:e=`Loading application`,height:n=`var(--agent-native-viewport-height, 100vh)`}){return(0,t.jsxs)(`div`,{role:`status`,"aria-label":e,"data-agent-native-app-skeleton":`true`,style:{display:`flex`,height:n,width:`100%`,overflow:`hidden`,backgroundColor:`hsl(var(--background, 0 0% 100%))`,color:`hsl(var(--foreground, 240 10% 3.9%))`},children:[(0,t.jsx)(`style`,{children:`
        [data-agent-native-app-skeleton] [aria-hidden="true"] {
          animation: an-app-shell-skeleton-pulse 1.2s ease-in-out infinite;
        }
        @keyframes an-app-shell-skeleton-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-agent-native-app-skeleton] [aria-hidden="true"] { animation: none; }
        }
        @media (max-width: 767px) {
          [data-agent-native-app-skeleton] [data-agent-native-app-skeleton-sidebar] { display: none; }
        }
      `}),(0,t.jsxs)(`aside`,{"data-agent-native-app-skeleton-sidebar":`true`,"aria-hidden":`true`,style:{display:`flex`,width:248,flexShrink:0,flexDirection:`column`,gap:16,borderRight:`1px solid hsl(var(--border, 240 5.9% 90%))`,padding:16},children:[(0,t.jsx)(r,{style:{width:132,height:32}}),(0,t.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:10},children:[0,1,2,3,4,5].map(e=>(0,t.jsx)(r,{style:{width:`${68+e%3*14}%`,height:14}},e))})]}),(0,t.jsxs)(`main`,{style:{display:`flex`,minWidth:0,flex:1,flexDirection:`column`},children:[(0,t.jsxs)(`header`,{"aria-hidden":`true`,style:{display:`flex`,height:48,flexShrink:0,alignItems:`center`,gap:12,borderBottom:`1px solid hsl(var(--border, 240 5.9% 90%))`,padding:`0 16px`},children:[(0,t.jsx)(r,{style:{width:32,height:32,borderRadius:8}}),(0,t.jsx)(r,{style:{width:128,height:14}})]}),(0,t.jsxs)(`section`,{"aria-hidden":`true`,style:{display:`flex`,width:`100%`,maxWidth:960,flex:1,flexDirection:`column`,gap:12,margin:`0 auto`,padding:24},children:[(0,t.jsx)(r,{style:{width:`38%`,height:28,marginBottom:8}}),(0,t.jsx)(r,{style:{width:`24%`,height:14,marginBottom:16}}),[0,1,2,3,4,5].map(e=>(0,t.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,t.jsx)(r,{style:{width:32,height:32,borderRadius:8}}),(0,t.jsxs)(`div`,{style:{display:`flex`,flex:1,flexDirection:`column`,gap:8},children:[(0,t.jsx)(r,{style:{width:`${52+e%3*12}%`,height:12}}),(0,t.jsx)(r,{style:{width:`${34+e%4*10}%`,height:10}})]})]},e))]})]})]})}export{i as t};