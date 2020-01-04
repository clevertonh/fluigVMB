var INICIAL = 0;
var ACORDO = 4;
var FEEDBACK1 = 5;
var FEEDBACK2 = 9;
var AVALIACAO = 15;
var RESULTADO = 11;
var MATRICIAL = 20;



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
var dtAcordo;


//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {		
	if (ATIVIDADE == INICIAL ){
		dtAcordo = FLUIGC.calendar('#dataAcordo', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});

		//dtAcordo.setDate(new Date().toLocaleString());
		
		
		
		
	}
	else if (ATIVIDADE == ACORDO){
		
	    	 $('td:nth-child(7)').hide();
	    	 $('td:nth-child(8)').hide();
	    	 $('td:nth-child(9)').hide();
			 $('td:nth-child(10)').hide();
			 $('td:nth-child(11)').hide();
			 $('td:nth-child(12)').hide();
			 $('td:nth-child(13)').hide();
			 $('td:nth-child(14)').hide();
	    	 $('td:nth-child(15)').hide();
	     	 $('td:nth-child(16)').hide();
	      	 $('td:nth-child(17)').hide();
	     	 $('td:nth-child(18)').hide();
	   	 
			 $('#div_comentario4').hide();
			 $('#div_comentario5').hide();
			 $('#div_comentario6').hide();
			 $('#div_progresso2').hide();
	}
	else if (ATIVIDADE == FEEDBACK1 ){
			// $('td:nth-child(10)').hide();
			 $('td:nth-child(11)').hide();
	    	 $('td:nth-child(12)').hide();
	    	 $('td:nth-child(13)').hide();
	    	 $('td:nth-child(14)').hide();
	    	 $('td:nth-child(15)').hide();
	     	 $('td:nth-child(16)').hide();
	      	 $('td:nth-child(17)').hide();
	     	 $('td:nth-child(18)').hide();
	    	 
	    	 $('#div_comentario4').hide();
			 $('#div_comentario5').hide();
			 $('#div_comentario6').hide();
			 $('#div_progresso2').hide();
			 
			 $('#div_comentario7').hide();
			 $('#div_comentario8').hide();
			 $('#div_comentario9').hide();
			 $('#div_progresso3').hide();
			 
			 
	}
	
	else if (ATIVIDADE == FEEDBACK2 ){
		// $('td:nth-child(14)').hide();
    	 $('td:nth-child(15)').hide();
     	 $('td:nth-child(16)').hide();
      	 $('td:nth-child(17)').hide();
     	 $('td:nth-child(18)').hide();
   	 
 		 
		 $('#div_comentario7').hide();
		 $('#div_comentario8').hide();
		 $('#div_comentario9').hide();
		 $('#div_progresso3').hide();
		 
		 
}

	//reloadZoomFilterValues("Funcionario", "EMAIL_G," + $("#emailGestor").val());
	

});

$("#dataAcordo").blur(function(){

	reloadZoomFilterValues("Funcionario", "EMAIL_G," + $("#emailGestor").val());

	});




function fnCustomDeleteMeta(oElement) {	 
	
	if (ATIVIDADE == INICIAL || ATIVIDADE == ACORDO ){
		fnWdkRemoveChild(oElement);	
	}
	else {
		
     	if ($("input[id^='codCompetencia___']:last").val() =="") {
			fnWdkRemoveChild(oElement);	
		}
		else {
			FLUIGC.toast({
	            title: 'Atenção',
	            message: 'Você não pode remover essa informação.',
	            type: 'warning',
	            timeout: 3000
	        });
		}
		
		
		
		

	}
	
		
}

//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
    var BENEFICIARIO ="Funcionario";
    var COMPETENCIA ="txcompetencia";

     
    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');

     if (campoZOOM == BENEFICIARIO){
    		$("#dataAdmissao").val(selectedItem["DT_ADMISSAO"]);    		
    		$("#funcao").val(selectedItem["FUNCAO"]);
    		
    		buscaGestorMatricial(selectedItem["EMAIL_F"]);
    		
    		
     } 
     else if (linhaPagamento[0] == COMPETENCIA){
    			$('#codCompetencia' + "___" + linhaPagamento[1]).val(selectedItem["CODIGO"]);
     }
    
    
}


