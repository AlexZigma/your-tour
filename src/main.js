'use strict'

import IMask from 'imask';

const headerFixed = document.getElementById('header-fixed');
window.addEventListener('scroll', () => {
  if (window.scrollY > 450) {
    headerFixed.classList.add('header-fixed--show');
  } else {
    headerFixed.classList.remove('header-fixed--show');
  }
});

const filterButtons = document.querySelectorAll('.link--filter');
for (let button of filterButtons) {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('link--selected'))
    button.classList.add('link--selected')
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
date.setDate(date.getDate() - 1);

const dateStart = document.getElementById('date-start');
IMask(dateStart,
  {
    pattern: 'd.`m.`Y',
    mask: Date,
    min: date,
    lazy: false,
    // placeholderChar: ' '
  }
)
dateStart.addEventListener('blur', (e) => {
  if (dateStart.value === '__.__.____') {
    dateStart.value = ''
  }
})

const dateEnd = document.getElementById('date-end');
