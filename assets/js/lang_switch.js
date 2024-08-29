import { setCookie, getCookie } from './utils.js';

const enLoc = 'en';
const ruLoc = 'ru';
let loca = window.location.pathname.split('/');

if (getCookie('lang') === undefined && loca[1] === enLoc) {
  setCookie('lang', enLoc, { secure: true });
  switchLocation(enLoc);
} else if ((getCookie('lang') === undefined || getCookie('lang') === enLoc) && loca[1] !== enLoc) {
  setCookie('lang', ruLoc, { secure: true });
  switchLocation(ruLoc);
}


function switchLocation(lang) {
  let currentPath = window.location.pathname;
  let host = window.location.hostname;
  
  if (lang === 'en' && !currentPath.startsWith('/en')) {
    window.location.assign('//' + host + '/en' + currentPath);
  } else if (lang === 'ru' && currentPath.startsWith('/en')) {
    window.location.assign('//' + host + currentPath.replace('/en', ''));
  }
}

function switchLanguage(lang) {
  langSwitcherSwitches.forEach((langSwitcherSwitch, index) => {
    const langRu = langSwitchers[index].querySelector('[data-lang="ru"]');
    const langEn = langSwitchers[index].querySelector('[data-lang="en"]');

    if (lang === 'ru') {
      langSwitcherSwitch.classList.add('header-lang__switch--right');
      langRu.classList.remove('header-lang__lang--active');
      langEn.classList.add('header-lang__lang--active');
      setCookie('lang', 'en', { secure: true });
      setTimeout(() => {
        switchLocation(enLoc);
      }, 700);
    } else if (lang === 'en') {
      langSwitcherSwitch.classList.remove('header-lang__switch--right');
      langEn.classList.remove('header-lang__lang--active');
      langRu.classList.add('header-lang__lang--active');
      setCookie('lang', 'ru', { secure: true });
      setTimeout(() => {
        switchLocation(ruLoc);
      }, 700);
    }
  });
}

const langSwitchers = document.querySelectorAll('.header-lang');
const langSwitcherSwitches = document.querySelectorAll('.header-lang__switch');

if (getCookie('lang') === 'en') {
  langSwitcherSwitches.forEach((langSwitcherSwitch, index) => {
    const langRu = langSwitchers[index].querySelector('[data-lang="ru"]');
    const langEn = langSwitchers[index].querySelector('[data-lang="en"]');

    langSwitcherSwitch.classList.add('header-lang__switch--right');
    langRu.classList.remove('header-lang__lang--active');
    langEn.classList.add('header-lang__lang--active');
  });
} else if (getCookie('lang') === 'ru') {
  langSwitcherSwitches.forEach((langSwitcherSwitch, index) => {
    const langRu = langSwitchers[index].querySelector('[data-lang="ru"]');
    const langEn = langSwitchers[index].querySelector('[data-lang="en"]');

    langSwitcherSwitch.classList.remove('header-lang__switch--right');
    langRu.classList.add('header-lang__lang--active');
    langEn.classList.remove('header-lang__lang--active');
  });
}

langSwitchers.forEach((langSwitcher) => {
  langSwitcher.addEventListener('click', function () {
    const currentLang = getCookie('lang');
    switchLanguage(currentLang);
  });
});
