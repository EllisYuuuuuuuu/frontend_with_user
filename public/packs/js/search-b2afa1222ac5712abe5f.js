!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/packs/",n(n.s=19)}({19:function(e,t){window.submitChat=function(){var e=document.getElementById("level").value,t=document.getElementById("budget").value,n=document.getElementById("email").value;if(""===e||""===t)return result_area=document.getElementById("hardware_info"),void(result_area.innerText="Need level and budget");var r="http://ec2-54-172-72-63.compute-1.amazonaws.com:5011/recommend?level="+e+"&budget="+t,o={level:e,budget:t};""!==n&&(r=r+"&email="+n,o.email=n,console.log(r)),apigClientFactory.newClient().recommendGet(o,{}).then((function(e){console.log(e.data);var t=e.data.body;console.log(t);var n=["CPU","GPU","RAM","SSD","HDD","USB"];document.getElementById("hardware_info").innerText="Here is our recommendations: (More results are send to your email) \n";for(var r=0;r<n.length;r++){var o=n[r],l=t[o],u=document.getElementById(o);u.innerText=o+":\n ",u.innerText+=l[0]}})).catch((function(e){console.log(JSON.stringify(e))}))}}});
//# sourceMappingURL=search-b2afa1222ac5712abe5f.js.map