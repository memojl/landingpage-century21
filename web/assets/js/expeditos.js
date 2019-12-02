/* global AJAX */
function Hiperlink(A){
   var id = A.id; 
   window.location.href = "seccion.php?q=coches&id="+id+"";
}
CALLED = false;
function validarEmail(email){    
    var array = email.split("@"); 
    if(array.length !== 2){
        return false;
    }
    var address =  array[0];
    console.log(address);
    var dominio =  array[1];
    console.log(dominio);
    
    if(!isNaN(address[0])|| !isNaN(dominio[0]) || !isNaN(dominio[dominio.length-1]) ){
        return false;
    }    
    return true;    
}
function priceToNumber(price){
    price = price.split('.')[0];   
    var numero = price.replace(/\,|\./g,'');
    return numero;
}
function phoneToNumber(phone){
    var numero = phone.replace(/\+|\-|\(|\)|\s|\./g,'');
    return numero;
}

function GetMinMax(cadena){
    var array = cadena.split("-");
    var sol = [];     
    var min = array[0];
    var max = array[1];
    if(isNaN(max)){
        max = 999999999;
    }
    min =  parseInt(min);
    max =  parseInt(max);        
    sol[0] = min;
    sol[1] = max;
   
    return sol;
}
function Registrar(){   
    var email = $("#email").val();
    var nombre = $("#nombre").val();
    var password = $("#password").val();
    var passwordA = $("#passwordA").val();
    var telefono = $("#telefono").val();
    var direccion = $("#direccion").val();

    var parametros = {
        WHO:'Registrar',
        code:'REGISTER',
        
        email:email,
        nombre:nombre,
        password:password,
        telefono:telefono,
        direccion:direccion        
    };
    if(email.length === 0 || nombre.length === 0  ||  password.length === 0  || passwordA.length === 0  || telefono.length === 0  || direccion.length === 0 ){
        $("#errorRegistro").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }
    if(!validarEmail(email)){
        $("#errorRegistro").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }
    if(password !== passwordA){
        $("#errorRegistro").html("<strong style='color:red;'> ¡Las contraseñas no coinciden! </strong> ").removeClass('invisible');
        return;       
    }
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK){  
        if(respuesta.OK ===2){
              $("#errorRegistro").html("<strong style='color:red;'> ¡Lo sentimos, su email ya está ocupado! </strong> ").removeClass('invisible');
              return;      
        }else{
            $('.registro').val('');        
            $("#errorRegistro").html("<strong style='color:green;'> ¡Gracias por Registrarte! Puedes continuar navegando en el sitio </strong> ").removeClass('invisible');
             setTimeout(function() {
                var redirect_url = 'index.php';										
                window.location.href = redirect_url;
            }, 400);
        }
    }else{
        console.log('bad');
    }
    console.log(respuesta);
    
}
function UpdatePassword(){  
    $("#errorchpass").html("");
    var email = $("#email").val();
    var password = $("#password").val();
    var passwordnew = $("#passwordnew").val();
    var passwordagain = $("#passwordagain").val();

    var parametros = {
        WHO:'UpdatePassword',
        code:'CHANGE_PASSWORD',        
        email:email,
        password:password, 
        passwordnew:passwordnew    
    };
    console.log("Parametros: UpdatePassword");
    console.log(parametros);
    if(email.length === 0||password.length === 0 ||passwordnew.length === 0||passwordagain.length === 0){
        $("#errorchpass").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }  
    if(passwordnew !== passwordagain){
        $("#errorchpass").html("<strong style='color:red;'> ¡Las nuevas contraseñas no coinciden! </strong> ").removeClass('invisible');
        return;
    }
  
    if(!validarEmail(email)){
        $("#errorchpass").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }    
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    console.log("SERVER: UpdatePassword");
    console.log(respuesta);
    if(respuesta.OK ===1){
        $('.chpass').val('');        
        $("#errorchpass").html("<strong style='color:green;'> ¡Bienvenido! Puedes continuar navegando en el sitio </strong> ").removeClass('invisible');    
    }else{   
          $("#errorchpass").html("<strong style='color:red;'> ¡Lo sentimos, los datos suministrados no coinciden con un usuario válido! </strong> ").removeClass('invisible');
          return;  
    }
    
    
}
function Login(){
    var email = $("#emailL").val();
    var password = $("#passwordL").val();

    var parametros = {
        WHO:'Login',
        code:'LOGIN',        
        username:email,
        password:password    
    };
  
    if(email.length === 0 ||  password.length === 0 ){
        $("#errorLogin").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }

    if(!validarEmail(email)){
        $("#errorLogin").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }
    
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK){  
        if(respuesta.OK ===2){
              $("#errorLogin").html("<strong style='color:red;'> ¡Lo sentimos, los datos suministrados no coinciden! </strong> ").removeClass('invisible');
              return;      
        }else{
            $('.login').val('');        
            $("#errorLogin").html("<strong style='color:green;'> ¡Bienvenido! Puedes continuar navegando en el sitio </strong> ").removeClass('invisible');
             setTimeout(function() {
                var redirect_url = 'index.php';										
                window.location.href = redirect_url;
            }, 400);
        }
    }else{
        console.log('bad');
    }
    console.log(respuesta);
}

