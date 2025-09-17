'use strict';

import IMask from 'imask';

const headerFixed = document.getElementById('header');
window.addEventListener('scroll', () => {
  const posBegin = window.scrollY > 100
  const posAfter = window.scrollY > 450
  headerFixed.classList.toggle('header--fixed', posBegin);
  headerFixed.classList.toggle('header--show', posAfter);
});

const filterButtons = document.querySelectorAll('.link--filter');
for (let button of filterButtons) {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('link--selected'));
    button.classList.add('link--selected');
  })
}

const phoneInput = document.getElementById('phoneInput');

const phoneMaskOption = {
  mask: '+{7}(000)000-00-00'
};
const phoneMask = IMask(phoneInput, phoneMaskOption);

let currentDate = new Date();

const yyyy = currentDate.getFullYear();
const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
const dd = String(currentDate.getDate()).padStart(2, '0');
const minDate = `${yyyy}-${mm}-${dd}`;

const dateStart = document.getElementById('date-start');
const dateStartText = document.getElementById('date-start-text');
const dateEnd = document.getElementById('date-end');
const dateEndText = document.getElementById('date-end-text');

dateStart.min = minDate;
dateEnd.min = minDate;
let lastClick = 0;

const onDateInputClick = (dateInput) => {
  const now = Date.now();
  if (now - lastClick > 300) {
    dateInput.showPicker();
  }
  lastClick = now;
}

dateStartText.addEventListener('click', () => onDateInputClick(dateStart));
dateEndText.addEventListener('click', () => onDateInputClick(dateEnd));

dateStart.addEventListener('change', (e) => {
  const dateParts = e.target.value.split('-');
  dateStartText.value = [dateParts[2], dateParts[1], dateParts[0]].join('.');
  dateEnd.min = e.target.value;
});

dateEnd.addEventListener('change', (e) => {
  const dateParts = e.target.value.split('-');
  dateEndText.value = [dateParts[2], dateParts[1], dateParts[0]].join('.');
});


const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('tour-choose').scrollIntoView();
})