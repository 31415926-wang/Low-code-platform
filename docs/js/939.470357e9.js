"use strict";(self["webpackChunkquestion_star"]=self["webpackChunkquestion_star"]||[]).push([[939],{42939:function(e,a,t){t.r(a),t.d(a,{default:function(){return _}});t(45680);var s=t(1877),u=t(80725),l=t(86803),r=t(99397),c=t(86545),i=t(79669);const n={class:"user-center"},o={class:"title"},d={class:"picture-row"},k={class:"img-echo"},p=["src"],m={key:1,class:"img"},b={class:"bt-row"};var f=(0,s.pM)({__name:"index",setup(e){const a=(0,l.P)(),t=(0,r.rd)(),{nickName:f,picture:g=""}=a.state.userStore.userInfo,v=(0,u.Kh)({gender:0,nickName:f,picture:g}),_=(0,s.EW)((()=>0!==v.picture.length)),F=e=>{"string"!==typeof e&&(v.picture=e.urls[0],i.Ay.success("上传头像成功!"))},y=()=>{t.push("/")},h=async()=>{await(0,c.bu)(v),i.Ay.success("修改个人资料成功!"),a.commit("userStore/setUserInfo",{}),y()};return(e,a)=>{const t=(0,s.g2)("UserOutlined"),u=(0,s.g2)("FilesUpload"),l=(0,s.g2)("a-form-item"),r=(0,s.g2)("a-input"),c=(0,s.g2)("a-radio-button"),i=(0,s.g2)("a-radio-group"),f=(0,s.g2)("a-button"),g=(0,s.g2)("a-form");return(0,s.uX)(),(0,s.CE)("div",n,[(0,s.Lk)("div",o,[(0,s.eW)(" 个人中心 "),(0,s.bF)(t)]),(0,s.bF)(g,{model:v,name:"basic",autocomplete:"off",layout:"vertical"},{default:(0,s.k6)((()=>[(0,s.bF)(l,{label:"头像",name:"picture"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",d,[(0,s.bF)(u,{successCallback:F},{default:(0,s.k6)((()=>[(0,s.Lk)("div",k,[_.value?((0,s.uX)(),(0,s.CE)("img",{key:0,src:v.picture.replace("https","http"),class:"img",alt:""},null,8,p)):((0,s.uX)(),(0,s.CE)("div",m))])])),_:1})])])),_:1}),(0,s.bF)(l,{label:"昵称",name:"nickName",rules:[{required:!0,message:"请输入昵称!"}]},{default:(0,s.k6)((()=>[(0,s.bF)(r,{value:v.nickName,"onUpdate:value":a[0]||(a[0]=e=>v.nickName=e)},{prefix:(0,s.k6)((()=>[(0,s.bF)(t,{class:"site-form-item-icon",style:{opacity:"0.6"}})])),_:1},8,["value"])])),_:1}),(0,s.bF)(l,{label:"性别",name:"gender",rules:[{required:!0,message:"请选择性别!"}]},{default:(0,s.k6)((()=>[(0,s.bF)(i,{value:v.gender,"onUpdate:value":a[1]||(a[1]=e=>v.gender=e)},{default:(0,s.k6)((()=>[(0,s.bF)(c,{value:1},{default:(0,s.k6)((()=>[(0,s.eW)("男")])),_:1}),(0,s.bF)(c,{value:0},{default:(0,s.k6)((()=>[(0,s.eW)("女")])),_:1})])),_:1},8,["value"])])),_:1}),(0,s.bF)(l,null,{default:(0,s.k6)((()=>[(0,s.Lk)("div",b,[(0,s.bF)(f,{type:"primary",onClick:h},{default:(0,s.k6)((()=>[(0,s.eW)("更新资料")])),_:1}),(0,s.bF)(f,{type:"ghost",onClick:y,style:{"margin-left":"10px"}},{default:(0,s.k6)((()=>[(0,s.eW)("返回首页")])),_:1})])])),_:1})])),_:1},8,["model"])])}}}),g=t(91139);const v=(0,g.A)(f,[["__scopeId","data-v-4b65e64d"]]);var _=v}}]);
//# sourceMappingURL=939.470357e9.js.map