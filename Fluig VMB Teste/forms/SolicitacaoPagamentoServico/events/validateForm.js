function validateForm(form){	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var INCLUIR_MEDICAO = 87;
	var AGUARDAR_APROVACAO = 65;
	var CORRIGIR = 92;
	var ANEXAR_RELATORIO = 74;
	var ENCERRAR_MEDICAO = 13;
	var CLASSIFICAR_NOTA = 51;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser"); 
	
	if (activity == SOLICITAR ){
		if (parseFloat(form.getValue("saldoAtual")) <=  parseFloat(form.getValue("vl_servico"))){
			 throw "O contrato não possui saldo suficiente para pagar essa nota fiscal.";
		}
	}
	
	
	
	
}