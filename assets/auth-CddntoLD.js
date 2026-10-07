(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const te="917353129776",ce="https://whatsapp.com/channel/0029Vb27q0JKwqSbZewkPh1r",we="rzp_live_Tku5aRKgb2tf28",J=999;document.addEventListener("DOMContentLoaded",()=>{Ee(),Se(),ke(),Be(),Ae(),Ie(),Ce(),Le(),xe(),de(),Me()});function Ee(){const e=document.querySelector(".header");e&&window.addEventListener("scroll",()=>{window.scrollY>20?e.classList.add("scrolled"):e.classList.remove("scrolled")},{passive:!0})}function Se(){const e=document.querySelector(".mobile-toggle"),t=document.querySelector(".mobile-drawer"),n=document.querySelector(".drawer-overlay"),o=document.querySelector(".drawer-close");if(!e||!t||!n)return;function a(){t.classList.add("open"),n.classList.add("active"),document.body.style.overflow="hidden"}function r(){t.classList.remove("open"),n.classList.remove("active"),document.body.style.overflow=""}e.addEventListener("click",a),o&&o.addEventListener("click",r),n.addEventListener("click",r),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.classList.contains("open")&&r()})}function ke(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".update-card");!e.length||!t.length||e.forEach(n=>{n.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("active")),n.classList.add("active");const o=n.getAttribute("data-filter");t.forEach(a=>{const r=a.getAttribute("data-category");o==="all"||r===o?(a.style.display="flex",a.style.animation="fadeIn 0.3s ease forwards"):a.style.display="none"})})})}function Be(){const e=document.querySelectorAll(".domain-filter-btn"),t=document.querySelectorAll(".internship-listing-card");!e.length||!t.length||e.forEach(n=>{n.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("active")),n.classList.add("active");const o=n.getAttribute("data-domain");t.forEach(a=>{const r=a.getAttribute("data-domain");o==="all"||r===o?a.style.display="flex":a.style.display="none"})})})}function Ae(){const e=document.getElementById("applyModal"),t=document.getElementById("modalCloseBtn"),n=document.querySelectorAll(".trigger-apply-modal"),o=document.getElementById("internshipApplyForm"),a=document.getElementById("applyDomainSelect"),r=document.getElementById("selectedDomainBadge"),c=document.getElementById("modalPriceDisplay"),s=document.getElementById("paySubmitBtn");function g(l){r&&(r.textContent=l||"Select Domain Below"),c&&(c.textContent=`₹${J}`),s&&(s.innerHTML=`Pay ₹${J} & Register via Razorpay 💳`)}if(a&&a.addEventListener("change",()=>{g(a.value)}),n.length&&e){let l=function(h=""){if(window.EduYodhaAuth&&!window.EduYodhaAuth.isLoggedIn()){window.EduYodhaAuth.openAuthModal("login"),setTimeout(()=>{window.EduYodhaAuth.showAuthAlert("error","🔒 Please sign in first to apply for an internship.")},60);return}if(e.classList.add("active"),document.body.style.overflow="hidden",a&&h&&(a.value=h),g((a==null?void 0:a.value)||h),window.EduYodhaAuth&&window.EduYodhaAuth.isLoggedIn()){const v=window.EduYodhaAuth.getCurrentUser(),E=document.getElementById("applyFullName"),m=document.getElementById("applyEmail");E&&!E.value&&(E.value=window.EduYodhaAuth.getUserDisplayName(v)),m&&!m.value&&(v!=null&&v.email)&&(m.value=v.email)}},p=function(){e.classList.remove("active"),document.body.style.overflow=""};var i=l,u=p;n.forEach(h=>{h.addEventListener("click",v=>{v.preventDefault();const E=h.getAttribute("data-domain")||"";l(E)})}),t&&t.addEventListener("click",p),e.addEventListener("click",h=>{h.target===e&&p()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&e.classList.contains("active")&&p()})}o&&o.addEventListener("submit",l=>{var F,D,L,x,$,_,T;l.preventDefault();const p=((F=document.getElementById("applyFullName"))==null?void 0:F.value.trim())||"",h=((D=document.getElementById("applyEmail"))==null?void 0:D.value.trim())||"",v=((L=document.getElementById("applyPhone"))==null?void 0:L.value.trim())||"",E=((x=document.getElementById("applyCollege"))==null?void 0:x.value.trim())||"",m=(($=document.getElementById("applyYear"))==null?void 0:$.value.trim())||"",d=((_=document.getElementById("applyDomainSelect"))==null?void 0:_.value.trim())||"",w=((T=document.getElementById("applyResume"))==null?void 0:T.value.trim())||"Not Provided",b=J;if(!d){alert("Please select an internship domain.");return}const y=o.querySelector('button[type="submit"]');if(y&&(y.disabled=!0,y.innerHTML="<span>Opening Secure Razorpay Gateway... 🔒</span>"),typeof window.Razorpay>"u"){const f=document.createElement("script");f.src="https://checkout.razorpay.com/v1/checkout.js",f.onload=()=>A(),f.onerror=()=>{alert("Failed to load Razorpay payment gateway script. Please check your internet connection."),y&&(y.disabled=!1,y.innerHTML=`Pay ₹${b} & Register via Razorpay 💳`)},document.body.appendChild(f)}else A();function A(){const f={key:we,amount:b*100,currency:"INR",name:"EDU YODHA",description:`Internship Enrollment - ${d}`,image:"assets/images/logo.png",handler:function(S){const k=S.razorpay_payment_id||"PAY_"+Date.now();O({fullName:p,email:h,phone:v,college:E,year:m,domain:d,resume:w,price:b,paymentId:k})},prefill:{name:p,email:h,contact:v},notes:{college_name:E,academic_year:m,internship_domain:d},theme:{color:"#0284C7"},modal:{ondismiss:function(){y&&(y.disabled=!1,y.innerHTML=`Pay ₹${b} & Register via Razorpay 💳`)}}};try{const S=new window.Razorpay(f);S.on("payment.failed",function(k){var z;alert(`Payment Failed: ${((z=k.error)==null?void 0:z.description)||"Transaction was canceled or failed."}`),y&&(y.disabled=!1,y.innerHTML=`Pay ₹${b} & Register via Razorpay 💳`)}),S.open()}catch(S){console.error("Razorpay initialization error:",S),alert("Could not initialize Razorpay checkout popup. Please try again."),y&&(y.disabled=!1,y.innerHTML=`Pay ₹${b} & Register via Razorpay 💳`)}}function O(f){const S=`🎉 *EDU YODHA Enrollment & Payment Confirmation*

💳 *Razorpay Payment ID:* ${f.paymentId}
💰 *Amount Paid:* ₹${f.price}
📌 *Full Name:* ${f.fullName}
📧 *Email:* ${f.email}
📱 *Student WhatsApp:* ${f.phone}
🏫 *College:* ${f.college}
📚 *Current Year:* ${f.year}
💻 *Selected Domain:* ${f.domain}
🔗 *Resume/LinkedIn:* ${f.resume}

My payment is complete. Please verify and issue my offer letter & LMS access.`,k=`https://wa.me/${te}?text=${encodeURIComponent(S)}`;window.open(k,"_blank"),o.innerHTML=`
          <div style="text-align: center; padding: 1.5rem 1rem;">
            <div style="width: 64px; height: 64px; background: #D1FAE5; color: #059669; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 2rem;">✓</div>
            <h3 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">Payment & Registration Successful!</h3>
            <p style="color: #475569; font-size: 0.9rem; margin-bottom: 1.25rem;">
              Thank you, <strong>${f.fullName}</strong>! Your payment of <strong>₹${f.price}</strong> has been received via Razorpay.
            </p>
            
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem; text-align: left; font-size: 0.88rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: #64748B;">Payment ID:</span>
                <strong style="color: #0284C7; font-family: monospace;">${f.paymentId}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: #64748B;">Program:</span>
                <strong style="color: #0F172A;">${f.domain}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: #64748B;">Amount Paid:</span>
                <strong style="color: #059669;">₹${f.price} (Paid via Razorpay)</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748B;">College:</span>
                <span style="color: #334155;">${f.college} (${f.year})</span>
              </div>
            </div>

            <div style="display: flex; gap: 10px; flex-direction: column; margin-bottom: 1.25rem;">
              <a href="${k}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block" style="background-color: #25D366; border: none; font-weight: 700; padding: 0.8rem;">
                Send Payment Receipt to Official Desk via WhatsApp ↗
              </a>
              <a href="${ce}" target="_blank" rel="noopener noreferrer" class="btn btn-block" style="background-color: #059669; color: #FFFFFF; border: none; font-size: 0.88rem; padding: 0.6rem 1rem; text-align: center;">
                Join Official WhatsApp Announcements Channel ↗
              </a>
            </div>

            <button type="button" class="btn btn-secondary btn-block" onclick="location.reload()">Done / Close</button>
          </div>
        `}})}function Ie(){const e=document.getElementById("contactForm");e&&e.addEventListener("submit",t=>{var u,l,p,h,v;t.preventDefault();const n=((u=document.getElementById("contactName"))==null?void 0:u.value.trim())||"",o=((l=document.getElementById("contactEmail"))==null?void 0:l.value.trim())||"",a=((p=document.getElementById("contactPhone"))==null?void 0:p.value.trim())||"",r=((h=document.getElementById("contactSubject"))==null?void 0:h.value.trim())||"",c=((v=document.getElementById("contactMessage"))==null?void 0:v.value.trim())||"",s=document.getElementById("contactSubmitBtn");s&&(s.disabled=!0,s.textContent="Opening WhatsApp...");const g=`💬 *New Message - EDU YODHA Contact Desk*

📌 *Full Name:* ${n}
📧 *Email:* ${o}
📱 *WhatsApp:* ${a}
🏷️ *Category:* ${r}
📝 *Message:* ${c}`,i=`https://wa.me/${te}?text=${encodeURIComponent(g)}`;window.open(i,"_blank"),setTimeout(()=>{const E=document.getElementById("contactSuccessMsg");E&&(e.style.display="none",E.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem; color: #065F46;">✓ Message Prepared for WhatsApp!</strong>
          <p style="font-size: 0.88rem; margin-bottom: 1rem; color: #047857;">If WhatsApp did not open automatically, click below to send your message to our official desk:</p>
          <a href="${i}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background-color: #25D366; border: none; display: block; width: 100%; text-align: center; margin-bottom: 1.25rem; font-weight: 700;">Send via WhatsApp Chat ↗</a>
          
          <div style="background: #FFFFFF; border: 1px solid #A7F3D0; border-radius: 10px; padding: 1rem; text-align: left;">
            <strong style="color: #065F46; font-size: 0.9rem; display: block; margin-bottom: 0.25rem;">📢 Join EDU YODHA WhatsApp Channel</strong>
            <p style="font-size: 0.82rem; color: #047857; margin-bottom: 0.75rem;">Get instant broadcast alerts for VTU exam timetables, results, and career drives.</p>
            <a href="${ce}" target="_blank" rel="noopener noreferrer" class="btn" style="background-color: #059669; color: #FFFFFF; border: none; display: block; text-align: center; font-size: 0.85rem; padding: 0.55rem;">Join Official WhatsApp Channel ↗</a>
          </div>
        `,E.style.display="block")},500)})}function Ce(){document.querySelectorAll(".accordion-header").forEach(t=>{t.addEventListener("click",()=>{const n=t.parentElement,o=n.classList.contains("active"),a=n.closest(".accordion-group");a&&a.querySelectorAll(".accordion-item").forEach(r=>{r!==n&&r.classList.remove("active")}),n.classList.toggle("active",!o)})})}function Le(){const e=document.querySelectorAll(".stat-number[data-count]");if(!e.length)return;const t=new IntersectionObserver((n,o)=>{n.forEach(a=>{if(a.isIntersecting){const r=a.target,c=parseInt(r.getAttribute("data-count"),10),s=r.getAttribute("data-suffix")||"";let g=0;const i=Math.max(1,Math.floor(c/40)),u=setInterval(()=>{g+=i,g>=c&&(g=c,clearInterval(u)),r.innerHTML=`${g.toLocaleString()}<span class="highlight">${s}</span>`},30);o.unobserve(r)}})},{threshold:.4});e.forEach(n=>t.observe(n))}let j=null;function xe(){const e=document.getElementById("uploadNotesModal"),t=document.getElementById("uploadModalCloseBtn"),n=document.querySelectorAll(".trigger-upload-modal"),o=document.getElementById("pdfDropZone"),a=document.getElementById("noteFileInput"),r=document.getElementById("dropZoneContent"),c=document.getElementById("filePreviewCard"),s=document.getElementById("previewFileName"),g=document.getElementById("previewFileSize"),i=document.getElementById("removeFileBtn"),u=document.getElementById("uploadNotesForm");if(n.length&&e){let m=function(){if(window.EduYodhaAuth&&!window.EduYodhaAuth.isLoggedIn()){window.EduYodhaAuth.openAuthModal("login"),setTimeout(()=>{window.EduYodhaAuth.showAuthAlert("error","🔒 Please sign in first to upload notes.")},60);return}if(e.classList.add("active"),document.body.style.overflow="hidden",window.EduYodhaAuth&&window.EduYodhaAuth.isLoggedIn()){const w=window.EduYodhaAuth.getCurrentUser(),b=document.getElementById("noteAuthor");b&&!b.value&&(b.value=window.EduYodhaAuth.getUserDisplayName(w))}},d=function(){e.classList.remove("active"),document.body.style.overflow="",p()};var v=m,E=d;n.forEach(w=>{w.addEventListener("click",b=>{b.preventDefault(),m()})}),t&&t.addEventListener("click",d),e.addEventListener("click",w=>{w.target===e&&d()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&e.classList.contains("active")&&d()})}o&&a&&(o.addEventListener("click",m=>{m.target!==i&&a.click()}),a.addEventListener("change",m=>{m.target.files&&m.target.files[0]&&l(m.target.files[0])}),["dragenter","dragover"].forEach(m=>{o.addEventListener(m,d=>{d.preventDefault(),d.stopPropagation(),o.classList.add("dragover")})}),["dragleave","drop"].forEach(m=>{o.addEventListener(m,d=>{d.preventDefault(),d.stopPropagation(),o.classList.remove("dragover")})}),o.addEventListener("drop",m=>{const d=m.dataTransfer;d&&d.files&&d.files[0]&&l(d.files[0])}),i&&i.addEventListener("click",m=>{m.stopPropagation(),p()}));function l(m){j=m,s&&(s.textContent=m.name),g&&(g.textContent=h(m.size)),r&&(r.style.display="none"),c&&(c.style.display="block")}function p(){j=null,a&&(a.value=""),r&&(r.style.display="block"),c&&(c.style.display="none")}function h(m,d=1){if(m===0)return"0 Bytes";const w=1024,b=d<0?0:d,y=["Bytes","KB","MB","GB"],A=Math.floor(Math.log(m)/Math.log(w));return parseFloat((m/Math.pow(w,A)).toFixed(b))+" "+y[A]}u&&u.addEventListener("submit",m=>{var $,_,T,f,S,k,z;if(m.preventDefault(),!j&&!a.files[0]){alert("Please select a PDF or document file to upload.");return}const d=j||a.files[0],w=(($=document.getElementById("noteSubjectName"))==null?void 0:$.value.trim())||"",b=((_=document.getElementById("noteSubjectCode"))==null?void 0:_.value.trim())||"",y=((T=document.getElementById("noteBranch"))==null?void 0:T.value)||"",A=((f=document.getElementById("noteSemester"))==null?void 0:f.value)||"",O=((S=document.getElementById("noteCategory"))==null?void 0:S.value)||"",F=((k=document.getElementById("noteContributorName"))==null?void 0:k.value.trim())||"",D=((z=document.getElementById("noteCollegeName"))==null?void 0:z.value.trim())||"",L=u.querySelector('button[type="submit"]');L&&(L.disabled=!0,L.textContent="Publishing & Syncing Globally...");function x(P){const K={id:"note_"+Date.now(),subjectName:w,subjectCode:b,branch:y,semester:A,category:O,contributorName:F,collegeName:D,fileName:d.name,fileSize:h(d.size),fileUrl:P,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})};Pe(K);const ve=`📤 *New Student PDF Uploaded on EDU YODHA*

📚 *Subject:* ${w} (${b})
🎓 *Branch & Sem:* ${y} | ${A}
🏷️ *Category:* ${O}
📄 *File:* ${d.name} (${h(d.size)})
👤 *Contributed By:* ${F} (${D})

Please verify and add to permanent VTU repository.`,be=`https://wa.me/${te}?text=${encodeURIComponent(ve)}`;u.innerHTML=`
          <div style="text-align: center; padding: 1.5rem 1rem;">
            <div style="width: 56px; height: 56px; background: #D1FAE5; color: #059669; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.75rem;">✓</div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">Notes Published & Visible to Everyone!</h3>
            <p style="color: #475569; font-size: 0.92rem; margin-bottom: 1.25rem;">Your document <strong>${d.name}</strong> is now live and accessible across all mobile devices, laptops, and tablets globally.</p>
            
            <div style="display: flex; gap: 10px; flex-direction: column; margin-bottom: 1.25rem;">
              <a href="${P}" download="${d.name}" class="btn btn-primary btn-block" style="font-weight: 700;">⬇ Download Uploaded PDF</a>
              <a href="${be}" target="_blank" rel="noopener noreferrer" class="btn btn-block" style="background-color: #25D366; color: #FFFFFF; border: none; font-weight: 700;">Share to Official Desk via WhatsApp ↗</a>
            </div>

            <button type="button" class="btn btn-secondary btn-block" onclick="location.reload()">Done / Close</button>
          </div>
        `,de()}if(d.size<8*1024*1024){const P=new FileReader;P.onload=function(K){x(K.target.result)},P.onerror=function(){x(URL.createObjectURL(d))},P.readAsDataURL(d)}else x(URL.createObjectURL(d))})}function Pe(e){let t=Q();t.some(n=>n.id===e.id)||t.unshift(e);try{localStorage.setItem("eduyodha_community_notes",JSON.stringify(t))}catch(n){console.log("LocalStorage save info:",n)}try{fetch("https://api.jsonbin.io/v3/b/66f4095de410157d37fba678",{method:"PUT",headers:{"Content-Type":"application/json","X-Bin-Meta":"false"},body:JSON.stringify(t.slice(0,30))}).catch(n=>console.log("Global cloud publish info:",n))}catch(n){console.log("Cloud sync error:",n)}}function Q(){try{const e=localStorage.getItem("eduyodha_community_notes");return e?JSON.parse(e):ie()}catch{return ie()}}function ie(){return[{id:"default_1",subjectName:"Design & Analysis of Algorithms",subjectCode:"21CS42",branch:"CSE / ISE",semester:"4th Sem",category:"Handwritten Notes",contributorName:"Priya N.",collegeName:"RVCE Bengaluru",fileName:"DAA_Complete_Module_1_to_5.pdf",fileSize:"4.8 MB",fileUrl:"#",date:"24 Sep 2026"},{id:"default_2",subjectName:"Engineering Mathematics III",subjectCode:"21MAT31",branch:"All Branches",semester:"3rd Sem",category:"Module Solved PDF",contributorName:"Karthik S.",collegeName:"BMSCE",fileName:"Maths_3_Fourier_Series_Transforms.pdf",fileSize:"3.2 MB",fileUrl:"#",date:"23 Sep 2026"},{id:"default_3",subjectName:"Operating Systems",subjectCode:"21CS44",branch:"CSE / AI",semester:"4th Sem",category:"VTU Question Papers",contributorName:"Ananya R.",collegeName:"MSRIT",fileName:"OS_Deadlocks_CPU_Scheduling_QB.pdf",fileSize:"2.1 MB",fileUrl:"#",date:"22 Sep 2026"}]}function de(){const e=document.getElementById("communityNotesContainer");if(!e)return;const t=Q();t.length?e.innerHTML=t.map(n=>`
      <div class="community-note-card">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
            <span class="tag-pill blue" style="font-size: 0.72rem;">${n.subjectCode}</span>
            <span class="tag-pill emerald" style="font-size: 0.72rem;">${n.category}</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">${n.subjectName}</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">
            <strong>Branch & Sem:</strong> ${n.branch} • ${n.semester}
          </p>
        </div>

        <div style="border-top: 1px dashed var(--border-light); padding-top: 0.85rem; margin-top: 0.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span class="contributor-pill">👤 ${n.contributorName} (${n.collegeName})</span>
            <span style="font-size: 0.72rem; color: var(--text-subtle);">${n.date}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="${n.fileUrl}" ${n.fileUrl&&n.fileUrl!=="#"?`download="${n.fileName}"`:""} class="btn btn-secondary btn-block" style="font-size: 0.82rem; padding: 0.5rem 0.75rem; text-align: center; flex: 1;">
              📥 Download (${n.fileSize})
            </a>
          </div>
        </div>
      </div>
    `).join(""):e.innerHTML='<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No community notes uploaded yet. Be the first to share notes!</p>',window._cloudSynced||(window._cloudSynced=!0,fetch("https://api.jsonbin.io/v3/b/66f4095de410157d37fba678/latest",{headers:{"X-Bin-Meta":"false"}}).then(n=>n.json()).then(n=>{const o=Array.isArray(n)?n:n.record||[];if(o.length){let a=Q();const r=new Map;[...o,...a].forEach(s=>{s&&s.id&&r.set(s.id,s)});const c=Array.from(r.values());localStorage.setItem("eduyodha_community_notes",JSON.stringify(c)),e.innerHTML=c.map(s=>`
          <div class="community-note-card">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
                <span class="tag-pill blue" style="font-size: 0.72rem;">${s.subjectCode}</span>
                <span class="tag-pill emerald" style="font-size: 0.72rem;">${s.category}</span>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">${s.subjectName}</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">
                <strong>Branch & Sem:</strong> ${s.branch} • ${s.semester}
              </p>
            </div>

            <div style="border-top: 1px dashed var(--border-light); padding-top: 0.85rem; margin-top: 0.5rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="contributor-pill">👤 ${s.contributorName} (${s.collegeName})</span>
                <span style="font-size: 0.72rem; color: var(--text-subtle);">${s.date}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <a href="${s.fileUrl}" ${s.fileUrl&&s.fileUrl!=="#"?`download="${s.fileName}"`:""} class="btn btn-secondary btn-block" style="font-size: 0.82rem; padding: 0.5rem 0.75rem; text-align: center; flex: 1;">
                  📥 Download (${s.fileSize})
                </a>
              </div>
            </div>
          </div>
        `).join("")}}).catch(n=>console.log("Global cloud notes sync:",n)))}function Me(){const e=[{title:"VTU Official Results & Grade Portal Mirror",category:"VTU",url:"vtu.html#results",badge:"Live"},{title:"VTU Official Notifications & Timetables",category:"VTU",url:"vtu.html#circulars",badge:"Updated"},{title:"VTU SGPA to CGPA & Percentage Calculator",category:"VTU Tool",url:"vtu.html#sgpa-calculator",badge:"Calculator"},{title:"VTU SGPA & CGPA Calculation Guide 2026",category:"Master Guide",url:"vtu-sgpa-cgpa-calculator-guide.html",badge:"Guide"},{title:"VTU Revaluation & Challenge Valuation Rules",category:"Master Guide",url:"vtu-revaluation-challenge-valuation-guide.html",badge:"Guide"},{title:"VTU Grace Marks & Backlog Rules Guide",category:"Master Guide",url:"vtu-grace-marks-backlog-rules-guide.html",badge:"Guide"},{title:"KCET Option Entry & Counseling Strategy Guide",category:"KCET Guide",url:"kcet-option-entry-counseling-guide.html",badge:"Guide"},{title:"KCET Engineering Cutoff Ranks (2025-2026)",category:"KCET",url:"kcet.html#cutoffs",badge:"Cutoffs"},{title:"KCET Document Verification Checklist",category:"KCET",url:"kcet.html#verification",badge:"Checklist"},{title:"Full-Stack Web Development Internship",category:"Internship",url:"internships.html#webdev",badge:"₹999"},{title:"Python & Data Science Internship",category:"Internship",url:"internships.html#python",badge:"₹999"},{title:"AI & Machine Learning Internship",category:"Internship",url:"internships.html#aiml",badge:"₹999"},{title:"Cyber Security & Ethical Hacking Internship",category:"Internship",url:"internships.html#cyber",badge:"₹999"},{title:"CAD / CAM Mechanical Engineering Internship",category:"Internship",url:"internships.html#cad",badge:"₹999"},{title:"VLSI & Embedded Systems Internship",category:"Internship",url:"internships.html#vlsi",badge:"₹999"},{title:"CSE Engineering Roadmap & Placement Guide",category:"Master Guide",url:"cse-engineering-roadmap-guide.html",badge:"Roadmap"},{title:"Free VTU Notes & Solved Papers Repository",category:"Resources",url:"resources.html",badge:"Notes"},{title:"Upload & Share Notes Community Modal",category:"Tool",url:"resources.html#upload-notes",badge:"Community"}];if(!document.getElementById("globalSearchOverlay")){const i=document.createElement("div");i.id="globalSearchOverlay",i.className="search-modal-overlay",i.innerHTML=`
      <div class="search-modal-card">
        <div class="search-input-header">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" id="globalSearchInput" placeholder="Search VTU circulars, KCET cutoffs, notes, guides, internships..." autocomplete="off">
          <button type="button" id="closeSearchBtn" style="background:none; border:none; cursor:pointer; color:var(--text-subtle); font-size:1.2rem;">✕</button>
        </div>
        <div class="search-results-box" id="globalSearchResults">
          <div style="padding: 1.5rem; text-align: center; color: var(--text-subtle); font-size: 0.9rem;">
            Type to search across VTU, KCET, Notes, Guides, and Programs...
          </div>
        </div>
        <div class="search-footer-hints">
          <span><kbd class="kbd-shortcut">↑</kbd> <kbd class="kbd-shortcut">↓</kbd> Navigate</span>
          <span><kbd class="kbd-shortcut">ESC</kbd> Close</span>
        </div>
      </div>
    `,document.body.appendChild(i)}const t=document.getElementById("globalSearchOverlay"),n=document.getElementById("globalSearchInput"),o=document.getElementById("globalSearchResults"),a=document.getElementById("closeSearchBtn");function r(){t&&(t.classList.add("active"),document.body.style.overflow="hidden",n&&(n.value="",n.focus(),s("")))}function c(){t&&(t.classList.remove("active"),document.body.style.overflow="")}document.querySelectorAll(".trigger-search-modal").forEach(i=>{i.addEventListener("click",u=>{u.preventDefault(),r()})}),a&&a.addEventListener("click",c),t&&t.addEventListener("click",i=>{i.target===t&&c()}),document.addEventListener("keydown",i=>{(i.ctrlKey||i.metaKey)&&i.key==="k"?(i.preventDefault(),r()):i.key==="Escape"&&t&&t.classList.contains("active")&&c()}),n&&n.addEventListener("input",i=>{s(i.target.value.trim())});function s(i){if(!o)return;const u=i.toLowerCase(),l=e.filter(p=>!u||p.title.toLowerCase().includes(u)||p.category.toLowerCase().includes(u));if(!l.length){o.innerHTML=`
        <div style="padding: 2rem; text-align: center; color: var(--text-subtle);">
          No results found for "<strong>${g(i)}</strong>"
        </div>
      `;return}o.innerHTML=l.map(p=>`
      <a href="${p.url}" class="search-result-item" onclick="document.getElementById('globalSearchOverlay').classList.remove('active'); document.body.style.overflow='';">
        <div>
          <div class="search-result-item-title">${g(p.title)}</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${g(p.category)}</span>
        </div>
        <span class="search-result-item-badge badge-tag blue">${g(p.badge)}</span>
      </a>
    `).join("")}function g(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}const ne=(()=>{const{hostname:e}=window.location;return e==="localhost"||e==="127.0.0.1"?"":"https://api.eduyodha.com"})(),Z="713345187824-eivr9lt95h49hgaod3557hmuhndrdq17.apps.googleusercontent.com",oe="eduyodha_session";function Y(e,t){localStorage.setItem(oe,JSON.stringify({token:e,user:t}))}function ae(){try{const e=localStorage.getItem(oe);return e?JSON.parse(e):null}catch{return null}}function Ne(){localStorage.removeItem(oe)}function ue(){const e=ae();return!!(e&&e.token&&e.user)}function me(){const e=ae();return e?e.user:null}function ge(){const e=ae();return e?e.token:null}async function V(e,t){const n=await fetch(`${ne}${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();if(!n.ok)throw new Error(o.error||"Request failed.");return o}async function Fe(e,t,n){const o=await V("/api/auth/signup",{name:n,email:e,password:t});return Y(o.token,o.user),o.user}async function De(e,t){const n=await V("/api/auth/login",{email:e,password:t});return Y(n.token,n.user),n.user}async function $e(e){const t=await V("/api/auth/google",{credential:e});return Y(t.token,t.user),t.user}async function _e(e){await V("/api/auth/forgot-password",{email:e})}async function X(){var t,n;try{const o=ge();o&&fetch(`${ne}/api/auth/logout`,{method:"POST",headers:{Authorization:`Bearer ${o}`}}).catch(()=>{})}catch{}Ne();try{(n=(t=window.google)==null?void 0:t.accounts)!=null&&n.id&&google.accounts.id.disableAutoSelect()}catch{}q();const e=window.location.pathname.split("/").pop()||"index.html";["dashboard.html"].includes(e)&&(window.location.href="index.html")}function W(e){return e?e.name?e.name:(e.email||"").split("@")[0]||"Student":""}function pe(e){const t=W(e),n=t.trim().split(/\s+/);return n.length>=2?(n[0][0]+n[1][0]).toUpperCase():t.slice(0,2).toUpperCase()}function q(){const e=me(),t=document.querySelectorAll(".auth-login-btn"),n=document.querySelectorAll(".auth-user-menu"),o=document.querySelectorAll(".trigger-upload-modal"),a=document.querySelectorAll(".trigger-apply-modal");if(ue()&&e){const r=W(e),c=pe(e),s=e.picture||"";t.forEach(l=>l.style.display="none"),n.forEach(l=>l.style.display="flex"),document.querySelectorAll(".auth-user-initials").forEach(l=>{s?(l.textContent="",l.style.cssText=`
          background-image: url('${s}');
          background-size: cover;
          background-position: center;
          background-color: transparent;
          font-size: 0;
        `):(l.textContent=c,l.style.cssText="")}),document.querySelectorAll(".auth-user-name").forEach(l=>{const p=r.split(" ")[0];l.textContent=p}),o.forEach(l=>l.removeAttribute("data-auth-required")),a.forEach(l=>l.removeAttribute("data-auth-required"));const g=document.getElementById("applyFullName"),i=document.getElementById("applyEmail"),u=document.getElementById("noteAuthor");g&&!g.value&&(g.value=r),i&&!i.value&&(i.value=e.email||""),u&&!u.value&&(u.value=r)}else t.forEach(r=>r.style.display=""),n.forEach(r=>r.style.display="none"),o.forEach(r=>r.setAttribute("data-auth-required","upload")),a.forEach(r=>r.setAttribute("data-auth-required","internship"))}function re(){if(document.getElementById("authModal"))return;const e=document.createElement("div");e.id="authModal",e.className="auth-modal-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Login or Sign Up"),e.innerHTML=`
    <div class="auth-modal-card">

      <!-- Header -->
      <div class="auth-modal-header">
        <div class="auth-brand">
          <img src="assets/images/logo.png" alt="EDU YODHA" width="38" height="38">
          <div>
            <div class="auth-brand-title">EDU YODHA</div>
            <div class="auth-brand-sub">Empowering Students. Building Careers.</div>
          </div>
        </div>
        <button class="auth-modal-close" id="authModalClose" aria-label="Close">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Sign In</button>
        <button class="auth-tab"        data-tab="signup">Create Account</button>
      </div>

      <!-- Alert -->
      <div class="auth-alert" id="authAlert" style="display:none;"></div>

      <!-- Google Sign-In Container (Official GIS rendered button — No redirect_uri_mismatch) -->
      <div id="googleSignInBtnContainer" style="display:flex; justify-content:center; margin-bottom: 1rem; width:100%; min-height:44px;"></div>

      <!-- Divider -->
      <div class="auth-divider" id="authDivider"><span>or continue with email</span></div>

      <!-- ═══ LOGIN FORM ═══ -->
      <form class="auth-form active" id="loginForm" data-tab-form="login" novalidate>

        <div class="auth-form-group">
          <label class="auth-label" for="loginEmail">Email Address</label>
          <input type="email" id="loginEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="loginEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="loginPassword">Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="loginPassword" class="auth-input"
              placeholder="Enter your password" autocomplete="current-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="loginPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="auth-field-error" id="loginPasswordErr"></span>
        </div>

        <div class="auth-form-row">
          <label class="auth-remember">
            <input type="checkbox" id="rememberMe"> Remember me
          </label>
          <button type="button" class="auth-forgot-link" id="forgotPasswordBtn">Forgot password?</button>
        </div>

        <button type="submit" class="auth-submit-btn" id="loginSubmitBtn">
          <span class="auth-btn-text">Sign In</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>

        <p class="auth-switch-text">
          Don't have an account?
          <button type="button" class="auth-switch-btn" data-switch="signup">Create one free →</button>
        </p>
      </form>

      <!-- ═══ SIGNUP FORM ═══ -->
      <form class="auth-form" id="signupForm" data-tab-form="signup" novalidate>

        <div class="auth-form-group">
          <label class="auth-label" for="signupName">Full Name</label>
          <input type="text" id="signupName" class="auth-input"
            placeholder="e.g. Ananya Rao" autocomplete="name" required>
          <span class="auth-field-error" id="signupNameErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupEmail">Email Address</label>
          <input type="email" id="signupEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="signupEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupPassword">Create Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupPassword" class="auth-input"
              placeholder="Min 8 characters" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <div class="auth-password-strength"><div class="strength-fill" id="strengthFill"></div></div>
          <span class="auth-field-error" id="signupPasswordErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupConfirmPassword">Confirm Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupConfirmPassword" class="auth-input"
              placeholder="Re-enter password" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupConfirmPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="auth-field-error" id="signupConfirmErr"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="signupSubmitBtn">
          <span class="auth-btn-text">Create Free Account</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>

        <p class="auth-terms-text">
          By creating an account you agree to our
          <a href="terms-and-conditions.html" target="_blank">Terms</a> and
          <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.
        </p>
        <p class="auth-switch-text">
          Already have an account?
          <button type="button" class="auth-switch-btn" data-switch="login">Sign In →</button>
        </p>
      </form>

      <!-- ═══ FORGOT PASSWORD FORM ═══ -->
      <form class="auth-form" id="forgotForm" data-tab-form="forgot" novalidate style="display:none;">
        <div class="auth-forgot-back">
          <button type="button" class="auth-back-btn" id="backToLoginBtn">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7-7l-7 7 7 7"/>
            </svg>
            Back to Login
          </button>
        </div>
        <h3 class="auth-forgot-title">Reset Password</h3>
        <p class="auth-forgot-desc">Enter your email and we'll send you a reset link.</p>

        <div class="auth-form-group">
          <label class="auth-label" for="forgotEmail">Email Address</label>
          <input type="email" id="forgotEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="forgotEmailErr"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="forgotSubmitBtn">
          <span class="auth-btn-text">Send Reset Link</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>
      </form>

    </div>
  `,document.body.appendChild(e),Re(e)}function Te(){document.querySelectorAll(".nav-cta").forEach(e=>{if(e.querySelector(".auth-login-btn"))return;const t=document.createElement("button");t.type="button",t.className="btn auth-login-btn",t.style.cssText=["display:inline-flex","align-items:center","gap:0.4rem","font-size:0.82rem","padding:0.48rem 1rem","font-weight:700","background:var(--accent-blue,#2563EB)","color:#fff","border:none","border-radius:6px","cursor:pointer","white-space:nowrap"].join(";"),t.innerHTML=`
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      Login
    `,t.addEventListener("click",()=>H("login"));const n=document.createElement("div");n.className="auth-user-menu",n.style.display="none",n.innerHTML=`
      <button type="button" class="auth-avatar-btn" aria-label="Open user menu" aria-haspopup="true">
        <span class="auth-user-initials"></span>
        <span class="auth-user-name"></span>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="auth-dropdown">
        <a href="dashboard.html" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
          </svg>
          My Dashboard
        </a>
        <a href="dashboard.html#uploads" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          My Uploads
        </a>
        <a href="dashboard.html#saved" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
          Saved Resources
        </a>
        <a href="dashboard.html#settings" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Account Settings
        </a>
        <div class="auth-dropdown-divider"></div>
        <button type="button" class="auth-dropdown-item auth-logout-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    `;const o=e.querySelector(".mobile-toggle");o?(e.insertBefore(t,o),e.insertBefore(n,o)):(e.appendChild(t),e.appendChild(n));const a=n.querySelector(".auth-avatar-btn"),r=n.querySelector(".auth-dropdown"),c=n.querySelector(".auth-logout-item");a==null||a.addEventListener("click",s=>{s.stopPropagation(),r.classList.toggle("open")}),c==null||c.addEventListener("click",X),document.addEventListener("click",()=>r==null?void 0:r.classList.remove("open"))}),document.addEventListener("click",e=>{const t=e.target.closest(".trigger-auth-modal, .btn-auth-signin, .auth-login-btn");if(t&&!t.hasAttribute("data-auth-required")){e.preventDefault(),H("login");return}if(e.target.closest(".auth-logout-item")){e.preventDefault(),X();return}const o=e.target.closest(".auth-avatar-btn");if(o){e.preventDefault(),e.stopPropagation();const a=o.closest(".auth-user-menu"),r=a==null?void 0:a.querySelector(".auth-dropdown");r&&r.classList.toggle("open")}else document.querySelectorAll(".auth-dropdown.open").forEach(a=>a.classList.remove("open"))})}function H(e="login"){document.getElementById("authModal")||re(),document.getElementById("authModal").classList.add("active"),document.body.style.overflow="hidden",U(e),fe()}function R(){const e=document.getElementById("authModal");e&&(e.classList.remove("active"),document.body.style.overflow="",N(),ye())}function U(e){document.querySelectorAll(".auth-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===e)),document.querySelectorAll(".auth-form").forEach(t=>{t.dataset.tabForm==="forgot"?(t.style.display="none",t.classList.remove("active")):t.classList.toggle("active",t.dataset.tabForm===e)}),he(!0),N(),ye()}function ze(){document.querySelectorAll(".auth-tab").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".auth-form").forEach(t=>{t.classList.remove("active"),t.style.display="none"});const e=document.getElementById("forgotForm");e&&(e.style.display="",e.classList.add("active")),he(!1)}function he(e){const t=document.getElementById("googleSignInBtnContainer"),n=document.getElementById("authDivider"),o=e?"flex":"none";t&&(t.style.display=o),n&&(n.style.display=e?"":"none")}function Re(e){var n,o,a,r,c,s,g;(n=e.querySelector("#authModalClose"))==null||n.addEventListener("click",R),e.addEventListener("click",i=>{i.target===e&&R()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("active")&&R()}),e.querySelectorAll(".auth-tab").forEach(i=>i.addEventListener("click",()=>U(i.dataset.tab))),e.querySelectorAll(".auth-switch-btn").forEach(i=>i.addEventListener("click",()=>U(i.dataset.switch))),e.querySelectorAll(".auth-show-hide-btn").forEach(i=>{i.addEventListener("click",()=>{const u=document.getElementById(i.dataset.target);if(!u)return;const l=u.type==="password";u.type=l?"text":"password",i.querySelector(".eye-show").style.display=l?"none":"",i.querySelector(".eye-hide").style.display=l?"":"none"})}),(o=e.querySelector("#forgotPasswordBtn"))==null||o.addEventListener("click",ze),(a=e.querySelector("#backToLoginBtn"))==null||a.addEventListener("click",()=>U("login"));const t=e.querySelector("#signupPassword");t&&t.addEventListener("input",()=>Ge(t.value)),(r=e.querySelector("#authGoogleBtn"))==null||r.addEventListener("click",_triggerGoogleSignIn),(c=e.querySelector("#loginForm"))==null||c.addEventListener("submit",async i=>{var h;if(i.preventDefault(),!Oe())return;const u=document.getElementById("loginEmail").value.trim(),l=document.getElementById("loginPassword").value,p=(h=document.getElementById("rememberMe"))==null?void 0:h.checked;M("loginSubmitBtn",!0),N();try{const v=await De(u,l);p&&localStorage.setItem("eduyodha_remember_email",u),ee(v)}catch(v){B("error",G(v))}finally{M("loginSubmitBtn",!1)}}),(s=e.querySelector("#signupForm"))==null||s.addEventListener("submit",async i=>{if(i.preventDefault(),!je())return;const u=document.getElementById("signupName").value.trim(),l=document.getElementById("signupEmail").value.trim(),p=document.getElementById("signupPassword").value;M("signupSubmitBtn",!0),N();try{const h=await Fe(l,p,u);ee(h,!0)}catch(h){B("error",G(h))}finally{M("signupSubmitBtn",!1)}}),(g=e.querySelector("#forgotForm"))==null||g.addEventListener("submit",async i=>{i.preventDefault();const u=document.getElementById("forgotEmail").value.trim();if(!u||!/\S+@\S+\.\S+/.test(u)){I("forgotEmailErr","Please enter a valid email.");return}M("forgotSubmitBtn",!0),N();try{await _e(u),B("success","✉️ Reset link sent! Check your email inbox.")}catch(l){B("error",G(l))}finally{M("forgotSubmitBtn",!1)}})}function ee(e,t=!1){const n=W(e),o=t?`🎉 Welcome to EDU YODHA, ${n}!`:`👋 Welcome back, ${n}!`;B("success",o),setTimeout(()=>{R(),q()},900)}function se(){var e;if(!(typeof google>"u"||!((e=google.accounts)!=null&&e.id))&&!Z.startsWith("YOUR_"))try{console.log("[Google Auth] Active Client ID:",Z),console.log("[Google Auth] Current Origin (must match Google Cloud Authorized Origins):",window.location.origin),google.accounts.id.initialize({client_id:Z,callback:Ue,auto_select:!1,cancel_on_tap_outside:!0,itp_support:!0}),fe(),google.accounts.id.prompt()}catch(t){console.warn("[Google Auth Init]",t)}}function fe(){var t;const e=document.getElementById("googleSignInBtnContainer");if(e&&typeof google<"u"&&((t=google.accounts)!=null&&t.id))try{e.innerHTML="",google.accounts.id.renderButton(e,{type:"standard",shape:"rectangular",theme:"outline",text:"continue_with",size:"large",logo_alignment:"left",width:Math.min(380,window.innerWidth-60)})}catch(n){console.warn("[Google renderButton]",n)}}async function Ue(e){if(!(e!=null&&e.credential))return;const t=document.getElementById("authModal");(t==null?void 0:t.classList.contains("active"))||(t||re(),document.getElementById("authModal").classList.add("active"),document.body.style.overflow="hidden"),B("success","Verifying Google credentials…");try{const o=await $e(e.credential);ee(o)}catch(o){B("error",G(o))}}function qe(){document.addEventListener("click",e=>{const t=e.target.closest("[data-auth-required]");if(!t)return;e.preventDefault(),e.stopPropagation();const n=t.getAttribute("data-auth-required");H("login");const o=n==="internship"?"🔒 Please sign in first to apply for an internship.":"🔒 Please sign in first to upload notes.";setTimeout(()=>B("error",o),60)},!0)}function Oe(){var o,a;let e=!0;const t=(o=document.getElementById("loginEmail"))==null?void 0:o.value.trim(),n=(a=document.getElementById("loginPassword"))==null?void 0:a.value;return!t||!/\S+@\S+\.\S+/.test(t)?(I("loginEmailErr","Enter a valid email address."),e=!1):C("loginEmailErr"),!n||n.length<6?(I("loginPasswordErr","Password must be at least 6 characters."),e=!1):C("loginPasswordErr"),e}function je(){var r,c,s,g;let e=!0;const t=(r=document.getElementById("signupName"))==null?void 0:r.value.trim(),n=(c=document.getElementById("signupEmail"))==null?void 0:c.value.trim(),o=(s=document.getElementById("signupPassword"))==null?void 0:s.value,a=(g=document.getElementById("signupConfirmPassword"))==null?void 0:g.value;return!t||t.length<2?(I("signupNameErr","Please enter your full name."),e=!1):C("signupNameErr"),!n||!/\S+@\S+\.\S+/.test(n)?(I("signupEmailErr","Enter a valid email address."),e=!1):C("signupEmailErr"),!o||o.length<8?(I("signupPasswordErr","Password must be at least 8 characters."),e=!1):C("signupPasswordErr"),o!==a?(I("signupConfirmErr","Passwords do not match."),e=!1):C("signupConfirmErr"),e}function Ge(e){const t=document.getElementById("strengthFill");if(!t)return;let n=0;e.length>=8&&n++,/[A-Z]/.test(e)&&n++,/[0-9]/.test(e)&&n++,/[^A-Za-z0-9]/.test(e)&&n++;const o=["#EF4444","#F97316","#EAB308","#22C55E"],a=["25%","50%","75%","100%"];t.style.width=e.length?a[n-1]||"10%":"0",t.style.background=e.length?o[n-1]||"#EF4444":"transparent"}function B(e,t){const n=document.getElementById("authAlert");n&&(n.className=`auth-alert auth-alert-${e}`,n.textContent=t,n.style.display="block")}function N(){const e=document.getElementById("authAlert");e&&(e.style.display="none",e.textContent="")}function I(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function C(e){const t=document.getElementById(e);t&&(t.textContent="")}function ye(){["loginEmailErr","loginPasswordErr","signupNameErr","signupEmailErr","signupPasswordErr","signupConfirmErr","forgotEmailErr"].forEach(C)}function M(e,t){const n=document.getElementById(e);if(!n)return;n.disabled=t;const o=n.querySelector(".auth-btn-text"),a=n.querySelector(".auth-btn-spinner");o&&(o.style.display=t?"none":""),a&&(a.style.display=t?"inline-flex":"none")}function G(e){const t=(e==null?void 0:e.message)||"";return t.includes("Incorrect email")||t.includes("invalid credentials")?"Incorrect email or password. Please try again.":t.includes("already exists")||t.includes("already registered")?"An account with this email already exists. Please sign in instead.":t.includes("Failed to fetch")||t.includes("NetworkError")||t.includes("ERR_CONNECTION")?"⚠️ Cannot reach the server. Make sure the backend is running (cd server → npm start).":t.includes("network")||t.includes("fetch")?"Connection error. Please check your internet.":t.includes("Google")?"Google Sign-In failed. Please try again or use email login.":t.includes("not configured")||t.includes("503")?"Auth service is not configured. Contact support.":t.includes("not verified")?"Please verify your email address first.":t||"Something went wrong. Please try again."}function le(){if(document.querySelector('script[src*="accounts.google.com/gsi"]'))typeof google<"u"&&se();else{const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.onload=()=>se(),document.head.appendChild(o)}re(),Te(),q(),qe();const e=localStorage.getItem("eduyodha_remember_email");if(e){const o=document.getElementById("loginEmail");o&&(o.value=e)}const n=new URLSearchParams(window.location.search).get("token");n&&fetch(`${ne}/api/auth/me`,{headers:{Authorization:`Bearer ${n}`}}).then(o=>o.json()).then(o=>{if(o.user){Y(n,o.user),q();const a=window.location.pathname+window.location.hash;window.history.replaceState({},document.title,a)}}).catch(()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le):le();window.EduYodhaAuth={isLoggedIn:ue,getCurrentUser:me,getToken:ge,getUserDisplayName:W,getUserInitials:pe,logout:X,openAuthModal:H,closeAuthModal:R,switchAuthTab:U,updateNavbarAuthState:q,showAuthAlert:B,clearAuthAlert:N};
