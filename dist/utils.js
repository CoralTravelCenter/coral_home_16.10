function m(t){return t.replace(/&nbsp;/g,"").replace(/&mdash;/g,"").replace(/<br\s*\/?>/g,"").trim()}function d(t){const i=t.activeIndex,n=t.slides;[i,i-1,i+1].forEach(a=>{if(a>=0&&a<n.length){const s=n[a].firstChild.children[1];if(!s)return;const r=s.querySelector("img");r&&r.hasAttribute("data-src")&&(r.src=r.getAttribute("data-src"),r.style.visibility="visible",r.classList.remove("lazy-image"),r.removeAttribute("data-src"))}})}function u(t,i={}){return{...{slidesPerView:1,spaceBetween:0,loop:!0,navigation:{prevEl:`${t} .slider-bnt-prev`,nextEl:`${t} .slider-bnt-next`},pagination:{clickable:!0},on:{init:e=>d(e),slideChange:e=>d(e)}},...i}}async function p(t){return new Promise((i,n)=>{const e=document.createElement("script");e.addEventListener("load",()=>{e.remove(),i()}),e.addEventListener("error",()=>{e.remove(),n(new Error("Failed to load script: "+t))}),e.src=t,document.body.append(e)})}async function v(t={}){const i=document.querySelectorAll(".vimeo-video-box [data-vimeo-vid]");if(!i.length)return;let n=!1;const e=new IntersectionObserver(async(a,l)=>{var s;for(const r of a){const o=r.target;if(r.isIntersecting){if(!n)try{await p("https://player.vimeo.com/api/player.js"),n=!0}catch(c){console.error(c),l.disconnect();return}if(!o["vimeo-player"]){const c=new Vimeo.Player(o,{id:o.dataset.vimeoVid,background:1,playsinline:1,autopause:0,title:0,byline:0,portrait:0,autoplay:1,muted:1});o["vimeo-player"]=c,c.on("play",function(){this.element.parentElement.classList.add("playback")}),c.on("ended",function(){this.element.parentElement.classList.remove("playback")})}o["vimeo-player"].play()}else(s=o["vimeo-player"])==null||s.pause()}},Object.assign({},{threshold:.33},t));i.forEach(a=>e.observe(a))}export{m as c,u as s,v};
