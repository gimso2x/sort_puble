<?php

require 'PHPMailer-master/PHPMailerAutoload.php';


$mail = new PHPMailer(true);
$mail->IsSMTP();
try {
  $mail->CharSet = "utf-8";
  $mail->Host = "smtp.gmail.com";    // email 보낼때 사용할 서버를 지정
  $mail->SMTPAuth = true;              // SMTP 인증을 사용함
  $mail->Port = 465;                        // email 보낼때 사용할 포트를 지정
  $mail->SMTPSecure = "ssl";        // SSL을 사용함
  $mail->Username   = "camel.wise@gmail.com";    // Gmail 계정
  $mail->Password   = "rnrmf!1altm";            // 패스워드
  $mail->SMTPDebug = 0;


  $mail->setFrom('camel.wise@gmail.com', $_POST['email']); // 보내는 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
  $mail->addAddress('camel.wise@gmail.com','webmaster'); // 받을 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
  $mail->Subject = $_POST['name'];        // 메일 제목
  $mail->MsgHTML($_POST['message']);    // 메일 내용 (HTML 형식도 되고 그냥 일반 텍스트도 사용 가능함)

  $mail->Send();                                // 실제로 메일을 보냄
  // echo "Message Sent OK<p></p>\n";
  header("Location: http://gimso2x.com/index.html#contact"); /* Redirection du navigateur */
  exit;
} catch (phpmailerException $e) {
  echo $e->errorMessage(); //Pretty error messages from PHPMailer
} catch (Exception $e) {
  echo $e->getMessage(); //Boring error messages from anything else!
}
?>
