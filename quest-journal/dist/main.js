(()=>{"use strict";const e=e=>String(e),t=e=>e,s=e=>(e>3?e=3:e<1&&(e=1),e),o=e=>String(e),r=(()=>{let r=[];const i=e=>r[e],a=(e,t)=>r[e].getTask(t);return{quests:r,addQuest:e=>{let t=(e=>{let t=[],s=[];return{getTitle:()=>e,getTasks:()=>t,getTaskAmount:()=>t.length,getTask:e=>t[e],addTask:e=>{t.push(e)},removeTask:e=>{t.splice(e,1)},processSwap:e=>{s.length<2&&(e=>{s.push(e)})(e),s.length>=2&&(()=>{const e=s.shift(),o=s.shift();let r=t[e];t[e]=t[o],t[o]=r})()}}})(e=o(e));r.push(t)},removeQuest:e=>{r.splice(e,1)},getQuest:i,resetQuests:()=>{r=[]},addTask:(o,r,a,l,n)=>{let g=((e,t,s,o)=>({getTitle:()=>e,getDescription:()=>t,getDueDate:()=>s,getPriority:()=>o,setTitle:t=>{e=t},setDescription:e=>{t=e},setDueDate:e=>{s=e},setPriority:e=>{o=e}}))(o=e(o),r=e(r),a=t(a),l=s(l));i(n).addTask(g)},removeTask:(e,t)=>{getQuests(index).removeTask(t)},renameTitle:(t,s,o)=>{o=e(o),a(t,s).setTitle(o)},changeDescription:(t,s,o)=>{o=e(o),a(t,s).setDescription(o)},changeDate:(e,s,o)=>{o=t(o),a(e,s).setDueDate(o)},changePriority:(e,t,o)=>{o=s(o),a(e,t).setPriority(o)}}})();(()=>{let e=0;const t=t=>{r.addQuest(t);let s=r.quests.length-1,o=r.quests[s].getTitle();var i,a;i=o,a=t,console.log(`${i} ~OUTPUT~ vs.`),console.log(`${a} ~EXP.~`),e++,!0===(o===t)?console.log(`Test ${e} passed.`):console.log(`Test ${e} failed.`)};return{testProcess:()=>{t("Clear the Cave")}}})().testProcess()})();