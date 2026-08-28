(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const be="https://iyznlhahblpjczjzmscy.supabase.co",he="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA";supabase.createClient(be,he);function we(){const e=document.getElementById("dotsContainer"),t=document.querySelectorAll(".dot"),n=document.getElementById("logoText"),i=document.getElementById("sloganText"),o=document.getElementById("brandAssembly"),a=document.getElementById("billboardsStage"),r=document.getElementById("ctaButtons"),s=document.getElementById("replayBtn");function l(){e.classList.remove("vertical"),n.classList.remove("show"),i.classList.remove("typing"),o.classList.remove("shifted-up"),a.classList.remove("show"),r.classList.remove("show"),t.forEach(c=>{c.classList.remove("pop-1","pop-2","pop-3"),c.style.opacity="0",c.style.transform="scale(0)"}),setTimeout(()=>{t[0].classList.add("pop-1"),t[1].classList.add("pop-2"),t[2].classList.add("pop-3")},100),setTimeout(()=>{e.classList.add("vertical"),n.classList.add("show"),i.classList.add("typing")},750),setTimeout(()=>{o.classList.add("shifted-up"),a.classList.add("show"),r.classList.add("show")},1550)}l(),s&&s.addEventListener("click",l)}function Ee(){const e=document.getElementById("carouselTrack");if(!e)return;Array.from(e.children).forEach(r=>{const s=r.cloneNode(!0);e.appendChild(s)});let n=0;const i=1.2,o=e.scrollWidth/2;function a(){n+=i,n>=o&&(n=0),e.style.transform=`translateX(-${n}px)`;const r=window.innerWidth/2,s=e.querySelectorAll(".carousel-item");let l=null,c=1/0;s.forEach(d=>{const m=d.getBoundingClientRect(),b=m.left+m.width/2,u=Math.abs(r-b);d.classList.remove("active-center"),u<c&&(c=u,l=d)}),l&&c<220&&l.classList.add("active-center"),requestAnimationFrame(a)}requestAnimationFrame(a)}const _e={billboards:{title:"Billboards",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 16v4M17 16v4M12 16v4"/><path d="M4 8h16"/></svg>',body:`
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
    `}};function Ie(){const e=document.querySelectorAll(".service-item"),t=document.getElementById("serviceCardTitle"),n=document.getElementById("serviceCardIcon"),i=document.getElementById("serviceCardBody");e.length&&e.forEach(o=>{o.addEventListener("click",()=>{const a=o.getAttribute("data-service"),r=_e[a];r&&(e.forEach(s=>s.classList.remove("active")),o.classList.add("active"),t&&(t.textContent=r.title),n&&(n.innerHTML=r.icon),i&&(i.innerHTML=r.body))})})}function Be(){const e=document.querySelectorAll(".project-card"),t=document.getElementById("projects");if(!t||!e.length)return;const n={root:null,threshold:.15};new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&e.forEach((r,s)=>{setTimeout(()=>{r.classList.add("pop-in")},s*120)})})},n).observe(t)}function xe(){const e=document.getElementById("led-screen"),t=document.getElementById("ledPage1"),n=document.getElementById("ledPage2");if(!e||!t||!n)return;let i=!1;function o(){const r=e.getBoundingClientRect(),s=window.innerHeight,l=e.offsetHeight-s;if(l<=0){i=!1;return}let d=-r.top/l;d=Math.max(0,Math.min(1,d));const m=-d*100,b=(1-d)*100;t.style.transform=`translate3d(0, ${m}vh, 0)`,n.style.transform=`translate3d(0, ${b}vh, 0)`,t.style.opacity=d>.85?(1-d)/.15:1,n.style.opacity=d<.15?d/.15:1,i=!1}function a(){i||(requestAnimationFrame(o),i=!0)}window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a,{passive:!0}),o()}function Se(){const e=document.getElementById("contactForm"),t=document.getElementById("contactEmail"),n=document.getElementById("contactMessage"),i=document.getElementById("emailError"),o=document.getElementById("messageError");if(!e)return;function a(r){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r).toLowerCase())}e.addEventListener("submit",r=>{r.preventDefault();let s=!0;i.classList.remove("show"),o.classList.remove("show");const l=t.value.trim(),c=n.value.trim();if((!l||!a(l))&&(i.textContent="Please enter a valid email address.",i.classList.add("show"),s=!1),c||(o.textContent="Please write a message before sending.",o.classList.add("show"),s=!1),s){const d="Reservation@ad-effect.com",m=encodeURIComponent("New Ad Effect Website Inquiry"),b=encodeURIComponent(`From: ${l}

Message:
${c}`),u=`mailto:${d}?subject=${m}&body=${b}`;window.location.href=u,alert("Thank you! Opening your email client to send your message to ssamadmiryam@gmail.com."),e.reset()}})}const se={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA",VITE_SUPABASE_URL:"https://iyznlhahblpjczjzmscy.supabase.co"},Le=typeof import.meta<"u"&&import.meta&&se&&"https://iyznlhahblpjczjzmscy.supabase.co"||"https://iyznlhahblpjczjzmscy.supabase.co",M=Le.replace(/\/rest\/v1\/?$/,"").replace(/\/+$/,""),N=typeof import.meta<"u"&&import.meta&&se&&"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA"||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA";let q=null;function h(){if(typeof window<"u"&&!q&&window.supabase&&M&&N&&!M.includes("your-supabase-project-id"))try{q=window.supabase.createClient(M,N)}catch(e){console.warn("Supabase initialization warning:",e)}return q}function O(e){return Array.isArray(e)?e.map(t=>{let n=t.price;typeof t.price=="number"?n=`$ ${t.price.toLocaleString()}`:t.price&&!t.price.toString().startsWith("$")&&(n=`$ ${t.price}`);let i=t.is_available;return typeof t.is_available=="boolean"?i=t.is_available?"Available":"Unavailable":t.is_available||(i="Available"),{...t,id:t.id||t.billboard_id,billboard_id:t.billboard_id||`BB-${t.id}`,location:t.location||"Tripoli Entrance & Avenue",maps_url:t.maps_url||"https://maps.google.com/?q=Tripoli,Lebanon",size:t.size||"Standard Size",price:n||"$ 1,000",numericPrice:typeof t.price=="number"?t.price:parseFloat((t.price||"").toString().replace(/[^0-9.]/g,""))||0,image_url:t.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:t.structure||"Unipole",is_available:i,available_until:t.available_until||null}}):[]}const Z=[{billboard_id:"U002-A",location:"Bahsas, Tripoli Entrance",maps_url:"https://www.google.com/maps/place/Ad+effect/data=!4m2!3m1!1s0x0:0x1c8a54b37c14fbfc?sa=X&ved=1t:2428&ictx=111",size:"W:147 - H:43",price:"$ 1,000",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available",available_until:null},{billboard_id:"U002-B",location:"Bahsas, Tripoli Entrance",maps_url:"https://maps.google.com/maps?q=34.396779039964066,35.79991279815192",size:"W: 40 - H: 30",price:"$ 1,200",image_url:"https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available Soon",available_until:"2026-09-01"},{billboard_id:"P003-C",location:"Mina Road, Tripoli",maps_url:"https://maps.google.com",size:"3:4",price:"$ 600",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:"Portrait Billboard",is_available:"Available",available_until:null}];function $(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function G(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving local state:",n)}}async function K(){const e=h();if(e)try{const{data:n,error:i}=await e.from("billboards").select("*");if(!i&&n&&n.length>0)return O(n);i&&console.warn("Supabase JS Client error:",i.message)}catch(n){console.warn("Supabase JS Client fetch failed, trying direct REST fetch:",n)}try{const n=await fetch(`${M}/rest/v1/billboards?select=*`,{headers:{apikey:N,Authorization:`Bearer ${N}`}});if(n.ok){const i=await n.json();if(Array.isArray(i)&&i.length>0)return O(i)}else console.warn("Direct REST fetch returned status:",n.status)}catch(n){console.warn("Direct REST fetch exception:",n)}let t=$("adeffect_billboards",null);return t||(G("adeffect_billboards",Z),t=Z),O(t)}async function Ce(e){console.log(e.user_name);const t={user_name:e.user_name,business_name:e.business_name,website:e.website||"",phone_number:e.phone_number,email:e.email,location:e.location||"",hear_about_us:e.hear_about_us||[],created_at:new Date().toISOString()},n=h();if(n)try{const{data:i,error:o}=await n.from("pending_users").insert([t]).select();if(!o)return ee(t),{success:!0,data:i};console.warn("Supabase insert pending_users warning:",o)}catch(i){console.warn("Supabase insert pending_users exception:",i)}return ee(t),{success:!0,data:[t]}}function ee(e){const t=$("adeffect_pending_users",[]);t.push(e),G("adeffect_pending_users",t)}async function ke(e){const t=e.name.split(".").pop(),i=`${`${Date.now()}_${Math.random().toString(36).substring(2,7)}.${t}`}`,o=h();if(o)try{const{data:r,error:s}=await o.storage.from("Briefs of Pending Requests").upload(i,e);if(!s&&r){const{data:l}=o.storage.from("Briefs of Pending Requests").getPublicUrl(i);return{success:!0,url:l.publicUrl,filename:e.name}}console.warn("Supabase Storage upload warning:",s)}catch(r){console.warn("Supabase Storage upload exception:",r)}return{success:!0,url:URL.createObjectURL(e),filename:e.name,isLocalFallback:!0}}async function De(e){const t=w();if(!document.getElementById("performancesGrid"))return;t&&t.id;const i={user_id:t.id,user_email:e.user_email,billboard_id:e.billboard_id,start_time:e.start_time,end_time:e.end_time,brief_url:e.brief_url,extra_services:e.extra_services||[],status:"In Review",created_at:new Date().toISOString()},o=h();if(o)try{const{data:a,error:r}=await o.from("pending_bookings").insert([i]).select();if(!r)return te(i),{success:!0,data:a};console.warn("Supabase insert pending_bookings warning:",r)}catch(a){console.warn("Supabase insert pending_bookings exception:",a)}return te(i),{success:!0,data:[i]}}function te(e){const t=$("adeffect_pending_bookings",[]);t.unshift(e),G("adeffect_pending_bookings",t)}async function Q(e=null){const t=h();if(t)try{let i=t.from("pending_bookings").select("*");e&&(i=i.eq("user_email",e));const{data:o,error:a}=await i;if(!a&&o)return o}catch(i){console.warn("Supabase fetch pending_bookings error:",i)}const n=$("adeffect_pending_bookings",[]);return e?n.filter(i=>i.user_email===e):n}async function re(e){const t=h();let n=[];if(t)try{let i=t.from("bookings").select("*");e&&(i=i.eq("billboard_id",e));const{data:o,error:a}=await i;!a&&o&&(n=o)}catch(i){console.warn("Supabase fetch bookings error:",i)}if(n.length===0){const i=$("adeffect_confirmed_bookings",[{id:101,client_id:"user-sample-id",billboard_id:"U002-A",start_time:"2026-09-01T00:00:00.000Z",end_time:"2026-09-15T00:00:00.000Z",is_active:!0,created_at:"2026-08-01T00:00:00.000Z"}]);n=e?i.filter(o=>o.billboard_id===e):i}return n}async function Fe(e,t,n,i=null){const o=new Date(t).getTime(),a=new Date(n).getTime();if(isNaN(o)||isNaN(a)||o>=a)return{valid:!1,message:"Start date must be before end date."};const r=new Date(t),s=new Date(n),l=s.getTime()-r.getTime(),c=Math.round(l/(1e3*60*60*24)),d=(i||"").toString().toLowerCase().replace(/\s+/g,"");if(d.includes("3:4")||d.includes("3x4")||d.includes("3/4")){if(c<7)return{valid:!1,message:"Billboards of size 3:4 require a minimum booking period of 1 week (7 days)."}}else{const p=new Date(r);if(p.setMonth(p.getMonth()+1),c<28&&s<p)return{valid:!1,message:"Billboards must be booked for a minimum period of 1 month."}}const b=await Q(),u=await re(e),_=[...b.filter(p=>p.billboard_id===e&&p.status!=="Rejected"),...u.filter(p=>p.billboard_id===e)];for(const p of _){const S=new Date(p.start_time||p.start_date).getTime(),f=new Date(p.end_time||p.end_date).getTime();if(!isNaN(S)&&!isNaN(f)&&o<=f&&a>=S)return{valid:!1,message:"Selected timeframe overlaps with an existing booking for this billboard. Please choose another date range."}}return{valid:!0}}async function Ae(e=null){const t=h();if(!t||!e)return[];try{const{data:n,error:i}=await t.from("bookings").select("*, billboards(*)").eq("is_active",!0).eq("user_id",e);return i?(console.error("Supabase fetch active bookings error:",i.message),[]):n||[]}catch(n){return console.warn("Supabase fetch active bookings exception:",n),[]}}async function $e(e,t=null){const n=h();if(n)try{let o=n.from("quotations").select("*");e&&(o=o.eq("client_id",e));const{data:a,error:r}=await o;if(!r&&a)return a}catch(o){console.warn("Supabase fetch quotations error:",o)}return $("adeffect_quotations",[{id:501,created_at:new Date().toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Outdoor Unipole",media_used:"Backlit Vinyl Print",reference:"U002-A",media_location:"Bahsas, Tripoli Entrance",frequency:1,period:"1 Month (Aug 2026)",printing_cost:250,total_cost_wo_printing:1e3,total_cost_with_printing:1250},{id:502,created_at:new Date(Date.now()-864e5*5).toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Megapole Network",media_used:"Frontlit Flex Banner",reference:"U002-B",media_location:"Dam & Farz Highway",frequency:2,period:"2 Months (Sep-Oct 2026)",printing_cost:400,total_cost_wo_printing:2400,total_cost_with_printing:2800}])}let T=null;function w(){if(!T){const e=localStorage.getItem("adeffect_auth_user");if(e)try{T=JSON.parse(e)}catch{}}return T}function le(e){T=e,e?localStorage.setItem("adeffect_auth_user",JSON.stringify(e)):localStorage.removeItem("adeffect_auth_user"),window.dispatchEvent(new CustomEvent("authChange",{detail:{user:e}}))}function ze(){const e=document.getElementById("btnGoToDashboard"),t=document.getElementById("btnForgotPassword");t&&t.addEventListener("click",s=>{s.preventDefault(),Me()}),e&&e.addEventListener("click",s=>{s.preventDefault(),Te()});const n=document.getElementById("signUpForm");n&&n.addEventListener("submit",Pe);const i=document.getElementById("signInForm");i&&i.addEventListener("submit",Ne);const o=document.getElementById("btnHeaderLogin");o&&o.addEventListener("click",s=>{s.preventDefault(),R("signin")});const a=document.getElementById("btnSwitchToSignUp");a&&a.addEventListener("click",s=>{s.preventDefault(),R("signup")}),new URLSearchParams(window.location.search).get("reset")==="true"&&(v("authSection"),R("signin"),W("You can now set a new password — Supabase handles this via your account settings page.")),v("home")}async function Me(){var n;const e=(n=document.getElementById("signinEmail"))==null?void 0:n.value.trim();if(!e){C('Please enter your email address above, then click "Forgot your password?"');return}const t=h();if(!t){C("Unable to connect. Please try again later.");return}try{const{error:i}=await t.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin+"/?reset=true"});if(i){C(`Could not send reset email: ${i.message}`);return}W("Password reset email sent! Check your inbox and follow the link.")}catch(i){C("Something went wrong. Please try again."),console.error("Forgot password error:",i)}}function Te(){const e=w();e&&e.status==="verified"?v("dashboardSection"):v("authSection")}function R(e){const t=document.getElementById("signUpBox"),n=document.getElementById("signInBox"),i=document.getElementById("btnHeaderLogin");e==="signin"?(t&&(t.style.display="none"),n&&(n.style.display="block"),i&&(i.textContent="SIGN UP")):(t&&(t.style.display="block"),n&&(n.style.display="none"),i&&(i.textContent="LOG IN"))}async function Ne(e){var d,m,b;e.preventDefault();const t=(d=document.getElementById("signinEmail"))==null?void 0:d.value.trim(),n=(m=document.getElementById("signinPassword"))==null?void 0:m.value.trim(),i=document.getElementById("signInErrorBox"),o=document.getElementById("signInSuccessBox");if(i&&(i.style.display="none"),o&&(o.style.display="none"),!t||!n){C("Please enter both your email address and password.");return}const a=h();let r=null;if(a)try{const{data:u,error:_}=await a.auth.signInWithPassword({email:t,password:n});if(_){C(`Login failed: ${_.message}`);return}if(u&&u.user){const p=((b=u.user.user_metadata)==null?void 0:b.full_name)||u.user.email.split("@")[0];r={id:u.user.id,email:u.user.email,name:p,status:"verified"}}}catch(u){console.warn("Supabase auth exception, checking demo login fallback:",u)}if(!r)if(t.includes("@")){const u=t.split("@")[0];r={id:"usr_"+Date.now(),email:t,name:u.charAt(0).toUpperCase()+u.slice(1),status:"verified"}}else{C("Invalid email format. Please check your credentials.");return}le(r),W("Login successful! Redirecting to your Client Dashboard...");const s=document.getElementById("dashboardGreetingName");s&&(s.textContent=`Hello, ${r.name}`);const l=document.getElementById("sidebarProfileName");l&&(l.textContent=r.name);const c=document.getElementById("signInForm");c&&c.reset(),setTimeout(()=>{o&&(o.style.display="none"),v("dashboardSection")},1e3)}function C(e){let t=document.getElementById("signInErrorBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInErrorBox",t.style.cssText="background: #FEF2F2; border: 2px solid #EF4444; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}function W(e){let t=document.getElementById("signInSuccessBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInSuccessBox",t.style.cssText="background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}async function Pe(e){var s,l,c,d;e.preventDefault();const t=(s=document.getElementById("signupName"))==null?void 0:s.value.trim(),n=(l=document.getElementById("signupBusiness"))==null?void 0:l.value.trim(),i=(c=document.getElementById("signupEmail"))==null?void 0:c.value.trim(),o=(d=document.getElementById("signupPhone"))==null?void 0:d.value.trim();if(!t||!n||!i||!o){alert("Please fill out all required fields.");return}if((await Ce({user_name:t,business_name:n,email:i,phone_number:o})).success){const m=document.getElementById("pendingSuccessModal");m?m.classList.add("active"):(alert("Thank you for registering! Your account registration request is under review."),v("home"))}else alert("Failed to submit registration request.")}function v(e){const t=["home","about","services","projects","led-screen","contact"],n=["discoverySection","authSection","dashboardSection","careers"];if(e&&e.startsWith("#")&&(e=e.substring(1)),e==="dashboardSection"){const i=w();(!i||i.status!=="verified")&&(e="authSection")}n.includes(e)?(t.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="none")}),n.forEach(i=>{const o=document.getElementById(i);o&&(i===e?o.style.display=i==="dashboardSection"?"flex":"block":o.style.display="none")}),window.scrollTo({top:0,behavior:"smooth"})):(n.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="none")}),t.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="block")}))}let k=[],B=[];function Ue(){window.addEventListener("authChange",ne),ne();const e=document.querySelectorAll(".sidebar-link");e.forEach(r=>{r.addEventListener("click",s=>{s.preventDefault(),e.forEach(c=>c.classList.remove("active")),r.classList.add("active");const l=r.getAttribute("data-tab");qe(l)})});const t=document.getElementById("sidebarLogoutBtn");t&&t.addEventListener("click",()=>{le(null),v("home")});const n=document.getElementById("btnNewBillboardRequest");n&&n.addEventListener("click",r=>{r.preventDefault(),v("discoverySection")});const i=document.getElementById("btnCloseQuotationModal");i&&i.addEventListener("click",()=>{const r=document.getElementById("quotationModal");r&&r.classList.remove("active")});const o=document.getElementById("btnCloseActiveModal");o&&o.addEventListener("click",()=>{const r=document.getElementById("activeBillboardModal");r&&r.classList.remove("active")});const a=document.getElementById("btnConvertToPDF");a&&a.addEventListener("click",He)}function ne(){const e=w(),t=document.getElementById("dashboardGreetingName"),n=document.getElementById("sidebarProfileName");e?(t&&(t.textContent=`Hello, ${e.name||"Client"}`),n&&(n.textContent=e.name||"Client Account")):(t&&(t.textContent="Hello, Client"),n&&(n.textContent="Client Profile")),ce(),Y(),de()}function qe(e){const t=document.getElementById("dashTabMain"),n=document.getElementById("dashTabRequests"),i=document.getElementById("dashTabActiveBillboards"),o=document.getElementById("dashTabQuotations");t&&(t.style.display="none"),n&&(n.style.display="none"),i&&(i.style.display="none"),o&&(o.style.display="none"),e==="requests"&&n?(n.style.display="block",Y()):e==="active"&&i?(i.style.display="block",Oe()):e==="quotations"&&o?(o.style.display="block",de()):t&&(t.style.display="block",ce())}async function ce(){const e=w(),t=document.getElementById("performancesGrid");if(!t)return;const n=e?e.id:null;if(B=await Ae(n),!B||B.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboard campaigns found</h3>
        <p style="color: #888; margin-top: 4px;">Once your billboard request is approved, active campaign metrics will be displayed here.</p>
      </div>
    `;return}t.innerHTML=B.map(i=>{const o=i.billboards||i,a=o.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",r=o.billboard_id||i.billboard_id||`Booking #${i.id}`,s=o.location||"Location Not Specified",l=i.impressions_per_week??o.impressions_per_week??(o.daily_impressions?o.daily_impressions*7:null);return l&&`${Number(l).toLocaleString()}`,`
      <div class="billboard-card active-perf-card" data-booking-id="${i.id}" style="cursor: pointer;">
        <div class="card-image-wrapper">
          <img src="${a}" alt="Billboard ${r}" />
          <div class="billboard-tag">${r}<span>Active Campaign</span></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${r}</h3>
          <div class="card-location">${s}</div>
          <div style="margin-top: 8px; font-weight: 500; color: #16a34a; font-size: 0.9rem;">
            ● Live Traffic Data: Coming Soon...
          </div>
          <button class="btn-card-action" style="margin-top: 12px; font-size: 0.85rem; padding: 8px;">View Campaign Details</button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".active-perf-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-booking-id"),a=B.find(r=>String(r.id)===String(o));a&&Re(a)})})}function Oe(){const e=document.getElementById("activeBillboardsGrid");if(e){if(!B||B.length===0){e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboards</h3>
      </div>
    `;return}e.innerHTML=B.map(t=>{const n=t.billboards||t,i=n.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",o=n.billboard_id||t.billboard_id||`Booking #${t.id}`,a=n.location||"Location Not Specified";return`
      <div class="billboard-card">
        <div class="card-image-wrapper">
          <img src="${i}" alt="Billboard ${o}" />
          <div class="billboard-tag">${o}<span>Active</span></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${o}</h3>
          <div class="card-location">${a}</div>
          <div style="font-weight: 800; color: #16a34a; margin-top: 8px;">Status: Active Campaign</div>
        </div>
      </div>
    `}).join("")}}function Re(e){const t=document.getElementById("activeBillboardModal"),n=document.getElementById("activeBillboardModalContent");if(!t||!n)return;const i=e.billboards||e,o=i.billboard_id||e.billboard_id||`Booking #${e.id}`,a=i.location||"Location Not Specified",r=e.impressions_per_week??i.impressions_per_week??i.daily_impressions?i.daily_impressions*7:null,s=r?Number(r).toLocaleString():"N/A",l=e.start_time?new Date(e.start_time).toLocaleDateString():"N/A",c=e.end_time?new Date(e.end_time).toLocaleDateString():"N/A";n.innerHTML=`
    <div style="text-align: left;">
      <h2 style="font-size: 2rem; font-weight: 900; color: var(--primary-red);">${o} - Active Billboard</h2>
      <div style="font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 4px;">${a}</div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div style="border-radius: 16px; overflow: hidden; border: 3px solid #111; height: 240px;">
          <img src="${i.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"}" alt="Billboard" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-weight: 600;">
          <div style="background: #DCFCE7; color: #15803D; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 1rem;">
            ✓ Campaign Status: ACTIVE
          </div>
          <div><strong>Media Type:</strong> ${i.type||i.media_type||"Standard Billboard"}</div>
          <div><strong>Dimensions:</strong> ${i.size||i.dimensions||"N/A"}</div>
          <div><strong>Weekly Impressions:</strong> ${s}</div>
          <div><strong>Campaign Start:</strong> ${l}</div>
          <div><strong>Campaign End:</strong> ${c}</div>
        </div>
      </div>
    </div>
  `,t.classList.add("active")}async function Y(){const e=w(),t=document.getElementById("dashboardRequestsTableBody");if(!t)return;const n=e?e.email:null,i=await Q(n);if(!i||i.length===0){t.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: #666;">
          No pending billboard requests found. Click "New Billboard Request" to book a billboard.
        </td>
      </tr>
    `;return}t.innerHTML=i.map(o=>{const a=o.start_time?new Date(o.start_time).toLocaleDateString():"N/A",r=o.end_time?new Date(o.end_time).toLocaleDateString():"N/A",s=(o.status||"pending").toLowerCase(),l=s.charAt(0).toUpperCase()+s.slice(1),c=`<span class="status-badge status-${s}">${l}</span>`,d=Array.isArray(o.extra_services)?o.extra_services.join(", "):o.extra_services||"None",m=o.brief_url?`<a href="${o.brief_url}" target="_blank" style="color: var(--primary-red); font-weight: 700; text-decoration: underline;">View PDF Brief</a>`:"No File";return`
      <tr>
        <td style="font-weight: 800; color: #111;">${o.billboard_id}</td>
        <td>${a} ➔ ${r}</td>
        <td>${m}</td>
        <td>${d}</td>
        <td>${c}</td>
        <td>${new Date(o.created_at||Date.now()).toLocaleDateString()}</td>
      </tr>
    `}).join("")}async function de(){const e=w(),t=document.getElementById("quotationsGrid");if(!t)return;const n=e?e.id||e.email:null;if(k=await $e(n,e?e.email:null),!k||k.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No quotations available</h3>
        <p style="color: #888; margin-top: 4px;">Official campaign quotations issued by AdEffect will appear here for your review.</p>
      </div>
    `;return}t.innerHTML=k.map(i=>{const o=new Date(i.created_at||Date.now()).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),a=typeof i.printing_cost=="number"?`$ ${i.printing_cost.toLocaleString()}`:`$ ${i.printing_cost||0}`,r=typeof i.total_cost_with_printing=="number"?`$ ${i.total_cost_with_printing.toLocaleString()}`:`$ ${i.total_cost_with_printing||0}`;return`
      <div class="quotation-card" data-quotation-id="${i.id}">
        <div>
          <div class="quotation-header">
            <span class="quotation-ref">REF: ${i.reference}</span>
            <span class="quotation-date">${o}</span>
          </div>

          <div class="quotation-details">
            <div><strong>Client:</strong> ${i.client_name||(e==null?void 0:e.name)||"Client"}</div>
            <div><strong>Media Type:</strong> ${i.media_type}</div>
            <div><strong>Location:</strong> ${i.media_location}</div>
            <div><strong>Period:</strong> ${i.period}</div>
            <div><strong>Printing Cost:</strong> ${a}</div>
          </div>
        </div>

        <div>
          <div class="quotation-total-box">
            <span style="font-size: 0.9rem; font-weight: 700; color: #555;">Total Amount:</span>
            <span style="font-size: 1.3rem; font-weight: 900; color: var(--primary-red);">${r}</span>
          </div>
          <button class="btn-view-quotation">View Full Quotation &rarr;</button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".quotation-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-quotation-id"),a=k.find(r=>String(r.id)===String(o))||k[0];a&&je(a)})})}function je(e){const t=document.getElementById("quotationModal"),n=document.getElementById("quotationDocContent");if(!t||!n)return;const i=new Date(e.created_at||Date.now()).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=typeof e.printing_cost=="number"?e.printing_cost:parseFloat(e.printing_cost||0),a=typeof e.total_cost_wo_printing=="number"?e.total_cost_wo_printing:parseFloat(e.total_cost_wo_printing||0),r=typeof e.total_cost_with_printing=="number"?e.total_cost_with_printing:parseFloat(e.total_cost_with_printing||0);n.innerHTML=`
    <div class="quotation-doc-header">
      <div>
        <div style="font-size: 2.2rem; font-weight: 500; color: #111;"><span>ad</span><span style="color: var(--primary-red);">effect</span></div>
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-red); letter-spacing: 2px;">CONNECTING MEDIA</div>
        <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">North Lebanon | Outdoor Advertising</div>
      </div>
      <div style="text-align: right;">
        <h2 style="font-size: 1.8rem; font-weight: 900; color: #111;">OFFICIAL QUOTATION</h2>
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary-red);">QUO-${e.id}</div>
        <div style="font-size: 0.85rem; color: #666;">Date: ${i}</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; background: #F9FAFB; padding: 16px 20px; border-radius: 12px; border: 1.5px solid #E5E7EB;">
      <div>
        <div style="font-size: 0.8rem; font-weight: 800; color: #888; text-transform: uppercase;">PREPARED FOR CLIENT</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: #111; margin-top: 2px;">${e.client_name||"Valued Client"}</div>
        <div style="font-size: 0.9rem; color: #555;">Client ID: ${e.client_id}</div>
      </div>
      <div>
        <div style="font-size: 0.8rem; font-weight: 800; color: #888; text-transform: uppercase;">CAMPAIGN REFERENCE</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-red); margin-top: 2px;">Billboard ${e.reference}</div>
        <div style="font-size: 0.9rem; color: #555;">Location: ${e.media_location}</div>
      </div>
    </div>

    <table class="quotation-table">
      <thead>
        <tr>
          <th>Item & Media Description</th>
          <th>Frequency</th>
          <th>Period</th>
          <th style="text-align: right;">Amount (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${e.media_type} (${e.reference})</strong><br/>
            <span style="font-size: 0.85rem; color: #666;">Media Material: ${e.media_used}</span>
          </td>
          <td>${e.frequency||1}</td>
          <td>${e.period}</td>
          <td style="text-align: right; font-weight: 800;">$ ${a.toLocaleString(void 0,{minimumFractionDigits:2})}</td>
        </tr>
        <tr>
          <td>
            <strong>Printing & Production Cost</strong><br/>
            <span style="font-size: 0.85rem; color: #666;">High resolution outdoor print & installation</span>
          </td>
          <td>${e.frequency||1}</td>
          <td>One-time</td>
          <td style="text-align: right; font-weight: 800;">$ ${o.toLocaleString(void 0,{minimumFractionDigits:2})}</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <div style="width: 320px; background: #F4F4F6; padding: 16px 20px; border-radius: 14px; border: 2px solid #111;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">
          <span>Subtotal w/o Printing:</span>
          <span>$ ${a.toLocaleString(void 0,{minimumFractionDigits:2})}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">
          <span>Printing & Mounting:</span>
          <span>$ ${o.toLocaleString(void 0,{minimumFractionDigits:2})}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 2px solid #111; padding-top: 10px; font-weight: 900; font-size: 1.2rem; color: var(--primary-red);">
          <span>Total Payable:</span>
          <span>$ ${r.toLocaleString(void 0,{minimumFractionDigits:2})}</span>
        </div>
      </div>
    </div>
  `,t.classList.add("active")}function He(){window.print()}let x=null,g={billboard_id:"",start_time:"",end_time:"",brief_url:"",brief_filename:"",extra_services:[]},D=new Date,ue=[];function Je(){const e=document.getElementById("btnDetailBookNow");e&&e.addEventListener("click",()=>Ge());const t=document.getElementById("bookingStartDate"),n=document.getElementById("bookingEndDate");t&&t.addEventListener("change",H),n&&n.addEventListener("change",H);const i=document.getElementById("calPrevMonth"),o=document.getElementById("calNextMonth");i&&i.addEventListener("click",()=>{D.setMonth(D.getMonth()-1),P()}),o&&o.addEventListener("click",()=>{D.setMonth(D.getMonth()+1),P()});const a=document.getElementById("btnStep1Next");a&&a.addEventListener("click",Qe),We();const r=document.getElementById("btnStep2Next");r&&r.addEventListener("click",Ye),Xe();const s=document.getElementById("btnStep3Next");s&&s.addEventListener("click",Ze);const l=document.getElementById("btnConfirmBooking");l&&l.addEventListener("click",et);const c=document.getElementById("btnCloseDetailModal");c&&c.addEventListener("click",pe);const d=document.getElementById("btnCloseWizardModal");d&&d.addEventListener("click",ge)}async function me(e){const t=await re(e),i=(await Q()).filter(o=>o.billboard_id===e&&o.status!=="Rejected");ue=[...t,...i],P()}function H(){const e=document.getElementById("dateWarningBox");e&&e.classList.remove("active"),P()}async function P(){var m,b;const e=document.getElementById("calMonthTitle"),t=document.getElementById("calendarDaysGrid");if(!t)return;const n=D.getFullYear(),i=D.getMonth(),o=["January","February","March","April","May","June","July","August","September","October","November","December"];e&&(e.textContent=`${o[i]} ${n}`);const a=new Date(n,i,1).getDay(),r=new Date(n,i+1,0).getDate(),s=(m=document.getElementById("bookingStartDate"))==null?void 0:m.value,l=(b=document.getElementById("bookingEndDate"))==null?void 0:b.value,c=s?new Date(s+"T00:00:00").getTime():null,d=l?new Date(l+"T23:59:59").getTime():null;t.innerHTML="";for(let u=0;u<a;u++){const _=document.createElement("div");_.style.height="36px",t.appendChild(_)}for(let u=1;u<=r;u++){const p=new Date(n,i,u).getTime(),S=`${n}-${String(i+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,f=document.createElement("div");f.textContent=u,f.style.cssText="height: 36px; display: grid; place-content: center; font-weight: 700; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.15s ease; border: 1px solid #E5E7EB;";let X=!1;for(const I of ue){const E=new Date(I.start_time||I.start_date).getTime(),L=new Date(I.end_time||I.end_date).getTime();if(!isNaN(E)&&!isNaN(L)&&p>=E&&p<=L){X=!0;break}}if(X)f.style.background="#FECACA",f.style.color="#991B1B",f.style.border="1.5px dashed #EF4444",f.title="This date is already booked.";else{let I=!1;c&&d&&c<=d?p>=c&&p<=d&&(I=!0):c&&p===c&&(I=!0),I?(f.style.background="var(--primary-red)",f.style.color="#FFFFFF",f.style.fontWeight="900",f.style.border="1.5px solid #111"):(f.addEventListener("mouseenter",()=>f.style.borderColor="#111"),f.addEventListener("mouseleave",()=>f.style.borderColor="#E5E7EB")),f.addEventListener("click",()=>{const E=document.getElementById("bookingStartDate"),L=document.getElementById("bookingEndDate");!E.value||E.value&&L.value?(E.value=S,L.value=""):E.value&&!L.value&&(new Date(S)<new Date(E.value)?E.value=S:L.value=S),H()})}t.appendChild(f)}}function Ve(e){x=e,g.billboard_id=e.billboard_id,document.getElementById("detailBillboardId").textContent=e.billboard_id,document.getElementById("detailLocation").textContent=e.location,document.getElementById("detailType").textContent=(e.type||"Unipole").toUpperCase(),document.getElementById("detailSize").textContent=e.size||"W:147 H:43",document.getElementById("detailPrice").textContent=e.price||"$ 1,000",document.getElementById("detailImage").src=e.image_url;const t=document.getElementById("btnMaps360");t&&(t.href=e.maps_url||"https://maps.google.com"),me(e.billboard_id);const n=document.getElementById("detailModal");n&&n.classList.add("active")}function pe(){const e=document.getElementById("detailModal");e&&e.classList.remove("active")}function Ge(){pe(),me(g.billboard_id),U(1);const e=document.getElementById("wizardModal");e&&e.classList.add("active")}function ge(){const e=document.getElementById("wizardModal");e&&e.classList.remove("active")}function U(e){for(let t=1;t<=4;t++){const n=document.getElementById(`wizardStep${t}`);n&&(n.style.display=t===e?"block":"none")}}async function Qe(){var o,a;const e=(o=document.getElementById("bookingStartDate"))==null?void 0:o.value,t=(a=document.getElementById("bookingEndDate"))==null?void 0:a.value,n=document.getElementById("dateWarningBox");if(!e||!t){n&&(n.textContent="Please select both start and end dates.",n.classList.add("active"));return}const i=await Fe(g.billboard_id,e,t,x==null?void 0:x.size);if(!i.valid){n&&(n.textContent=i.message||"Unavailable or unsuitable time frame, please choose another",n.classList.add("active"));return}n&&n.classList.remove("active"),g.start_time=new Date(e).toISOString(),g.end_time=new Date(t).toISOString(),U(2)}function We(){const e=document.getElementById("pdfDropzone"),t=document.getElementById("pdfFileInput");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",n=>{n.preventDefault(),e.classList.add("dragover")}),e.addEventListener("dragleave",()=>e.classList.remove("dragover")),e.addEventListener("drop",n=>{n.preventDefault(),e.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&ie(n.dataTransfer.files[0])}),t.addEventListener("change",n=>{n.target.files&&n.target.files.length>0&&ie(n.target.files[0])}))}async function ie(e){if(e.type!=="application/pdf"&&!e.name.endsWith(".pdf")){alert("Invalid file format. Please upload a PDF file.");return}const t=5*1024*1024;if(e.size>t){alert("File size exceeds 5MB limit. Please upload a smaller PDF file.");return}const n=document.getElementById("dropzoneStatusText");n&&(n.textContent="Uploading PDF brief...");const i=await ke(e);if(i.success){g.brief_url=i.url,g.brief_filename=i.filename;const o=document.getElementById("pdfFilePreview"),a=document.getElementById("pdfPreviewName");o&&a&&(a.textContent=`${e.name} (${(e.size/(1024*1024)).toFixed(2)} MB)`,o.style.display="flex"),n&&(n.textContent="PDF Uploaded Successfully!")}else alert("Failed to upload PDF file. Please try again."),n&&(n.textContent="Drag & Drop or Upload PDF")}function Ye(){if(!g.brief_url){alert("Please upload a PDF brief before proceeding.");return}U(3)}function Xe(){const e=document.getElementById("extraServicesList");e&&e.querySelectorAll(".service-option-card").forEach(t=>{t.addEventListener("click",()=>{t.classList.toggle("selected");const n=t.getAttribute("data-service");t.classList.contains("selected")?g.extra_services.includes(n)||g.extra_services.push(n):g.extra_services=g.extra_services.filter(i=>i!==n)})})}function Ze(){Ke(),U(4)}function Ke(){if(!x)return;document.getElementById("summaryBillboardImg").src=x.image_url,document.getElementById("summaryBillboardId").textContent=x.billboard_id,document.getElementById("summaryLocation").textContent=x.location;const e=new Date(g.start_time).toLocaleDateString("en-US",{month:"short",day:"numeric"}),t=new Date(g.end_time).toLocaleDateString("en-US",{month:"short",day:"numeric"});document.getElementById("summaryDateRange").textContent=`${e} ➔ ${t}`;const n=document.getElementById("summaryServicesList");n&&(g.extra_services.length===0?n.innerHTML='<div style="color: #666; font-style: italic;">No extra services selected.</div>':n.innerHTML=g.extra_services.map(i=>`
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #111; margin-top: 6px;">
          <span style="color: var(--primary-red); font-size: 1.2rem;">☑</span> ${i}
        </div>
      `).join(""))}async function et(){const e=w();if(!e){alert("Please sign in to submit your booking request."),v("authSection");return}const t=document.getElementById("btnConfirmBooking");t&&(t.disabled=!0,t.textContent="Submitting Request...");const n={user_email:e.email,billboard_id:g.billboard_id,start_time:g.start_time,end_time:g.end_time,brief_url:g.brief_url,extra_services:g.extra_services},i=await De(n);t&&(t.disabled=!1,t.textContent="Confirm Request"),i.success?(ge(),tt("Your request has been received! It will be reviewed and you will be contacted shortly."),Y(),v("dashboardSection")):alert("Failed to submit booking request. Please try again.")}function tt(e){const t=document.getElementById("toastContainer");if(!t)return;const n=document.createElement("div");n.className="toast-message",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s ease",setTimeout(()=>n.remove(),300)},5e3)}let F=[],y={searchQuery:"",locations:[],structures:[],availability:[],sizes:[]};async function nt(){if(F=await K(),console.log("Structure values:",[...new Set(F.map(s=>s.structure))]),!document.getElementById("billboardsGrid"))return;F=await K(),fe(F);const t=document.getElementById("discoverySearchInput");t&&t.addEventListener("input",s=>{y.searchQuery=s.target.value.toLowerCase().trim(),j()});const n=document.getElementById("btnToggleFilter"),i=document.getElementById("filterModal"),o=document.getElementById("btnCloseFilter"),a=document.getElementById("btnApplyFilter"),r=document.getElementById("btnResetFilter");n&&i&&n.addEventListener("click",()=>i.classList.add("active")),o&&i&&o.addEventListener("click",()=>i.classList.remove("active")),a&&i&&a.addEventListener("click",()=>{it(),j(),i.classList.remove("active")}),r&&i&&r.addEventListener("click",()=>{ot(),j(),i.classList.remove("active")}),window.addEventListener("authChange",oe),oe()}function oe(){const e=document.getElementById("accessBanner"),t=w();e&&(t&&t.status==="verified"?e.style.display="none":e.style.display="flex")}function it(){y.locations=Array.from(document.querySelectorAll('input[name="filter_location"]:checked')).map(e=>e.value),y.structures=Array.from(document.querySelectorAll('input[name="filter_structure"]:checked')).map(e=>e.value),y.availability=Array.from(document.querySelectorAll('input[name="filter_availability"]:checked')).map(e=>e.value),y.sizes=Array.from(document.querySelectorAll('input[name="filter_size"]:checked')).map(e=>e.value)}function ot(){document.querySelectorAll('.filter-modal-content input[type="checkbox"]').forEach(e=>{e.checked=!1}),y={searchQuery:y.searchQuery,locations:[],structures:[],availability:[],sizes:[]}}function j(){const e=F.filter(t=>{const n=(t.location||"").toLowerCase(),i=(t.structure||"").toLowerCase(),o=(t.billboard_id||"").toLowerCase(),a=(typeof t.is_available=="boolean"?t.is_available?"available":"unavailable":t.is_available||"").toLowerCase(),r=(t.size||"").replace(/\s+/g,"").toLowerCase();if(y.searchQuery){const s=y.searchQuery,l=o.includes(s),c=n.includes(s),d=i.includes(s);if(!l&&!c&&!d)return!1}return!(y.locations.length>0&&!y.locations.some(l=>n.includes(l.toLowerCase()))||y.structures.length>0&&!y.structures.some(l=>i.includes(l.toLowerCase()))||y.availability.length>0&&!y.availability.some(l=>a.includes(l.toLowerCase()))||y.sizes.length>0&&!y.sizes.some(l=>r.includes(l.replace(/\s+/g,"").toLowerCase())))});fe(e)}function fe(e){const t=document.getElementById("billboardsGrid");if(t){if(e.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.4rem; font-weight: 800; color: #666;">No billboards match your search filter</h3>
        <p style="color: #999; margin-top: 8px;">Try selecting different options or resetting your search.</p>
      </div>
    `;return}t.innerHTML=e.map(n=>{const i=n.is_available==="Available"||n.is_available===!0,o=i?"Available":n.is_available===!1?"Unavailable":n.is_available||"Available",a=i?"status-available":"status-soon",r=i?"Book Now":"Check Schedule",s=(n.location||"North Lebanon").split(",")[0];return`
      <div class="billboard-card" data-id="${n.billboard_id}">
        <div class="card-image-wrapper">
          <img src="${n.image_url}" alt="Billboard ${n.billboard_id}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
          <div class="billboard-tag">
            ${n.billboard_id}
            <span>${s}</span>
          </div>
        </div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${n.billboard_id}</h3>
            <span class="card-status ${a}">${o}</span>
          </div>
          <div class="card-location">${n.location||"North Lebanon / Network"}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: #666; text-transform: uppercase;">${n.structure||"Billboard"}</span>
            <span style="font-weight: 900; color: var(--primary-red); font-size: 1.15rem;">${n.price}</span>
          </div>
          <button class="btn-card-action ${i?"":"soon"}" data-id="${n.billboard_id}" style="margin-top: 14px;">
            ${r}
          </button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".billboard-card, .btn-card-action").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const o=n.getAttribute("data-id");at(o)})})}}function at(e){const t=w();if(!t||t.status!=="verified")v("authSection");else{const n=F.find(i=>i.billboard_id===e);n&&Ve(n)}}let z=null,J=null;async function st(){const e=h();if(!e){n.style.display="block";return}const t=document.getElementById("careersLoading"),n=document.getElementById("careersEmpty"),i=document.getElementById("careersJobsList");if(!t||!n||!i)return;t.style.display="block",n.style.display="none",i.style.display="none",i.innerHTML="";const{data:o,error:a}=await e.from("careers").select("*");if(t.style.display="none",a||!o||o.length===0){n.style.display="block";return}i.style.display="flex",o.forEach(r=>{const s=document.createElement("div");s.style.cssText=`
      border: 2.5px solid #111;
      border-radius: 20px;
      padding: 32px 36px;
      box-shadow: 5px 5px 0px #111;
      background: #fff;
      transition: transform 0.15s, box-shadow 0.15s;
    `,s.addEventListener("mouseover",()=>{s.style.transform="translate(-2px,-2px)",s.style.boxShadow="7px 7px 0px #111"}),s.addEventListener("mouseout",()=>{s.style.transform="",s.style.boxShadow="5px 5px 0px #111"});const l=r.requirements||"",c=l.length>200,d=c?l.slice(0,200)+"...":l,m=`req-${r.role_id}`;s.innerHTML=`
      <h3 style="font-size:1.35rem;font-weight:900;color:var(--primary-red,#D72638);margin:0 0 14px;">${r.job_title}</h3>
      <p id="${m}" style="font-size:0.97rem;font-weight:600;color:#333;line-height:1.7;margin:0 0 6px;">
        <strong>Requirements:</strong> ${d}
      </p>
      ${c?`<a href="#" data-toggle-req="${m}" data-full="${encodeURIComponent(l)}" data-preview="${encodeURIComponent(d)}"
              style="font-size:0.85rem;font-weight:800;color:var(--primary-red,#D72638);text-decoration:underline;display:inline-block;margin-bottom:18px;">
              Read more
           </a>`:'<div style="margin-bottom:18px;"></div>'}
      <button data-open-cv="${r.role_id}" data-job-title="${encodeURIComponent(r.job_title)}"
        style="width:100%;background:var(--primary-red,#D72638);color:#fff;border:2.5px solid #111;border-radius:12px;padding:15px;
               font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:800;cursor:pointer;
               box-shadow:4px 4px 0px #111;letter-spacing:0.5px;transition:transform 0.1s,box-shadow 0.1s;">
        Send us your CV
      </button>
    `,i.appendChild(s)}),i.addEventListener("click",rt)}function rt(e){const t=e.target.closest("[data-toggle-req]");if(t){e.preventDefault();const i=t.dataset.toggleReq,o=decodeURIComponent(t.dataset.full),a=decodeURIComponent(t.dataset.preview),r=document.getElementById(i),s=t.textContent.trim()==="Read more";r.innerHTML=`<strong>Requirements:</strong> ${s?o:a}`,t.textContent=s?"Read less":"Read more";return}const n=e.target.closest("[data-open-cv]");if(n){const i=n.dataset.openCv,o=decodeURIComponent(n.dataset.jobTitle);lt(i,o);return}}function lt(e,t){J=e,document.getElementById("cvModalJobTitle").textContent=t,document.getElementById("cvApplicantName").value="",ve(),ye(),document.getElementById("cvModal").style.display="flex"}function V(){document.getElementById("cvModal").style.display="none"}function ae(e){if(e){if(e.type!=="application/pdf"){A("Only PDF files are accepted.");return}if(e.size>5*1024*1024){A("File is too large. Maximum size is 5MB.");return}z=e,document.getElementById("cvFileName").textContent=e.name,document.getElementById("cvFilePreview").style.display="flex",document.getElementById("cvDropzoneText").innerHTML='File selected ✓ <span style="color:var(--primary-red,#D72638);text-decoration:underline;">change</span>',ve()}}function ye(){z=null;const e=document.getElementById("cvFileInput");e&&(e.value="");const t=document.getElementById("cvFilePreview");t&&(t.style.display="none");const n=document.getElementById("cvDropzoneText");n&&(n.innerHTML='Drag & drop your CV here, or <span style="color:var(--primary-red,#D72638);text-decoration:underline;">browse</span>')}function A(e){const t=document.getElementById("cvModalError");t&&(t.textContent=e,t.style.display="block")}function ve(){const e=document.getElementById("cvModalError");e&&(e.style.display="none")}async function ct(){const e=h();if(!e){A("Connection unavailable. Please try again.");return}const{error:t}=await e.storage,n=document.getElementById("cvApplicantName").value.trim();if(!n){A("Please enter your full name.");return}if(!z){A("Please upload your CV in PDF format.");return}const i=document.getElementById("btnSendCv");i.textContent="Uploading...",i.disabled=!0;try{const o=`${J}_${Date.now()}_${z.name.replace(/\s+/g,"_")}`,{error:a}=await e.storage.from("cv_careers").upload(o,z,{contentType:"application/pdf",upsert:!1});if(a)throw new Error("CV upload failed: "+a.message);const{data:r}=e.storage.from("cv_careers").getPublicUrl(o),s=(r==null?void 0:r.publicUrl)||o,{error:l}=await e.from("career_applications").insert({role_id:J,applicant_name:n,cv_url:s});if(l)throw new Error("Submission failed: "+l.message);V(),document.getElementById("cvSuccessModal").style.display="flex"}catch(o){A(o.message||"Something went wrong. Please try again.")}finally{i.textContent="Send Application",i.disabled=!1}}function dt(){var t,n,i,o,a,r;(t=document.getElementById("btnCloseCvModal"))==null||t.addEventListener("click",V),(n=document.getElementById("cvModal"))==null||n.addEventListener("click",s=>{s.target===s.currentTarget&&V()}),(i=document.getElementById("btnSendCv"))==null||i.addEventListener("click",ct),(o=document.getElementById("cvFileInput"))==null||o.addEventListener("change",s=>ae(s.target.files[0]));const e=document.getElementById("cvDropzone");e&&(e.addEventListener("dragover",s=>{s.preventDefault(),e.style.background="#FFF0F0",e.style.borderColor="var(--primary-red,#D72638)"}),e.addEventListener("dragleave",()=>{e.style.background="#FAFAFA",e.style.borderColor="#111"}),e.addEventListener("drop",s=>{s.preventDefault(),e.style.background="#FAFAFA",e.style.borderColor="#111",ae(s.dataTransfer.files[0])}),e.addEventListener("click",()=>{var s;return(s=document.getElementById("cvFileInput"))==null?void 0:s.click()})),(a=document.getElementById("cvFilePreview"))==null||a.addEventListener("click",s=>{s.target.closest("button")&&ye()}),(r=document.getElementById("cvSuccessModal"))==null||r.addEventListener("click",s=>{(s.target===s.currentTarget||s.target.closest("button"))&&(document.getElementById("cvSuccessModal").style.display="none")})}window.showPage=function(e){v(e),e==="careers"&&st()};document.addEventListener("DOMContentLoaded",()=>{we(),Ee(),Ie(),Be(),xe(),Se(),ze(),nt(),Je(),Ue(),dt();const e=document.querySelectorAll("section"),t=document.querySelectorAll(".nav-item"),n={root:null,threshold:.3},i=new IntersectionObserver(a=>{a.forEach(r=>{if(r.isIntersecting){const s=r.target.getAttribute("id");t.forEach(l=>{const c=l.querySelector("a");c&&c.getAttribute("href")===`#${s}`?l.classList.add("active"):l.classList.remove("active")}),s==="about"||s==="contact"?document.body.classList.add("dark-header"):document.body.classList.remove("dark-header")}})},n);e.forEach(a=>i.observe(a));const o=window.location.hash?window.location.hash.replace("#",""):"home";o&&["discoverySection","authSection","dashboardSection"].includes(o)&&v(o),window.addEventListener("hashchange",()=>{const a=window.location.hash?window.location.hash.replace("#",""):"home";a&&v(a)})});
