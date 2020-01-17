function enableFields(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	var CADASTRAR_CONTRATO = 44;
	
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	
	 
	 
	 
	 if (activity == ABERTURA || activity  == SOLICITAR){
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 //data do dia
         var dataAtual = new Date();         
         var dataSolicitacao = convertDataToString(dataAtual);
         form.setValue("dataSolicitacao",dataSolicitacao);
		 
	}
	 else if (activity == ELABORAR ){
		 var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		  //  form.setEnabled("cnpjcpf", true);
	 }
	 
	 else if (activity == ASSINAR   ){
		 var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("statusContrato", true);
		    form.setEnabled("tipoContrato", true);
	 }
	 
		
	 else if (activity == CADASTRAR_CONTRATO){		
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
			 
			
		}
	 
	 
	 
	 
		function UsuarioLogado(solicitante){
			 var constraints   = new Array();
			 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
			 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			 
			 return dataset;
		}
		
		
		function convertDataToString(dataToString) {
		    var dia;

		    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
		    var mes = dataToString.getMonth() + 1;
		    if (dataToString.getDate().toString().length == 1) {
		        dia = dataToString.getDate();
		        dia = "0" + dia.toString();

		    } else {
		        dia = dataToString.getDate();

		    }

		 
		    //converte mes
		    if (mes.toString().length == 1) {
		        mes = "0" + mes.toString();

		    }

		    //novo formato de data: para salvar em campos data do Fluig
		    return dia + "/" + mes + "/" + dataToString.getFullYear();


		}
	 
}