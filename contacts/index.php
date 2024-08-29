<?
$title = 'Контакты';
require_once($_SERVER['DOCUMENT_ROOT'] . '/header.php')

?>
<section class="hero">
  <div class="container hero-container grid">
    <h1 class="title hero-title grid">
      <span class="hero-title__text">ДАВАЙТЕ</span>
      <span class="hero-title__text">ОБСУДИМ
        <span class="hero-title__text hero-title__text--desctop">ВАШ ПРОЕКТ</span>
      </span>
      <span class="hero-title__text--mobile">ВАШ ПРОЕКТ</span>
    </h1>

    <h2 class="subtitle hero-subtitle">
      <span class="hero-subtitle__text">
        Оставьте заявку и мы в ближайшее время предложим оптимальное решение для вашего бизнеса
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
      <input type="text" class="form__input">
      <label for="">имя</label>
    </div>
    <div class="form-input-wrap">
      <input type="text" class="form__input">
      <label for="">номер телефона</label>
    </div>
  </div>
  <div class="form-input-wrap">
    <input type="text" class="form__input">
    <label for="">расскажите о вашем проекте</label>
  </div>
  <div class="form-wrapper grid grid-center">

    <button type="submit" class="form__button">отправить</button>
    <p class="form__legacy">Отправляя форму, вы соглашаетесь
      <a href="" class="form__link">с политикой конфиденциальности</a>
    </p>
  </div>
</form>


<section class="contacts">
  <div class="container grid grid-two">
    <div class="contacts-wrapper">
      <h3 class="subtitle">ПИШИТЕ</h3>
      <!-- /.subtitle -->
      <a href="mailto:mudrsemen@ya.ru" class="contacts__link title-small">mudrsemen@ya.ru</a>
      <!-- /.contacts__link -->
      <a href="" class="contacts__link contacts-social contacts-social__tg">Telegramm</a>
      <!-- /.contacts__link -->
      <a href="https://api.whatsapp.com/send?phone=79814009433?text='Здравствуйте,' " class="contacts__link contacts-social contacts-social__wa">WatsApp</a>
      <!-- /.contacts__link -->
      <a href="viber://chat?number=+798140049433" class="contacts__link contacts-social contacts-social__vb">Viber</a>
      <!-- /.contacts__link -->
    </div>
    <!-- /.contacts-wrapper -->
    <div class="contacts-wrapper">
      <h3 class="subtitle">ЗВОНИТЕ</h3>
      <!-- /.subtitle -->
      <a href="tel:89814009433" class="contacts__link">+7 (981) 400-94-33</a>
      <!-- /.contacts__link -->
    </div>
    <!-- /.contacts-wrapper -->
  </div>
  <!-- /.container grid grid-two -->
</section>
<!-- /.contacts -->
<?
require_once($_SERVER['DOCUMENT_ROOT'] . '/footer.php')

?>