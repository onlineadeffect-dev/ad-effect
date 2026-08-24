(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function de(){const e=document.getElementById("dotsContainer"),t=document.querySelectorAll(".dot"),n=document.getElementById("logoText"),i=document.getElementById("sloganText"),o=document.getElementById("brandAssembly"),a=document.getElementById("billboardsStage"),s=document.getElementById("ctaButtons"),r=document.getElementById("replayBtn");function l(){e.classList.remove("vertical"),n.classList.remove("show"),i.classList.remove("typing"),o.classList.remove("shifted-up"),a.classList.remove("show"),s.classList.remove("show"),t.forEach(c=>{c.classList.remove("pop-1","pop-2","pop-3"),c.style.opacity="0",c.style.transform="scale(0)"}),setTimeout(()=>{t[0].classList.add("pop-1"),t[1].classList.add("pop-2"),t[2].classList.add("pop-3")},100),setTimeout(()=>{e.classList.add("vertical"),n.classList.add("show"),i.classList.add("typing")},750),setTimeout(()=>{o.classList.add("shifted-up"),a.classList.add("show"),s.classList.add("show")},1550)}l(),r&&r.addEventListener("click",l)}function ue(){const e=document.getElementById("carouselTrack");if(!e)return;Array.from(e.children).forEach(s=>{const r=s.cloneNode(!0);e.appendChild(r)});let n=0;const i=1.2,o=e.scrollWidth/2;function a(){n+=i,n>=o&&(n=0),e.style.transform=`translateX(-${n}px)`;const s=window.innerWidth/2,r=e.querySelectorAll(".carousel-item");let l=null,c=1/0;r.forEach(d=>{const f=d.getBoundingClientRect(),v=f.left+f.width/2,u=Math.abs(s-v);d.classList.remove("active-center"),u<c&&(c=u,l=d)}),l&&c<220&&l.classList.add("active-center"),requestAnimationFrame(a)}requestAnimationFrame(a)}const me={billboards:{title:"Billboards",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 16v4M17 16v4M12 16v4"/><path d="M4 8h16"/></svg>',body:`
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
    `}};function pe(){const e=document.querySelectorAll(".service-item"),t=document.getElementById("serviceCardTitle"),n=document.getElementById("serviceCardIcon"),i=document.getElementById("serviceCardBody");e.length&&e.forEach(o=>{o.addEventListener("click",()=>{const a=o.getAttribute("data-service"),s=me[a];s&&(e.forEach(r=>r.classList.remove("active")),o.classList.add("active"),t&&(t.textContent=s.title),n&&(n.innerHTML=s.icon),i&&(i.innerHTML=s.body))})})}function ge(){const e=document.querySelectorAll(".project-card"),t=document.getElementById("projects");if(!t||!e.length)return;const n={root:null,threshold:.15};new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&e.forEach((s,r)=>{setTimeout(()=>{s.classList.add("pop-in")},r*120)})})},n).observe(t)}function fe(){const e=document.getElementById("contactForm"),t=document.getElementById("contactEmail"),n=document.getElementById("contactMessage"),i=document.getElementById("emailError"),o=document.getElementById("messageError");if(!e)return;function a(s){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).toLowerCase())}e.addEventListener("submit",s=>{s.preventDefault();let r=!0;i.classList.remove("show"),o.classList.remove("show");const l=t.value.trim(),c=n.value.trim();if((!l||!a(l))&&(i.textContent="Please enter a valid email address.",i.classList.add("show"),r=!1),c||(o.textContent="Please write a message before sending.",o.classList.add("show"),r=!1),r){const d="Reservation@ad-effect.com",f=encodeURIComponent("New Ad Effect Website Inquiry"),v=encodeURIComponent(`From: ${l}

Message:
${c}`),u=`mailto:${d}?subject=${f}&body=${v}`;window.location.href=u,alert("Thank you! Opening your email client to send your message to ssamadmiryam@gmail.com."),e.reset()}})}const K={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA",VITE_SUPABASE_URL:"https://iyznlhahblpjczjzmscy.supabase.co"},ye=typeof import.meta<"u"&&import.meta&&K&&"https://iyznlhahblpjczjzmscy.supabase.co"||"https://iyznlhahblpjczjzmscy.supabase.co",A=ye.replace(/\/rest\/v1\/?$/,"").replace(/\/+$/,""),$=typeof import.meta<"u"&&import.meta&&K&&"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA"||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA";let N=null;function h(){if(typeof window<"u"&&!N&&window.supabase&&A&&$&&!A.includes("your-supabase-project-id"))try{N=window.supabase.createClient(A,$)}catch(e){console.warn("Supabase initialization warning:",e)}return N}function P(e){return Array.isArray(e)?e.map(t=>{let n=t.price;typeof t.price=="number"?n=`$ ${t.price.toLocaleString()}`:t.price&&!t.price.toString().startsWith("$")&&(n=`$ ${t.price}`);let i=t.is_available;return typeof t.is_available=="boolean"?i=t.is_available?"Available":"Unavailable":t.is_available||(i="Available"),{...t,id:t.id||t.billboard_id,billboard_id:t.billboard_id||`BB-${t.id}`,location:t.location||"Tripoli Entrance & Avenue",maps_url:t.maps_url||"https://maps.google.com/?q=Tripoli,Lebanon",size:t.size||"Standard Size",price:n||"$ 1,000",numericPrice:typeof t.price=="number"?t.price:parseFloat((t.price||"").toString().replace(/[^0-9.]/g,""))||0,image_url:t.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:t.type||"Unipole",is_available:i,available_until:t.available_until||null}}):[]}const V=[{billboard_id:"U002-A",location:"Bahsas, Tripoli Entrance",maps_url:"https://www.google.com/maps/place/Ad+effect/data=!4m2!3m1!1s0x0:0x1c8a54b37c14fbfc?sa=X&ved=1t:2428&ictx=111",size:"W:147 - H:43",price:"$ 1,000",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available",available_until:null},{billboard_id:"U002-B",location:"Bahsas, Tripoli Entrance",maps_url:"https://maps.google.com/maps?q=34.396779039964066,35.79991279815192",size:"W: 40 - H: 30",price:"$ 1,200",image_url:"https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available Soon",available_until:"2026-09-01"}];function x(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function R(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving local state:",n)}}async function ee(){const e=h();if(e)try{const{data:n,error:i}=await e.from("billboards").select("*");if(!i&&n&&n.length>0)return P(n);i&&console.warn("Supabase JS Client error:",i.message)}catch(n){console.warn("Supabase JS Client fetch failed, trying direct REST fetch:",n)}try{const n=await fetch(`${A}/rest/v1/billboards?select=*`,{headers:{apikey:$,Authorization:`Bearer ${$}`}});if(n.ok){const i=await n.json();if(Array.isArray(i)&&i.length>0)return P(i)}else console.warn("Direct REST fetch returned status:",n.status)}catch(n){console.warn("Direct REST fetch exception:",n)}let t=x("adeffect_billboards",null);return t||(R("adeffect_billboards",V),t=V),P(t)}async function ve(e){console.log(e.user_name);const t={user_name:e.user_name,business_name:e.business_name,website:e.website||"",phone_number:e.phone_number,email:e.email,location:e.location||"",hear_about_us:e.hear_about_us||[],created_at:new Date().toISOString()},n=h();if(n)try{const{data:i,error:o}=await n.from("pending_users").insert([t]).select();if(!o)return W(t),{success:!0,data:i};console.warn("Supabase insert pending_users warning:",o)}catch(i){console.warn("Supabase insert pending_users exception:",i)}return W(t),{success:!0,data:[t]}}function W(e){const t=x("adeffect_pending_users",[]);t.push(e),R("adeffect_pending_users",t)}async function be(e){const t=e.name.split(".").pop(),i=`briefs/${`${Date.now()}_${Math.random().toString(36).substring(2,7)}.${t}`}`,o=h();if(o)try{const{data:s,error:r}=await o.storage.from("Briefs of Pending Requests").upload(i,e);if(!r&&s){const{data:l}=o.storage.from("Briefs of Pending Requests").getPublicUrl(i);return{success:!0,url:l.publicUrl,filename:e.name}}console.warn("Supabase Storage upload warning:",r)}catch(s){console.warn("Supabase Storage upload exception:",s)}return{success:!0,url:URL.createObjectURL(e),filename:e.name,isLocalFallback:!0}}async function he(e){const t={user_email:e.user_email,billboard_id:e.billboard_id,start_time:e.start_time,end_time:e.end_time,brief_url:e.brief_url,extra_services:e.extra_services||[],status:"Pending Review",created_at:new Date().toISOString()},n=h();if(n)try{const{data:i,error:o}=await n.from("pending_bookings").insert([t]).select();if(!o)return Q(t),{success:!0,data:i};console.warn("Supabase insert pending_bookings warning:",o)}catch(i){console.warn("Supabase insert pending_bookings exception:",i)}return Q(t),{success:!0,data:[t]}}function Q(e){const t=x("adeffect_pending_bookings",[]);t.unshift(e),R("adeffect_pending_bookings",t)}async function j(e=null){const t=h();if(t)try{let i=t.from("pending_bookings").select("*");e&&(i=i.eq("user_email",e));const{data:o,error:a}=await i;if(!a&&o)return o}catch(i){console.warn("Supabase fetch pending_bookings error:",i)}const n=x("adeffect_pending_bookings",[]);return e?n.filter(i=>i.user_email===e):n}async function te(e){const t=h();let n=[];if(t)try{let i=t.from("bookings").select("*");e&&(i=i.eq("billboard_id",e));const{data:o,error:a}=await i;!a&&o&&(n=o)}catch(i){console.warn("Supabase fetch bookings error:",i)}if(n.length===0){const i=x("adeffect_confirmed_bookings",[{id:101,client_id:"user-sample-id",billboard_id:"U002-A",start_time:"2026-09-01T00:00:00.000Z",end_time:"2026-09-15T00:00:00.000Z",is_active:!0,created_at:"2026-08-01T00:00:00.000Z"}]);n=e?i.filter(o=>o.billboard_id===e):i}return n}async function we(e,t,n){const i=await j(),o=await te(e),a=new Date(t).getTime(),s=new Date(n).getTime();if(isNaN(a)||isNaN(s)||a>=s)return{valid:!1,message:"Start date must be before end date."};const r=[...i.filter(l=>l.billboard_id===e&&l.status!=="Rejected"),...o.filter(l=>l.billboard_id===e)];for(const l of r){const c=new Date(l.start_time||l.start_date).getTime(),d=new Date(l.end_time||l.end_date).getTime();if(!isNaN(c)&&!isNaN(d)&&a<=d&&s>=c)return{valid:!1,message:"Selected timeframe overlaps with an existing booking for this billboard. Please choose another date range."}}return{valid:!0}}async function _e(e,t=null){const n=h();let i=[];if(n)try{let s=n.from("bookings").select("*, billboards(*)").eq("is_active",!0);e&&(s=s.eq("client_id",e));const{data:r,error:l}=await s;if(!l&&r&&r.length>0)return r}catch(s){console.warn("Supabase fetch active bookings error:",s)}const o=await ee(),a=o.find(s=>s.billboard_id==="U002-A")||o[0];return i=x("adeffect_active_bookings",[{id:1,client_id:e||"current_user",billboard_id:a?a.billboard_id:"U002-A",is_active:!0,start_time:"2026-08-01T00:00:00.000Z",end_time:"2026-08-31T00:00:00.000Z",impressions_per_week:142500,billboards:a}]),i}async function Ee(e,t=null){const n=h();if(n)try{let o=n.from("quotations").select("*");e&&(o=o.eq("client_id",e));const{data:a,error:s}=await o;if(!s&&a)return a}catch(o){console.warn("Supabase fetch quotations error:",o)}return x("adeffect_quotations",[{id:501,created_at:new Date().toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Outdoor Unipole",media_used:"Backlit Vinyl Print",reference:"U002-A",media_location:"Bahsas, Tripoli Entrance",frequency:1,period:"1 Month (Aug 2026)",printing_cost:250,total_cost_wo_printing:1e3,total_cost_with_printing:1250},{id:502,created_at:new Date(Date.now()-864e5*5).toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Megapole Network",media_used:"Frontlit Flex Banner",reference:"U002-B",media_location:"Dam & Farz Highway",frequency:2,period:"2 Months (Sep-Oct 2026)",printing_cost:400,total_cost_wo_printing:2400,total_cost_with_printing:2800}])}let F=null;function w(){if(!F){const e=localStorage.getItem("adeffect_auth_user");if(e)try{F=JSON.parse(e)}catch{}}return F}function ne(e){F=e,e?localStorage.setItem("adeffect_auth_user",JSON.stringify(e)):localStorage.removeItem("adeffect_auth_user"),window.dispatchEvent(new CustomEvent("authChange",{detail:{user:e}}))}function Be(){const e=document.getElementById("btnGoToDashboard");e&&e.addEventListener("click",a=>{a.preventDefault(),Ie()});const t=document.getElementById("signUpForm");t&&t.addEventListener("submit",Le);const n=document.getElementById("signInForm");n&&n.addEventListener("submit",xe);const i=document.getElementById("btnHeaderLogin");i&&i.addEventListener("click",a=>{a.preventDefault(),G("signin")});const o=document.getElementById("btnSwitchToSignUp");o&&o.addEventListener("click",a=>{a.preventDefault(),G("signup")}),y("home")}function Ie(){const e=w();e&&e.status==="verified"?y("dashboardSection"):y("authSection")}function G(e){const t=document.getElementById("signUpBox"),n=document.getElementById("signInBox"),i=document.getElementById("btnHeaderLogin");e==="signin"?(t&&(t.style.display="none"),n&&(n.style.display="block"),i&&(i.textContent="SIGN UP")):(t&&(t.style.display="block"),n&&(n.style.display="none"),i&&(i.textContent="LOG IN"))}async function xe(e){var d,f,v;e.preventDefault();const t=(d=document.getElementById("signinEmail"))==null?void 0:d.value.trim(),n=(f=document.getElementById("signinPassword"))==null?void 0:f.value.trim(),i=document.getElementById("signInErrorBox"),o=document.getElementById("signInSuccessBox");if(i&&(i.style.display="none"),o&&(o.style.display="none"),!t||!n){U("Please enter both your email address and password.");return}const a=h();let s=null;if(a)try{const{data:u,error:S}=await a.auth.signInWithPassword({email:t,password:n});if(S){U(`Login failed: ${S.message}`);return}if(u&&u.user){const E=((v=u.user.user_metadata)==null?void 0:v.full_name)||u.user.email.split("@")[0];s={id:u.user.id,email:u.user.email,name:E,status:"verified"}}}catch(u){console.warn("Supabase auth exception, checking demo login fallback:",u)}if(!s)if(t.includes("@")){const u=t.split("@")[0];s={id:"usr_"+Date.now(),email:t,name:u.charAt(0).toUpperCase()+u.slice(1),status:"verified"}}else{U("Invalid email format. Please check your credentials.");return}ne(s),Se("Login successful! Redirecting to your Client Dashboard...");const r=document.getElementById("dashboardGreetingName");r&&(r.textContent=`Hello, ${s.name}`);const l=document.getElementById("sidebarProfileName");l&&(l.textContent=s.name);const c=document.getElementById("signInForm");c&&c.reset(),setTimeout(()=>{o&&(o.style.display="none"),y("dashboardSection")},1e3)}function U(e){let t=document.getElementById("signInErrorBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInErrorBox",t.style.cssText="background: #FEF2F2; border: 2px solid #EF4444; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}function Se(e){let t=document.getElementById("signInSuccessBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInSuccessBox",t.style.cssText="background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}async function Le(e){var r,l,c,d;e.preventDefault();const t=(r=document.getElementById("signupName"))==null?void 0:r.value.trim(),n=(l=document.getElementById("signupBusiness"))==null?void 0:l.value.trim(),i=(c=document.getElementById("signupEmail"))==null?void 0:c.value.trim(),o=(d=document.getElementById("signupPhone"))==null?void 0:d.value.trim();if(!t||!n||!i||!o){alert("Please fill out all required fields.");return}if((await ve({user_name:t,business_name:n,email:i,phone_number:o})).success){const f=document.getElementById("pendingSuccessModal");f?f.classList.add("active"):(alert("Thank you for registering! Your account registration request is under review."),y("home"))}else alert("Failed to submit registration request.")}function y(e){const t=["home","about","services","projects","contact"],n=["discoverySection","authSection","dashboardSection"];if(e&&e.startsWith("#")&&(e=e.substring(1)),e==="dashboardSection"){const i=w();(!i||i.status!=="verified")&&(e="authSection")}n.includes(e)?(t.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="none")}),n.forEach(i=>{const o=document.getElementById(i);o&&(i===e?o.style.display=i==="dashboardSection"?"flex":"block":o.style.display="none")}),window.scrollTo({top:0,behavior:"smooth"})):(n.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="none")}),t.forEach(i=>{const o=document.getElementById(i);o&&(o.style.display="block")}))}let C=[],I=[];function Ce(){window.addEventListener("authChange",X),X();const e=document.querySelectorAll(".sidebar-link");e.forEach(s=>{s.addEventListener("click",r=>{r.preventDefault(),e.forEach(c=>c.classList.remove("active")),s.classList.add("active");const l=s.getAttribute("data-tab");ke(l)})});const t=document.getElementById("sidebarLogoutBtn");t&&t.addEventListener("click",()=>{ne(null),y("home")});const n=document.getElementById("btnNewBillboardRequest");n&&n.addEventListener("click",s=>{s.preventDefault(),y("discoverySection")});const i=document.getElementById("btnCloseQuotationModal");i&&i.addEventListener("click",()=>{const s=document.getElementById("quotationModal");s&&s.classList.remove("active")});const o=document.getElementById("btnCloseActiveModal");o&&o.addEventListener("click",()=>{const s=document.getElementById("activeBillboardModal");s&&s.classList.remove("active")});const a=document.getElementById("btnConvertToPDF");a&&a.addEventListener("click",$e)}function X(){const e=w(),t=document.getElementById("dashboardGreetingName"),n=document.getElementById("sidebarProfileName");e?(t&&(t.textContent=`Hello, ${e.name||"Client"}`),n&&(n.textContent=e.name||"Client Account")):(t&&(t.textContent="Hello, Client"),n&&(n.textContent="Client Profile")),ie(),H(),oe()}function ke(e){const t=document.getElementById("dashTabMain"),n=document.getElementById("dashTabRequests"),i=document.getElementById("dashTabActiveBillboards"),o=document.getElementById("dashTabQuotations");t&&(t.style.display="none"),n&&(n.style.display="none"),i&&(i.style.display="none"),o&&(o.style.display="none"),e==="requests"&&n?(n.style.display="block",H()):e==="active"&&i?(i.style.display="block",De()):e==="quotations"&&o?(o.style.display="block",oe()):t&&(t.style.display="block",ie())}async function ie(){const e=w(),t=document.getElementById("performancesGrid");if(!t)return;const n=e?e.id||e.email:null;if(I=await _e(n,e?e.email:null),I.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboard campaigns found</h3>
        <p style="color: #888; margin-top: 4px;">Once your billboard request is approved, active campaign metrics will be displayed here.</p>
      </div>
    `;return}t.innerHTML=I.map(i=>{const o=i.billboards||i,a=o.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",s=i.billboard_id||o.billboard_id||"U002-A",r=o.location||"Bahsas, Tripoli Entrance",l=i.impressions_per_week?`${i.impressions_per_week.toLocaleString()} / week`:"142,500 / week";return`
      <div class="billboard-card active-perf-card" data-booking-id="${i.id}" style="cursor: pointer;">
        <div class="card-image-wrapper">
          <img src="${a}" alt="Billboard ${s}" />
          <div class="billboard-tag">${s}<span>Active Campaign</span></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${s}</h3>
          <div class="card-location">${r}</div>
          <div style="margin-top: 8px; font-weight: 800; color: #16a34a; font-size: 0.9rem;">
            ● Live Impressions: ${l}
          </div>
          <button class="btn-card-action" style="margin-top: 12px; font-size: 0.85rem; padding: 8px;">View Campaign Specs &rarr;</button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".active-perf-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-booking-id"),a=I.find(s=>String(s.id)===String(o))||I[0];a&&Ae(a)})})}function De(){const e=document.getElementById("activeBillboardsGrid");if(e){if(I.length===0){e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboards</h3>
      </div>
    `;return}e.innerHTML=I.map(t=>{const n=t.billboards||t,i=n.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",o=t.billboard_id||n.billboard_id||"U002-A",a=n.location||"Bahsas, Tripoli Entrance";return`
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
    `}).join("")}}function Ae(e){const t=document.getElementById("activeBillboardModal"),n=document.getElementById("activeBillboardModalContent");if(!t||!n)return;const i=e.billboards||e,o=e.billboard_id||i.billboard_id||"U002-A";n.innerHTML=`
    <div style="text-align: left;">
      <h2 style="font-size: 2rem; font-weight: 900; color: var(--primary-red);">${o} - Active Billboard</h2>
      <div style="font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 4px;">${i.location||"Tripoli Entrance"}</div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div style="border-radius: 16px; overflow: hidden; border: 3px solid #111; height: 240px;">
          <img src="${i.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"}" alt="Billboard" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-weight: 600;">
          <div style="background: #DCFCE7; color: #15803D; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 1rem;">
            ✓ Campaign Status: ACTIVE
          </div>
          <div><strong>Media Type:</strong> ${i.type||"Unipole"}</div>
          <div><strong>Dimensions:</strong> ${i.size||"W:147 H:43"}</div>
          <div><strong>Weekly Impressions:</strong> ${e.impressions_per_week?e.impressions_per_week.toLocaleString():"142,500"}</div>
          <div><strong>Campaign Start:</strong> ${new Date(e.start_time||"2026-08-01").toLocaleDateString()}</div>
          <div><strong>Campaign End:</strong> ${new Date(e.end_time||"2026-08-31").toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  `,t.classList.add("active")}async function H(){const e=w(),t=document.getElementById("dashboardRequestsTableBody");if(!t)return;const n=e?e.email:null,i=await j(n);if(i.length===0){t.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: #666;">
          No pending billboard requests found. Click "New Billboard Request" to book a billboard.
        </td>
      </tr>
    `;return}t.innerHTML=i.map(o=>{const a=new Date(o.start_time).toLocaleDateString(),s=new Date(o.end_time).toLocaleDateString(),l=(o.status||"").toLowerCase().includes("pending")?'<span class="status-badge status-pending">Pending Review</span>':'<span class="status-badge status-approved">In Review</span>',c=Array.isArray(o.extra_services)?o.extra_services.join(", "):o.extra_services||"None",d=o.brief_url?`<a href="${o.brief_url}" target="_blank" style="color: var(--primary-red); font-weight: 700; text-decoration: underline;">View PDF Brief</a>`:"No File";return`
      <tr>
        <td style="font-weight: 800; color: #111;">${o.billboard_id}</td>
        <td>${a} ➔ ${s}</td>
        <td>${d}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${new Date(o.created_at||Date.now()).toLocaleDateString()}</td>
      </tr>
    `}).join("")}async function oe(){const e=w(),t=document.getElementById("quotationsGrid");if(!t)return;const n=e?e.id||e.email:null;if(C=await Ee(n,e?e.email:null),C.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No quotations available</h3>
        <p style="color: #888; margin-top: 4px;">Official campaign quotations issued by AdEffect will appear here for your review.</p>
      </div>
    `;return}t.innerHTML=C.map(i=>{const o=new Date(i.created_at||Date.now()).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),a=typeof i.printing_cost=="number"?`$ ${i.printing_cost.toLocaleString()}`:`$ ${i.printing_cost||0}`,s=typeof i.total_cost_with_printing=="number"?`$ ${i.total_cost_with_printing.toLocaleString()}`:`$ ${i.total_cost_with_printing||0}`;return`
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
            <span style="font-size: 1.3rem; font-weight: 900; color: var(--primary-red);">${s}</span>
          </div>
          <button class="btn-view-quotation">View Full Quotation &rarr;</button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".quotation-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-quotation-id"),a=C.find(s=>String(s.id)===String(o))||C[0];a&&Fe(a)})})}function Fe(e){const t=document.getElementById("quotationModal"),n=document.getElementById("quotationDocContent");if(!t||!n)return;const i=new Date(e.created_at||Date.now()).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=typeof e.printing_cost=="number"?e.printing_cost:parseFloat(e.printing_cost||0),a=typeof e.total_cost_wo_printing=="number"?e.total_cost_wo_printing:parseFloat(e.total_cost_wo_printing||0),s=typeof e.total_cost_with_printing=="number"?e.total_cost_with_printing:parseFloat(e.total_cost_with_printing||0);n.innerHTML=`
    <div class="quotation-doc-header">
      <div>
        <div style="font-size: 2.2rem; font-weight: 900; color: #111;"><span style="color: var(--primary-red);">ad</span>effect</div>
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
          <span>$ ${s.toLocaleString(void 0,{minimumFractionDigits:2})}</span>
        </div>
      </div>
    </div>
  `,t.classList.add("active")}function $e(){window.print()}let k=null,m={billboard_id:"",start_time:"",end_time:"",brief_url:"",brief_filename:"",extra_services:[]},L=new Date,ae=[];function Te(){const e=document.getElementById("btnDetailBookNow");e&&e.addEventListener("click",()=>Me());const t=document.getElementById("bookingStartDate"),n=document.getElementById("bookingEndDate");t&&t.addEventListener("change",q),n&&n.addEventListener("change",q);const i=document.getElementById("calPrevMonth"),o=document.getElementById("calNextMonth");i&&i.addEventListener("click",()=>{L.setMonth(L.getMonth()-1),T()}),o&&o.addEventListener("click",()=>{L.setMonth(L.getMonth()+1),T()});const a=document.getElementById("btnStep1Next");a&&a.addEventListener("click",Ne),Pe();const s=document.getElementById("btnStep2Next");s&&s.addEventListener("click",Ue),Oe();const r=document.getElementById("btnStep3Next");r&&r.addEventListener("click",qe);const l=document.getElementById("btnConfirmBooking");l&&l.addEventListener("click",je);const c=document.getElementById("btnCloseDetailModal");c&&c.addEventListener("click",re);const d=document.getElementById("btnCloseWizardModal");d&&d.addEventListener("click",le)}async function se(e){const t=await te(e),i=(await j()).filter(o=>o.billboard_id===e&&o.status!=="Rejected");ae=[...t,...i],T()}function q(){const e=document.getElementById("dateWarningBox");e&&e.classList.remove("active"),T()}async function T(){var f,v;const e=document.getElementById("calMonthTitle"),t=document.getElementById("calendarDaysGrid");if(!t)return;const n=L.getFullYear(),i=L.getMonth(),o=["January","February","March","April","May","June","July","August","September","October","November","December"];e&&(e.textContent=`${o[i]} ${n}`);const a=new Date(n,i,1).getDay(),s=new Date(n,i+1,0).getDate(),r=(f=document.getElementById("bookingStartDate"))==null?void 0:f.value,l=(v=document.getElementById("bookingEndDate"))==null?void 0:v.value,c=r?new Date(r+"T00:00:00").getTime():null,d=l?new Date(l+"T23:59:59").getTime():null;t.innerHTML="";for(let u=0;u<a;u++){const S=document.createElement("div");S.style.height="36px",t.appendChild(S)}for(let u=1;u<=s;u++){const E=new Date(n,i,u).getTime(),D=`${n}-${String(i+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,g=document.createElement("div");g.textContent=u,g.style.cssText="height: 36px; display: grid; place-content: center; font-weight: 700; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.15s ease; border: 1px solid #E5E7EB;";let J=!1;for(const _ of ae){const b=new Date(_.start_time||_.start_date).getTime(),B=new Date(_.end_time||_.end_date).getTime();if(!isNaN(b)&&!isNaN(B)&&E>=b&&E<=B){J=!0;break}}if(J)g.style.background="#FECACA",g.style.color="#991B1B",g.style.border="1.5px dashed #EF4444",g.title="This date is already booked.";else{let _=!1;c&&d&&c<=d?E>=c&&E<=d&&(_=!0):c&&E===c&&(_=!0),_?(g.style.background="var(--primary-red)",g.style.color="#FFFFFF",g.style.fontWeight="900",g.style.border="1.5px solid #111"):(g.addEventListener("mouseenter",()=>g.style.borderColor="#111"),g.addEventListener("mouseleave",()=>g.style.borderColor="#E5E7EB")),g.addEventListener("click",()=>{const b=document.getElementById("bookingStartDate"),B=document.getElementById("bookingEndDate");!b.value||b.value&&B.value?(b.value=D,B.value=""):b.value&&!B.value&&(new Date(D)<new Date(b.value)?b.value=D:B.value=D),q()})}t.appendChild(g)}}function ze(e){k=e,m.billboard_id=e.billboard_id,document.getElementById("detailBillboardId").textContent=e.billboard_id,document.getElementById("detailLocation").textContent=e.location,document.getElementById("detailType").textContent=(e.type||"Unipole").toUpperCase(),document.getElementById("detailSize").textContent=e.size||"W:147 H:43",document.getElementById("detailPrice").textContent=e.price||"$ 1,000",document.getElementById("detailImage").src=e.image_url;const t=document.getElementById("btnMaps360");t&&(t.href=e.maps_url||"https://maps.google.com"),se(e.billboard_id);const n=document.getElementById("detailModal");n&&n.classList.add("active")}function re(){const e=document.getElementById("detailModal");e&&e.classList.remove("active")}function Me(){re(),se(m.billboard_id),M(1);const e=document.getElementById("wizardModal");e&&e.classList.add("active")}function le(){const e=document.getElementById("wizardModal");e&&e.classList.remove("active")}function M(e){for(let t=1;t<=4;t++){const n=document.getElementById(`wizardStep${t}`);n&&(n.style.display=t===e?"block":"none")}}async function Ne(){var o,a;const e=(o=document.getElementById("bookingStartDate"))==null?void 0:o.value,t=(a=document.getElementById("bookingEndDate"))==null?void 0:a.value,n=document.getElementById("dateWarningBox");if(!e||!t){n&&(n.textContent="Please select both start and end dates.",n.classList.add("active"));return}const i=await we(m.billboard_id,e,t);if(!i.valid){n&&(n.textContent=i.message||"Unavailable or unsuitable time frame, please choose another",n.classList.add("active"));return}n&&n.classList.remove("active"),m.start_time=new Date(e).toISOString(),m.end_time=new Date(t).toISOString(),M(2)}function Pe(){const e=document.getElementById("pdfDropzone"),t=document.getElementById("pdfFileInput");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",n=>{n.preventDefault(),e.classList.add("dragover")}),e.addEventListener("dragleave",()=>e.classList.remove("dragover")),e.addEventListener("drop",n=>{n.preventDefault(),e.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&Y(n.dataTransfer.files[0])}),t.addEventListener("change",n=>{n.target.files&&n.target.files.length>0&&Y(n.target.files[0])}))}async function Y(e){if(e.type!=="application/pdf"&&!e.name.endsWith(".pdf")){alert("Invalid file format. Please upload a PDF file.");return}const t=5*1024*1024;if(e.size>t){alert("File size exceeds 5MB limit. Please upload a smaller PDF file.");return}const n=document.getElementById("dropzoneStatusText");n&&(n.textContent="Uploading PDF brief...");const i=await be(e);if(i.success){m.brief_url=i.url,m.brief_filename=i.filename;const o=document.getElementById("pdfFilePreview"),a=document.getElementById("pdfPreviewName");o&&a&&(a.textContent=`${e.name} (${(e.size/(1024*1024)).toFixed(2)} MB)`,o.style.display="flex"),n&&(n.textContent="PDF Uploaded Successfully!")}else alert("Failed to upload PDF file. Please try again."),n&&(n.textContent="Drag & Drop or Upload PDF")}function Ue(){if(!m.brief_url){alert("Please upload a PDF brief before proceeding.");return}M(3)}function Oe(){const e=document.getElementById("extraServicesList");e&&e.querySelectorAll(".service-option-card").forEach(t=>{t.addEventListener("click",()=>{t.classList.toggle("selected");const n=t.getAttribute("data-service");t.classList.contains("selected")?m.extra_services.includes(n)||m.extra_services.push(n):m.extra_services=m.extra_services.filter(i=>i!==n)})})}function qe(){Re(),M(4)}function Re(){if(!k)return;document.getElementById("summaryBillboardImg").src=k.image_url,document.getElementById("summaryBillboardId").textContent=k.billboard_id,document.getElementById("summaryLocation").textContent=k.location;const e=new Date(m.start_time).toLocaleDateString("en-US",{month:"short",day:"numeric"}),t=new Date(m.end_time).toLocaleDateString("en-US",{month:"short",day:"numeric"});document.getElementById("summaryDateRange").textContent=`${e} ➔ ${t}`;const n=document.getElementById("summaryServicesList");n&&(m.extra_services.length===0?n.innerHTML='<div style="color: #666; font-style: italic;">No extra services selected.</div>':n.innerHTML=m.extra_services.map(i=>`
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #111; margin-top: 6px;">
          <span style="color: var(--primary-red); font-size: 1.2rem;">☑</span> ${i}
        </div>
      `).join(""))}async function je(){const e=w();if(!e){alert("Please sign in to submit your booking request."),y("authSection");return}const t=document.getElementById("btnConfirmBooking");t&&(t.disabled=!0,t.textContent="Submitting Request...");const n={user_email:e.email,billboard_id:m.billboard_id,start_time:m.start_time,end_time:m.end_time,brief_url:m.brief_url,extra_services:m.extra_services},i=await he(n);t&&(t.disabled=!1,t.textContent="Confirm Request"),i.success?(le(),He("Your request has been received! It will be reviewed and you will be contacted shortly."),H(),y("dashboardSection")):alert("Failed to submit booking request. Please try again.")}function He(e){const t=document.getElementById("toastContainer");if(!t)return;const n=document.createElement("div");n.className="toast-message",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s ease",setTimeout(()=>n.remove(),300)},5e3)}let z=[],p={searchQuery:"",locations:[],types:[],availability:[],sizes:[]};async function Je(){if(!document.getElementById("billboardsGrid"))return;z=await ee(),ce(z);const t=document.getElementById("discoverySearchInput");t&&t.addEventListener("input",r=>{p.searchQuery=r.target.value.toLowerCase().trim(),O()});const n=document.getElementById("btnToggleFilter"),i=document.getElementById("filterModal"),o=document.getElementById("btnCloseFilter"),a=document.getElementById("btnApplyFilter"),s=document.getElementById("btnResetFilter");n&&i&&n.addEventListener("click",()=>i.classList.add("active")),o&&i&&o.addEventListener("click",()=>i.classList.remove("active")),a&&i&&a.addEventListener("click",()=>{Ve(),O(),i.classList.remove("active")}),s&&i&&s.addEventListener("click",()=>{We(),O(),i.classList.remove("active")}),window.addEventListener("authChange",Z),Z()}function Z(){const e=document.getElementById("accessBanner"),t=w();e&&(t&&t.status==="verified"?e.style.display="none":e.style.display="flex")}function Ve(){p.locations=Array.from(document.querySelectorAll('input[name="filter_location"]:checked')).map(e=>e.value),p.types=Array.from(document.querySelectorAll('input[name="filter_type"]:checked')).map(e=>e.value),p.availability=Array.from(document.querySelectorAll('input[name="filter_availability"]:checked')).map(e=>e.value),p.sizes=Array.from(document.querySelectorAll('input[name="filter_size"]:checked')).map(e=>e.value)}function We(){document.querySelectorAll('.filter-modal-content input[type="checkbox"]').forEach(e=>{e.checked=!1}),p={searchQuery:p.searchQuery,locations:[],types:[],availability:[],sizes:[]}}function O(){const e=z.filter(t=>{const n=(t.location||"").toLowerCase(),i=(t.type||"").toLowerCase(),o=(t.billboard_id||"").toLowerCase(),a=(typeof t.is_available=="boolean"?t.is_available?"available":"unavailable":t.is_available||"").toLowerCase(),s=(t.size||"").replace(/\s+/g,"").toLowerCase();if(p.searchQuery){const r=p.searchQuery,l=o.includes(r),c=n.includes(r),d=i.includes(r);if(!l&&!c&&!d)return!1}return!(p.locations.length>0&&!p.locations.some(l=>n.includes(l.toLowerCase()))||p.types.length>0&&!p.types.some(l=>i.includes(l.toLowerCase()))||p.availability.length>0&&!p.availability.some(l=>a.includes(l.toLowerCase()))||p.sizes.length>0&&!p.sizes.some(l=>s.includes(l.replace(/\s+/g,"").toLowerCase())))});ce(e)}function ce(e){const t=document.getElementById("billboardsGrid");if(t){if(e.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.4rem; font-weight: 800; color: #666;">No billboards match your search filter</h3>
        <p style="color: #999; margin-top: 8px;">Try selecting different options or resetting your search.</p>
      </div>
    `;return}t.innerHTML=e.map(n=>{const i=n.is_available==="Available"||n.is_available===!0,o=i?"Available":n.is_available===!1?"Unavailable":n.is_available||"Available",a=i?"status-available":"status-soon",s=i?"Book Now":"Check Schedule",r=(n.location||"North Lebanon").split(",")[0];return`
      <div class="billboard-card" data-id="${n.billboard_id}">
        <div class="card-image-wrapper">
          <img src="${n.image_url}" alt="Billboard ${n.billboard_id}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
          <div class="billboard-tag">
            ${n.billboard_id}
            <span>${r}</span>
          </div>
        </div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${n.billboard_id}</h3>
            <span class="card-status ${a}">${o}</span>
          </div>
          <div class="card-location">${n.location||"North Lebanon / Network"}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: #666; text-transform: uppercase;">${n.type||"Billboard"}</span>
            <span style="font-weight: 900; color: var(--primary-red); font-size: 1.15rem;">${n.price}</span>
          </div>
          <button class="btn-card-action ${i?"":"soon"}" data-id="${n.billboard_id}" style="margin-top: 14px;">
            ${s}
          </button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".billboard-card, .btn-card-action").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const o=n.getAttribute("data-id");Qe(o)})})}}function Qe(e){const t=w();if(!t||t.status!=="verified")y("authSection");else{const n=z.find(i=>i.billboard_id===e);n&&ze(n)}}window.showPage=y;document.addEventListener("DOMContentLoaded",()=>{de(),ue(),pe(),ge(),fe(),Be(),Je(),Te(),Ce();const e=document.querySelectorAll("section"),t=document.querySelectorAll(".nav-item"),n={root:null,threshold:.3},i=new IntersectionObserver(a=>{a.forEach(s=>{if(s.isIntersecting){const r=s.target.getAttribute("id");t.forEach(l=>{const c=l.querySelector("a");c&&c.getAttribute("href")===`#${r}`?l.classList.add("active"):l.classList.remove("active")}),r==="about"||r==="contact"?document.body.classList.add("dark-header"):document.body.classList.remove("dark-header")}})},n);e.forEach(a=>i.observe(a));const o=window.location.hash?window.location.hash.replace("#",""):"home";o&&["discoverySection","authSection","dashboardSection"].includes(o)&&y(o),window.addEventListener("hashchange",()=>{const a=window.location.hash?window.location.hash.replace("#",""):"home";a&&y(a)})});
