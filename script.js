document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navLinks = Array.from(document.querySelectorAll('.primary-nav a'));
const backToTop = document.querySelector('[data-back-to-top]');
const currentNavigation = document.body.dataset.nav;

if (currentNavigation) {
  navLinks.forEach(function (link) {
    const isCurrent = link.dataset.navLink === currentNavigation;
    link.classList.toggle('active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
  });
}

function updateHeader() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 700);
}

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', function () {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) closeMenu();
  });
}

if (backToTop) {
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px' });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add('visible');
  });
}

const observedSections = Array.from(document.querySelectorAll('main section[id]'));
if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(function (entries) {
    const visibleEntry = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

    if (!visibleEntry) return;
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + visibleEntry.target.id);
    });
  }, { rootMargin: '-20% 0px -62%', threshold: [0.05, 0.2] });

  observedSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projectRows = document.querySelectorAll('[data-location]');
filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const selected = button.dataset.filter;
    filterButtons.forEach(function (candidate) {
      candidate.classList.toggle('active', candidate === button);
    });
    projectRows.forEach(function (row) {
      row.hidden = selected !== 'all' && row.dataset.location !== selected;
    });
  });
});

const requestedProjectFilter = new URLSearchParams(window.location.search).get('filter');
if (requestedProjectFilter && filterButtons.length) {
  const requestedButton = Array.from(filterButtons).find(function (button) { return button.dataset.filter === requestedProjectFilter; });
  if (requestedButton) requestedButton.click();
}

const divisionDetails = {
  coin: {
    number: '01',
    title: 'Green Coin Tech',
    lead: 'A technology-led project-finance platform intended to help mobilise capital for qualified Green Group ventures.',
    focus: ['Project-linked funding structures', 'Digital transparency and controls', 'Capital support for green ventures'],
    role: 'Supports project-establishment pathways by connecting finance strategy, governance and qualified opportunities. Any investment structure remains subject to legal and financial review.'
  },
  agriculture: {
    number: '02',
    title: 'Green Agriculture',
    lead: 'Integrated agricultural systems designed to create durable revenue while improving land use, food production and resource efficiency.',
    focus: ['Bamboo and coconut plantations', 'Aquaponics and hydroponics', 'Integrated livestock and crop systems'],
    role: 'Provides the agricultural operating layer for agro-voltaic, circular-economy and food-production projects across Mauritius and regional markets.'
  },
  power: {
    number: '03',
    title: 'Green Power',
    lead: 'Clean, reliable power generation built around practical technologies and commercially disciplined delivery.',
    focus: ['Biogas and biochar baseload power', 'Solar agro-voltaic generation', 'Municipal waste-to-energy'],
    role: 'Leads energy project design and establishment, working with CJLC on finance, EPCM, approvals, commissioning and operating readiness.'
  },
  coal: {
    number: '04',
    title: 'Green Coal Technologies',
    lead: 'Resource-recovery and environmental-rehabilitation solutions for legacy coal slurry and discard deposits.',
    focus: ['Slurry reclamation', 'Discard-dump rehabilitation', 'Coal wash and resource recovery'],
    role: 'Turns legacy waste liabilities into potential recoverable resources while establishing a structured pathway for site restoration.'
  },
  water: {
    number: '05',
    title: 'Green Water',
    lead: 'Water-management and reclamation systems designed for industrial, agricultural and community applications.',
    focus: ['Wastewater treatment', 'Water reclamation and reuse', 'Operational sanitation systems'],
    role: 'Integrates water security into projects so that power, agriculture and industry can operate with more responsible resource cycles.'
  },
  medicinals: {
    number: '06',
    title: 'Green Medicinals',
    lead: 'Sustainable cultivation and processing of plant-based natural health products aligned with the wider green economy.',
    focus: ['Organic cultivation systems', 'Plant-based product processing', 'Responsible value-chain development'],
    role: 'Develops natural-medicine opportunities using disciplined agricultural, production and commercial frameworks.'
  }
};

