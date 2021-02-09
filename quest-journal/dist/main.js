(()=>{"use strict";const e=e=>String(e),t=e=>e,s=e=>(e>3?e=3:e<1&&(e=1),e),n=e=>String(e),r=(()=>{let r=[];const a=e=>r[e],l=(e,t)=>r[e].getTask(t);return{quests:r,addQuest:e=>{let t=(e=>{let t=[],s=[];return{getTitle:()=>e,getTasks:()=>t,getTaskAmount:()=>t.length,getTask:e=>t[e],addTask:e=>{t.push(e)},removeTask:e=>{t.splice(e,1)},processSwap:e=>{s.length<2&&(e=>{s.push(e)})(e),s.length>=2&&(()=>{const e=s.shift(),n=s.shift();let r=t[e];t[e]=t[n],t[n]=r})()}}})(e=n(e));r.push(t)},removeQuest:e=>{r.splice(e,1)},getQuests:()=>r,getQuest:a,resetQuests:()=>{r=[]},addTask:(t,s)=>{let n=(e=>({getTitle:()=>title,getDescription:()=>e,getDueDate:()=>dueDate,getPriority:()=>priority,setTitle:e=>{title=e},setDescription:t=>{e=t},setDueDate:e=>{dueDate=e},setPriority:e=>{priority=e}}))(t=e(t));a(s).addTask(n)},removeTask:(e,t)=>{a(e).removeTask(t)},renameTitle:(t,s,n)=>{n=e(n),l(t,s).setTitle(n)},changeDescription:(t,s,n)=>{n=e(n),l(t,s).setDescription(n)},changeDate:(e,s,n)=>{n=t(n),l(e,s).setDueDate(n)},changePriority:(e,t,n)=>{n=s(n),l(e,t).setPriority(n)}}})(),a=(()=>{let e=0,t=[];const s=()=>{localStorage.setItem("questLength",e)},n=e=>{let s="quest"+String(e),r=t.shift();r=String(r),s+="taskLength",localStorage.setItem(s,r),0===t.length||n(e+1)},a=(e,t)=>{let s="quest";s+=e=String(e),localStorage.setItem(s,t.getTitle()),l(t.getTasks(),s)},l=(e,t)=>{for(let s=0;s<e.length;s++){let n=t;n+="task",n+=s;let r=e[s].getDescription();console.log("SAVE: "+r),localStorage.setItem(n,r)}},d=()=>{e=r.getQuests().length},o=()=>{let e=r.getQuests();t=[];for(let s=0;s<e.length;s++){let n=e[s].getTaskAmount();t.push(n)}},u=()=>{localStorage.clear()};return{saveQuests:()=>{u(),d(),o(),s(),n(0);for(let t=0;t<e;t++){let e=r.getQuest(t);a(t,e)}},resetStorage:u}})(),l={render:(e,t,s)=>{let n=document.createElement("div");n.classList.add("task-container");let l=(e=>{let t=document.createElement("div");return t.classList.add("task-area"),t.textContent=e,t})(e.getDescription()),d=((e,t)=>{let s=document.createElement("button");return s.textContent="Done",s.addEventListener("click",(s=>{r.removeTask(e,t),a.saveQuests(),u.renderTaskTab()})),s})(t,s);return n.appendChild(d),n.appendChild(l),n}},d=(()=>{let e=!1,t=!1;const s=()=>{e=!1===e},n=()=>{t=!1===t},l=e=>{let t=document.createElement("input");return t.type="text",t.placeholder=e,t};return{getNewQuestPrompt:()=>e,getNewTaskPrompt:()=>t,createAddQuestButton:()=>{let e=document.createElement("button");return e.textContent="New Quest",e.addEventListener("click",(e=>{s(),u.renderQuestTab()})),e},createAddQuestPrompt:()=>{let e=document.createElement("div"),t=l("Quest name..."),n=(e=>{let t=document.createElement("button");return t.textContent="Add",t.addEventListener("click",(t=>{r.addQuest(e.value),s(),a.saveQuests(),u.renderQuestTab()})),t})(t);return e.appendChild(t),e.appendChild(n),e},createAddTaskButton:()=>{let e=document.createElement("button");return e.textContent="New Task",e.addEventListener("click",(()=>{n(),u.renderTaskTab()})),e},createAddTaskPrompt:()=>{let e=document.createElement("div"),t=l("Task name..."),s=(e=>{let t=document.createElement("button");return t.textContent="Add",t.addEventListener("click",(()=>{let t=u.getDisplayedQuestIndex();r.addTask(e.value,t),n(),a.saveQuests(),u.renderTaskTab()})),t})(t);return e.appendChild(t),e.appendChild(s),e}}})(),o=(()=>{const e=(t,s,n,r)=>{if(-1===n)return s;switch(r){case"title":s.unshift(t[n].getTitle());break;case"description":s.unshift(t[n].getDescription());break;case"date":s.unshift(t[n].getDueDate())}return e(t,s,n-=1,r)};return{transformToUIReadable:e,questsToTitles:e=>{let t=[];for(let s=0;s<e.length;s++){let n=e[s].getTitle();t.push(n)}return t}}})(),u=(()=>{let e=0,t=document.createElement("div"),s=document.createElement("div");const n=()=>(t.classList.add("quest-section"),t),a=()=>(s.classList.add("task-section"),s),u=()=>{k(),i();let e=v();c(e)},i=()=>{let e=null;e=!0===d.getNewQuestPrompt()?d.createAddQuestPrompt():d.createAddQuestButton(),t.appendChild(e)},c=e=>{for(let s=0;s<e.length;s++){let n=g(e,s);t.appendChild(n)}},g=(e,t)=>{let s=document.createElement("button");return s.textContent=e[t],s.dataset.index=t,s.addEventListener("click",(e=>{Q(t)})),s},p=()=>{h(),T();let e=D();m(e)},T=()=>{let e=null;e=!0===d.getNewTaskPrompt()?d.createAddTaskPrompt():d.createAddTaskButton(),s.appendChild(e)},m=t=>{for(let n=0;n<t.length;n++){let r=l.render(t[n],e,n);s.appendChild(r)}},k=()=>{t.innerHTML=""},h=()=>{s.innerHTML=""},Q=t=>{e=t,v(),u(),D(),p()},v=()=>o.questsToTitles(r.quests),D=()=>r.quests[e].getTasks();return{initializeJournal:()=>{let e=document.querySelector(".journal-section"),t=n(),s=a();e.appendChild(t),e.appendChild(s)},renderQuestTab:u,renderTaskTab:p,getDisplayedQuestIndex:()=>e,getQuestTitles:v,getTasks:D}})(),i=(()=>{let e=null,t=[];const s=(e,n)=>{let r="quest"+String(e)+"taskLength",a=localStorage.getItem(r);t.push(a),e+1===n||s(e+1,n)},n=(e,s)=>{let n=t[s];e+="task";for(let t=0;t<n;t++){let n=e+t,a=localStorage.getItem(n);console.log("LOAD:"+a),r.addTask(a,s)}};return{load:()=>{(()=>{let t=localStorage.getItem("questLength");t=parseInt(t),"number"==typeof t&&(e=t)})(),s(0,e),(()=>{for(let t=0;t<e;t++){String(t);let e="quest"+t,s=localStorage.getItem(e);r.addQuest(s),n(e,t)}})(),n()}}})();u.initializeJournal(),i.load(),(()=>{let e=u.getQuestTitles();u.renderQuestTab(e),u.getDisplayedQuestIndex(),u.renderTaskTab(u.getTasks())})()})();