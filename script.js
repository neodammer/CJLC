document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navLinks = Array.from(document.querySelectorAll('.primary-nav a'));

function updateHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
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
    if (window.innerWidth > 840) closeMenu();
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
