import{i as e,n as t,r as n,t as r}from"./react-BezrgUck.js";import{n as i,r as a,t as o}from"./turndown-BSW1Tolb.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var s=e(),c=n(),l=t(),u=1500,d=[`http`,`https`,`mailto`],f=`<h1>Heading</h1>
<p>
  This includes <strong>bold</strong>, <em>italic</em>, and <code>inline code</code>.
</p>
<ul>
  <li>Unordered item one</li>
  <li>Unordered item two</li>
</ul>
<ol>
  <li>Ordered item one</li>
  <li>Ordered item two</li>
</ol>
<p>
  Visit <a href="https://example.com">Example</a> for more details.
</p>
<p>
  <img
    src="https://picsum.photos/100"
    alt="Sample image"
  />
</p>
<blockquote>
  <p>Blockquote</p>
</blockquote>
<pre><code class="language-javascript">const greeting = "Hello";
console.log(greeting);
</code></pre>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sanitization</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>Determinism</td>
      <td>Required</td>
    </tr>
  </tbody>
</table>
<hr />
<ul>
  <li><input type="checkbox" checked /> Completed checklist item</li>
  <li><input type="checkbox" /> Pending checklist item</li>
</ul>
`,p=new Set(`a.blockquote.br.code.del.em.h1.h2.h3.h4.h5.h6.hr.img.input.li.ol.p.pre.s.strong.table.tbody.td.th.thead.tr.ul`.split(`.`)),m=new a({bulletListMarker:`-`,codeBlockStyle:`fenced`,emDelimiter:`_`,headingStyle:`atx`,strongDelimiter:`**`});m.use(i),m.addRule(`listItemSingleSpace`,{filter:`li`,replacement:(e,t,n)=>{let r=t.parentNode?.nodeName===`OL`?`${String(Array.prototype.indexOf.call(t.parentNode.children,t)+1)}. `:`${n.bulletListMarker??`-`} `;return r+e.trim().replace(/\n/gm,`
`+` `.repeat(r.length))+(t.nextSibling?`
`:``)}}),m.addRule(`dropUnsupportedTagsKeepContent`,{filter:e=>{if(e.nodeType!==Node.ELEMENT_NODE)return!1;let t=e.nodeName.toLowerCase();return!p.has(t)},replacement:e=>e});function h(e){return new DOMParser().parseFromString(e,`text/html`).body.innerHTML}function g(e){let t=e.trim();if(!t.length)return``;try{let e=h(t);return m.turndown(e).replace(/\n{3,}/gu,`

