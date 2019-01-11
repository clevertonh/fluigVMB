function inputFields(form){
	var VALIDACAO = 48;
		
	if (activity == VALIDACAO){
		
		//recupera data de pagamento do Fluig
		var dtPagamento = form.getValue("dtPagamento");
		var dtPagamentoConvertida = convertStringToData(dtPagamento);
		
		var dtPrazoConvertida = convertDataToString(addDias(dtPagamentoConvertida,-1));
		
		//set prazo de aprovação
		form.setValue("dtPrazoApr",dtPrazoConvertida);
		
		
	}
	
	
	
}