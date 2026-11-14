/* Portfolio editor + interactions. Data is saved in this browser's localStorage.
   For public deployment, edit the content here or use the in-page editor. */
const STORAGE_KEY = "jonardPortfolio_draft_v2", OLD_KEY = "jonardPortfolio_v1";
/* Owner lock: SHA-256 of your passcode. Open the site with #owner at the end of the URL to unlock editing. */
const OWNER_HASH = "df3ffa8eb717a02c1d44885aa51e049a3fff66a28c7293e821e1ec13241a41a5";
const isOwner = sessionStorage.getItem("owner")==="1";
if(isOwner) document.body.classList.add("is-owner");
const starterData = {
  name: "Jonard C. Ursal",
  hero: "I’m Jonard Ursal, a Grade 7 adviser and computer teacher at DLSU Integrated School in the Philippines. I like making small digital tools that make lessons easier to follow.",
  portrait: "assets/profile1.webp",
  experience: [
    {id:"exp1",type:"Experience",title:"Grade 7 Adviser & Computer Teacher",org:"DLSU Integrated School",dates:"Present",location:"Philippines",desc:"Teaching computer-related topics, supporting students’ learning, preparing digital learning materials, and guiding learners through classroom activities."},
    {id:"exp2",type:"Education",title:"BS Technical Vocational Teacher Education — Computer Programming",org:"Technological University of the Philippines",dates:"2019 – 2023",location:"Philippines",desc:"Bachelor’s degree focused on technical-vocational teacher education and computer programming."},
    {id:"exp3",type:"Education",title:"Technical-Vocational-Livelihood (TVL), Information and Communications Technology – Computer System Servicing",org:"Dasmariñas East Integrated Senior High School",dates:"2017 – 2019",location:"Philippines",desc:""}
  ],
  work: [
    {id:"work1",type:"project",title:"Web Development Practice",category:"web-dev",desc:"HTML, CSS and JavaScript exercises from my programming studies and my own experiments.",media:"",url:"#"},
    {id:"work2",type:"project",title:"Live Demo Website",category:"web-dev",desc:"A placeholder for a live demo site. Replace this card with a website you have built and link to its GitHub repository or live demo.",media:"",url:"#"},
    {id:"work3",type:"evidence",title:"Robotics Build",category:"robotics",desc:"A placeholder for a robotics build. Add a photo and a short description of the project.",media:"",url:"#"},
    {id:"work4",type:"video",title:"Robotics Demo",category:"robotics",desc:"A placeholder for a robotics demonstration. Add a video thumbnail and a link to the demo.",media:"",url:"#"},
    {id:"work7",type:"project",title:"Morse Code Circuit",category:"robotics",desc:"An interactive Tinkercad circuit project for exploring Morse code.",media:"assets/morse-code-circuit.png",url:"https://www.tinkercad.com/things/kGWPJFTlONv?sharecode=enjg8jVyTOQl0Luuheq6UuUMNp_0YrXOSJVc7Q5v1fg"},
    {id:"work8",type:"project",title:"Remote-Controlled Gate Circuit",category:"robotics",desc:"A Tinkercad circuit project for a remote-controlled gate.",media:"assets/remote-controlled-gate.png",url:"https://www.tinkercad.com/things/b2mlFYRyhSU?sharecode=b3135X_rp7hTGj3ertf9Whl4sQaKd1RxPPrT6CXCkpc"},
    {id:"work9",type:"project",title:"Water Level and Temperature Alarm",category:"robotics",desc:"A Tinkercad circuit project for a water-level and temperature alarm.",media:"https://csg.us-east-1.prd.tinkercad.com/things/gNqwAQXChZk/t725.png?rev=1794375961293000000&s=&v=1&type=circuits&sharecode=NZu31M9fI2PZlGS5rJosMZkIVuOTwFrE_qYySGip0L4",url:"https://www.tinkercad.com/things/gNqwAQXChZk?sharecode=NZu31M9fI2PZlGS5rJosMZkIVuOTwFrE_qYySGip0L4"},
    {id:"work10",type:"project",title:"Multiple Buttons and LEDs",category:"robotics",desc:"A Tinkercad circuit project featuring multiple buttons and LEDs.",media:"https://csg.us-east-1.prd.tinkercad.com/things/8YCzTTLGrNu/t725.png?rev=1794375998278000000&s=&v=1&type=circuits&sharecode=HrmFT1_18tYcM0v4VEqvYcZaG5S5T9KPCq0WjVkQAVI",url:"https://www.tinkercad.com/things/8YCzTTLGrNu?sharecode=HrmFT1_18tYcM0v4VEqvYcZaG5S5T9KPCq0WjVkQAVI"},
    {id:"work11",type:"project",title:"Sensor Project",category:"robotics",desc:"A Tinkercad circuit project exploring sensors.",media:"https://csg.us-east-1.prd.tinkercad.com/things/k06FoPHWwJ5/t725.png?rev=1794382787842000000&s=&v=1&type=circuits&sharecode=xunVFzg_TJiAI2esJqc3J4BjPCllbqlJw7BxbvE3Xvw",url:"https://www.tinkercad.com/things/k06FoPHWwJ5?sharecode=xunVFzg_TJiAI2esJqc3J4BjPCllbqlJw7BxbvE3Xvw"},
    {id:"work5",type:"project",title:"Interactive Learning Materials",category:"teaching",desc:"Slides, worksheets and hands-on activities I prepare for my Grade 7 computer classes. Replace the link with your public Google Drive folder.",media:"",url:"#"},
    {id:"work6",type:"video",title:"Lesson Activity Recording",category:"teaching",desc:"A placeholder for a lesson activity or screen recording. Replace it with a link to your resource.",media:"",url:"#"}
  ],
  skills:["Teaching & Learning Design","HTML & CSS","JavaScript Fundamentals","Computer Programming","Digital Learning Tools","Student Support","Problem Solving","AI-Assisted Workflows"],
  email:"jonardursal@gmail.com", linkedin:"", website:"", phone:"", location:"Philippines", formUrl:"https://formsubmit.co/ajax/jonardursal@gmail.com"
};
let data = loadData();
let activeFilter = "all", portfolioTransition;
const certificates = [
  {id:"cert-ai-webinar",title:"AI in Education Webinar: Transforming Philippine Classrooms Through AI-Powered Teaching",cat:"Technology",file:"assets/certificates/AI Webinar 1 Certificate_Jonard C. Ursal.pdf"},
  {id:"cert-apple-teacher",title:"Apple Teacher Certificate of Recognition",issuer:"Apple",cat:"Technology",file:"assets/certificates/AppleTeacherCertificate.pdf"},
  {id:"cert-jonard-1",title:"GenAI in Language Assessment and Feedback Workshop",cat:"Technology",file:"assets/certificates/Cert - Jonard C (1).pdf"},
  {id:"cert-jonard",title:"Teaching in the AI Era: Evolving Assessment Models for a Human-Centric Experience",cat:"Technology",file:"assets/certificates/Cert - Jonard C.pdf"},
  {id:"cert-lingap-interview",title:"Certificate of Appreciation — LINGAP Batch 20 Interview Panelist",cat:"Recognition",file:"assets/certificates/Certificate for Sir Jonard Ursal - LINGAP Batch 20 Interview (1).pdf"},
  {id:"cert-legal-insights",title:"Building Educator Capacity: Legal Insights for Safe and Inclusive Schools",cat:"Professional Development",file:"assets/certificates/Certificate of Participation _ Building Educator Capacity_ Legal Insights for Safe and Inclusive Schools.pdf"},
  {id:"cert-google-educator",title:"Google Certified Educator Level 1",issuer:"Google for Education",cat:"Technology",file:"assets/certificates/Google educator.pdf"},
  {id:"cert-ursal",title:"Mastering Excel Formulas, Functions and Analysis for Accountants and Bookkeepers",cat:"Technology",file:"assets/certificates/JONARD C. URSAL.pdf"},
  {id:"cert-jonard-ursal",title:"Safety and Response in Emergency Situations for Teaching and Learning",cat:"Professional Development",file:"assets/certificates/Jonard_Ursal_Certificate.pdf"},
  {id:"cert-lingap-saep",title:"Certificate of Appreciation — LINGAP Summer Academic Enrichment Program Teacher-Volunteer",cat:"Recognition",file:"assets/certificates/LMO-LINGAP SAEP Certificate for Sir Jonard Ursal (1).pdf"},
  {id:"cert-new-mexico-license",title:"New Mexico Level One Provisional 7–12 Secondary Vocational Technical Teaching License",cat:"Professional Development",file:"assets/certificates/New Mexico License.pdf"},
  {id:"cert-sir-jonard",title:"Certificate of Appreciation — IGNITE Academic Festival 2026 Judge",cat:"Recognition",file:"assets/certificates/Sir Jonard.pdf"},
  {id:"cert-udemy",title:"100 Days of Code: The Complete Python Pro Bootcamp",issuer:"Udemy",cat:"Technology",file:"assets/certificates/Udemy.pdf"},
  {id:"cert-participation-1",title:"INSET: Mental Health First Aid Capacity-Building Sessions for Teachers",cat:"Professional Development",file:"assets/certificates/[Certificate of Participation] Ursal, Jonard C. (1).pdf"},
  {id:"cert-participation-2",title:"INSET: Creating the Homeroom Adviser Program",cat:"Leadership",file:"assets/certificates/[Certificate of Participation] Ursal, Jonard C..pdf"},
  {id:"cert-participation-3",title:"Lasallian T.E.A.L.: Understanding and Accommodating Neurodiversity in the Classroom",cat:"Professional Development",file:"assets/certificates/[Certificate of Participation] Ursal, Jonard Corsiles.pdf"},
  {id:"cert-lasallian-teal",title:"Lasallian T.E.A.L.: Vision, Belonging, and Transitions — A Focus on Safety and Well-being",cat:"Professional Development",file:"assets/certificates/__Full Name (Last, First, Middle Name)___[Certificate of Participation] Lasallian T.E.A.L.pdf"}
];
let certificateCategory = "All", certificateTerm = "", visibleCertificates = [], currentCertificate = -1;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
function portraitSource(value="") { return /(?:profile\.jpg|profile1\.png)$/i.test(value) ? starterData.portrait : value || starterData.portrait; }
function loadData() {
  try {
    const saved = isOwner && (localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_KEY));
    const loaded = saved ? {...structuredClone(starterData), ...JSON.parse(saved)} : structuredClone(starterData);
    loaded.portrait = portraitSource(loaded.portrait);
    loaded.email ||= starterData.email;
    loaded.formUrl ||= starterData.formUrl;
    return loaded;
  }
  catch(e) { return structuredClone(starterData); }
}
function persist(message="Draft saved in this browser.") {
  if(!isOwner) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    $("#saveStatus").textContent = "Saved just now";
    if(message) toast(message);
  } catch(e) {
    $("#saveStatus").textContent = "Storage limit reached";
    toast("This file is too large for browser storage. Try a smaller image or video.");
  }
}
function toast(message) {
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),2800);
}
function safeText(value="") { return String(value ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function safeUrl(url="") {
  try { const u=new URL(url, location.href); return ["http:","https:","mailto:"].includes(u.protocol) ? u.href : ""; } catch(e) { return ""; }
}
function renderAll() {
  document.title = `${data.name || "Personal Portfolio"} | Personal Portfolio`;
  $$(".brand span:last-child").forEach(el=>el.innerHTML=safeText(data.name || "Your Name").replace(/^(.+?)\s+([^ ]+)$/, "$1 <b>$2</b>"));
  $("#heroIntro").textContent=data.hero || "";
  $("#heroPortrait").src=portraitSource(data.portrait);
  renderExperience(); renderWork(); renderSkills(); renderSocials();
  renderContact();
  renderCertificates();
  $("#year").textContent=new Date().getFullYear();
}
function certificateEsc(value="") { return safeText(value); }
function certificatePaper(c) { return `<div class="certificate-paper certificate-pdf-preview"><img src="assets/certificates/previews/${certificateEsc(c.id)}.webp" alt="Preview of ${certificateEsc(c.title)}" loading="lazy" decoding="async"></div>`; }
function certificateDocument(c) { return `<div class="certificate-paper certificate-document"><iframe src="${certificateEsc(c.file)}" title="${certificateEsc(c.title)}"></iframe></div>`; }
function renderCertificateChips() {
  const categories=["All","Professional Development","Recognition","Leadership","Technology"];
  if(!categories.includes(certificateCategory)) certificateCategory="All";
  $("#certificateChips").innerHTML=categories.map(c=>`<button class="certificate-chip" type="button" data-certificate-category="${certificateEsc(c)}" aria-pressed="${c===certificateCategory}">${certificateEsc(c)}</button>`).join("");
}
function updateCertificateProgress() {
  const wall=$("#certificateWall"), max=wall.scrollWidth-wall.clientWidth;
  $("#certificateProgress").style.width=(max>0?12+(wall.scrollLeft/max)*88:100)+"%";
  $("#certificatesBack").disabled=wall.scrollLeft<4; $("#certificatesNext").disabled=max-wall.scrollLeft<4;
}
function renderCertificates() {
  const query=certificateTerm.toLowerCase();
  visibleCertificates=certificates.filter(c=>(certificateCategory==="All"||c.cat===certificateCategory)&&(!query||`${c.title} ${c.issuer} ${c.cred||""}`.toLowerCase().includes(query)));
  $("#certificateWall").innerHTML=visibleCertificates.length ? visibleCertificates.map((c,i)=>`<article class="certificate-frame" style="animation-delay:${Math.min(i,8)*60}ms" data-certificate-index="${i}" tabindex="0" role="button" aria-label="Open ${certificateEsc(c.title)}"><span class="certificate-year">${certificateEsc(c.cat)}</span>${certificatePaper(c)}<div class="certificate-meta"><h3>${certificateEsc(c.title)}</h3><p>${certificateEsc(c.issuer||c.cat)}</p></div></article>`).join("") : `<div class="certificate-empty">No certificates match. Clear the search.</div>`;
  const issuers=new Set(certificates.map(c=>c.issuer).filter(Boolean)), cats=new Set(certificates.map(c=>c.cat).filter(Boolean));
  $("#certificateCount").textContent=certificates.length; $("#issuerCount").textContent=issuers.size; $("#categoryCount").textContent=cats.size;
  renderCertificateChips(); $("#certificateWall").scrollLeft=0; updateCertificateProgress();
}
function openCertificate(index) {
  currentCertificate=index; const c=visibleCertificates[index]; if(!c)return;
  $("#certificateDialog").innerHTML=`${certificateDocument(c)}<div class="certificate-info"><h2>${certificateEsc(c.title)}</h2><dl>${c.issuer?`<dt>Issuer</dt><dd>${certificateEsc(c.issuer)}</dd>`:""}<dt>Category</dt><dd>${certificateEsc(c.cat)}</dd></dl><div class="certificate-actions"><a class="button button-ghost" href="${certificateEsc(c.file)}" target="_blank" rel="noopener">Open PDF</a><button class="button button-ghost" type="button" data-certificate-nav="-1">Previous</button><button class="button button-ghost" type="button" data-certificate-nav="1">Next</button><button class="button button-primary" type="button" data-close-certificate>Close</button></div></div>`;
  $("#certificateViewer").classList.add("open");
}
function closeCertificateDialogs() { $("#certificateViewer").classList.remove("open"); }
function renderExperience() {
  const root=$("#experienceList");
  if(!data.experience.length) { root.innerHTML='<p class="body-copy">Add your experience, education, training, or volunteer work using the portfolio editor.</p>'; }
  else root.innerHTML=data.experience.map((e,i)=>`<article class="timeline-entry" style="animation-delay:${i*.08}s"><div class="timeline-date">${safeText(e.dates || "Dates not specified")}<br><span style="color:var(--muted-dark)">${safeText(e.location || "")}</span></div><div><span class="timeline-type">${safeText(e.type)}</span><h3>${safeText(e.title)}</h3><div class="timeline-org">${safeText(e.org)}</div><p>${safeText(e.desc)}</p></div></article>`).join("");
  $("#experienceManage").innerHTML=data.experience.map(e=>`<div class="manage-item"><div><strong>${safeText(e.title)}</strong><small>${safeText(e.org)}</small></div><button class="delete-item" data-delete-exp="${safeText(e.id)}">Remove</button></div>`).join("");
}
function renderWork() {
  const root=$("#portfolioGrid"), entries=data.work.filter(w=>activeFilter==="all" || topicCategory(w)===activeFilter);
  $("#emptyPortfolio").hidden=entries.length>0;
  root.innerHTML=entries.map((w,i)=>{
    const category=topicCategory(w);
    const categoryLabel={"web-dev":"Web Dev",robotics:"Robotics",teaching:"Teaching"}[category];
    const badge=w.type==="evidence"?"PHOTO":w.type==="video"?"VIDEO":"PROJECT";
    const image=w.media && w.mediaKind!=="video" ? ` src="${safeText(w.media)}"` : "";
    const url=w.url==="#" ? "#" : safeUrl(w.url) || "#";
    return `<article class="work-card" data-category="${category}" style="animation-delay:${i*.08}s"><div class="work-media${image?" has-image":""}">${image?"":"<!-- REPLACE IMAGE -->"}<img class="work-thumbnail"${image} alt="${safeText(w.title)} thumbnail" loading="lazy"><div class="media-placeholder" aria-hidden="true"></div><span class="media-badge">${badge}</span></div><div class="work-info"><span class="work-category">${categoryLabel}</span><h3>${safeText(w.title)}</h3><p>${safeText(w.desc)}</p>${url==="#"?"<!-- REPLACE LINK -->":""}<a class="work-link" href="${url}" target="_blank" rel="noopener noreferrer">Open link ↗</a></div></article>`;
  }).join("");
  root.querySelectorAll(".work-thumbnail[src]").forEach(image=>image.addEventListener("error",()=>{
    image.parentElement.classList.remove("has-image");
    image.removeAttribute("src");
  },{once:true}));
  $("#workManage").innerHTML=data.work.map(w=>`<div class="manage-item"><div><strong>${safeText(w.title)}</strong><small>${safeText(w.type)} · ${safeText({"web-dev":"Web Dev",robotics:"Robotics",teaching:"Teaching"}[topicCategory(w)])}</small></div><button class="delete-item" data-delete-work="${safeText(w.id)}">Remove</button></div>`).join("");
}
function topicCategory(work) {
  const category=String(work.category || work.topic || "").toLowerCase();
  if(["web-dev","robotics","teaching"].includes(category)) return category;
  if(category.includes("robot")) return "robotics";
  if(category.includes("web") || category.includes("program")) return "web-dev";
  return "teaching";
}
function renderSkills() {
  $("#skillTags").innerHTML=data.skills.map((s,i)=>`<span class="skill-tag" style="--i:${i}">${safeText(s.trim())}</span>`).join("");
}
function renderContact() {
  const rows=[];
  if(data.email) rows.push(`<li><small>Email</small><a href="mailto:${safeText(data.email)}">${safeText(data.email)}</a></li>`);
  if(data.phone) rows.push(`<li><small>Phone</small><a href="tel:${safeText(data.phone.replace(/[^+\d]/g,""))}">${safeText(data.phone)}</a></li>`);
  if(data.location) rows.push(`<li><small>Location</small><span>${safeText(data.location)}</span></li>`);
  $("#contactDetails").innerHTML=rows.join("");
}
function renderSocials() {
  const links=[];
  if(data.linkedin) links.push(`<a href="${safeUrl(data.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`);
  if(data.website) links.push(`<a href="${safeUrl(data.website)}" target="_blank" rel="noopener noreferrer">GitHub / Website ↗</a>`);
  $("#socialLinks").innerHTML=links.join("");
}
function openEditor() {
  $("#editorBackdrop").classList.add("open"); $("#editorBackdrop").setAttribute("aria-hidden","false"); document.body.classList.add("editor-open");
  fillEditor(); $("#closeEditor").focus();
}
function closeEditor() {
  $("#editorBackdrop").classList.remove("open"); $("#editorBackdrop").setAttribute("aria-hidden","true"); document.body.classList.remove("editor-open");
}
function fillEditor() {
  $("#editName").value=data.name||""; $("#editHero").value=data.hero||"";
  $("#editSkills").value=data.skills.join(", "); $("#editEmail").value=data.email||""; $("#editLinkedin").value=data.linkedin||""; $("#editWebsite").value=data.website||""; $("#editPhone").value=data.phone||""; $("#editLocation").value=data.location||""; $("#editForm").value=data.formUrl||"";
  renderExperience(); renderWork();
}
function setTab(id) {
  $$(".editor-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===id));
  $$(".editor-page").forEach(p=>p.classList.toggle("active",p.id===id));
  $(".editor-body").scrollTop=0;
}
function fileToDataUrl(file) {
  return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
}
if(isOwner){ const b=document.createElement("button"); b.className="nav-edit"; b.id="openEditor"; b.innerHTML="Edit <span>↗</span>"; $("#mainNav").append(b); b.addEventListener("click",openEditor); }
$("#closeEditor").addEventListener("click",closeEditor);
$("#doneEditing").addEventListener("click",closeEditor);
$("#editorBackdrop").addEventListener("click",e=>{if(e.target===$("#editorBackdrop"))closeEditor();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeEditor();});
$$(".editor-tab").forEach(t=>t.addEventListener("click",()=>setTab(t.dataset.tab)));
$("#saveProfile").addEventListener("click",async()=>{
  data.name=$("#editName").value.trim()||"Your Name"; data.hero=$("#editHero").value.trim();
  const file=$("#editPortrait").files[0];
  if(file) { if(file.size>1.8*1024*1024) { toast("Please choose a portrait under 1.8 MB for reliable browser storage."); return; } data.portrait=await fileToDataUrl(file); }
  persist("Profile updated."); renderAll();
});
$("#experienceForm").addEventListener("submit",e=>{
  e.preventDefault();
  data.experience.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),type:$("#expType").value,title:$("#expTitle").value.trim(),org:$("#expOrg").value.trim(),dates:$("#expDates").value.trim(),location:$("#expLocation").value.trim(),desc:$("#expDesc").value.trim()});
  e.target.reset(); persist("Experience added."); renderAll();
});
$("#workForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const file=$("#workFile").files[0], url=$("#workUrl").value.trim();
  let media="", mediaKind="";
  if(file) {
    if(file.size>3*1024*1024) { toast("Please use a file under 3 MB. For larger media, use a hosted link."); return; }
    media=await fileToDataUrl(file); mediaKind=file.type.startsWith("video/")?"video":"image";
  } else if(url && $("#workType").value==="video" && /youtube\.com|youtu\.be|vimeo\.com/i.test(url)) {
    // External video links are stored as links; the card links out rather than embedding unknown providers.
  }
  data.work.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),type:$("#workType").value,title:$("#workTitle").value.trim(),category:$("#workCategory").value,desc:$("#workDesc").value.trim(),media,mediaKind,url:url || "#"});
  e.target.reset(); persist("Work added to your portfolio."); renderAll();
});
$("#saveContact").addEventListener("click",()=>{
  data.skills=$("#editSkills").value.split(",").map(s=>s.trim()).filter(Boolean);
  data.email=$("#editEmail").value.trim()||starterData.email; data.linkedin=$("#editLinkedin").value.trim(); data.website=$("#editWebsite").value.trim(); data.phone=$("#editPhone").value.trim(); data.location=$("#editLocation").value.trim(); data.formUrl=$("#editForm").value.trim()||starterData.formUrl;
  persist("Skills and contact details updated."); renderAll();
});
document.addEventListener("click",e=>{
  const exp=e.target.closest("[data-delete-exp]"), work=e.target.closest("[data-delete-work]");
  if(exp) { data.experience=data.experience.filter(x=>x.id!==exp.dataset.deleteExp); persist("Experience entry removed."); renderAll(); }
  if(work) { data.work=data.work.filter(x=>x.id!==work.dataset.deleteWork); persist("Portfolio item removed."); renderAll(); }
});
$("#portfolioFilters").addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]"); if(!btn)return;
  activeFilter=btn.dataset.filter;
  $$("#portfolioFilters .filter-button").forEach(b=>{
    const selected=b===btn;
    b.classList.toggle("active",selected);
    b.setAttribute("aria-pressed",String(selected));
  });
  const grid=$("#portfolioGrid");
  grid.classList.add("is-changing");
  clearTimeout(portfolioTransition);
  portfolioTransition=setTimeout(()=>{
    renderWork();
    requestAnimationFrame(()=>grid.classList.remove("is-changing"));
  },140);
});
$("#exportData").addEventListener("click",()=>{
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}), url=URL.createObjectURL(blob), a=document.createElement("a");
  a.href=url; a.download="content.json"; a.click(); URL.revokeObjectURL(url); toast("content.json exported. Replace it in your site folder to publish.");
});
$("#importData").addEventListener("change",async e=>{
  const file=e.target.files[0]; if(!file)return;
  try { const imported=JSON.parse(await file.text()); if(!imported || typeof imported!=="object" || !Array.isArray(imported.work)||!Array.isArray(imported.experience)) throw new Error("Invalid backup");
    data={...structuredClone(starterData),...imported};
    data.email ||= starterData.email;
    data.formUrl ||= starterData.formUrl;
    persist("Portfolio backup imported."); renderAll(); fillEditor();
  } catch(err) { toast("Could not import that file. Choose a valid portfolio JSON backup."); }
  e.target.value="";
});
$("#resetData").addEventListener("click",()=>{
  if(confirm("Reset all portfolio content in this browser to the starter content? This cannot be undone unless you exported a backup.")) {
    data=structuredClone(starterData); localStorage.removeItem(STORAGE_KEY); renderAll(); fillEditor(); toast("Starter content restored.");
  }
});
$("#certificateChips").addEventListener("click",e=>{const button=e.target.closest("[data-certificate-category]");if(button){certificateCategory=button.dataset.certificateCategory;renderCertificates();}});
$("#certificateSearch").addEventListener("input",e=>{certificateTerm=e.target.value;renderCertificates();});
$("#certificateViewer").addEventListener("click",e=>{if(e.target===e.currentTarget)closeCertificateDialogs();});
$("#certificateWall").addEventListener("click",e=>{
  const frame=e.target.closest("[data-certificate-index]");if(frame)openCertificate(Number(frame.dataset.certificateIndex));
});
$("#certificateWall").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-certificate-index]")){e.preventDefault();openCertificate(Number(e.target.dataset.certificateIndex));}});
$("#certificateDialog").addEventListener("click",e=>{const button=e.target.closest("button");if(!button)return;if(button.hasAttribute("data-close-certificate"))closeCertificateDialogs();else if(button.dataset.certificateNav)openCertificate((currentCertificate+Number(button.dataset.certificateNav)+visibleCertificates.length)%visibleCertificates.length);});
$("#certificatesBack").addEventListener("click",()=>$("#certificateWall").scrollBy({left:-Math.max(280,$("#certificateWall").clientWidth*.8),behavior:"auto"}));
$("#certificatesNext").addEventListener("click",()=>$("#certificateWall").scrollBy({left:Math.max(280,$("#certificateWall").clientWidth*.8),behavior:"auto"}));
$("#certificateWall").addEventListener("scroll",updateCertificateProgress,{passive:true});
addEventListener("resize",updateCertificateProgress);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCertificateDialogs();if($("#certificateViewer").classList.contains("open")&&visibleCertificates.length){if(e.key==="ArrowRight")openCertificate((currentCertificate+1)%visibleCertificates.length);if(e.key==="ArrowLeft")openCertificate((currentCertificate-1+visibleCertificates.length)%visibleCertificates.length);}});
$("#menuToggle").addEventListener("click",()=>{
  const nav=$("#mainNav"), opened=nav.classList.toggle("open"); $("#menuToggle").setAttribute("aria-expanded",String(opened));
});
$$(".nav-link").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));

