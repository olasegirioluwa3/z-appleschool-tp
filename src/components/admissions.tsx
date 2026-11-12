"use client";
import Link from "next/link";
import {useState,FormEvent} from "react";
import {Check,Copy,ShieldCheck,Landmark,ArrowRight,CalendarDays,Clock,FileText,GraduationCap,MapPin,Phone,Mail,BadgeCheck} from "lucide-react";

const FEE="15,000";
const BANK={name:"Apple School Ltd",number:"0123456789",bank:"Access Bank",ref:"Student’s full name"};
const divisions=["Nursery","Primary","Junior Secondary","Senior Secondary"];
const tourTimes=["9:00am","11:00am","1:00pm","3:00pm"];

const before=[
 "Child’s passport photograph (white background)",
 "Birth certificate or international passport data page",
 "School reports for the last two academic years",
 "Transfer certificate, where applicable",
 "Contact details of the current school (for a confidential report)",
 "₦15,000 non-refundable application fee",
];
const steps=[
 ["Choose a school tour or send an enquiry","Visit us in Lekki, meet the admissions team and see the learning spaces before you decide."],
 ["Pay the ₦15,000 application fee","Transfer to the school account and confirm payment. The online application form unlocks immediately."],
 ["Complete the online application","Tell us about your child, your family and upload the supporting documents. You can save and return before submitting."],
 ["Assessment and family interview","Your child spends a short session with the class teacher while we meet you to understand your expectations."],
 ["Offer and enrolment","Successful families receive an offer letter, a fee schedule and a joining pack ahead of the August intake."],
];
const requirements=[
 "Completed online application form (or the physical form collected from the school office)",
 "Receipt for payment of the ₦15,000 application fee",
 "Birth certificate or passport data page of the applicant",
 "Two recent passport photographs of the child",
 "School reports for the last two academic years",
 "Transfer certificate from the previous school, where applicable",
 "Immunisation record for Nursery and Primary applicants",
 "Any educational or psychological assessment reports, where applicable",
];
const placement=[
 ["Nursery 1","2 – 3 years","Playgroup entry"],
 ["Nursery 2","3 – 4 years","Early years"],
 ["Primary 1 – 6","5 – 11 years","Lower and upper primary"],
 ["Junior Secondary 1 – 3","11 – 14 years","JSS 1 – JSS 3"],
 ["Senior Secondary 1 – 3","14 – 17 years","SSS 1 – SSS 3"],
];
const faqs=[
 ["When does the academic year start?","Our academic year runs from early September to late July, across three terms. Applications open twelve months ahead of entry."],
 ["Is there an entrance assessment?","Yes. Applicants from Primary 2 upwards complete a short assessment in literacy and numeracy so we can place your child correctly."],
 ["Can my child join mid-term?","Where places are available, we admit mid-term. Our admissions team will agree a start date that allows your child to settle in properly."],
 ["Is the application fee refundable?","The ₦15,000 application fee is non-refundable. It covers processing, the assessment session and the family interview."],
 ["Do you offer sibling priority?","Siblings of current students are given priority in the admissions review, subject to available places."],
];

function copyText(text:string,done:(ok:boolean)=>void){
  try{
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(text).then(()=>done(true)).catch(()=>done(false));
      return;
    }
  }catch{}
  try{
    const t=document.createElement("textarea");
    t.value=text;t.setAttribute("readonly","");t.style.position="fixed";t.style.opacity="0";
    document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);
    done(true);
  }catch{done(false)}
}

