(this["webpackJsonpcrypto-advisor"]=this["webpackJsonpcrypto-advisor"]||[]).push([[0],{390:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(66),i=n.n(c),s=n(48),o=n(67),u=function(){function e(){Object(s.a)(this,e),this._data={montly_deposit_help:"This is the amount you are ready to invest monthly. A consistent monthly contribution is the most profitable and safest way to invest in the crypto market",risklevel_help:"The Risk Level is simply volatility you are ready to have for your portfolio. The more your portfolio volatile, the higher gains you're likely to have. But keep in mind, if the market falls, you're likely to experience larger losses.",contibutions_help:"Based on your risk level, these are contributions you should make monthly",expectation_help:"This expectation chart is based on your monthly contribution and your portfolio's risk level. It assumes that you will be investing monthly for the next 5 years"}}return Object(o.a)(e,[{key:"get",value:function(e){return this._data[e]||""}}]),e}(),l=Object(r.createContext)(),h=n(27),p=n.n(h),d=n(21),b=n(40),j=function(e,t){var n,r,a;e=e||[],n=t,r=0,a=Object.keys(f).length-1,n=+n,t=(Number.isNaN(n)?null:Math.max(r,Math.min(n,a)))||0;var c=Object.assign({},f[t]);return e.sort((function(e,t){return+e.rank-+t.rank})).slice(0,c.holdings.length).forEach((function(e,t){c.holdings[t]=Object.assign(c.holdings[t],e)})),c},f={0:{label:"Conservative",holdings:[{percent:80},{percent:10},{percent:10},{percent:0},{percent:0},{percent:0}]},1:{label:"Conservative",holdings:[{percent:75},{percent:15},{percent:10},{percent:0},{percent:0},{percent:0}]},2:{label:"Conservative",holdings:[{percent:70},{percent:20},{percent:10},{percent:0},{percent:0},{percent:0}]},3:{label:"Balanced",holdings:[{percent:65},{percent:20},{percent:10},{percent:5},{percent:0},{percent:0}]},4:{label:"Balanced",holdings:[{percent:60},{percent:20},{percent:10},{percent:10},{percent:0},{percent:0}]},5:{label:"Balanced",holdings:[{percent:60},{percent:25},{percent:10},{percent:5},{percent:0},{percent:0}]},6:{label:"Balanced",holdings:[{percent:55},{percent:25},{percent:12},{percent:5},{percent:3},{percent:0}]},7:{label:"Growth",holdings:[{percent:50},{percent:30},{percent:13},{percent:4},{percent:3},{percent:0}]},8:{label:"Growth",holdings:[{percent:50},{percent:30},{percent:13},{percent:4},{percent:2},{percent:1}]},9:{label:"Growth",holdings:[{percent:50},{percent:30},{percent:10},{percent:4},{percent:3},{percent:3}]}},x=n(3),v=[31,28,31,30,31,30,31,31,30,31,30,31],m=function(e){e=e||new Date;var t=new Date(e.getTime());t.setFullYear(e.getFullYear()-1),t.setDate(1),t.setHours(0,0,0);var n=new Date(e.getTime());return n.setTime(n.getTime()-864e5),[parseInt(t.getTime()/1e3),parseInt(n.getTime()/1e3)]},O="https://api.coingecko.com/api/v3",g=function e(){var t=this;Object(s.a)(this,e),this._historicalPriceData=null,this._topCoins=null,this.extractMonthlyCoinPricesForPastYear=function(){var e=Object(b.a)(p.a.mark((function e(n){var r,a,c,i,s,o,u,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t._historicalPriceData){e.next=2;break}return e.abrupt("return",t._historicalPriceData);case 2:r=[],a=m(new Date),c=Object(x.a)(a,2),i=c[0],s=c[1],o=Object(d.a)(n);try{for(o.s();!(u=o.n()).done;)l=u.value,r.push(t.extractMonthlyPricesForPeriod(l,i,s))}catch(h){o.e(h)}finally{o.f()}return e.next=8,Promise.all(r);case 8:return t._historicalPriceData=e.sent,e.abrupt("return",t._historicalPriceData);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.extractMonthlyPricesForPeriod=function(){var e=Object(b.a)(p.a.mark((function e(t,n,r){var a,c,i,s,o,u,l,h,d,b;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(O,"/coins/").concat(t.id,"/market_chart/range?from=").concat(n,"&to=").concat(r,"&vs_currency=USD"),{redirect:"follow",method:"GET"});case 2:return a=e.sent,e.next=5,a.json();case 5:if(c=e.sent,!((i=c.prices).length<365)){e.next=9;break}throw new Error("Received too little data, got ".concat(i.length));case 9:for(s=[],o=0,u=0;u<12;u++)l=new Date(i[o][0]),h=l.getMonth(),j=h,d=v[Math.min(v.length,Math.max(j,0))],1===h&&(d+=+((p=l).getFullYear()%4===0&&p.getFullYear()%100!==0||p.getFullYear()%100===0&&p.getFullYear()%400===0)),b=i.slice(o,o+d).map((function(e){return+e[1]})),s.push({start:i[o][1],end:i[o+d-1][1],prices:b,average:b.reduce((function(e,t){return e+t}),0)/d}),o+=d;return e.abrupt("return",{pricesForEachMonth:s,id:t.id,symbol:t.symbol,image:t.image});case 13:case"end":return e.stop()}var p,j}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),this.retrieveTopCoins=function(){var e=Object(b.a)(p.a.mark((function e(n,r){var a,c,i,s,o,u,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t._topCoins){e.next=2;break}return e.abrupt("return",t._topCoins);case 2:return a=(r||[]).reduce((function(e,t){return e[t]=!0,e}),{}),c=[],e.prev=4,e.next=7,fetch("".concat(O,"/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=false"),{method:"GET",redirect:"follow"});case 7:if((i=e.sent).ok){e.next=10;break}throw new Error("Received ".concat(i.status,": ").concat(i.statusText));case 10:return e.next=12,i.json();case 12:s=e.sent,o=Object(d.a)(s),e.prev=14,o.s();case 16:if((u=o.n()).done){e.next=23;break}if(l=u.value,a[l.symbol.toLowerCase()]||c.push(l),c.length!==n){e.next=21;break}return e.abrupt("break",23);case 21:e.next=16;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(14),o.e(e.t0);case 28:return e.prev=28,o.f(),e.finish(28);case 31:e.next=36;break;case 33:e.prev=33,e.t1=e.catch(4),console.error("Failed to retrieve top coins",e.t1);case 36:return e.abrupt("return",c);case 37:case"end":return e.stop()}}),e,null,[[4,33],[14,25,28,31]])})));return function(t,n){return e.apply(this,arguments)}}()},y=function(){var e=Object(b.a)(p.a.mark((function e(t,n){var r,a,c,i,s,o,u,l,h,b;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=t||[],n=+n,Number.isNaN(n)&&(n=150),r={},a=Object(d.a)(t),e.prev=5,a.s();case 7:if((c=a.n()).done){e.next=30;break}for(i=c.value,e.prev=9,s=[],o=i.pricesForEachMonth.length-1;o>=0&&s.length<2*n;o--)s.unshift.apply(s,i.pricesForEachMonth[o].prices);if(!(s.length<2*n)){e.next=15;break}return console.error("Insufficient amount of price information for ".concat(i.id)),e.abrupt("continue",28);case 15:for(u=s.slice(s.length-2*n,s.length-n).reduce((function(e,t){return e+ +t}),0),r[i.id]={},r[i.id].deviations=[],r[i.id].averages=[],r[i.id].original=i,l=s.length-n;l<s.length;l++)u+=+s[l],u-=+s[l-n],h=u/n,r[i.id].averages.push(h),r[i.id].deviations.push(100*Math.abs(Math.abs(h)-Math.abs(+s[l]))/Math.abs(h));r[i.id].averageDeviation=r[i.id].deviations.reduce((function(e,t){return e+t}),0)/r[i.id].deviations.length,e.next=28;break;case 24:e.prev=24,e.t0=e.catch(9),console.error("Failed to fetch historical data for ",i.id),console.error(e.t0);case 28:e.next=7;break;case 30:e.next=35;break;case 32:e.prev=32,e.t1=e.catch(5),a.e(e.t1);case 35:return e.prev=35,a.f(),e.finish(35);case 38:return(b=Object.keys(r).map((function(e){return Object.assign({statistics:{averageDeviation:r[e].averageDeviation,averages:r[e].averages,deviations:r[e].deviations}},r[e].original)})).sort((function(e,t){return e.statistics.averageDeviation-t.statistics.averageDeviation}))).forEach((function(e,t){return e.statistics.rank=t+1})),e.abrupt("return",b);case 41:case"end":return e.stop()}}),e,null,[[5,32,35,38],[9,24]])})));return function(t,n){return e.apply(this,arguments)}}(),k=function(e,t,n){var r,a;return e+12*t+(r=12*t,a=n,a.map((function(e){return r*(e.percent/100)*(e.yearlyChange/100)}))).reduce((function(e,t){return e+t}),0)},w=function(e,t,n){return e/100*(10*Math.log(n)+2*t)},_=function(e){var t=e.pricesForEachMonth[e.pricesForEachMonth.length-1].average;return{yearlyChange:100*(t-e.pricesForEachMonth[0].average)/t,percent:e.percent}},C=function(){function e(){Object(s.a)(this,e),this._dynamicCoins=null,this._numberOfCoinsToFetch=6,this._coinFilterList=["usdc","usdt"],this._lengthOfSma=150,this._dataRepository=new g}return Object(o.a)(e,[{key:"getCoinAllocationsFor",value:function(){var e=Object(b.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==this._dynamicCoins){e.next=13;break}return e.t0=y,e.t1=this._dataRepository,e.next=5,this._dataRepository.retrieveTopCoins(this._numberOfCoinsToFetch,this._coinFilterList);case 5:return e.t2=e.sent,e.next=8,e.t1.extractMonthlyCoinPricesForPastYear.call(e.t1,e.t2);case 8:return e.t3=e.sent,e.t4=this._lengthOfSma,e.next=12,(0,e.t0)(e.t3,e.t4);case 12:this._dynamicCoins=e.sent;case 13:return e.abrupt("return",j(this._dynamicCoins,t-1));case 14:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"predictProfitForTheNext",value:function(){var e=Object(b.a)(p.a.mark((function e(t,n,r,a,c){var i,s,o,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(i=c.map(_),s=[],o=1;o<=t;o++)n=k(n,r,i),u=w(n,a,o),s.push({maxAmount:n+u,minAmount:n-u});return e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r,a,c){return e.apply(this,arguments)}}()}]),e}(),F=Object(r.createContext)(),M=Object(r.createContext)(),D=n(426),P=n(420),S=n(402),T=n(427),E=n(409),W=n(406),N=n(424),L=n(423),Y=n(417),A=n(418),B=n(422),R=n(431),I=n(4);function K(e){var t=e.text,n=Object(r.useState)(!1),a=Object(x.a)(n,2),c=a[0],i=a[1];return Object(I.jsx)(S.a,{pb:"2px",children:Object(I.jsx)(B.a,{hasArrow:!0,placement:"auto",rounded:"lg",p:"3%",label:t,isOpen:c,children:Object(I.jsx)(R.a,{onMouseEnter:function(){return i(!0)},onMouseLeave:function(){return i(!1)},onClick:function(){return i(!0)},color:"gray.400"})})})}var z=n(428),G=n(429),$=n(407),J=n(408);function U(e){var t=e.holdings,n=e.deposit,a=Object(r.useContext)(l);return Object(I.jsxs)(S.a,{children:[Object(I.jsxs)(T.a,{children:[Object(I.jsx)(W.a,{fontWeight:"medium",children:"Monthly Contribution"}),Object(I.jsx)(K,{text:a.get("contibutions_help")})]}),Object(I.jsx)(z.a,{ml:{base:"3%",sm:"5%",md:"5%",xl:"7%"},columns:{base:2,md:3},spacing:{base:"20px",md:"40px"},children:t.map((function(e){return Object(I.jsxs)(T.a,{children:[Object(I.jsx)(G.a,{boxSize:{base:"50px",md:"64px"},name:e.symbol,src:e.image}),Object(I.jsx)($.a,{children:Object(I.jsxs)(J.a,{children:[Object(I.jsx)(J.c,{style:{fontWeight:"bold",textTransform:"uppercase"},children:e.symbol}),Object(I.jsxs)(J.d,{fontSize:{base:"1em",md:"1.2em"},children:["$",(t=n,r=e.percent,t&&r?Number.parseFloat(t*(r/100)).toFixed(2):Number.parseFloat(0).toFixed(2))]}),Object(I.jsxs)(J.b,{children:[e.percent,"%"]})]})})]},e.id);var t,r}))})]})}var H=n(410),q=n(411),Q=n(228),V=n(229),X=n(235),Z=n(111);function ee(e){var t=e.monthlyDeposit,n=e.riskLevel,a=e.holdings,c=Object(r.useContext)(l),i=Object(r.useContext)(F),s=Object(r.useState)([{year:(new Date).getFullYear(),usd:[t,t]}]),o=Object(x.a)(s,2),u=o[0],h=o[1];return t=Number.parseFloat(t),Object(r.useEffect)((function(){(function(){var e=Object(b.a)(p.a.mark((function e(){var r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(new Date).getFullYear(),e.next=3,i.predictProfitForTheNext(5,t,t,n,a);case 3:c=e.sent,h(c.map((function(e,t){return Object.assign({},{year:r+t+1,usd:[e.minAmount,e.maxAmount]})})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,n,i,a]),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(S.a,{children:Object(I.jsxs)(T.a,{children:[Object(I.jsxs)(W.a,{fontWeight:"medium",children:["In ",u.length," years you will likely have"]}),Object(I.jsxs)(E.a,{size:"md",children:["$",u[u.length-1].usd[0].toFixed(2),"-",u[u.length-1].usd[1].toFixed(2)]}),Object(I.jsx)(K,{text:c.get("expectation_help")})]})}),Object(I.jsx)(S.a,{h:"300px",children:Object(I.jsx)(H.a,{width:"100%",height:"100%",children:Object(I.jsxs)(q.a,{data:u,children:[Object(I.jsx)(Q.a,{dataKey:"year",interval:"preserveStartEnd"}),Object(I.jsx)(V.a,{domain:[0,"auto"],hide:!0}),Object(I.jsx)(X.a,{type:"monotone",dataKey:"usd",name:"$",stroke:"#3182ce",fill:"#4299e199"}),Object(I.jsx)(Z.a,{formatter:function(e){return"".concat(e[0].toFixed(2)," - ").concat(e[1].toFixed(2))},position:{x:"auto",y:100}})]})})})]})}var te="deposit",ne="riskLevel";function re(){var e=Object(r.useContext)(l),t=Object(r.useContext)(F),n=Object(r.useContext)(M),a=Object(r.useState)(+n.get(te,100)),c=Object(x.a)(a,2),i=c[0],s=c[1],o=Object(r.useState)(+n.get(ne,5)),u=Object(x.a)(o,2),h=u[0],d=u[1],j=Object(r.useState)([]),f=Object(x.a)(j,2),v=f[0],m=f[1],O=Object(r.useState)(""),g=Object(x.a)(O,2),y=g[0],k=g[1],w=Object(r.useState)(!0),_=Object(x.a)(w,2),C=_[0],D=_[1];return Object(r.useEffect)((function(){(function(){var e=Object(b.a)(p.a.mark((function e(){var r,a,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(i>0)){e.next=11;break}return e.next=3,t.getCoinAllocationsFor(h);case 3:return r=e.sent,a=r.holdings,c=r.label,D(!1),k(c),m(a),e.next=11,Promise.all([n.updateWithDelay(te,i),n.updateWithDelay(ne,h)]);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[i,h,t,n]),Object(I.jsx)(S.a,{borderWidth:"1px",w:{base:"90%",sm:"80%",md:"70%",xl:"45%"},rounded:"lg",m:"auto",mt:{base:"5%"},mb:{base:"5%"},p:"30px",shadow:"md",children:Object(I.jsxs)(T.b,{spacing:4,align:"stretch",children:[Object(I.jsx)(T.a,{align:"center",children:Object(I.jsx)(E.a,{fontWeight:"extrabold",children:"CryptoWealth"})}),Object(I.jsxs)(T.a,{children:[Object(I.jsx)(W.a,{fontWeight:"medium",children:"Monthly Deposit"}),Object(I.jsx)(K,{text:e.get("montly_deposit_help")})]}),Object(I.jsxs)(N.c,{value:i,min:0,step:10,onChange:function(e){return s(e)},children:[Object(I.jsx)(N.d,{}),Object(I.jsxs)(N.e,{children:[Object(I.jsx)(N.b,{}),Object(I.jsx)(N.a,{})]})]}),Object(I.jsxs)(S.a,{children:[Object(I.jsxs)(T.a,{children:[Object(I.jsxs)(W.a,{fontWeight:"medium",children:["Risk Level (",y,")"]}),Object(I.jsx)(K,{text:e.get("risklevel_help")})]}),Object(I.jsxs)(L.a,{name:"riskLevel",value:h,min:1,max:10,step:1,onChange:function(e){return d(e)},children:[Object(I.jsxs)(L.d,{children:[Object(I.jsx)(S.a,{position:"relative",right:10}),Object(I.jsx)(L.b,{})]}),Object(I.jsx)(L.c,{boxSize:6})]})]}),Object(I.jsx)(Y.a,{my:"5"}),C?Object(I.jsx)(A.a,{size:"xl",emptyColor:"gray.200",color:"blue.500",display:C?"block":"none",mx:"5"}):Object(I.jsx)(U,{holdings:v,deposit:i}),Object(I.jsx)(ee,{monthlyDeposit:i,riskLevel:h,holdings:v})]})})}var ae=n(419),ce=Object(ae.a)({config:{initialColorMode:"light",useSystemColorMode:!1}}),ie=n(231),se=n.n(ie),oe=function(){function e(){Object(s.a)(this,e),this._debouncedKeys={}}return Object(o.a)(e,[{key:"updateWithDelay",value:function(e,t){return this._debouncedKeys[e]||(this._debouncedKeys[e]=se()(this.update.bind(this),3e3)),this._debouncedKeys[e](e,t)}},{key:"update",value:function(e,t){document.cookie="".concat(e,"=").concat(t,"; SameSite=Strict")}},{key:"get",value:function(e,t){var n=document.cookie.split("; ").find((function(t){return t.startsWith("".concat(e,"="))}));return n&&n.split("=")[1]||t}}]),e}(),ue=new C,le=new oe,he=new u;var pe=function(){return Object(I.jsx)(l.Provider,{value:he,children:Object(I.jsx)(F.Provider,{value:ue,children:Object(I.jsx)(M.Provider,{value:le,children:Object(I.jsxs)(D.a,{theme:ce,children:[Object(I.jsx)(P.a,{}),Object(I.jsx)(re,{})]})})})})},de=n(421);i.a.render(Object(I.jsxs)(a.a.StrictMode,{children:[Object(I.jsx)(de.a,{initialColorMode:ce.config.initialColorMode}),Object(I.jsx)(pe,{})]}),document.getElementById("root"))}},[[390,1,2]]]);
//# sourceMappingURL=main.3fd74fb4.chunk.js.map