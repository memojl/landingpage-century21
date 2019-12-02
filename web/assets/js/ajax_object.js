var AJAX = new function(){
    /*Funcion para guardar informacion en una base de datos*/
    this.SendData = function(Url,Obj){
        var OK = false;	
        var sending = $.ajax({method:"POST",async: false,url:Url,cache:false,data:Obj});
        sending.done(function(answer){ 
                OK =  true;
                console.log("[SendData] OK: "+Obj.WHO+" "+answer);
        });
        /*sending.fail(function(textStatus){
            var text = "[SendData] ERROR: '"+Obj.WHO +"' "+Url+" TYPE:"+textStatus;
            console.log(text);  
        });*/	
        sending.fail(function(xhr, status, error){
            var text = "[SendData] ERROR: '"+Obj.WHO +"' "+Url+" TYPE:"+status;
            console.log(text);
            text = "[SendData] ERROR: '"+Obj.WHO +"' "+Url+" xhr.responseText:"+xhr.responseText;
            console.log(text);
            text = "[SendData] ERROR: '"+Obj.WHO +"' "+Url+" Error:"+error;
            console.log(text);  
        });
        return OK;        
     };
    /*Funcion para saber el numero de elementos en una base de datos
     * var existe =  AJAX.ThereIs("modulos/proceso/proceso.logic.php",{dibujo:proceso.DIBUJO_NO});
     * */
    this.ThereIs = function(Url,Obj){
        var num = 0;		
        var sending = $.ajax({method:"POST",async: false,url:Url,data:Obj});		
        sending.done(function(answer){   
            num=answer;
            console.log("[ThereIs] OK: "+Obj.WHO+" "+answer);			   
        });
        sending.fail(function(xhr, status, error){
            var text = "[ThereIs] ERROR: '"+Obj.WHO +"' "+Url+" TYPE:"+status;
            console.log(text);
            text = "[ThereIs] ERROR: '"+Obj.WHO +"' "+Url+" xhr.responseText:"+xhr.responseText;
            console.log(text);
            text = "[ThereIs] ERROR: '"+Obj.WHO +"' "+Url+" Error:"+error;
            console.log(text);  
        });        
        return parseInt(num);
    };
    /*Funcion para recoger un arreglo PHP  de tipo JSON
        var parametros  = {last:'X'};  
        var proceso =  AJAX.ReadData("modulos/proceso/proceso.logic.php",parametros);  
     * */
    this.ReadData =  function(Url,Obj){
        var dataJSON={}; 
        var sending = $.ajax({method:"POST",async: false,url:Url,data:Obj,dataType:'json'});        
        sending.done(function(answer){
            dataJSON = answer;
            console.log("[ReadData] OK : "+Obj.WHO+" "+answer);            
        });
        sending.fail(function(xhr, status, error){ 
            var text = "[ReadData] ERROR: '"+Obj.WHO +"' "+Url+" TYPE:"+status;
            console.log(text);
            text = "[ReadData] ERROR: '"+Obj.WHO +"' "+Url+" xhr.responseText:"+xhr.responseText;
            console.log(text);
            text = "[ReadData] ERROR: '"+Obj.WHO +"' "+Url+" Error:"+error;
            console.log(text); 
        }); 
        return dataJSON;
    };
    this.ReadCadena =  function(Url,Obj){
        var cadena= "";   
        var sending = $.ajax({method:"POST",async: false,url:Url,data:Obj});        
        sending.done(function(answer){
            cadena = answer;            
            console.log("[ReadCadena] OK : "+Obj.WHO+" "+answer);
                                  
        });
        sending.fail(function(xhr, status, error){
            var text = "[ReadCadena] ERROR: '"+Obj.WHO +"' "+Url+" TYPE:"+status;
            console.log(text);
            text = "[ReadCadena] ERROR: '"+Obj.WHO +"' "+Url+" xhr.responseText:"+xhr.responseText;
            console.log(text);
            text = "[ReadCadena] ERROR: '"+Obj.WHO +"' "+Url+" Error:"+error;
            console.log(text); 
        }); 
        return cadena;
    };
    
};