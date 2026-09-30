const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/webmcp-Drp02xB2.js","assets/api-path-BoWlbS9q.js","assets/browser-tab-id-D5PFXrE0.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{C as t,a as n,b as r,c as i,d as a,f as o,m as s,n as c,o as l,r as u,s as d,u as f,w as p,x as m}from"./api-path-BoWlbS9q.js";import{c as h,g,m as _,n as v,o as y}from"./analytics-6BwkkemF.js";import{t as b}from"./react-CABnUpkU.js";import{I as x,N as S,a as C,c as w,f as ee,r as te,s as ne}from"./hooks-DCZo9V8Q.js";import{a as re,t as T}from"./components-ChAtvvtm.js";import{n as E}from"./lib-Cn-PJsIH.js";import{a as ie,i as ae,s as oe}from"./errorBoundaries-DHRO3xzY.js";import{t as D}from"./preload-helper-CZgWQFsJ.js";import{t as se}from"./jsx-runtime-CoAZnjn0.js";import{t as O}from"./browser-tab-id-D5PFXrE0.js";import{n as ce,r as le,t as ue}from"./application-state-cw-sfIrh.js";import{c as de,d as fe,f as pe,l as me,p as he,s as ge}from"./use-action-D5EENKBz.js";import{t as _e,v as ve,y as ye}from"./FeedbackButton-0V9l41VH.js";import{_ as be,a as xe,c as Se,d as Ce,f as we,g as Te,h as Ee,i as De,l as k,m as Oe,o as ke,p as A,r as Ae,s as je,t as Me,u as j,v as Ne}from"./require-session-C8CWrsXg.js";import{t as Pe}from"./AppShellSkeleton-BAZ-hKGB.js";import{t as Fe}from"./dist-Dh_g0h7C.js";import{a as M,o as N}from"./dist-BFLkei15.js";import{a as Ie,c as P,d as Le,f as F,l as I,n as Re}from"./dist-BiY6xC3l.js";import{i as L,n as R,r as ze,t as z,u as Be}from"./tooltip-CTZGKMcS.js";import{n as Ve,t as He}from"./dist-BzkSX17n.js";import{t as Ue}from"./createReactComponent-AmHI9id0.js";import{t as We}from"./IconAlertTriangle-BgH8IQy9.js";import{a as Ge,i as Ke,n as qe,o as Je,t as Ye}from"./ErrorReportActions-DEUL_B7C.js";import{t as Xe}from"./IconCheck-DttJnYTL.js";import{t as Ze}from"./IconChevronDown-D16W5zhm.js";import{t as Qe}from"./IconChevronUp-tGSWNQXH.js";import{t as $e}from"./IconCopy-BOzDjuzv.js";import{t as et}from"./IconMessageCircle-D7laFcoI.js";import{r as tt,t as B}from"./button-DUyF2EHg.js";import{i as nt,r as rt,t as it}from"./popover-Cv0u6_gv.js";import{t as at}from"./app-status-DCHV3s9f.js";import{l as ot,n as st,r as ct,t as lt}from"./shared-BgMVuCTI.js";import{i as ut,t as dt}from"./i18n-Di-rhd_f.js";import{t as ft}from"./utils-DqNhCx4L.js";import{t as pt}from"./clipboard-ouY4hLKD.js";import{t as mt}from"./theme-DPfas7OP.js";import{n as ht}from"./chat-view-transition-DxHPIEim.js";var gt=`agent-native:demo-mode`;function _t(){if(typeof window>`u`)return!1;try{return window.localStorage.getItem(gt)===`true`}catch{return!1}}function vt(e){let t=1779033703^e.length;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),3432918353),t=t<<13|t>>>19;return function(){return t=Math.imul(t^t>>>16,2246822507),t=Math.imul(t^t>>>13,3266489909),t^=t>>>16,t>>>0}}function yt(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function bt(e,t){return yt(vt(`${e}${t}`)())}var xt=3600*1e3,St=5e3,V=new Map,H=new Map;function Ct(e){let t=Date.now();for(let[n,r]of e)if(t-(typeof r==`number`?r:r.at)>xt)e.delete(n);else break;for(;e.size>St;){let t=e.keys().next().value;if(t===void 0)break;e.delete(t)}}function wt(e){return e.length===0?e:(H.delete(e),H.set(e,Date.now()),H.size>St&&Ct(H),e)}function Tt(e){let t=H.get(e);return t===void 0?!1:Date.now()-t>xt?(H.delete(e),!1):!0}function Et(e,t,n,r,i=!0){if(i&&Tt(t))return t;let a=`${e}${n}${t}`,o=V.get(a),s=Date.now();if(o&&s-o.at<=xt)return V.delete(a),V.set(a,{value:o.value,at:s}),o.value;let c=r();return V.set(a,{value:c,at:s}),V.size>St&&Ct(V),i&&wt(c),c}var Dt=`anonymous@builder.io`;function Ot(e,t){return Et(`email`,e.toLowerCase(),t,()=>Dt)}function kt(e,t,n){return Et(`num`,t,n,()=>{let r=bt(`num:${t}`,n),i=``,a=!1;for(let t of e)if(t>=`0`&&t<=`9`){let e;a?e=Math.floor(r()*10):(e=1+Math.floor(r()*9),a=!0),i+=String(e)}else i+=t;return i},!1)}var At=[/\b[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s]+/g,/\b(?:mailto|data|tel|urn):[^\s]+/gi,/\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,/\b[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{4,}\b/g,/\b\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?Z?)?\b/g,/\b\d{1,2}:\d{2}(?::\d{2})?\b/g,/(?:\S*\/\S+)+/g,/[A-Za-z0-9_-]+/g],jt=`P`,Mt=``;function Nt(e){return`${jt}${e}${Mt}`}function Pt(e){if(e.length<3)return!1;let t=/[A-Za-z]/.test(e),n=/[0-9]/.test(e),r=/[_-]/.test(e);return!t&&!r?!1:!!(e.length>=16&&n||e.length>=10&&t&&n||r&&(n||e.length>=10)||t&&n)}function Ft(e){let t=new Map,n=0,r=[];for(let t=0;t<At.length;t++){let n=new RegExp(At[t].source,At[t].flags),i;for(;(i=n.exec(e))!==null;){let e=i[0];if(e.length===0){n.lastIndex++;continue}t===At.length-1&&!Pt(e)||r.push({start:i.index,end:i.index+e.length,value:e})}}if(r.length===0)return{text:e,restore:t};r.sort((e,t)=>e.start===t.start?t.end-e.end:e.start-t.start);let i=``,a=0;for(let o of r){if(o.start<a)continue;i+=e.slice(a,o.start);let r=Nt(n++);t.set(r,o.value),i+=r,a=o.end}return i+=e.slice(a),{text:i,restore:t}}function It(e,t){if(t.size===0)return e;let n=e;for(let[e,r]of t)n=n.split(e).join(r);return n}var Lt=/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,Rt=/(^|[^A-Za-z0-9_])([$€£]?)([+-]?)(\d[\d,]*(?:\.\d+)?)(?![A-Za-z0-9_])/g;function zt(e,t){return e.replace(Lt,e=>Ot(e,t))}function Bt(e){if(e.length!==4)return!1;let t=Number(e);return t>=1900&&t<=2099}function Vt(e,t){return e.replace(Rt,(e,n,r,i,a)=>{let o=a.includes(`,`),s=a.includes(`.`),c=a.replace(/[^0-9]/g,``);if(!r&&!i&&!o&&!s&&Bt(c))return`${n}${r}${i}${a}`;if(!r&&!o&&!s){let e=Number(c);if(Number.isFinite(e)&&e<1e3)return`${n}${r}${i}${a}`}return`${n}${r}${i}${kt(a,`${r}${i}${a}`,t)}`})}function Ht(e,t,n){if(typeof e!=`string`||e.length===0||!e.includes(`@`)&&(!n||!/[\d$€£¥]/.test(e)))return e;let{text:r,restore:i}=Ft(e),a=r;return a=zt(a,t),n&&(a=Vt(a,t)),It(a,i)}var Ut=/^id$|(^|_)id$|Id$|Ids$|uuid|guid|slug|token|secret|password|passwd|apikey|api_key|hash|sha\d*|etag|cursor|nonce|sessionid|messageid|threadid|nodeid|(^|_)key$|keyid|(^|_)ref$|url$|uri$|href$|src$|path$|filename$|mimetype|mime|^sql$|sql$|query|expression|formula|^code$|createdat|updatedat|deletedat|expiresat|timestamp|.+at$|.+_at$/i,Wt=64;function Gt(e){if(typeof e!=`object`||!e||Array.isArray(e)||e instanceof Date)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function Kt(e,t){if(!Number.isFinite(e))return e;let n=String(e),r=Vt(n,t);if(r===n)return e;let i=Number(r);return Number.isFinite(i)?i:e}function qt(e,t,n,r,i,a){if(n>Wt||e==null)return e;let o=typeof e;if(o===`string`)return Ht(e,t,i);if(o===`number`)return i?Kt(e,t):e;if(o===`boolean`||o===`bigint`||o===`function`||o===`symbol`||e instanceof Date)return e;if(Array.isArray(e)){if(r.has(e))return e;r.add(e);let o=e.map(e=>qt(e,t,n+1,r,i,a));return r.delete(e),o}if(Gt(e)){if(r.has(e))return e;r.add(e);let o={};for(let[s,c]of Object.entries(e)){if(Ut.test(s)){typeof c==`object`&&c&&!(c instanceof Date)?o[s]=qt(c,t,n+1,r,i,a):a&&typeof c==`string`&&c.includes(`@`)?o[s]=Ht(c,t,!1):o[s]=c;continue}o[s]=qt(c,t,n+1,r,i,a)}return r.delete(e),o}return e}function Jt(e,t){return qt(e,t?.salt??``,0,new WeakSet,t?.redactNumbers!==!1,t?.redactProtectedEmails===!0)}var Yt=[`/_agent-native/poll`,`/_agent-native/events`,`/_agent-native/agent`,`/_agent-native/runs`],Xt=/\/api\/session-replay\/recordings\/[^/?#]+\/(?:chunks(?:\/[^/?#]+)?|events)(?:[/?#]|$)/,Zt=/\/api\/session-replay\/agent-events\.json(?:[?#]|$)/;function Qt(e){return Yt.some(t=>e.includes(t))||Xt.test(e)||Zt.test(e)}var $t=!1;function en(e,t){return Promise.race([e,new Promise((e,n)=>setTimeout(()=>n(Error(`redact-timeout`)),t))])}function tn(e){try{return typeof e==`string`?e:e instanceof URL?e.href:e.url??``}catch{return``}}function nn(e,t){return(t?.method??(typeof e!=`string`&&!(e instanceof URL)?e.method:void 0)??`GET`).toUpperCase()}function rn(){if(typeof window>`u`||$t)return;$t=!0;let e=window.fetch.bind(window);window.fetch=async function(t,n){let r=await e(t,n);if(!_t()||nn(t,n)!==`GET`||!r.ok)return r;try{if(Qt(tn(t)))return r;let e=r.headers.get(`content-type`)??``;if(!e.includes(`application/json`)||e.includes(`event-stream`)||e.includes(`ndjson`)||e.includes(`stream`)||r.bodyUsed)return r;let n=Jt(await en(r.clone().json(),3e3),{redactNumbers:!1,redactProtectedEmails:!0}),i=new Headers(r.headers);return i.delete(`content-length`),i.delete(`content-encoding`),new Response(JSON.stringify(n),{status:r.status,statusText:r.statusText,headers:i})}catch{return r}}}var an=`handshake`,on=`token`,sn=`poll-live`,cn=`poll_live`;function ln(e){try{let t=JSON.parse(e);if(t&&typeof t==`object`&&typeof t.protocol==`number`&&Array.isArray(t.capabilities))return{protocol:t.protocol,capabilities:t.capabilities.filter(e=>typeof e==`string`)}}catch{}return null}function un(e){try{let t=JSON.parse(e);if(t&&typeof t==`object`&&typeof t.token==`string`)return{token:t.token,expiresAt:typeof t.expiresAt==`string`?t.expiresAt:void 0}}catch{}return null}var dn=`__agentNativeSurfaceHidden`,fn=`agentnative:surfacevisibilitychange`;function pn(){return typeof window>`u`?!1:window[dn]===!0}function mn(){return pn()?!0:typeof document<`u`&&document.visibilityState===`hidden`}function hn(e){return typeof document>`u`||typeof window>`u`?()=>{}:(document.addEventListener(`visibilitychange`,e),window.addEventListener(fn,e),()=>{document.removeEventListener(`visibilitychange`,e),window.removeEventListener(fn,e)})}var U=e(b(),1),gn=1e4,_n=6e4,vn=6e4,yn=1e4,bn=6e4,xn=1e3,Sn=3e4,Cn=8,wn=5*6e4,Tn=60*6e4,En=300*1e3,Dn=1e3,On=250,kn=`agent-native-sync:`,An=class extends Error{status;constructor(e){super(`HTTP `+e),this.status=e}},jn={version:0,id:``};function Mn(e){return`${e.version}.${e.id}`}function Nn(e){if(typeof e!=`string`)return;let t=e.indexOf(`.`);if(t<1)return;let n=Number(e.slice(0,t)),r=e.slice(t+1);if(!(!Number.isSafeInteger(n)||n<0))return{version:n,id:r}}function Pn(e,t){return e.version===t.version?e.id<t.id?-1:+(e.id>t.id):e.version-t.version}function Fn(e){if(!(typeof e.version!=`number`||!Number.isSafeInteger(e.version)||typeof e.cursorId!=`string`))return{version:e.version,id:e.cursorId}}function W(e,t){return t&&Pn(t,e)>0?t:e}function In(e){let t;for(let n of e){let e=Fn(n)??(typeof n.version==`number`&&Number.isSafeInteger(n.version)&&n.version>=0?{version:n.version,id:``}:void 0);e&&(!t||Pn(e,t)>0)&&(t=e)}return t}function Ln(e,t,n){let r=Fn(e);if(r)return Pn(r,t)>0;let i=typeof e.version==`number`?e.version:0;return i===0||i>n}function Rn(e){return Math.max(gn,e*4)}function zn(){return mn()}function Bn(e){if(e===!1||s())return!1;let t=c(e??`/_agent-native/events`);return`${t}${t.includes(`?`)?`&`:`?`}${cn}=1`}var Vn=`/stream`,Hn=`/poll`,Un=`/_agent-native/realtime-token`,Wn=3;function Gn(){if(!(typeof window>`u`))return window.__AGENT_NATIVE_CONFIG__?.realtime}function Kn(e){if(e===!1||s())return null;let t=Gn();if(t?.transport!==`hosted`)return null;let n=t.gatewayBaseUrl?.replace(/\/+$/,``);return n?{sseUrl:`${n}${Vn}`,pollUrl:`${n}${Hn}`,tokenMintUrl:c(Un)}:null}function qn(e){let t=e*.2*(Math.random()*2-1);return Math.max(0,Math.round(e+t))}function Jn(e){if(!e||typeof e!=`object`)return[];let t=e;return t.type===`batch`&&Array.isArray(t.events)||Array.isArray(t.events)?t.events.filter(e=>!!e&&typeof e==`object`):[e]}function Yn(e){return me(e.state?.error)}var Xn=[`navigate`,`show-questions`,`__set_url__`],Zn=/^[A-Za-z0-9_-]{1,96}$/;function Qn(e){return e.source===`app-state`&&(e.key===`*`||Xn.some(t=>e.key===t||typeof e.key==`string`&&e.key.startsWith(`${t}:`)))}function $n(e,t){if(e.queryKey[0]!==`app-state`)return!1;if(e.queryKey.length===1)return!0;let n=e.queryKey[1];return typeof n==`string`&&t.some(e=>e===`*`||e===n||e.startsWith(`${n}:`)||n.startsWith(`${e}:`))}async function er(e,t,n,r){let i=typeof AbortController>`u`?null:new AbortController,a=i?setTimeout(()=>i.abort(),Rn(n)):null,o=`${e}${e.includes(`?`)?`&`:`?`}${`since=${t.version}`}${t.version>0||t.id?`&cursor=${encodeURIComponent(Mn(t))}`:``}${r?`&token=${encodeURIComponent(r)}`:``}`;try{let e=await fetch(o,i?{signal:i.signal}:void 0);if(!e.ok)throw new An(e.status);return await e.json()}finally{a&&clearTimeout(a)}}var tr=class{pollUrl;sseUrl;gateway;subscribers=new Map;cursorRef={...jn};timer=null;refreshRequested=!1;removeVisibilityListener;stopped=!1;inFlight=!1;eventSource=null;localReconnectTimer=null;localReconnectAttempts=0;localRefusalAttempts=0;localSseOpened=!1;sseConnected=!1;authFailureUntil=0;consecutiveFailures=0;activeChatIds=new Map;mode;token=null;tokenMintInFlight=null;gatewayReconnectTimer=null;capabilities=[];leaderState=`unknown`;releaseLeadership=null;leaderAbort=null;channel=null;constructor(e,t,n=null){this.pollUrl=e,this.sseUrl=t,this.gateway=n,this.mode=n?`hosted`:`local`}getCapabilities(){return this.capabilities}get activeSseUrl(){if(this.mode===`hosted`&&this.gateway){if(!this.token)return this.gateway.sseUrl;let e=`${this.gateway.sseUrl}?token=${encodeURIComponent(this.token)}`;return this.cursorRef.version>0||this.cursorRef.id?`${e}&since=${this.cursorRef.version}&cursor=${encodeURIComponent(Mn(this.cursorRef))}`:e}return this.sseUrl}get activePollUrl(){return this.mode===`hosted`&&this.gateway?this.gateway.pollUrl:this.pollUrl}mintToken(){if(!this.gateway||this.mode!==`hosted`)return Promise.resolve(!1);if(this.tokenMintInFlight)return this.tokenMintInFlight;let e=this.gateway.tokenMintUrl;return this.tokenMintInFlight=(async()=>{let t=typeof AbortController>`u`?null:new AbortController,n=t?setTimeout(()=>t.abort(),gn):null;try{let n=await fetch(e,{credentials:`same-origin`,...t?{signal:t.signal}:{}});if(n.ok){let e=await n.json();return typeof e?.token==`string`&&e.token?(this.token=e.token,!0):(this.revertToLocal(),!1)}return n.status===404||n.status===401||n.status===403?(this.revertToLocal(),!1):(this.onGatewayTransientFailure(),!1)}catch{return this.onGatewayTransientFailure(),!1}finally{n&&clearTimeout(n),this.tokenMintInFlight=null}})(),this.tokenMintInFlight}onGatewayTransientFailure(){this.consecutiveFailures++,this.consecutiveFailures>=Wn&&this.revertToLocal()}revertToLocal(){this.mode!==`local`&&(this.mode=`local`,this.token=null,this.capabilities=[],this.consecutiveFailures=0,this.gatewayReconnectTimer&&=(clearTimeout(this.gatewayReconnectTimer),null),this.closeEvents(),this.stopped||(this.connectEvents(),this.schedulePoll()))}scheduleGatewayReconnect(){this.stopped||this.gatewayReconnectTimer||(this.gatewayReconnectTimer=setTimeout(()=>{this.gatewayReconnectTimer=null,!this.stopped&&!this.eventSource&&this.connectEvents()},qn(1e3)))}add(e,t){let n=this.subscribers.size===0,r=this.isActive;this.subscribers.set(e,t),n?(this.stopped=!1,this.start()):!r&&this.isActive?this.pollNow():this.reschedule(),t.onSseStateChange?.(this.sseConnected,this.capabilities)}remove(e){this.subscribers.delete(e),this.subscribers.size===0?this.teardown():this.reschedule()}shouldStayIdle(){return pn()?!0:this.effectivePauseWhenHidden&&zn()}get effectivePauseWhenHidden(){for(let e of this.subscribers.values())if(!e.pauseWhenHidden)return!1;return!0}get effectiveInterval(){let e=1/0;for(let t of this.subscribers.values())t.interval<e&&(e=t.interval);return isFinite(e)?e:2e3}get effectiveIdleInterval(){let e=1/0;for(let t of this.subscribers.values())t.idleInterval<e&&(e=t.idleInterval);return isFinite(e)?e:vn}get isActive(){let e=Date.now();for(let[t,n]of this.activeChatIds)e-n>En&&this.activeChatIds.delete(t);return this.activeChatIds.size>0}get effectiveFallbackInterval(){let e=1/0;for(let t of this.subscribers.values())t.fallbackInterval<e&&(e=t.fallbackInterval);return isFinite(e)?e:_n}fan(e,t,n=this.cursorRef){for(let r of this.subscribers.values())r.onEvents(e,t,n)}setSseConnected(e){this.sseConnected!==e&&(this.sseConnected=e,this.notifySseState(),this.broadcast({type:`sse-state`,connected:e,capabilities:this.capabilities}))}notifySseState(){for(let e of this.subscribers.values())e.onSseStateChange?.(this.sseConnected,this.capabilities)}authFailureDelayMs(){return Math.max(0,this.authFailureUntil-Date.now())}schedulePoll(){if(this.stopped||this.shouldStayIdle())return;this.timer&&clearTimeout(this.timer);let e=this.authFailureDelayMs();if(e>0){this.timer=setTimeout(()=>{this.timer=null,this.poll()},e);return}let t=this.isActive?this.effectiveInterval:this.sseConnected?this.effectiveFallbackInterval:this.effectiveIdleInterval,n=zn()?Math.max(t,yn):t,r=this.consecutiveFailures>0?Math.min(n*2**Math.min(this.consecutiveFailures,5),3e5):n,i=this.gateway?qn(r):r;this.timer=setTimeout(()=>{this.timer=null,this.poll()},i)}reschedule(){this.timer!==null&&(clearTimeout(this.timer),this.timer=null,this.schedulePoll())}closeEvents(){this.localReconnectTimer&&=(clearTimeout(this.localReconnectTimer),null),this.eventSource&&(this.eventSource.close(),this.eventSource=null,this.setSseConnected(!1))}get leaderKey(){return`${kn}${this.pollUrl}`}electLeader(){if(this.leaderState===`pending`)return;let e=typeof navigator>`u`?void 0:navigator.locks;if(!e||typeof BroadcastChannel>`u`){this.leaderState=`leader`,this.connectEvents();return}this.openChannel(),this.leaderState=`pending`;let t=new AbortController;this.leaderAbort=t,e.request(this.leaderKey,{signal:t.signal},()=>new Promise(e=>{if(this.stopped){e();return}this.releaseLeadership=e,this.leaderState=`leader`,this.connectEvents()})).catch(()=>{this.stopped||t.signal.aborted||(this.leaderState=`leader`,this.connectEvents())})}dropLeadership(){this.leaderAbort?.abort(),this.leaderAbort=null,this.releaseLeadership?.(),this.releaseLeadership=null,this.leaderState=`unknown`}openChannel(){if(this.channel||typeof BroadcastChannel>`u`)return;let e=new BroadcastChannel(this.leaderKey);e.onmessage=e=>{let t=e.data;if(!this.stopped){if(t?.type===`sse-state-request`){this.leaderState===`leader`&&this.broadcast({type:`sse-state`,connected:this.sseConnected,capabilities:this.capabilities});return}if(this.leaderState!==`leader`){if(t?.type===`events`)this.applyVersion(t.events,t.cursor?void 0:t.version),this.cursorRef=W(this.cursorRef,t.cursor),this.fan(t.events,t.version,this.cursorRef);else if(t?.type===`sse-state`){let e=t.capabilities.length!==this.capabilities.length||t.capabilities.some((e,t)=>e!==this.capabilities[t]);this.capabilities=t.capabilities;let n=this.sseConnected;this.setSseConnected(t.connected),e&&this.sseConnected===n&&this.notifySseState(),this.reschedule()}}}},this.channel=e,e.postMessage({type:`sse-state-request`})}broadcast(e){if(this.leaderState===`leader`)try{this.channel?.postMessage(e)}catch{}}closeChannel(){this.channel?.close(),this.channel=null}scheduleLocalReconnect(){if(this.stopped||this.localReconnectTimer)return;let e=Math.min(xn*2**this.localReconnectAttempts,Sn);this.localReconnectAttempts+=1,this.localReconnectTimer=setTimeout(()=>{this.localReconnectTimer=null,this.connectEvents()},e)}scheduleLocalRefusalRetry(){if(this.stopped||this.localReconnectTimer)return;let e=this.localRefusalAttempts++,t=e<Cn?Math.min(xn*2**e,Sn):Math.min(wn*2**(e-Cn),Tn);this.localReconnectTimer=setTimeout(()=>{this.localReconnectTimer=null,this.connectEvents()},t)}connectEvents(){if(this.stopped||this.eventSource||this.localReconnectTimer&&!this.localSseOpened||typeof EventSource>`u`||this.shouldStayIdle())return;if(this.leaderState!==`leader`){this.electLeader();return}if(this.mode===`hosted`&&this.gateway&&!this.token){this.mintToken().then(e=>{this.stopped||(e&&!this.eventSource?this.connectEvents():!e&&this.mode===`hosted`&&this.scheduleGatewayReconnect())});return}let e=this.activeSseUrl;if(!e)return;let t=new EventSource(e);this.eventSource=t,t.onopen=()=>{this.mode===`local`&&(this.localSseOpened=!0,this.localRefusalAttempts=0,this.capabilities.includes(`poll-live`)&&(this.capabilities=this.capabilities.filter(e=>e!==sn)));let e=this.sseConnected;this.localReconnectAttempts=0,this.setSseConnected(!0),e&&this.notifySseState(),this.mode===`hosted`&&(this.consecutiveFailures=0),this.schedulePoll()},t.onerror=()=>{if(this.eventSource===t){if(this.setSseConnected(!1),this.mode===`hosted`&&this.gateway){t.readyState===EventSource.CLOSED&&(this.token=null),this.closeEvents(),this.onGatewayTransientFailure(),this.mode===`hosted`&&this.scheduleGatewayReconnect();return}t.readyState===EventSource.CLOSED&&(t.close(),this.eventSource=null,this.localSseOpened?this.scheduleLocalReconnect():(this.capabilities.includes(`poll-live`)||(this.capabilities=[...this.capabilities,sn],this.notifySseState(),this.broadcast({type:`sse-state`,connected:this.sseConnected,capabilities:this.capabilities})),this.scheduleLocalRefusalRetry())),this.schedulePoll()}},t.onmessage=e=>{try{let t=JSON.parse(e.data),n=Jn(t),r=typeof t?.version==`number`?t.version:void 0;this.applyVersion(n,r),this.fan(n,r,this.cursorRef);let i=In(n);this.broadcast({type:`events`,events:n,version:r,cursor:i})}catch{}},this.mode===`hosted`&&this.gateway&&(t.addEventListener(an,e=>{let t=ln(e.data);if(t){if(t.protocol!==1){console.warn(`[agent-native] unsupported realtime protocol ${t.protocol} (expected 1)`);return}this.capabilities=t.capabilities,this.notifySseState()}}),t.addEventListener(on,e=>{let t=un(e.data);t?.token&&(this.token=t.token,this.closeEvents(),this.scheduleGatewayReconnect())}))}applyVersion(e,t){typeof t==`number`&&t>this.cursorRef.version&&(this.cursorRef={version:t,id:``});for(let t of e)this.cursorRef=W(this.cursorRef,Fn(t))}async poll(e=!1){if(!(this.stopped||this.inFlight)&&!(!e&&this.shouldStayIdle())){this.inFlight=!0;try{if(this.mode===`hosted`&&this.gateway&&!this.token&&(!await this.mintToken()||this.stopped))return;let e=await er(this.activePollUrl,this.cursorRef,this.effectiveInterval,this.mode===`hosted`?this.token??void 0:void 0);if(this.stopped)return;this.consecutiveFailures=0,this.authFailureUntil>0&&(this.authFailureUntil=0,this.connectEvents());let t=e.events??[],n=Nn(e.cursor);this.applyVersion(t,n?void 0:e.version),this.cursorRef=W(this.cursorRef,n),this.fan(t,e.version,this.cursorRef)}catch(e){if(this.stopped)return;this.consecutiveFailures++,this.mode===`hosted`&&this.gateway?(me(e)&&(this.token=null,this.mintToken()),this.consecutiveFailures>=Wn&&this.revertToLocal()):me(e)&&(this.authFailureUntil=Date.now()+bn,this.closeEvents())}finally{this.inFlight=!1,this.refreshRequested&&!this.stopped?(this.refreshRequested=!1,this.poll(!0)):this.schedulePoll()}}}pollNow(){if(!this.shouldStayIdle()){if(this.authFailureDelayMs()>0){this.schedulePoll();return}this.timer&&=(clearTimeout(this.timer),null),this.connectEvents(),this.poll()}}handleVisibilityChange=()=>{mn()?this.shouldStayIdle()?(this.closeEvents(),this.dropLeadership(),this.timer&&=(clearTimeout(this.timer),null)):this.reschedule():(this.connectEvents(),this.pollNow())};handleFocus=()=>{this.pollNow()};handleRefreshData=()=>{if(this.inFlight){this.refreshRequested=!0;return}this.poll(!0)};handleChatRunning=e=>{let t=e.detail,n=typeof t?.isRunning==`boolean`?t.isRunning:typeof t?.running==`boolean`?t.running:null;if(n===null)return;let r=typeof t?.tabId==`string`&&t.tabId?t.tabId:`__default__`,i=this.isActive;if(n)for(this.activeChatIds.delete(r),this.activeChatIds.set(r,Date.now());this.activeChatIds.size>Dn;){let e=this.activeChatIds.keys().next().value;if(typeof e!=`string`)break;this.activeChatIds.delete(e)}else this.activeChatIds.delete(r);i!==this.isActive&&(this.isActive?this.pollNow():this.reschedule())};start(){o(),rn(),this.shouldStayIdle()||(this.connectEvents(),this.poll()),window.addEventListener(`focus`,this.handleFocus),window.addEventListener(`agentNative:refresh-data`,this.handleRefreshData),window.addEventListener(`agentNative.chatRunning`,this.handleChatRunning),this.removeVisibilityListener=hn(this.handleVisibilityChange)}teardown(){this.stopped=!0,this.activeChatIds.clear(),this.closeEvents(),this.dropLeadership(),this.closeChannel(),this.timer&&=(clearTimeout(this.timer),null),this.gatewayReconnectTimer&&=(clearTimeout(this.gatewayReconnectTimer),null),this.localReconnectTimer&&=(clearTimeout(this.localReconnectTimer),null),window.removeEventListener(`focus`,this.handleFocus),window.removeEventListener(`agentNative:refresh-data`,this.handleRefreshData),window.removeEventListener(`agentNative.chatRunning`,this.handleChatRunning),this.removeVisibilityListener?.(),this.removeVisibilityListener=void 0}},nr=new Map;function rr(e,t,n=null){let r=`${e}\0${String(t)}`,i=nr.get(r);return i||(i=new tr(e,t,n),nr.set(r,i)),i}function ir(e,t){let n=`${e}\0${String(t)}`;nr.delete(n)}function ar(e={}){let{queryClient:t,pollUrl:n=c(e.eventsUrl??`/_agent-native/poll`),sseUrl:r=Bn(e.sseUrl),interval:i=2e3,fallbackInterval:a=Math.max(e.fallbackInterval??_n,i),pauseWhenHidden:o=!1}=e,s=e.interval===void 0?vn:i,l=(0,U.useRef)(e.onEvent);l.current=e.onEvent;let u=(0,U.useRef)(e.ignoreSource);u.current=e.ignoreSource;let d=(0,U.useRef)(e.actionInvalidatePredicate);d.current=e.actionInvalidatePredicate;let f=(0,U.useRef)(e.suppressActionInvalidationFor);f.current=e.suppressActionInvalidationFor,(0,U.useEffect)(()=>{let e=Symbol(`useDbSync`),c=0,p={...jn},m=[],h=null,g=!1,_=[];function v(){if(h&&=(clearTimeout(h),null),m.length===0)return;let e=m;m=[],S(e)}function y(e){if(m.push(...e),e.some(Qn)){v();return}h||=setTimeout(v,On)}function b(e,t){return e.some(e=>e.source===`app-state`&&(e.key===t||e.key===`*`||typeof e.key==`string`&&e.key.startsWith(`${t}:`)))}function x(e,t){let n=`${t}:`;return Array.from(new Set(e.flatMap(e=>{if(e.source!==`app-state`||typeof e.key!=`string`||!e.key.startsWith(n))return[];let t=e.key.slice(n.length);return Zn.test(t)?[t]:[]})))}function S(e){let n=u.current,r=O(),i=e.filter(e=>!(e.source===`action`&&e.requestSource===r)&&(!n||e.requestSource!==n)),a=new Set(f.current??[]),o=e=>e.source===`action`&&typeof e.key==`string`&&a.has(e.key),s=i.filter(e=>e.source!==`awareness`),c=s.length>0&&s.every(e=>e.source===`action`)&&s.every(o);for(let e of i){let t=typeof e.source==`string`?e.source:``,n=typeof e.version==`number`?e.version:0;t&&n>0&&(ye(t,n),typeof e.key==`string`&&e.key&&ye(`${t}:${e.key}`,n))}let p=i.filter(e=>e.source!==`awareness`);if(p.length>0&&t){let e=(e,t)=>_.some(n=>{if(n.filters?.dedupeKey!==e?.dedupeKey)return!1;if(e?.dedupeKey)return!0;let r=n.filters?.queryKey,i=e?.queryKey;return r||i?!r||!i||r.length!==i.length?!1:r.every((e,t)=>e===i[t]):n.predicateIdentity===t}),n=n=>{let r=n?.predicate,i={...n,predicate:e=>!Yn(e)&&(r?.(e)??!0)},a=(t.isFetching?.(i)??0)>0,o=t.invalidateQueries(i,{cancelRefetch:!1});if(!g&&a&&o instanceof Promise&&!e(i,r)){let e={filters:i,completion:o,predicateIdentity:r};_.push(e),o.then(()=>{let n=_.indexOf(e);n<0||(_.splice(n,1),g||t.invalidateQueries(i))},()=>{let t=_.indexOf(e);t>=0&&_.splice(t,1)})}},r=p.some(e=>e.source===`action`&&!o(e));if(r){let e=d.current,t=e?t=>e(t,p):void 0;n(t?{predicate:t}:{queryKey:[`action`]})}if(!c){if(p.some(e=>e.source!==`app-state`)){let e=p.some(e=>[`extensions`,`extension`,`tool`,`tools`,`slots`].includes(e.source??``));if(!r){let e=d.current,t=e?t=>e(t,p):void 0;n(t?{predicate:t}:{queryKey:[`action`]})}(!r||e)&&(n({queryKey:[`extension`]}),n({queryKey:[`extensions`]}),n({queryKey:[`extension-slots`]}),n({queryKey:[`slot-installs`]}),n({queryKey:[`slot-available`]}),n({queryKey:[`tool`]}),n({queryKey:[`tools`]}))}let e=p.filter(e=>e.source===`app-state`).map(e=>e.key).map(e=>typeof e==`string`&&e?e:`*`);if(e.length>0){let t=Array.from(new Set(e)).sort().map(e=>`${e.length}:${e}`).join(`|`);n(e.some(e=>e===`*`||Qn({source:`app-state`,key:e}))?{queryKey:[`app-state`]}:{dedupeKey:`app-state:${t}`,predicate:t=>$n(t,e)})}if(b(p,`navigate`)){for(let e of x(p,`navigate`))n({queryKey:[`navigate-command`,e]});p.some(e=>e.source===`app-state`&&(e.key===`navigate`||e.key===`*`))&&n({queryKey:[`navigate-command`]})}if(b(p,`show-questions`)&&n({queryKey:[`show-questions`]}),b(p,`__set_url__`)){for(let e of x(p,`__set_url__`))n({queryKey:[`__set_url__`,e]});p.some(e=>e.source===`app-state`&&(e.key===`__set_url__`||e.key===`*`))&&n({queryKey:[`__set_url__`]})}}}for(let t of e)l.current?.(t)}function C(e,t,n){let r=e.filter(e=>Ln(e,p,c));r.length>0&&y(r);let i=r.reduce((e,t)=>Math.max(e,typeof t.version==`number`?t.version:0),0);c=Math.max(c,t??0,i);for(let e of r)p=W(p,Fn(e));n&&(p=W(p,n))}let w=rr(n,r,Kn(r));return w.add(e,{onEvents:C,pauseWhenHidden:o,interval:i,idleInterval:s,fallbackInterval:a}),()=>{g=!0,h&&(clearTimeout(h),v()),_.length=0,w.remove(e),w.subscribers.size||ir(n,r)}},[n,r,t,i,s,a,o])}var or=(e,t,n,r,i,a,o,s)=>{let c=document.documentElement,l=[`light`,`dark`];function u(t){(Array.isArray(e)?e:[e]).forEach(e=>{let n=e===`class`,r=n&&a?i.map(e=>a[e]||e):i;n?(c.classList.remove(...r),c.classList.add(a&&a[t]?a[t]:t)):c.setAttribute(e,t)}),d(t)}function d(e){s&&l.includes(e)&&(c.style.colorScheme=e)}function f(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}if(r)u(r);else try{let e=localStorage.getItem(t)||n;u(o&&e===`system`?f():e)}catch{}},sr=[`light`,`dark`],cr=`(prefers-color-scheme: dark)`,lr=typeof window>`u`,ur=U.createContext(void 0),dr={setTheme:e=>{},themes:[]},fr=()=>U.useContext(ur)??dr,pr=e=>U.useContext(ur)?U.createElement(U.Fragment,null,e.children):U.createElement(hr,{...e}),mr=[`light`,`dark`],hr=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:n=!0,enableColorScheme:r=!0,storageKey:i=`theme`,themes:a=mr,defaultTheme:o=n?`system`:`light`,attribute:s=`data-theme`,value:c,children:l,nonce:u,scriptProps:d})=>{let[f,p]=U.useState(()=>_r(i,o)),[m,h]=U.useState(()=>f===`system`?yr():f),g=c?Object.values(c):a,_=U.useCallback(e=>{let i=e;if(!i)return;e===`system`&&n&&(i=yr());let a=c?c[i]:i,l=t?vr(u):null,d=document.documentElement,f=e=>{e===`class`?(d.classList.remove(...g),a&&d.classList.add(a)):e.startsWith(`data-`)&&(a?d.setAttribute(e,a):d.removeAttribute(e))};if(Array.isArray(s)?s.forEach(f):f(s),r){let e=sr.includes(o)?o:null,t=sr.includes(i)?i:e;d.style.colorScheme=t}l?.()},[u]),v=U.useCallback(e=>{let t=typeof e==`function`?e(f):e;p(t);try{localStorage.setItem(i,t)}catch{}},[f]),y=U.useCallback(t=>{let r=yr(t);h(r),f===`system`&&n&&!e&&_(`system`)},[f,e]);U.useEffect(()=>{let e=window.matchMedia(cr);return e.addListener(y),y(e),()=>e.removeListener(y)},[y]),U.useEffect(()=>{let e=e=>{e.key===i&&(e.newValue?p(e.newValue):v(o))};return window.addEventListener(`storage`,e),()=>window.removeEventListener(`storage`,e)},[v]),U.useEffect(()=>{_(e??f)},[e,f]);let b=U.useMemo(()=>({theme:f,setTheme:v,forcedTheme:e,resolvedTheme:f===`system`?m:f,themes:n?[...a,`system`]:a,systemTheme:n?m:void 0}),[f,v,e,m,n,a]);return U.createElement(ur.Provider,{value:b},U.createElement(gr,{forcedTheme:e,storageKey:i,attribute:s,enableSystem:n,enableColorScheme:r,defaultTheme:o,value:c,themes:a,nonce:u,scriptProps:d}),l)},gr=U.memo(({forcedTheme:e,storageKey:t,attribute:n,enableSystem:r,enableColorScheme:i,defaultTheme:a,value:o,themes:s,nonce:c,scriptProps:l})=>{let u=JSON.stringify([n,t,a,e,s,o,r,i]).slice(1,-1);return U.createElement(`script`,{...l,suppressHydrationWarning:!0,nonce:typeof window>`u`?c:``,dangerouslySetInnerHTML:{__html:`(${or.toString()})(${u})`}})}),_r=(e,t)=>{if(lr)return;let n;try{n=localStorage.getItem(e)||void 0}catch{}return n||t},vr=e=>{let t=document.createElement(`style`);return e&&t.setAttribute(`nonce`,e),t.appendChild(document.createTextNode(`*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`)),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},yr=e=>(e||=window.matchMedia(cr),e.matches?`dark`:`light`),G=se(),br=`group-[.toaster]:!w-[var(--width)] group-[.toaster]:!min-w-[min(20rem,calc(100vw_-_2rem))] group-[.toaster]:!max-w-[var(--width)] group-[.toaster]:!gap-3 group-[.toaster]:!break-normal`,xr=`group-[.toast]:!min-w-[min(16rem,calc(100vw_-_14rem))] group-[.toast]:!flex-1 group-[.toast]:!basis-auto group-[.toast]:break-words`,Sr=`group-[.toast]:!shrink-0 group-[.toast]:!whitespace-nowrap`,Cr=({className:e,toastOptions:t,...n})=>{let{theme:r=`system`}=fr(),i=t?.classNames;return(0,G.jsx)(Fe,{theme:r,className:N(`toaster group [--width:min(36rem,calc(100vw_-_2rem))]`,e),toastOptions:{...t,classNames:{...i,toast:N(br,`group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg`,i?.toast),title:N(`group-[.toast]:break-words`,i?.title),description:N(`group-[.toast]:break-words group-[.toast]:text-muted-foreground`,i?.description),content:N(xr,i?.content),actionButton:N(Sr,`group-[.toast]:bg-primary group-[.toast]:text-primary-foreground`,i?.actionButton),cancelButton:N(Sr,`group-[.toast]:bg-muted group-[.toast]:text-muted-foreground`,i?.cancelButton)}},...n})},wr=/^[[{]/;function K(e){if(typeof e!=`string`)return!1;let t=e.trim();if(!t)return!1;if(!wr.test(t))return!0;try{let e=JSON.parse(t);return typeof e!=`object`||!e}catch{return!0}}function Tr(e,t){return K(e)?e.trim():K(t)?t.trim():`Agent-Native`}function q(e){return JSON.stringify(e).replace(/[<>&\u2028\u2029]/g,e=>{switch(e){case`<`:return`\\u003c`;case`>`:return`\\u003e`;case`&`:return`\\u0026`;case`\u2028`:return`\\u2028`;case`\u2029`:return`\\u2029`;default:return e}})}function Er(e=`/_agent-native/auth/session`,t=`/_agent-native`){return`(function __anEarlyBetaRedirect() {
  if (window.__agentNativeBetaRedirectStarted) return;
  window.__agentNativeBetaRedirectStarted = true;
  if (window.parent !== window) return;

  var betaHosts = ${JSON.stringify(Oe)};
  var hostname = (window.location.hostname || '').toLowerCase().replace(/\\.$/, '');
  var productionHost = hostname.indexOf('beta.') === 0 ? hostname.slice(5) : hostname;
  var betaHost = betaHosts[productionHost];
  if (typeof betaHost !== 'string') return;

  var currentUrl;
  try {
    currentUrl = new URL(window.location.href);
  } catch (error) {
    void error;
    return;
  }

  function sessionProbePathFor(url) {
    var probePath = ${q(e)};
    var appConfig = window.__AGENT_NATIVE_CONFIG__;
    if (!appConfig || appConfig.workspaceRuntime !== true) return probePath;

    var frameworkSessionPath = ${q(`${t}/auth/session`)};
    var frameworkSegment = ${q(t.slice(1))};
    var knownWorkspaceMounts = Array.isArray(appConfig.workspaceAppMountPaths)
      ? appConfig.workspaceAppMountPaths
      : null;
    var workspaceMount = '';
    if (knownWorkspaceMounts) {
      var mountSegment = url.pathname.split('/').find(function (segment) {
        return segment;
      });
      var candidateWorkspaceMount = mountSegment &&
        mountSegment !== '_agent-native' &&
        mountSegment !== frameworkSegment &&
        mountSegment !== 'api' &&
        mountSegment !== 'sign-in' &&
        mountSegment !== 'login' &&
        mountSegment !== 'signup'
        ? '/' + mountSegment
        : '';
      if (knownWorkspaceMounts.indexOf(candidateWorkspaceMount) !== -1) {
        workspaceMount = candidateWorkspaceMount;
      }
    }
    if (
      workspaceMount &&
      typeof probePath === 'string' &&
      probePath.endsWith(frameworkSessionPath)
    ) {
      var configuredWorkspaceMount = probePath.slice(
        0,
        -frameworkSessionPath.length,
      );
      if (configuredWorkspaceMount !== workspaceMount) {
        probePath = workspaceMount + frameworkSessionPath;
      }
    }
    return probePath;
  }

  function returnFromAutomaticBetaRedirect() {
    if (/AgentNativeDesktop/i.test((window.navigator && window.navigator.userAgent) || '')) return;

    var returnTo;
    var alreadyReturned;
    try {
      // The guard holds the deadline of the opt-out this tab last handed
      // production, so it lapses exactly when that opt-out does. A permanent
      // flag would block the legitimate second return in a tab left open
      // longer than the opt-out, stranding the visitor on beta all over again.
      var returnedUntil = Number(window.sessionStorage.getItem(${JSON.stringify(ke)}));
      alreadyReturned = Number.isFinite(returnedUntil) && returnedUntil > Date.now();
      if (currentUrl.searchParams.get(${JSON.stringify(xe)}) !== null) {
        currentUrl.searchParams.delete(${JSON.stringify(xe)});
        // The client session gate replaces this URL with beta's sign-in page
        // before the probe below resolves, so the production page the visitor
        // was actually taken from has to be captured now or it is lost.
        if (!alreadyReturned) {
          window.sessionStorage.setItem(
            ${JSON.stringify(je)},
            currentUrl.pathname + currentUrl.search + currentUrl.hash,
          );
        }
        try {
          window.history.replaceState(null, '', currentUrl.toString());
        } catch (error) {
          void error;
        }
      }
      returnTo = window.sessionStorage.getItem(${JSON.stringify(je)});
    } catch (error) {
      // Without session storage the single return cannot be bounded, and an
      // unbounded return is a redirect loop between the two lanes. Staying on
      // beta is the pre-existing behaviour, so this is the safe failure.
      void error;
      return;
    }

    if (alreadyReturned || typeof returnTo !== 'string' || !returnTo) return;
    if (typeof window.fetch !== 'function') return;

    window.fetch(sessionProbePathFor(currentUrl), {
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (!response) return undefined;
      if (response.status === 401 || response.status === 403) return null;
      if (!response.ok) return undefined;
      return response.json();
    }).then(function (session) {
      // Unreadable is not signed out. Bouncing on a transient failure would
      // throw away a beta session that is actually fine.
      if (session === undefined) return;
      var authenticated = false;
      if (session !== null) {
        var sessionError = session && typeof session.error === 'string'
          ? session.error.trim()
          : '';
        if (sessionError && sessionError !== 'Not authenticated') return;
        if (!sessionError) {
          authenticated = !!(session && typeof session.email === 'string' && session.email.trim());
        }
      }

      if (authenticated) {
        // The lane redirect worked: this visitor has a beta session and stays.
        try {
          window.sessionStorage.removeItem(${JSON.stringify(je)});
        } catch (error) {
          void error;
        }
        return;
      }

      // One deadline for both: the opt-out production is asked to honour, and
      // the guard that stops this tab returning again while it should hold.
      var optOutUntil = Date.now() + ${Se};
      try {
        window.sessionStorage.setItem(
          ${JSON.stringify(ke)},
          String(optOutUntil),
        );
        window.sessionStorage.removeItem(${JSON.stringify(je)});
      } catch (error) {
        void error;
        return;
      }

      var latestHostname = (window.location.hostname || '').toLowerCase().replace(/\\.$/, '');
      if (latestHostname !== hostname) return;

      var target;
      try {
        // Build from the production origin and copy only the path parts. A
        // stored value like "//evil.com" parses as protocol-relative, so it
        // must never be allowed to supply the host, port, or credentials.
        var storedTarget = new URL(returnTo, 'https://' + productionHost);
        target = new URL('https://' + productionHost);
        target.pathname = storedTarget.pathname;
        target.search = storedTarget.search;
        target.hash = storedTarget.hash;
        // The opt-out is what stops production redirecting straight back here.
        target.searchParams.set(
          ${JSON.stringify(k)},
          String(optOutUntil),
        );
      } catch (error) {
        void error;
        return;
      }

      try {
        window.location.replace(target.toString());
      } catch (error) {
        void error;
      }
    }).catch(function (error) {
      void error;
    });
  }

  // On beta: undo an automatic lane redirect that landed on a host where the
  // visitor has no session. Sessions are per-host, so the redirect that sent
  // someone here right after they signed in on production cannot carry their
  // session with it, and beta's sign-in page is a dead end they never asked
  // for. A deliberate switch to beta carries no marker and is left alone.
  if (betaHost === hostname) {
    returnFromAutomaticBetaRedirect();
    return;
  }

  if (currentUrl.searchParams.get(${JSON.stringify(Ae)}) === 'true') {
    try {
      window.sessionStorage.setItem(${JSON.stringify(De)}, '1');
    } catch (error) {
      void error;
    }
    return;
  }

  try {
    if (window.sessionStorage.getItem(${JSON.stringify(De)}) === '1') return;
  } catch (error) {
    void error;
  }

  if (/AgentNativeDesktop/i.test((window.navigator && window.navigator.userAgent) || '')) return;

  var optOutValue = currentUrl.searchParams.get(${JSON.stringify(k)});
  if (optOutValue !== null) {
    var optOutExpiry = Number(optOutValue);
    if (Number.isFinite(optOutExpiry) && optOutExpiry > Date.now()) {
      try {
        window.localStorage.setItem(
          ${JSON.stringify(j)},
          String(optOutExpiry),
        );
        window.localStorage.removeItem(${JSON.stringify(A)});
      } catch (error) {
        void error;
        return;
      }
      currentUrl.searchParams.delete(${JSON.stringify(k)});
      try {
        window.history.replaceState(null, '', currentUrl.toString());
      } catch (error) {
        void error;
      }
      return;
    }

    currentUrl.searchParams.delete(${JSON.stringify(k)});
    try {
      window.history.replaceState(null, '', currentUrl.toString());
    } catch (error) {
      void error;
    }
  }

  var storedOptOut;
  var storedRedirect;
  try {
    storedOptOut = window.localStorage.getItem(${JSON.stringify(j)});
    if (storedOptOut !== null) {
      var storedOptOutExpiry = Number(storedOptOut);
      if (Number.isFinite(storedOptOutExpiry) && storedOptOutExpiry > Date.now()) return;
      window.localStorage.removeItem(${JSON.stringify(j)});
    }
    storedRedirect = window.localStorage.getItem(${JSON.stringify(A)});
  } catch (error) {
    void error;
    return;
  }

  var redirectExpiry = Number(storedRedirect);
  function clearRedirectMarker() {
    try {
      window.localStorage.removeItem(${JSON.stringify(A)});
    } catch (error) {
      void error;
    }
  }

  function isSignOutStarted() {
    if (window.__agentNativeBetaRedirectSignOutStarted === true) return true;
    try {
      return window.sessionStorage.getItem(${JSON.stringify(we)}) === '1';
    } catch (error) {
      void error;
      return false;
    }
  }

  if (!Number.isFinite(redirectExpiry) || redirectExpiry <= Date.now()) {
    if (storedRedirect !== null) clearRedirectMarker();
    return;
  }

  if (isSignOutStarted()) return;

  if (typeof window.fetch !== 'function') return;

  window.fetch(sessionProbePathFor(currentUrl), {
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Accept': 'application/json' }
  }).then(function (response) {
    if (!response || !response.ok) {
      if (response && (response.status === 401 || response.status === 403)) {
        clearRedirectMarker();
        return null;
      }
      return undefined;
    }
    return response.json();
  }).then(function (session) {
    if (session === undefined) return;
    var sessionError = session && typeof session.error === 'string'
      ? session.error.trim()
      : '';
    if (sessionError && sessionError !== 'Not authenticated') return;
    if (sessionError === 'Not authenticated') {
      clearRedirectMarker();
      return;
    }
    var email = session && typeof session.email === 'string'
      ? session.email.trim().toLowerCase()
      : '';
    if (!email) return;
    if (!email.endsWith('@builder.io')) {
      clearRedirectMarker();
      return;
    }

    if (isSignOutStarted()) return;

    var latestUrl;
    try {
      latestUrl = new URL(window.location.href);
    } catch (error) {
      void error;
      return;
    }
    var latestHostname = (latestUrl.hostname || '').toLowerCase().replace(/\\.$/, '');
    var latestProductionHost = latestHostname.indexOf('beta.') === 0
      ? latestHostname.slice(5)
      : latestHostname;
    if (latestHostname !== hostname || betaHosts[latestProductionHost] !== betaHost) return;
    if (latestUrl.searchParams.get(${JSON.stringify(Ae)}) === 'true') return;
    var latestOptOut = latestUrl.searchParams.get(${JSON.stringify(k)});
    if (latestOptOut !== null && Number(latestOptOut) > Date.now()) return;

    var latestRedirect;
    try {
      latestRedirect = window.localStorage.getItem(${JSON.stringify(A)});
    } catch (error) {
      void error;
      return;
    }
    if (!Number.isFinite(Number(latestRedirect)) || Number(latestRedirect) <= Date.now()) return;

    latestUrl.protocol = 'https:';
    latestUrl.hostname = betaHost;
    latestUrl.port = '';
    latestUrl.searchParams.delete(${JSON.stringify(k)});
    latestUrl.searchParams.set(${JSON.stringify(xe)}, '1');
    try {
      window.location.replace(latestUrl.toString());
    } catch (error) {
      void error;
    }
  }).catch(function (error) {
    void error;
    // A transient session failure must leave production usable; retry the hint
    // on a later navigation instead of redirecting without a current session.
  });
})();`}var Dr=15e3;function Or(e,t){return`(function __anEarlySessionBootstrap() {
  if (window.__agentNativeSessionBootstrap) return;
  var sessionHintCookieName = ${q(t??``)};
  var hasSessionHint = document.cookie.split(";").some(function (cookie) {
    var entry = cookie.trim();
    var separator = entry.indexOf("=");
    if (separator < 1 || entry.slice(separator + 1) !== "1") return false;
    var name = entry.slice(0, separator);
    return sessionHintCookieName
      ? name === sessionHintCookieName
      : name === "an_session_hint" ||
          (name.indexOf("an_session_") === 0 && name.endsWith("_hint"));
  });
  if (!hasSessionHint) return;
  var controller = typeof AbortController === "function"
    ? new AbortController()
    : null;
  var timeoutId = setTimeout(function () {
    if (controller) controller.abort();
  }, ${Dr});
  var requestInit = {
    credentials: "same-origin",
    cache: "no-store",
    headers: { Accept: "application/json" }
  };
  if (controller) requestInit.signal = controller.signal;
  window.__agentNativeSessionBootstrap = fetch(${q(e)}, requestInit).then(function (response) {
    if (!response.ok) return { state: "unavailable", status: response.status };
    return response.json().then(function (value) {
      return { state: "available", value: value };
    }, function () {
      return { state: "unavailable", status: response.status };
    });
  }).catch(function () {
    return { state: "unavailable" };
  }).finally(function () {
    clearTimeout(timeoutId);
  });
})();`}var kr=typeof window>`u`?U.useEffect:U.useLayoutEffect;function Ar({children:e,fallback:t}){let[n,r]=(0,U.useState)(!1);return kr(()=>r(!0),[]),n?e:t??null}var jr=({children:e})=>(0,G.jsx)(G.Fragment,{children:e});function Mr(e,t){return U.useReducer((e,n)=>t[e][n]??e,e)}var Nr=`ScrollArea`,[Pr,Fr]=Le(Nr),[Ir,J]=Pr(Nr),Lr=U.forwardRef((e,t)=>{let{__scopeScrollArea:n,type:r=`hover`,dir:i,scrollHideDelay:a=600,...o}=e,[s,c]=U.useState(null),[l,u]=U.useState(null),[d,f]=U.useState(null),[p,m]=U.useState(null),[h,g]=U.useState(null),[_,v]=U.useState(0),[y,b]=U.useState(0),[x,S]=U.useState(!1),[C,w]=U.useState(!1),ee=M(t,c),te=Ve(i);return(0,G.jsx)(Ir,{scope:n,type:r,dir:te,scrollHideDelay:a,scrollArea:s,viewport:l,onViewportChange:u,content:d,onContentChange:f,scrollbarX:p,onScrollbarXChange:m,scrollbarXEnabled:x,onScrollbarXEnabledChange:S,scrollbarY:h,onScrollbarYChange:g,scrollbarYEnabled:C,onScrollbarYEnabledChange:w,onCornerWidthChange:v,onCornerHeightChange:b,children:(0,G.jsx)(I.div,{dir:te,...o,ref:ee,style:{position:`relative`,"--radix-scroll-area-corner-width":_+`px`,"--radix-scroll-area-corner-height":y+`px`,...e.style}})})});Lr.displayName=Nr;var Rr=`ScrollAreaViewport`,zr=U.forwardRef((e,t)=>{let{__scopeScrollArea:n,children:r,nonce:i,...a}=e,o=J(Rr,n),s=M(t,U.useRef(null),o.onViewportChange);return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(Br,{nonce:i}),(0,G.jsx)(I.div,{"data-radix-scroll-area-viewport":``,...a,ref:s,style:{overflowX:o.scrollbarXEnabled?`scroll`:`hidden`,overflowY:o.scrollbarYEnabled?`scroll`:`hidden`,...e.style},children:(0,G.jsx)(`div`,{ref:o.onContentChange,style:{minWidth:`100%`,display:`table`},children:r})})]})});zr.displayName=Rr;var Br=U.memo(({nonce:e})=>(0,G.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`},nonce:e}),(e,t)=>e.nonce===t.nonce),Y=`ScrollAreaScrollbar`,Vr=U.forwardRef((e,t)=>{let{forceMount:n,...r}=e,i=J(Y,e.__scopeScrollArea),{onScrollbarXEnabledChange:a,onScrollbarYEnabledChange:o}=i,s=e.orientation===`horizontal`;return U.useEffect(()=>(s?a(!0):o(!0),()=>{s?a(!1):o(!1)}),[s,a,o]),i.type===`hover`?(0,G.jsx)(Hr,{...r,ref:t,forceMount:n}):i.type===`scroll`?(0,G.jsx)(Ur,{...r,ref:t,forceMount:n}):i.type===`auto`?(0,G.jsx)(Wr,{...r,ref:t,forceMount:n}):i.type===`always`?(0,G.jsx)(Gr,{...r,ref:t,"data-state":`visible`}):null});Vr.displayName=Y;var Hr=U.forwardRef((e,t)=>{let{forceMount:n,...r}=e,i=J(Y,e.__scopeScrollArea),[a,o]=U.useState(!1);return U.useEffect(()=>{let e=i.scrollArea,t=0;if(e){let n=()=>{window.clearTimeout(t),o(!0)},r=()=>{t=window.setTimeout(()=>o(!1),i.scrollHideDelay)};return e.addEventListener(`pointerenter`,n),e.addEventListener(`pointerleave`,r),()=>{window.clearTimeout(t),e.removeEventListener(`pointerenter`,n),e.removeEventListener(`pointerleave`,r)}}},[i.scrollArea,i.scrollHideDelay]),(0,G.jsx)(Re,{present:n||a,children:(0,G.jsx)(Wr,{"data-state":a?`visible`:`hidden`,...r,ref:t})})}),Ur=U.forwardRef((e,t)=>{let{forceMount:n,...r}=e,i=J(Y,e.__scopeScrollArea),a=e.orientation===`horizontal`,o=di(()=>c(`SCROLL_END`),100),[s,c]=Mr(`hidden`,{hidden:{SCROLL:`scrolling`},scrolling:{SCROLL_END:`idle`,POINTER_ENTER:`interacting`},interacting:{SCROLL:`interacting`,POINTER_LEAVE:`idle`},idle:{HIDE:`hidden`,SCROLL:`scrolling`,POINTER_ENTER:`interacting`}});return U.useEffect(()=>{if(s===`idle`){let e=window.setTimeout(()=>c(`HIDE`),i.scrollHideDelay);return()=>window.clearTimeout(e)}},[s,i.scrollHideDelay,c]),U.useEffect(()=>{let e=i.viewport,t=a?`scrollLeft`:`scrollTop`;if(e){let n=e[t],r=()=>{let r=e[t];n!==r&&(c(`SCROLL`),o()),n=r};return e.addEventListener(`scroll`,r),()=>e.removeEventListener(`scroll`,r)}},[i.viewport,a,c,o]),(0,G.jsx)(Re,{present:n||s!==`hidden`,children:(0,G.jsx)(Gr,{"data-state":s===`hidden`?`hidden`:`visible`,...r,ref:t,onPointerEnter:F(e.onPointerEnter,()=>c(`POINTER_ENTER`)),onPointerLeave:F(e.onPointerLeave,()=>c(`POINTER_LEAVE`))})})}),Wr=U.forwardRef((e,t)=>{let n=J(Y,e.__scopeScrollArea),{forceMount:r,...i}=e,[a,o]=U.useState(!1),s=e.orientation===`horizontal`,c=di(()=>{if(n.viewport){let e=n.viewport.offsetWidth<n.viewport.scrollWidth,t=n.viewport.offsetHeight<n.viewport.scrollHeight;o(s?e:t)}},10);return X(n.viewport,c),X(n.content,c),(0,G.jsx)(Re,{present:r||a,children:(0,G.jsx)(Gr,{"data-state":a?`visible`:`hidden`,...i,ref:t})})}),Gr=U.forwardRef((e,t)=>{let{orientation:n=`vertical`,...r}=e,i=J(Y,e.__scopeScrollArea),a=U.useRef(null),o=U.useRef(0),[s,c]=U.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),l=ii(s.viewport,s.content),u={...r,sizes:s,onSizesChange:c,hasThumb:l>0&&l<1,onThumbChange:e=>a.current=e,onThumbPointerUp:()=>o.current=0,onThumbPointerDown:e=>o.current=e};function d(e,t){return oi(e,o.current,s,t)}return n===`horizontal`?(0,G.jsx)(Kr,{...u,ref:t,onThumbPositionChange:()=>{if(i.viewport&&a.current){let e=i.viewport.scrollLeft,t=si(e,s,i.dir);a.current.style.transform=`translate3d(${t}px, 0, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollLeft=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollLeft=d(e,i.dir))}}):n===`vertical`?(0,G.jsx)(qr,{...u,ref:t,onThumbPositionChange:()=>{if(i.viewport&&a.current){let e=i.viewport.scrollTop,t=si(e,s);a.current.style.transform=`translate3d(0, ${t}px, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollTop=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollTop=d(e))}}):null}),Kr=U.forwardRef((e,t)=>{let{sizes:n,onSizesChange:r,...i}=e,a=J(Y,e.__scopeScrollArea),[o,s]=U.useState(),c=U.useRef(null),l=M(t,c,a.onScrollbarXChange);return U.useEffect(()=>{c.current&&s(getComputedStyle(c.current))},[c]),(0,G.jsx)(Xr,{"data-orientation":`horizontal`,...i,ref:l,sizes:n,style:{bottom:0,left:a.dir===`rtl`?`var(--radix-scroll-area-corner-width)`:0,right:a.dir===`ltr`?`var(--radix-scroll-area-corner-width)`:0,"--radix-scroll-area-thumb-width":ai(n)+`px`,...e.style},onThumbPointerDown:t=>e.onThumbPointerDown(t.x),onDragScroll:t=>e.onDragScroll(t.x),onWheelScroll:(t,n)=>{if(a.viewport){let r=a.viewport.scrollLeft+t.deltaX;e.onWheelScroll(r),li(r,n)&&t.preventDefault()}},onResize:()=>{c.current&&a.viewport&&o&&r({content:a.viewport.scrollWidth,viewport:a.viewport.offsetWidth,scrollbar:{size:c.current.clientWidth,paddingStart:ri(o.paddingLeft),paddingEnd:ri(o.paddingRight)}})}})}),qr=U.forwardRef((e,t)=>{let{sizes:n,onSizesChange:r,...i}=e,a=J(Y,e.__scopeScrollArea),[o,s]=U.useState(),c=U.useRef(null),l=M(t,c,a.onScrollbarYChange);return U.useEffect(()=>{c.current&&s(getComputedStyle(c.current))},[c]),(0,G.jsx)(Xr,{"data-orientation":`vertical`,...i,ref:l,sizes:n,style:{top:0,right:a.dir===`ltr`?0:void 0,left:a.dir===`rtl`?0:void 0,bottom:`var(--radix-scroll-area-corner-height)`,"--radix-scroll-area-thumb-height":ai(n)+`px`,...e.style},onThumbPointerDown:t=>e.onThumbPointerDown(t.y),onDragScroll:t=>e.onDragScroll(t.y),onWheelScroll:(t,n)=>{if(a.viewport){let r=a.viewport.scrollTop+t.deltaY;e.onWheelScroll(r),li(r,n)&&t.preventDefault()}},onResize:()=>{c.current&&a.viewport&&o&&r({content:a.viewport.scrollHeight,viewport:a.viewport.offsetHeight,scrollbar:{size:c.current.clientHeight,paddingStart:ri(o.paddingTop),paddingEnd:ri(o.paddingBottom)}})}})}),[Jr,Yr]=Pr(Y),Xr=U.forwardRef((e,t)=>{let{__scopeScrollArea:n,sizes:r,hasThumb:i,onThumbChange:a,onThumbPointerUp:o,onThumbPointerDown:s,onThumbPositionChange:c,onDragScroll:l,onWheelScroll:u,onResize:d,...f}=e,p=J(Y,n),[m,h]=U.useState(null),g=M(t,h),_=U.useRef(null),v=U.useRef(``),y=p.viewport,b=r.content-r.viewport,x=P(u),S=P(c),C=di(d,10);function w(e){if(_.current){let t=e.clientX-_.current.left,n=e.clientY-_.current.top;l({x:t,y:n})}}return U.useEffect(()=>{let e=e=>{let t=e.target;m?.contains(t)&&x(e,b)};return document.addEventListener(`wheel`,e,{passive:!1}),()=>document.removeEventListener(`wheel`,e,{passive:!1})},[y,m,b,x]),U.useEffect(S,[r,S]),X(m,C),X(p.content,C),(0,G.jsx)(Jr,{scope:n,scrollbar:m,hasThumb:i,onThumbChange:P(a),onThumbPointerUp:P(o),onThumbPositionChange:S,onThumbPointerDown:P(s),children:(0,G.jsx)(I.div,{...f,ref:g,style:{position:`absolute`,...f.style},onPointerDown:F(e.onPointerDown,e=>{e.button===0&&(e.target.setPointerCapture(e.pointerId),_.current=m.getBoundingClientRect(),v.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect=`none`,p.viewport&&(p.viewport.style.scrollBehavior=`auto`),w(e))}),onPointerMove:F(e.onPointerMove,w),onPointerUp:F(e.onPointerUp,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId),document.body.style.webkitUserSelect=v.current,p.viewport&&(p.viewport.style.scrollBehavior=``),_.current=null})})})}),Zr=`ScrollAreaThumb`,Qr=U.forwardRef((e,t)=>{let{forceMount:n,...r}=e,i=Yr(Zr,e.__scopeScrollArea);return(0,G.jsx)(Re,{present:n||i.hasThumb,children:(0,G.jsx)($r,{ref:t,...r})})}),$r=U.forwardRef((e,t)=>{let{__scopeScrollArea:n,style:r,...i}=e,a=J(Zr,n),o=Yr(Zr,n),{onThumbPositionChange:s}=o,c=M(t,o.onThumbChange),l=U.useRef(void 0),u=di(()=>{l.current&&=(l.current(),void 0)},100);return U.useEffect(()=>{let e=a.viewport;if(e){let t=()=>{if(u(),!l.current){let t=ui(e,s);l.current=t,s()}};return s(),e.addEventListener(`scroll`,t),()=>e.removeEventListener(`scroll`,t)}},[a.viewport,u,s]),(0,G.jsx)(I.div,{"data-state":o.hasThumb?`visible`:`hidden`,...i,ref:c,style:{width:`var(--radix-scroll-area-thumb-width)`,height:`var(--radix-scroll-area-thumb-height)`,...r},onPointerDownCapture:F(e.onPointerDownCapture,e=>{let t=e.target.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;o.onThumbPointerDown({x:n,y:r})}),onPointerUp:F(e.onPointerUp,o.onThumbPointerUp)})});Qr.displayName=Zr;var ei=`ScrollAreaCorner`,ti=U.forwardRef((e,t)=>{let n=J(ei,e.__scopeScrollArea),r=!!(n.scrollbarX&&n.scrollbarY);return n.type!==`scroll`&&r?(0,G.jsx)(ni,{...e,ref:t}):null});ti.displayName=ei;var ni=U.forwardRef((e,t)=>{let{__scopeScrollArea:n,...r}=e,i=J(ei,n),[a,o]=U.useState(0),[s,c]=U.useState(0),l=!!(a&&s),{onCornerWidthChange:u,onCornerHeightChange:d}=i;return X(i.scrollbarX,()=>{let e=i.scrollbarX?.offsetHeight||0;i.onCornerHeightChange(e),c(e)}),X(i.scrollbarY,()=>{let e=i.scrollbarY?.offsetWidth||0;i.onCornerWidthChange(e),o(e)}),U.useEffect(()=>()=>{u(0),d(0)},[u,d]),l?(0,G.jsx)(I.div,{...r,ref:t,style:{width:a,height:s,position:`absolute`,right:i.dir===`ltr`?0:void 0,left:i.dir===`rtl`?0:void 0,bottom:0,...e.style}}):null});function ri(e){return e?parseInt(e,10):0}function ii(e,t){let n=e/t;return isNaN(n)?0:n}function ai(e){let t=ii(e.viewport,e.content),n=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,r=(e.scrollbar.size-n)*t;return Math.max(r,18)}function oi(e,t,n,r=`ltr`){let i=ai(n),a=i/2,o=t||a,s=i-o,c=n.scrollbar.paddingStart+o,l=n.scrollbar.size-n.scrollbar.paddingEnd-s,u=n.content-n.viewport,d=r===`ltr`?[0,u]:[u*-1,0];return ci([c,l],d)(e)}function si(e,t,n=`ltr`){let r=ai(t),i=t.scrollbar.paddingStart+t.scrollbar.paddingEnd,a=t.scrollbar.size-i,o=t.content-t.viewport,s=a-r,c=He(e,n===`ltr`?[0,o]:[o*-1,0]);return ci([0,o],[0,s])(c)}function ci(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];let r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}function li(e,t){return e>0&&e<t}var ui=(e,t=()=>{})=>{let n={left:e.scrollLeft,top:e.scrollTop},r=0;return(function i(){let a={left:e.scrollLeft,top:e.scrollTop},o=n.left!==a.left,s=n.top!==a.top;(o||s)&&t(),n=a,r=window.requestAnimationFrame(i)})(),()=>window.cancelAnimationFrame(r)};function di(e,t){let n=P(e),r=U.useRef(0);return U.useEffect(()=>()=>window.clearTimeout(r.current),[]),U.useCallback(()=>{window.clearTimeout(r.current),r.current=window.setTimeout(n,t)},[n,t])}function X(e,t){let n=P(t);Ie(()=>{let t=0;if(e){let r=new ResizeObserver(()=>{cancelAnimationFrame(t),t=window.requestAnimationFrame(n)});return r.observe(e),()=>{window.cancelAnimationFrame(t),r.unobserve(e)}}},[e,n])}var fi=Lr,pi=zr,mi=ti,hi=Ue(`outline`,`layout-sidebar-left-collapse`,`LayoutSidebarLeftCollapse`,[[`path`,{d:`M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12`,key:`svg-0`}],[`path`,{d:`M9 4v16`,key:`svg-1`}],[`path`,{d:`M15 10l-2 2l2 2`,key:`svg-2`}]]),gi=Ue(`outline`,`layout-sidebar-left-expand`,`LayoutSidebarLeftExpand`,[[`path`,{d:`M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12`,key:`svg-0`}],[`path`,{d:`M9 4v16`,key:`svg-1`}],[`path`,{d:`M14 10l2 2l-2 2`,key:`svg-2`}]]),_i=U.forwardRef(({className:e,children:t,...n},r)=>(0,G.jsxs)(fi,{ref:r,className:N(`relative overflow-hidden`,e),...n,children:[(0,G.jsx)(pi,{className:`h-full w-full rounded-[inherit]`,children:t}),(0,G.jsx)(vi,{}),(0,G.jsx)(mi,{})]}));_i.displayName=fi.displayName;var vi=U.forwardRef(({className:e,orientation:t=`vertical`,...n},r)=>(0,G.jsx)(Vr,{ref:r,orientation:t,className:N(`flex touch-none select-none transition-colors`,t===`vertical`&&`h-full w-2.5 border-s border-s-transparent p-[1px]`,t===`horizontal`&&`h-2.5 flex-col border-t border-t-transparent p-[1px]`,e),...n,children:(0,G.jsx)(Qr,{className:`relative flex-1 rounded-full bg-border`})}));vi.displayName=Vr.displayName;function yi(e,t){if(typeof window>`u`)return{collapsed:t,persistenceStatus:`unavailable`};try{let n=window.localStorage.getItem(e);return n===null?{collapsed:t,persistenceStatus:`available`}:n===`true`?{collapsed:!0,persistenceStatus:`available`}:n===`false`?{collapsed:!1,persistenceStatus:`available`}:{collapsed:t,persistenceStatus:`invalid`}}catch{return{collapsed:t,persistenceStatus:`unavailable`}}}function bi({storageKey:e,defaultCollapsed:t=!1}){let[n,r]=(0,U.useState)({collapsed:t,persistenceStatus:`unavailable`}),i=(0,U.useRef)(n.collapsed);(0,U.useEffect)(()=>{let n=yi(e,t);i.current=n.collapsed,r(n)},[t,e]);let a=(0,U.useCallback)(t=>{let n=typeof t==`function`?t(i.current):t;i.current=n;let a=`available`;try{typeof window>`u`?a=`unavailable`:window.localStorage.setItem(e,String(n))}catch{a=`unavailable`}r({collapsed:n,persistenceStatus:a})},[e]);return{...n,setCollapsed:a}}var xi=(0,U.createContext)(null),Si=(0,U.forwardRef)(({to:e,href:t,children:n,...r},i)=>(0,G.jsx)(`a`,{ref:i,href:e??t,...r,children:n}));Si.displayName=`NativeSidebarLink`;var Ci={collapsed:!1,setCollapsed:()=>{},toggleCollapsed:()=>{},isMobile:!1,LinkComponent:Si};function Z(){return(0,U.useContext)(xi)??Ci}function Q(e,t=`size-4 shrink-0 text-primary`){return e?(0,U.isValidElement)(e)?e:(0,G.jsx)(e,{className:t}):null}var wi=(0,U.forwardRef)(({brandName:e,brandHref:t=`/`,brandIcon:n,brandLink:r,badge:i,onBrandClick:a,collapsed:o,className:s,children:c,...l},u)=>{let d=Z(),f=o??d.collapsed,p=d.LinkComponent,m=r??(0,G.jsxs)(p,{to:t,href:t,"aria-label":typeof e==`string`?e:void 0,onClick:a,className:N(`flex min-w-0 items-center gap-2 rounded text-start outline-none focus-visible:ring-2 focus-visible:ring-ring`,f?`size-8 justify-center`:`shrink-0`),children:[n,!f&&e&&(0,G.jsx)(`span`,{className:`truncate text-sm font-semibold text-primary`,children:e})]});return(0,G.jsxs)(`div`,{ref:u,"data-sidebar-header":!0,className:N(`flex h-14 shrink-0 items-center border-b border-border`,f?`flex-col justify-center gap-0.5 px-2`:`gap-2 px-4`,s),...l,children:[f&&e&&(0,U.isValidElement)(m)?(0,G.jsx)(ze,{delayDuration:0,children:(0,G.jsxs)(z,{children:[(0,G.jsx)(L,{asChild:!0,children:m}),(0,G.jsx)(R,{side:`right`,children:e})]})}):m,i,c]})});wi.displayName=`AppSidebarHeader`;var Ti=(0,U.forwardRef)(({label:e,icon:t,to:n,href:r,active:i=!1,count:a,badge:o,actions:s,onClick:c,asChild:l=!1,tooltipSide:u=`right`,className:d,children:f,...p},m)=>{let{collapsed:h,LinkComponent:g}=Z(),_=n??r;if(h){let a=typeof e==`string`?e:void 0;return(0,G.jsxs)(z,{children:[(0,G.jsx)(L,{asChild:!0,children:l?f:_?(0,G.jsx)(g,{to:n,href:r??n,"aria-label":a,onClick:c,className:N(`flex size-9 items-center justify-center rounded-md text-primary hover:bg-accent/60 hover:text-primary`,i&&`bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary`,d),children:Q(t)}):(0,G.jsx)(`button`,{type:`button`,"aria-label":a,onClick:c,className:N(`flex size-9 items-center justify-center rounded-md text-primary hover:bg-accent/60 hover:text-primary`,i&&`bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary`,d),children:Q(t)})}),(0,G.jsx)(R,{side:u,children:e})]})}if(l)return(0,G.jsxs)(`div`,{ref:m,className:N(`group flex items-center rounded`,i?`bg-primary/10 font-medium text-primary`:`text-primary hover:bg-accent/60`,d),...p,children:[f,s]});let v=(0,G.jsxs)(G.Fragment,{children:[Q(t),(0,G.jsx)(`span`,{className:`flex-1 truncate text-primary`,children:e}),a!==void 0&&(typeof a==`number`?a>0:!!a)&&(0,G.jsx)(`span`,{className:`shrink-0 tabular-nums text-[11px] text-primary/80`,children:a}),o]});return(0,G.jsxs)(`div`,{ref:m,className:N(`group flex items-center rounded`,i?`bg-primary/10 font-medium text-primary`:`text-primary hover:bg-accent/60`,d),...p,children:[_?(0,G.jsx)(g,{to:n,href:r??n,onClick:c,className:`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-xs text-primary`,children:v}):(0,G.jsx)(`button`,{type:`button`,onClick:c,className:`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-xs text-primary`,children:v}),s]})});Ti.displayName=`AppSidebarNavItem`;var Ei=(0,U.forwardRef)(({label:e,icon:t,to:n,href:r,active:i=!1,count:a,open:o,onOpenChange:s,defaultOpen:c=!1,actions:l,children:u,className:d,...f},p)=>{let{collapsed:m,LinkComponent:h}=Z(),[g,_]=(0,U.useState)(c),v=o??g,y=s??_,b=n??r;return m?(0,G.jsxs)(z,{children:[(0,G.jsx)(L,{asChild:!0,children:(0,G.jsx)(h,{to:n,href:r??n??`#`,"aria-label":typeof e==`string`?e:void 0,className:N(`flex size-9 items-center justify-center rounded-md text-primary hover:bg-accent/60 hover:text-primary`,i&&`bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary`,d),children:Q(t)})}),(0,G.jsx)(R,{side:`right`,children:e})]}):(0,G.jsxs)(Ke,{open:v,onOpenChange:y,className:N(`group/sidebar-nav`,d),...f,children:[(0,G.jsxs)(`div`,{ref:p,className:N(`group flex items-center rounded`,i?`bg-primary/10 font-medium text-primary`:`text-primary hover:bg-accent/60`),children:[b?(0,G.jsxs)(h,{to:n,href:r??n,className:`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-xs text-primary`,children:[Q(t),(0,G.jsx)(`span`,{className:`flex-1 truncate text-primary`,children:e}),a!==void 0&&(typeof a==`number`?a>0:!!a)&&(0,G.jsx)(`span`,{className:`shrink-0 tabular-nums text-[11px] text-primary/80`,children:a})]}):(0,G.jsxs)(`div`,{className:`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-xs text-primary`,children:[Q(t),(0,G.jsx)(`span`,{className:`flex-1 truncate text-primary`,children:e}),a!==void 0&&(typeof a==`number`?a>0:!!a)&&(0,G.jsx)(`span`,{className:`shrink-0 tabular-nums text-[11px] text-primary/80`,children:a})]}),l,(0,G.jsx)(Je,{asChild:!0,children:(0,G.jsx)(`button`,{type:`button`,"aria-label":v?`Collapse`:`Expand`,className:`me-1 flex size-7 shrink-0 items-center justify-center rounded text-primary hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,children:(0,G.jsx)(Ze,{className:N(`size-3.5 transition-transform motion-reduce:transition-none`,v&&`rotate-180`)})})})]}),(0,G.jsx)(Ge,{className:`clips-collapsible-content`,children:(0,G.jsx)(`div`,{className:`ms-3.5 border-s border-border/70 ps-2`,children:u})})]})});Ei.displayName=`AppSidebarNavGroup`;var Di=(0,U.forwardRef)(({title:e,divider:t=!0,className:n,children:r,...i},a)=>{let{collapsed:o}=Z();return(0,G.jsxs)(`div`,{ref:a,"data-sidebar-section":!0,className:N(t&&`border-t border-border/70`,o?`mt-2 flex flex-col items-center gap-1 pt-2`:`mt-3 space-y-0.5 pt-3`,n),...i,children:[!o&&e&&(0,G.jsx)(`p`,{className:`px-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60`,children:e}),r]})});Di.displayName=`AppSidebarSection`;function Oi({label:e=`Report an issue`,icon:t,onClick:n,className:r,collapsed:i}){let a=!1;try{a=Z().collapsed}catch{}let o=i??a,s=(0,G.jsxs)(`button`,{type:`button`,"aria-label":o?e:void 0,onClick:n,className:N(o?`flex size-9 items-center justify-center rounded-md bg-transparent text-primary hover:bg-accent/60 hover:text-primary`:`flex h-auto w-full items-center justify-start gap-2 rounded bg-transparent px-2 py-1.5 text-xs font-normal text-primary hover:bg-accent/60 hover:text-primary`,r),children:[Q(t,`size-4 shrink-0 text-primary`)??(0,G.jsx)(et,{className:`size-4 shrink-0 text-primary`}),!o&&(0,G.jsx)(`span`,{children:e})]});return o?(0,G.jsxs)(z,{children:[(0,G.jsx)(L,{asChild:!0,children:s}),(0,G.jsx)(R,{side:`right`,children:e})]}):s}var ki=(0,U.forwardRef)(({feedback:e,orgSwitcher:t,footerExtras:n,collapsible:r=!0,expandLabel:i=`Expand sidebar`,collapseLabel:a=`Collapse sidebar`,collapsed:o,onToggleCollapsed:s,className:c,children:l,...u},d)=>{let f=Z(),p=o??f.collapsed,m=s??f.toggleCollapsed;if(l)return(0,G.jsx)(`div`,{ref:d,"data-sidebar-footer":!0,className:N(`shrink-0 border-t border-border p-2`,p?`space-y-1`:`space-y-1.5`,c),...u,children:l});let h=r?(0,G.jsxs)(z,{children:[(0,G.jsx)(L,{asChild:!0,children:(0,G.jsx)(`button`,{type:`button`,"aria-label":p?i:a,onClick:m,className:`flex size-9 shrink-0 items-center justify-center rounded-md bg-transparent text-primary hover:bg-accent/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,children:p?(0,G.jsx)(gi,{className:`size-4 rtl:-scale-x-100`}):(0,G.jsx)(hi,{className:`size-4 rtl:-scale-x-100`})})}),(0,G.jsx)(R,{side:`right`,children:p?i:a})]}):null,g=e===void 0?(0,G.jsx)(Oi,{collapsed:p}):e;return(0,G.jsxs)(`div`,{ref:d,"data-sidebar-footer":!0,className:N(`shrink-0 border-t border-border p-2`,p?`space-y-1`:`space-y-1.5`,c),...u,children:[g,(0,G.jsxs)(`div`,{"data-sidebar-footer-utilities":!0,className:N(p?`flex flex-col items-center gap-1`:`flex items-center gap-0.5`),children:[t,n,h]})]})});ki.displayName=`AppSidebarFooter`;var Ai=(0,U.forwardRef)(({collapsed:e,onCollapsedChange:t,defaultCollapsed:n=!1,collapsible:r=!0,storageKey:i,isMobile:a=!1,mobileOpen:o,onMobileOpenChange:s,linkComponent:c,overflowAffordances:l=!1,brandName:u,brandHref:d=`/`,brandIcon:f,brandLink:p,badge:m,headerContent:h,items:g,secondaryItems:_,feedback:v,orgSwitcher:y,footerExtras:b,footerContent:x,expandLabel:S=`Expand sidebar`,collapseLabel:C=`Collapse sidebar`,className:w,children:ee,...te},ne)=>{let re=bi({storageKey:i??`app-sidebar-default-key`,defaultCollapsed:n}),T=e!==void 0,E=!T&&!!i,[ie,ae]=(0,U.useState)(n),oe=T?e:E?re.collapsed:ie,D=(0,U.useCallback)(e=>{let n=typeof e==`function`?e(oe):e;t&&t(n),E&&re.setCollapsed(n),!T&&!E&&ae(n)},[oe,t,T,E,re]),se=(0,U.useCallback)(()=>{D(e=>!e)},[D]),O=oe&&!a,ce=c??Si,le=typeof o==`boolean`,ue=(0,U.useMemo)(()=>({collapsed:O,setCollapsed:D,toggleCollapsed:se,isMobile:a,LinkComponent:ce}),[O,D,se,a,ce]);return(0,G.jsx)(xi.Provider,{value:ue,children:(0,G.jsx)(ze,{delayDuration:0,children:(0,G.jsxs)(`aside`,{ref:ne,"data-collapsed":O?`true`:`false`,className:N(`flex h-full w-[260px] flex-col overflow-hidden border-e border-border bg-sidebar transition-[width,transform] duration-200 ease-out`,le?`agent-layout-left-drawer fixed inset-y-0 start-0 z-50 md:static md:z-auto`:`relative md:static`,O&&`md:w-14`,le&&(o?`translate-x-0`:`-translate-x-full rtl:translate-x-full md:translate-x-0`),w),...te,children:[h??(0,G.jsx)(wi,{brandName:u,brandHref:d,brandIcon:f,brandLink:p,badge:m}),(0,G.jsx)(ji,{affordances:l,children:O?(0,G.jsxs)(`nav`,{className:`flex flex-col items-center gap-1 px-2 py-3`,children:[g?.map(e=>(0,G.jsx)(Ti,{to:e.to,href:e.href,label:e.label,icon:e.icon,active:e.active,count:e.count,badge:e.badge,onClick:e.onClick},e.id??e.to??e.href??e.label)),ee,_&&_.length>0&&(0,G.jsx)(`div`,{className:`mt-2 flex flex-col items-center gap-1 border-t border-border/70 pt-2`,children:_.map(e=>(0,G.jsx)(Ti,{to:e.to,href:e.href,label:e.label,icon:e.icon,active:e.active,count:e.count,badge:e.badge,onClick:e.onClick},e.id??e.to??e.href??e.label))})]}):(0,G.jsxs)(`nav`,{className:`space-y-0.5 px-2 py-3`,children:[g?.map(e=>e.children?(0,G.jsx)(Ei,{to:e.to,href:e.href,label:e.label,icon:e.icon,active:e.active,count:e.count,actions:e.actions,children:e.children},e.id??e.to??e.href??e.label):(0,G.jsx)(Ti,{to:e.to,href:e.href,label:e.label,icon:e.icon,active:e.active,count:e.count,badge:e.badge,actions:e.actions,onClick:e.onClick},e.id??e.to??e.href??e.label)),ee,_&&_.length>0&&(0,G.jsx)(`div`,{className:`mt-3 space-y-0.5 border-t border-border/70 pt-3`,children:_.map(e=>(0,G.jsx)(Ti,{to:e.to,href:e.href,label:e.label,icon:e.icon,active:e.active,count:e.count,badge:e.badge,actions:e.actions,onClick:e.onClick},e.id??e.to??e.href??e.label))})]})}),x??(0,G.jsx)(ki,{feedback:v,orgSwitcher:y,footerExtras:b,collapsible:r,expandLabel:S,collapseLabel:C})]})})})});Ai.displayName=`AppSidebar`;function ji({affordances:e,children:t}){let n=(0,U.useRef)(null),r=(0,U.useRef)(null),[i,a]=(0,U.useState)({above:!1,below:!1});return(0,U.useEffect)(()=>{if(!e)return;let t=n.current,i=r.current;if(!t||!i)return;let o=()=>{let e=t.scrollHeight-t.clientHeight,n=e>1,r=n&&t.scrollTop>1,i=n&&t.scrollTop<e-1;a(e=>e.above===r&&e.below===i?e:{above:r,below:i})},s=new ResizeObserver(o);return s.observe(t),s.observe(i),t.addEventListener(`scroll`,o,{passive:!0}),o(),()=>{s.disconnect(),t.removeEventListener(`scroll`,o)}},[e]),e?(0,G.jsxs)(fi,{type:i.above||i.below?`always`:`auto`,className:`relative min-h-0 flex-1 overflow-hidden`,"data-app-sidebar-scroll-area":!0,children:[(0,G.jsx)(pi,{ref:n,className:`size-full scroll-py-2 [&>div]:!block`,"data-app-sidebar-scroll-viewport":!0,onFocusCapture:e=>{let t=e.currentTarget,n=e.target;if(!(n instanceof HTMLElement)||n===t||!t.contains(n))return;let r=t.getBoundingClientRect(),i=n.getBoundingClientRect();i.top<r.top+8?t.scrollTop+=i.top-r.top-8:i.bottom>r.bottom-8&&(t.scrollTop+=i.bottom-r.bottom+8)},children:(0,G.jsx)(`div`,{ref:r,children:t})}),(0,G.jsx)(vi,{className:`z-10 w-1.5 border-none p-px [&>div]:bg-muted-foreground/50`}),i.above&&(0,G.jsx)(`div`,{"aria-hidden":`true`,"data-scroll-edge":`top`,className:`pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-sidebar to-transparent`}),i.below&&(0,G.jsx)(`div`,{"aria-hidden":`true`,"data-scroll-edge":`bottom`,className:`pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-sidebar to-transparent`})]}):(0,G.jsx)(`div`,{className:`min-h-0 flex-1 overflow-y-auto`,children:t})}function Mi(e){return e}function Ni(e){return e?.trim().toLowerCase().endsWith(`@builder.io`)??!1}function Pi(e){return/AgentNativeDesktop/i.test(e??``)}function Fi(e,t){let n=e.deployment?.environment;return n===`local`||n===`beta`||n===`production`?n:!Ne(t)||!t?null:t.trim().toLowerCase().startsWith(`beta.`)?`beta`:`production`}function Ii(e,t=Date.now()){let n=typeof e==`number`?e:Number(e);return Number.isFinite(n)&&n>t}function Li(e=Date.now()){if(typeof window>`u`)return null;try{let t=window.localStorage.getItem(j);if(Ii(t,e))return Number(t);t!==null&&window.localStorage.removeItem(j)}catch{}return null}function Ri(){if(!(typeof window>`u`))try{window.localStorage.setItem(A,String(Date.now()+Ce))}catch{}}function zi(e){let t=!1;try{t=new URL(e).searchParams.get(Ae)===`true`}catch{}if(typeof window>`u`)return t;try{return t&&window.sessionStorage.setItem(De,`1`),t||window.sessionStorage.getItem(`agent-native:force-production`)===`1`}catch{return t}}function Bi(e,t=Date.now()){let n;try{n=new URL(e)}catch{return!1}let r=n.searchParams.get(k);if(r===null)return!1;let i=Ii(r,t);n.searchParams.delete(k);try{i&&(window.localStorage.setItem(j,String(Number(r))),window.localStorage.removeItem(A)),window.history.replaceState(null,``,n.toString())}catch{}return i}function Vi(e,t){return t&&e.trim().toLowerCase()===`alpha`?`text-[9px]`:void 0}var Hi={fixed:`fixed bottom-3 left-3 z-[100] h-6 min-w-0 rounded-xl px-2 text-[11px] font-semibold uppercase tracking-[0.5px] shadow-sm backdrop-blur-sm`,inline:`relative z-0 inline-flex h-5 min-w-0 shrink-0 rounded-md px-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] shadow-sm backdrop-blur-sm`};function Ui({label:e,href:t}){return(0,G.jsx)(B,{asChild:!0,className:`w-full justify-center`,size:`sm`,variant:`outline`,children:(0,G.jsx)(`a`,{href:t,children:e})})}function Wi({environment:e,placement:t,targets:n,badgeText:r,collapsed:i,className:a}){let o=ut(),[s,c]=(0,U.useState)(!1),{session:l}=ge(),u=Ni(l?.email);if(typeof window>`u`||s)return null;let d=window.location.href,f=be(d,n.betaHost),p=Te(d,n.productionHost);if(e===`beta`?!p:!f)return null;let m=r??`alpha`,h=e===`beta`?o(`environmentBadge.betaTitle`,{label:m.charAt(0).toUpperCase()+m.slice(1)}):o(`environmentBadge.productionTitle`),g=ft(Hi[t],Vi(m,i),e===`beta`?`border-primary/80`:`border-border/80 bg-background/95 text-foreground`,a);return u?(0,G.jsxs)(it,{children:[(0,G.jsx)(nt,{asChild:!0,children:(0,G.jsx)(B,{"aria-label":o(`environmentBadge.openSwitcher`,{title:h}),className:g,size:`sm`,variant:e===`beta`?`default`:`outline`,children:m})}),(0,G.jsxs)(rt,{align:`start`,className:`w-[280px] p-5`,side:t===`inline`?`bottom`:`top`,sideOffset:8,children:[(0,G.jsx)(`div`,{className:`mb-1 text-sm font-semibold leading-5`,children:h}),(0,G.jsx)(`div`,{className:`mb-4 text-sm text-muted-foreground`,children:o(`environmentBadge.continuePrompt`)}),(0,G.jsxs)(`div`,{className:`grid gap-2`,children:[e===`beta`?(0,G.jsx)(Ui,{href:p,label:o(`environmentBadge.switchToProduction`)}):(0,G.jsx)(Ui,{href:f,label:o(`environmentBadge.goToBeta`)}),(0,G.jsx)(B,{className:`mt-2 -mb-2 w-full justify-center text-muted-foreground`,onClick:()=>c(!0),size:`sm`,type:`button`,variant:`ghost`,children:o(`environmentBadge.hideBadge`)})]})]})]}):(0,G.jsxs)(it,{children:[(0,G.jsx)(nt,{asChild:!0,children:(0,G.jsx)(B,{"aria-label":o(`environmentBadge.activeDevelopment`),className:g,size:`sm`,variant:e===`beta`?`default`:`outline`,children:m})}),(0,G.jsxs)(rt,{align:`start`,className:`w-[280px] p-4`,side:t===`inline`?`bottom`:`top`,sideOffset:8,children:[(0,G.jsx)(`div`,{className:`text-sm font-semibold leading-5`,children:o(`environmentBadge.activeDevelopment`)}),(0,G.jsx)(`div`,{className:`mt-1 text-sm text-muted-foreground`,children:o(`environmentBadge.feedbackPrompt`)}),(0,G.jsx)(_e,{align:`start`,className:`mt-4 w-full justify-center`,side:`bottom`,variant:`outlined`})]})]})}function Gi({placement:e,badgeText:t=`alpha`,collapsed:n,className:r}){return(0,G.jsx)(`div`,{"aria-label":ut()(`environmentBadge.localDevelopment`),className:ft(Hi[e],Vi(t,n),`pointer-events-none inline-flex select-none items-center justify-center border border-border/80 bg-background/95 text-foreground`,r),role:`status`,children:t})}function Ki({placement:e,targets:t,badgeText:n,collapsed:r,className:i}){let{session:a,status:o}=ge(),s=typeof window<`u`&&window.parent===window&&o===`authenticated`&&Ni(a?.email),c=(0,U.useRef)(!1);return(0,U.useEffect)(()=>{if(typeof window>`u`||zi(window.location.href)||!s||c.current||Pi(window.navigator.userAgent)||Li()!==null||Bi(window.location.href))return;let e=Ee(window.location.href,t.betaHost);!e||typeof window.location.replace!=`function`||(Ri(),c.current=!0,y(`environment switched`,{from_environment:`production`,to_environment:`beta`,trigger:`automatic_redirect`}),window.location.replace(e))},[s,a?.email,o,t.betaHost]),(0,G.jsx)(Wi,{environment:`production`,placement:e,targets:t,badgeText:n,collapsed:r,className:i})}function qi({placement:e=`fixed`,showProduction:n=!0,appId:r,badgeText:i,collapsed:a,className:o}={}){let s=ut(),[c,l]=(0,U.useState)(!1),u=Z(),d=(0,U.useMemo)(t,[]),f=a??u.collapsed,p=typeof window>`u`?void 0:window.location.hostname,m=Fi(d,p),h=Ne(p),g=i??d.deployment?.badgeText??d.badgeText??at(r);return(0,U.useEffect)(()=>{l(!0)},[]),!c||typeof window>`u`||window.parent!==window||!m?null:m===`local`?(0,G.jsx)(Gi,{placement:e,badgeText:g,collapsed:f,className:o}):h?m===`beta`?(0,G.jsx)(Wi,{environment:`beta`,placement:e,targets:h,badgeText:g,collapsed:f,className:o}):n?(0,G.jsx)(Ki,{placement:e,targets:h,badgeText:g,collapsed:f,className:o}):null:(0,G.jsx)(`div`,{"aria-label":s(`environmentBadge.development`),className:ft(Hi[e],Vi(g,f),`inline-flex items-center justify-center border border-border/80 bg-background/95 text-foreground select-none`,o),role:`status`,children:g})}var Ji=new Set([`off`,`marked`,`intent`,`render`,`viewport`]),Yi={strategy:`viewport`,data:!0,modules:!0,selector:`a[data-an-prefetch="render"][href]`,maxConcurrent:8};function Xi(e){return typeof e==`string`&&Ji.has(e)}function Zi(e,t=Yi.strategy){return Xi(e)?e:t}function Qi(e,t=!0){return t===!1?{...e,strategy:`off`}:typeof t==`string`?{...e,strategy:Zi(t,e.strategy)}:t===!0||t===void 0?{...e}:{...e,...t,strategy:Zi(t.strategy,e.strategy),data:typeof t.data==`boolean`?t.data:e.data,modules:typeof t.modules==`boolean`?t.modules:e.modules,selector:typeof t.selector==`string`&&t.selector.trim()?t.selector:e.selector,maxConcurrent:typeof t.maxConcurrent==`number`&&Number.isFinite(t.maxConcurrent)&&t.maxConcurrent>0?Math.floor(t.maxConcurrent):e.maxConcurrent}}function $i(e=!0){return Qi(Yi,e)}function ea(e,t){return Qi($i(e),t)}var ta=`data-an-prefetch`,$=new Set,na=new Set,ra,ia=``,aa=[];function oa(e){if(typeof e!=`string`)return e;let t=e.trim();if(t)try{return JSON.parse(t)}catch{return e}}function sa(){try{return oa({strategy:`viewport`,data:!0,modules:!0,selector:`a[data-an-prefetch="render"][href]`,maxConcurrent:8})}catch{}}function ca(e){return ea(sa(),e)}function la(e){return!e||e===`/`?`/`:e.startsWith(`/`)?e.replace(/\/+$/,``):`/`}function ua(e){let t=la(window.__reactRouterContext?.basename);return t===`/`?e:e===t?`/`:e.startsWith(`${t}/`)?e.slice(t.length)||`/`:e}function da(e){let t=ua(e);return d(t)||t===`/api`||t.startsWith(`/api/`)||t===`/cdn-cgi`||t.startsWith(`/cdn-cgi/`)}function fa(e){try{return new URL(e,window.location.href)}catch{return null}}function pa(e){return!(e.origin!==window.location.origin||e.pathname===window.location.pathname&&e.hash||da(e.pathname)||/\.\w+$/.test(e.pathname))}function ma(e){if(e.hasAttribute(`download`)||e.target&&e.target!==`_self`)return!1;let t=fa(e.href);return t?pa(t):!1}function ha(e){let t=fa(e);if(!t||!pa(t))return null;let n=la(window.__reactRouterContext?.basename);return n!==`/`&&t.pathname===n?t.pathname=`${n}/_.data`:t.pathname=t.pathname.endsWith(`/`)?`${t.pathname}_.data`:`${t.pathname}.data`,t.hash=``,t.href}function ga(e){let t=ha(e);if(!t)return[];let n=window.__reactRouterManifest;if(!n?.routes)return[t];let r=n.routes,i=fa(e);if(!i)return[];let a=x(ba(n),i.pathname,la(window.__reactRouterContext?.basename))??[];if(a.length===0)return[];let o=a.filter(e=>{let t=e.route.id;return t?r[t]?.hasLoader===!0:!1});if(o.length===0)return[];let s=o.filter(e=>{let t=e.route.id,n=t?r[t]:void 0;return n?!n.hasClientLoader&&!n.clientLoaderModule:!1}),c=o.filter(e=>{let t=e.route.id,n=t?r[t]:void 0;return n?.hasClientLoader===!0||!!n?.clientLoaderModule}),l=[];s.length>0&&(e=>{let n=new URL(t);_a(n),e?.length&&n.searchParams.set(`_routes`,e.join(`,`)),l.push(n.href)})(c.length>0?s.map(e=>e.route.id).filter(e=>!!e):void 0);for(let e of c){let n=e.route.id;if(!n)continue;let r=new URL(t);_a(r),r.searchParams.set(`_routes`,n),l.push(r.href)}return l}function _a(e){let t=e.searchParams.getAll(`index`);if(t.some(e=>e===``)){e.searchParams.delete(`index`);for(let n of t)n&&e.searchParams.append(`index`,n)}}function va(){let e=window.__reactRouterManifest?.routes;return!!(e&&Object.keys(e).length>0)}function ya(e){return Object.values(e??{}).map(e=>[e.id,e.parentId??``,e.path??``,e.index?`1`:`0`].join(`\0`)).sort().join(`
`)}function ba(e){let t=ya(e.routes);if(e===ra&&t===ia)return aa;let n=Object.values(e.routes??{}),r=new Map;for(let e of n)r.set(e.id,{id:e.id,path:e.path,index:e.index||void 0});let i=[];for(let e of n){let t=r.get(e.id);if(!t)continue;let n=e.parentId?r.get(e.parentId):null;n?(n.children??=[],n.children.push(t)):i.push(t)}return ra=e,ia=t,aa=i,i}function xa(e){try{let t=new URL(e,window.location.origin);return t.origin!==window.location.origin||!/\/assets\/[^/?#]+\.m?js$/.test(t.pathname)?null:t.href}catch{return null}}function Sa(){for(let e of Object.values(window.__reactRouterManifest?.routes??{}))for(let t of[e.module,e.clientActionModule,e.clientLoaderModule,e.hydrateFallbackModule,...e.imports??[]])if(t&&xa(t))return!0;return!1}function Ca(e){let t=window.__reactRouterManifest;if(!t?.routes)return[];let n=fa(e);if(!n||!pa(n))return[];let r=la(window.__reactRouterContext?.basename),i=x(ba(t),n.pathname,r)??[],a=[];for(let e of i){let n=e.route.id;if(!n)continue;let r=t.routes[n];if(r)for(let e of[r.module,r.clientActionModule,r.clientLoaderModule,r.hydrateFallbackModule,...r.imports??[]]){if(!e)continue;let t=xa(e);t&&a.push(t)}}return a}function wa(){for(let e of document.querySelectorAll(`link[rel="modulepreload"][href]`))na.add(e.href)}function Ta(e){for(let t of Ca(e)){if(na.has(t))continue;na.add(t);let e=document.createElement(`link`);e.rel=`modulepreload`,e.href=t,document.head.appendChild(e)}}function Ea(e,t){let n=e.getAttribute(ta)?.trim().toLowerCase();return n===`none`||n===`off`||n===`false`?`none`:n===`render`||n===`intent`||n===`viewport`?n:t===`off`||t===`marked`?`none`:t}function Da(e){let t=e.getAttribute(ta)?.trim().toLowerCase();return t===`none`||t===`off`||t===`false`?`none`:`render`}function Oa(e){let t;try{t=Array.from(document.querySelectorAll(e))}catch{return[]}let n=[],r=new Set;for(let e of t){let t=e instanceof HTMLAnchorElement?e:e.querySelector(`a[href]`)??e.closest(`a[href]`);!t||r.has(t)||(r.add(t),n.push(t))}return n}function ka({config:e}){return(0,U.useEffect)(()=>{let t=ca(e);if(t.strategy===`off`||navigator.connection?.saveData)return;let n=va()&&Sa(),r=t.data&&n,i=t.modules&&n;if(!r&&!i)return;i&&wa();let a=[],o=new Set,s=new Map,c=new Set,l=new WeakSet,u=0,d=!1,f,p=(e,t)=>{if(d)return;let n=(s.get(e)??0)+1;if(n>3){o.delete(e);return}s.set(e,n);let r=window.setTimeout(()=>{c.delete(r),!d&&(o.delete(e),$.delete(e),h(t))},500*2**(n-1));c.add(r)},m=()=>{if(!(d||!r))for(;u<t.maxConcurrent&&a.length>0;){let e=a.shift();e&&(u+=1,window.fetch(e.dataUrl,{credentials:`same-origin`,cache:`force-cache`}).then(t=>{if(t.ok){s.delete(e.dataUrl);return}$.delete(e.dataUrl),t.status>=500||t.status===429?p(e.dataUrl,e.href):(o.delete(e.dataUrl),s.delete(e.dataUrl))}).catch(()=>{$.delete(e.dataUrl),p(e.dataUrl,e.href)}).finally(()=>{--u,window.setTimeout(m,50)}))}};function h(e){if(i&&Ta(e),r){for(let t of ga(e))$.has(t)||($.add(t),!o.has(t)&&(o.add(t),a.push({dataUrl:t,href:e})));m()}}let g=typeof IntersectionObserver>`u`?null:new IntersectionObserver(e=>{for(let t of e){if(!t.isIntersecting)continue;let e=t.target;g?.unobserve(e),h(e.href)}}),_=()=>{i&&wa();for(let e of Oa(t.selector))ma(e)&&Da(e)!==`none`&&h(e.href);for(let e of document.querySelectorAll(`a[href]`)){if(!ma(e))continue;let n=Ea(e,t.strategy);if(n!==`none`){if(n===`render`){h(e.href);continue}n===`viewport`&&(g?l.has(e)||(l.add(e),g.observe(e)):h(e.href))}}},v=()=>{f!==void 0&&window.clearTimeout(f),f=window.setTimeout(()=>{f=void 0,_()},0)},y=e=>{let n=e.target;if(!(n instanceof Element))return;let r=n.closest(`a[href]`);!r||!ma(r)||Ea(r,t.strategy)!==`none`&&h(r.href)};v();let b=new MutationObserver(v);return b.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[ta,`href`]}),document.addEventListener(`pointerover`,y,{capture:!0,passive:!0}),document.addEventListener(`touchstart`,y,{capture:!0,passive:!0}),document.addEventListener(`focusin`,y,!0),()=>{d=!0,f!==void 0&&window.clearTimeout(f);for(let e of c)window.clearTimeout(e);c.clear(),b.disconnect(),g?.disconnect(),document.removeEventListener(`pointerover`,y,!0),document.removeEventListener(`touchstart`,y,!0),document.removeEventListener(`focusin`,y,!0)}},[e]),null}var Aa=15e3;function ja(){let e=w(),t=e.state===`loading`&&e.location?`${e.location.pathname}${e.location.search}${e.location.hash}`:null,n=e.state===`loading`&&e.location?e.location.key:null,[r,i]=(0,U.useState)(null);return(0,U.useEffect)(()=>{if(!t){i(null);return}i(null);let e=window.setTimeout(()=>{i(t)},180),n=window.setTimeout(()=>{i(null)},Aa);return()=>{window.clearTimeout(e),window.clearTimeout(n)}},[t,e,n]),!t||r!==t?null:(0,G.jsx)(`div`,{"aria-label":`Loading page...`,"aria-live":`polite`,className:`pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-primary/15`,"data-route-transition-indicator":`true`,"data-route-transition-target":t,role:`status`,children:(0,G.jsx)(`div`,{className:`route-transition-indicator-bar h-full w-full bg-primary`})})}function Ma(){return{version:1,onboarding:{firstRun:`off`},changelog:{enabled:!1},harness:!0}}function Na(e){let t=new URLSearchParams({configuration:`1`}),n=e.runtime?.environment?.required??[];return n.length>0&&t.set(`requiredEnv`,n.join(`,`)),e.runtime?.auth?.enabled===!1&&t.set(`auth`,`0`),e.runtime?.database?.required===!1&&t.set(`database`,`0`),c(`/_agent-native/ping`)+`?`+t.toString()}function Pa(){let e=ut(),[t,n]=(0,U.useState)(null),[r,i]=(0,U.useState)(!1),[a,o]=(0,U.useState)(`idle`),s=(0,U.useMemo)(Ma,[]);if((0,U.useEffect)(()=>{if(typeof window.fetch!=`function`||_())return;let e=new AbortController,t=!0,r=window.setTimeout(()=>e.abort(),5e3);return window.fetch(Na(s),{headers:{accept:`application/json`},signal:e.signal}).then(async e=>{if(!e.ok)throw Error(`configuration probe: `+e.status);return await e.json()}).then(e=>{if(!t)return;let r=p(e.configuration);r&&!r.ok&&n(r)}).catch(()=>{}).finally(()=>window.clearTimeout(r)),()=>{t=!1,e.abort(),window.clearTimeout(r)}},[s]),!t)return null;let c=t,l=c.status===`error`,u=l?ve:We,d=e(`runtimeConfig.issue`,{count:c.issues.length}),f=l?`border-destructive/40 bg-destructive/10 text-destructive`:`border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300`;async function m(){let e=await pt(c.prompt);o(e?`copied`:`failed`),window.setTimeout(()=>o(`idle`),2500)}return(0,G.jsxs)(`aside`,{"aria-label":e(l?`runtimeConfig.errorTitle`:`runtimeConfig.warningTitle`),className:`fixed bottom-4 right-4 z-[1000] w-[min(calc(100vw-2rem),26rem)] rounded-lg border shadow-lg backdrop-blur `+f,"data-testid":`runtime-config-notice`,children:[(0,G.jsxs)(`div`,{className:`flex items-center gap-2 px-3 py-2`,children:[(0,G.jsx)(u,{"aria-hidden":`true`,className:`size-4 shrink-0`}),(0,G.jsxs)(`button`,{type:`button`,className:`min-w-0 flex-1 truncate text-left text-xs font-medium`,"aria-expanded":r,onClick:()=>i(e=>!e),children:[e(l?`runtimeConfig.errorTitle`:`runtimeConfig.warningTitle`),(0,G.jsxs)(`span`,{className:`ms-1 font-normal opacity-80`,children:[`(`,d,`)`]})]}),(0,G.jsx)(`button`,{type:`button`,className:`inline-flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-black/5 dark:hover:bg-white/10`,"aria-label":e(r?`runtimeConfig.hideDetails`:`runtimeConfig.showDetails`),onClick:()=>i(e=>!e),children:r?(0,G.jsx)(Qe,{"aria-hidden":`true`,className:`size-4`}):(0,G.jsx)(Ze,{"aria-hidden":`true`,className:`size-4`})})]}),r?(0,G.jsxs)(`div`,{className:`space-y-2 border-t border-current/15 px-3 py-3 text-xs`,children:[(0,G.jsx)(`ul`,{className:`space-y-2`,children:c.issues.map(e=>(0,G.jsxs)(`li`,{children:[(0,G.jsx)(`p`,{className:`font-medium`,children:e.title}),(0,G.jsx)(`p`,{className:`mt-0.5 opacity-85`,children:e.message}),e.envKeys.length>0?(0,G.jsx)(`p`,{className:`mt-1 font-mono text-[10px] opacity-75`,children:e.envKeys.join(`, `)}):null]},e.code+`:`+e.envKeys.join(`,`)))}),(0,G.jsxs)(`button`,{type:`button`,className:`inline-flex h-8 items-center gap-1.5 rounded-md border border-current/25 bg-background/70 px-2.5 font-medium text-foreground transition hover:bg-background`,onClick:()=>void m(),children:[a===`copied`?(0,G.jsx)(Xe,{"aria-hidden":`true`,className:`size-3.5`}):(0,G.jsx)($e,{"aria-hidden":`true`,className:`size-3.5`}),e(a===`copied`?`runtimeConfig.copied`:a===`failed`?`runtimeConfig.copyFailed`:`runtimeConfig.copyPrompt`)]})]}):null]})}function Fa(){return`
(function() {
  try {
    var params = new URLSearchParams(window.location.search || "");
    var embedded = params.get(${JSON.stringify(r)});
    if (params.has(${JSON.stringify(m)}) || embedded === "1" || embedded === "true") return;
  } catch (e) {}

  var INSTALL_KEY = "__agentNativeViteDevRecoveryInstalled";
  if (window[INSTALL_KEY]) return;
  window[INSTALL_KEY] = true;

  var RELOAD_KEY = "__an_optimize_reload";
  var MAX_RELOADS = 3;
  var MIN_RELOAD_INTERVAL_MS = 2000;
  var RESET_AFTER_MS = 8000;

  var reloadTimer = null;
  var overlayShown = false;

  // Track recent reloads in sessionStorage. If we reload too many times
  // in a short window, stop and show a manual-refresh message instead of
  // looping forever.
  function readReloadHistory() {
    try {
      var raw = sessionStorage.getItem(RELOAD_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      var cutoff = Date.now() - 30000;
      return Array.isArray(arr) ? arr.filter(function(t) { return t > cutoff; }) : [];
    } catch (e) { return []; }
  }
  function recordReload() {
    try {
      var history = readReloadHistory();
      history.push(Date.now());
      sessionStorage.setItem(RELOAD_KEY, JSON.stringify(history));
    } catch (e) {}
  }
  // Reset the counter after a stable period (page didn't fail again).
  setTimeout(function() {
    try { sessionStorage.removeItem(RELOAD_KEY); } catch (e) {}
  }, RESET_AFTER_MS);

  function showOverlay(title, subtitle) {
    if (overlayShown) return;
    overlayShown = true;
    var mount = function() {
      if (!document.body) { setTimeout(mount, 16); return; }
      var el = document.createElement("div");
      el.id = "__an-reload-overlay";
      el.style.cssText = [
        "position:fixed","inset:0","z-index:2147483647",
        "display:flex","align-items:center","justify-content:center",
        "background:rgba(0,0,0,0.6)","backdrop-filter:blur(8px)",
        "-webkit-backdrop-filter:blur(8px)",
        "font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif",
        "color:#fff","font-size:14px"
      ].join(";");
      el.innerHTML =
        '<div style="background:#171717;padding:20px 24px;border-radius:12px;' +
        'border:1px solid rgba(255,255,255,0.1);max-width:340px;text-align:center;' +
        'box-shadow:0 20px 60px rgba(0,0,0,0.5)">' +
        '<div style="font-weight:600;margin-bottom:6px">' + title + '</div>' +
        '<div style="font-size:12px;opacity:0.7">' + subtitle + '</div>' +
        '</div>';
      document.body.appendChild(el);
    };
    mount();
  }

  function scheduleReload(reason) {
    if (reloadTimer) return;
    var history = readReloadHistory();
    if (history.length >= MAX_RELOADS) {
      console.warn("[agent-native] Dev server keeps re-bundling. Manual refresh needed.", reason);
      showOverlay(
        "Dev server out of sync",
        "Auto-reload gave up after " + MAX_RELOADS + " tries. Refresh the page (\\u2318R / Ctrl R)."
      );
      return;
    }
    console.log("[agent-native] Vite re-bundled deps (" + reason + "), reloading\\u2026");
    recordReload();
    // First reload is silent. One refresh almost always fixes it and the
    // overlay flash is more disruptive than the reload itself. Only show
    // the overlay starting on the second attempt, when something is clearly
    // taking longer than expected.
    if (history.length >= 1) {
      showOverlay("Updating dev server\\u2026", "Reloading the page");
    }
    var lastReloadAt = history.length ? history[history.length - 1] : 0;
    var delay = Math.max(
      300,
      MIN_RELOAD_INTERVAL_MS - Math.max(0, Date.now() - lastReloadAt),
    );
    reloadTimer = setTimeout(function() { window.location.reload(); }, delay);
  }

  window.addEventListener("vite:beforeFullReload", function() {
    if (reloadTimer) {
      clearTimeout(reloadTimer);
      reloadTimer = null;
    }
  });

  function looksLikeViteFailureMessage(message) {
    if (!message) return false;
    var optimizerUrl = message.indexOf("/node_modules/.vite/deps/") !== -1
        || message.indexOf("/@id/") !== -1
        || message.indexOf("/@fs/") !== -1;
    return message.indexOf("Outdated Optimize Dep") !== -1
        || message.indexOf("Optimize Deps Processing Error") !== -1
        || ((message.indexOf("Failed to fetch dynamically imported module") !== -1
          || message.indexOf("error loading dynamically imported module") !== -1
          || message.indexOf("Importing a module script failed") !== -1)
          && optimizerUrl)
        || (message.indexOf("504") !== -1 && (
          message.indexOf(".vite/deps") !== -1 ||
          message.indexOf("/node_modules/.vite/deps/") !== -1
        ));
  }

  // Vite's preload event is already scoped to a failed module preload, so it
  // carries stronger evidence than a generic rejection. Route modules do not
  // live under the optimizer URL prefix, but they still need Vite's bounded
  // recovery before React Router logs and natively reloads the document.
  function looksLikeVitePreloadFailureMessage(message) {
    if (!message) return false;
    return message.indexOf("Failed to fetch dynamically imported module") !== -1
        || message.indexOf("error loading dynamically imported module") !== -1
        || message.indexOf("Importing a module script failed") !== -1
        || message.indexOf("Outdated Optimize Dep") !== -1
        || message.indexOf("Optimize Deps Processing Error") !== -1
        || (message.indexOf("504") !== -1 && (
          message.indexOf(".vite/deps") !== -1 ||
          message.indexOf("/node_modules/.vite/deps/") !== -1
        ));
  }

  function looksLikeViteDep(url) {
    if (!url) return false;
    // Only treat same-origin URLs as Vite deps. Do not reload the page
    // because some third-party CDN script 404'd.
    try {
      var u = new URL(url, window.location.href);
      if (u.origin !== window.location.origin) return false;
    } catch (e) { return false; }
    return url.indexOf("/node_modules/.vite/deps/") !== -1
        || url.indexOf("/@fs/") !== -1
        || url.indexOf("/@id/") !== -1
        || url.indexOf("?v=") !== -1
        || url.indexOf("?import") !== -1
        || /\\.(m?js|ts|tsx|jsx)(\\?|$)/.test(url);
  }

  // 1) <script type="module"> / <link> 504. These fire on the element, not
  //    window, so use capture phase to catch resource load errors.
  window.addEventListener("error", function(e) {
    var t = e.target;
    if (!t || t === window) {
      var message = String(e.message || "");
      if (looksLikeViteFailureMessage(message)) {
        scheduleReload("window error");
      }
      return;
    }
    var tag = t.tagName;
    if (tag !== "SCRIPT" && tag !== "LINK") return;
    var url = t.src || t.href || "";
    if (looksLikeViteDep(url)) {
      var name = url.split("/").pop();
      scheduleReload("script 504: " + name);
    }
  }, true);

  // Vite's documented hook for failed dynamic-import preloads. This mostly
  // targets production chunk skew, but it also fires for some dev optimizer
  // races, so wire it into the same guarded reload path.
  window.addEventListener("vite:preloadError", function(e) {
    var payload = e && e.payload;
    var msg = String((payload && (payload.message || payload)) || "");
    // A preload event without a concrete error is not enough evidence to
    // reload the document. Vite can emit an empty payload while a route
    // preload is being cancelled; treating that cancellation as an optimizer
    // failure strands the app on its SSR loading fallback.
    if (looksLikeVitePreloadFailureMessage(msg)) {
      if (e.preventDefault) e.preventDefault();
      scheduleReload("preload error");
    }
  });

  // 2) Dynamic import failures (React Router code splitting, lazy components).
  window.addEventListener("unhandledrejection", function(e) {
    var msg = String((e.reason && (e.reason.message || e.reason)) || "");
    if (looksLikeViteFailureMessage(msg)) {
      scheduleReload("dynamic import");
    }
  });

  // Static module-graph fetch failures for child imports don't always surface
  // as element errors or rejections. Chrome exposes the HTTP status via
  // Resource Timing; when available, use it as a final safety net.
  var seenResources = {};
  function checkResourceEntry(entry) {
    var url = entry && entry.name;
    if (!url || seenResources[url]) return;
    seenResources[url] = true;
    if (!looksLikeViteDep(url)) return;
    if (entry.responseStatus === 504) {
      var name = url.split("/").pop();
      scheduleReload("resource 504: " + name);
    }
  }
  function checkExistingResources() {
    try {
      var entries = performance.getEntriesByType("resource") || [];
      for (var i = 0; i < entries.length; i++) checkResourceEntry(entries[i]);
    } catch (e) {}
  }
  if (window.PerformanceObserver) {
    try {
      var observer = new PerformanceObserver(function(list) {
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) checkResourceEntry(entries[i]);
      });
      observer.observe({ type: "resource", buffered: true });
    } catch (e) {
      setTimeout(checkExistingResources, 0);
    }
  } else {
    setTimeout(checkExistingResources, 0);
  }
})();`}function Ia(){let e={BASE_URL:`/`,DEV:!0,MODE:`production`,PROD:!1,SSR:!1};return e?.PROD===!0?!1:(e?.DEV,!0)}var La=`agent-native:theme-change`;function Ra(e){return typeof e==`object`&&!!e}function za(e){if(!Ra(e))return;let t={};for(let[n,r]of Object.entries(e))mt.some(e=>e===n)&&typeof r==`string`&&(t[n]=r);return Object.keys(t).length>0?t:void 0}function Ba(e){if(!Ra(e)||e.type!==`agent-native-theme-update`&&e.type!==`agent-native:theme-change`)return null;let t=e.theme===`light`||e.theme===`dark`?e.theme:typeof e.isDark==`boolean`?e.isDark?`dark`:`light`:null;if(!t)return null;let n=za(e.vars);return n?{theme:t,vars:n}:{theme:t}}function Va(e,t){let n=t.theme===`dark`;e.classList.toggle(`dark`,n),e.classList.toggle(`light`,!n),e.setAttribute(`data-theme`,t.theme),e.style.colorScheme=t.theme;for(let[n,r]of Object.entries(t.vars??{}))e.style.setProperty(n,r)}function Ha(e){return e===`light`||e===`dark`||e===`system`?e:`system`}function Ua(e=`system`,t=!0){let n=Ha(e),r=t?`true`:`false`,i=`(function(){function m(){var d={};return{get length(){return Object.keys(d).length},key:function(i){return Object.keys(d)[i]||null},getItem:function(k){k=String(k);return Object.prototype.hasOwnProperty.call(d,k)?d[k]:null},setItem:function(k,v){d[String(k)]=String(v)},removeItem:function(k){delete d[String(k)]},clear:function(){d={}}}}function s(n){try{var x=window[n],p='__an_storage_probe__';x.setItem(p,'1');x.removeItem(p)}catch(e){try{Object.defineProperty(window,n,{configurable:true,value:m()})}catch(_){}}}s('localStorage');s('sessionStorage');try{var defaultTheme=${JSON.stringify(n)};var enableSystem=${r};var stored=window.localStorage.getItem('theme');var valid=stored==='light'||stored==='dark'||stored==='system'||stored==='auto';var mode=valid?stored:defaultTheme;if(mode==='auto')mode='system';if(!enableSystem&&mode==='system')mode=defaultTheme==='system'?'light':defaultTheme;if(!valid){window.localStorage.removeItem('theme')}else if(stored!==mode){window.localStorage.setItem('theme',mode)}var prefersDark=enableSystem&&mode==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);root.setAttribute('data-theme',resolved);root.style.colorScheme=resolved;var appearance=window.localStorage.getItem('appearance');var appearanceValid=appearance==='warm'||appearance==='ocean'||appearance==='forest'||appearance==='rose'||appearance==='slate';if(appearanceValid){root.setAttribute('data-appearance',appearance)}else{root.removeAttribute('data-appearance');if(appearance!==null)window.localStorage.removeItem('appearance')}}catch(e){}})();`;return Ia()?`${i}\n${Fa()}`:i}Ua();var Wa=(0,G.jsx)(Cr,{richColors:!0,position:`bottom-left`,offset:{bottom:44,left:32},mobileOffset:{bottom:44,left:16}});function Ga(){return(0,G.jsx)(`script`,{"data-agent-native-beta-redirect":`1`,dangerouslySetInnerHTML:{__html:Er(c(`/_agent-native/auth/session`),l())}})}function Ka(){return(0,G.jsx)(`script`,{"data-agent-native-session-bootstrap":`1`,dangerouslySetInnerHTML:{__html:Or(c(`/_agent-native/auth/session`))}})}function qa(){return te()?(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(ka,{}),(0,G.jsx)(ja,{})]}):null}var Ja=null;function Ya(){return Ja??=D(()=>import(`./webmcp-Drp02xB2.js`),__vite__mapDeps([0,1,2]))}function Xa({excludeActionNames:e}){return(0,U.useEffect)(()=>{let t=!1,n=null;return Ya().then(({createAgentNativeServerActionWebMcpRegistration:r})=>{t||(n=r({excludeActionNames:e}),n.start().catch(()=>{}))}).catch(()=>{}),()=>{t=!0,n?.stop()}},[JSON.stringify(e??[])]),null}function Za({excludeActionNames:e}){let{status:t}=ge(),n=(0,U.useRef)(null),r=(0,U.useRef)(null),i=JSON.stringify(e??[]);return(0,U.useEffect)(()=>{if(t===`unauthenticated`||t===`signing-out`){n.current?.stop(),n.current=null,r.current=null;return}if(t!==`authenticated`||n.current&&r.current===i)return;n.current?.stop(),n.current=null,r.current=null;let a=!1,o=g(()=>{Ya().then(({createAgentNativeServerActionWebMcpRegistration:t})=>{if(a)return;let o=t({excludeActionNames:e});o.start().catch(()=>{}),n.current=o,r.current=i}).catch(()=>{})});return()=>{a=!0,o()}},[t,i]),(0,U.useEffect)(()=>()=>{n.current?.stop(),n.current=null,r.current=null},[]),null}function Qa({requireSession:e=!1,excludeActionNames:t}={}){return e?(0,G.jsx)(Za,{excludeActionNames:t}):(0,G.jsx)(Xa,{excludeActionNames:t})}function $a(){return Tr([`meta[name="application-name"]`,`meta[name="apple-mobile-web-app-title"]`,`meta[property="og:site_name"]`].map(e=>document.querySelector(e)?.content??``).find(e=>K(e)),`Agent-Native`)}function eo(){let{setTheme:e}=fr();return(0,U.useEffect)(()=>{let t=t=>{t&&(Va(document.documentElement,t),e(t.theme))},n=e=>{window.parent===window||e.source!==window.parent||t(Ba(e.data))},r=e=>{e instanceof CustomEvent&&t(Ba(e.detail))};return window.addEventListener(`message`,n),window.addEventListener(La,r),()=>{window.removeEventListener(`message`,n),window.removeEventListener(La,r)}},[e]),null}function to({fallbackTitle:e}){let t=(0,U.useRef)(null);if(t.current===null&&typeof document<`u`){let e=document.title.trim();K(e)&&(t.current=e)}return(0,U.useEffect)(()=>{let n=Tr(t.current??e??$a(),e??`Agent-Native`),r=()=>{let e=document.title.trim();if(K(e)){n=e;return}let t=Tr(n,`Agent-Native`);e!==t&&(document.title=t)};r();let i=new MutationObserver(r);return i.observe(document.head,{characterData:!0,childList:!0,subtree:!0}),()=>i.disconnect()},[e]),null}function no({queryClient:e,defaultTheme:t=`system`,themeAttribute:n=`class`,tooltipDelayDuration:r,toaster:i=Wa,disableThemeTransitions:a=!0,disableWebMcp:o,webMcpExcludeActionNames:s,sessionBypass:c,i18n:l,documentTitleFallback:u,showProductionEnvironmentBadge:d,showEnvironmentBadge:f,children:p}){let m=l===!1?p:(0,G.jsx)(dt,{...l??{},children:p});return(0,G.jsx)(pe,{client:e,children:(0,G.jsxs)(pr,{attribute:n,defaultTheme:t,enableSystem:!0,disableTransitionOnChange:a,children:[(0,G.jsx)(eo,{}),(0,G.jsxs)(Be,{delayDuration:r,children:[!o&&(0,G.jsx)(Qa,{requireSession:!c,excludeActionNames:s}),m,(0,G.jsx)(to,{fallbackTitle:u}),(0,G.jsx)(Pa,{}),(0,G.jsx)(qa,{}),f?(0,G.jsx)(qi,{showProduction:d}):null,i]})]})})}function ro(e){return e===!1||e?.persistPreference!==void 0?e:{...e??{},persistPreference:!1}}function io({queryClient:e,isPublicPath:t=!1,clientOnlyFallback:n,sessionBypass:r=!1,disableWebMcp:i=!1,webMcpExcludeActionNames:a,showEnvironmentBadge:o=!1,defaultTheme:s,themeAttribute:c,tooltipDelayDuration:l,toaster:u,disableThemeTransitions:d,i18n:f,documentTitleFallback:p,children:m}){let h=n??(0,G.jsx)(Pe,{});return t?(0,G.jsx)(no,{queryClient:e,defaultTheme:s,themeAttribute:c,tooltipDelayDuration:l,toaster:u,disableThemeTransitions:d,disableWebMcp:i,webMcpExcludeActionNames:a,sessionBypass:r,i18n:ro(f),documentTitleFallback:p,showProductionEnvironmentBadge:!1,showEnvironmentBadge:o,children:m}):(0,G.jsxs)(G.Fragment,{children:[!r&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(Ka,{}),(0,G.jsx)(Ga,{})]}),(0,G.jsx)(Ar,{fallback:h,children:(0,G.jsx)(no,{queryClient:e,defaultTheme:s,themeAttribute:c,tooltipDelayDuration:l,toaster:u,disableThemeTransitions:d,disableWebMcp:i,webMcpExcludeActionNames:a,sessionBypass:r,i18n:f,documentTitleFallback:p,showProductionEnvironmentBadge:!r,showEnvironmentBadge:o,children:(0,G.jsx)(Me,{bypass:r,fallback:h,children:r?m:(0,G.jsx)(qe,{children:m})})})})]})}var ao=`inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer`,oo={"en-US":{loadingLatest:`Loading the latest version...`,genericTitle:`Something went wrong`,genericDetails:`An unexpected error occurred.`,notFoundTitle:`Page not found`,notFoundDetails:`We couldn't find this page.`,statusTitle:e=>`${e} Error`,goHome:`Go home`,sendFeedback:`Send feedback`,feedbackPlaceholder:`Describe what happened before this error appeared.`,openGitHubIssue:`Open GitHub issue`},"zh-CN":{loadingLatest:`正在加载最新版本...`,genericTitle:`出错了`,genericDetails:`发生了意外错误。`,notFoundTitle:`页面未找到`,notFoundDetails:`我们找不到这个页面。`,statusTitle:e=>`${e} 错误`,goHome:`回到首页`,sendFeedback:`发送反馈`,feedbackPlaceholder:`描述此错误出现前发生了什么。`,openGitHubIssue:`打开 GitHub issue`},"zh-TW":{loadingLatest:`正在載入最新版本...`,genericTitle:`發生錯誤`,genericDetails:`發生未預期的錯誤。`,notFoundTitle:`找不到頁面`,notFoundDetails:`找不到這個頁面。`,statusTitle:e=>`${e} 錯誤`,goHome:`回首頁`,sendFeedback:`傳送意見回饋`,feedbackPlaceholder:`描述此錯誤出現前發生了什麼。`,openGitHubIssue:`開啟 GitHub issue`},"es-ES":{loadingLatest:`Cargando la versión más reciente...`,genericTitle:`Algo salió mal`,genericDetails:`Se produjo un error inesperado.`,notFoundTitle:`Página no encontrada`,notFoundDetails:`No pudimos encontrar esta página.`,statusTitle:e=>`Error ${e}`,goHome:`Ir al inicio`,sendFeedback:`Enviar comentarios`,feedbackPlaceholder:`Describe qué pasó antes de que apareciera este error.`,openGitHubIssue:`Abrir issue en GitHub`},"fr-FR":{loadingLatest:`Chargement de la dernière version...`,genericTitle:`Un problème est survenu`,genericDetails:`Une erreur inattendue s'est produite.`,notFoundTitle:`Page introuvable`,notFoundDetails:`Nous n'avons pas trouvé cette page.`,statusTitle:e=>`Erreur ${e}`,goHome:`Accueil`,sendFeedback:`Envoyer un retour`,feedbackPlaceholder:`Décrivez ce qui s'est passé avant cette erreur.`,openGitHubIssue:`Ouvrir une issue GitHub`},"de-DE":{loadingLatest:`Neueste Version wird geladen...`,genericTitle:`Etwas ist schiefgelaufen`,genericDetails:`Ein unerwarteter Fehler ist aufgetreten.`,notFoundTitle:`Seite nicht gefunden`,notFoundDetails:`Wir konnten diese Seite nicht finden.`,statusTitle:e=>`Fehler ${e}`,goHome:`Zur Startseite`,sendFeedback:`Feedback senden`,feedbackPlaceholder:`Beschreiben Sie, was vor diesem Fehler passiert ist.`,openGitHubIssue:`GitHub-Issue öffnen`},"ja-JP":{loadingLatest:`最新バージョンを読み込み中...`,genericTitle:`問題が発生しました`,genericDetails:`予期しないエラーが発生しました。`,notFoundTitle:`ページが見つかりません`,notFoundDetails:`このページは見つかりませんでした。`,statusTitle:e=>`${e} エラー`,goHome:`ホームへ`,sendFeedback:`フィードバックを送信`,feedbackPlaceholder:`このエラーの直前に起きたことを説明してください。`,openGitHubIssue:`GitHub issue を開く`},"ko-KR":{loadingLatest:`최신 버전을 불러오는 중...`,genericTitle:`문제가 발생했습니다`,genericDetails:`예기치 않은 오류가 발생했습니다.`,notFoundTitle:`페이지를 찾을 수 없음`,notFoundDetails:`이 페이지를 찾을 수 없습니다.`,statusTitle:e=>`${e} 오류`,goHome:`홈으로 이동`,sendFeedback:`피드백 보내기`,feedbackPlaceholder:`이 오류가 나타나기 전에 무슨 일이 있었는지 적어 주세요.`,openGitHubIssue:`GitHub issue 열기`},"pt-BR":{loadingLatest:`Carregando a versão mais recente...`,genericTitle:`Algo deu errado`,genericDetails:`Ocorreu um erro inesperado.`,notFoundTitle:`Página não encontrada`,notFoundDetails:`Não encontramos esta página.`,statusTitle:e=>`Erro ${e}`,goHome:`Ir para início`,sendFeedback:`Enviar feedback`,feedbackPlaceholder:`Descreva o que aconteceu antes deste erro aparecer.`,openGitHubIssue:`Abrir issue no GitHub`},"hi-IN":{loadingLatest:`नवीनतम संस्करण लोड हो रहा है...`,genericTitle:`कुछ गलत हो गया`,genericDetails:`एक अनपेक्षित त्रुटि हुई।`,notFoundTitle:`पेज नहीं मिला`,notFoundDetails:`हमें यह पेज नहीं मिला।`,statusTitle:e=>`${e} त्रुटि`,goHome:`होम पर जाएं`,sendFeedback:`फ़ीडबैक भेजें`,feedbackPlaceholder:`इस त्रुटि से पहले क्या हुआ, उसका वर्णन करें।`,openGitHubIssue:`GitHub issue खोलें`},"ar-SA":{loadingLatest:`جار تحميل أحدث إصدار...`,genericTitle:`حدث خطأ ما`,genericDetails:`حدث خطأ غير متوقع.`,notFoundTitle:`الصفحة غير موجودة`,notFoundDetails:`تعذر العثور على هذه الصفحة.`,statusTitle:e=>`خطأ ${e}`,goHome:`العودة للرئيسية`,sendFeedback:`إرسال الملاحظات`,feedbackPlaceholder:`صف ما حدث قبل ظهور هذا الخطأ.`,openGitHubIssue:`فتح مشكلة في GitHub`}};function so(){if(typeof window>`u`)return lt;let e=window[st]?.locale,t=window.localStorage?.getItem(ct);return ot(e)??ot(t)??`en-US`}function co(){let[e,t]=(0,U.useState)(so);return(0,U.useEffect)(()=>{t(so())},[]),oo[e]??oo[`en-US`]}function lo(){(0,U.useEffect)(()=>{let e=document.documentElement;if(!(e.classList.contains(`dark`)||e.classList.contains(`light`)))try{let t=localStorage.getItem(`theme`);t===`dark`?e.classList.add(`dark`):t===`light`?e.classList.add(`light`):window.matchMedia(`(prefers-color-scheme: dark)`).matches&&e.classList.add(`dark`)}catch{}},[])}function uo(e){return e instanceof Error?e.message:typeof e==`string`?e:``}function fo(e){return S(e)&&e.status===404}function po(e){let[t,n]=(0,U.useState)(()=>f(uo(e)));return(0,U.useEffect)(()=>{if(!f(uo(e))){n(!1);return}a(e)||n(!1)},[e]),t}function mo(){return(0,G.jsx)(`main`,{className:`flex items-center justify-center min-h-screen p-4 bg-background text-foreground`,children:(0,G.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:co().loadingLatest})})}function ho({error:e}){let t=co(),r=po(e),i=(0,U.useRef)(null);if((0,U.useEffect)(()=>{!e||r||fo(e)||i.current===e||(i.current=e,h(e,{tags:{boundary:`react-router-error-screen`},extra:{path:typeof window>`u`?void 0:window.location.pathname}}))},[e,r]),r)return(0,G.jsx)(mo,{});let a=null,o=t.genericTitle,s=t.genericDetails,c;S(e)?(a=e.status,fo(e)?(o=t.notFoundTitle,s=t.notFoundDetails):(o=t.statusTitle(e.status),s=e.statusText||s)):e instanceof Error?(e.message&&(s=e.message),typeof process<`u`&&(c=e.stack)):typeof e==`string`&&e&&(s=e),typeof console<`u`&&e&&console.error(`[ErrorBoundary]`,e);let l=fo(e);return(0,G.jsx)(`main`,{className:`flex items-center justify-center min-h-screen p-4 bg-background text-foreground`,children:(0,G.jsxs)(`div`,{className:`flex flex-col items-center text-center max-w-md`,children:[a&&(0,G.jsx)(`span`,{className:`text-7xl font-bold tracking-tight text-muted-foreground/40`,children:a}),(0,G.jsx)(`h1`,{className:`mt-3 text-2xl font-semibold`,children:o}),(0,G.jsx)(`p`,{className:`mt-2 text-muted-foreground text-sm`,children:s}),(0,G.jsxs)(`div`,{className:`mt-6 flex flex-col items-center gap-2`,children:[(0,G.jsx)(`a`,{href:n(`/`),className:ao,children:t.goHome}),!l&&(0,G.jsx)(Ye,{appName:`Agent-Native`,title:o,details:s,status:a,issueTitle:`Error screen: ${o}`,feedbackLabel:t.sendFeedback,feedbackPlaceholder:t.feedbackPlaceholder,githubLabel:t.openGitHubIssue,feedbackClassName:`h-9`,githubClassName:`h-9`})]}),c&&(0,G.jsx)(`pre`,{className:`mt-6 w-full text-start text-xs overflow-auto p-4 bg-muted rounded`,children:(0,G.jsx)(`code`,{children:c})})]})})}function go(){return(0,G.jsx)(ho,{error:ee()})}function _o(){return lo(),te()?(0,G.jsx)(go,{}):(0,G.jsx)(ho,{error:void 0})}function vo({children:e}){return(0,G.jsx)(jr,{children:(0,G.jsx)(`div`,{className:`flex h-screen w-full flex-col overflow-hidden bg-background text-foreground`,children:(0,G.jsx)(`main`,{className:`agent-native-app-main min-w-0 flex-1 overflow-y-auto overscroll-contain`,children:e})})})}var yo=Mi({}),bo={Button:B};function xo({children:e}){return(0,G.jsx)(tt,{components:bo,designSystem:yo,children:e})}var So=`agent-native:workspace-app-route`;function Co(e){if(typeof e!=`string`||!e.startsWith(`/`)||e.startsWith(`//`)||/[\u0000-\u001f\u007f]/.test(e))return null;try{let t=new URL(e,`http://agent-native.invalid`);return`${t.pathname}${t.search}${t.hash}`}catch{return null}}function wo(e){if(typeof window>`u`)return!1;let t=window.parent;if(!t||t===window)return!1;let n=Co(e);if(!n)return!1;let r={type:So,path:n};return t.postMessage(r,`*`),!0}var To=/^[A-Za-z0-9_-]{1,96}$/;function Eo(e){if(typeof e!=`string`)return;let t=e.trim();return To.test(t)?t:void 0}function Do(){return typeof window>`u`?void 0:Eo(O())}function Oo(e,t){return t?`${e}:${t}`:e}function ko(e){return{pathname:e.pathname,search:e.search,hash:e.hash,searchParams:new URLSearchParams(e.search),location:e}}function Ao(e){return Array.from(new Set(e))}function jo(e){if(e&&typeof e==`object`&&`_writeId`in e){let t=e._writeId;if(typeof t==`string`&&t)return t}return JSON.stringify(e)}function Mo(e){return`${e.pathname}${e.search}${e.hash}`}function No(e,t){if(Object.is(e,t))return!0;if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(!Object.prototype.hasOwnProperty.call(t,r)||!Object.is(e[r],t[r]))return!1;return!0}function Po(e,t){try{let n=JSON.stringify({keys:e,state:t});if(typeof n==`string`)return n}catch{}return t}function Fo(e,t,n){let r=typeof e==`function`?e(t,n):e;return r?r===!0?{}:r:!1}function Io(e){let{commandRefetchInterval:t=15e3,enabled:n=!0,keepalive:r=!0,writeDebounceMs:i=0}=e,a=(0,U.useMemo)(()=>Eo(e.browserTabId)??(e.browserTabId===void 0?Do():void 0),[e.browserTabId]),o=e.requestSource??a,s=he(),c=(0,U.useMemo)(()=>Ao(e.navigationKeys??[Oo(`navigation`,a)]),[a,e.navigationKeys]),l=(0,U.useMemo)(()=>Ao(e.commandKeys??[Oo(`navigate`,a)]),[a,e.commandKeys]),u=(0,U.useMemo)(()=>e.commandQueryKey??[`navigate-command`,a??`global`],[a,e.commandQueryKey]),d=e.state??null,f=(0,U.useMemo)(()=>Po(c,d),[c,d]),p=(0,U.useRef)(e.getCommandDedupKey),m=(0,U.useRef)(e.onCommand),h=(0,U.useRef)(e.onError);p.current=e.getCommandDedupKey,m.current=e.onCommand,h.current=e.onError;let g=(0,U.useRef)(null);(0,U.useEffect)(()=>{if(!n||g.current===f)return;g.current=f;let e=()=>{for(let e of c)le(e,d,{keepalive:r,requestSource:o}).catch(e=>h.current?.(e))};if(i>0){let t=setTimeout(e,i);return()=>clearTimeout(t)}e()},[n,r,c,d,f,o,i]);let _=fe({queryKey:u,enabled:n,retry:!1,refetchInterval:t,queryFn:async()=>{for(let e of l){let t=await ce(e);if(t!=null)return{key:e,command:t}}return null}}),v=(0,U.useCallback)(async()=>{await Promise.all(l.map(e=>ue(e,{requestSource:o}).catch(e=>{h.current?.(e)}))),s.setQueryData(u,null)},[l,u,s,o]),y=(0,U.useRef)(null);return(0,U.useEffect)(()=>{let e=_.data;if(!n||!e)return;let t=p.current?.(e.command)??jo(e.command),r=()=>{ue(e.key,{requestSource:o}).catch(e=>h.current?.(e)),s.setQueryData(u,null)};if(y.current===t){r();return}y.current=t,r(),Promise.resolve(m.current(e.command)).catch(e=>h.current?.(e))},[_.data,u,n,s,o]),{navigationState:d,command:_.data,commandQueryKey:u,clearCommand:v}}function Lo(e){let{navigationKey:t=`navigation`,commandKey:n=`navigate`}=e,r=C(),a=ne(),o=(0,U.useMemo)(()=>Eo(e.browserTabId)??(e.browserTabId===void 0?Do():void 0),[e.browserTabId]),s=e.writeGlobalNavigation??!1,c=e.readGlobalCommandFallback??!1;(0,U.useEffect)(()=>{e.enabled!==!1&&wo(`${r.pathname}${r.search}${r.hash}`)},[r.hash,r.pathname,r.search,e.enabled]);let l=(0,U.useMemo)(()=>{let e=[Oo(t,o)];return o&&s&&e.push(t),Ao(e)},[o,t,s]),u=(0,U.useMemo)(()=>{let e=Oo(n,o),t=[e];return(!o||c)&&n!==e&&t.push(n),Ao(t)},[o,n,c]),d=(0,U.useMemo)(()=>e.commandQueryKey??[`navigate-command`,o??`global`,n],[o,n,e.commandQueryKey]),f=(0,U.useMemo)(()=>ko(r),[r]),p=e.getNavigationState(f)??null,m=(0,U.useRef)(p);No(m.current,p)||(m.current=p);let h=m.current;return Io({state:h,navigationKeys:l,commandKeys:u,commandQueryKey:d,browserTabId:o,requestSource:e.requestSource??o,commandRefetchInterval:e.refetchInterval,enabled:e.enabled,keepalive:e.keepalive,writeDebounceMs:e.writeDebounceMs,getCommandDedupKey:e.getCommandDedupKey,onError:e.onError,onCommand:t=>{let n=e.getCommandPath(t);if(!n||(e.onNavigate?.(t,n),n===Mo(r)))return;let o=e.navigateOptions,s=typeof o==`function`?o(t):o;if(i(n)){s?.replace?window.location.replace(n):window.location.assign(n);return}let c=Fo(e.agentChatViewTransition,t,n),l=()=>a(n,s);if(c){ht(a,n,s);return}l()}})}var Ro=O();function zo(){Lo({browserTabId:Ro,requestSource:Ro,getNavigationState:({pathname:e})=>{let t=Bo(e);return{view:Vo(e),path:n(e),...t?{threadId:t}:{}}},getCommandPath:e=>Wo(e.path||Uo(e))})}function Bo(e){let t=e.match(/^\/chat\/([^/]+)/);if(!t)return null;try{return decodeURIComponent(t[1]).trim()||null}catch{return null}}function Vo(e){return e===`/admin-login`?`admin-login`:e===`/admin`?`admin-dashboard`:e===`/publisher`?`publisher-dashboard`:e===`/advertiser`?`advertiser-dashboard`:e===`/user`?`user-dashboard`:`home`}function Ho(e){switch(e){case`admin-login`:return`/admin-login`;case`admin-dashboard`:return`/admin`;case`publisher-dashboard`:return`/publisher`;case`advertiser-dashboard`:return`/advertiser`;case`user-dashboard`:return`/user`;case`home`:return`/`;default:return`/`}}function Uo(e){let t=Ho(e?.view);if(t!==`/`)return t;let n=typeof e?.threadId==`string`?e.threadId.trim():``;return n?`/chat/${encodeURIComponent(n)}`:`/`}function Wo(e){let t=u();return t?e===t?`/`:e.startsWith(`${t}/`)?e.slice(t.length)||`/`:e:e}var Go=`nevora`,Ko=`Nevora`,qo=Go,Jo=Ko,Yo=`/assets/global-CFb9gcWZ.css`;v({getDefaultProps:(e,t)=>({...t,app:qo})});var Xo=()=>[{rel:`stylesheet`,href:Yo}],Zo=Ua();function Qo({children:e}){return(0,G.jsxs)(`html`,{lang:`id`,suppressHydrationWarning:!0,children:[(0,G.jsxs)(`head`,{children:[(0,G.jsx)(`meta`,{charSet:`utf-8`}),(0,G.jsx)(`meta`,{name:`viewport`,content:`width=device-width, initial-scale=1`}),(0,G.jsx)(`script`,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:Zo}}),(0,G.jsx)(`meta`,{name:`theme-color`,content:`#f2f8ff`}),(0,G.jsx)(`meta`,{name:`mobile-web-app-capable`,content:`yes`}),(0,G.jsx)(`meta`,{name:`apple-mobile-web-app-status-bar-style`,content:`black-translucent`}),(0,G.jsx)(`meta`,{name:`apple-mobile-web-app-title`,content:Jo}),(0,G.jsx)(`link`,{rel:`icon`,type:`image/svg+xml`,href:n(`/favicon.svg`)}),(0,G.jsx)(`link`,{rel:`apple-touch-icon`,href:n(`/icon-180.svg`)}),(0,G.jsx)(ie,{}),(0,G.jsx)(ae,{})]}),(0,G.jsxs)(`body`,{children:[e,(0,G.jsx)(E,{}),(0,G.jsx)(oe,{})]})]})}function $o(){let{pathname:e}=C(),t=ne();return(0,U.useEffect)(()=>{if(e===`/install`)return;let r=!0;return fetch(n(`/api/installer/status`)).then(e=>e.json()).then(e=>{r&&e.installed===!1&&t(n(`/install`),{replace:!0})}).catch(()=>void 0),()=>{r=!1}},[t,e]),null}function es(){let e=he();return zo(),ar({queryClient:e,ignoreSource:Ro}),null}var ts=re(function(){let[e]=(0,U.useState)(()=>de());return(0,G.jsx)(xo,{children:(0,G.jsxs)(io,{queryClient:e,isPublicPath:[`/`,`/advertiser`,`/publisher`,`/user`,`/admin-login`,`/install`].includes(C().pathname),children:[(0,G.jsxs)(Ar,{children:[(0,G.jsx)(es,{}),(0,G.jsx)($o,{})]}),(0,G.jsx)(vo,{children:(0,G.jsx)(T,{})})]})})});export{_o as ErrorBoundary,Qo as Layout,ts as default,Xo as links};