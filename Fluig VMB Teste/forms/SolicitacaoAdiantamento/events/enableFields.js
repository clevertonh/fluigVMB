function enableFields(form){ 
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	//form.setEnabled("projeto", false);
	//form.setEnabled("fontefinanciamento", false);
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
		 
		 var aprovador = usuarioAprovador();
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("gestor",aprovador.getValue(0, "GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 	 
		 }
		 
		 form.setEnabled("vl_aprovado", false);
		 
	}
	
	else if (activity == APROVACAO_GESTOR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 
		
		
	}
	

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	function usuarioAprovador(){	
		 var dataset = DatasetFactory.getDataset("VM_Aprovador", null, null, null);
		 
		 return dataset;
	}
	
}




//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}

//recebe data JS e convert para data FLuig
function convertDataToString(dataToString) {
    var dia;

    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
    var mes = dataToString.getMonth() + 1;

    console.log("MES: " + mes);

    if (dataToString.getDate().toString().length == 1) {
        dia = dataToString.getDate();
        dia = "0" + dia.toString();

    } else {
        dia = dataToString.getDate();

    }

    console.log("TAMANHO MES: " + mes.toString().length);
    //converte mes
    if (mes.toString().length == 1) {
        mes = "0" + mes.toString();

    }
    //else {mes = dataToString.getMonth() + 1;}


    //novo formato de data: para salvar em campos data do Fluig
    return dia + "/" + mes + "/" + dataToString.getFullYear();


}

function addDias(data, dias) {
    return new Date(data.setDate(data.getDate() + dias));;

}
