function validateForm(form){	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var INCLUIR_MEDICAO = 87;
	var AGUARDAR_APROVACAO = 65;
	var CORRIGIR = 92;
	var ANEXAR_RELATORIO = 74;
	var ENCERRAR_MEDICAO = 13;
	var PRE_NOTA = 100;
	var CLASSIFICAR_NOTA = 51;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser"); 
	
	if (activity == SOLICITAR ){
		if (parseFloat(form.getValue("saldoAtual")) <  parseFloat(form.getValue("vl_servico"))){
			 throw "O contrato não possui saldo suficiente para pagar essa nota fiscal.";
		}
	}
	else if (activity == INCLUIR_MEDICAO){
		if (form.getValue("validacao") == "" || form.getValue("validacao") == null){
			throw "Você precisa indicar se valida ou invalida a nota fiscal e relatório enviado pelo usuário.";
		}
		
		
		 if (form.getValue("validacao") == "invalido" && form.getValue("justificativaR")  == "" ) {
             throw "Você precisa informar o motivo por invalidar a solicitação.";
         }
   	        
		
	}
	
	
	
	
}