function Salir(){

    var parametros = {
        WHO:'Salir',
        code:'SALIR'   
    };
    console.log(parametros);
    
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK){  
        console.log('Saliendo');
        setTimeout(function() {
                var redirect_url = 'index.php';										
                window.location.href = redirect_url;
        }, 400);  
        console.log('Salimos');
    }else{
        console.log('bad');
    }
    console.log(respuesta);
}
function Contactanos(){
    var nombre = $("#contactanosNombre").val();
    var email = $("#contactanosEmail").val();
    var telefono = $("#contactanosTelefono").val();
    var direccion ="NoLlenar";// $("#contactanosDireccion").val();
    var correo = $("#contactanosCorreo").val();
    var crm = $("#rSi").hasClass('seleccionado') ? 'si' :'no';
    var parametros = {
        WHO:'Contactanos',
        code:'CONTACTANOS',  
        nombre:nombre,
        email:email,
        telefono:telefono,
        direccion:direccion,
        correo:correo,
        crm: crm,
        
    };
    if(!$("#rSi").hasClass('seleccionado') && !$("#rNo").hasClass('seleccionado')){
        $("#errorContactanos").html("<strong style='color:red;'> ¡Por favor, seleccione una opción! </strong> ").removeClass('invisible');
        return; 
    }
    if(nombre.length === 0 || email.length === 0 ||  telefono.length === 0 ||  direccion.length === 0 ||  correo.length === 0 ){
        $("#errorContactanos").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }

    if(!isNaN(nombre)){
        $("#errorContactanos").html("<strong style='color:red;'> ¡El nombre solo debe contener letras! </strong> ").removeClass('invisible');
        return;   
    }

    if(!validarEmail(email)){
        $("#errorContactanos").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }
    
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK === 1){ 
        $('.contactanos').val('');    
        var url = "seccion.php?q=gracias";
        console.log(respuesta);  
        console.log("Zoho");
        console.log(respuesta.ZOHO); 
        window.location.href = url;    
    }else{
        $("#errorContactanos").html("<strong style='color:red;'> ¡Lo sentimos! Ocurrió algún error inesperado.</strong> ").removeClass('invisible');
    }   
}

