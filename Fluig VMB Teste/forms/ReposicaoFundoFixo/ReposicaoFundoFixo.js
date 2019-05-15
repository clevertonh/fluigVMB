var INICIO =0;
var ABERTURA = 4;
var APROVACAO = 5;


var dtSolicitacao;
var dtAprovacao;

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


//termina aqui o read

function nextTab(elem) {
  $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
  $(elem).prev().find('a[data-toggle="tab"]').click();
}

var visibilidade = true;

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO){
		dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
		
	}

	if (ATIVIDADE == APROVACAO){
		dtAprovacao = FLUIGC.calendar('#dtAprovacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtAprovacao.setDate(new Date().toLocaleString());
	}
	
	
	
});




//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
   var RESPONSAVEL ="responsavel";
    	 
    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
    if (campoZOOM == RESPONSAVEL){
    	 $("#cpfbeneficiario").val(selectedItem["CPF"]);
    
    } 
    
}

function removedZoomItem(removedItem) {
	var RESPONSAVEL ="responsavel";

    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    if (campoZOOM == RESPONSAVEL){
   	 	$("#cpfbeneficiario").val("");
    }
  
}


