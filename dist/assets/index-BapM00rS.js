(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const De="https://iyznlhahblpjczjzmscy.supabase.co",$e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA";supabase.createClient(De,$e);let O=null;function C(){if(!O){const e=localStorage.getItem("adeffect_auth_user");if(e)try{O=JSON.parse(e)}catch{}}return O}function ee(e){O=e,e?localStorage.setItem("adeffect_auth_user",JSON.stringify(e)):localStorage.removeItem("adeffect_auth_user"),window.dispatchEvent(new CustomEvent("authChange",{detail:{user:e}}))}function ze(){window.handleDashboardNavigation=ce;const e=document.querySelectorAll("#btnGoToDashboard, #btnNavDashboard, .btn-nav-dashboard, .btn-explore"),t=document.getElementById("btnForgotPassword");t&&t.addEventListener("click",s=>{s.preventDefault(),Me()}),e.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault(),ce()})});const n=document.getElementById("signUpForm");n&&n.addEventListener("submit",Ne);const i=document.getElementById("signInForm");i&&i.addEventListener("submit",Pe);const o=document.getElementById("btnHeaderLogin");o&&o.addEventListener("click",s=>{s.preventDefault(),G("signin")});const a=document.getElementById("btnSwitchToSignUp");a&&a.addEventListener("click",s=>{s.preventDefault(),G("signup")}),new URLSearchParams(window.location.search).get("reset")==="true"&&(x("authSection"),G("signin"),te("You can now set a new password — Supabase handles this via your account settings page.")),x("home")}async function Me(){var n;const e=(n=document.getElementById("signinEmail"))==null?void 0:n.value.trim();if(!e){k('Please enter your email address above, then click "Forgot your password?"');return}const t=S();if(!t){k("Unable to connect. Please try again later.");return}try{const{error:i}=await t.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin+"/?reset=true"});if(i){k(`Could not send reset email: ${i.message}`);return}te("Password reset email sent! Check your inbox and follow the link.")}catch(i){k("Something went wrong. Please try again."),console.error("Forgot password error:",i)}}function ce(){const e=C();e&&e.status==="verified"?x("dashboardSection"):x("authSection")}function G(e){const t=document.getElementById("signUpBox"),n=document.getElementById("signInBox"),i=document.getElementById("btnHeaderLogin");e==="signin"?(t&&(t.style.display="none"),n&&(n.style.display="block"),i&&(i.textContent="SIGN UP")):(t&&(t.style.display="block"),n&&(n.style.display="none"),i&&(i.textContent="LOG IN"))}async function Pe(e){var c,m,p;e.preventDefault();const t=(c=document.getElementById("signinEmail"))==null?void 0:c.value.trim(),n=(m=document.getElementById("signinPassword"))==null?void 0:m.value.trim(),i=document.getElementById("signInErrorBox"),o=document.getElementById("signInSuccessBox");if(i&&(i.style.display="none"),o&&(o.style.display="none"),!t||!n){k("Please enter both your email address and password.");return}const a=S();let r=null;if(a)try{const{data:u,error:b}=await a.auth.signInWithPassword({email:t,password:n});if(b){k(b.message||"Invalid email or password.");return}if(u&&u.user){const f=((p=u.user.user_metadata)==null?void 0:p.full_name)||u.user.email.split("@")[0];r={id:u.user.id,email:u.user.email,name:f,status:"verified"}}else{k("Authentication failed. Please check your credentials.");return}}catch(u){console.error("Supabase auth exception:",u),k("An error occurred during authentication. Please try again.");return}else{k("Authentication service is unavailable. Please try again later.");return}ee(r),te("Login successful! Redirecting to your Client Dashboard...");const s=document.getElementById("dashboardGreetingName");s&&(s.textContent=`Hello, ${r.name}`);const l=document.getElementById("sidebarProfileName");l&&(l.textContent=r.name);const d=document.getElementById("signInForm");d&&d.reset(),setTimeout(()=>{o&&(o.style.display="none"),x("dashboardSection")},1e3)}function k(e){let t=document.getElementById("signInErrorBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInErrorBox",t.style.cssText="background: #FEF2F2; border: 2px solid #EF4444; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}function te(e){let t=document.getElementById("signInSuccessBox");if(!t){const n=document.getElementById("signInForm");n&&(t=document.createElement("div"),t.id="signInSuccessBox",t.style.cssText="background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;",n.prepend(t))}t?(t.textContent=e,t.style.display="block"):alert(e)}async function Ne(e){var u,b,f,B,g,$,w,E;e.preventDefault();const t=(u=document.getElementById("signupName"))==null?void 0:u.value.trim(),n=(b=document.getElementById("signupBusiness"))==null?void 0:b.value.trim(),i=(f=document.getElementById("signupEmail"))==null?void 0:f.value.trim(),o=(B=document.getElementById("signupWebsite"))==null?void 0:B.value.trim(),a=(g=document.getElementById("signupPhone"))==null?void 0:g.value.trim(),r=($=document.getElementById("signupLocation"))==null?void 0:$.value.trim(),s=(w=document.getElementById("signupPassword"))==null?void 0:w.value.trim(),l=(E=document.getElementById("signupConfirmPassword"))==null?void 0:E.value.trim(),d=document.querySelectorAll('input[name="hear_about_us"]:checked'),c=Array.from(d).map(y=>y.value);if(!t||!n||!i||!a||!s||!l){alert("Please fill out all required fields.");return}if(s!==l){alert("Passwords do not match. Please re-enter your password.");return}if(s.length<6){alert("Password must be at least 6 characters long.");return}const m={user_name:t,business_name:n,email:i,website:o,phone_number:a,location:r,password:s,hear_about_us:c},p=document.getElementById("btnSignUpSubmit");p&&(p.disabled=!0,p.textContent="CREATING ACCOUNT...");try{const y=await Ue(m);if(y.success){if(y.user){ee(y.user);const L=document.getElementById("dashboardGreetingName");L&&(L.textContent=`Hello, ${y.user.name}`);const V=document.getElementById("sidebarProfileName");V&&(V.textContent=y.user.name)}const _=document.getElementById("signUpForm");_&&_.reset();const I=document.getElementById("pendingSuccessModal");I?I.classList.add("active"):x("dashboardSection")}else alert(y.error||"Failed to create account. Please try again.")}catch(y){console.error("Sign up error:",y),alert("An unexpected error occurred during sign up.")}finally{p&&(p.disabled=!1,p.textContent="SIGN UP")}}function x(e){const t=["home","about","services","projects","led-screen","contact"],n=["discoverySection","authSection","dashboardSection","careers"];if(e&&e.startsWith("#")&&(e=e.substring(1)),e==="dashboardSection"){const i=C();(!i||i.status!=="verified")&&(e="authSection")}n.includes(e)?(t.forEach(i=>{const o=document.getElementById(i);o&&o.style.setProperty("display","none","important")}),n.forEach(i=>{const o=document.getElementById(i);if(o)if(i===e){const a=i==="dashboardSection"?"flex":"block";o.style.setProperty("display",a,"important")}else o.style.setProperty("display","none","important")}),e==="dashboardSection"&&window.dispatchEvent(new CustomEvent("authChange")),window.scrollTo({top:0,behavior:"smooth"})):(n.forEach(i=>{const o=document.getElementById(i);o&&o.style.setProperty("display","none","important")}),t.forEach(i=>{const o=document.getElementById(i);o&&o.style.setProperty("display","block","important")}))}const he={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA",VITE_SUPABASE_URL:"https://iyznlhahblpjczjzmscy.supabase.co"},Te=typeof import.meta<"u"&&import.meta&&he&&"https://iyznlhahblpjczjzmscy.supabase.co"||"https://iyznlhahblpjczjzmscy.supabase.co",R=Te.replace(/\/rest\/v1\/?$/,"").replace(/\/+$/,""),T=typeof import.meta<"u"&&import.meta&&he&&"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA"||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA";let W=null;function S(){if(typeof window<"u"&&!W&&window.supabase&&R&&T&&!R.includes("your-supabase-project-id"))try{W=window.supabase.createClient(R,T)}catch(e){console.warn("Supabase initialization warning:",e)}return W}function X(e){return Array.isArray(e)?e.map(t=>{let n=t.price;typeof t.price=="number"?n=`$ ${t.price.toLocaleString()}`:t.price&&!t.price.toString().startsWith("$")&&(n=`$ ${t.price}`);let i=t.is_available;return typeof t.is_available=="boolean"?i=t.is_available?"Available":"Unavailable until...":t.is_available||(i="Available"),{...t,id:t.id||t.billboard_id,billboard_id:t.billboard_id||`BB-${t.id}`,location:t.location||"Tripoli Entrance & Avenue",maps_url:t.maps_url||"https://maps.google.com/?q=Tripoli,Lebanon",size:t.size||"Standard Size",price:n||"$ 1,000",numericPrice:typeof t.price=="number"?t.price:parseFloat((t.price||"").toString().replace(/[^0-9.]/g,""))||0,image_url:t.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:t.structure||"Unipole",is_available:i,available_until:t.available_until||null}}):[]}const de=[{billboard_id:"U002-A",location:"Bahsas, Tripoli Entrance",maps_url:"https://www.google.com/maps/place/Ad+effect/data=!4m2!3m1!1s0x0:0x1c8a54b37c14fbfc?sa=X&ved=1t:2428&ictx=111",size:"W:147 - H:43",price:"$ 1,000",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available",available_until:null},{billboard_id:"U002-B",location:"Bahsas, Tripoli Entrance",maps_url:"https://maps.google.com/maps?q=34.396779039964066,35.79991279815192",size:"W: 40 - H: 30",price:"$ 1,200",image_url:"https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",type:"Unipole",is_available:"Available Soon",available_until:"2026-09-01"},{billboard_id:"P003-C",location:"Mina Road, Tripoli",maps_url:"https://maps.google.com",size:"3:4",price:"$ 600",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",type:"Portrait Billboard",is_available:"Available",available_until:null}];function z(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ne(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving local state:",n)}}async function we(){const e=S();if(e)try{const{data:n,error:i}=await e.from("billboards").select("*");if(!i&&n&&n.length>0)return X(n);i&&console.warn("Supabase JS Client error:",i.message)}catch(n){console.warn("Supabase JS Client fetch failed, trying direct REST fetch:",n)}try{const n=await fetch(`${R}/rest/v1/billboards?select=*`,{headers:{apikey:T,Authorization:`Bearer ${T}`}});if(n.ok){const i=await n.json();if(Array.isArray(i)&&i.length>0)return X(i)}else console.warn("Direct REST fetch returned status:",n.status)}catch(n){console.warn("Direct REST fetch exception:",n)}let t=z("adeffect_billboards",null);return t||(ne("adeffect_billboards",de),t=de),X(t)}async function Ue(e){var o;const t=S();let n=null;if(t)try{const{data:a,error:r}=await t.auth.signUp({email:e.email,password:e.password,options:{data:{full_name:e.user_name,business_name:e.business_name}}});if(r)return{success:!1,error:r.message};n=(o=a==null?void 0:a.user)==null?void 0:o.id;const s={user_id:n,user_name:e.user_name,business_name:e.business_name,email:e.email,website:e.website||"",phone_number:e.phone_number,location:e.location||"",hear_about_us:e.hear_about_us||[],created_at:new Date().toISOString()},{error:l}=await t.from("users").insert([s]);return l&&console.warn("Supabase insert users warning:",l),ue(s),{success:!0,user:{id:n,email:e.email,name:e.user_name,status:"verified"}}}catch(a){return console.error("Supabase sign up exception:",a),{success:!1,error:a.message||"An error occurred during sign up."}}n=`user-${Date.now()}`;const i={id:n,user_name:e.user_name,name:e.user_name,business_name:e.business_name,email:e.email,website:e.website||"",phone_number:e.phone_number,location:e.location||"",hear_about_us:e.hear_about_us||[],created_at:new Date().toISOString()};return ue(i),{success:!0,user:{id:n,email:e.email,name:e.user_name,status:"verified"}}}function ue(e){const t=z("adeffect_users",[]);t.push(e),ne("adeffect_users",t)}async function Re(e){const t=e.name.split(".").pop(),i=`${`${Date.now()}_${Math.random().toString(36).substring(2,7)}.${t}`}`,o=S();if(o)try{const{data:r,error:s}=await o.storage.from("Briefs of Pending Requests").upload(i,e);if(!s&&r){const{data:l}=o.storage.from("Briefs of Pending Requests").getPublicUrl(i);return{success:!0,url:l.publicUrl,filename:e.name}}console.warn("Supabase Storage upload warning:",s)}catch(r){console.warn("Supabase Storage upload exception:",r)}return{success:!0,url:URL.createObjectURL(e),filename:e.name,isLocalFallback:!0}}async function qe(e){const t=C();if(!document.getElementById("performancesGrid"))return;t&&t.id;const i={user_id:t.id,user_email:e.user_email,billboard_id:e.billboard_id,start_time:e.start_time,end_time:e.end_time,brief_url:e.brief_url,extra_services:e.extra_services||[],status:"In Review",created_at:new Date().toISOString()},o=S();if(o)try{const{data:a,error:r}=await o.from("pending_bookings").insert([i]).select();if(!r)return me(i),{success:!0,data:a};console.warn("Supabase insert pending_bookings warning:",r)}catch(a){console.warn("Supabase insert pending_bookings exception:",a)}return me(i),{success:!0,data:[i]}}function me(e){const t=z("adeffect_pending_bookings",[]);t.unshift(e),ne("adeffect_pending_bookings",t)}async function ie(e=null){const t=S();if(t)try{let i=t.from("pending_bookings").select("*");e&&(i=i.eq("user_email",e));const{data:o,error:a}=await i;if(!a&&o)return o}catch(i){console.warn("Supabase fetch pending_bookings error:",i)}const n=z("adeffect_pending_bookings",[]);return e?n.filter(i=>i.user_email===e):n}async function Ee(e){const t=S();let n=[];if(t)try{let i=t.from("bookings").select("*");e&&(i=i.eq("billboard_id",e));const{data:o,error:a}=await i;!a&&o&&(n=o)}catch(i){console.warn("Supabase fetch bookings error:",i)}if(n.length===0){const i=z("adeffect_confirmed_bookings",[{id:101,client_id:"user-sample-id",billboard_id:"U002-A",start_time:"2026-09-01T00:00:00.000Z",end_time:"2026-09-15T00:00:00.000Z",is_active:!0,created_at:"2026-08-01T00:00:00.000Z"}]);n=e?i.filter(o=>o.billboard_id===e):i}return n}async function Oe(){const e=S();if(e)try{const{data:t,error:n}=await e.from("bookings").select("billboard_id, start_time, end_time");if(!n&&t)return t;n&&console.warn("Supabase fetchAllBookings error:",n.message)}catch(t){console.warn("Supabase fetchAllBookings exception:",t)}try{const t=await fetch(`${R}/rest/v1/bookings?select=billboard_id,start_time,end_time`,{headers:{apikey:T,Authorization:`Bearer ${T}`}});if(t.ok){const n=await t.json();if(Array.isArray(n))return n}}catch(t){console.warn("fetchAllBookings REST fallback exception:",t)}return z("adeffect_confirmed_bookings",[])}async function je(e,t,n,i=null){const o=new Date(t).getTime(),a=new Date(n).getTime();if(isNaN(o)||isNaN(a)||o>=a)return{valid:!1,message:"Start date must be before end date."};const r=new Date(t),s=new Date(n),l=s.getTime()-r.getTime(),d=Math.round(l/(1e3*60*60*24)),c=(i||"").toString().toLowerCase().replace(/\s+/g,"");if(c.includes("3:4")||c.includes("3x4")||c.includes("3/4")){if(d<7)return{valid:!1,message:"Billboards of size 3:4 require a minimum booking period of 1 week (7 days)."}}else{const f=new Date(r);if(f.setMonth(f.getMonth()+1),d<28&&s<f)return{valid:!1,message:"Billboards must be booked for a minimum period of 1 month."}}const p=await ie(),u=await Ee(e),b=[...p.filter(f=>f.billboard_id===e&&f.status!=="Rejected"),...u.filter(f=>f.billboard_id===e)];for(const f of b){const B=new Date(f.start_time||f.start_date).getTime(),g=new Date(f.end_time||f.end_date).getTime();if(!isNaN(B)&&!isNaN(g)&&o<=g&&a>=B)return{valid:!1,message:"Selected timeframe overlaps with an existing booking for this billboard. Please choose another date range."}}return{valid:!0}}const _e=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;async function He(e=null){const t=S();if(!t||!e||!_e.test(e))return[];try{const{data:n,error:i}=await t.from("bookings").select("*, billboards(*)").eq("is_active",!0).eq("user_id",e);return i?(console.error("Supabase fetch active bookings error:",i.message),[]):n||[]}catch(n){return console.warn("Supabase fetch active bookings exception:",n),[]}}async function Je(e,t=null){const n=S();if(n&&e&&_e.test(e))try{let o=n.from("quotations").select("*");o=o.eq("client_id",e);const{data:a,error:r}=await o;if(!r&&a)return a}catch(o){console.warn("Supabase fetch quotations error:",o)}return z("adeffect_quotations",[{id:501,created_at:new Date().toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Outdoor Unipole",media_used:"Backlit Vinyl Print",reference:"U002-A",media_location:"Bahsas, Tripoli Entrance",frequency:1,period:"1 Month (Aug 2026)",printing_cost:250,total_cost_wo_printing:1e3,total_cost_with_printing:1250},{id:502,created_at:new Date(Date.now()-864e5*5).toISOString(),client_id:e||"client-uuid-001",client_name:"AdEffect Client",media_type:"Megapole Network",media_used:"Frontlit Flex Banner",reference:"U002-B",media_location:"Dam & Farz Highway",frequency:2,period:"2 Months (Sep-Oct 2026)",printing_cost:400,total_cost_wo_printing:2400,total_cost_with_printing:2800}])}function Ve(){const e=document.getElementById("dotsContainer"),t=document.querySelectorAll(".dot"),n=document.getElementById("logoText"),i=document.getElementById("sloganText"),o=document.getElementById("brandAssembly"),a=document.getElementById("billboardsStage"),r=document.getElementById("ctaButtons"),s=document.getElementById("heroAnimationStage"),l=document.getElementById("replayBtn"),d=document.querySelectorAll(".hero-slide"),c=document.querySelectorAll(".slide-dot"),m=document.getElementById("heroProgressFill");let p=0,u=null;const b=4500;function f(){const _=document.getElementById("billboardStreamUp"),I=document.getElementById("billboardStreamDown");!_||!I||we().then(L=>{const ae=(L&&L.length?L:[{billboard_id:"U002-A",location:"Bahsas, Tripoli Entrance",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"},{billboard_id:"U002-B",location:"Dam & Farz Highway",image_url:"https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80"},{billboard_id:"P003-C",location:"Mina Road, Tripoli",image_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"}]).slice(0,6),re=(F,U)=>`
        <div class="stream-card ${U%2===0?"flicker-booking":""}">
          <img src="${F.image_url}" alt="${F.billboard_id}" class="stream-card-img" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
          <div class="stream-card-title">${F.billboard_id}</div>
          <div class="stream-card-location">${(F.location||"Tripoli").split(",")[0]}</div>
        </div>
      `,se=ae.map((F,U)=>re(F,U)).join(""),le=[...ae].reverse().map((F,U)=>re(F,U+1)).join("");_.innerHTML=se+se,I.innerHTML=le+le})}function B(){e==null||e.classList.remove("vertical"),n==null||n.classList.remove("show"),i==null||i.classList.remove("typing"),o==null||o.classList.remove("shifted-up"),a==null||a.classList.remove("show"),r==null||r.classList.remove("show"),s==null||s.classList.remove("show"),t.forEach(_=>{_.classList.remove("pop-1","pop-2","pop-3"),_.style.opacity="0",_.style.transform="scale(0)"}),setTimeout(()=>{t[0]&&t[0].classList.add("pop-1"),t[1]&&t[1].classList.add("pop-2"),t[2]&&t[2].classList.add("pop-3")},100),setTimeout(()=>{e==null||e.classList.add("vertical"),n==null||n.classList.add("show"),i==null||i.classList.add("typing")},750),setTimeout(()=>{o==null||o.classList.add("shifted-up"),a==null||a.classList.add("show"),r==null||r.classList.add("show"),s==null||s.classList.add("show"),E()},1450)}function g(_){d.length&&(p=(_+d.length)%d.length,d.forEach((I,L)=>{L===p?I.classList.add("active"):I.classList.remove("active")}),c.forEach((I,L)=>{L===p?I.classList.add("active"):I.classList.remove("active")}),$())}function $(){m&&(m.style.transition="none",m.style.transform="scaleX(0)",m.offsetWidth,m.style.transition=`transform ${b}ms linear`,m.style.transform="scaleX(1)")}function w(){g(p+1)}function E(){y(),g(0),u=setInterval(w,b)}function y(){u&&(clearInterval(u),u=null)}c.forEach(_=>{_.addEventListener("click",()=>{const I=parseInt(_.getAttribute("data-slide-index")||"0",10);y(),g(I),u=setInterval(w,b)})}),f(),B(),l&&l.addEventListener("click",()=>{y(),B()})}function Ge(){const e=document.getElementById("carouselTrack");if(!e)return;Array.from(e.children).forEach(r=>{const s=r.cloneNode(!0);e.appendChild(s)});let n=0;const i=1.2,o=e.scrollWidth/2;function a(){n+=i,n>=o&&(n=0),e.style.transform=`translateX(-${n}px)`;const r=window.innerWidth/2,s=e.querySelectorAll(".carousel-item");let l=null,d=1/0;s.forEach(c=>{const m=c.getBoundingClientRect(),p=m.left+m.width/2,u=Math.abs(r-p);c.classList.remove("active-center"),u<d&&(d=u,l=c)}),l&&d<220&&l.classList.add("active-center"),requestAnimationFrame(a)}requestAnimationFrame(a)}const We={billboards:{title:"Billboards",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 16v4M17 16v4M12 16v4"/><path d="M4 8h16"/></svg>',body:`
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
    `}};function Xe(){const e=document.querySelectorAll(".service-item"),t=document.getElementById("serviceCardTitle"),n=document.getElementById("serviceCardIcon"),i=document.getElementById("serviceCardBody");e.length&&e.forEach(o=>{o.addEventListener("click",()=>{const a=o.getAttribute("data-service"),r=We[a];r&&(e.forEach(s=>s.classList.remove("active")),o.classList.add("active"),t&&(t.textContent=r.title),n&&(n.innerHTML=r.icon),i&&(i.innerHTML=r.body))})})}function Qe(){const e=document.querySelectorAll(".project-card"),t=document.getElementById("projects");if(!t||!e.length)return;const n={root:null,threshold:.15};new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&e.forEach((r,s)=>{setTimeout(()=>{r.classList.add("pop-in")},s*120)})})},n).observe(t)}function Ye(){const e=document.getElementById("led-screen"),t=document.getElementById("ledPage1"),n=document.getElementById("ledPage2");if(!e||!t||!n)return;let i=!1;function o(){const r=e.getBoundingClientRect(),s=window.innerHeight,l=e.offsetHeight-s;if(l<=0){i=!1;return}let c=-r.top/l;c=Math.max(0,Math.min(1,c));const m=-c*100,p=(1-c)*100;t.style.transform=`translate3d(0, ${m}vh, 0)`,n.style.transform=`translate3d(0, ${p}vh, 0)`,t.style.opacity=c>.85?(1-c)/.15:1,n.style.opacity=c<.15?c/.15:1,i=!1}function a(){i||(requestAnimationFrame(o),i=!0)}window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a,{passive:!0}),o()}function Ze(){const e=document.getElementById("contactForm"),t=document.getElementById("contactEmail"),n=document.getElementById("contactMessage"),i=document.getElementById("emailError"),o=document.getElementById("messageError");if(!e)return;function a(r){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r).toLowerCase())}e.addEventListener("submit",r=>{r.preventDefault();let s=!0;i.classList.remove("show"),o.classList.remove("show");const l=t.value.trim(),d=n.value.trim();if((!l||!a(l))&&(i.textContent="Please enter a valid email address.",i.classList.add("show"),s=!1),d||(o.textContent="Please write a message before sending.",o.classList.add("show"),s=!1),s){const c="Reservation@ad-effect.com",m=encodeURIComponent("New Ad Effect Website Inquiry"),p=encodeURIComponent(`From: ${l}

Message:
${d}`),u=`mailto:${c}?subject=${m}&body=${p}`;window.location.href=u,alert("Thank you! Opening your email client to send your message to ssamadmiryam@gmail.com."),e.reset()}})}let M=[],A=[];function Ke(){window.addEventListener("authChange",pe),pe();const e=document.querySelectorAll(".sidebar-link");e.forEach(r=>{r.addEventListener("click",s=>{s.preventDefault(),e.forEach(d=>d.classList.remove("active")),r.classList.add("active");const l=r.getAttribute("data-tab");et(l)})});const t=document.getElementById("sidebarLogoutBtn");t&&t.addEventListener("click",()=>{ee(null),x("home")});const n=document.getElementById("btnNewBillboardRequest");n&&n.addEventListener("click",r=>{r.preventDefault(),x("discoverySection")});const i=document.getElementById("btnCloseQuotationModal");i&&i.addEventListener("click",()=>{const r=document.getElementById("quotationModal");r&&r.classList.remove("active")});const o=document.getElementById("btnCloseActiveModal");o&&o.addEventListener("click",()=>{const r=document.getElementById("activeBillboardModal");r&&r.classList.remove("active")});const a=document.getElementById("btnConvertToPDF");a&&a.addEventListener("click",ot)}function pe(){const e=C(),t=document.getElementById("dashboardGreetingName"),n=document.getElementById("sidebarProfileName");e?(t&&(t.textContent=`Hello, ${e.name||"Client"}`),n&&(n.textContent=e.name||"Client Account")):(t&&(t.textContent="Hello, Client"),n&&(n.textContent="Client Profile")),xe(),oe(),Be()}function et(e){const t=document.getElementById("dashTabMain"),n=document.getElementById("dashTabRequests"),i=document.getElementById("dashTabActiveBillboards"),o=document.getElementById("dashTabQuotations");t&&(t.style.display="none"),n&&(n.style.display="none"),i&&(i.style.display="none"),o&&(o.style.display="none"),e==="requests"&&n?(n.style.display="block",oe()):e==="active"&&i?(i.style.display="block",tt()):e==="quotations"&&o?(o.style.display="block",Be()):t&&(t.style.display="block",xe())}async function xe(){const e=C(),t=document.getElementById("performancesGrid");if(!t)return;const n=e?e.id:null;if(A=await He(n),!A||A.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboard campaigns found</h3>
        <p style="color: #888; margin-top: 4px;">Once your billboard request is approved, active campaign metrics will be displayed here.</p>
      </div>
    `;return}t.innerHTML=A.map(i=>{const o=i.billboards||i,a=o.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",r=o.billboard_id||i.billboard_id||`Booking #${i.id}`,s=o.location||"Location Not Specified",l=i.impressions_per_week??o.impressions_per_week??(o.daily_impressions?o.daily_impressions*7:null);return l&&`${Number(l).toLocaleString()}`,`
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
    `}).join(""),t.querySelectorAll(".active-perf-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-booking-id"),a=A.find(r=>String(r.id)===String(o));a&&nt(a)})})}function tt(){const e=document.getElementById("activeBillboardsGrid");if(e){if(!A||A.length===0){e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboards</h3>
      </div>
    `;return}e.innerHTML=A.map(t=>{const n=t.billboards||t,i=n.image_url||"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",o=n.billboard_id||t.billboard_id||`Booking #${t.id}`,a=n.location||"Location Not Specified";return`
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
    `}).join("")}}function nt(e){const t=document.getElementById("activeBillboardModal"),n=document.getElementById("activeBillboardModalContent");if(!t||!n)return;const i=e.billboards||e,o=i.billboard_id||e.billboard_id||`Booking #${e.id}`,a=i.location||"Location Not Specified",r=e.impressions_per_week??i.impressions_per_week??i.daily_impressions?i.daily_impressions*7:null,s=r?Number(r).toLocaleString():"N/A",l=e.start_time?new Date(e.start_time).toLocaleDateString():"N/A",d=e.end_time?new Date(e.end_time).toLocaleDateString():"N/A";n.innerHTML=`
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
          <div><strong>Campaign End:</strong> ${d}</div>
        </div>
      </div>
    </div>
  `,t.classList.add("active")}async function oe(){const e=C(),t=document.getElementById("dashboardRequestsTableBody");if(!t)return;const n=e?e.email:null,i=await ie(n);if(!i||i.length===0){t.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: #666;">
          No pending billboard requests found. Click "New Billboard Request" to book a billboard.
        </td>
      </tr>
    `;return}t.innerHTML=i.map(o=>{const a=o.start_time?new Date(o.start_time).toLocaleDateString():"N/A",r=o.end_time?new Date(o.end_time).toLocaleDateString():"N/A",s=(o.status||"pending").toLowerCase(),l=s.charAt(0).toUpperCase()+s.slice(1),d=`<span class="status-badge status-${s}">${l}</span>`,c=Array.isArray(o.extra_services)?o.extra_services.join(", "):o.extra_services||"None",m=o.brief_url?`<a href="${o.brief_url}" target="_blank" style="color: var(--primary-red); font-weight: 700; text-decoration: underline;">View PDF Brief</a>`:"No File";return`
      <tr>
        <td style="font-weight: 800; color: #111;">${o.billboard_id}</td>
        <td>${a} ➔ ${r}</td>
        <td>${m}</td>
        <td>${c}</td>
        <td>${d}</td>
        <td>${new Date(o.created_at||Date.now()).toLocaleDateString()}</td>
      </tr>
    `}).join("")}async function Be(){const e=C(),t=document.getElementById("quotationsGrid");if(!t)return;const n=e?e.id||e.email:null;if(M=await Je(n,e?e.email:null),!M||M.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No quotations available</h3>
        <p style="color: #888; margin-top: 4px;">Official campaign quotations issued by AdEffect will appear here for your review.</p>
      </div>
    `;return}t.innerHTML=M.map(i=>{const o=new Date(i.created_at||Date.now()).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),a=typeof i.printing_cost=="number"?`$ ${i.printing_cost.toLocaleString()}`:`$ ${i.printing_cost||0}`,r=typeof i.total_cost_with_printing=="number"?`$ ${i.total_cost_with_printing.toLocaleString()}`:`$ ${i.total_cost_with_printing||0}`;return`
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
    `}).join(""),t.querySelectorAll(".quotation-card").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-quotation-id"),a=M.find(r=>String(r.id)===String(o))||M[0];a&&it(a)})})}function it(e){const t=document.getElementById("quotationModal"),n=document.getElementById("quotationDocContent");if(!t||!n)return;const i=new Date(e.created_at||Date.now()).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=typeof e.printing_cost=="number"?e.printing_cost:parseFloat(e.printing_cost||0),a=typeof e.total_cost_wo_printing=="number"?e.total_cost_wo_printing:parseFloat(e.total_cost_wo_printing||0),r=typeof e.total_cost_with_printing=="number"?e.total_cost_with_printing:parseFloat(e.total_cost_with_printing||0);n.innerHTML=`
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
  `,t.classList.add("active")}function ot(){window.print()}let D=null,v={billboard_id:"",start_time:"",end_time:"",brief_url:"",brief_filename:"",extra_services:[]},P=new Date,Ie=[];function at(){const e=document.getElementById("btnDetailBookNow");e&&e.addEventListener("click",()=>st());const t=document.getElementById("bookingStartDate"),n=document.getElementById("bookingEndDate");t&&t.addEventListener("change",Y),n&&n.addEventListener("change",Y);const i=document.getElementById("calPrevMonth"),o=document.getElementById("calNextMonth");i&&i.addEventListener("click",()=>{P.setMonth(P.getMonth()-1),j()}),o&&o.addEventListener("click",()=>{P.setMonth(P.getMonth()+1),j()});const a=document.getElementById("btnStep1Next");a&&a.addEventListener("click",lt),ct();const r=document.getElementById("btnStep2Next");r&&r.addEventListener("click",dt),ut();const s=document.getElementById("btnStep3Next");s&&s.addEventListener("click",mt);const l=document.getElementById("btnConfirmBooking");l&&l.addEventListener("click",ft);const d=document.getElementById("btnCloseDetailModal");d&&d.addEventListener("click",Le);const c=document.getElementById("btnCloseWizardModal");c&&c.addEventListener("click",Ce)}async function Se(e){const t=await Ee(e),i=(await ie()).filter(o=>o.billboard_id===e&&o.status!=="Rejected");Ie=[...t,...i],j()}function Y(){const e=document.getElementById("dateWarningBox");e&&e.classList.remove("active"),j()}async function j(){var m,p;const e=document.getElementById("calMonthTitle"),t=document.getElementById("calendarDaysGrid");if(!t)return;const n=P.getFullYear(),i=P.getMonth(),o=["January","February","March","April","May","June","July","August","September","October","November","December"];e&&(e.textContent=`${o[i]} ${n}`);const a=new Date(n,i,1).getDay(),r=new Date(n,i+1,0).getDate(),s=(m=document.getElementById("bookingStartDate"))==null?void 0:m.value,l=(p=document.getElementById("bookingEndDate"))==null?void 0:p.value,d=s?new Date(s+"T00:00:00").getTime():null,c=l?new Date(l+"T23:59:59").getTime():null;t.innerHTML="";for(let u=0;u<a;u++){const b=document.createElement("div");b.style.height="36px",t.appendChild(b)}for(let u=1;u<=r;u++){const f=new Date(n,i,u).getTime(),B=`${n}-${String(i+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,g=document.createElement("div");g.textContent=u,g.style.cssText="height: 36px; display: grid; place-content: center; font-weight: 700; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.15s ease; border: 1px solid #E5E7EB;";let $=!1;for(const w of Ie){const E=new Date(w.start_time||w.start_date).getTime(),y=new Date(w.end_time||w.end_date).getTime();if(!isNaN(E)&&!isNaN(y)&&f>=E&&f<=y){$=!0;break}}if($)g.style.background="#FECACA",g.style.color="#991B1B",g.style.border="1.5px dashed #EF4444",g.title="This date is already booked.";else{let w=!1;d&&c&&d<=c?f>=d&&f<=c&&(w=!0):d&&f===d&&(w=!0),w?(g.style.background="var(--primary-red)",g.style.color="#FFFFFF",g.style.fontWeight="900",g.style.border="1.5px solid #111"):(g.addEventListener("mouseenter",()=>g.style.borderColor="#111"),g.addEventListener("mouseleave",()=>g.style.borderColor="#E5E7EB")),g.addEventListener("click",()=>{const E=document.getElementById("bookingStartDate"),y=document.getElementById("bookingEndDate");!E.value||E.value&&y.value?(E.value=B,y.value=""):E.value&&!y.value&&(new Date(B)<new Date(E.value)?E.value=B:y.value=B),Y()})}t.appendChild(g)}}function rt(e){D=e,v.billboard_id=e.billboard_id,document.getElementById("detailBillboardId").textContent=e.billboard_id,document.getElementById("detailLocation").textContent=e.location,document.getElementById("detailType").textContent=(e.type||"Unipole").toUpperCase(),document.getElementById("detailSize").textContent=e.size||"W:147 H:43",document.getElementById("detailPrice").textContent=e.price||"$ 1,000",document.getElementById("detailImage").src=e.image_url;const t=document.getElementById("btnMaps360");t&&(t.href=e.maps_url||"https://maps.google.com"),Se(e.billboard_id);const n=document.getElementById("detailModal");n&&n.classList.add("active")}function Le(){const e=document.getElementById("detailModal");e&&e.classList.remove("active")}function st(){Le(),Se(v.billboard_id),J(1);const e=document.getElementById("wizardModal");e&&e.classList.add("active")}function Ce(){const e=document.getElementById("wizardModal");e&&e.classList.remove("active")}function J(e){for(let t=1;t<=4;t++){const n=document.getElementById(`wizardStep${t}`);n&&(n.style.display=t===e?"block":"none")}}async function lt(){var o,a;const e=(o=document.getElementById("bookingStartDate"))==null?void 0:o.value,t=(a=document.getElementById("bookingEndDate"))==null?void 0:a.value,n=document.getElementById("dateWarningBox");if(!e||!t){n&&(n.textContent="Please select both start and end dates.",n.classList.add("active"));return}const i=await je(v.billboard_id,e,t,D==null?void 0:D.size);if(!i.valid){n&&(n.textContent=i.message||"Unavailable or unsuitable time frame, please choose another",n.classList.add("active"));return}n&&n.classList.remove("active"),v.start_time=new Date(e).toISOString(),v.end_time=new Date(t).toISOString(),J(2)}function ct(){const e=document.getElementById("pdfDropzone"),t=document.getElementById("pdfFileInput");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",n=>{n.preventDefault(),e.classList.add("dragover")}),e.addEventListener("dragleave",()=>e.classList.remove("dragover")),e.addEventListener("drop",n=>{n.preventDefault(),e.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&fe(n.dataTransfer.files[0])}),t.addEventListener("change",n=>{n.target.files&&n.target.files.length>0&&fe(n.target.files[0])}))}async function fe(e){if(e.type!=="application/pdf"&&!e.name.endsWith(".pdf")){alert("Invalid file format. Please upload a PDF file.");return}const t=5*1024*1024;if(e.size>t){alert("File size exceeds 5MB limit. Please upload a smaller PDF file.");return}const n=document.getElementById("dropzoneStatusText");n&&(n.textContent="Uploading PDF brief...");const i=await Re(e);if(i.success){v.brief_url=i.url,v.brief_filename=i.filename;const o=document.getElementById("pdfFilePreview"),a=document.getElementById("pdfPreviewName");o&&a&&(a.textContent=`${e.name} (${(e.size/(1024*1024)).toFixed(2)} MB)`,o.style.display="flex"),n&&(n.textContent="PDF Uploaded Successfully!")}else alert("Failed to upload PDF file. Please try again."),n&&(n.textContent="Drag & Drop or Upload PDF")}function dt(){if(!v.brief_url){alert("Please upload a PDF brief before proceeding.");return}J(3)}function ut(){const e=document.getElementById("extraServicesList");e&&e.querySelectorAll(".service-option-card").forEach(t=>{t.addEventListener("click",()=>{t.classList.toggle("selected");const n=t.getAttribute("data-service");t.classList.contains("selected")?v.extra_services.includes(n)||v.extra_services.push(n):v.extra_services=v.extra_services.filter(i=>i!==n)})})}function mt(){pt(),J(4)}function pt(){if(!D)return;document.getElementById("summaryBillboardImg").src=D.image_url,document.getElementById("summaryBillboardId").textContent=D.billboard_id,document.getElementById("summaryLocation").textContent=D.location;const e=new Date(v.start_time).toLocaleDateString("en-US",{month:"short",day:"numeric"}),t=new Date(v.end_time).toLocaleDateString("en-US",{month:"short",day:"numeric"});document.getElementById("summaryDateRange").textContent=`${e} ➔ ${t}`;const n=document.getElementById("summaryServicesList");n&&(v.extra_services.length===0?n.innerHTML='<div style="color: #666; font-style: italic;">No extra services selected.</div>':n.innerHTML=v.extra_services.map(i=>`
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #111; margin-top: 6px;">
          <span style="color: var(--primary-red); font-size: 1.2rem;">☑</span> ${i}
        </div>
      `).join(""))}async function ft(){const e=C();if(!e){alert("Please sign in to submit your booking request."),x("authSection");return}const t=document.getElementById("btnConfirmBooking");t&&(t.disabled=!0,t.textContent="Submitting Request...");const n={user_email:e.email,billboard_id:v.billboard_id,start_time:v.start_time,end_time:v.end_time,brief_url:v.brief_url,extra_services:v.extra_services},i=await qe(n);t&&(t.disabled=!1,t.textContent="Confirm Request"),i.success?(Ce(),gt("Your request has been received! It will be reviewed and you will be contacted shortly."),oe(),x("dashboardSection")):alert("Failed to submit booking request. Please try again.")}function gt(e){const t=document.getElementById("toastContainer");if(!t)return;const n=document.createElement("div");n.className="toast-message",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s ease",setTimeout(()=>n.remove(),300)},5e3)}let H=[],h={searchQuery:"",locations:[],structures:[],availability:[],sizes:[]};async function yt(){if(!document.getElementById("billboardsGrid"))return;const[t,n]=await Promise.all([we(),Oe()]);console.log("Structure values:",[...new Set(t.map(c=>c.structure))]);const i=Date.now();H=t.map(c=>{const m=n.some(p=>{if(p.billboard_id!==c.billboard_id)return!1;const u=new Date(p.start_time).getTime(),b=new Date(p.end_time).getTime();return!isNaN(u)&&!isNaN(b)&&i>=u&&i<=b});return{...c,is_available:m?"Unavailable until...":"Available"}}),ke(H);const o=document.getElementById("discoverySearchInput");o&&o.addEventListener("input",c=>{h.searchQuery=c.target.value.toLowerCase().trim(),Q()});const a=document.getElementById("btnToggleFilter"),r=document.getElementById("filterModal"),s=document.getElementById("btnCloseFilter"),l=document.getElementById("btnApplyFilter"),d=document.getElementById("btnResetFilter");a&&r&&a.addEventListener("click",()=>r.classList.add("active")),s&&r&&s.addEventListener("click",()=>r.classList.remove("active")),l&&r&&l.addEventListener("click",()=>{vt(),Q(),r.classList.remove("active")}),d&&r&&d.addEventListener("click",()=>{bt(),Q(),r.classList.remove("active")}),window.addEventListener("authChange",ge),ge()}function ge(){const e=document.getElementById("accessBanner"),t=C();e&&(t&&t.status==="verified"?e.style.display="none":e.style.display="flex")}function vt(){h.locations=Array.from(document.querySelectorAll('input[name="filter_location"]:checked')).map(e=>e.value),h.structures=Array.from(document.querySelectorAll('input[name="filter_structure"]:checked')).map(e=>e.value),h.availability=Array.from(document.querySelectorAll('input[name="filter_availability"]:checked')).map(e=>e.value),h.sizes=Array.from(document.querySelectorAll('input[name="filter_size"]:checked')).map(e=>e.value)}function bt(){document.querySelectorAll('.filter-modal-content input[type="checkbox"]').forEach(e=>{e.checked=!1}),h={searchQuery:h.searchQuery,locations:[],structures:[],availability:[],sizes:[]}}function Q(){const e=H.filter(t=>{const n=(t.location||"").toLowerCase(),i=(t.structure||"").toLowerCase(),o=(t.billboard_id||"").toLowerCase(),a=(typeof t.is_available=="boolean"?t.is_available?"available":"unavailable until...":t.is_available||"").toLowerCase(),r=(t.size||"").replace(/\s+/g,"").toLowerCase();if(h.searchQuery){const s=h.searchQuery,l=o.includes(s),d=n.includes(s),c=i.includes(s);if(!l&&!d&&!c)return!1}return!(h.locations.length>0&&!h.locations.some(l=>n.includes(l.toLowerCase()))||h.structures.length>0&&!h.structures.some(l=>i.includes(l.toLowerCase()))||h.availability.length>0&&!h.availability.some(l=>a.includes(l.toLowerCase()))||h.sizes.length>0&&!h.sizes.some(l=>r.includes(l.replace(/\s+/g,"").toLowerCase())))});ke(e)}const ye=[{key:"megapole",title:"Megapole"},{key:"unipole",title:"Unipole"},{key:"wallbanner",title:"Wallbanner"},{key:"minipole",title:"Minipole"},{key:"backlit",title:"Backlit"},{key:"rooftop",title:"Rooftop"},{key:"bridge",title:"Bridge"},{key:"lightpole banners",title:"Lightpole Banners"}];function ht(e){if(!e)return"other";const t=e.toLowerCase().replace(/[\s\-_]+/g,"");return t.includes("megapole")?"megapole":t.includes("unipole")?"unipole":t.includes("wallbanner")||t.includes("wall")?"wallbanner":t.includes("minipole")?"minipole":t.includes("backlit")?"backlit":t.includes("rooftop")||t.includes("roof")?"rooftop":t.includes("bridge")?"bridge":t.includes("lightpole")||t.includes("polebanner")?"lightpole banners":"other"}function ve(e){const t=e.is_available==="Available"||e.is_available===!0,n=t?"Available":e.is_available===!1?"Unavailable until...":e.is_available||"Available",i=t?"status-available":"status-soon",o=t?"Book Now":"Check Schedule",a=(e.location||"North Lebanon").split(",")[0];return`
    <div class="billboard-card" data-id="${e.billboard_id}">
      <div class="card-image-wrapper">
        <img src="${e.image_url}" alt="Billboard ${e.billboard_id}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
        <div class="billboard-tag">
          ${e.billboard_id}
          <span>${a}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-header-row">
          <h3 class="card-title">${e.billboard_id}</h3>
          <span class="card-status ${i}">${n}</span>
        </div>
        <div class="card-location">${e.location||"North Lebanon / Network"}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #666; text-transform: uppercase;">${e.structure||"Billboard"}</span>
          <span style="font-weight: 900; color: var(--primary-red); font-size: 1.15rem;">${e.price}</span>
        </div>
        <button class="btn-card-action ${t?"":"soon"}" data-id="${e.billboard_id}" style="margin-top: 14px;">
          ${o}
        </button>
      </div>
    </div>
  `}function ke(e){const t=document.getElementById("billboardsGrid");if(!t)return;if(t.style.display="flex",t.style.flexDirection="column",t.style.gap="40px",e.length===0){t.innerHTML=`
      <div style="width: 100%; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.4rem; font-weight: 800; color: #666;">No billboards match your search filter</h3>
        <p style="color: #999; margin-top: 8px;">Try selecting different options or resetting your search.</p>
      </div>
    `;return}const n={};ye.forEach(o=>{n[o.key]=[]}),n.other={},e.forEach(o=>{const a=ht(o.structure);if(a==="other"){const r=o.structure||"Other Billboard";n.other[r]||(n.other[r]=[]),n.other[r].push(o)}else n[a].push(o)});let i="";ye.forEach(o=>{const a=n[o.key];a&&a.length>0&&(i+=`
        <div class="structure-section" style="width: 100%;">
          <div class="structure-title-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #111111; margin: 0; text-transform: capitalize;">${o.title}</h2>
            <span style="background: var(--primary-red); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 2px 10px; border-radius: 12px;">${a.length}</span>
          </div>
          <div class="billboards-grid">
            ${a.map(ve).join("")}
          </div>
        </div>
      `)}),Object.keys(n.other).forEach(o=>{const a=n.other[o];a&&a.length>0&&(i+=`
        <div class="structure-section" style="width: 100%;">
          <div class="structure-title-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #111111; margin: 0; text-transform: capitalize;">${o}</h2>
            <span style="background: var(--primary-red); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 2px 10px; border-radius: 12px;">${a.length}</span>
          </div>
          <div class="billboards-grid">
            ${a.map(ve).join("")}
          </div>
        </div>
      `)}),t.innerHTML=i,t.querySelectorAll(".billboard-card, .btn-card-action").forEach(o=>{o.addEventListener("click",a=>{a.stopPropagation();const r=o.getAttribute("data-id");wt(r)})})}function wt(e){const t=C();if(!t||t.status!=="verified")x("authSection");else{const n=H.find(i=>i.billboard_id===e);n&&rt(n)}}let q=null,Z=null;async function Et(){const e=S();if(!e){n.style.display="block";return}const t=document.getElementById("careersLoading"),n=document.getElementById("careersEmpty"),i=document.getElementById("careersJobsList");if(!t||!n||!i)return;t.style.display="block",n.style.display="none",i.style.display="none",i.innerHTML="";const{data:o,error:a}=await e.from("careers").select("*");if(t.style.display="none",a||!o||o.length===0){n.style.display="block";return}i.style.display="flex",o.forEach(r=>{const s=document.createElement("div");s.style.cssText=`
      border: 2.5px solid #111;
      border-radius: 20px;
      padding: 32px 36px;
      box-shadow: 5px 5px 0px #111;
      background: #fff;
      transition: transform 0.15s, box-shadow 0.15s;
    `,s.addEventListener("mouseover",()=>{s.style.transform="translate(-2px,-2px)",s.style.boxShadow="7px 7px 0px #111"}),s.addEventListener("mouseout",()=>{s.style.transform="",s.style.boxShadow="5px 5px 0px #111"});const l=r.requirements||"",d=l.length>200,c=d?l.slice(0,200)+"...":l,m=`req-${r.role_id}`;s.innerHTML=`
      <h3 style="font-size:1.35rem;font-weight:900;color:var(--primary-red,#D72638);margin:0 0 14px;">${r.job_title}</h3>
      <p id="${m}" style="font-size:0.97rem;font-weight:600;color:#333;line-height:1.7;margin:0 0 6px;">
        <strong>Requirements:</strong> ${c}
      </p>
      ${d?`<a href="#" data-toggle-req="${m}" data-full="${encodeURIComponent(l)}" data-preview="${encodeURIComponent(c)}"
              style="font-size:0.85rem;font-weight:800;color:var(--primary-red,#D72638);text-decoration:underline;display:inline-block;margin-bottom:18px;">
              Read more
           </a>`:'<div style="margin-bottom:18px;"></div>'}
      <button data-open-cv="${r.role_id}" data-job-title="${encodeURIComponent(r.job_title)}"
        style="width:100%;background:var(--primary-red,#D72638);color:#fff;border:2.5px solid #111;border-radius:12px;padding:15px;
               font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:800;cursor:pointer;
               box-shadow:4px 4px 0px #111;letter-spacing:0.5px;transition:transform 0.1s,box-shadow 0.1s;">
        Send us your CV
      </button>
    `,i.appendChild(s)}),i.addEventListener("click",_t)}function _t(e){const t=e.target.closest("[data-toggle-req]");if(t){e.preventDefault();const i=t.dataset.toggleReq,o=decodeURIComponent(t.dataset.full),a=decodeURIComponent(t.dataset.preview),r=document.getElementById(i),s=t.textContent.trim()==="Read more";r.innerHTML=`<strong>Requirements:</strong> ${s?o:a}`,t.textContent=s?"Read less":"Read more";return}const n=e.target.closest("[data-open-cv]");if(n){const i=n.dataset.openCv,o=decodeURIComponent(n.dataset.jobTitle);xt(i,o);return}}function xt(e,t){Z=e,document.getElementById("cvModalJobTitle").textContent=t,document.getElementById("cvApplicantName").value="",Ae(),Fe(),document.getElementById("cvModal").style.display="flex"}function K(){document.getElementById("cvModal").style.display="none"}function be(e){if(e){if(e.type!=="application/pdf"){N("Only PDF files are accepted.");return}if(e.size>5*1024*1024){N("File is too large. Maximum size is 5MB.");return}q=e,document.getElementById("cvFileName").textContent=e.name,document.getElementById("cvFilePreview").style.display="flex",document.getElementById("cvDropzoneText").innerHTML='File selected ✓ <span style="color:var(--primary-red,#D72638);text-decoration:underline;">change</span>',Ae()}}function Fe(){q=null;const e=document.getElementById("cvFileInput");e&&(e.value="");const t=document.getElementById("cvFilePreview");t&&(t.style.display="none");const n=document.getElementById("cvDropzoneText");n&&(n.innerHTML='Drag & drop your CV here, or <span style="color:var(--primary-red,#D72638);text-decoration:underline;">browse</span>')}function N(e){const t=document.getElementById("cvModalError");t&&(t.textContent=e,t.style.display="block")}function Ae(){const e=document.getElementById("cvModalError");e&&(e.style.display="none")}async function Bt(){const e=S();if(!e){N("Connection unavailable. Please try again.");return}const{error:t}=await e.storage,n=document.getElementById("cvApplicantName").value.trim();if(!n){N("Please enter your full name.");return}if(!q){N("Please upload your CV in PDF format.");return}const i=document.getElementById("btnSendCv");i.textContent="Uploading...",i.disabled=!0;try{const o=`${Z}_${Date.now()}_${q.name.replace(/\s+/g,"_")}`,{error:a}=await e.storage.from("cv_careers").upload(o,q,{contentType:"application/pdf",upsert:!1});if(a)throw new Error("CV upload failed: "+a.message);const{data:r}=e.storage.from("cv_careers").getPublicUrl(o),s=(r==null?void 0:r.publicUrl)||o,{error:l}=await e.from("career_applications").insert({role_id:Z,applicant_name:n,cv_url:s});if(l)throw new Error("Submission failed: "+l.message);K(),document.getElementById("cvSuccessModal").style.display="flex"}catch(o){N(o.message||"Something went wrong. Please try again.")}finally{i.textContent="Send Application",i.disabled=!1}}function It(){var t,n,i,o,a,r;(t=document.getElementById("btnCloseCvModal"))==null||t.addEventListener("click",K),(n=document.getElementById("cvModal"))==null||n.addEventListener("click",s=>{s.target===s.currentTarget&&K()}),(i=document.getElementById("btnSendCv"))==null||i.addEventListener("click",Bt),(o=document.getElementById("cvFileInput"))==null||o.addEventListener("change",s=>be(s.target.files[0]));const e=document.getElementById("cvDropzone");e&&(e.addEventListener("dragover",s=>{s.preventDefault(),e.style.background="#FFF0F0",e.style.borderColor="var(--primary-red,#D72638)"}),e.addEventListener("dragleave",()=>{e.style.background="#FAFAFA",e.style.borderColor="#111"}),e.addEventListener("drop",s=>{s.preventDefault(),e.style.background="#FAFAFA",e.style.borderColor="#111",be(s.dataTransfer.files[0])}),e.addEventListener("click",()=>{var s;return(s=document.getElementById("cvFileInput"))==null?void 0:s.click()})),(a=document.getElementById("cvFilePreview"))==null||a.addEventListener("click",s=>{s.target.closest("button")&&Fe()}),(r=document.getElementById("cvSuccessModal"))==null||r.addEventListener("click",s=>{(s.target===s.currentTarget||s.target.closest("button"))&&(document.getElementById("cvSuccessModal").style.display="none")})}window.showPage=function(e){x(e),e==="careers"&&Et()};document.addEventListener("DOMContentLoaded",()=>{Ve(),Ge(),Xe(),Qe(),Ye(),Ze(),ze(),yt(),at(),Ke(),It();const e=document.querySelectorAll("section"),t=document.querySelectorAll(".nav-item"),n={root:null,threshold:.3},i=new IntersectionObserver(a=>{a.forEach(r=>{if(r.isIntersecting){const s=r.target.getAttribute("id");t.forEach(l=>{const d=l.querySelector("a");d&&d.getAttribute("href")===`#${s}`?l.classList.add("active"):l.classList.remove("active")}),s==="about"||s==="contact"?document.body.classList.add("dark-header"):document.body.classList.remove("dark-header")}})},n);e.forEach(a=>i.observe(a)),"scrollRestoration"in history&&(history.scrollRestoration="manual");const o=window.location.hash?window.location.hash.replace("#",""):"home";o&&["discoverySection","authSection","dashboardSection"].includes(o)?x(o):window.scrollTo(0,0),window.addEventListener("hashchange",()=>{const a=window.location.hash?window.location.hash.replace("#",""):"home";a&&x(a)})});
