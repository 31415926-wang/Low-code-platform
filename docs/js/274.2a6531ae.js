"use strict";(self["webpackChunkquestion_star"]=self["webpackChunkquestion_star"]||[]).push([[274],{8465:function(e,a,r){r.d(a,{A:function(){return i}});var t=r(1877);const u={class:"card-box"},n={class:"card-form"},l={class:"card-title"};var o=(0,t.pM)({__name:"cardBox",setup(e){return(e,a)=>((0,t.uX)(),(0,t.CE)("div",u,[(0,t.Lk)("div",n,[(0,t.Lk)("div",l,[(0,t.RG)(e.$slots,"title")]),(0,t.RG)(e.$slots,"form")])]))}}),s=r(91139);const c=(0,s.A)(o,[["__scopeId","data-v-5ffda8ca"]]);var i=c},84274:function(e,a,r){r.r(a),r.d(a,{default:function(){return h}});r(45680);var t=r(1877),u=r(80725),n=r(89588),l=r(8465);const o=[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1[3-9]\d{9}$/,message:"请输入合法的11位手机号",trigger:"blur"}];var s=r(86545),c=r(79669);function i(){const e=(0,u.KR)(6e4),a=(0,u.KR)(!1);return(0,t.wB)(a,(r=>{r&&setInterval((()=>{0===e.value&&(a.value=!1,e.value=6e4),e.value=e.value-1e3}),1e3)})),{timeNumber:e,timeSwitch:a}}var d=r(86803),v=r(99397);const m={key:0},p={key:1};var f=(0,t.pM)({__name:"phoneLogin",setup(e){const a=(0,v.lq)(),r=(0,v.rd)(),f=(0,d.P)(),b={phoneNumber:o,veriCode:[{required:!0,message:"请输入四位验证码",trigger:"change"},{len:4,message:"验证码长度为四位数字",trigger:"change"}]},h=(0,u.KR)(),g=(0,u.Kh)({phoneNumber:"",veriCode:""}),{timeNumber:k,timeSwitch:_}=i(),y=()=>{h.value.validate().then((async()=>{f.dispatch("userStore/phoneLogin",g).then((()=>{setTimeout((()=>{r.push(a.query.redirect?a.query.redirect:"/")}),2e3)})).catch((e=>{console.log(e)}))})).catch((()=>{console.log("校验不通过")}))},C=()=>{h.value?.validateFields("phoneNumber").then((async()=>{try{await(0,s.SE)(g.phoneNumber),c.Ay.success("发送验证码成功，请注意查收!"),_.value=!0}catch(e){}})).catch((()=>{c.Ay.error("请先输入正确的手机号")}))};return(e,a)=>{const r=(0,t.g2)("a-input"),o=(0,t.g2)("a-form-item"),s=(0,t.g2)("a-button"),c=(0,t.g2)("a-form");return(0,t.uX)(),(0,t.Wv)(l.A,null,{title:(0,t.k6)((()=>[(0,t.eW)("手机号登录")])),form:(0,t.k6)((()=>[(0,t.bF)(c,{ref_key:"formRef",ref:h,model:g,"label-col":{span:8},"wrapper-col":{span:16},rules:b,autocomplete:"off"},{default:(0,t.k6)((()=>[(0,t.bF)(o,{label:"手机号",name:"phoneNumber"},{default:(0,t.k6)((()=>[(0,t.bF)(r,{value:g.phoneNumber,"onUpdate:value":a[0]||(a[0]=e=>g.phoneNumber=e)},null,8,["value"])])),_:1}),(0,t.bF)(o,{label:"验证码",name:"veriCode"},{default:(0,t.k6)((()=>[(0,t.bF)(r,{value:g.veriCode,"onUpdate:value":a[1]||(a[1]=e=>g.veriCode=e)},null,8,["value"])])),_:1}),(0,t.bF)(o,{"wrapper-col":{sm:{offset:8,span:16}}},{default:(0,t.k6)((()=>[(0,t.bF)(s,{type:"primary",onClick:y},{default:(0,t.k6)((()=>[(0,t.eW)("登录")])),_:1}),(0,t.bF)(s,{style:{"margin-left":"10px"},onClick:C,disabled:(0,u.R1)(_)},{default:(0,t.k6)((()=>[(0,u.R1)(_)?((0,t.uX)(),(0,t.CE)("div",p," 倒计时"+(0,n.v_)(Math.round((0,u.R1)(k)/1e3))+"s ",1)):((0,t.uX)(),(0,t.CE)("span",m," 获取验证码 "))])),_:1},8,["disabled"])])),_:1})])),_:1},8,["model"])])),_:1})}}});const b=f;var h=b}}]);
//# sourceMappingURL=274.2a6531ae.js.map