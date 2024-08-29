import { getCookie } from './utils.js';

let form = document.querySelector('form');

const sendBtn = document.querySelector('button[type="submit"]');

sendBtn.addEventListener('click', handleSubmit);

function animateDots(element, baseText) {
  let dotCount = 0;

  const interval = setInterval(() => {
    console.log(dotCount);
    dotCount = (dotCount + 1) % 4; // Увеличиваем счетчик и сбрасываем до 0, когда достигаем 4
    const dots = '.'.repeat(dotCount); // Генерируем строку из dotCount точек
    element.innerText = baseText + dots;
    console.log(dotCount);
  }, 300);

  return interval;
}

async function sendForm(formData) {
  // if (checkIfValidated()) {
  //   console.log("check");
  try {
    let url = '/system/send_form.php';

    const response = await fetch(url, {
      method: 'POST',

      body: formData,
    });
    if (response && response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error sending form: ', error);

    throw new Error('Ошибка при отправке формы: ' + error.message);
  }
  // }
  // else {
  //   // throw new Error("Форма не прошла валидацию");
  //   return false;
  // }
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(this.form);

  const submitButton = event.target;

  // Начинаем анимацию точек
  submitButton.innerText = getCookie('lang') === 'ru' ? 'Отправка' : 'Sending';

  const animationInterval = animateDots(submitButton, submitButton.innerText);

  sendForm(formData)
    .then((response) => {
      if (response === 'success') {
        this.form.querySelectorAll('input').forEach((input) => {
          input.value = '';
          input.parentNode.classList.remove('_filled');
        });

        setTimeout(() => {
          clearInterval(animationInterval); // Останавливаем анимацию
          event.target.innerText = getCookie('lang') !== 'en' ? 'Отправлено!' : 'Sent!';

          // this.form.parentNode.classList.add("success");
        }, 1500);

        // this.form.parentNode.classList.add("form-hidden");
      }
    })

    .catch((error) => {
      console.error('Error sending form: ', error);

      // this.form.parentNode.classList.add("form-hidden");

      setTimeout(() => {
        event.target.innerText =
          getCookie('lang') !== 'en'
            ? 'Возникла ошибка, повторите отправку позже'
            : 'Error sending form, please try again later';

        // this.form.parentNode.classList.add("errored");
      }, 500);
    });
}