function Detalles(){
    var nombre = $("#detallesNombre").val();
    var email = $("#detallesEmail").val();
    var telefono = $("#detallesTelefono").val();
    var direccion = ""; /*$("#detallesDireccion").val()*/
    var correo = $("#detallesCorreo").val();
    var parametros = {
        WHO:'Detalles',
        code:'CONTACTANOS',  
        nombre:nombre,
        email:email,
        telefono:telefono,
        direccion:direccion,
        correo:correo   
    };  
    if(nombre.length === 0 || email.length === 0 ||  telefono.length === 0  ||  correo.length === 0 )/*||  direccion.length === 0*/{
        $("#errorDetalles").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }
    if(!isNaN(nombre)){
        $("#errorDetalles").html("<strong style='color:red;'> ¡El nombre solo debe contener letras! </strong> ").removeClass('invisible');
        return;   
    }
    if(!validarEmail(email)){
        $("#errorDetalles").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }    
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK === 1){ 
        $('.coches').val('');
       // $("#smsFormulario").html("<p> <strong style='color:green;'> ¡Gracias por escribirnos! Pronto un asesor se pondrá en contacto con usted.</strong> </p> ");
     
        var url = "seccion.php?q=gracias";
        window.location.href = url; 
    }else{
        $("#errorDetalles").html("<strong style='color:red;'> ¡Lo sentimos! Ocurrió algún error inesperado.</strong> ").removeClass('invisible');
    }   
}

function DetallesCotizar(){
    var nombre = $("#detallesNombre").val();
    var email = $("#detallesEmail").val();
    var telefono = phoneToNumber($("#detallesTelefono").val());
    var direccion = ""; /*$("#detallesDireccion").val()*/
    var correo = $("#detallesCorreo").val();

    var automovil = $("#nombreAuto").val();
    var precio =   parseInt(priceToNumber($("#ppprecio").html()));
    var marca = $("#zmarca").html();
    var modelo = $("#zmodelo").html();
    var ano = $("#zano").html();
    var condicion = $("#zcondicion").html();
    var enganche = parseInt(priceToNumber($("#zenganche").html()));
    
    var parametros = {
        WHO:'Detalles',
        code:'CONTACTANOS_ZOHO', 
        nombre:nombre,
        email:email,
        telefono:telefono,
        direccion:direccion,
        correo:correo,
        
        automovil:automovil,
        precio:precio,
        marca:marca,
        modelo:modelo,
        ano:ano,
        condicion:condicion,
        enganche:enganche,
        crm : $("#rSi").hasClass('seleccionado') ? 'si' :'no'
        
    };
    if(nombre.length === 0 || email.length === 0 ||  telefono.length === 0  ||  correo.length === 0 )/*||  direccion.length === 0*/{
        $("#errorDetalles").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;
    }
    if(!isNaN(nombre)){
        $("#errorDetalles").html("<strong style='color:red;'> ¡El nombre solo debe contener letras! </strong> ").removeClass('invisible');
        return;   
    }
    if(!validarEmail(email)){
        $("#errorDetalles").html("<strong style='color:red;'> ¡E-mail incorrecto! </strong> ").removeClass('invisible');
        return;   
    }  
     
    if(!$("#rSi").hasClass('seleccionado') && !$("#rNo").hasClass('seleccionado')){
        $("#errorDetalles").html("<strong style='color:red;'> ¡Por favor, complete todos los campos! </strong> ").removeClass('invisible');
        return;  
    }
    console.log("ZOHO data Send"); 
    console.log(parametros);    
   
      
    var respuesta = AJAX.ReadData("assets/php/usuarios.php",parametros);
    if (respuesta.OK === 1){ 
        var url = "seccion.php?q=gracias"; 
        console.log("Enviados: ");
        console.log(respuesta.RECIBIDOS);
        console.log("ZOHO Respuesta: "); 
        console.log(respuesta.ZOHO);    
        //return;
        window.location.href = url;   
    }else{
        $("#errorDetalles").html("<strong style='color:red;'> ¡Lo sentimos! Ocurrió algún error inesperado.</strong> ").removeClass('invisible');
    }   
}
    /*SUSCRIBETE*/  
    function  Suscribete(email){
       $.post("assets/php/boletin.php",{ emailboletin: email },function(data){
            
            if(data === "1"){
                $("#emailSuscribete").attr('disabled',true);
                $("#smsEmailSuscribete").html("Gracias por registrarte a nuestro boletín").removeClass("invisible rojo").addClass("verde"); 
            }else if(data === "2"){
                $("#emailSuscribete").attr('disabled',true);
                $("#smsEmailSuscribete").html("Gracias,ya estabas registrado").removeClass("invisible rojo").addClass("verde"); 
            }else if(data === "3"){
                console.log("Algo pasó en el servidor de boletin.php con la función Suscribete(email)");
                console.log(data);
                $("#smsEmailSuscribete").html("Lo sentimos,vuelva a intentarlo").removeClass("invisible verde").addClass("rojo"); 
            }else{
                console.log("Algo pasó en el servidor de boletin.php con la función Suscribete(email)");
                console.log(data);
            }
        });
        
    } 
    
    /*REGISTRAR VISITANTE*/
    function RegistrarVisitante(){
        $.post("assets/php/boletin.php",{visita_anonima: 'nuevo_visitante'},function(data){
            console.log(data); 
        });
    }
  /*INDICES DE BUSQUEDA*/ 
  MARCAS = []; 
  MODELOS = []; 
  ANOS = []; 
  
