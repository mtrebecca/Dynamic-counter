document.addEventListener("DOMContentLoaded",(()=>{const n=document.querySelectorAll(".tab"),e=document.querySelectorAll(".tab-content");let s;const t=1e3;function a(n,e){const t=Date.now(),a=new Date(n).getTime()-t;if(a<=0)return clearInterval(s),l(e,[0,0,0,0]),void function(){const n=document.getElementById("toast");n&&(n.textContent="Tempo esgotado",n.classList.add("show"),setTimeout((()=>n.classList.remove("show")),3e3))}();l(e,[Math.floor(a/864e5),Math.floor(a%864e5/36e5),Math.floor(a%36e5/6e4),Math.floor(a%6e4/1e3)])}function l(n,e){const s=n.querySelectorAll(".time-unit");e.forEach(((n,e)=>{s[e].querySelector(".value").textContent=function(n){return String(n).padStart(2,"0")}(n)}))}function c(n,e){s&&clearInterval(s),a(n,e),s=setInterval((()=>a(n,e)),t)}function i(s){n.forEach((n=>n.classList.remove("active","selected-tab"))),e.forEach((n=>n.classList.remove("active")));const t=s.currentTarget;t.classList.add("active","selected-tab");const a=document.getElementById(t.dataset.tab);if(a){a.classList.add("active");const n=a.querySelector(".timer-container");n&&!n.innerHTML&&(n.innerHTML='\n            <div class="timer">\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Dias</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Horas</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Minutos</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Segundos</span>\n                </div>\n            </div>\n        ');const e=t.dataset.deadline,s=a.querySelector(".timer");s&&c(e,s)}}n.forEach((n=>n.addEventListener("click",i)));const o=document.querySelector(".tab.active");if(o){const n=document.getElementById(o.dataset.tab);if(n){const e=n.querySelector(".timer-container");e&&!e.innerHTML&&(e.innerHTML='\n            <div class="timer">\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Dias</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Horas</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Minutos</span>\n                </div>\n                <div class="time-unit">\n                    <span class="value">00</span>\n                    <span class="label">Segundos</span>\n                </div>\n            </div>\n        ');const s=n.querySelector(".timer");s&&c(o.dataset.deadline,s)}}}));