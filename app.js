(() => {
  'use strict';

  const raw = {
    owner: 'PETROVA ALEKSANDRA / ABRITALIN BORIS',
    phone: '+7 960 471 4320',
    email: 'alexandrapetrova@mail.ru',
    species: 'cat',
    breed: 'Mix',
    sex: 'male',
    petName: 'Salem',
    birthDate: '08.12.2021',
    identification: 'microchip, 900136004019214',
    vaccinationRu: 'Rabifel (Rabifel), серия №A218A03, дата введения: 11.06.2025',
    vaccinationEn: 'Rabifel (Rabifel), batch No. A218A03, vaccination date: 11.06.2025',
    bloodDate: '05.07.2025',
    bloodPlace: 'Russia, Moscow / IP Rayfshnayder A.V',
    protocolNumber: 'RU-077/R-25003386',
    protocolDate: '10.07.2025',
    testNumber: '84698',
    testDate: '10.07.2025',
    resultRu: 'Положительный поствакцинальный, точное значение 2.62 IU/ml',
    resultEn: 'Positive post-vaccination, exact value 2.62 IU/ml'
  };

  const maskedPhone = `******${raw.phone.replace(/\D/g, '').slice(-4)}`;
  const emailParts = raw.email.split('@');
  const maskedEmail = `${emailParts[0].slice(0, 3)}*****@${emailParts[1]}`;

  const ui = {
    ru: {
      locale: 'RU-RU', titlePrefix: 'Протокол № ',
      nav: ['Вывоз за границу', 'Получить инструкцию', 'Протоколы исследований'],
      exportMenu: ['Создать заявку', 'Поиск заявки'], home: 'Главная',
      sections: ['Владелец животного', 'Сведения о животном', 'Результат исследования'],
      labels: ['ФИО','Контактный телефон','E-mail','Вид животного','Порода','Пол','Кличка','Дата рождения','Сведения об идентификации','Вакцинации от бешенства','Дата отбора крови','Место отбора крови','Протокол исследований','Статус протокола','Номер экспертизы','Дата экспертизы','Результат исследования'],
      status: 'Оформлен', protocolDateJoiner: ' от ',
      footer1: 'Версия 2.1.1 © 2026 Федеральная служба ветеринарного и фитосанитарного надзора (Россельхознадзор)',
      footer2: 'По вопросам технической поддержки обращайтесь по адресу ',
      vaccination: raw.vaccinationRu, result: raw.resultRu,
      mobileMenuAria: 'Меню', backTopAria: 'Наверх'
    },
    en: {
      locale: 'EN-US', titlePrefix: 'Protocol No. ',
      nav: ['Export abroad', 'Get instructions', 'Research protocols'],
      exportMenu: ['Create application', 'Search application'], home: 'Home',
      sections: ['Animal owner', 'Animal details', 'Research result'],
      labels: ['Full name','Contact phone','E-mail','Animal species','Breed','Sex','Name','Date of birth','Identification','Rabies vaccination','Blood sampling date','Blood sampling place','Research protocol','Protocol status','Examination number','Examination date','Research result'],
      status: 'Completed', protocolDateJoiner: ' dated ',
      footer1: 'Version 2.1.1 © 2026 Federal Service for Veterinary and Phytosanitary Supervision (Rosselkhoznadzor)',
      footer2: 'For technical support, please contact ',
      vaccination: raw.vaccinationEn, result: raw.resultEn,
      mobileMenuAria: 'Menu', backTopAria: 'Back to top'
    }
  };

  const fieldValue = (key, lang) => {
    if (key === 'phone') return maskedPhone;
    if (key === 'email') return maskedEmail;
    if (key === 'vaccination') return ui[lang].vaccination;
    if (key === 'result') return ui[lang].result;
    return raw[key] ?? '—';
  };

  function setTextPreserveIcon(el, text) {
    if (!el) return;
    const icon = el.querySelector('i');
    el.textContent = '';
    if (icon) { el.appendChild(icon); el.appendChild(document.createTextNode(' ')); }
    el.appendChild(document.createTextNode(text));
  }

  function applyLanguage(lang) {
    const t = ui[lang] || ui.ru;
    document.documentElement.lang = lang === 'en' ? 'en' : 'ru';
    document.querySelectorAll('[data-field]').forEach((node) => { node.textContent = fieldValue(node.getAttribute('data-field'), lang); });
    const localeButton = document.getElementById('localeButton'); if (localeButton) localeButton.textContent = t.locale;
    [document.querySelector('#exportButton span'), document.querySelectorAll('.tool-link span')[0], document.querySelectorAll('.tool-link span')[1]].forEach((el, i) => { if (el) el.textContent = t.nav[i]; });
    document.querySelectorAll('.mobile-drawer a').forEach((el, i) => setTextPreserveIcon(el, t.nav[i]));
    document.querySelectorAll('.export-menu a').forEach((el, i) => { if (t.exportMenu[i]) el.textContent = t.exportMenu[i]; });
    const crumbHome = document.querySelector('.crumbbar > a'); if (crumbHome) crumbHome.textContent = t.home;
    const crumbProtocol = document.querySelector('.crumbbar > span:last-child'); if (crumbProtocol && crumbProtocol.firstChild) crumbProtocol.firstChild.nodeValue = t.titlePrefix;
    const h1 = document.querySelector('.page h1'); if (h1 && h1.firstChild) h1.firstChild.nodeValue = t.titlePrefix;
    document.querySelectorAll('.protocol-section h2').forEach((el, i) => { if (t.sections[i]) el.textContent = t.sections[i]; });
    document.querySelectorAll('.label').forEach((el, i) => { if (t.labels[i]) el.textContent = t.labels[i]; });
    const protocolRowValue = document.querySelector('.protocol-row .value > div');
    if (protocolRowValue) protocolRowValue.innerHTML = `<span data-field="protocolNumber">${raw.protocolNumber}</span>${t.protocolDateJoiner}<span data-field="protocolDate">${raw.protocolDate}</span>`;
    const status = document.querySelector('.result-section .row:nth-child(2) .value'); if (status) status.textContent = t.status;
    const footer = document.querySelectorAll('.footer p');
    if (footer[0]) footer[0].textContent = t.footer1;
    if (footer[1]) footer[1].innerHTML = `${t.footer2}<a href="mailto:ecert@fsvps.ru">ecert@fsvps.ru</a>`;
    const mobileButton = document.getElementById('mobileMenuButton'); if (mobileButton) mobileButton.setAttribute('aria-label', t.mobileMenuAria);
    const backTop = document.getElementById('backTop'); if (backTop) backTop.setAttribute('aria-label', t.backTopAria);
    const emailLink = document.getElementById('ownerEmail'); if (emailLink) emailLink.href = `mailto:${raw.email}`;
    document.title = `${t.titlePrefix}${raw.protocolNumber} — ECert.Питомцы`;
    localStorage.setItem('ecert-lang', lang);
  }

  const menus = [
    { button: document.getElementById('appSwitch'), menu: document.getElementById('appMenu') },
    { button: document.getElementById('exportButton'), menu: document.getElementById('exportMenu') },
    { button: document.getElementById('localeButton'), menu: document.getElementById('localeMenu') },
    { button: document.getElementById('mobileMenuButton'), menu: document.getElementById('mobileDrawer') }
  ].filter((item) => item.button && item.menu);

  function closeAll(except) {
    menus.forEach(({ button, menu }) => { if (except && menu === except) return; menu.hidden = true; button.setAttribute('aria-expanded', 'false'); });
  }
  menus.forEach(({ button, menu }) => {
    button.addEventListener('click', (event) => { event.stopPropagation(); const opening = menu.hidden; closeAll(menu); menu.hidden = !opening; button.setAttribute('aria-expanded', opening ? 'true' : 'false'); });
    menu.addEventListener('click', (event) => event.stopPropagation());
  });
  document.querySelectorAll('#localeMenu a').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); applyLanguage(link.textContent.trim().startsWith('EN') ? 'en' : 'ru'); closeAll(); }));
  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAll(); });

  const backTop = document.getElementById('backTop');
  if (backTop) {
    const syncBackTop = () => backTop.classList.toggle('visible', window.scrollY > 360);
    window.addEventListener('scroll', syncBackTop, { passive: true }); syncBackTop();
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  applyLanguage(localStorage.getItem('ecert-lang') === 'en' ? 'en' : 'ru');
})();
