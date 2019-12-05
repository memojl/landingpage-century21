<?php
//$page_url='https://memojl.github.io/landingpage-century21/';
$page_url='http://'.$_SERVER['HTTP_HOST'].'/';
$page_name='Century21';
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # Envío de datos        
		    $subject = 'Contacto Web '.$page_name;//$subject = trim($_POST["subject"]);
        $nombre = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["nombre"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $tel = trim($_POST["tel"]);
        $msj = trim($_POST["msj"]);
        #Reemplazar este correo por el correo electrónico del destinatario
        $para = "glozanos@century21ekodesar.com";
        $BCC1 = "sonia_mh7@hotmail.com,karen.navarro@keyagenciadigital.com,multiportal@outlook.com";

        if (empty($nombre) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($tel) OR empty($subject) OR empty($msj)) {
            # Establecer un código de respuesta y salida.
            http_response_code(400);
            echo "Por favor completa el formulario y vuelve a intentarlo.";
            exit;
        }

        # Contenido del correo
		$message='
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Documento sin título</title>
    <style type="text/css">
    .fuente1,.fuente2,.fuente3{
      font-family: Calibri, "Trebuchet MS";
      font-size:11px;
      color:#000;
      text-align:left;}
    .fuente2{font-size:12px; font-weight:700;}
    .fuente3{font-size:13px; font-weight:bold;}
    .fuente1 a{
      font-family: Calibri, "Trebuchet MS";
      font-size:12px;
      color:#BFAB81;/*color de link*/
      text-decoration:none;}
    .dominio, .dominio a{font-size:22px;font-weight:bold;text-align:left;vertical-align:bottom;}
    .bg_gris{background-color:#F5F5F5;}/*Color de fondo*/
    .center{text-align:center;}
    .right{text-align:right;}
    .footer{background-color:#BFAB81;color:#fff;font-size:12px;font-weight:bold;text-align:center;padding:6px}/*pie*/
    </style>
    </head>
    <body>
    <div>
        <table class="fuente1" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td colspan="6" class="dominio"><img src="'.$page_url.'web/assets/images/logo.png" alt="Logo" style="width:90px" />&nbsp;&nbsp;<a target="_blank" href="'.$page_url.'">www.'.$_SERVER['HTTP_HOST'].'</a></td>
          </tr>    
    
          <tr>
            <td colspan="6" class="fuente1">Mensaje recibido desde la p&aacute;gina web <b><a target="_blank" href="'.$page_url.'">'.$page_name.'</a></b> a tr&aacute;ves de la secci&oacute;n <b>Contacto</b>.<br><br></td>
        </tr>
          <tr>
            <td colspan="6" class="fuente1 center" style="border-top:2px solid #333;"><br></td>
        </tr>
          <tr>
            <td colspan="6" class="fuente1">&nbsp;</td>
        </tr>
          <tr>
            <td colspan="2" class="fuente2">Nombre:</td>
            <td colspan="4">'.$nombre.'</td>
          </tr>
          <tr>
            <td colspan="2" class="fuente2">Correo:</td>
            <td colspan="4">'.$email.'</td>
          </tr>
          <tr>
            <td colspan="2" class="fuente2">Telefono:</td>
            <td colspan="4">'.$tel.'</td>
          </tr>
          <tr>
            <td colspan="2" class="fuente2">Asunto:</td>
            <td colspan="4">'.$subject.'</td>
          </tr>
          <tr>
            <td colspan="2" class="fuente2">Mensaje:</td>
            <td colspan="4">'.$msj.'</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td colspan="2"></td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td colspan="2" align="right"></td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td colspan="2">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="6" class="footer">Formulario de Contacto v.2.1</td>
          </tr>  
        </table>
    </div>
    </body></html>';

        # Encabezados de correo electrónico.
      $headers = "From: $nombre <$email>". "\r\n";
      if($BCC1!=''){$headers .= "Bcc: {$BCC1}\r\n";}
  		$headers .= 'MIME-Version: 1.0' . "\r\n";
    	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";					 

        # Envía el correo.
        $success = @mail($para, $subject, $message, $headers);
        if ($success){
            # Establece un código de respuesta 200 (correcto).
            http_response_code(200);
            echo "¡Gracias! Tu mensaje ha sido enviado.";
        } else {
            # Establezce un código de respuesta 500 (error interno del servidor).
            http_response_code(500);
            echo "Error: No pudimos enviar tu mensaje.";
        }

    } else {
        # No es una solicitud POST, establezce un código de respuesta 403 (prohibido).
        http_response_code(403);
        echo "Hubo un problema con tu envío, intenta de nuevo.";
    }
?>