const divisionPageDetails = {
  coin: {
    number: '01',
    title: 'Green Coin Tech',
    logo: 'assets/green-coin-tech.png',
    logoClass: 'dark-logo',
    lead: 'A technology-led project-finance platform intended to help mobilise capital for qualified Green Group ventures.',
    statement: 'Connecting disciplined project selection with transparent funding pathways.',
    overview: 'Green Coin Tech is positioned as the finance-enablement division within The Green Group. Its role is to support qualified ventures with structured project-finance mechanisms, digital controls and clear governance.',
    focus: [
      ['Funding architecture', 'Project-linked structures developed around qualified ventures and defined establishment requirements.'],
      ['Digital governance', 'Transparent controls and reporting intended to strengthen accountability throughout the funding process.'],
      ['Project alignment', 'Coordination with CJLC technical, commercial, legal and due-diligence workstreams.']
    ],
    facts: [['Role', 'Project-finance enablement'], ['Interface', 'CJLC and all Green Group divisions'], ['Stage', 'Subject to legal and financial review']],
    related: [['Investment process', 'investment-opportunities.html', 'Understand the qualification, review and enquiry pathway.'], ['Project portfolio', 'projects.html', 'Explore the ventures that may require structured project finance.'], ['Contact the team', 'contact.html?interest=Green%20Coin%20Tech', 'Request a discussion with CJLC.']]
  },
  agriculture: {
    number: '02',
    title: 'Green Agriculture',
    logo: 'assets/green-agriculture.png',
    lead: 'Integrated agricultural systems designed to create durable value while improving land use, food production and resource efficiency.',
    statement: 'Productive landscapes designed as part of a wider circular green economy.',
    overview: 'Green Agriculture brings together plantation, controlled-environment agriculture and integrated farming concepts. It provides the agricultural layer for stand-alone ventures and combined systems such as solar agro-voltaic development.',
    focus: [
      ['Plantation systems', 'Bamboo and coconut concepts developed around productive land use and long-term operating value.'],
      ['Controlled agriculture', 'Hydroponic and aquaponic systems intended to improve resource efficiency and production control.'],
      ['Integrated operations', 'Livestock, crop and energy interfaces considered as a coordinated project system.']
    ],
    facts: [['Primary market', 'Mauritius and regional opportunities'], ['Project interface', 'Green Power and Green Water'], ['Development model', 'Feasibility-led and scalable']],
    related: [['Agriculture projects', 'projects.html?filter=mauritius', 'View plantation and controlled-agriculture opportunities.'], ['Green Power', 'division.html?division=power', 'Explore the energy layer supporting integrated projects.'], ['Discuss a project', 'contact.html?interest=Green%20Agriculture', 'Contact CJLC about an agricultural venture.']]
  },
  power: {
    number: '03',
    title: 'Green Power',
    logo: 'assets/green-power.png',
    lead: 'Clean, reliable power generation built around practical technologies and commercially disciplined delivery.',
    statement: 'Turning proven generation concepts into investable, commissioned infrastructure.',
    overview: 'Green Power leads the energy component of The Green Group portfolio. CJLC supports each opportunity through feasibility, finance, approvals, EPCM delivery, commissioning and operating readiness.',
    focus: [
      ['Biogas and biochar', 'Baseload generation concepts that combine energy production with circular resource use.'],
      ['Solar agro-voltaic', 'Solar generation planned alongside productive agricultural land use.'],
      ['Waste-to-energy', 'Municipal waste-recovery concepts developed around responsible processing and generation.']
    ],
    facts: [['Portfolio', 'Biogas, solar and waste-to-energy'], ['Delivery', 'CJLC EPCM framework'], ['Project stage', 'Planned and subject to approvals']],
    related: [['Energy projects', 'projects.html?filter=mauritius', 'Explore the current Green Power pipeline.'], ['Green Agriculture', 'division.html?division=agriculture', 'See how agriculture integrates with agro-voltaic projects.'], ['Discuss energy', 'contact.html?interest=Green%20Power', 'Start a conversation with the project team.']]
  },
  coal: {
    number: '04',
    title: 'Green Coal Technologies',
    logo: 'assets/green-coal-technologies.png',
    lead: 'Resource-recovery and environmental-rehabilitation solutions for legacy coal slurry and discard deposits.',
    statement: 'A structured pathway from legacy mining liability to recovery and rehabilitation.',
    overview: 'Green Coal Technologies focuses on recovering usable resources from legacy slurry and discard deposits while integrating site rehabilitation into the project model.',
    focus: [
      ['Slurry reclamation', 'Assessment and recovery pathways for historical coal slurry deposits.'],
      ['Resource recovery', 'Processing concepts intended to recover residual value from legacy materials.'],
      ['Site rehabilitation', 'Environmental restoration considered as part of the project lifecycle.']
    ],
    facts: [['Primary market', 'Southern and East Africa'], ['Project type', 'Legacy resource recovery'], ['Status', 'Pipeline and review']],
    related: [['Koornfontein project', 'project.html?project=koornfontein', 'Review the South African pipeline opportunity.'], ['Jitegemee project', 'project.html?project=jitegemee', 'Review the regional coal-wash concept.'], ['Discuss reclamation', 'contact.html?interest=Green%20Coal%20Technologies', 'Contact the projects team.']]
  },
  water: {
    number: '05',
    title: 'Green Water',
    logo: 'assets/green-water.png',
    lead: 'Water-management and reclamation systems designed for industrial, agricultural and community applications.',
    statement: 'Responsible water cycles that strengthen the resilience of every connected project.',
    overview: 'Green Water integrates treatment, reclamation and operational sanitation into wider Green Group ventures, supporting more responsible water use across agriculture, industry and communities.',
    focus: [
      ['Wastewater treatment', 'Project-specific treatment concepts developed around water quality and operating needs.'],
      ['Reclamation and reuse', 'Responsible reuse pathways that can reduce pressure on fresh-water resources.'],
      ['Operational systems', 'Practical sanitation and control systems designed for reliable day-to-day operation.']
    ],
    facts: [['Applications', 'Agriculture, industry and communities'], ['Project interface', 'Power, Agriculture and Medicinals'], ['Approach', 'Fit-for-purpose treatment and reuse']],
    related: [['Green Agriculture', 'division.html?division=agriculture', 'See where responsible water use supports production.'], ['Green Medicinals', 'division.html?division=medicinals', 'Explore sustainable cultivation and processing.'], ['Discuss water', 'contact.html?interest=Green%20Water', 'Contact CJLC about a water-management need.']]
  },
  medicinals: {
    number: '06',
    title: 'Green Medicinals',
    logo: 'assets/green-medicinals.png',
    lead: 'Sustainable cultivation and processing of plant-based natural-health products aligned with the wider green economy.',
    statement: 'Responsible cultivation and value-chain development for plant-based natural health.',
    overview: 'Green Medicinals develops plant-based cultivation and processing opportunities using disciplined agricultural, operating and commercial frameworks.',
    focus: [
      ['Cultivation systems', 'Responsible growing concepts aligned with available land, water and operating requirements.'],
      ['Product processing', 'Structured pathways from cultivated material to appropriately controlled products.'],
      ['Value-chain development', 'Commercial and operational planning across production, processing and market readiness.']
    ],
    facts: [['Sector', 'Plant-based natural health'], ['Project interface', 'Agriculture and Water'], ['Model', 'Cultivation through processing']],
    related: [['Green Agriculture', 'division.html?division=agriculture', 'Explore the agricultural capabilities behind cultivation.'], ['Green Water', 'division.html?division=water', 'See how water stewardship supports production.'], ['Discuss medicinals', 'contact.html?interest=Green%20Medicinals', 'Contact CJLC about this division.']]
  }
};

