function validateForm(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	
	var activity = getValue('WKNumState');
	
	
	if (activity == ABERTURA || activity == SOLICITAR){
		if (form.getValue("finalidade") == null || form.getValue("finalidade") == "") {
            throw "Você precisa informar o objeto do contrato.";
        }
		if (form.getValue("negociacao") == null || form.getValue("negociacao") == "") {
            throw "Você precisa informar os termos da negociação.";
        }
		if (form.getValue("dtInicio") == null || form.getValue("dtInicio") == "") {
            throw "Você precisa informar a data para inicio da execução do serviço.";
        }
	   if (form.getValue("dtFim") == null || form.getValue("dtFim") == "") {
            throw "Você precisa informar a data para termino da execução do serviço.";
        }
	   
	   if (form.getValue("formapgto") == null || form.getValue("formapgto") == "") {
            throw "Você precisa informar o campo período de pagamento.";
        }
	   if (form.getValue("definicaoValor") == null || form.getValue("definicaoValor") == "") {
            throw "Você precisa informar o campo de definição de valor.";
        }
	   
	   if (form.getValue("definicaoValor") == "fixo"){
		
		   if (form.getValue("CotacaovalorMensal") == null || form.getValue("CotacaovalorMensal") == "" || parseFloat(form.getValue("CotacaovalorMensal")) == 0) {
	            throw "Você precisa informar qual o valor mensal do serviço.";
	        }
	   }
	   
	   if (form.getValue("CotacaovalorAnual") == null || form.getValue("CotacaovalorAnual") == "" || parseFloat(form.getValue("CotacaovalorAnual")) == 0) {
            throw "Você precisa informar o valor total ou o valor limite total para a vigência do contrato.";
        }
	   
	   if ( parseFloat(form.getValue("CotacaovalorAnual"))  < parseFloat(form.getValue("CotacaovalorMensal")) ){
		   throw "O valor total ou limite total não pode ser menor que o valor mensal.";
	   }
	}
	else if (activity == ASSINAR){
		if (form.getValue("statusContrato") == null || form.getValue("statusContrato") == "" ){
			 throw "Você precisa indicar se o contrato foi assinado ou recusado pelo fornecedor.";
		}
	}
	
}