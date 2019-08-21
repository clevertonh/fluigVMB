var INICIAL = 0;
var ACORDO = 4;

var dtAcordo;

//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

  var $target = $(e.target);

  if ($target.parent().hasClass('disabled')) {
      return false;
  }
});

$(".next-step").click(function(e) {

  var $active = $('.wizard .nav-tabs li.active');
  $active.next().removeClass('disabled');
  nextTab($active);

});
$(".prev-step").click(function(e) {

      var $active = $('.wizard .nav-tabs li.active');
      prevTab($active);

  }

);

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

var visibilidade = true;



//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == INICIAL || ATIVIDADE == ACORDO){
		dtAcordo = FLUIGC.calendar('#dataAcordo', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});

		dtAcordo.setDate(new Date().toLocaleString());
		
	}

	
});


function fnCustomDeleteMeta(oElement) {	  
		if (ATIVIDADE != INICIAL && ATIVIDADE != ACORDO){						
			FLUIGC.toast({
                title: 'Atenção',
                message: 'Você não pode remover essa informação.',
                type: 'warning',
                timeout: 3000
            });
		}
		else {
			fnWdkRemoveChild(oElement);	
		}		
	}


//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
    var BENEFICIARIO ="beneficiario";
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;

     if (campoZOOM == BENEFICIARIO){
    		$("#cpfbeneficiario").val(selectedItem["CPF"]);
    } 
    
    
}

function adicionaMeta() {
    var indice = wdkAddChild('tableMetas');

    
    
    
    
}

function removedZoomItem(removedItem) {   
    var BENEFICIARIO ="beneficiario";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

   if (campoZOOM == BENEFICIARIO){
		$("#cpfbeneficiario").val("");
	} 

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}