const projectPageDetails = {
  'biogas-biochar': {
    number: '01', title: '2MW Biogas Biochar Power Plant', division: 'Green Power', location: 'Mauritius', capex: '$3.9M', status: 'Planned',
    lead: 'A planned baseload renewable-energy project combining biogas generation and biochar production.',
    overview: 'The concept is positioned within the Green Power portfolio as a compact baseload-generation opportunity. Development remains subject to feasibility, site confirmation, approvals, finance and final technical design.',
    scope: ['Confirm feedstock, site and technology basis', 'Complete technical, environmental and commercial feasibility', 'Structure finance, EPCM delivery and operating readiness']
  },
  'st-avold': {
    number: '02', title: '40MW St Avold Solar Agro-Voltaic', division: 'Green Power + Green Agriculture', location: 'Mauritius', capex: '$53M', status: 'Planned',
    lead: 'A planned solar generation project designed to integrate renewable power with productive agricultural land use.',
    overview: 'The St Avold concept brings Green Power and Green Agriculture together in a single agro-voltaic development model. Listed figures are indicative and require validation through feasibility, approvals and due diligence.',
    scope: ['Validate site, grid and solar resource assumptions', 'Define the agricultural layer and land-use integration', 'Advance approvals, finance and EPCM planning']
  },
  chicose: {
    number: '03', title: 'Chicose Landfill Waste-to-Energy', division: 'Green Power', location: 'Mauritius', capex: '$16M estimated', status: 'Planned',
    lead: 'A municipal waste-recovery concept intended to convert suitable landfill material into useful energy.',
    overview: 'The project is presented as a planned Green Power opportunity. Technology selection, available resource, environmental controls, permissions and commercial arrangements require project-specific verification.',
    scope: ['Characterise the available waste resource', 'Select an appropriate technology and environmental-control basis', 'Confirm approvals, commercial model and implementation plan']
  },
  'bamboo-coconut': {
    number: '04', title: 'Bamboo & Coconut Plantation', division: 'Green Agriculture', location: 'Mauritius', capex: 'To be confirmed', status: 'Feasibility',
    lead: 'A proposed integrated plantation concept covering bamboo and coconut production across approximately 40 hectares.',
    overview: 'The concept forms part of the Green Agriculture pipeline. Land suitability, water, crop selection, market pathways, capex and implementation timing remain subject to feasibility work.',
    scope: ['Confirm land, water and cultivation requirements', 'Validate crop, yield and market assumptions', 'Develop the operating, finance and phased-establishment plan']
  },
  aquaponics: {
    number: '05', title: 'Aquaponics, Hydroponics & Livestock', division: 'Green Agriculture', location: 'Mauritius', capex: 'To be confirmed', status: 'Feasibility',
    lead: 'An integrated controlled-agriculture and livestock concept proposed for a 40-hectare operating system.',
    overview: 'The project is intended to coordinate controlled-environment agriculture, livestock and resource cycles. Technical configuration and commercial assumptions remain at feasibility stage.',
    scope: ['Define production systems and operating interfaces', 'Assess water, energy and biosecurity requirements', 'Validate markets, capex and phased implementation']
  },
  koornfontein: {
    number: '06', title: 'Koornfontein Mine Slurry Reclamation', division: 'Green Coal Technologies', location: 'South Africa', capex: 'Under review', status: 'Pipeline',
    lead: 'A resource-recovery and rehabilitation opportunity associated with legacy mine slurry.',
    overview: 'The project is included in the Green Coal Technologies pipeline. Resource characterisation, recovery technology, rights, environmental responsibilities and economics require formal review.',
    scope: ['Characterise the resource and confirm project rights', 'Define recovery, processing and rehabilitation methods', 'Complete technical, legal, environmental and financial due diligence']
  },
  jitegemee: {
    number: '07', title: 'Jitegemee Coal Wash Plant & Mining', division: 'Green Coal Technologies', location: 'Tanzania', capex: 'Under review', status: 'Pipeline',
    lead: 'A regional coal-wash and mining concept included in the five-year project pipeline.',
    overview: 'The opportunity is at pipeline stage. Resource, ownership, permissions, infrastructure, processing and commercial assumptions require independent verification before commitment.',
    scope: ['Verify resource, ownership and permitting basis', 'Confirm processing, logistics and infrastructure requirements', 'Complete commercial, environmental and funding reviews']
  },
  'adi-campus': {
    number: '08', title: 'ADI Green Campus', division: 'Education and sustainable development', location: 'Mauritius', capex: '$90M', status: 'Concept',
    lead: 'A proposed education campus concept designed around sustainable infrastructure and long-term institutional use.',
    overview: 'The ADI Green Campus is presented as a concept-stage project in the five-year plan. Scope, site, institutional partnerships, approvals, programme and listed capex require confirmation.',
    scope: ['Confirm academic, institutional and site requirements', 'Develop the campus, sustainability and infrastructure brief', 'Validate capex, delivery phases, approvals and finance']
  }
};