`).trim()}catch{return``}}function _(e,t){let n,r=(...r)=>{n!==void 0&&globalThis.clearTimeout(n),n=globalThis.setTimeout(()=>{n=void 0,e(...r)},t)};return r.cancel=()=>{n!==void 0&&(globalThis.clearTimeout(n),n=void 0)},r}var v=new Set(d);function y(e){let t=e.trim(),n=/^([a-zA-Z][a-zA-Z\d+.-]*):/u.exec(t);if(!n)return!0;let r=n[1].toLowerCase();return!v.has(r)}function b(e){let t=new DOMParser().parseFromString(e,`text/html`),n=!1;return t.querySelectorAll(`[href], [src], [onabort], [onerror], [onload], [onclick]`).forEach(e=>{Array.from(e.attributes).forEach(t=>{let r=t.name.toLowerCase();if(r.startsWith(`on`)){e.removeAttribute(t.name),n=!0;return}(r===`href`||r===`src`)&&y(t.value)&&(e.removeAttribute(t.name),n=!0)})}),{sanitizedHtml:t.body.innerHTML,removedScriptStyle:!1,removedUnsafeAttrs:n}}function x(e){let t=new DOMParser().parseFromString(e,`text/html`).querySelector(`script, style`)!==null,{removedUnsafeAttrs:n,sanitizedHtml:r}=b(o.sanitize(e,{FORBID_TAGS:[`script`,`style`]}));return{sanitizedHtml:r,removedScriptStyle:t,removedUnsafeAttrs:n}}async function S(e){try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}var C=r(),w=`Copy`,T=`Copied`;function E(e){let t=(0,l.c)(27),{markdown:n,mobilePane:r,onTogglePane:i}=e,[a,o]=(0,s.useState)(w),[c,d]=(0,s.useState)(!1),f=(0,s.useRef)(null),p,m;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(p=()=>()=>{f.current&&clearTimeout(f.current)},m=[],t[0]=p,t[1]=m):(p=t[0],m=t[1]),(0,s.useEffect)(p,m);let h;t[2]===n?h=t[3]:(h=async function(){n.length&&await S(n)&&(f.current&&clearTimeout(f.current),o(T),d(!0),f.current=setTimeout(()=>{o(w),d(!1)},u))},t[2]=n,t[3]=h);let g=h,_=r===`html`?`Markdown`:`HTML`,v;t[4]===Symbol.for(`react.memo_cache_sentinel`)?(v=(0,C.jsx)(`h1`,{className:`text-xl font-bold text-gray-900 sm:text-2xl dark:text-white`,children:`HTML to Markdown`}),t[4]=v):v=t[4];let y;t[5]===Symbol.for(`react.memo_cache_sentinel`)?(y=(0,C.jsx)(`a`,{"aria-label":`GitHub repository`,className:`hidden h-9 w-9 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 md:flex dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700`,href:`https://github.com/remarkablemark/html-to-markdown`,rel:`noopener noreferrer`,target:`_blank`,title:`View on GitHub`,children:(0,C.jsx)(`svg`,{"aria-hidden":`true`,className:`h-5 w-5`,fill:`currentColor`,viewBox:`0 0 24 24`,children:(0,C.jsx)(`path`,{d:`M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z`})})}),t[5]=y):y=t[5];let b=`Switch to ${_}`,x=`Switch to ${_}`,E;t[6]===Symbol.for(`react.memo_cache_sentinel`)?(E=(0,C.jsx)(`svg`,{"aria-hidden":`true`,className:`h-5 w-5`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,viewBox:`0 0 24 24`,children:(0,C.jsx)(`path`,{d:`M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4`})}),t[6]=E):E=t[6];let D;t[7]!==i||t[8]!==b||t[9]!==x?(D=(0,C.jsx)(`button`,{"aria-label":b,className:`cursor-pointer rounded border border-slate-300 bg-white p-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 md:hidden dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700`,onClick:i,title:x,type:`button`,children:E}),t[7]=i,t[8]=b,t[9]=x,t[10]=D):D=t[10];let O=`h-9 cursor-pointer rounded border border-slate-300 p-2 text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:text-sm md:font-medium dark:border-slate-600 ${c?`scale-95 bg-green-500 text-white hover:bg-green-500 dark:bg-green-600 dark:text-white dark:hover:bg-green-600`:`bg-blue-500 hover:bg-blue-600`}`,k=!n.length,A;t[11]===g?A=t[12]:(A=()=>{g()},t[11]=g,t[12]=A);let j;t[13]===c?j=t[14]:(j=(0,C.jsx)(`svg`,{"aria-hidden":`true`,className:`h-5 w-5 md:hidden`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,viewBox:`0 0 24 24`,children:c?(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(`path`,{d:`M20 6 9 17l-5-5`})}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`rect`,{height:`13`,rx:`2`,ry:`2`,width:`13`,x:`9`,y:`9`}),(0,C.jsx)(`path`,{d:`M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1`})]})}),t[13]=c,t[14]=j);let M;t[15]===a?M=t[16]:(M=(0,C.jsx)(`span`,{className:`hidden md:inline`,children:a}),t[15]=a,t[16]=M);let N;t[17]!==a||t[18]!==O||t[19]!==k||t[20]!==A||t[21]!==j||t[22]!==M?(N=(0,C.jsxs)(`button`,{"aria-label":a,className:O,disabled:k,onClick:A,title:`Copy Markdown`,type:`button`,children:[j,M]}),t[17]=a,t[18]=O,t[19]=k,t[20]=A,t[21]=j,t[22]=M,t[23]=N):N=t[23];let P;return t[24]!==N||t[25]!==D?(P=(0,C.jsxs)(`header`,{className:`sticky top-0 z-10 flex h-16 items-center justify-between gap-3 border-b border-slate-300 bg-gray-50 px-4 py-2 dark:border-slate-700 dark:bg-gray-800`,children:[v,(0,C.jsxs)(`div`,{className:`flex items-center gap-2`,children:[y,D,N]})]}),t[24]=N,t[25]=D,t[26]=P):P=t[26],P}function D(e){let t=(0,l.c)(14),{headerLabel:n,id:r,name:i,onChange:a,className:o,readOnly:s,value:c}=e,u=s===void 0?!1:s,d=`min-h-0 flex-col md:flex ${o}`,f;t[0]===n?f=t[1]:(f=(0,C.jsx)(`span`,{className:`block border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100`,children:n}),t[0]=n,t[1]=f);let p=`min-h-0 w-full flex-1 resize-none border-0 bg-white p-3 font-mono text-sm leading-7 text-slate-900 outline-none dark:bg-slate-900 dark:text-slate-100 ${n===`Markdown`?`dark:md:bg-slate-800`:``}`,m;t[2]!==r||t[3]!==i||t[4]!==a||t[5]!==u||t[6]!==p||t[7]!==c?(m=(0,C.jsx)(`textarea`,{className:p,id:r,name:i,onChange:a,readOnly:u,value:c}),t[2]=r,t[3]=i,t[4]=a,t[5]=u,t[6]=p,t[7]=c,t[8]=m):m=t[8];let h;return t[9]!==r||t[10]!==d||t[11]!==f||t[12]!==m?(h=(0,C.jsxs)(`label`,{className:d,htmlFor:r,children:[f,m]}),t[9]=r,t[10]=d,t[11]=f,t[12]=m,t[13]=h):h=t[13],h}function O(e){let t=g(x(e).sanitizedHtml);return{markdown:t,isEmpty:!t.length}}var k={rawHtml:f,origin:`sample`,updatedAtMs:Date.now()};function A(){let[e,t]=(0,s.useState)(k),[n,r]=(0,s.useState)(()=>O(k.rawHtml)),[i,a]=(0,s.useState)(`html`),o=(0,s.useRef)(null);o.current??=_(e=>{r(O(e))},300),(0,s.useEffect)(()=>()=>{o.current?.cancel()},[]),(0,s.useEffect)(()=>{e.origin!==`sample`&&o.current?.(e.rawHtml)},[e.origin,e.rawHtml]);function c(e){t({rawHtml:e.currentTarget.value,origin:`user`,updatedAtMs:Date.now()})}function l(){a(e=>e===`html`?`markdown`:`html`)}return(0,C.jsxs)(`section`,{className:`flex min-h-0 flex-1 flex-col overflow-hidden`,children:[(0,C.jsx)(E,{markdown:n.markdown,mobilePane:i,onTogglePane:l}),(0,C.jsxs)(`div`,{className:`grid min-h-0 flex-1 md:grid-cols-2`,children:[(0,C.jsx)(D,{headerLabel:`HTML`,id:`html-input`,name:`htmlInput`,onChange:c,className:`${i===`html`?`flex`:`hidden`} md:border-r md:border-slate-300 dark:md:border-slate-700`,value:e.rawHtml}),(0,C.jsx)(D,{headerLabel:`Markdown`,id:`markdown-output`,name:`markdownOutput`,className:i===`markdown`?`flex`:`hidden`,readOnly:!0,value:n.markdown})]})]})}function j(){let e=(0,l.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,C.jsx)(`main`,{className:`flex min-h-screen w-full flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100`,children:(0,C.jsx)(A,{})}),e[0]=t):t=e[0],t}(0,c.createRoot)(document.getElementById(`root`)).render((0,C.jsx)(s.StrictMode,{children:(0,C.jsx)(j,{})}));