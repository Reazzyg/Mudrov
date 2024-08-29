<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/assets/css/normalize.css" />
  <link rel="stylesheet" href="/assets/css/style.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png" />
  <link rel="manifest" href="/assets/img/favicon/site.webmanifest" />
  <title>
    <? echo isset($title) ?  $title . ' | ' :  "" ?> Mudrov - маректинговое агенство полного цикла
  </title>
</head>

<body>
  <div class="noise noise_header"></div>
  <header class="header layout__header" id="top">
    <div class="container header-container grid">
      <a href="javascript:void(0)" class="logo header-logo">
        <div class="header-logo-container">
          <div class="header-logo-letters">
            <span class="header-logo-letter header-logo-letter__m">M</span>
            <span class="header-logo-letter header-logo-letter__u">u</span>
            <span class="header-logo-letter header-logo-letter__d">d</span>
            <span class="header-logo-letter header-logo-letter__r">r</span>
            <span class="header-logo-letter header-logo-letter__o">o</span>
            <span class="header-logo-letter header-logo-letter__v">v</span>
          </div>
        </div>
      </a>

      <div class="header-menu menu">
        <ul class="menu-list">
          <li class="menu-list__item"><a href="" class="menu-list__link">Кейсы</a></li>
          <li class="menu-list__item"><a href="agency/" class="menu-list__link">Агентство</a></li>
          <li class="menu-list__item"><a href="services/" class="menu-list__link">Услуги</a></li>

          <li class="menu-list__item"><a href="contacts/" class="menu-list__link">Контакты</a></li>
        </ul>
      </div>
      <!-- /. header-menu -->
      <div class="header-menu header-menu--mobile menu open">
        <a href="javascript:void(0)" class="logo header-logo">
          <div class="header-logo-container">
            <div class="header-logo-letters">
              <span class="header-logo-letter header-logo-letter__m">M</span>
              <span class="header-logo-letter header-logo-letter__u">u</span>
              <span class="header-logo-letter header-logo-letter__d">d</span>
              <span class="header-logo-letter header-logo-letter__r">r</span>
              <span class="header-logo-letter header-logo-letter__o">o</span>
              <span class="header-logo-letter header-logo-letter__v">v</span>
            </div>
          </div>
        </a>
        <ul class="menu-list">
          <li class="menu-list__item"><a href="/" class="menu-list__link">Кейсы</a></li>
          <li class="menu-list__item"><a href="/agency/" class="menu-list__link">Агентство</a></li>
          <li class="menu-list__item"><a href="/services/" class="menu-list__link">Услуги</a></li>

          <li class="menu-list__item"><a href="/contacts/" class="menu-list__link">Контакты</a></li>
        </ul>
      </div>
      <!-- /. header-menu -->

      <div class="header__info">
        <a href="tel:+79814009433" class="header__phone">+7 (981) 400-94-33</a>
        <div href="" class="burger header-burger">
          <span class="header-burger__line"></span>
          <span class="header-burger__line"></span>
        </div>
      </div>

      <div class="header-menu menu-mobile"></div>
      <!-- /.header-menu-mobile -->
    </div>
  </header>