const profilePageDetails = {
  'colin-lotter': {
    name: 'Colin Lotter', role: 'Managing Director', viewBox: '97 22 102 130',
    lead: 'Business leadership, engineering insight and project-development experience spanning more than three decades.',
    overview: 'Colin brings experience as a business owner together with qualifications in electrical and mechanical engineering. His background includes coal and carbon applications, electricity generation and emerging green technologies, with a focus on establishing practical and sustainable project solutions.',
    strengths: ['Business leadership', 'Electrical engineering', 'Mechanical engineering', 'Power generation', 'Carbon applications', 'Green project development']
  },
  'bianka-louw': {
    name: 'Bianka Louw', role: 'Company Secretary', viewBox: '459 22 109 128',
    lead: 'Operational governance and business systems informed by experience across water, sanitation and sustainable rehabilitation.',
    overview: 'Bianka has more than 15 years of experience covering water management, sanitation, natural medicines, sustainable rehabilitation, business management and administration. Her work supports practical controls, digital systems and efficient day-to-day operations.',
    strengths: ['Company administration', 'Operational controls', 'Water management', 'Sanitation', 'Sustainable rehabilitation', 'Business systems']
  },
  'rajiv-adjodha': {
    name: 'Rajiv Adjodha', role: 'Commercial Director', viewBox: '105 500 95 112',
    lead: 'Commercial and project experience across operations, technology infrastructure and renewable-energy innovation.',
    overview: 'Rajiv brings more than 15 years of experience in project management, operations and IT infrastructure. His background also includes renewable-energy innovation and science and technology recognition at national and international level.',
    strengths: ['Commercial strategy', 'Project management', 'Operations', 'IT infrastructure', 'Renewable energy', 'Innovation']
  },
  'gerald-grenade': {
    name: 'Gerald Grenade', role: 'Projects Director', viewBox: '449 500 136 112',
    lead: 'Professional engineering leadership informed by more than four decades of industrial and commissioning experience.',
    overview: 'Gerald is a registered Professional Engineer in Mauritius with more than 40 years of experience in electrical and electronics engineering. His background includes complex industrial projects, implementation and commissioning.',
    strengths: ['Professional engineering', 'Electrical engineering', 'Electronics', 'Industrial projects', 'Commissioning', 'Project delivery']
  }
};

