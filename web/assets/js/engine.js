$(document).ready(function(){
    var options = {	
        url: "assets/json/engine.php",
        getValue: "busqueda",
        template: {
		type: "custom",
		method: function(value, item) { 
                    //if(item.marca === "air")
			return "<img src='" + item.icono + "' width='80' heigth='50' />  "+item.marca+" "+item.modelo+" "+item.anno;
                   /* else{
                       return item.marca + " | " + value; 
                    }*/  
		}
	},
	list: {
		maxNumberOfElements: 4,
		match: {
			enabled: true
		},
                sort: {
			enabled: true
		},
                showAnimation: {
			type: "slide", //normal|slide|fade
			time: 100,
			callback: function() {}
		},
		hideAnimation: {
			type: "slide", //normal|slide|fade
			time: 400,
			callback: function() {}
		},	
                onSelectItemEvent: function() {
			console.log($("#inputAutocompletado").getSelectedItemData().marca);
			console.log($("#inputAutocompletado").getSelectedItemData().busqueda);
		},
                onClickEvent: function() {
                    var marca = $("#inputAutocompletado").getSelectedItemData().marca;
                    var modelo = $("#inputAutocompletado").getSelectedItemData().modelo;
                    var ano = $("#inputAutocompletado").getSelectedItemData().anno;                        
                    var OBJ = {};
                    OBJ['tipo'] = marca;
                    OBJ['modelos'] = modelo;
                    OBJ['anno'] = ano;         
                    var url = $.param(OBJ); 
                    url = "seccion.php?q=buscar&inicio=search&"+url+"&page=1";
                    window.location.href = url;  
		}
	}
};
$("#inputAutocompletado").easyAutocomplete(options);
    
});


