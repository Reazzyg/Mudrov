const body = document.querySelector('body');


function doStuff() {
  body.className += ' animate';
}

window.onload = function () {
  doStuff();

  

};


const menuBurger = document.querySelector('.header-burger');

menuBurger.addEventListener('click', function () {
  const menu = document.querySelector('.header-menu--mobile');
  menu.classList.toggle('animate');
  menu.classList.toggle('open');
  this.classList.toggle('close');
});

const accordion = function (list) {
  listItems = list.querySelectorAll('[data-accordion-item]');
  listItems.forEach((listItem) => {
    listItem.addEventListener('click', function () {
      this.classList.toggle('_active');
    });
  });
};

let serviceLists = document.querySelectorAll('.services-list');
serviceLists.forEach((serviceList) => {
  accordion(serviceList);
});

const formListener = function (forma) {
  const inputs = forma.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('blur', function () {
      this.value.length > 0
        ? this.closest('.form-input-wrap').classList.add('_filled')
        : this.closest('.form-input-wrap').classList.remove('_filled');
    });
  });
};

const forms = document.querySelectorAll('form');
// console.log(forms);
forms.forEach((forma) => {
  formListener(forma);
});