function reemplazar(word){    
    word = word.replace("á", "a");
    word = word.replace("à", "a");    
    word = word.replace("é", "e");     
    word = word.replace("è", "e");    
    word = word.replace("í", "i");     
    word = word.replace("ì", "i");    
    word = word.replace("ó", "o");    
    word = word.replace("ò", "o");    
    word = word.replace("ú", "u");      
    word = word.replace("ù", "u");   
    word = word.replace("ñ", "n");
    return word;
}

  function getAllIndex(){
        $.post("assets/php/search.php",{indices: 'CARGAR'},function(JSON){
            MARCAS = JSON.MARCAS;
            //console.log(MARCAS); 
            MODELOS = JSON.MODELOS;
            //console.log(MODELOS); 
            ANOS = JSON.ANOS; 
           // console.log(ANOS);            
            //console.log(ANOS.indexOf("20118"));
        },"json");      
  } 
  
  
  function getSearchIndex(word){
       console.log("MARCAS");
       console.log(MARCAS);
       console.log("MODELOS");
       console.log(MODELOS);
       console.log("ANOS");
       console.log(ANOS);
       word = word.toLowerCase();
       word =  word.trim();
      // word = reemplazar(word);
      
        if(ANOS.indexOf(word) >=0 ){
            return "anno";
        }else if(MODELOS.indexOf(word) >= 0){
            return "modelos";
        }else if(MARCAS.indexOf(word) >= 0){
            return "tipo";
        }else {
            return "";
        }
 }
