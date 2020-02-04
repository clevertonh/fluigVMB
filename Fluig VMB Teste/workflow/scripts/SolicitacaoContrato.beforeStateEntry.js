function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	var ANEXAR = 44;
	var ADITIVO = 49;
	
	var ativAtual 		 = getValue("WKNumState");		
	var codSolicitacao 	 = getValue("WKNumProces");
	var nextAtv  		 = getValue("WKNextState");
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
    var usuario = getValue('WKUser');
    
	var definicaoValor = hAPI.getCardValue("definicaoValor");	
	var contrato = hAPI.getCardValue("Numerocontrato");
	var statusContrato = hAPI.getCardValue("statusContrato");
	var tipoContrato = hAPI.getCardValue("tipoContrato");	   
	var tipoRevisao = hAPI.getCardValue("tipoRevisao");
	var filial = hAPI.getCardValue("filial");
	var cgc = hAPI.getCardValue("cnpjcpf");
	

	

	
    if (ativAtual == ASSINAR){
    	if (nextAtv == 37){
    		//O CONTRATO FOI ASSINADO E É UM NOVO CONTRATO
			if (statusContrato =="assinado" && (tipoContrato !="" || tipoRevisao != "")){				
		//		setContrato(idDocumento,3); 				
			}
    		
    	}
    }
    else if (ativAtual == ANEXAR && tipoContrato != ""){
    		//VERIFICA SE EXISTE ANEXO NO CONTRATO
    		var lAnexo = getContratoAtivo(cgc,contrato);
    		
    		if (lAnexo == false){
    			throw "É necessário que o contrato esteja vigente. Aguarde 30 minutos e tente novamente mais tarde.";
    		}
    		    		
    }
    
    
    
    
    function setContrato(id,opcao){
			 var constraints = new Array();                                 
			 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
			 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
		     var resultDataset = DatasetFactory.getDataset("VM_CNTA300_SOLICITACAO_CONTRATO", null, constraints, null);                                                                    
		    		     
		         if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		             throw resultDataset.getValue(0,"RETORNO");
		         }
		         else {
		        	 	hAPI.setTaskComments(usuario, codSolicitacao, 0, "Contrato registrado automaticamente. Filial+Número+Revisão: " + filial+'-'+resultDataset.getValue(0,"NUMERO")+'-'+resultDataset.getValue(0,"REVISAO"));		        	 	
		        	 	//GRAVA NUMERO DO CONTRATO NO FORMULARIO
						hAPI.setCardValue("Numerocontrato",resultDataset.getValue(0,"NUMERO"));
						hAPI.setCardValue("filial",filial);
						hAPI.setCardValue("revisao",resultDataset.getValue(0,"REVISAO"));
						
		         }
    
    }
    //https://tdn.totvs.com/display/public/fluig/Guia+de+propriedades+dos+objetos#GuiadePropriedadesdosObjetos-DocumentDto
    //https://tdn.totvs.com/display/public/fluig/hAPI
    //https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Eventos#DesenvolvimentodeEventos-DocumentDto
    //https://tdn.totvs.com/display/public/fluig/docAPI
    
    
    
    function getContratoAtivo(cgc,contrato){
    	var constraints = new Array();                                 
		constraints.push(DatasetFactory.createConstraint("CGC", cgc, cgc, ConstraintType.MUST)); 
    	var listaContratos = DatasetFactory.getDataset("ds_get_Contratos", null, constraints, null);                                                                    
	    		
	     for (var i =0; i < listaContratos.rowsCount ; i++  ){	    
	    	 if (listaContratos.getValue(i,"CONTRATO") == contrato){
	    		 return true;
	    	 }
	    	 
	     }
	  return false;
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