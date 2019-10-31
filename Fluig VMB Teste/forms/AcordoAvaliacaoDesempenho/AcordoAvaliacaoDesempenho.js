var INICIAL = 0;
var ACORDO = 4;
var FEEDBACK1 = 5;
var FEEDBACK2 = 9;
var AVALIACAO = 11;

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
	// $("#acao___1").val() =="" verificar se o campo esta vazio, se sim deixar deletar	
	if (ATIVIDADE != INICIAL && ATIVIDADE != ACORDO ){
			//verificar se o campo meta esta vazio
			//se sim, permitir excluir
			
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
  
    if (ATIVIDADE == INICIAL || ATIVIDADE == ACORDO){
    	  var indice = wdkAddChild('tableMetas');
    	 //$('td:nth-child(5)').hide();
    	 $('td:nth-child(6)').hide();
    	 $('td:nth-child(7)').hide();
    	 $('td:nth-child(8)').hide();
    	 $('td:nth-child(9)').hide();
    	 $('td:nth-child(10)').hide();
    	 $('td:nth-child(11)').hide();
    	 $('td:nth-child(12)').hide();
    	 $('td:nth-child(13)').hide();
    	 
    }
    
    if (ATIVIDADE == FEEDBACK1 || ATIVIDADE == FEEDBACK2 ){
    	var indice = wdkAddChild('tableMetas');
    	//BLOQUEAR CAMPOS DE FEEDBACK 1
    }
   
    
}

function clickProgresso(){
	if (document.getElementById("verde").checked == true){
		$('#div_14').css('background-color', '#008000');	
	}
	else if (document.getElementById("amarelo").checked == true){
		$('#div_14').css('background-color', '#FFFF00');	
	}
	else if (document.getElementById("vermelho").checked == true){
		$('#div_14').css('background-color', '#FF0000');	
	}
	
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









