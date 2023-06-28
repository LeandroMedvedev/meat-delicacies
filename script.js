const form = document.forms.item(0);

const fieldsetRadioButton = form.elements[5];
const fieldsetCheckbox = form.elements[7];
const fieldsetSelect = form.elements[6];

const button = document.querySelector('[type=button]');
const span = document.querySelector('.errorMessage');

let elementIndex = 0;

button.addEventListener('click', validateFields);

function validateFields() {
  if (validateName()) {
    if (validateEmail()) {
      if (validatePhone()) {
        if (validateMessage()) {
          if (validatePreferences()) {
            if (validateCommunications()) {
            }
          }
        }
      }
    }
  }
}

function validateName() {
  const name = document.forms.item(0).name;
  const pattern = /^[a-z]+(\s[a-z]+)+$/i;
  const isValidName = pattern.test(name.value.trim());

  if (isValidName) {
    span.setAttribute('hidden', 'true');

    return true;
  } else {
    name.focus();
    name.style.outlineColor = 'red';

    span.removeAttribute('hidden');
    span.setAttribute('class', 'invalidNameMessage');
    span.textContent = 'Campo nome deve conter pelo menos nome e sobrenome(s).';
  }
}

function validateEmail() {
  const email = document.forms.item(0).email;
  const pattern = /^[\w-]+@[\w-]+\.[a-z]+$/i;
  const isValidEmail = pattern.test(email.value);

  if (isValidEmail) {
    span.setAttribute('hidden', 'true');

    return true;
  } else {
    email.focus();
    email.style.outlineColor = 'red';

    span.removeAttribute('hidden');
    span.setAttribute('class', 'invalidEmailMessage');
    span.innerHTML =
      '<span>Formato de e-mail válido:</span> <ul><li>Não possuir espaços;</li><li>Possuir o @;</li><li>Possuir algum caractere após o @;</li><li>Possuir algum caractere antes do @;</li><li>Possuir pelo menos um ponto após o caractere depois do @;</li><li>Possuir algum caractere após o ponto.</li></ul>';
  }
}

function validatePhone() {
  const phone = document.forms.item(0).phone;
  const normalizePhone = phone.value.replace(/[()-]/g, '');
  const pattern = /^\d{11}$/;
  const isValidPhone = pattern.test(normalizePhone);

  phone.setAttribute('maxlength', '11');

  if (isValidPhone) {
    span.setAttribute('hidden', 'true');

    return true;
  } else {
    phone.focus();
    phone.style.outlineColor = 'red';

    span.removeAttribute('hidden');
    span.setAttribute('class', 'invalidPhoneMessage');
    span.innerHTML =
      'Telefone deve conter 11 números, sem traços nem parênteses. <br> DDD + 9 + número';
  }
}

function validateMessage() {
  const textArea = document.getElementsByTagName('textarea')[0];
  const isThereText = textArea.value;
  const shortText = isThereText.length < 5;

  if (isThereText && shortText) {
      textArea.focus();
      textArea.style.outlineColor = 'red';

      span.removeAttribute('hidden');
      span.setAttribute('class', 'invalidTextMessage');
      span.textContent = 'Mensagem deve possuir pelo menos cinco caracteres.';

      return false;
  }

  return true;
}

function validatePreferences() {
  const exoticCheck = exotic.firstElementChild.className;
  const traditionalCheck = traditional.firstElementChild.className;
  const bothCheck = both.firstElementChild.className;
  const isThereCheck = exoticCheck || traditionalCheck || bothCheck;

  if (isThereCheck) {
    return true;
  } else {
    span.removeAttribute('hidden');
    span.setAttribute('class', 'invalidPreferenceMessage');
    span.textContent =
      'Selecione pelo menos um tipo de carne de sua preferência.';
  }
}

function validateCommunications() {
  const allMeansCheck = allMeans.firstElementChild.className;
  const eMailCheck = eMail.firstElementChild.className;
  const smsCheck = sms.firstElementChild.className;
  const isThereCheck = allMeansCheck || eMailCheck || smsCheck;

  if (!isThereCheck) {
    span.removeAttribute('hidden');
    span.setAttribute('class', 'invalidCommunicationMessage');
    span.textContent = 'Selecione pelo menos um tipo de comunicação.';
  }
}

// RADIO BUTTON
(function createRadioButton() {
  const divs = ['div', 'div', 'div'];
  const spans = ['span', 'span', 'span'];
  const labels = ['label', 'label', 'label'];

  const [div1, div2, div3] = divs.map(createRadioButtonDivs);
  const [span1, span2, span3] = spans.map(createRadioButtonSpans);
  const [label1, label2, label3] = labels.map(createRadioButtonLabels);

  div1.appendChild(span1);
  div1.appendChild(label1);
  div2.appendChild(span2);
  div2.appendChild(label2);
  div3.appendChild(span3);
  div3.appendChild(label3);
})();

function createRadioButtonDivs(element) {
  const div = document.createElement(element);
  return fieldsetRadioButton.appendChild(div);
}

function createRadioButtonSpans(element, index) {
  const ids = ['exotic', 'traditional', 'both'];
  const span = document.createElement(element);

  span.id = ids[index];

  return span;
}

function createRadioButtonLabels(element, index) {
  const texts = ['Carnes exóticas', 'Carnes tradicionais', 'Ambas'];
  const fors = ['exotic', 'traditional', 'both'];
  const label = document.createElement(element);

  label.setAttribute('for', fors[index]);
  label.textContent = texts[index];

  return label;
}