function buscaGestorMatricial(emailFuncionario){
	    var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("EMAIL_F", emailFuncionario, emailFuncionario, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_Funcionario", null, constraints, null);

	    if (dataset != null && dataset.values.length > 0) {
	    	
			 var nomeMatricial = dataset.values[0]["GESTOR_MATRICIAL"];
	    	 $("#gestorMatricial").val(nomeMatricial);
	    	 
	    	 var emailMatricial = dataset.values[0]["EMAIL_MATRICIAL"];
	    	 $("#emailMatricial").val(emailMatricial);

	    	 var constraints2  = new Array(); 
	    	 constraints2.push(DatasetFactory.createConstraint("mail", emailMatricial, emailMatricial, ConstraintType.MUST));
			 var dataset2 = DatasetFactory.getDataset("colleague", null, constraints2, null);
			 
		   	 if (dataset2 != null && dataset2.values.length > 0){
		   	    $('#matriculaMatricial').val(dataset2.values[0]["colleaguePK.colleagueId"]);
		   	 }
			 

	    }
	    
	    
	   
}



function setZoomData(instance, value) {
    window[instance].setValue(value);
}



function adicionaMeta() {
  
    if (ATIVIDADE == INICIAL || ATIVIDADE == ACORDO){
    	 var indice = wdkAddChild('tableMetas1');
    	 
//    	 $('td:nth-child(5)').hide();
//    	 $('td:nth-child(6)').hide();
    	 $('td:nth-child(7)').hide();
    	 $('td:nth-child(8)').hide();
    	 $('td:nth-child(9)').hide();
    	 
    	 $('td:nth-child(10)').hide();
    	 $('td:nth-child(11)').hide();
    	 $('td:nth-child(12)').hide();
    	 $('td:nth-child(13)').hide();
    	 
    	 
     	 $('td:nth-child(14)').hide();
    	 $('td:nth-child(15)').hide();
     	 $('td:nth-child(16)').hide();
      	 $('td:nth-child(17)').hide();    	 
      	 $('td:nth-child(18)').hide();
    	 
    	 
    	 
    }
    
    else if (ATIVIDADE == FEEDBACK1  ){
    		var indice = wdkAddChild('tableMetas1');
    		//OCULTA COLUNAS DO FEEDBACK 2
    		 $('td:nth-child(10)').hide();
    		 $('td:nth-child(11)').hide();
        	 $('td:nth-child(12)').hide();
        	 $('td:nth-child(13)').hide();
        	 
        	 $('#div_comentario4').hide();
    		 $('#div_comentario5').hide();
    		 $('#div_comentario6').hide();
    		 $('#div_progresso2').hide();
    		 
        	 
    }
    
    else if ( ATIVIDADE == FEEDBACK2 ){
			var indice = wdkAddChild('tableMetas1');
			 //BLOQUEAR CAMPOS DE FEEDBACK 1		
			$( "#comentarioF___"+indice ).prop( "disabled", true );
			$( "#campo10___"+indice ).prop( "disabled", true );
			$( "#comentarioG___"+indice ).prop( "disabled", true );
				
}
    
   
    
}



function removedZoomItem(removedItem) {   
    var BENEFICIARIO ="Funcionario";
    var COMPETENCIA ="txcompetencia";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    
    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');

   if (campoZOOM == BENEFICIARIO){
		$("#dataAdmissao").val("");
		$("#emailGestorImediato").val("");
		$("#funcao").val("");
	} 
   
   else if (linhaPagamento[0] == COMPETENCIA){
	   		$('#codCompetencia' + "___" + linhaPagamento[1]).val("");
   }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}