function populateList(selector, items) {
  const list = document.querySelector(selector);
  if (!list) return;
  list.replaceChildren();
  items.forEach(function (item) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

const divisionPage = document.querySelector('[data-division-page]');
if (divisionPage) {
  const key = new URLSearchParams(window.location.search).get('division') || 'coin';
  const details = divisionPageDetails[key] || divisionPageDetails.coin;
  document.title = details.title + ' | The Green Group';
  document.querySelectorAll('[data-division-title]').forEach(function (node) { node.textContent = details.title; });
  document.querySelectorAll('[data-division-number]').forEach(function (node) { node.textContent = details.number; });
  document.querySelectorAll('[data-division-lead]').forEach(function (node) { node.textContent = details.lead; });
  document.querySelectorAll('[data-division-statement]').forEach(function (node) { node.textContent = details.statement; });
  document.querySelectorAll('[data-division-overview]').forEach(function (node) { node.textContent = details.overview; });
  const logo = document.querySelector('[data-division-logo]');
  if (logo) { logo.src = details.logo; logo.alt = details.title + ' logo'; }
  const aside = document.querySelector('[data-division-aside]');
  if (aside) aside.classList.toggle('dark-logo', details.logoClass === 'dark-logo');
  document.querySelectorAll('[data-division-contact]').forEach(function (link) { link.href = 'contact.html?interest=' + encodeURIComponent(details.title); });

  const focusGrid = document.querySelector('[data-division-focus]');
  if (focusGrid) {
    focusGrid.replaceChildren();
    details.focus.forEach(function (item, index) {
      const card = document.createElement('article');
      card.className = 'content-card reveal visible';
      card.innerHTML = '<span class="content-card-number">0' + (index + 1) + '</span><h3></h3><p></p>';
      card.querySelector('h3').textContent = item[0];
      card.querySelector('p').textContent = item[1];
      focusGrid.appendChild(card);
    });
  }

  const factStrip = document.querySelector('[data-division-facts]');
  if (factStrip) {
    factStrip.replaceChildren();
    details.facts.forEach(function (item) {
      const fact = document.createElement('div');
      fact.innerHTML = '<strong></strong><span></span>';
      fact.querySelector('strong').textContent = item[0];
      fact.querySelector('span').textContent = item[1];
      factStrip.appendChild(fact);
    });
  }

  const relatedGrid = document.querySelector('[data-division-related]');
  if (relatedGrid) {
    relatedGrid.replaceChildren();
    details.related.forEach(function (item) {
      const link = document.createElement('a');
      link.className = 'link-card';
      link.href = item[1];
      link.innerHTML = '<small>Continue exploring</small><div><h3></h3><p></p></div><span aria-hidden="true">↗</span>';
      link.querySelector('h3').textContent = item[0];
      link.querySelector('p').textContent = item[2];
      relatedGrid.appendChild(link);
    });
  }
}

const projectPage = document.querySelector('[data-project-page]');
if (projectPage) {
  const key = new URLSearchParams(window.location.search).get('project') || 'biogas-biochar';
  const details = projectPageDetails[key] || projectPageDetails['biogas-biochar'];
  document.title = details.title + ' | CJL Consulting Projects';
  ['title', 'number', 'lead', 'division', 'location', 'capex', 'status', 'overview'].forEach(function (field) {
    document.querySelectorAll('[data-project-' + field + ']').forEach(function (node) { node.textContent = details[field]; });
  });
  populateList('[data-project-scope]', details.scope);
  const enquiry = document.querySelector('[data-project-enquiry]');
  if (enquiry) enquiry.href = 'contact.html?interest=' + encodeURIComponent(details.title);
}

const profilePage = document.querySelector('[data-profile-page]');
if (profilePage) {
  const key = new URLSearchParams(window.location.search).get('person') || 'colin-lotter';
  const details = profilePageDetails[key] || profilePageDetails['colin-lotter'];
  document.title = details.name + ' | CJL Consulting Management';
  document.querySelectorAll('[data-profile-name]').forEach(function (node) { node.textContent = details.name; });
  document.querySelectorAll('[data-profile-role]').forEach(function (node) { node.textContent = details.role; });
  document.querySelectorAll('[data-profile-lead]').forEach(function (node) { node.textContent = details.lead; });
  document.querySelectorAll('[data-profile-overview]').forEach(function (node) { node.textContent = details.overview; });
  const photo = document.querySelector('[data-profile-photo]');
  if (photo) photo.setAttribute('viewBox', details.viewBox);
  const strengths = document.querySelector('[data-profile-strengths]');
  if (strengths) {
    strengths.replaceChildren();
    details.strengths.forEach(function (item) {
      const strength = document.createElement('span');
      strength.textContent = item;
      strengths.appendChild(strength);
    });
  }
}

const interestSelect = document.querySelector('select[name="interest"]');
if (interestSelect) {
  const requestedInterest = new URLSearchParams(window.location.search).get('interest');
  if (requestedInterest) {
    const matchingOption = Array.from(interestSelect.options).find(function (option) { return option.text === requestedInterest || option.value === requestedInterest; });
    if (matchingOption) interestSelect.value = matchingOption.value;
  }
}

const divisionDialog = document.querySelector('[data-division-dialog]');
if (divisionDialog) {
  const dialogNumber = divisionDialog.querySelector('[data-dialog-number]');
  const dialogTitle = divisionDialog.querySelector('[data-dialog-title]');
  const dialogLead = divisionDialog.querySelector('[data-dialog-lead]');
  const dialogFocus = divisionDialog.querySelector('[data-dialog-focus]');
  const dialogRole = divisionDialog.querySelector('[data-dialog-role]');
  const dialogClose = divisionDialog.querySelector('[data-dialog-close]');
  const dialogContact = divisionDialog.querySelector('[data-dialog-contact]');

  document.querySelectorAll('[data-division]').forEach(function (button) {
    button.addEventListener('click', function () {
      const details = divisionDetails[button.dataset.division];
      if (!details) return;
      dialogNumber.textContent = details.number;
      dialogTitle.textContent = details.title;
      dialogLead.textContent = details.lead;
      dialogRole.textContent = details.role;
      dialogFocus.replaceChildren();
      details.focus.forEach(function (item) {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        dialogFocus.appendChild(listItem);
      });
      divisionDialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  function closeDialog() {
    divisionDialog.close();
    document.body.style.overflow = '';
  }

  dialogClose.addEventListener('click', closeDialog);
  dialogContact.addEventListener('click', closeDialog);
  divisionDialog.addEventListener('click', function (event) {
    const box = divisionDialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) closeDialog();
  });
  divisionDialog.addEventListener('close', function () {
    document.body.style.overflow = '';
  });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
