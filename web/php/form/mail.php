<?php
$dominio='https://memo-ink.github.io/zemsa/';
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        #Reemplazar este correo por el correo electrónico del destinatario
        $mail_to = "guillermo@inkwonders.com";

        # Envío de datos
        //$subject = trim($_POST["subject"]);
		    $subject='Centro de Contacto';
        $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["nombre"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $phone = trim($_POST["tel"]);
        $message = trim($_POST["msj"]);

        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($subject) OR empty($message)) {
            # Establecer un código de respuesta y salida.
            http_response_code(400);
            echo "Por favor completa el formulario y vuelve a intentarlo.";
            exit;
        }

        # Contenido del correo
		$content='
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin título</title>
<style type="text/css">
.fuente1,.fuente2,.fuente3{
	font-family: Calibri, "Trebuchet MS";
	font-size:11px;
	color:#000;
	text-align:left;
}
.fuente2{font-size:12px; font-weight:700;}
.fuente3{font-size:13px; font-weight:bold;}
.fuente1 a{
	font-family: Calibri, "Trebuchet MS";
	font-size:12px;
	color:#B20800;
	text-decoration:none;
}
.bg_gris{background-color:#F5F5F5;}
.center{text-align:center;}
.right{text-align:right;}
.footer{background-color:#B20800;color:#fff;font-size:12px;font-weight:bold;text-align:center;padding:6px}
</style>
</head>
<body>
<div>
    <table class="fuente1" width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
      	<td colspan="6"><img src="'.$dominio.'assets/img/logo.png" alt="Logo" /></td>
      </tr>    
      <tr>
        <td colspan="6" class="fuente1">Mensaje recibido desde la p&aacute;gina web <b><a target="_blank" href="'.$dominio.'">www.zemsa.com</a></b> a tr&aacute;ves de la secci&oacute;n <b>Contacto</b>.<br/></td>
	  </tr>
      <tr>
        <td colspan="6" class="fuente1 center"><hr style="width:100%; border:2 solid #77BD1E; background-color:#77BD1E;"></td>
	  </tr>
      <tr>
        <td colspan="6" class="fuente1">&nbsp;</td>
	  </tr>
      <tr>
        <td colspan="2" class="fuente2">Nombre</td>
        <td colspan="4">'.$name.'</td>
      </tr>
      <tr>
        <td colspan="2" class="fuente2">Tel</td>
        <td colspan="4">'.$phone.'</td>
      </tr>
      <tr>
        <td colspan="2" class="fuente2">Correo</td>
        <td colspan="4">'.$email.'</td>
      </tr>
      <tr>
        <td colspan="2" class="fuente2">Mensaje</td>
        <td colspan="4">'.$message.'</td>
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
      	<td colspan="6" class="footer">Formulario de Contacto v.2</td>
      </tr>  
    </table>
</div>
</body></html>';

        # Encabezados de correo electrónico.
        $headers = "From: $name <$email>". "\r\n";
  		$headers .= 'MIME-Version: 1.0' . "\r\n";
    	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";					 

        # Envía el correo.
        $success = @mail($mail_to, $subject, $content, $headers);
        if ($success) {
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
