(this["webpackJsonpbuckets-viewer"]=this["webpackJsonpbuckets-viewer"]||[]).push([[0],{205:function(e,t){},207:function(e,t){},218:function(e,t){},220:function(e,t){},246:function(e,t){},248:function(e,t){},249:function(e,t){},254:function(e,t){},256:function(e,t){},262:function(e,t){},264:function(e,t){},283:function(e,t){},295:function(e,t){},298:function(e,t){},309:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c(49),s=c(106),a=c(171),o=c(8),i=c(172),l=c.n(i),u=c(173),d=c.n(u),j=c(174),b=c.n(j),O=c(320),h=c(312),f=c(1),x=function(e){var t=e.accounts,c=e.currency,n=t.filter((function(e){return""===e[3]})),r=t.filter((function(e){return"offbudget"===e[3]}));return Object(f.jsxs)(O.a,{defaultActiveKey:[0],alwaysOpen:!0,children:[Object(f.jsxs)(O.a.Item,{eventKey:0,children:[Object(f.jsx)(O.a.Header,{children:"Budget Accounts"}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),n.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{style:{width:"30%"},children:c.format(e[2]/100)})]},e[0])}))]})})})]}),Object(f.jsxs)(O.a.Item,{eventKey:1,children:[Object(f.jsx)(O.a.Header,{children:"Off Budget Accounts"}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),r.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{style:{width:"30%"},children:c.format(e[2]/100)})]},e[0])}))]})})})]})]})},S=function(e){var t=e.buckets,c=e.bucketCats,n=e.currency;return Object(f.jsx)(O.a,{defaultActiveKey:[],alwaysOpen:!0,children:Array.from(t.entries()).map((function(e){return console.log(e,c),Object(f.jsxs)(O.a.Item,{eventKey:c.values[e[0]-1][0],children:[Object(f.jsx)(O.a.Header,{children:c.values[e[0]-1][1]}),Object(f.jsx)(O.a.Body,{children:Object(f.jsx)(h.a,{striped:!0,hover:!0,bordered:!0,children:Object(f.jsxs)("tbody",{children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Balance"})]}),e[1].map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e[1]}),Object(f.jsx)("td",{style:{width:"30%"},children:n.format(e[2]/100)})]},e[0])}))]})})})]},c.values[e[0]-1][0])}))})},g=c(314),p=c(313),v=function(e){e.accessToken;var t=e.setAccessToken,c=function(){var e;(e="https://accounts.google.com/gsi/client",new Promise((function(t,c){if(document.querySelector('script[src="'.concat(e,'"]')))return t();var n=document.createElement("script");n.src=e,n.onload=function(){return t()},n.onerror=function(e){return c(e)},document.body.appendChild(n)}))).then((function(){window.google.accounts.oauth2.initTokenClient({client_id:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_CLIENT_ID,scope:"https://www.googleapis.com/auth/drive.readonly",callback:function(e){t(e.access_token)}}).requestAccessToken()}))};return Object(f.jsxs)(p.a,{variant:"light",onClick:function(){return c()},children:[Object(f.jsx)(g.a,{})," Reload"]})},m=c(318),y=c(315),E=c(319),k=c(321),_=c(316),w=c(317);var T=function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),c=t[0],i=t[1],u=l()(),j=Object(o.a)(u,2),O=j[0],h=j[1],g=Object(n.useState)(null),T=Object(o.a)(g,2),I=T[0],C=T[1],A=Object(n.useState)(null),D=Object(o.a)(A,2),R=D[0],N=D[1],K=Object(n.useState)(null),B=Object(o.a)(K,2),P=B[0],U=B[1],F=Object(n.useState)(null),H=Object(o.a)(F,2),L=H[0],W=H[1],J=Object(n.useState)("buckets"),V=Object(o.a)(J,2),M=V[0],q=V[1],z=Object(n.useState)(null),G=Object(o.a)(z,2),Y=G[0],Q=G[1],X=Object(n.useState)(null),Z=Object(o.a)(X,2),$=Z[0],ee=Z[1],te=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),ce=function(){O({clientId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_CLIENT_ID,developerKey:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_DEVELOPER_KEY,viewId:"DOCS",showUploadView:!0,showUploadFolders:!0,supportDrives:!0,multiselect:!0,customScopes:["https://www.googleapis.com/auth/drive.file"],viewMimeTypes:"application/octet-stream",callbackFunction:function(e){"cancel"===e.action&&console.log("User clicked cancel/close button"),"picked"===e.action&&(console.log(e),C(e.docs[0].id),localStorage.setItem("fileId",e.docs[0].id))}})};return Object(n.useEffect)((function(){if((h||$)&&I){var e=h?h.access_token:$,t=function(){var t=Object(a.a)(Object(s.a)().mark((function t(){var c,n,r,a;return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c={headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/x-sqlite3"},responseType:"arraybuffer"},t.next=3,d.a.get("https://www.googleapis.com/drive/v3/files/".concat(I,"?alt=media"),c);case 3:return n=t.sent,r=new Uint8Array(n.data),t.next=7,b()({locateFile:function(e){return"https://sql.js.org/dist/".concat(e)}});case 7:a=t.sent,i(new a.Database(r));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();console.log(h,I),localStorage.setItem("fileId",I),t()}console.log(I,h||$)}),[h,$,I]),Object(n.useEffect)((function(){if(c){var e=c.exec("SELECT id, name, balance, group_id FROM bucket WHERE kicked = 0")[0].values.reduce((function(e,t){return e.set(t[3],[].concat(Object(r.a)(e.get(t[3])||[]),[t]))}),new Map);N(e),localStorage.setItem("buckets",JSON.stringify(Array.from(e)));var t=c.exec("SELECT id, name FROM bucket_group")[0];U(t),localStorage.setItem("bucketCats",JSON.stringify(t));var n=c.exec("SELECT id, name, balance, kind FROM account WHERE closed = 0")[0].values;W(n),localStorage.setItem("accounts",JSON.stringify(n)),Q(new Date),localStorage.setItem("lastUpdated",JSON.stringify(new Date))}}),[c]),Object(n.useEffect)((function(){localStorage.getItem("buckets")&&N(new Map(JSON.parse(localStorage.getItem("buckets")))),localStorage.getItem("bucketCats")&&U(JSON.parse(localStorage.getItem("bucketCats"))),localStorage.getItem("accounts")&&W(JSON.parse(localStorage.getItem("accounts"))),localStorage.getItem("lastUpdated")&&Q(new Date(JSON.parse(localStorage.getItem("lastUpdated")))),localStorage.getItem("fileId")&&C(localStorage.getItem("fileId"))}),[]),R&&P&&L?Object(f.jsxs)("div",{children:[Object(f.jsx)(m.a,{bg:"dark",variant:"dark",children:Object(f.jsxs)(y.a,{children:[Object(f.jsxs)(m.a.Brand,{children:[Object(f.jsx)(_.a,{color:"white",style:{position:"relative",bottom:2}})," Buckets Viewer"]}),Object(f.jsxs)("div",{style:{textAlign:"right"},children:[Object(f.jsx)(v,{accessToken:$,setAccessToken:ee})," ",Object(f.jsxs)(p.a,{variant:"light",onClick:function(){return ce()},children:[Object(f.jsx)(w.a,{})," Select New File"]})]})]})}),Object(f.jsxs)(y.a,{children:[Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsxs)(E.a,{activeKey:M,onSelect:function(e){return q(e)},children:[Object(f.jsx)(k.a,{eventKey:"buckets",title:"Buckets",children:Object(f.jsx)(S,{buckets:R,bucketCats:P,currency:te})}),Object(f.jsx)(k.a,{eventKey:"accounts",title:"Accounts",children:Object(f.jsx)(x,{accounts:L,currency:te})})]}),Y?Object(f.jsxs)("p",{children:[Object(f.jsx)("br",{}),"Last updated ",Y.toString()]}):null]})]}):Object(f.jsx)("div",{style:{height:"100vh"},className:"d-flex align-items-center justify-content-center",children:Object(f.jsxs)("div",{style:{textAlign:"center"},children:[Object(f.jsx)(p.a,{size:"lg",variant:"primary",onClick:function(){return ce()},children:"Select Budget"}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("p",{children:"Welcome to Buckets Viewer. Use the button to select your .buckets file from Google Drive."})]})})},I=c(175);Object(I.createRoot)(document.getElementById("root")).render(Object(f.jsx)(T,{}))}},[[309,1,2]]]);
//# sourceMappingURL=main.455343a7.chunk.js.map