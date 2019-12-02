$(document).ready(function(){
 /*
 var cacheMarcaModelo = {};
 $("#inputAutocompletado").autocomplete({          
        minLength: 1,
        source: function( request, response ) {
            var term = request.term;
            if (term in cacheMarcaModelo) {
              response(cacheMarcaModelo[ term ]);
              return;
            }
            $.getJSON("assets/php/search.php?marca_modelo_anno="+$("#inputAutocompletado").val(), request, function(data,status,xhr) {
                  cacheMarcaModelo[term] = data;
                  response(data);
            });
        }
  });      
 */

 var cacheMarca = {};//
 $("#inputMarcaNuevo,#inputMarcaUsado,#autosTipoed" ).autocomplete(
        {   
            minLength: 1,
            source: function( request, response ) {
                var term = request.term;
                if (term in cacheMarca) {
                  response(cacheMarca[ term ]);
                  return;
                }
                $.getJSON("assets/php/search.php?marca="+$("#inputAutocompletado").val(), request, function(data,status,xhr) {
                      cacheMarca[term] = data;
                      response(data);
                });
            }
        }
    ); 
    
    var cacheModelo = {};
    $("#inputModeloNuevo,#inputModeloUsado,#autosModeloed" ).autocomplete({   
            minLength: 1,
            source: function( request, response ) {
                var term = request.term;
                if (term in cacheModelo) {
                  response(cacheModelo[ term ]);
                  return;
                }
                $.getJSON("assets/php/search.php?modelo="+$("#inputAutocompletado").val(), request, function(data,status,xhr) {
                      cacheModelo[term] = data;
                      response(data);
                });
            }
    }); 
    
    /*
    var cacheAnno = {};
    $("#inputAutocompletado" ).autocomplete({   
            minLength: 1,
            source: function( request, response ) {
                var term = request.term;
                if (term in cacheAnno) {
                  response(cacheAnno[ term ]);
                  return;
                }
                $.getJSON("assets/php/search.php?anno="+$("#inputAutocompletado").val(), request, function(data,status,xhr) {
                      cacheAnno[term] = data;
                      response(data);
                });
            }
    });
    
     $.get("assets/php/search.php?",{dame:$("#inputAutocompletado").val()},function(data){
            console.log(data);
        });
    */
    /*$("#btnBuscarAutoCompletado").click(function(){         
       
    });*/
    
});