const exotic = fieldsetRadioButton.children[1];
const traditional = fieldsetRadioButton.children[2];
const both = fieldsetRadioButton.children[3];

exotic.addEventListener('click', (_) => {
  const span = exotic.firstElementChild;
  span.classList.toggle('check');

  const spanBoth = both.firstElementChild;
  spanBoth.removeAttribute('class');
});

traditional.addEventListener('click', (_) => {
  const span = traditional.firstElementChild;
  span.classList.toggle('check');

  const spanBoth = both.firstElementChild;
  spanBoth.removeAttribute('class');
});

both.addEventListener('click', (_) => {
  const span = both.firstElementChild;
  span.classList.toggle('check');

  const spanExotic = exotic.firstElementChild;
  const spanTraditional = traditional.firstElementChild;

  spanExotic.removeAttribute('class');
  spanTraditional.removeAttribute('class');
});

// CHECKBOX
(function createCheckbox() {
  const divs = ['div', 'div', 'div'];
  const spans = ['span', 'span', 'span'];
  const labels = ['label', 'label', 'label'];

  const [div1, div2, div3] = divs.map(createCheckboxDivs);
  const [span1, span2, span3] = spans.map(createCheckboxSpans);
  const [label1, label2, label3] = labels.map(createCheckboxLabels);

  div1.appendChild(span1);
  div1.appendChild(label1);
  div2.appendChild(span2);
  div2.appendChild(label2);
  div3.appendChild(span3);
  div3.appendChild(label3);
})();

function createCheckboxDivs(element) {
  const div = document.createElement(element);
  return fieldsetCheckbox.appendChild(div);
}

function createCheckboxSpans(element, index) {
  const ids = ['allMeans', 'eMail', 'sms'];
  const span = document.createElement(element);

  span.id = ids[index];

  return span;
}

function createCheckboxLabels(element, index) {
  const texts = ['Todos os meios', 'E-mail', 'SMS'];
  const fors = ['allMeans', 'eMail', 'sms'];
  const label = document.createElement(element);

  label.setAttribute('for', fors[index]);
  label.textContent = texts[index];

  return label;
}

const allMeans = fieldsetCheckbox.children[1];
const eMail = fieldsetCheckbox.children[2];
const sms = fieldsetCheckbox.children[3];

allMeans.addEventListener('click', (_) => {
  const span = allMeans.firstElementChild;
  span.classList.toggle('check');

  const spanEmail = eMail.firstElementChild;
  const spanSms = sms.firstElementChild;

  spanEmail.removeAttribute('class');
  spanSms.removeAttribute('class');
});

eMail.addEventListener('click', (_) => {
  const span = eMail.firstElementChild;
  span.classList.toggle('check');

  const spanAllMeans = allMeans.firstElementChild;
  spanAllMeans.removeAttribute('class');
});

sms.addEventListener('click', (_) => {
  const span = sms.firstElementChild;
  span.classList.toggle('check');

  const spanAllMeans = allMeans.firstElementChild;
  spanAllMeans.removeAttribute('class');
});

// SELECT
(function createSelect() {
  const input = document.createElement('input');
  const select = document.createElement('div');
  const svg = document.createElement('svg');
  const p = document.createElement('p');
  const i = document.createElement('i');
  const favoriteMeat = 'favoriteMeat';

  select.setAttribute('name', favoriteMeat);
  select.id = favoriteMeat;
  svg.id = 'arrow';
  i.className = 'arrow down';
  input.placeholder = 'Selecione o tipo de carne';
  input.name = 'favorite-meat';
  input.id = 'favorite-meat';
  input.type = 'text';
  input.readOnly = true;

  fieldsetSelect.appendChild(select);
  select.appendChild(svg);
  svg.appendChild(p);
  p.appendChild(i);
  select.appendChild(input);

  const divDropDown = document.createElement('div');
  divDropDown.className = 'dropDown';
  select.appendChild(divDropDown);

  const divListDropDown = document.createElement('div');
  divListDropDown.className = 'listDropDown';
  divDropDown.appendChild(divListDropDown);

  const spans = ['span', 'span', 'span', 'span', 'span', 'span'];
  const [span1, span2, span3, span4, span5, span6] =
    spans.map(createSelectSpans);

  divListDropDown.appendChild(span1);
  divListDropDown.appendChild(span2);
  divListDropDown.appendChild(span3);
  divListDropDown.appendChild(span4);
  divListDropDown.appendChild(span5);
  divListDropDown.appendChild(span6);
})();

function createSelectSpans(element, index) {
  const strings = [
    'Todos os tipos',
    'Bovina',
    'Suína',
    'Aves',
    'Frutos do mar',
    'Outras',
  ];
  const span = document.createElement(element);

  span.setAttribute('value', strings[index]);
  span.textContent = strings[index];
  span.className = 'item';
  span.id = `item-${++index}`;

  return span;
}

const divDropDown = fieldsetSelect.children[1].children[2];
const inputFavMeat = fieldsetSelect.children[1].children[1];
const divListDropDown = divDropDown.firstElementChild;

inputFavMeat.addEventListener(
  'focus',
  (_) => (divDropDown.style.display = 'block')
);

inputFavMeat.addEventListener(
  'blur',
  (_) => (divDropDown.style.display = 'none')
);
