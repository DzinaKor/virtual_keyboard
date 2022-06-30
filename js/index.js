// main wrap
import { keyboardEN, keyboardRU } from './key_collection.js';

const body = document.querySelector('body');

const h1 = document.createElement('div');
h1.classList.add('h1');
h1.innerHTML = 'RSS Virtual keyboard';

const textarea = document.createElement('textarea');
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

const helpline = document.createElement('div');
helpline.classList.add('helpline');
helpline.innerHTML = 'The keyboard was created in the Windows operating system.<br> To switch the language combination press: left ctrl + alt.';

body.appendChild(h1);
body.appendChild(textarea);
body.appendChild(keyboard);
body.appendChild(helpline);







let lang = localStorage.getItem('lang') || 'en';
let keyboardCurrentLang;
const letterCase = 0;

localStorage.setItem('lang', lang);

function getKeyboardCurrentLang() {
  if (lang === 'en') {
    keyboardCurrentLang = keyboardEN;
  } else {
    keyboardCurrentLang = keyboardRU;
  }
}



function insertKeysIntoKeyboard() {
  lang = localStorage.getItem('lang');

  getKeyboardCurrentLang();

  keyboard.innerHTML = ''; 

  for (const keyCode in keyboardCurrentLang) {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('key');

    const bigKeyCodeArr = ['Backspace', 'CapsLock', 'Tab', 'Enter', 'Control', 'ShiftLeft', 'ShiftRight'];

    if (bigKeyCodeArr.includes(keyCode)) {
      keyDiv.classList.add('key_big');
    }

    if (keyCode === 'Space') {
      keyDiv.classList.add('key_space');
    }

    keyDiv.setAttribute('data-code', keyCode);
    keyDiv.innerHTML = keyboardCurrentLang[keyCode][letterCase];
    keyboard.append(keyDiv);
  }
}

insertKeysIntoKeyboard();




// keyB events

document.addEventListener('keydown', (event) => {


  // for caps
  const keys = document.querySelectorAll('.key');

  if (event.code === 'CapsLock') {
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }
    document.querySelector('[data-code=\'CapsLock\']').classList.toggle('active');
    return;
  }

  document.querySelector(`[data-code='${event.code}']`).classList.add('active'); // if active color

  // for shift

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    if (event.repeat) { return; } 
     event.preventDefault();

    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toUpperCase();
        }
      });
    }
    return;
  }

  // for ctrl alt & win
  const specKeyCodeArr = ['CtrlLeft', 'CtrlRight', 'AltRight', 'AltLeft', 'OSLeft', 'ContextMenu'];

  if (specKeyCodeArr.includes(event.code)) {
    event.preventDefault();
    return;
  }

  // for space

  if (event.code === 'Space') {
    textarea.value += ' ';
  }

  // for enter

  if (event.code === 'Enter') {
    return;
  }

  // for BS

  if (event.code === 'Backspace') {
    const str = textarea.value;
    const cursorPos = textarea.selectionEnd;

    const a = str.slice(0, cursorPos);
    const b = str.slice(cursorPos);

    textarea.value = a + b;
    return;
  }

  // for tab

  if (event.code === 'Tab') {
    event.preventDefault();
    textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  


  event.preventDefault();
  textarea.focus();
  textarea.value += document.querySelector(`[data-code='${event.code}']`).innerText;
});






// keyup events

document.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key');

  if (event.code === 'CapsLock') {
    return;
  }

  // for shift

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    const shift = event.code;
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toUpperCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toLowerCase();
        }
      });
    }

    document.querySelector(`[data-code='${shift}']`).classList.remove('active');
    return;
  }

  document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
});




// mouse events down

keyboard.addEventListener('mousedown', (event) => {
  const data = event.target.dataset.code;
  const keys = document.querySelectorAll('.key');

  if (event.target.dataset.code === undefined) {
    return;
  }

  // for caps

  if (data === 'CapsLock') {
    if (event.target.classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }
    event.target.classList.toggle('active');
    return;
  }

  // for shift

  if (data === 'ShiftRight' || data === 'ShiftLeft') {
     if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toLowerCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][1].join().toUpperCase();
        }
      });
    }
    event.target.classList.toggle('active');
    return;
  }

 


  event.target.classList.add('active');


  // for ctrl, alt & win

  const specKeyCodeArr = ['CtrlLeft', 'CtrlRight', 'AltRight', 'AltLeft', 'OSLeft', 'ContextMenu'];

  if (specKeyCodeArr.includes(data)) {
    return;
  }

  // for space

  if (data === 'Space') {
    textarea.value += ' ';
  }

  // for enter

  if (data === 'Enter') {
    textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  // for BS

  if (data === 'Backspace') {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
      return;
    }
    textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  // for tab

  if (data === 'Tab') {
    textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
    return;
  }

  
  textarea.value += document.querySelector(`[data-code=${data}]`).innerText;
});




// mouseup events

document.addEventListener('mouseup', (event) => {
  const keys = document.querySelectorAll('.key');
  const data = event.target.dataset.code;
  if (data === 'CapsLock') {
    return;
  }

  if (data === 'ShiftRight' || data === 'ShiftLeft') {
    if (document.querySelector('[data-code=\'CapsLock\']').classList.contains('active')) {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toUpperCase();
        }
      });
    } else {
      keys.forEach((key) => {
        if (key.textContent.length === 1) {
          key.innerText = keyboardCurrentLang[key.dataset.code][0].join().toLowerCase();
        }
      });
    }
  }
  textarea.focus();

  event.target.classList.remove('active');
});







// local storage & switch lang

function changeKeyText() {
  lang = localStorage.getItem('lang');
  const keys = document.querySelectorAll('.key');
  getKeyboardCurrentLang();

  keys.forEach((key) => {
    key.innerText = keyboardCurrentLang[key.dataset.code][letterCase];
  });
}

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (const code of codes) { 
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();
    changeKeyText(); 
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

function changeLangLocal() {
  if (localStorage.getItem('lang') === 'en') {
    localStorage.setItem('lang', 'ru');
  } else {
    localStorage.setItem('lang', 'en');
  }
}

runOnKeys(
  changeLangLocal,
  'CtrlLeft',
  'AltLeft',
);