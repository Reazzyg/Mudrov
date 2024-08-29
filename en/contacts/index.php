<?
$title = 'Contacts';
require_once($_SERVER['DOCUMENT_ROOT'] . '/en-header.php')

?>
<section class="hero">
  <div class="container hero-container grid">
    <h1 class="title hero-title grid">
      <span class="hero-title__text">LET'S</span>
      <span class="hero-title__text">DISCUSS
        <span class="hero-title__text hero-title__text--desctop">YOUR PROJECT</span>
      </span>
      <span class="hero-title__text--mobile">YOUR PROJECT</span>
    </h1>

    <h2 class="subtitle hero-subtitle">
      <span class="hero-subtitle__text">
        Leave a request and we will soon offer the best solution for your business
      </span>
    </h2>
    <!-- /.subtitle hero-subtitle -->
  </div>
  <!-- /.container -->
</section>
<!-- /.hero -->
<form action="" class="form container">
  <div class="form-wrapper grid">
    <div class="form-input-wrap">
      <input type="text" name="name" class="form__input">
      <label for="">name</label>
    </div>
    <div class="form-input-wrap">
      <input type="text" name="phone" class="form__input">
      <label for="">phone</label>
    </div>
  </div>
  <div class="form-input-wrap">
    <input type="text" name="info" class="form__input">
    <label for="">tell us about your project</label>
  </div>
  <div class="form-wrapper grid grid-center">

    <button type="submit" class="form__button">send</button>
    <p class="form__legacy">By submitting the form, you agree to our
      <a href="" class="form__link"> privacy policy</a>
    </p>
  </div>
</form>


<section class="contacts">
  <div class="container grid grid-two">
    <div class="contacts-wrapper">
      <h3 class="subtitle">WRITE US</h3>
      <!-- /.subtitle -->
      <a href="mailto:mudrsemen@ya.ru" class="contacts__link title-small">mudrsemen@ya.ru</a>
      <!-- /.contacts__link -->
      <a href="" class="contacts__link contacts-social contacts-social__tg">Telegramm</a>
      <!-- /.contacts__link -->
      <a href="https://api.whatsapp.com/send?phone=79814009433?text='Hello,' "
        class="contacts__link contacts-social contacts-social__wa">WatsApp</a>
      <!-- /.contacts__link -->
      <a href="viber://chat?number=+798140049433" class="contacts__link contacts-social contacts-social__vb">Viber</a>
      <!-- /.contacts__link -->
    </div>
    <!-- /.contacts-wrapper -->
    <div class="contacts-wrapper">
      <h3 class="subtitle">PHONE US</h3>
      <!-- /.subtitle -->
      <a href="tel:89814009433" class="contacts__link">+7 (981) 400-94-33</a>
      <!-- /.contacts__link -->
    </div>
    <!-- /.contacts-wrapper -->
  </div>
  <!-- /.container grid grid-two -->
</section>
<!-- /.contacts -->

<script>
  let form = document.querySelector('form')

  const sendBtn = document.querySelector('button[type="submit"]')

  sendBtn.addEventListener('click', handleSubmit)


  async function sendForm(formData) {
    // if (checkIfValidated()) {
    //   console.log("check");
    try {

      let url = "/system/send_form.php";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (response && response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error sending form: ", error);
      throw new Error("Ошибка при отправке формы: " + error.message);
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

    sendForm(formData)
      .then((response) => {
        if (response.success === "success") {
          console.log("form sent");

          // this.form.parentNode.classList.add("form-hidden");

          setTimeout(() => {
            console.log('timeout');
            // this.form.parentNode.classList.add("success");
          }, 500);
        }
      })

      .catch((error) => {
        console.error("Error sending form: ", error);

        // this.form.parentNode.classList.add("form-hidden");

        setTimeout(() => {
          console.log('timeout error');
          // this.form.parentNode.classList.add("errored");
        }, 500);
      });
  }
</script>
<?
require_once($_SERVER['DOCUMENT_ROOT'] . '/en-footer.php')

?>