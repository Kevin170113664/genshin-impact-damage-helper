(this["webpackJsonpgenshin-impact-damage-helper"]=this["webpackJsonpgenshin-impact-damage-helper"]||[]).push([[0],{165:function(t,a,e){},251:function(t,a,e){},258:function(t,a,e){},260:function(t,a,e){},261:function(t,a,e){"use strict";e.r(a);var i=e(14),r=e(0),c=e.n(r),s=e(25),n=e.n(s),o=(e(165),e(166),e(8)),l=e(29),h=e(22),m=e(269),d=e(268),g=e(266),j=e(64),b=e(105),u=e(35),O=e(267),k=e(263),S=e(141),f=e.n(S),p=(e(251),function(t){return Math.round(100*(t+Number.EPSILON))/100}),R=function(t){return Math.round(t+Number.EPSILON)};var A=function(t){var a=t.reports,e=[{title:"\u672a\u66b4\u51fb\u4f24\u5bb3",dataIndex:"normalDamage",key:"normalDamage"},{title:"\u66b4\u51fb\u4f24\u5bb3",dataIndex:"criticalDamage",key:"criticalDamage"},{title:"\u671f\u671b\u4f24\u5bb3",dataIndex:"damageExpectation",key:"damageExpectation"},{title:"\u5907\u6ce8",key:"tags",dataIndex:"tags",render:function(t){return Object(i.jsx)(i.Fragment,{children:t.map((function(t){return Object(i.jsx)(O.a,{color:"green",children:t.toUpperCase()},t)}))})}}];return Object(i.jsx)(m.a,{className:"damage-scenario",children:f()(a,(function(t,a){return function(t,a){var r=t.chargeLevel2,c=t.elementalSkill,s=t.elementalBurst,n=[];return r&&(n.push({key:"1",criticalDamage:R(r.frostflakeArrow.criticalDamage),damageExpectation:R(r.frostflakeArrow.damageExpectation),normalDamage:R(r.frostflakeArrow.normalDamage),tags:["\u971c\u534e\u77e2"]}),n.push({key:"2",criticalDamage:R(r.frostflakeArrowBloom.criticalDamage),damageExpectation:R(r.frostflakeArrowBloom.damageExpectation),normalDamage:R(r.frostflakeArrowBloom.normalDamage),tags:["\u971c\u534e\u7efd\u653e"]})),c&&(n.push({key:"3",criticalDamage:R(c["1-hit"].criticalDamage),damageExpectation:R(c["1-hit"].damageExpectation),normalDamage:R(c["1-hit"].normalDamage),tags:["\u91ca\u653e\u51b0\u83b2"]}),n.push({key:"4",criticalDamage:R(c["2-hit"].criticalDamage),damageExpectation:R(c["2-hit"].damageExpectation),normalDamage:R(c["2-hit"].normalDamage),tags:["\u51b0\u83b2\u7206\u70b8"]})),s&&(n.push({key:"5",criticalDamage:R(s.singleIceShard.criticalDamage),damageExpectation:R(s.singleIceShard.damageExpectation),normalDamage:R(s.singleIceShard.normalDamage),tags:["\u51b0\u96e81\u6839\u51b0\u68f1"]}),n.push({key:"6",criticalDamage:R(s.allIceShard.criticalDamage),damageExpectation:R(s.allIceShard.damageExpectation),normalDamage:R(s.allIceShard.normalDamage),tags:["\u51b0\u96e851\u6839\u51b0\u68f1"]})),Object(i.jsxs)(d.a,{lg:12,xs:24,children:[Object(i.jsx)(m.a,{justify:"center",className:"table-description",children:t.description}),Object(i.jsx)(m.a,{justify:"center",className:"scenario-table",children:Object(i.jsx)(k.a,{columns:e,dataSource:n,pagination:!1,size:"small"})})]},a.toString())}(t,a)}))})},v={PYRO:"PYRO",CRYO:"CRYO",HYDRO:"HYDRO",ELECTRO:"ELECTRO",DENTRO:"DENTRO",ANEMO:"ANEMO",GEO:"GEO"},w=e(71),x=e(72),y={label:"\u8bd5\u505a\u6fb9\u6708",name:"prototype_crescent",attack:{90:510},sub:{90:.413},refine:{1:.36,2:.45,3:.54,4:.63,5:.72}},B={label:"\u963f\u83ab\u65af\u4e4b\u5f13",name:"amos_bow",attack:{90:608},sub:{90:.496},refine:{1:[.12,.08],2:[.15,.1],3:[.18,.12],4:[.21,.14],5:[.24,.16]}},D="\u5929\u7a7a\u4e4b\u7ffc",E="skyward_harp",C=function(){function t(a,e){Object(w.a)(this,t),this.characterStats=Object(o.a)({},a),delete this.characterStats.basicAttack,delete this.characterStats.additionalAttack,delete this.characterStats.constellation,this.basicAttack=a.basicAttack,this.additionalAttack=a.additionalAttack,this.constellation=a.constellation,this.weaponStats=e}return Object(x.a)(t,[{key:"generate",value:function(){return this.weaponStats.name===E?this.generateSkywardScenarios():this.weaponStats.name===B.name?this.generateAmosScenarios():this.generateCrescentScenarios()}},{key:"generateSkywardScenarios",value:function(){var t=this.characterStats.level>20?.2:0,a=this.characterStats.level>70?.2:0,e=this.constellation>=1?.15:0,i={description:"\u602a\u6ca1\u6709\u51b0\u9644\u7740",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack)})},r={description:"\u602a\u88ab\u51b0\u5143\u7d20\u9644\u7740(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+.15+t+.2)}),targetStats:{resistRatio:p(.1-e)}};if(this.constellation>=4){return[i,r,{description:"\u602a\u7269\u88ab\u51b0\u9644\u7740\uff0c\u7ad9\u51b0\u96e8\u5185\u5403\u6ee14\u547d\u589e\u4f24(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+.15+t+.2),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a+.25)})}),targetStats:{resistRatio:p(.1-e)}}]}return[i,r]}},{key:"generateAmosScenarios",value:function(){var t=Object(h.a)(B.refine[this.weaponStats.refineRank],2),a=t[0],e=t[1],i=this.characterStats.level>20?.2:0,r=this.characterStats.level>70?.2:0,c=this.constellation>=1?.15:0,s={description:"\u8d34\u8138\u4e8c\u6bb5\u84c4\u529b\u5c04\uff0c\u971c\u534e\u77e2\u4e0d\u8db30.1\u79d2\u5373\u51fb\u4e2d\u654c\u4eba",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a)})}),weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank,isChargedAttack:!0,arrowFlyElapsed:0}},n={description:"\u548c\u602a\u7684\u8ddd\u79bb\u4e3a\u4e00\u4e2a\u51b0\u96e8\u534a\u5f84\uff0c\u971c\u534e\u77e2\u54032\u6bb5\u52a0\u6210\uff0c\u971c\u534e\u7efd\u653e\u5403\u6ee15\u6bb5\u52a0\u6210",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a+2*e)})}),weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank,isChargedAttack:!0,arrowFlyElapsed:.2}},l={description:"\u548c\u602a\u7684\u8ddd\u79bb\u8d85\u8fc7\u4e00\u4e2a\u51b0\u96e8\u76f4\u5f84\uff0c\u4e8c\u6bb5\u84c4\u529b\u5c04\u5747\u5403\u6ee1\u52a0\u6210",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a+5*e)})}),weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank,isChargedAttack:!0,arrowFlyElapsed:.5}},m={description:"\u84c4\u529b\u4e8c\u6bb5\u5403\u6ee1\u963f\u83ab\u65af\u52a0\u6210\uff0c\u602a\u7269\u4e3a\u51b0\u9644\u7740(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+.15+i+.2),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a+5*e)})}),targetStats:{resistRatio:p(.1-c)},weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank,isChargedAttack:!0,arrowFlyElapsed:.5}},d={description:"\u963f\u83ab\u65af\u4e4b\u5f13\u5bf9\u5143\u7d20\u6218\u6280\u548c\u5143\u7d20\u7206\u53d1\u6ca1\u6709\u52a0\u6210",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack)}),weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank}};if(this.constellation>=4){return[s,n,l,m,{description:"\u84c4\u529b\u4e8c\u6bb5\u5403\u6ee1\u963f\u83ab\u65af\u52a0\u6210\uff0c\u602a\u7269\u4e3a\u51b0\u9644\u7740\uff0c\u7ad9\u51b0\u96e8\u5185\u5403\u6ee14\u547d\u589e\u4f24(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+.15+i+.2),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+a+5*e+r+.25)})}),targetStats:{resistRatio:p(.1-c)},weaponStats:{name:B.name,refineRank:this.weaponStats.refineRank,isChargedAttack:!0,arrowFlyElapsed:.5}},d]}return[s,n,l,m,d]}},{key:"generateCrescentScenarios",value:function(){var t=y.refine[this.weaponStats.refineRank],a=.15,e=this.characterStats.level>20?.2:0,i=this.characterStats.level>70?.2:0,r=this.constellation>=1?.15:0,c={description:"\u53d1\u52a8\u8bd5\u505a\u6fb9\u6708\u7279\u6548\u524d",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:this.basicAttack+this.additionalAttack})},s={description:"\u53d1\u52a8\u8bd5\u505a\u6fb9\u6708\u7279\u6548\u540e(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack*(1+t)+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+a+e+.2)}),targetStats:{resistRatio:p(.1-r)}},n={description:"\u53d1\u52a8\u8bd5\u505a\u6fb9\u6708\u7279\u6548\u540e\u7ad9\u5728\u51b0\u96e8\u5185(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack*(1+t)+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+a+e+.2),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+i)})}),targetStats:{resistRatio:p(.1-r)}};if(this.constellation>=4){return[c,s,n,{description:"\u53d1\u52a8\u8bd5\u505a\u6fb9\u6708\u7279\u6548\u540e\u7ad9\u5728\u51b0\u96e8\u5185\u5403\u6ee14\u547d\u589e\u4f24(\u53cc\u51b0\u5171\u9e23\uff0c20\u7a81\u7834\u5929\u8d4b\uff0c\u51b0\u59574)",characterStats:Object(o.a)(Object(o.a)({},this.characterStats),{},{attack:R(this.basicAttack*(1+t)+this.additionalAttack),criticalRatio:p(this.characterStats.criticalRatio+a+e+.2),damageBoost:Object(o.a)(Object(o.a)({},this.characterStats.damageBoost),{},{other:p((this.characterStats.damageBoost.other||0)+i+.25)})}),targetStats:{resistRatio:p(.1-r)}}]}return[c,s,n]}}]),t}(),N=e(148),L=e.n(N),I=Object(o.a)(Object(o.a)({},v),{},{PHYSICAL:"PHYSICAL"}),M=function(){function t(a,e){var i=a.attack,r=a.attackType,c=a.criticalRatio,s=a.criticalDamage,n=a.ratio,o=a.level,l=a.mastery,h=a.damageBoost;Object(w.a)(this,t),this.attack=i,this.attackType=r,this.criticalRatio=c>1?1:c,this.criticalDamage=s,this.ratio=n,this.level=o,this.mastery=l||0,this.damageBoost=this.initDamageBoost(h),this.target=this.initTargetStats(e)}return Object(x.a)(t,[{key:"calculate",value:function(){var t=this.attackMultiplier*this.ratioMultiplier*this.resistantMultiplier*this.damageBoostMultiplier*this.elementReactionMultiplier,a=this.attackMultiplier*this.ratioMultiplier*this.resistantMultiplier*this.damageBoostMultiplier*this.elementReactionMultiplier*this.criticalMultiplier,e=this.criticalRatio*a+(1-this.criticalRatio)*t;return[p(e),p(t),p(a)]}},{key:"initDamageBoost",value:function(t){var a;return Object(o.a)((a={},Object(l.a)(a,I.PYRO,0),Object(l.a)(a,I.HYDRO,0),Object(l.a)(a,I.DENTRO,0),Object(l.a)(a,I.ELECTRO,0),Object(l.a)(a,I.ANEMO,0),Object(l.a)(a,I.CRYO,0),Object(l.a)(a,I.GEO,0),Object(l.a)(a,I.PHYSICAL,0),Object(l.a)(a,"other",0),a),t)}},{key:"initTargetStats",value:function(t){return Object(o.a)({level:100,defence:1,resistRatio:.1,attachedElement:void 0},t)}},{key:"attackMultiplier",get:function(){var t=(this.level+100)/(this.level+100+(this.target.level+100)*this.target.defence);return this.target.level-this.level>=70&&this.level<=10?this.attack*t*.5:this.attack*t}},{key:"ratioMultiplier",get:function(){return this.ratio}},{key:"damageBoostMultiplier",get:function(){return 1+this.damageBoost.other+(this.damageBoost[this.attackType]||0)}},{key:"elementReactionMultiplier",get:function(){var t=1.5,a=2,e=1.5,i=2,r=25*this.mastery/(9*(this.mastery+1400));return this.attackType===v.CRYO&&this.target.attachedElement===v.PYRO?(1+r)*t:this.attackType===v.PYRO&&this.target.attachedElement===v.CRYO?(1+r)*a:this.attackType===v.PYRO&&this.target.attachedElement===v.HYDRO?(1+r)*e:this.attackType===v.HYDRO&&this.target.attachedElement===v.PYRO?(1+r)*i:1}},{key:"resistantMultiplier",get:function(){return this.target.resistRatio>.75?1/(1+4*this.target.resistRatio):this.target.resistRatio<0?1-this.target.resistRatio/2:1-this.target.resistRatio}},{key:"criticalMultiplier",get:function(){return 1+this.criticalDamage}}]),t}(),Y={normal:{1:{frostflakeArrow:1.28,frostflakeArrowBloom:2.18},2:{frostflakeArrow:1.38,frostflakeArrowBloom:2.34},3:{frostflakeArrow:1.47,frostflakeArrowBloom:2.5},4:{frostflakeArrow:1.6,frostflakeArrowBloom:2.72},5:{frostflakeArrow:1.7,frostflakeArrowBloom:2.88},6:{frostflakeArrow:1.79,frostflakeArrowBloom:3.05},7:{frostflakeArrow:1.92,frostflakeArrowBloom:3.26},8:{frostflakeArrow:2.05,frostflakeArrowBloom:3.48},9:{frostflakeArrow:2.18,frostflakeArrowBloom:3.7},10:{frostflakeArrow:2.3,frostflakeArrowBloom:3.92},11:{frostflakeArrow:2.43,frostflakeArrowBloom:4.13}},skill:{1:1.32,2:1.42,3:1.52,4:1.65,5:1.75,6:1.85,7:1.98,8:2.11,9:2.24,10:2.38,11:2.51,12:2.64,13:2.81},burst:{1:.71,2:.76,3:.81,4:.88,5:.93,6:.98,7:1.05,8:1.12,9:1.2,10:1.27,11:1.34,12:1.41,13:1.49}},T=function(){function t(a,e,i){Object(w.a)(this,t),this.ganyuStats=this.initCharacterStats(a),this.targetStats=this.initTargetStats(e),this.weaponStats=this.initWeaponStats(i)}return Object(x.a)(t,[{key:"initCharacterStats",value:function(t){return Object(o.a)({attack:0,attackType:I.CRYO,criticalRatio:.05,criticalDamage:.5,ratio:0,level:1,mastery:0,talentLevels:[1,1,1],damageBoost:{}},t)}},{key:"initTargetStats",value:function(t){return Object(o.a)({level:85,resistRatio:.1},t)}},{key:"initWeaponStats",value:function(t){return Object(o.a)({refineRank:1},t)}},{key:"generate",value:function(){return this.weaponStats.name===B.name?this.weaponStats.isChargedAttack?{chargeLevel2:this.buildAmosChargeLevel2Report()}:{elementalSkill:this.buildElementalSkillReport(),elementalBurst:this.buildElementalBurstReport()}:{chargeLevel2:this.buildChargeLevel2Report(),elementalSkill:this.buildElementalSkillReport(),elementalBurst:this.buildElementalBurstReport()}}},{key:"buildAmosChargeLevel2Report",value:function(){var t=Object(h.a)(this.ganyuStats.talentLevels,1)[0],a=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.normal[t].frostflakeArrow}),e=new M(a,this.targetStats).calculate(),i=Object(h.a)(B.refine[this.weaponStats.refineRank],2)[1],r=parseInt((this.weaponStats.arrowFlyElapsed+.35)/.1),c=L()([r,5])*i,s=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.normal[t].frostflakeArrowBloom,damageBoost:Object(o.a)(Object(o.a)({},this.ganyuStats.damageBoost),{},{other:p(this.ganyuStats.damageBoost.other+c)})}),n=new M(s,this.targetStats).calculate();return{frostflakeArrow:{damageExpectation:e[0],normalDamage:e[1],criticalDamage:e[2]},frostflakeArrowBloom:{damageExpectation:n[0],normalDamage:n[1],criticalDamage:n[2]}}}},{key:"buildChargeLevel2Report",value:function(){var t=Object(h.a)(this.ganyuStats.talentLevels,1)[0],a=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.normal[t].frostflakeArrow}),e=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.normal[t].frostflakeArrowBloom}),i=new M(a,this.targetStats).calculate(),r=new M(e,this.targetStats).calculate();return{frostflakeArrow:{damageExpectation:i[0],normalDamage:i[1],criticalDamage:i[2]},frostflakeArrowBloom:{damageExpectation:r[0],normalDamage:r[1],criticalDamage:r[2]}}}},{key:"buildElementalSkillReport",value:function(){var t=Object(h.a)(this.ganyuStats.talentLevels,2)[1],a=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.skill[t]}),e=new M(a,this.targetStats).calculate();return{"1-hit":{damageExpectation:e[0],normalDamage:e[1],criticalDamage:e[2]},"2-hit":{damageExpectation:e[0],normalDamage:e[1],criticalDamage:e[2]}}}},{key:"buildElementalBurstReport",value:function(){var t=Object(h.a)(this.ganyuStats.talentLevels,3)[2],a=Object(o.a)(Object(o.a)({},this.ganyuStats),{},{ratio:Y.burst[t]}),e=new M(a,this.targetStats).calculate();return{singleIceShard:{damageExpectation:e[0],normalDamage:e[1],criticalDamage:e[2]},allIceShard:{damageExpectation:p(51*e[0]),normalDamage:p(51*e[1]),criticalDamage:p(51*e[2])}}}}]),t}(),P=e(265),F=e(264),H=e.p+"static/media/alipay.a88338e8.jpg",z=e.p+"static/media/wechat.89f6ae66.jpg";e(258);var G=function(){var t=Object(r.useState)(!1),a=Object(h.a)(t,2),e=a[0],c=a[1];return Object(i.jsxs)("div",{className:"coffee",children:[Object(i.jsx)("a",{onClick:function(){c(!0)},children:"\u2615\ufe0f"}),Object(i.jsxs)(P.a,{title:"\u8bf7\u4f5c\u8005\u559d\u676f\u5496\u5561\uff01",visible:e,footer:null,onCancel:function(){c(!1)},children:[Object(i.jsx)(F.a,{src:H}),Object(i.jsx)(F.a,{src:z})]})]})};e(260);var _=function(){var t=Object(r.useState)(90),a=Object(h.a)(t,2),e=a[0],c=a[1],s=Object(r.useState)(943),n=Object(h.a)(s,2),O=n[0],k=n[1],S=Object(r.useState)(1445),f=Object(h.a)(S,2),p=f[0],R=f[1],w=Object(r.useState)(0),x=Object(h.a)(w,2),N=x[0],L=x[1],I=Object(r.useState)(25),M=Object(h.a)(I,2),Y=M[0],P=M[1],F=Object(r.useState)(240),H=Object(h.a)(F,2),z=H[0],_=H[1],J=Object(r.useState)(61.6),W=Object(h.a)(J,2),U=W[0],q=W[1],K=Object(r.useState)(11),Q=Object(h.a)(K,2),V=Q[0],X=Q[1],Z=Object(r.useState)(13),$=Object(h.a)(Z,2),tt=$[0],at=$[1],et=Object(r.useState)(13),it=Object(h.a)(et,2),rt=it[0],ct=it[1],st=Object(r.useState)(6),nt=Object(h.a)(st,2),ot=nt[0],lt=nt[1],ht=Object(r.useState)(5),mt=Object(h.a)(ht,2),dt=mt[0],gt=mt[1],jt=Object(r.useState)(B.name),bt=Object(h.a)(jt,2),ut=bt[0],Ot=bt[1],kt={basicAttack:O,additionalAttack:p,criticalRatio:Y/100,criticalDamage:z/100,level:e,mastery:N,constellation:ot,talentLevels:[V,tt,rt],damageBoost:Object(l.a)({},v.CRYO,U/100)},St=new C(kt,{name:ut,refineRank:dt}).generate().map((function(t){var a=new T(t.characterStats,t.targetStats,t.weaponStats).generate();return Object(o.a)({description:t.description},a)}));function ft(t,a,e,r,c,s){return s?Object(i.jsxs)(m.a,{className:"stat-row",children:[Object(i.jsx)(d.a,{span:12,children:t}),Object(i.jsx)(d.a,{span:6,className:"stat-value",children:Object(i.jsx)(g.a,{size:"small",min:r,max:c,onChange:e,value:a,formatter:function(t){return"".concat(t,"%")},parser:function(t){return t.replace("%","")}})})]}):Object(i.jsxs)(m.a,{className:"stat-row",children:[Object(i.jsx)(d.a,{span:12,children:t}),Object(i.jsx)(d.a,{span:6,className:"stat-value",children:Object(i.jsx)(g.a,{size:"small",min:r,max:c,onChange:e,value:a})})]})}function pt(t){var a=t.key;Ot(a)}return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsxs)(m.a,{className:"header",children:["\u7518\u96e8\u4f24\u5bb3\u8ba1\u7b97\u5c0f\u52a9\u624b\ud83d\udc37",Object(i.jsx)(G,{})]}),Object(i.jsxs)(m.a,{children:[Object(i.jsxs)(d.a,{lg:6,xs:24,children:[Object(i.jsx)(m.a,{className:"title base-stats",children:"\u4eba\u7269\u72b6\u6001"}),Object(i.jsxs)("div",{children:[ft("\u4eba\u7269\u7b49\u7ea7",e,c,1,90),ft("\u57fa\u7840\u653b\u51fb\u529b(\u767d\u5b57)",O,k,1,9999),ft("\u9644\u52a0\u653b\u51fb\u529b(\u7eff\u5b57)",p,R,1,9999),ft("\u5143\u7d20\u7cbe\u901a",N,L,0,9999),ft("\u66b4\u51fb\u7387",Y,P,5,100,!0),ft("\u66b4\u51fb\u4f24\u5bb3",z,_,50,1e3,!0),ft("\u51b0\u5143\u7d20\u4f24\u5bb3\u52a0\u6210",U,q,0,1e3,!0)]}),Object(i.jsx)(m.a,{className:"title weapon-stats",children:"\u6b66\u5668\u72b6\u6001"}),Object(i.jsxs)("div",{children:[function(t){var a,e=Object(i.jsxs)(j.a,{onSelect:pt,onClick:pt,children:[Object(i.jsx)(j.a.Item,{children:B.label},B.name),Object(i.jsx)(j.a.Item,{children:D},E),Object(i.jsx)(j.a.Item,{children:y.label},y.name)]}),r=(a={},Object(l.a)(a,y.name,y.label),Object(l.a)(a,B.name,B.label),Object(l.a)(a,E,D),a);return Object(i.jsxs)(m.a,{className:"stat-row",children:[Object(i.jsx)(d.a,{span:12,children:t}),Object(i.jsx)(d.a,{span:6,className:"stat-value",children:Object(i.jsx)(b.a,{overlay:e,placement:"bottomLeft",children:Object(i.jsx)(u.a,{size:"small",children:r[ut]})})})]})}("\u88c5\u5907\u6b66\u5668"),ft("\u7cbe\u70bc\u7b49\u7ea7",dt,gt,1,5)]}),Object(i.jsx)(m.a,{className:"title constellation",children:"\u547d\u4e4b\u5ea7"}),Object(i.jsx)("div",{children:ft("\u547d\u4e4b\u5ea7",ot,lt,0,6)}),Object(i.jsx)(m.a,{className:"title talent",children:"\u5929\u8d4b"}),Object(i.jsxs)("div",{children:[ft("\u666e\u901a\u653b\u51fb",V,X,1,11),ft("\u5143\u7d20\u6218\u6280",tt,at,1,13),ft("\u5143\u7d20\u7206\u53d1",rt,ct,1,13)]})]}),Object(i.jsx)(d.a,{lg:18,xs:24,children:Object(i.jsx)(A,{reports:St})})]}),Object(i.jsx)("div",{className:"footer",children:"\u8fd9\u8ba1\u7b97\u5668\u4f9d\u7136\u662f\u4e00\u4e2a\u672a\u6210\u719f\u7684\u4f5c\u54c1\uff0c\u8bf7\u52ff\u4f20\u64ad\u54df"})]})},J=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,270)).then((function(a){var e=a.getCLS,i=a.getFID,r=a.getFCP,c=a.getLCP,s=a.getTTFB;e(t),i(t),r(t),c(t),s(t)}))};n.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(_,{})}),document.getElementById("root")),J()}},[[261,1,2]]]);
//# sourceMappingURL=main.74261ef7.chunk.js.map