export function AdmissionsPage({slug}:{slug:string}){
  const [tab,setTab]=useState<string>("online");
  const [paid,setPaid]=useState(false);
  const [paying,setPaying]=useState(false);
  const [copied,setCopied]=useState("");
  const [appRef,setAppRef]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const [physicalSent,setPhysicalSent]=useState(false);

  const copy=(value:string,key:string)=>copyText(value,ok=>setCopied(ok?key:key+":manual"));

  const PaymentCard=()=>(
    <div className="adm-pay">
      <div className="adm-pay-top">
        <span className="adm-badge"><ShieldCheck size={13}/> Secure checkout</span>
        <span className="adm-pay-brand"><Landmark size={15}/> School account</span>
      </div>
      <div className="adm-pay-amount">
        <small>Total due</small>
        <strong>₦{FEE}</strong>
        <span>One-time application fee · non-refundable</span>
      </div>
      <div className="adm-pay-rows">
        <div className="adm-row"><span>Account name</span><span className="adm-rowval">{BANK.name}
          <button type="button" className="adm-copy" onClick={()=>copy(BANK.name,"name")} aria-label="Copy account name"><Copy size={12}/>{copied.startsWith("name")?(copied==="name"?"Copied":"Select"):"Copy"}</button>
        </span></div>
        <div className="adm-row"><span>Bank</span><span className="adm-rowval">{BANK.bank}</span></div>
        <div className="adm-row"><span>Account number</span><span className="adm-rowval"><b className="adm-mono">{BANK.number}</b>
          <button type="button" className="adm-copy" onClick={()=>copy(BANK.number,"number")} aria-label="Copy account number"><Copy size={12}/>{copied.startsWith("number")?(copied==="number"?"Copied":"Select"):"Copy"}</button>
        </span></div>
        <div className="adm-row"><span>Reference</span><span className="adm-rowval">{BANK.ref}</span></div>
        <div className="adm-row adm-row-total"><span>Amount</span><b>₦{FEE}</b></div>
      </div>
      {paid?
        <div className="adm-paid"><BadgeCheck size={18}/> Payment confirmed · form unlocked</div>
        :
        <button type="button" className="adm-paybtn" onClick={()=>{setPaying(true);setTimeout(()=>{setPaid(true);setPaying(false)},900);window.setTimeout(()=>{document.getElementById("adm-form")?.scrollIntoView({behavior:"smooth",block:"center"})},120)}}>
          {paying?"Confirming payment…":"I have made the payment"}
        </button>}
      <p className="adm-secure"><ShieldCheck size={13}/> Transfers are confirmed by the school bursary before the offer stage.</p>
    </div>
  );

  return <main>
    <section className="adm-hero">
      <div className="container">
        <div className="crumb"><Link href="/">Home</Link>　/　Admissions</div>
        <span className="kicker">Admissions · September 2026 entry</span>
        <h1>Join the Apple School community.</h1>
        <p>A clear, personal admissions process — from your first tour to your child’s first day. Places are offered on a rolling basis, so we encourage families to apply early.</p>
        <div className="adm-chips">
          <span className="adm-chip"><FileText size={14}/> ₦{FEE} application fee</span>
          <span className="adm-chip"><Clock size={14}/> 5 – 10 working days</span>
          <span className="adm-chip"><CalendarDays size={14}/> August intake open</span>
          <span className="adm-chip"><GraduationCap size={14}/> Nursery – Senior Secondary</span>
        </div>
        <div className="actions">
          <a className="btn primary" href="#apply">Start application <ArrowRight size={16}/></a>
          <Link className="btn light" href="/#school-tour">Book a school tour</Link>
        </div>
      </div>
    </section>

    <section className="adm-wrap">
      <div className="container adm-grid2">
        <div>
          <span className="eyebrow">How it works</span>
          <h2 className="adm-h2">Five steps, one conversation at a time.</h2>
          <p className="adm-lead">We keep the process human. Each step has a named contact in the admissions office, and you will always know what happens next.</p>
          <div className="adm-steps">
            {steps.map(([t,d],i)=><div className="adm-step" key={t}>
              <span className="adm-stepnum">{String(i+1).padStart(2,"0")}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>)}
          </div>
        </div>
        <aside className="adm-side">
          <div className="adm-card">
            <span className="eyebrow">Before you start</span>
            <h3 className="adm-h3">Have these ready</h3>
            <ul className="adm-check">
              {before.map(x=><li key={x}><span className="adm-tick"><Check size={13}/></span>{x}</li>)}
            </ul>
          </div>
          <div className="adm-card adm-contact">
            <span className="eyebrow">Admissions office</span>
            <h3 className="adm-h3">Talk to a person</h3>
            <p><MapPin size={14}/> 12 Admiralty Way, Lekki Phase 1, Lagos</p>
            <p><Phone size={14}/> +234 800 000 0000</p>
            <p><Mail size={14}/> admissions@appleschool.ng</p>
            <p className="adm-hours">Monday – Friday · 8:00am – 4:00pm</p>
          </div>
        </aside>
      </div>
    </section>

    <section id="apply" className="adm-wrap adm-applyband">
      <div className="container">
        <div className="adm-applyhead">
          <div>
            <span className="eyebrow">Start your application</span>
            <h2 className="adm-h2">Apply online, or collect the physical form.</h2>
            <p className="adm-lead">Pay the application fee to unlock the online application form, or ask us to prepare the physical form for collection at the school office.</p>
          </div>
          <div className="adm-tabs" role="tablist" aria-label="Application method">
            <button type="button" role="tab" aria-selected={tab==="online"} className={"adm-tab"+(tab==="online"?" on":"")} onClick={()=>setTab("online")}>Apply online</button>
            <button type="button" role="tab" aria-selected={tab==="physical"} className={"adm-tab"+(tab==="physical"?" on":"")} onClick={()=>setTab("physical")}>Physical form in person</button>
          </div>
        </div>

        {tab==="online"?
        <div className="adm-grid2 adm-gap">
          <div>
            <div className="adm-progress">
              <span className={"adm-pnode"+(paid?" done":" now")}><b>{paid?<Check size={13}/>:"1"}</b> Application fee</span>
              <span className={"adm-pline"+(paid?" done":"")}/>
              <span className={"adm-pnode"+(paid?" now":"")}><b>2</b> Student details</span>
            </div>

            {paid?
            <div id="adm-form" className="adm-form">
              <div className="adm-formhead"><h3 className="adm-h3">Online application form</h3><span className="adm-ref">Fee paid · ₦{FEE}</span></div>
              <form onSubmit={(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setAppRef("AS-"+String(Date.now()).slice(-6));setSubmitted(true)}}>
                <fieldset className="adm-fieldset">
                  <legend className="adm-legend">Student information</legend>
                  <div className="form-grid">
                    <Field label="First name" name="s-first" required/>
                    <Field label="Surname" name="s-last" required/>
                    <Field label="Other names" name="s-other"/>
                    <Field label="Date of birth" name="s-dob" type="date" required/>
                    <Select label="Gender" name="s-gender" options={["Female","Male","Prefer not to say"]} required/>
                    <Select label="Division applying for" name="s-division" options={divisions} defaultValue="Primary" required/>
                    <Field label="Year of entry" name="s-year" type="number" defaultValue="2026" required/>
                    <Field label="Current school" name="s-school" placeholder="If applicable"/>
                  </div>
                </fieldset>
                <fieldset className="adm-fieldset">
                  <legend className="adm-legend">Parent or guardian</legend>
                  <div className="form-grid">
                    <Field label="Full name" name="p-name" required/>
                    <Select label="Relationship to student" name="p-rel" options={["Mother","Father","Guardian","Other"]} required/>
                    <Field label="Email address" name="p-email" type="email" required/>
                    <Field label="Phone number" name="p-phone" type="tel" required/>
                    <div className="field full"><label htmlFor="p-address">Home address</label><input id="p-address" name="p-address" required placeholder="Street, area, city"/></div>
                  </div>
                </fieldset>
                <fieldset className="adm-fieldset">
                  <legend className="adm-legend">Supporting documents</legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="d-birth">Birth certificate</label><input id="d-birth" name="d-birth" type="file" accept=".pdf,.jpg,.jpeg,.png"/></div>
                    <div className="field"><label htmlFor="d-photo">Passport photograph</label><input id="d-photo" name="d-photo" type="file" accept=".jpg,.jpeg,.png"/></div>
                    <div className="field"><label htmlFor="d-report">Last school report</label><input id="d-report" name="d-report" type="file" accept=".pdf,.jpg,.jpeg,.png"/></div>
                    <Field label="Payment reference" name="p-ref" placeholder="e.g. TRF-839201" required/>
                  </div>
                  <p className="adm-hint">PDF, JPG or PNG · up to 5MB per file. You can send the rest later to admissions@appleschool.ng.</p>
                </fieldset>
                <button className="btn primary">Submit application →</button>
                {submitted&&<div className="adm-success"><BadgeCheck size={18}/><div><b>Application received.</b> Your reference is {appRef}. Our admissions office will confirm receipt within two working days.</div></div>}
              </form>
            </div>
            :
            <div className="adm-form adm-locked">
              <div className="adm-formhead"><h3 className="adm-h3">Online application form</h3><span className="adm-ref">Locked</span></div>
              <div className="adm-ghost">
                <div className="form-grid">
                  <div className="field"><label>First name</label><input disabled placeholder="Student’s first name"/></div>
                  <div className="field"><label>Surname</label><input disabled placeholder="Student’s surname"/></div>
                  <div className="field"><label>Date of birth</label><input disabled type="date"/></div>
                  <div className="field"><label>Division applying for</label><input disabled placeholder="Select a division"/></div>
                </div>
              </div>
              <p className="adm-locknote"><ShieldCheck size={15}/> The form unlocks as soon as your ₦{FEE} payment is confirmed.</p>
            </div>}
          </div>

          <aside className="adm-side">
            <PaymentCard/>
            <div className="adm-card adm-mini">
              <h4>What happens after you submit</h4>
              <p>You will receive an email confirming your application reference. Complete applications are reviewed in 5 – 10 working days, after which we invite your family for an assessment and interview.</p>
            </div>
          </aside>
        </div>
        :
        <div className="adm-grid2 adm-gap">
          <div>
            <div className="adm-card adm-physical">
              <span className="eyebrow">Physical form</span>
              <h3 className="adm-h3">Complete the form at the school office</h3>
              <p className="adm-body">Collect the application form from reception, complete it by hand and return it with your documents. The form is issued once the ₦{FEE} application fee has been confirmed at the bursary.</p>
              <ul className="adm-check">
                <li><span className="adm-tick"><Check size={13}/></span>Forms are issued Monday to Friday, 8:00am – 4:00pm</li>
                <li><span className="adm-tick"><Check size={13}/></span>Payment is made at reception; a receipt is issued on the spot</li>
                <li><span className="adm-tick"><Check size={13}/></span>Bring your child’s birth certificate and last school report</li>
                <li><span className="adm-tick"><Check size={13}/></span>Completed forms are reviewed within 5 – 10 working days</li>
              </ul>
              <button className="btn primary mt-6" onClick={()=>setTab("online")}>Apply online instead</button>
            </div>
          </div>
          <aside className="adm-side">
            <div className="adm-form">
              <div className="adm-formhead"><h3 className="adm-h3">Request a call back</h3><span className="adm-ref">Reception</span></div>
              <p className="adm-body">Tell us when you would like to collect the form and we will have it ready with your name on it.</p>
              <form onSubmit={(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setPhysicalSent(true);e.currentTarget.reset()}}>
                <div className="form-grid">
                  <Field label="Parent or guardian name" name="ph-name" required/>
                  <Field label="Email address" name="ph-email" type="email" required/>
                  <Field label="Phone number" name="ph-phone" type="tel" required/>
                  <Select label="Division" name="ph-division" options={divisions} defaultValue="Primary" required/>
                  <Field label="Preferred date" name="ph-date" type="date" required/>
                  <div className="field"><label htmlFor="ph-time">Preferred time</label><select id="ph-time" name="ph-time" defaultValue="11:00am">{tourTimes.map(x=><option key={x}>{x}</option>)}</select></div>
                </div>
                <button className="btn primary mt-5">Request a call back →</button>
                {physicalSent&&<div className="adm-success"><BadgeCheck size={18}/><div><b>Request received.</b> Reception will call you to confirm collection of the physical form.</div></div>}
              </form>
            </div>
          </aside>
        </div>}
      </div>
    </section>

    <section className="adm-wrap">
      <div className="container">
        <span className="eyebrow">Requirements</span>
        <h2 className="adm-h2">What a complete application includes.</h2>
        <p className="adm-lead">An application is reviewed once every item below has been received. Missing documents can be sent later to admissions@appleschool.ng.</p>
        <div className="adm-reqs">
          {requirements.map((r,i)=><div className="adm-req" key={r}><span>{String(i+1).padStart(2,"0")}</span>{r}</div>)}
        </div>
      </div>
    </section>

    <section className="adm-wrap adm-soft">
      <div className="container adm-grid2">
        <div>
          <span className="eyebrow">Age placement guide</span>
          <h2 className="adm-h2">Which class will my child join?</h2>
          <p className="adm-lead">Children are placed by age band and school history. A child must reach the entry age on or before 31 August of the year of entry.</p>
          <div className="adm-tablewrap">
            <table className="adm-table">
              <thead><tr><th>Class</th><th>Typical age</th><th>Stage</th></tr></thead>
              <tbody>{placement.map(([a,b,c])=><tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
        <div>
          <span className="eyebrow">Timeline</span>
          <h2 className="adm-h2">From application to first day.</h2>
          <div className="adm-timeline">
            <div><b>Day 0</b><span>Application submitted and reference emailed to you</span></div>
            <div><b>Day 1 – 2</b><span>Admissions office confirms receipt and checks documents</span></div>
            <div><b>Day 5 – 10</b><span>Assessment session and family interview</span></div>
            <div><b>Day 10 – 12</b><span>Offer letter, fee schedule and joining pack</span></div>
            <div><b>August</b><span>Welcome day and start of the academic year</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="adm-wrap">
      <div className="container adm-faqwrap">
        <span className="eyebrow">Questions</span>
        <h2 className="adm-h2">Good to know.</h2>
        {faqs.map(([q,a])=><details className="adm-faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>

    <section className="adm-cta">
      <div className="container adm-ctabox">
        <div>
          <span className="kicker">Ready when you are</span>
          <h2>Come and see the school.</h2>
          <p>Tours run every weekday and take about 45 minutes. Meet the team, see the classrooms and ask us anything.</p>
        </div>
        <div className="actions">
          <Link className="btn primary" href="/#school-tour">Book a school tour <ArrowRight size={16}/></Link>
          <a className="btn light" href="#apply">Start application</a>
        </div>
      </div>
    </section>
  </main>
}

function Field({label,name,type="text",required=false,defaultValue,placeholder}:{label:string;name:string;type?:string;required?:boolean;defaultValue?:string;placeholder?:string}){
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder??label}/></div>
}
function Select({label,name,options,required=false,defaultValue}:{label:string;name:string;options:string[];required?:boolean;defaultValue?:string}){
  return <div className="field"><label htmlFor={name}>{label}</label><select id={name} name={name} required={required} defaultValue={defaultValue??""}>{defaultValue===undefined&&<option value="" disabled>Select</option>}{options.map(x=><option key={x}>{x}</option>)}</select></div>
}