$(document).ready(function(){     
    getAllIndex();
    if(!CALLED){
        RegistrarVisitante();
    }
    
    $("#rSi").removeClass('seleccionado');
    $("#rNo").removeClass('seleccionado');
    $("#errorEnganche").addClass("oculto");  
    $("#rSi").click(function(){
        $("#rNo").removeClass('seleccionado');
        $("#rSi").addClass('seleccionado');
        $("#errorEnganche").addClass("oculto"); 
        $("#errorContactanos").html("").addClass('invisible');        
        $("#errorDetalles").html("").addClass('invisible');
    });
    $("#rNo").click(function(){  
        $("#rSi").removeClass('seleccionado');
        $("#rNo").addClass('seleccionado');
        $("#errorEnganche").addClass("oculto"); 
        $("#errorContactanos").html("").addClass('invisible');        
        $("#errorDetalles").html("").addClass('invisible');
    });
    
    $('.decimales').number( true, 2 );   
    $('.decimales').change(function(){
          $('.decimales').number( true, 2 ); 
    });
    $('.decimales').on("touchstart mousedown", function() {
         $('.decimales').number( true, 2 );         
    });
    
    $('#precio').number( true, 2 ); 
    $("#precio").change(function(){
          $('#precio').number( true, 2 ); 
    });
    $('#precio').on("touchstart mousedown", function() {
         $('#precio').number( true, 2 );         
    });
  
    /*LOGIN*/
        $('.login').val(''); 
        $("#errorLogin").html("").addClass('invisible');    
        $("#emailL,#passwordL").click(function(){
            $("#errorLogin").html("").addClass('invisible');
        });
        $("#emailL,#passwordL").keyup(function(){
            $("#errorLogin").html("").addClass('invisible');
        });
        $("#btnLogin").click(function(){
            Login();
        });
        
    /*Cambiar contraseña*/
        $('.chpass').click(function(){
            $('#errorchpass').html("");
        }) ;   
        $('.chpass').change(function(){
            $('#errorchpass').html("");
        }) ;       
        $("#btnUpdatePassword").click(function(){
            UpdatePassword();
        });
    
    
    /*REGISTRO*/  
        $('.registro').val('');   
        $("#errorRegistro").html("").addClass('invisible');
        $("#email,#nombre,#password,#passwordA,#telefono,#direccion").click(function(){
            $("#errorRegistro").html("").addClass('invisible');
        });
        $("#email,#nombre,#password,#passwordA,#telefono,#direccion").keyup(function(){
            $("#errorRegistro").html("").addClass('invisible');
        });
        $("#btnRegistrar").click(function(){
            Registrar();
        });

    /*SALIR*/ 
        $("#btnSalir").click(function(){
            Salir();
        });
        
    /*CONTACTANOS*/
        $('.contactanos').val('');   
        $("#errorContactanos").html("").addClass('invisible');
        $("#contactanosNombre,#contactanosEmail,#contactanosTelefono,#contactanosDireccion,#contactanosCorreo").click(function(){
            $("#errorContactanos").html("").addClass('invisible');
        });
        $("#contactanosNombre,#contactanosEmail,#contactanosTelefono,#contactanosDireccion,#contactanosCorreo").keyup(function(){
            $("#errorContactanos").html("").addClass('invisible');
        });
        $("#btnContactanos").click(function(){
            Contactanos();
        });
        
    /*SUSCRIBETE*/  
    $("#smsEmailSuscribete").html("").removeClass("verde rojo").addClass("invisible");
    $("#emailSuscribete").click(function(){$("#smsEmailSuscribete").html("").removeClass("rojo verde").addClass("invisible");});
    $("#emailSuscribete").keyup(function(){$("#smsEmailSuscribete").html("").removeClass("rojo verde").addClass("invisible");});
    
    $("#btnSuscribete").click(function(){
        var email = $("#emailSuscribete").val();
        if(email.length === 0 || !validarEmail(email)){
           $("#smsEmailSuscribete").html("Email inválido").removeClass("invisible verde").addClass("rojo"); 
        }else{
            Suscribete(email);
        }
    });
    
    /*DETALLES*/
    
        $('.coches').val('');   
        $("#errorDetalles").html("").addClass('invisible');
        $("#detallesNombre,#detallesEmail,#detallesTelefono,#detallesDireccion,#detallesCorreo").click(function(){
            $("#errorDetalles").html("").addClass('invisible');
        });
        $("#detallesNombre,#detallesEmail,#detallesTelefono,#detallesDireccion,#detallesCorreo").keyup(function(){
            $("#errorDetalles").html("").addClass('invisible');
        });
        $("#btnDetallesEnviar").click(function(){
            DetallesCotizar();
        });
        
 
    /*BUSCAR*/
    
    $("#formBuscar").on('submit',function(e){ 
        e.preventDefault();
        var cadena = $("#inputAutocompletado").val();
        cadena =  cadena.trim();  
        if(cadena.length === 0){          
            var url = "seccion.php?q=buscar&inicio=btn&page=1";
            window.location.href = url; 
            return false;
        }
     
        
        var arrayBig = cadena.split(" ");
        var L = arrayBig.length;
        var array = [];
        var j = 0;
        for(var i=0; i<L;i++){
            var item = arrayBig[i].trim();
            if(item.length !==0){
                array[j++] = item;
            }
        }  
        console.log("Palabras clasificadas:");
        console.log(array);
        
        var L1 = array.length;
        if(L1 === 0){           
            var url = "seccion.php?q=buscar&inicio=btn&page=1"; 
            console.log("URL L1 = 0");
            console.log(url);
            window.location.href = url; 
            return false;    
        }else{
            var word = ""; 
            var OBJ = {};
            for(var i=0; i<L1;i++){            
                word = (word.length === 0)? array[i] : word+" "+array[i];
                var result = getSearchIndex(word);
                if(result.length !== 0 ){
                    if("anno" === result){
                        OBJ["annoMin"]= word; 
                        OBJ["annoMax"]= word;                          
                    }else{
                        OBJ[result]= word;  
                    }                    
                    word = "";
                }   
            }
            var url = $.param(OBJ); 
            console.log("OBJ: ");
            console.log(OBJ);
            url = "seccion.php?q=buscar&inicio=btn&"+url+"&page=1"; 
            console.log(url);
            window.location.href = url; 
            return false;
           
        }   
    });    

    $("#btnBuscarAutoCompletado").click(function(e){ 
        e.preventDefault();
        var cadena = $("#inputAutocompletado").val();
        cadena =  cadena.trim();  
        if(cadena.length === 0){          
            var url = "seccion.php?q=buscar&inicio=btn&page=1";
            window.location.href = url; 
            return false;
        }
     
        
        var arrayBig = cadena.split(" ");
        var L = arrayBig.length;
        var array = [];
        var j = 0;
        for(var i=0; i<L;i++){
            var item = arrayBig[i].trim();
            if(item.length !==0){
                array[j++] = item;
            }
        }  
        console.log("Palabras clasificadas:");
        console.log(array);
        
        var L1 = array.length;
        if(L1 === 0){           
            var url = "seccion.php?q=buscar&inicio=btn&page=1"; 
            console.log("URL L1 = 0");
            console.log(url);
            window.location.href = url;   
            return false;  
        }else{
            var word = ""; 
            var OBJ = {};
            for(var i=0; i<L1;i++){            
                word = (word.length === 0)? array[i] : word+" "+array[i];
                var result = getSearchIndex(word);
                if(result.length !== 0 ){
                    if("anno" === result){
                        OBJ["annoMin"]= word; 
                        OBJ["annoMax"]= word;                          
                    }else{
                        OBJ[result]= word;  
                    }                    
                    word = "";
                }   
            }
            var url = $.param(OBJ); 
            console.log("OBJ: ");
            console.log(OBJ);
            if(url.length === 0){
                url ="search=none";
            }
            url = "seccion.php?q=buscar&inicio=btn&"+url+"&page=1"; 
            console.log(url);
            window.location.href = url; 
            return false;
           
        }   
    });


 
}); 
$("#busquedaAvanzada").ready(function(){
    var min = $("#minimo").val();
    var max = $("#maximo").val();
    var nuevo = min+"-"+max;
    $("#slideBusquedaAvanzada").val(nuevo);//"$165,000 - $235,000"
});




function PagerOnClick(A){
        var page =  A.id;
        console.log("Pager:"+page);
        var condicion = $("btnCondicion").text();
        var tipo = $("#inputMarca").val();;
        var modelo = $("#inputModelo").val();
        var annoMin = $("#inputAnnoMinimo").val();
        var annoMax = $("#inputAnnoMaximo").val();
        var precioMin = $("#inputPrecioMinimo").val();
        var precioMax = $("#inputPrecioMaximo").val();
        var transicion = $("btnTransicion").text(); 
        var url = "seccion.php?q=buscar&condicion="+condicion+"&tipo="+tipo+"&modelos="+modelo+"&annoMin="+annoMin+"&annoMax="+annoMax+"&transicion="+transicion+"&precioMin="+precioMin+"&precioMax="+precioMax+"&page="+page;										
        window.location.href = url;
}

function ArrowNextPage(A,numPage){
    console.log("Datos");
    console.log(A.id);
    console.log(numPage);
}


