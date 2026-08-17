(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function p(){const n=document.getElementById("dotsContainer"),s=document.querySelectorAll(".dot"),r=document.getElementById("logoText"),a=document.getElementById("sloganText"),e=document.getElementById("brandAssembly"),t=document.getElementById("billboardsStage"),o=document.getElementById("ctaButtons"),i=document.getElementById("replayBtn");function c(){n.classList.remove("vertical"),r.classList.remove("show"),a.classList.remove("typing"),e.classList.remove("shifted-up"),t.classList.remove("show"),o.classList.remove("show"),s.forEach(l=>{l.classList.remove("pop-1","pop-2","pop-3"),l.style.opacity="0",l.style.transform="scale(0)"}),setTimeout(()=>{s[0].classList.add("pop-1"),s[1].classList.add("pop-2"),s[2].classList.add("pop-3")},100),setTimeout(()=>{n.classList.add("vertical"),r.classList.add("show"),a.classList.add("typing")},750),setTimeout(()=>{e.classList.add("shifted-up"),t.classList.add("show"),o.classList.add("show")},1550)}c(),i&&i.addEventListener("click",c)}function f(){const n=document.getElementById("carouselTrack");if(!n)return;Array.from(n.children).forEach(o=>{const i=o.cloneNode(!0);n.appendChild(i)});let r=0;const a=1.2,e=n.scrollWidth/2;function t(){r+=a,r>=e&&(r=0),n.style.transform=`translateX(-${r}px)`;const o=window.innerWidth/2,i=n.querySelectorAll(".carousel-item");let c=null,l=1/0;i.forEach(d=>{const m=d.getBoundingClientRect(),g=m.left+m.width/2,u=Math.abs(o-g);d.classList.remove("active-center"),u<l&&(l=u,c=d)}),c&&l<220&&c.classList.add("active-center"),requestAnimationFrame(t)}requestAnimationFrame(t)}const v={billboards:{title:"Billboards",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 16v4M17 16v4M12 16v4"/><path d="M4 8h16"/></svg>',body:`
      <ol>
        <li><strong>Billboards:</strong> Ad effect specializes in different types of Billboards categorized under Wall signs, Unipoles, Rooftops, backlit, Mini poles, and 3x4 networks.</li>
        <li style="margin-top: 1rem;"><strong>Ad Boards:</strong> Ad Board provides a close connection with customers, Ad Board is truly unique and offers advertisers the opportunity to reach consumers whenever and wherever they want, day or night. Ad Boards are worn by brand ambassadors and offer 158 * 59 cm signage on the back and 42.4 * 60.5 cm on the front (featured above their heads) opportunity to reach consumers whenever and wherever they want, day or night.</li>
      </ol>
    `},media_planning:{title:"Media Planning",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><line x1="12" y1="9" x2="6" y2="6"/><line x1="12" y1="9" x2="18" y2="6"/><line x1="12" y1="15" x2="6" y2="18"/><line x1="12" y1="15" x2="18" y2="18"/></svg>',body:`
      <p></p>
      <p style="margin-top: 1rem; color: #666;">Ad events is a PR and Marketing cooperation specialized in corporate, social and public events. Our team consists of professionals that work in the advertising , marketing and PR fields, we set goals and objectives to create or plan optimum occasions that serve the target of our costumers.</p>
    `},advertising_marketing:{title:"Advertising, Marketing, Promotions",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>',body:`
      <p></p>
      <p style="margin-top: 1rem; color: #666;">Marketing Objectives:

Building product awareness

Creating interest

Providing information

Reinforcing the brand

 

Our Team relies on 7 pillars:

The team ( Organization, Marketing, Sponsorship.. etc. )

Concept creation and / or development.

Event branding and design operations.

Project planning and full operations management ( A – to – Z )

Development of digital platforms for events ( when required )

Development and implementation of marketing and communication strategies for events

 

including:

Outdoor media reservations

Media coverage and PR campaigns

Management of social media marketing operations

Premium SMS service for marketing

Bulk e-mail services

Provision of supplies and service- providers where needed at preferential rates ( Hostessing, light, sound, technical, decorations, prints, venue setup ect… )

 

We provide different kind of events like:

Conferences

Corporate dinner or cocktail parties

Networking events ( team building activities )

Fundraising events

Promotional events

Award ceremonies

Customer appreciation parties

Board meetings ( syndicates, NGO’s .. etc )

Seminars

Press Conferences

Sports Events

Product Launches</p>
    `},print_advertising:{title:"Print Advertising",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',body:`
      <p></p>
      <p style="margin-top: 1rem; color: #666;">Super cards: they are placed on the Driver’s window via a customized sucker, your message cannot be missed as the driver get into the car can be distributed throughout all lebanon depending on the targeted population minimal to zero waste

 

Paragliding: Just place your logo and let it fly with us across Lebanon

 

Print advertising: Ad Effect Company can assist in all printing services for the outdoor media printings, from small to large printing.</p>
    `},design_services:{title:"Design Services",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.75 1.7-1.67 0-.42-.16-.81-.43-1.1-.26-.29-.42-.68-.42-1.11 0-.92.75-1.67 1.67-1.67H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/></svg>',body:`
      <p></p>
      <p style="margin-top: 1rem; color: #666;">Ad effect design department can support our clients for the optimum design where all important details in the ad would be seen clearly. Our team can design the best visible and attractive designs to assure the clients benefit and satisfaction.</p>
    `},google_maps:{title:"Media Distribution on Google Maps",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',body:`
      <p>[ Insert Media Distribution on Google Maps details here ]</p>
      <p style="margin-top: 1rem; color: #666;">Location-based outdoor asset mapping and digital integration for client location accessibility.</p>
    `}};function y(){const n=document.querySelectorAll(".service-item"),s=document.getElementById("serviceCardTitle"),r=document.getElementById("serviceCardIcon"),a=document.getElementById("serviceCardBody");n.length&&n.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-service"),o=v[t];o&&(n.forEach(i=>i.classList.remove("active")),e.classList.add("active"),s&&(s.textContent=o.title),r&&(r.innerHTML=o.icon),a&&(a.innerHTML=o.body))})})}function h(){const n=document.querySelectorAll(".project-card"),s=document.getElementById("projects");if(!s||!n.length)return;const r={root:null,threshold:.15};new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&n.forEach((o,i)=>{setTimeout(()=>{o.classList.add("pop-in")},i*120)})})},r).observe(s)}function b(){const n=document.getElementById("contactForm"),s=document.getElementById("contactEmail"),r=document.getElementById("contactMessage"),a=document.getElementById("emailError"),e=document.getElementById("messageError");if(!n)return;function t(o){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(o).toLowerCase())}n.addEventListener("submit",o=>{o.preventDefault();let i=!0;a.classList.remove("show"),e.classList.remove("show");const c=s.value.trim(),l=r.value.trim();if((!c||!t(c))&&(a.textContent="Please enter a valid email address.",a.classList.add("show"),i=!1),l||(e.textContent="Please write a message before sending.",e.classList.add("show"),i=!1),i){const d="Reservation@ad-effect.com",m=encodeURIComponent("New Ad Effect Website Inquiry"),g=encodeURIComponent(`From: ${c}

Message:
${l}`),u=`mailto:${d}?subject=${m}&body=${g}`;window.location.href=u,alert("Thank you! Opening your email client to send your message to ssamadmiryam@gmail.com."),n.reset()}})}document.addEventListener("DOMContentLoaded",()=>{p(),f(),y(),h(),b();const n=document.querySelectorAll("section"),s=document.querySelectorAll(".nav-item"),r={root:null,threshold:.4},a=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const o=t.target.getAttribute("id");s.forEach(i=>{i.querySelector("a").getAttribute("href")===`#${o}`?i.classList.add("active"):i.classList.remove("active")}),o==="about"||o==="contact"?document.body.classList.add("dark-header"):document.body.classList.remove("dark-header")}})},r);n.forEach(e=>a.observe(e))});
