var e=globalThis,r={},o={},t=e.parcelRequire4f74;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var l={id:e,exports:{}};return r[e]=l,t.call(l.exports,l,l.exports),l.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){o[e]=r},e.parcelRequire4f74=t),t.register,new(t("7vzAp")).Page("Hello Color",function(e){e.setup=()=>{e.createCanvas(800,600),e.colorMode(e.HSL)},e.draw=()=>{e.background(128);let r=800/15;for(let o=0;o<15;o++)for(let t=0;t<15;t++){let l=40*t,n=o*r;e.fill(360*o/15,45,100*t/15),e.rect(n,l,r,40)}}});
//# sourceMappingURL=index.1b75e2e2.js.map