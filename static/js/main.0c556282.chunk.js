(this["webpackJsonpbuckets-viewer"]=this["webpackJsonpbuckets-viewer"]||[]).push([[0],{205:function(e,t){},207:function(e,t){},218:function(e,t){},220:function(e,t){},246:function(e,t){},248:function(e,t){},249:function(e,t){},254:function(e,t){},256:function(e,t){},262:function(e,t){},264:function(e,t){},283:function(e,t){},295:function(e,t){},298:function(e,t){},307:function(e,t,c){},310:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c(49),s=c(106),a=c(171),i=c(8),o=c(172),l=c.n(o),u=c(173),j=c.n(u),d=c(174),b=c.n(d),O=c(321),h=c(313),f=c(1),x=function(e){var t=e.accounts,c=e.currency,n=t.filter((function(e){return""===e[3]})),r=t.filter((function(e){return"offbudget"===e[3]}));return Object(f.jsxs)(O.a,{defaultActiveKey:[0],alwaysOpen:!0,children:[Object(f.jsxs)(O.a.Item,{eventKey:0,children:[Object(f.jsx)(O.a.Header,{children:"Budget Accounts"}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),n.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{children:c.format(e[2]/100)})]},e[0])}))]})})})]}),Object(f.jsxs)(O.a.Item,{eventKey:1,children:[Object(f.jsx)(O.a.Header,{children:"Off Budget Accounts"}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),r.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{children:c.format(e[2]/100)})]},e[0])}))]})})})]})]})},p=function(e){var t=e.buckets,c=e.bucketCats,n=e.currency;return Object(f.jsx)(O.a,{defaultActiveKey:[],alwaysOpen:!0,children:Array.from(t.entries()).map((function(e,t){return Object(f.jsxs)(O.a.Item,{eventKey:t,children:[Object(f.jsx)(O.a.Header,{children:c.values[e[0]-1]?c.values[e[0]-1][1]:"Misc"}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),e[1].map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{children:n.format(e[2]/100)})]},e[0])}))]})})})]},t)}))})},g=c(315),m=c(314),v=function(e){e.accessToken;var t=e.setAccessToken,c=function(){var e;(e="https://accounts.google.com/gsi/client",new Promise((function(t,c){if(document.querySelector('script[src="'.concat(e,'"]')))return t();var n=document.createElement("script");n.src=e,n.onload=function(){return t()},n.onerror=function(e){return c(e)},document.body.appendChild(n)}))).then((function(){window.google.accounts.oauth2.initTokenClient({client_id:"758483264841-9kmp9h0v8qghfn8e7d4k5mjg99d0fpn8.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.readonly",callback:function(e){t(e.access_token)}}).requestAccessToken()}))};return Object(f.jsxs)(m.a,{variant:"light",onClick:function(){return c()},children:[Object(f.jsx)(g.a,{})," Reload"]})},y=c(319),k=c(316),S=c(320),w=c(322),I=c(317),A=c(318);c(307);var C=function(){var e=Object(n.useState)(null),t=Object(i.a)(e,2),c=t[0],o=t[1],u=l()(),d=Object(i.a)(u,2),O=d[0],h=d[1],g=Object(n.useState)(null),C=Object(i.a)(g,2),N=C[0],B=C[1],E=Object(n.useState)(null),T=Object(i.a)(E,2),J=T[0],K=T[1],U=Object(n.useState)(null),q=Object(i.a)(U,2),D=q[0],R=q[1],F=Object(n.useState)(null),M=Object(i.a)(F,2),H=M[0],L=M[1],z=Object(n.useState)("buckets"),_=Object(i.a)(z,2),P=_[0],V=_[1],W=Object(n.useState)(null),G=Object(i.a)(W,2),Q=G[0],X=G[1],Y=Object(n.useState)(null),Z=Object(i.a)(Y,2),$=Z[0],ee=Z[1],te=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),ce=function(){O({clientId:"758483264841-9kmp9h0v8qghfn8e7d4k5mjg99d0fpn8.apps.googleusercontent.com",developerKey:"AIzaSyAmKw4RxJhq67-H-M2HkjoqibzJN5fzqds",viewId:"DOCS",showUploadView:!0,showUploadFolders:!0,supportDrives:!0,multiselect:!0,customScopes:["https://www.googleapis.com/auth/drive.file"],viewMimeTypes:"application/octet-stream",callbackFunction:function(e){"cancel"===e.action&&console.log("User clicked cancel/close button"),"picked"===e.action&&(B(e.docs[0].id),localStorage.setItem("fileId",e.docs[0].id))}})};return Object(n.useEffect)((function(){if((h||$)&&N){var e=h?h.access_token:$,t=function(){var t=Object(a.a)(Object(s.a)().mark((function t(){var c,n,r,a;return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c={headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/x-sqlite3"},responseType:"arraybuffer"},t.next=3,j.a.get("https://www.googleapis.com/drive/v3/files/".concat(N,"?alt=media"),c);case 3:return n=t.sent,r=new Uint8Array(n.data),t.next=7,b()({locateFile:function(e){return"https://sql.js.org/dist/".concat(e)}});case 7:a=t.sent,o(new a.Database(r));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();localStorage.setItem("fileId",N),t()}}),[h,$,N]),Object(n.useEffect)((function(){if(c){var e=c.exec("SELECT id, name, balance, group_id FROM bucket WHERE kicked = 0")[0].values.reduce((function(e,t){return e.set(t[3],[].concat(Object(r.a)(e.get(t[3])||[]),[t]))}),new Map);K(e),localStorage.setItem("buckets",JSON.stringify(Array.from(e)));var t=c.exec("SELECT id, name FROM bucket_group")[0];R(t),localStorage.setItem("bucketCats",JSON.stringify(t));var n=c.exec("SELECT id, name, balance, kind FROM account WHERE closed = 0")[0].values;L(n),localStorage.setItem("accounts",JSON.stringify(n)),X(new Date),localStorage.setItem("lastUpdated",JSON.stringify(new Date))}}),[c]),Object(n.useEffect)((function(){localStorage.getItem("buckets")&&K(new Map(JSON.parse(localStorage.getItem("buckets")))),localStorage.getItem("bucketCats")&&R(JSON.parse(localStorage.getItem("bucketCats"))),localStorage.getItem("accounts")&&L(JSON.parse(localStorage.getItem("accounts"))),localStorage.getItem("lastUpdated")&&X(new Date(JSON.parse(localStorage.getItem("lastUpdated")))),localStorage.getItem("fileId")&&B(localStorage.getItem("fileId"))}),[]),J&&D&&H?Object(f.jsxs)("div",{children:[Object(f.jsx)(y.a,{bg:"dark",variant:"dark",children:Object(f.jsxs)(k.a,{children:[Object(f.jsxs)(y.a.Brand,{children:[Object(f.jsx)(I.a,{color:"white",style:{position:"relative",bottom:2}})," ","Buckets Viewer"]}),Object(f.jsxs)("div",{style:{textAlign:"right"},children:[Object(f.jsx)(v,{accessToken:$,setAccessToken:ee})," ",Object(f.jsxs)(m.a,{variant:"light",onClick:function(){return ce()},children:[Object(f.jsx)(A.a,{})," Select New File"]})]})]})}),Object(f.jsxs)(k.a,{children:[Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsxs)(S.a,{activeKey:P,onSelect:function(e){return V(e)},children:[Object(f.jsx)(w.a,{eventKey:"buckets",title:"Buckets",children:Object(f.jsx)(p,{buckets:J,bucketCats:D,currency:te})}),Object(f.jsx)(w.a,{eventKey:"accounts",title:"Accounts",children:Object(f.jsx)(x,{accounts:H,currency:te})})]}),Object(f.jsxs)("div",{className:"footer",children:[Q?Object(f.jsxs)("p",{children:[Object(f.jsx)("br",{}),"Last loaded ",Q.toString()]}):null,Object(f.jsxs)("p",{children:["\xa92022 Dustin Lammiman."," ",Object(f.jsx)("a",{href:"privacy.html",children:"Privacy Policy"}),". This website is not associated with One Part Rain, LLC."]})]})]})]}):Object(f.jsx)("div",{style:{height:"100vh"},className:"d-flex align-items-center justify-content-center",children:Object(f.jsxs)("div",{style:{textAlign:"center"},children:[Object(f.jsx)(m.a,{size:"lg",variant:"primary",onClick:function(){return ce()},children:"Select Budget"}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Welcome to Buckets Viewer. Use the button to select your .buckets file from Google Drive."})]})})},N=c(175);Object(N.createRoot)(document.getElementById("root")).render(Object(f.jsx)(C,{}))}},[[310,1,2]]]);
//# sourceMappingURL=main.0c556282.chunk.js.map