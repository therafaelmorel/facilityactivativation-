const I=(name)=>{const icons={home:'<path d="M3 10.5 9 5l6 5.5V16H5v-5.5"/>',projects:'<path d="M3 5h5l1.5 2H17v9H3z"/>',tasks:'<path d="M5 4h10v12H5z"/><path d="m7.5 8 1 1 2-2M7.5 12h5"/>',library:'<path d="M4 4h3v12H4zM9 4h3v12H9zM14 5l3 10"/>',users:'<path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6-1a2.5 2.5 0 1 0 0-5M1.5 16c0-3 2-5 4.5-5s4.5 2 4.5 5M11 11c2.5 0 4 1.8 4 4"/>',chart:'<path d="M3 16V9h3v7M8 16V5h3v11M13 16V2h3v14"/>',history:'<circle cx="9" cy="9" r="7"/><path d="M9 5v4l3 2"/>',settings:'<circle cx="9" cy="9" r="2.5"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M14.3 3.7l-1.4 1.4M5.1 12.9l-1.4 1.4"/>',bell:'<path d="M5 7a4 4 0 0 1 8 0v4l1.5 2h-11L5 11zM7.5 15h3"/>',search:'<circle cx="8" cy="8" r="5"/><path d="m12 12 4 4"/>',plus:'<path d="M9 3v12M3 9h12"/>',chev:'<path d="m7 5 4 4-4 4"/>',filter:'<path d="M2 4h14L11 9v5l-4 2V9z"/>',upload:'<path d="M9 12V3m0 0L6 6m3-3 3 3M3 13v3h12v-3"/>'};return `<span class="icon"><svg viewBox="0 0 18 18">${icons[name]||icons.home}</svg></span>`}
const roles={
  team:{label:'Project team',short:'Team',description:'Assigned projects and task updates',name:'Rafael Morel',initials:'RM',title:'Project Manager',home:'my-work',nav:[['home','Dashboard','my-work'],['projects','My Projects','projects'],['tasks','My Tasks','project-tasks']]},
  admin:{label:'Administrator',short:'Admin',description:'Project setup, assignments and governance',name:'Maya Thompson',initials:'MT',title:'Activation Administrator',home:'projects',nav:[['projects','Project Control','projects'],['plus','Create Project','admin-setup'],['library','Task Library','task-library'],['tasks','Assignments','assignments'],['users','Users & Departments','users'],['history','Activity History','activity']]},
  leadership:{label:'Leadership',short:'Leader',description:'Portfolio readiness, risks and trends',name:'James Wilson',initials:'JW',title:'Executive Leader',home:'leadership',nav:[['chart','Portfolio Overview','leadership'],['projects','Projects','projects'],['tasks','Risks & Blockers','project-overview']]}
};
function readSavedRole(){try{return localStorage.getItem('facility-demo-role')}catch{return null}}
function saveRole(key){try{localStorage.setItem('facility-demo-role',key)}catch{/* Some file previews block browser storage. */}}
const savedRole=readSavedRole();
let currentRole=roles[savedRole]?savedRole:'team';
const role=()=>roles[currentRole]||roles.team;
function roleTabs(){return `<div class="role-tabs" aria-label="Switch demo role"><span class="role-tabs-label">Switch role</span>${Object.entries(roles).map(([key,r])=>`<button type="button" class="role-tab ${currentRole===key?'active':''}" data-role="${key}" onclick="setRole('${key}')" aria-pressed="${currentRole===key}">${r.label}</button>`).join('')}</div>`}
function layout(title,active,body){const r=role();return `<div class="shell"><aside class="sidebar"><div class="product"><div class="product-mark">FA</div><div><div class="product-name">Facility Activation</div><div class="product-sub">Readiness workspace</div></div></div><div class="role-context"><span>Current workspace</span><strong>${r.label}</strong><small>${r.description}</small></div><nav class="nav">${r.nav.map(n=>`<button type="button" class="nav-link ${active===n[2]?'active':''}" data-screen="${n[2]}">${I(n[0])}<span>${n[1]}</span></button>`).join('')}</nav><div class="permission-note"><span>Access</span><strong>${r.label} permissions</strong><small>${currentRole==='team'?'Update status, notes and evidence only.':currentRole==='admin'?'Create, assign, edit and publish projects.':'Read-only portfolio and project visibility.'}</small></div><div class="sidebar-foot"><div class="user-mini"><div class="avatar">${r.initials}</div><div><strong>${r.name}</strong><span>${r.title}</span></div></div></div></aside><main class="main"><div class="demo-bar"><div><span class="live-dot"></span><strong>Interactive role demo</strong><span class="demo-copy">Select a role to open its dashboard and permissions</span></div>${roleTabs()}</div><header class="topbar"><div class="crumb">Facility Activation <span>/</span> <strong>${title}</strong></div><div class="top-actions"><button type="button" class="text-action" data-screen="sign-in">Choose role</button><button type="button" class="text-action">Notifications <span class="notification-count">3</span></button><div class="avatar">${r.initials}</div></div></header><div class="content">${body}</div></main></div>`}
const status=(s)=>`<span class="status ${s.toLowerCase().replaceAll(' ','').replace('inprogress','progress').replace('notstarted','not')}">${s}</span>`;
const btn=(t,c='')=>`<button class="button ${c}">${t}</button>`;
const taskRows=[['Confirm medical equipment inventory','Clinical Operations','Jul 24, 2026','In Progress'],['Complete emergency power testing','Facilities Engineering','Jul 20, 2026','Blocked'],['Validate nurse call system configuration','Information Technology','Jul 27, 2026','Not Started'],['Schedule life safety inspection','Facilities Engineering','Jul 29, 2026','Not Started'],['Approve staff orientation plan','Nursing','Aug 03, 2026','Complete']];
const table=(rows=taskRows)=>`<table><thead><tr><th>Task</th><th>Responsible department</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td><div class="task-name">${r[0]}</div><div class="task-meta">GP7 West · ${r[1]}</div></td><td>${r[1]}</td><td>${r[2]}</td><td>${status(r[3])}</td><td>${I('chev')}</td></tr>`).join('')}</tbody></table>`;
const teamPriorityRows=[
  ['Confirm Equipment Inventory','Check inventory with tags','Clinical Operations','Jul 25, 2026','In Progress'],
  ['Schedule Safety Inspection','Coordinate final inspection','Information Technology','Jul 28, 2026','Issues'],
  ['Call for Coffee Restock','Confirm opening-day supply','Environmental Services','Jul 13, 2026','Not Started'],
  ['Calibrate Schedule','Verify equipment sequence','Biomedical','Jul 05, 2026','Completed'],
  ['Confirm Equipment Inventory','Check inventory with tags','Clinical Operations','Jun 01, 2026','In Progress'],
  ['Confirm Equipment Inventory','Check inventory with tags','Clinical Operations','Jul 30, 2026','In Progress']
];
const teamStatus=(value)=>`<span class="team-status team-status-${value.toLowerCase().replaceAll(' ','-')}">${value}</span>`;
function teamDashboard(){
  const teamNav=[
    ['Dashboard','my-work'],
    ['My Projects','projects'],
    ['My Tasks','project-tasks']
  ];
  const metrics=[
    ['3','Assigned Projects','Across 2 Campuses','metric-one'],
    ['18','Assigned Tasks','Work requiring action','metric-two'],
    ['3','Overdue Tasks','2 critical to opening','metric-three'],
    ['3','Tasks With Issues','3 requiring attention','metric-four']
  ];
  const calendarDays=Array.from({length:31},(_,index)=>index+1);
  const calendarOffset=3;
  return `<div class="team-dashboard">
    <aside class="team-sidebar">
      <div class="team-brand">
        <strong>FACILITY ACTIVATION</strong>
        <span>Readiness Dashboard</span>
      </div>
      <nav class="team-nav" aria-label="Project team navigation">
        ${teamNav.map(([label,screen])=>`<button type="button" class="team-nav-link ${screen==='my-work'?'active':''}" data-screen="${screen}" onclick="navigate('${screen}')">${label}</button>`).join('')}
      </nav>
      <div class="team-profile">
        <div>
          <strong>Rafael Morel</strong>
          <span>Project Manager</span>
        </div>
        <button type="button" class="team-signout" data-screen="sign-in" aria-label="Sign out"><i class="ph ph-sign-out"></i></button>
      </div>
    </aside>

    <div class="team-workspace">
      <main class="team-center">
        <header class="team-greeting">
          <h1>Hello, Rafael</h1>
          <div class="team-role-switcher">${roleTabs()}</div>
        </header>

        <section class="team-overview" aria-label="Project team workload summary">
          <div class="team-tracker-wrap">
            <canvas id="team-workload-tracker" width="620" height="620" aria-label="Workload tracker showing assigned projects, assigned tasks, overdue tasks, and tasks with issues"></canvas>
          </div>
          <div class="team-metrics">
            ${metrics.map(([value,label,hint,tone])=>`<button type="button" class="team-metric" data-metric="${label}" onclick="navigate('${label==='Assigned Projects'?'projects':'project-tasks'}')">
              <span class="team-metric-number ${tone}">${value}</span>
              <span class="team-metric-copy"><strong>${label}</strong><small>${hint}</small></span>
            </button>`).join('')}
          </div>
        </section>

        <section class="team-priority">
          <h2>Priority Tasks</h2>
          <div class="team-table-wrap">
            <table class="team-priority-table">
              <thead><tr><th>Task</th><th>Responsible Department</th><th>Due Date</th><th>Status</th></tr></thead>
              <tbody>
                ${teamPriorityRows.map(row=>`<tr data-screen="task-detail">
                  <td><strong>${row[0]}</strong><span>${row[1]}</span></td>
                  <td>${row[2]}</td>
                  <td>${row[3]}</td>
                  <td>${teamStatus(row[4])}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside class="team-rail">
        <div class="team-utility">
          <label class="team-global-search">
            <i class="ph ph-magnifying-glass"></i>
            <input id="team-search" type="search" aria-label="Search dashboard" />
          </label>
          <button type="button" class="team-notifications" aria-label="Notifications"><i class="ph ph-bell-simple"></i></button>
          <img class="team-avatar" src="assets/dashboard/rafael-avatar.jpg" alt="Rafael Morel" />
        </div>
        <div class="team-date">Tuesday, July 21</div>

        <section class="team-calendar">
          <div class="rail-heading"><h2>Work calendar</h2><button type="button" aria-label="Calendar options"><i class="ph ph-dots-three"></i></button></div>
          <div class="calendar-month-row">
            <strong id="calendar-month">July 2026</strong>
            <div>
              <button type="button" class="calendar-nav" data-calendar-shift="-1" aria-label="Previous month"><i class="ph ph-caret-left"></i></button>
              <button type="button" class="calendar-nav" data-calendar-shift="1" aria-label="Next month"><i class="ph ph-caret-right"></i></button>
            </div>
          </div>
          <div class="calendar-grid calendar-weekdays">${['S','M','T','W','T','F','S'].map(day=>`<span>${day}</span>`).join('')}</div>
          <div class="calendar-grid calendar-days">
            ${Array.from({length:calendarOffset},()=>'<span></span>').join('')}
            ${calendarDays.map(day=>`<button type="button" class="${day===20?'filled':day===21?'outlined':day===24?'soft':day===27?'filled light':day===29?'outlined red':''}" data-day="${day}">${day}</button>`).join('')}
          </div>
        </section>

        <section class="team-agenda">
          <div class="rail-heading">
            <h2>Tuesday, Jul 21</h2>
            <button type="button" class="agenda-add" aria-label="Add calendar item"><i class="ph ph-plus"></i></button>
          </div>
          <div class="agenda-list">
            ${[
              ['Jul 20','Complete emergency power testing','Facilities Engineering','Blocked','red'],
              ['Jul 24','Confirm medical equipment inventory','Clinical Operations','In Progress','pink'],
              ['Jul 27','Validate nurse call system configuration','Information Technology','Not Started','coral'],
              ['Jul 29','Schedule life safety inspection','Facilities Engineering','Not Started','outline']
            ].map(item=>`<button type="button" class="agenda-item" data-screen="task-detail">
              <span class="agenda-dot ${item[4]}"></span>
              <span><time>${item[0]}</time><strong>${item[1]}</strong><small>${item[2]}</small><em>${item[3]}</em></span>
              <i class="ph ph-dots-three"></i>
            </button>`).join('')}
          </div>
        </section>

        <section class="team-projects-rail">
          <div class="rail-heading"><h2>My projects</h2><button type="button" data-screen="projects">View all <i class="ph ph-caret-right"></i></button></div>
          ${[
            ['ph-buildings','GP7 West','Milstein Hospital · Go-live Sep 15','72% ready','Attention','72'],
            ['ph-monitor','Radiology Expansion','Allen Hospital · Go-live Nov 02','48% ready','On Track','48']
          ].map(project=>`<button type="button" class="rail-project" data-screen="project-overview">
            <span class="rail-project-icon"><i class="ph ${project[0]}"></i></span>
            <span class="rail-project-copy"><strong>${project[1]}</strong><small>${project[2]}</small><span class="rail-progress"><b style="width:${project[5]}%"></b></span></span>
            <span class="rail-project-status"><strong>${project[3]}</strong><small class="${project[4]==='On Track'?'on-track':''}">${project[4]}</small></span>
            <i class="ph ph-caret-right"></i>
          </button>`).join('')}
        </section>

        <section class="team-recent">
          <div class="rail-heading"><h2>Recent activity</h2><button type="button" aria-label="Recent activity options"><i class="ph ph-dots-three"></i></button></div>
          ${[
            ['ph-prohibit','Emergency power testing marked Blocked','Facilities Engineering · Jul 20'],
            ['ph-clipboard-text','Medical equipment inventory updated','Clinical Operations · Jul 21'],
            ['ph-user-plus','Nurse call configuration assigned','Information Technology · Jul 21'],
            ['ph-shield-check','Life safety inspection scheduled','Facilities Engineering · Jul 21']
          ].map((activity,index)=>`<div class="recent-row">
            <span class="recent-icon ${index===0?'solid':''}"><i class="ph ${activity[0]}"></i></span>
            <span><strong>${activity[1]}</strong><small>${activity[2]}</small></span>
          </div>`).join('')}
        </section>
      </aside>
    </div>
  </div>`;
}
const screens={
'sign-in':()=>`<div class="signin"><section class="signin-art"><div class="signin-name"><span class="product-mark light">FA</span><span>Facility Activation</span></div><div class="signin-copy"><div class="eyebrow" style="color:white;opacity:.72">Operational readiness</div><h1>One view of every step before opening day.</h1><p>Assign activation work, keep teams focused, and give leadership a clear view of readiness across every project.</p><div class="signin-proof"><div><strong>517</strong><span>Master tasks</span></div><div><strong>15</strong><span>Workstreams</span></div><div><strong>8</strong><span>Activation phases</span></div></div></div><div class="secure-note">Secure organizational access · No patient information</div></section><section class="signin-panel"><div class="login-form role-entry"><div class="entry-kicker">Interactive product demo</div><h2>Choose a role to begin</h2><p class="sub">Each role opens a different workspace with the permissions that person needs.</p><div class="signin-roles">${Object.entries(roles).map(([key,r])=>`<button class="signin-role" data-role="${key}"><span class="signin-role-mark">${r.short.slice(0,1)}</span><span><strong>${r.label}</strong><small>${r.description}</small></span><b>Open view</b></button>`).join('')}</div><div class="signin-divider"><span>or sign in normally</span></div><label class="login-label">Work email</label><input class="login-input" value="rafael.morel@hospital.org"/><button class="login-button">Continue with organization account</button><p class="fine">Demo data is illustrative. Authorized personnel only.</p></div></section></div>`,
'my-work':()=>currentRole==='team'?teamDashboard():layout('My Work','my-work',`<div class="page-head"><div><div class="eyebrow">Tuesday, July 21</div><h1>Good afternoon, Rafael.</h1><div class="sub">Here is the activation work requiring your attention.</div></div>${btn('View all my tasks')}</div>`),
'projects':()=>layout('Projects','projects',`<div class="page-head"><div><div class="eyebrow">Portfolio</div><h1>Projects</h1><div class="sub">View assigned projects and current activation readiness.</div></div><div class="row gap"><div class="search">${I('search')} Search projects</div>${btn('Filters')}</div></div><div class="filters"><button class="chip active">All projects · 6</button><button class="chip">On track · 3</button><button class="chip">Attention · 2</button><button class="chip">At risk · 1</button></div><div class="grid projects-grid">${[['ACT-026','GP7 West','Milstein Hospital','72%','18','3','Attention'],['ACT-031','Radiology Expansion','Allen Hospital','48%','9','0','On Track'],['ACT-018','ED Modernization','Morgan Stanley','86%','14','1','Attention'],['ACT-034','Ambulatory Infusion','CUIMC','35%','7','0','On Track'],['ACT-011','Cardiac OR Upgrade','Milstein Hospital','93%','5','2','At Risk'],['ACT-029','Outpatient Pharmacy','Lower Manhattan','61%','11','0','On Track']].map(p=>`<div class="project-card"><div class="project-top"><div><div class="project-code">${p[0]}</div><div class="project-title">${p[1]}</div><div class="project-info">${p[2]} · Go-live Sep 15</div></div>${status(p[6])}</div><div style="margin-top:20px"><div class="row between"><span class="sub">Readiness</span><strong>${p[3]}</strong></div><div class="progress-line" style="width:100%;margin-top:8px"><div class="progress-fill" style="width:${p[3]}"></div></div></div><div class="project-stats"><div><strong>${p[4]}</strong><span>My tasks</span></div><div><strong>${p[5]}</strong><span>Overdue</span></div><div><strong>Sep 15</strong><span>Go-live</span></div></div></div>`).join('')}</div>`),
'project-overview':()=>layout('GP7 West','projects',`<div class="hero-project"><div class="hero-grid"><div><div class="row gap"><div class="project-code">ACT-026</div>${status('Attention')}</div><h1 style="font-size:32px;margin-top:10px">GP7 West</h1><p class="sub">Milstein Hospital · 7th Floor · Inpatient renovation</p><div class="stat-strip"><div><strong>Sep 15</strong><span>Planned go-live</span></div><div><strong>56 days</strong><span>Until opening</span></div><div><strong>15</strong><span>Workstreams</span></div><div><strong>284</strong><span>Applicable tasks</span></div></div></div><div class="ring-wrap"><div class="ring"></div><div class="ring-text"><strong>72%</strong><span>Activation ready</span></div></div></div></div><div class="tabs"><div class="tab active">Overview</div><div class="tab">Tasks</div><div class="tab">Workstreams</div><div class="tab">Activity</div><div class="tab">Project details</div></div><div class="grid metrics"><div class="metric good"><div class="label">Complete</div><div class="value">204</div><div class="hint">72% of applicable work</div></div><div class="metric"><div class="label">In progress</div><div class="value">42</div><div class="hint">Across 11 departments</div></div><div class="metric alert"><div class="label">Blocked</div><div class="value">7</div><div class="hint">3 critical items</div></div><div class="metric alert"><div class="label">Overdue</div><div class="value">11</div><div class="hint">4 require escalation</div></div></div><div class="chart-grid"><section class="panel"><div class="panel-head"><h2>Readiness by workstream</h2><span class="sub">15 total</span></div><div class="panel-body">${[['Clinical Operations',82],['Facilities Engineering',69],['Information Technology',64],['Regulatory',91],['Support Services',73]].map(x=>`<div class="row" style="gap:15px;margin:14px 0"><span style="width:145px;font-size:11px">${x[0]}</span><div class="progress-line" style="flex:1"><div class="progress-fill" style="width:${x[1]}%"></div></div><strong style="font-size:11px">${x[1]}%</strong></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><h2>Key risks</h2><span class="status risk">4 open</span></div><div class="panel-body"><div class="callout"><strong>Emergency power testing</strong><br><span class="sub">Blocked · 3 days overdue</span></div><div class="note" style="margin-top:10px"><strong>Nurse call configuration</strong><br>Due in 6 days · Not started</div><div class="note" style="margin-top:10px"><strong>Life safety inspection</strong><br>Dependency at risk</div></div></section></div>`),
'project-tasks':()=>layout('GP7 West / Tasks','project-tasks',`<div class="page-head"><div><div class="eyebrow">ACT-026 · GP7 West</div><h1>Project tasks</h1><div class="sub">284 applicable tasks across 15 activation workstreams.</div></div><div class="row gap">${btn('Export')}${btn('Add task','primary')}</div></div><div class="toolbar"><div class="filters" style="margin:0"><button class="chip active">All · 284</button><button class="chip">My tasks · 18</button><button class="chip">Blocked · 7</button><button class="chip">Overdue · 11</button><button class="chip">Complete · 204</button></div><div class="search">${I('search')} Search tasks</div></div><section class="panel">${table([...taskRows,['Complete air balancing report','Facilities Engineering','Aug 07, 2026','Not Started'],['Confirm medication storage locations','Pharmacy','Aug 12, 2026','In Progress'],['Validate environmental services staffing','Support Services','Aug 18, 2026','Not Started']])}<div class="pagination"><span>Showing 1–8 of 284 tasks</span><span>Previous&nbsp;&nbsp;&nbsp; 1&nbsp;&nbsp; 2&nbsp;&nbsp; 3 &nbsp;&nbsp; Next</span></div></section>`),
'task-detail':()=>layout('Task detail','project-tasks',`<div class="page-head"><div><div class="eyebrow">ACT-026 · FAC-0421</div><h1 class="task-detail-title">Complete emergency power testing for all patient-care areas</h1><div class="row gap">${status('Blocked')}<span class="sub">Critical to opening</span></div></div>${btn('Return to tasks')}</div><div class="detail-grid"><div><div class="info-grid"><div class="info-cell"><label>Responsible department</label><strong>Facilities Engineering</strong></div><div class="info-cell"><label>Assigned to</label><strong>Michael Chen</strong></div><div class="info-cell"><label>Activation phase</label><strong>Systems validation</strong></div><div class="info-cell"><label>Due date</label><strong style="color:var(--red)">July 20, 2026 · Overdue</strong></div><div class="info-cell"><label>Supporting departments</label><strong>Clinical Operations, Safety</strong></div><div class="info-cell"><label>Recommended timeframe</label><strong>2 months pre-opening</strong></div></div><section class="panel" style="margin-top:18px"><div class="panel-head"><h2>Task description</h2></div><div class="panel-body"><p class="sub" style="color:var(--ink)">Confirm emergency circuits, transfer switches, and generator-backed outlets have been tested, documented, and accepted for all patient-care spaces.</p><div class="callout" style="margin-top:18px"><strong>Current blocker</strong><br>Final load-bank test cannot proceed until temporary construction power is removed from the west electrical room.</div></div></section><section class="panel" style="margin-top:18px"><div class="panel-head"><h2>Activity</h2><span class="sub">3 updates</span></div><div class="panel-body timeline"><div class="event"><strong>Status changed to Blocked</strong><p>Michael added a blocker explanation.</p><time>Jul 21, 2026 · 9:42 AM</time></div><div class="event"><strong>Due date updated</strong><p>Changed from July 18 to July 20 by Activation Admin.</p><time>Jul 14, 2026 · 2:18 PM</time></div></div></section></div><aside class="panel"><div class="panel-head"><h2>Update status</h2></div><div class="panel-body"><div class="field"><label>Current status</label><div class="input">Blocked <span>⌄</span></div></div><div class="field"><label>Blocker explanation required</label><div class="input textarea">Temporary construction power remains connected.</div></div><div class="field"><label>Progress note</label><div class="input textarea">Add an update for the activation team...</div></div><div class="field"><label>Supporting evidence</label><button class="button" style="width:100%;justify-content:center">${I('upload')} Upload document or photo</button></div><button class="button primary" style="width:100%;justify-content:center">Save status update</button><p class="fine">Task details and assignments can only be changed by an administrator.</p></div></aside></div>`),
'admin-setup':()=>layout('Create project','projects',`<div class="page-head"><div><div class="eyebrow">Administration</div><h1>Create activation project</h1><div class="sub">Project profile answers determine which master tasks apply.</div></div>${btn('Save draft')}</div><div class="steps"><div class="step active"><b>1</b>Project profile</div><div class="step"><b>2</b>Generate tasks</div><div class="step"><b>3</b>Review checklist</div><div class="step"><b>4</b>Assignments</div><div class="step"><b>5</b>Publish</div></div><section class="panel"><div class="panel-head"><h2>Project information</h2><span class="sub">Required fields</span></div><div class="panel-body"><div class="form-grid">${[['Project name','GP7 West'],['Campus','CUIMC'],['Building','Milstein Hospital'],['Floor / location','7th Floor West'],['Planned go-live','September 15, 2026'],['Project type','Renovation']].map(f=>`<div class="field-block"><label>${f[0]}</label><div class="input">${f[1]} <span>⌄</span></div></div>`).join('')}</div></div></section><section class="panel" style="margin-top:18px"><div class="panel-head"><h2>Project characteristics</h2><span class="sub">Used to apply task rules</span></div><div class="panel-body"><div class="choice-grid">${['Patient-facing','Inpatient unit','Article 28','Medical gases','Imaging services','Operating rooms','Behavioral health','Leased space','Off-site location'].map((x,i)=>`<div class="choice ${[0,1,2,3].includes(i)?'yes':''}"><span>${x}</span><strong>${[0,1,2,3].includes(i)?'Yes':'No'}</strong></div>`).join('')}</div><div class="callout" style="margin-top:18px"><strong>Estimated checklist</strong><br>Based on these selections, approximately 284 of 517 master tasks will apply.</div></div></section><div style="display:flex;justify-content:flex-end;margin-top:18px">${btn('Continue to generate tasks','primary')}</div>`,true),
'task-library':()=>layout('Task Library','task-library',`<div class="page-head"><div><div class="eyebrow">Administration</div><h1>Activation task library</h1><div class="sub">Manage the reusable master playbook used to generate project checklists.</div></div><div class="row gap">${btn('Import Excel')}${btn('Add master task','primary')}</div></div><div class="grid metrics"><div class="metric"><div class="label">Master tasks</div><div class="value">517</div><div class="hint">Across 15 workstreams</div></div><div class="metric"><div class="label">Active</div><div class="value">501</div><div class="hint">Available for new projects</div></div><div class="metric alert"><div class="label">Needs review</div><div class="value">13</div><div class="hint">Missing owner or timeframe</div></div><div class="metric"><div class="label">Draft additions</div><div class="value">54</div><div class="hint">Awaiting library approval</div></div></div><div class="toolbar" style="margin-top:20px"><div class="filters" style="margin:0"><button class="chip active">All tasks</button><button class="chip">Clinical Operations</button><button class="chip">Facilities</button><button class="chip">IT</button><button class="chip">Regulatory</button></div><div class="search">${I('search')} Search library</div></div><section class="panel"><table><thead><tr><th>ID</th><th>Master task</th><th>Workstream / phase</th><th>Default owner</th><th>Timeframe</th><th>Rule</th><th></th></tr></thead><tbody>${[['FAC-0421','Complete emergency power testing','Facilities · Validation','Facilities Engineering','2 months pre-open','Patient-facing'],['CLI-0188','Confirm medical equipment inventory','Clinical · Deployment','Clinical Operations','3 months pre-open','All projects'],['IT-0114','Validate nurse call configuration','Technology · Validation','Information Technology','6 weeks pre-open','Inpatient'],['REG-0062','Schedule life safety inspection','Regulatory · Readiness','Facilities Engineering','4 weeks pre-open','Patient-facing'],['NUR-0210','Approve staff orientation plan','People · Training','Nursing','6 weeks pre-open','Clinical area']].map(r=>`<tr>${r.map((c,i)=>`<td class="${i===1?'task-name':''}">${c}</td>`).join('')}<td>${I('chev')}</td></tr>`).join('')}</tbody></table><div class="pagination"><span>Showing 1–5 of 517 master tasks</span><span>Previous&nbsp;&nbsp; 1&nbsp;&nbsp; 2&nbsp;&nbsp; 3 &nbsp;&nbsp; Next</span></div></section>`,true),
'assignments':()=>layout('Assignments','task-library',`<div class="page-head"><div><div class="eyebrow">GP7 West · Administration</div><h1>Assignment management</h1><div class="sub">Confirm accountable owners before publishing the project.</div></div><div class="row gap">${btn('Auto-assign')}${btn('Save assignments','primary')}</div></div><div class="assignment"><aside class="assignment-side"><div class="search" style="min-width:100%;margin-bottom:12px">${I('search')} Search departments</div>${[['All assignments','284 tasks'],['Facilities Engineering','48 tasks'],['Clinical Operations','42 tasks'],['Information Technology','37 tasks'],['Nursing','31 tasks'],['Regulatory Affairs','24 tasks'],['Support Services','21 tasks']].map((d,i)=>`<div class="dept-row ${i===1?'active':''}"><strong>${d[0]}</strong><span>${d[1]}</span></div>`).join('')}</aside><section class="assignment-main"><div class="row between" style="margin-bottom:18px"><div><h2>Facilities Engineering</h2><div class="sub">48 accountable tasks · 4 unassigned</div></div><button class="chip active">Show unassigned</button></div><table><thead><tr><th>Task</th><th>Due date</th><th>Accountable person</th><th>Status</th></tr></thead><tbody>${[['Emergency power testing','Jul 20','Michael Chen','Assigned'],['Life safety inspection','Jul 29','Michael Chen','Assigned'],['Complete air balancing report','Aug 07','Select person','Unassigned'],['Medical gas certification','Aug 12','Priya Shah','Assigned'],['Water management plan','Aug 19','Select person','Unassigned']].map(r=>`<tr><td class="task-name">${r[0]}</td><td>${r[1]}</td><td><div class="input" style="height:32px">${r[2]} <span>⌄</span></div></td><td>${r[3]==='Assigned'?'<span class="status complete">Assigned</span>':'<span class="status blocked">Unassigned</span>'}</td></tr>`).join('')}</tbody></table><div class="note" style="margin-top:18px"><strong>Assignment rule:</strong> Every task has one accountable department and may have one accountable individual. Supporting departments can view the task but cannot change its assignment.</div></section></div>`,true),
'leadership':()=>layout('Leadership Dashboard','leadership',`<div class="page-head"><div><div class="eyebrow">Portfolio readiness</div><h1>Leadership dashboard</h1><div class="sub">Operational readiness across active facility activation projects.</div></div><div class="row gap"><div class="input" style="width:190px">All campuses <span>⌄</span></div>${btn('Export brief')}</div></div><div class="grid metrics"><div class="metric"><div class="label">Active projects</div><div class="value">12</div><div class="hint">4 activating within 90 days</div></div><div class="metric good"><div class="label">On track</div><div class="value">7</div><div class="hint">58% of portfolio</div></div><div class="metric alert"><div class="label">Needs attention</div><div class="value">3</div><div class="hint">22 overdue critical tasks</div></div><div class="metric alert"><div class="label">At risk</div><div class="value">2</div><div class="hint">Executive intervention required</div></div></div><div class="chart-grid"><section class="panel"><div class="panel-head"><h2>Readiness by project</h2><span class="sub">Closest go-live dates</span></div><div class="panel-body"><div class="bar-chart">${[['Cardiac OR',93],['ED Modern.',86],['GP7 West',72],['Pharmacy',61],['Radiology',48],['Infusion',35]].map(x=>`<div class="bar-item"><div class="bar" style="height:${x[1]*1.55}px;background:${x[1]<50?'#b54627':'var(--red)'}"></div><label>${x[0]}<br><strong>${x[1]}%</strong></label></div>`).join('')}</div></div></section><section class="panel"><div class="panel-head"><h2>Task status</h2><span class="sub">2,846 total</span></div><div class="panel-body row" style="justify-content:center"><div class="donut"></div><div class="legend"><div><span class="dot" style="background:var(--green)"></span>Complete · 61%</div><div><span class="dot" style="background:var(--blue)"></span>In progress · 15%</div><div><span class="dot" style="background:#b54627"></span>Blocked · 10%</div><div><span class="dot" style="background:#d9dde0"></span>Not started · 14%</div></div></div></section></div><section class="panel" style="margin-top:18px"><div class="panel-head"><h2>Projects requiring attention</h2><button class="chip active">Critical items only</button></div><table><thead><tr><th>Project</th><th>Go-live</th><th>Readiness</th><th>Critical incomplete</th><th>Blocked</th><th>Health</th><th></th></tr></thead><tbody>${[['Cardiac OR Upgrade','Aug 18','93%','4','2','At Risk'],['GP7 West','Sep 15','72%','3','7','Attention'],['ED Modernization','Sep 28','86%','2','3','Attention'],['Radiology Expansion','Nov 02','48%','1','1','On Track']].map(r=>`<tr><td class="task-name">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${status(r[5])}</td><td>${I('chev')}</td></tr>`).join('')}</tbody></table></section>`),
'users':()=>layout('Users & departments','users',`<div class="page-head"><div><div class="eyebrow">Administration</div><h1>Users and departments</h1><div class="sub">Manage organizational access, roles, and task ownership.</div></div><div class="row gap">${btn('Add department')}${btn('Invite user','primary')}</div></div><div class="tabs"><div class="tab active">Users · 128</div><div class="tab">Departments · 18</div><div class="tab">Pending invitations · 4</div></div><div class="users-layout"><section class="panel"><div class="panel-head"><div class="search">${I('search')} Search users</div><button class="chip">Role: All</button></div><table><thead><tr><th>User</th><th>Department</th><th>Role</th><th>Active work</th><th>Status</th><th></th></tr></thead><tbody>${[['RM','Rafael Morel','Activation Management','Administrator','6 projects'],['MC','Michael Chen','Facilities Engineering','Contributor','48 tasks'],['PS','Priya Shah','Facilities Engineering','Project Manager','3 projects'],['AL','Alicia Lopez','Clinical Operations','Department Lead','42 tasks'],['JW','James Wilson','Executive Leadership','Leadership','Portfolio access']].map(r=>`<tr><td><div class="row gap"><div class="avatar">${r[0]}</div><div><div class="task-name">${r[1]}</div><div class="task-meta">${r[1].toLowerCase().replace(' ',' .')}@hospital.org</div></div></div></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${status('Complete').replace('Complete','Active')}</td><td>${I('chev')}</td></tr>`).join('')}</tbody></table></section><aside><section class="panel"><div class="panel-head"><h2>Department summary</h2></div><div class="panel-body department-list">${[['FE','Facilities Engineering','14 users'],['CO','Clinical Operations','21 users'],['IT','Information Technology','18 users'],['NU','Nursing','32 users'],['RA','Regulatory Affairs','9 users'],['SS','Support Services','17 users']].map(d=>`<div class="department"><div class="dept-icon">${d[0]}</div><strong style="font-size:11px">${d[1]}</strong><div class="task-meta">${d[2]}</div></div>`).join('')}</div></section></aside></div>`,true),
'activity':()=>layout('Activity History','activity',`<div class="page-head"><div><div class="eyebrow">Audit trail</div><h1>Activity history</h1><div class="sub">A complete record of status, assignment, and project changes.</div></div>${btn('Export activity')}</div><div class="activity-filter">${[['Project','All projects'],['Activity type','All activity'],['User or department','Everyone'],['Date range','Last 30 days']].map(f=>`<div class="field-block"><label>${f[0]}</label><div class="input">${f[1]} <span>⌄</span></div></div>`).join('')}</div><section class="panel"><div class="panel-head"><h2>Recent activity</h2><div class="search">${I('search')} Search activity</div></div><div class="panel-body timeline">${[['Status changed to Blocked','Michael Chen updated “Emergency power testing” from In Progress to Blocked.','GP7 West · Jul 21, 2026 at 9:42 AM'],['Task reassigned','Activation Admin reassigned “Life safety inspection” to Michael Chen.','GP7 West · Jul 20, 2026 at 3:16 PM'],['Project checklist published','284 applicable tasks were published to 12 departments.','GP7 West · Jul 18, 2026 at 10:05 AM'],['Due date changed','Priya Shah changed the due date for “Medical gas certification” from Aug 10 to Aug 12.','GP7 West · Jul 17, 2026 at 1:31 PM'],['Task marked complete','Alicia Lopez completed “Medical equipment inventory” and uploaded evidence.','ED Modernization · Jul 16, 2026 at 4:47 PM'],['User invited','James Wilson was invited with Leadership access.','Organization · Jul 15, 2026 at 11:22 AM']].map(e=>`<div class="event"><strong>${e[0]}</strong><p>${e[1]}</p><time>${e[2]}</time></div>`).join('')}</div></section>`,true)
};
const screenOrder=['sign-in','my-work','projects','project-overview','project-tasks','task-detail','admin-setup','task-library','assignments','leadership','users','activity'];
const screenLabels={'sign-in':'Sign in','my-work':'My Work dashboard','projects':'Projects list','project-overview':'Project overview','project-tasks':'Project tasks','task-detail':'Task details','admin-setup':'Admin project setup','task-library':'Task-library management','assignments':'Assignment management','leadership':'Leadership dashboard','users':'Users and departments','activity':'Activity history'};
let currentScreen='sign-in';
function navigate(screen){if(!screens[screen])return false;currentScreen=screen;render();return false}
function goScreen(step){const current=Math.max(0,screenOrder.indexOf(currentScreen));const next=(current+step+screenOrder.length)%screenOrder.length;navigate(screenOrder[next])}
function setRole(key){if(!roles[key])return false;currentRole=key;saveRole(key);currentScreen=roles[key].home;render();return false}
function toast(message){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function applyRoleContent(key){
  if(key==='projects'){
    const eyebrow=document.querySelector('.page-head .eyebrow');const sub=document.querySelector('.page-head .sub');const actions=document.querySelector('.page-head>div:last-child');
    if(currentRole==='admin'){if(eyebrow)eyebrow.textContent='Administration · 12 active projects';if(sub)sub.textContent='Create projects, control assignments, and monitor readiness across the organization.';if(actions)actions.insertAdjacentHTML('beforeend','<button class="button primary role-primary">Create project</button>');document.querySelectorAll('.project-stats span:first-of-type').forEach(x=>x.textContent='Total tasks')}
    if(currentRole==='leadership'){if(eyebrow)eyebrow.textContent='Leadership · Portfolio view';if(sub)sub.textContent='Review project health, opening dates, and the work driving portfolio risk.';document.querySelectorAll('.project-stats span:first-of-type').forEach(x=>x.textContent='Critical open')}
  }
  if(key==='project-tasks'&&currentRole==='team'){document.querySelectorAll('.page-head .button').forEach(x=>{if(x.textContent.includes('Add task'))x.remove()})}
  if(key==='task-detail'&&currentRole==='leadership'){
    const aside=document.querySelector('.detail-grid>aside');if(aside)aside.innerHTML='<div class="panel-head"><h2>Leadership view</h2></div><div class="panel-body"><div class="readonly-badge">Read-only access</div><p class="sub" style="margin-top:12px">Leadership can review the blocker, accountable owner, due date, and activity history. Task updates remain with the assigned project team.</p><div class="note" style="margin-top:16px"><strong>Escalation owner</strong><br>Priya Shah · Facilities Engineering</div><button class="button" style="width:100%;justify-content:center;margin-top:14px">Include in leadership brief</button></div>'
  }
  if(key==='task-detail'&&currentRole==='admin'){
    const heading=document.querySelector('.detail-grid>aside h2');if(heading)heading.textContent='Administrator controls';const fine=document.querySelector('.detail-grid>aside .fine');if(fine)fine.textContent='Administrators can update status, assignment, dates, and task details.'
  }
}
function drawTeamTracker(){
  const canvas=document.getElementById('team-workload-tracker');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const size=canvas.width;
  const center=size/2;
  const rings=[
    {radius:250,progress:.69,color:'#c8102e',rotation:-.27},
    {radius:205,progress:.73,color:'#ef172b',rotation:-.24},
    {radius:160,progress:.49,color:'#fb6268',rotation:-.23},
    {radius:115,progress:.17,color:'#f59ca0',rotation:-.22}
  ];
  ctx.clearRect(0,0,size,size);
  ctx.lineWidth=27;
  ctx.lineCap='round';
  rings.forEach(ring=>{
    ctx.beginPath();
    ctx.strokeStyle='#eef0f2';
    ctx.arc(center,center,ring.radius,0,Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle=ring.color;
    const start=-Math.PI/2+ring.rotation;
    ctx.arc(center,center,ring.radius,start,start+Math.PI*2*ring.progress);
    ctx.stroke();
  });
}
function wireTeamInteractions(){
  document.querySelectorAll('.team-metric').forEach(button=>button.onclick=()=>navigate(button.dataset.metric==='Assigned Projects'?'projects':'project-tasks'));
  const search=document.getElementById('team-search');
  if(search)search.addEventListener('keydown',event=>{if(event.key==='Enter')toast(search.value.trim()?`Searching for “${search.value.trim()}”`:'Enter a search term')});
  document.querySelectorAll('.calendar-nav').forEach(button=>button.onclick=event=>{
    event.stopPropagation();
    shiftCalendarMonth(button.dataset.calendarShift);
  });
  document.querySelectorAll('.calendar-days button').forEach(button=>button.onclick=()=>{
    document.querySelectorAll('.calendar-days button').forEach(day=>day.classList.remove('selected'));
    button.classList.add('selected');
  });
  const notification=document.querySelector('.team-notifications');
  if(notification)notification.onclick=()=>toast('3 new notifications');
  const add=document.querySelector('.agenda-add');
  if(add)add.onclick=()=>toast('Add calendar item — demo action');
}
function shiftCalendarMonth(delta){
  const month=document.getElementById('calendar-month');
  if(!month)return false;
  const months=['June 2026','July 2026','August 2026'];
  const current=Math.max(0,months.indexOf(month.textContent));
  month.textContent=months[Math.max(0,Math.min(months.length-1,current+Number(delta)))];
  return false;
}
function wireInteractions(){
  document.querySelectorAll('.project-card').forEach(el=>{el.setAttribute('tabindex','0');el.onclick=()=>navigate('project-overview')});
  document.querySelectorAll('tbody tr').forEach(el=>{if(currentScreen.includes('tasks')||currentScreen.includes('work'))el.onclick=()=>navigate('task-detail')});
  document.querySelectorAll('.chip').forEach(el=>el.onclick=e=>{const group=e.currentTarget.parentElement;if(group&&group.classList.contains('filters')){group.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));e.currentTarget.classList.add('active')}});
  const normalLogin=document.querySelector('.login-button');if(normalLogin)normalLogin.onclick=()=>setRole(currentRole);
  document.querySelectorAll('.button').forEach(el=>{if(el.classList.contains('role-primary'))el.onclick=()=>navigate('admin-setup');else if(el.textContent.includes('Return to tasks')||el.textContent.includes('View all my tasks'))el.onclick=()=>navigate('project-tasks');else el.onclick=()=>toast(`${el.textContent.trim()} — demo action`)})
  wireTeamInteractions();
}
function render(){const key=screens[currentScreen]?currentScreen:'sign-in';document.documentElement.dataset.role=currentRole;document.getElementById('app').innerHTML=screens[key]();applyRoleContent(key);wireInteractions();drawTeamTracker()}
function handleAppNavigation(event){
  const roleControl=event.target.closest('[data-role]');
  if(roleControl){event.preventDefault();setRole(roleControl.dataset.role);return}
  const screenControl=event.target.closest('[data-screen]');
  if(screenControl){event.preventDefault();navigate(screenControl.dataset.screen)}
}
document.addEventListener('click',handleAppNavigation);
window.navigate=navigate;
window.setRole=setRole;
window.shiftCalendarMonth=shiftCalendarMonth;
render();
