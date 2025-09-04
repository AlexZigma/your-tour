'use strict';

import IMask from 'imask';

const headerFixed = document.getElementById('header-fixed');
window.addEventListener('scroll', () => {
  if (window.scrollY > 450) {
    headerFixed.classList.add('header--show');
  } else {
    headerFixed.classList.remove('header--show');
  }
});

const filterButtons = document.querySelectorAll('.link--filter');
for (let button of filterButtons) {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('link--selected'));
    button.classList.add('link--selected');
  })
}

const phoneInput = document.getElementById('phone');

const phoneMaskOption = {
  mask: '+{7}(000)000-00-00'
};
const phoneMask = IMask(phoneInput, phoneMaskOption);

// const prefix = '+7'

// phoneInput.addEventListener('input', function (e) {
//   let value = phoneInput.value
//   if (value[0] !== '+') {
//     value = value.slice(1) + value[0];
//   }
//   if (value[1] !== '7') {
//     value = value[0] + value.slice(2) + value[1];
//   }

//   let x = value.slice(2).replace(/\D/g, '');
//   const length = x.length;
//   let y = prefix
//   if (length > 0) {
//     y += '(' + x.slice(0, 3)
//   }
//   if (length > 3) {
//     y += ')' + x.slice(3, 6)
//   }
//   if (length > 6) {
//     y += '-' + x.slice(6, 8)
//   }
//   if (length > 8) {
//     y += '-' + x.slice(8, 10)
//   }

//   phoneInput.value = y

// });

// phoneInput.addEventListener('focus', (e) => {
//   if (phoneInput.value === '') {
//     phoneInput.value = prefix
//   }
// });

// phoneInput.addEventListener('blur', (e) => {
//   if (phoneInput.value === prefix) {
//     phoneInput.value = ''
//   }

// });


let date = new Date();

const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');
const minDate = `${yyyy}-${mm}-${dd}`;

const dateStart = document.getElementById('date-start');
const dateStartText = document.getElementById('date-start-text');
const dateEnd = document.getElementById('date-end');
const dateEndText = document.getElementById('date-end-text');

dateStart.min = minDate;
dateEnd.min = minDate;
let lastClick = 0;

dateStartText.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastClick > 300) {
    dateStart.showPicker();
  }
  lastClick = now;
});

dateStart.addEventListener('change', (e) => {
  date = e.target.value.split('-');
  dateStartText.value = [date[2], date[1], date[0]].join('.');
  dateEnd.min = e.target.value;
});


dateEndText.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastClick > 300) {
    dateEnd.showPicker();
  }
  lastClick = now;
});

dateEnd.addEventListener('change', (e) => {
  date = e.target.value.split('-');
  dateEndText.value = [date[2], date[1], date[0]].join('.');
});


const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('tour-choose').scrollIntoView();
})