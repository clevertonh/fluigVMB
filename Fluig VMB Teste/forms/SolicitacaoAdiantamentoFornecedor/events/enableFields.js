function enableFields(form){ 
	
	var ABERTURA = 0;
	var GERAR_ADTO = 10;
	var GERAR_ADF_CARTAO = 24;
	var GERENTE_ADM = 31;
	var DIRETOR_FINANCEIRO = 5;
	var DIRETOR_MKT = 48;
	var DIRETOR_RH = 50;
	var DIRETOR_ADVOCACY = 52;
	var DIRETOR_MINISTERIO = 54;
	var DIRETOR_NACIONAL = 46;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeUsuario = dataset.getValue(0, "colleagueName");
	 var emailUsuario = dataset.getValue(0, "mail");
	 
	 
	 form.setEnabled("matriculasolicitante", true);	
	 form.setEnabled("prazoaprovacao", true);	
	 form.setEnabled("prazoaprovacaoDIR", true);	
	 
	 
	
	if (activity == ABERTURA){
		form.setEnabled("aprovacao", false);	
		form.setEnabled("justificativaReprovacao", false);
		 
	
		 
		 form.setValue("solicitante",nomeUsuario);
		 form.setValue("emailSolicitante",emailUsuario);
		

	
		 
	}
	
	else if (activity == GERENTE_ADM){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 
		 	var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("aprNivel1", true);		 
			form.setEnabled("justificativaReprovacao", true);
			
			
			 form.setValue("nomeNivel1",nomeUsuario);
			 form.setValue("emailNivel1",emailUsuario);
		
			
	}
	
	else if (activity == DIRETOR_FINANCEIRO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel2", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel2",nomeUsuario);
		 form.setValue("emailNivel2",emailUsuario);
	 
		 
	}
	
	else if (activity == DIRETOR_MKT){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel3", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel3",nomeUsuario);
		 form.setValue("emailNivel3",emailUsuario);
		 
	}
	
	else if (activity == DIRETOR_RH){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel4", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel4",nomeUsuario);
		 form.setValue("emailNivel4",emailUsuario);
		 
	}
	else if (activity == DIRETOR_ADVOCACY){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel5", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel5",nomeUsuario);
		 form.setValue("emailNivel5",emailUsuario);
		 
	}
	else if (activity == DIRETOR_MINISTERIO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel6", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel6",nomeUsuario);
		 form.setValue("emailNivel6",emailUsuario);
		 
	}
	else if (activity == DIRETOR_NACIONAL){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	   
	    form.setEnabled("aprNivel7", true);
	    form.setEnabled("justificativaReprovacao", true);
	    
		 form.setValue("nomeNivel7",nomeUsuario);
		 form.setValue("emailNivel7",emailUsuario);
		 
	}
	
	else if (activity == GERAR_ADTO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setEnabled("banco", true);
	    form.setEnabled("agencia", true);
	    form.setEnabled("contabanco", true);
	    form.setEnabled("dtEmissao", true);	
	}
	else if (activity == GERAR_ADF_CARTAO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setEnabled("cartaocredito", true);		 
	    form.setEnabled("dtEmissao", true);
	}
	
	
	
	

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	function usuarioAprovador(emailSolicitante){		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);

		return dataset;
	}
	
	function diretorFinanceiro(){
		var constraintDiretor = new Array();
	 	constraintDiretor.push(DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "DIRETOR_FIN", "DIRETOR_FIN", ConstraintType.MUST));
		var datasetDiretor = DatasetFactory.getDataset("workflowColleagueRole", null, constraintDiretor, null);
		
		return datasetDiretor;
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
