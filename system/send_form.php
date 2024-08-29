<?php
// Файлы phpmailer
require $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/SMTP.php';
require $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/Exception.php';

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = $_POST['name'] ?? 'Имя не указано';
    $phone = $_POST['phone'] ?? 'Телефон не указан';
    $info = $_POST['info'] ?? 'Информация не указана';


    // Формирование самого письма
    $title = "Сообщение на сайте mudrov.pro";
    $body = "
    // <h2>Новое письмо</h2>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $phone<br><br>
    <b>Сообщение:</b><br>$info
    ";

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
        $GLOBALS['data']['debug'][] = $str;
    };

    // Настройки вашей почты
    $mail->Host       = 'mail.hosting.reg.ru'; // SMTP сервера вашей почты
    $mail->SMTPAuth   = true;

    $mail->Username   = 'info@mudrov.pro'; // Логин на почте
    $mail->Password   = 'hvL6FW1n8h1K1RuV'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';

    $mail->Port       = 465;
    $mail->setFrom('info@mudrov.pro', 'Mudrov.pro'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('mudrsemen@yandex.ru', 'Joe User'); // Замените на email и имя получателя


    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
        for ($i = 0; $i < count($file['tmp_name']); $i++) {
            if ($file['error'][$i] === 0)
                $mail->addAttachment($file['tmp_name'][$i], $file['name'][$i]);
        }
    }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data['result']);