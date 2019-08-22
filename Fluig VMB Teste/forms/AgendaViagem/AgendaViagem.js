var ABERTURA = 0;
var APROVACAO = 5;
var REVISAR_AGENDA = 13;

var dateCadastro = FLUIGC.calendar('#calendariodtcadastro', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

$(document).ready(function() {

	var dtPeriodoDe = FLUIGC.calendar('#calendarPeriodoDe', {
		pickDate: true,
		pickTime: false,
		useCurrent: true,
	    minDate: new Date(),
	}).setDate($('#calendarPeriodoDe :input').attr('value') != null ? $("#calendarPeriodoDe :input").attr('value') : new Date());

		

	var dtPeriodoAte = FLUIGC.calendar('#calendarPeriodoAte', {
		pickDate: true,
		pickTime: false,
		useCurrent: true,
	    minDate: new Date(),
	}).setDate($('#calendarPeriodoAte :input').attr('value') != null ? $("#calendarPeriodoAte :input").attr('value') : new Date());



	if (ATIVIDADE == ABERTURA){
		dateCadastro.setDate(new Date().toLocaleString());
	}

	

	
});

function adicionaLinha() {
	var row = wdkAddChild('tbAgendaViagem');
	FLUIGC.calendar("#calendarPeriodoDe___" + row, {
		minDate : new Date(),
	});
	
	FLUIGC.calendar("#calendarPeriodoAte___" + row, {
		minDate : new Date(),
	});
	

	if (ATIVIDADE == REVISAR_AGENDA){
		$("#alteracaoAgenda").val("sim");

      
	}
	
	
}



function buscaAtividades() {
	
	var documento = document.getElementById("documento").value;
	
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));	
    constraints.push(DatasetFactory.createConstraint("metadata#id", documento, documento, ConstraintType.MUST));
        
    var dataset = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);

    
    
    constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("tablename", "tbAgendaViagem", "tbAgendaViagem", ConstraintType.MUST));
     
    dataset = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);
    
    if (dataset != null && dataset.values.length > 0) {
    	avaliarAtividades(dataset.values);
    }
}

function avaliarAtividades(itens) {
	 
   	for (var i = 0; i < itens.lenght; i++) {
    	 // $('#aprovacaoS___'+i).attr("checked", true);     	  
    	 // $('#aprovacaoS___'+i).val("aprovado");
    	}
 
/*	
	
	//aprova todas as atividades
        if (document.getElementById("agendaAprovada")){
        	for (var i = 0; i < itens.lenght; i++) {
        	//  $('#aprovacaoS___'+i).attr("checked", true);     	  
        	//  $('#aprovacaoS___'+i).val("aprovado");
        	}
        }
        //reprova todas as atividades
        else if (document.getElementById("agendaReprovada")){
        	for (var i =0; i < itens.lenght; i++) {
        //	 $('#aprovacaoN___'+i).attr("checked", true);
        }
        }
  */  
}


function aprovacaoGeral(){
	buscaAtividades();
}


function reprovacaoGeral(){
	
}