// Scroll-triggered entrance animations and active navigation.
const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}
}),{threshold:.12});
$$(".reveal").forEach(el=>revealObserver.observe(el));
const sectionObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){const id=entry.target.id; $$(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${id}`));}
}),{rootMargin:"-30% 0px -60% 0px"});
$$("main section[id]").forEach(s=>sectionObserver.observe(s));
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  $("#scrollProgress").style.width=(max>0?window.scrollY/max*100:0)+"%";
},{passive:true});
renderAll();

// ---- public content, owner unlock, contact form ----
fetch("content.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{
  if(j && !(isOwner && localStorage.getItem(STORAGE_KEY))) {
    data={...structuredClone(starterData),...j};
    data.email ||= starterData.email;
    data.formUrl ||= starterData.formUrl;
    renderAll();
  }
}).catch(()=>{});
async function sha(t){ const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join(""); }
async function tryOwner(){
  if(location.hash!=="#owner") return;
  const p=prompt("Owner passcode"); history.replaceState(null,"",location.pathname+location.search);
  if(p===null) return;
  try { if(await sha(p)===OWNER_HASH){ sessionStorage.setItem("owner","1"); location.reload(); } else toast("Incorrect passcode."); } catch(e){ toast("Unlock needs https or localhost."); }
}
addEventListener("hashchange",tryOwner); tryOwner();
$("#contactForm").addEventListener("submit",async e=>{
  e.preventDefault(); const f=e.target, fd=new FormData(f), st=$("#formStatus"), btn=$("button",f), lab=$("b",btn);
  if(fd.get("website_hp")) return;
  if(data.formUrl){
    fd.set("_subject",fd.get("subject"));
    fd.set("_replyto",fd.get("email"));
    btn.disabled=true; lab.textContent="Sending…";
    try {
      const r=await fetch(data.formUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(fd))});
      const result=await r.json();
      if(!r.ok || result.success==="false") throw new Error(result.message || "Form submission failed");
      f.reset(); st.textContent="Thank you. Your message was sent.";
    }
    catch(_) { st.textContent="Something went wrong. Please try again or email me directly."; }
    btn.disabled=false; lab.textContent="Send message";
  } else if(data.email){
    location.href=`mailto:${data.email}?subject=${encodeURIComponent(fd.get("subject"))}&body=${encodeURIComponent(fd.get("message")+"\n\n"+fd.get("name")+" ("+fd.get("email")+")")}`;
    st.textContent="Opening your email app…";
  } else st.textContent="Contact details are being set up. Please check back soon.";
});

// ---- effects ----
const sawIntro=sessionStorage.getItem("intro");
addEventListener("load",()=>{
  const reveal=()=>{document.body.classList.add("loaded");sessionStorage.setItem("intro","1");};
  if(sawIntro) reveal();
  else requestAnimationFrame(()=>requestAnimationFrame(reveal));
});
const fine=matchMedia("(pointer:fine)").matches, still=matchMedia("(prefers-reduced-motion:reduce)").matches;
if(fine && !still){
  const cur=$("#cursor"); document.body.classList.add("has-cursor");
  addEventListener("mousemove",e=>{cur.classList.add("on");cur.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
    cur.classList.toggle("big",!!e.target.closest("a,button,.work-card,.skill-tag"));},{passive:true});
  document.addEventListener("mousemove",e=>{ const m=e.target.closest(".mag");
    $$(".mag").forEach(b=>{ if(b!==m) b.style.transform=""; });
    if(m){ const r=m.getBoundingClientRect(); m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`; } });
  const g=$("#portfolioGrid");
  g.addEventListener("mousemove",e=>{ const c=e.target.closest(".work-card"); if(!c) return; const r=c.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    c.style.setProperty("--mx",x+"px"); c.style.setProperty("--my",y+"px");
    c.style.transform=`perspective(800px) rotateX(${(.5-y/r.height)*6}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-6px)`; });
  g.addEventListener("mouseout",e=>{ const c=e.target.closest(".work-card"); if(c) c.style.transform=""; });
}
addEventListener("scroll",()=>{ const t=$("#experienceList"), r=t.getBoundingClientRect();
  t.style.setProperty("--p",Math.min(1,Math.max(0,(innerHeight*.7-r.top)/r.height))); },{passive:true});
