var e=globalThis,r={},t={},i=e.parcelRequire4f74;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in t){var i=t[e];delete t[e];var n={id:e,exports:{}};return r[e]=n,i.call(n.exports,n,n.exports),n.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){t[e]=r},e.parcelRequire4f74=i),i.register;var n=i("7vzAp"),l=i("9DS0H");class o{constructor(e){this.rules=e}produce(e,r){let t=e;for(let e=0;e<r;e++)t=this.produce_step(t);return t}produce_step(e){let r="";for(let t=0;t<e.length;t++){let i=e[t];r+=this.rules[i]}return r}}new n.Page("DOL-Systems",function(e){let r,t,i,n;e.windowResized=()=>{r=.75*window.innerWidth,t=.75*window.innerHeight,i=r/25,n=t/10,e.resizeCanvas(r,t,!1),e.background(l.antique_white(e))};let s=new o({R:"LS",L:"MR",S:"R",M:"L"});e.setup=()=>{e.createCanvas(r,t),e.colorMode(e.HSL),e.background(128),e.windowResized()};let a=0,c=1e3;e.draw=()=>{e.millis()>c&&(c=e.millis()+1e3,(a+=1)>10&&(e.background(128),a=0)),function(l,o,s){for(let f of l){var a,c,u,d;if(o>=r||s>=t)return;switch(f){case"R":o+=(a=o,e.fill("grey"),e.rect(a,s,2*i,n),2*i);break;case"S":o+=(c=o,e.fill("grey"),e.rect(c,s,i,n),i);break;case"L":o+=(u=o,e.fill("white"),e.rect(u,s,2*i,n),2*i);break;case"M":o+=(d=o,e.fill("white"),e.rect(d,s,i,n),i)}}}(s.produce("R",a),0,a*n)}});
//# sourceMappingURL=index.35ea45a6.js.map