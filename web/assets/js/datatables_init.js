function ConfigurarTabla(code){
    var $table = jQuery("#table");
    
          
    var table; 
    if(code ==='exportar'){
        var exportar  = {dom:'Bfrtip',buttons:['copyHtml5','excelHtml5','pdfHtml5'],'bStateSave':true,language: {url: 'assets/js/datatables/espannol.json'}};
        table = $table.DataTable(exportar);
    }else if(code === 'reportes'){
        var reportes = {"aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],language: {url: 'assets/js/datatables/espannol.json'}};    
        table = $table.DataTable(reportes);
    }
    $table.closest('.dataTables_wrapper').find('select').select2({
            minimumResultsForSearch: -1 
    });
}
function ConfigurarTablaID(table_id,code){
    var id = "#"+table_id;
    var $table = jQuery(id);
    
    
       
          
    var table; 
    if(code ==='exportar'){
        var exportar  = {dom:'Bfrtip',buttons:['copyHtml5','excelHtml5','pdfHtml5'],'bStateSave':true,language: {url: 'assets/js/datatables/espannol.json'}};
        table = $table.DataTable(exportar); 
    }else if(code === 'reportes'){
        var reportes = {"aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],language: {url: 'assets/js/datatables/espannol.json'}}; 
        table = $table.DataTable(reportes);
    }
    $table.closest('.dataTables_wrapper').find('select').select2({
            minimumResultsForSearch: -1 
    });
}