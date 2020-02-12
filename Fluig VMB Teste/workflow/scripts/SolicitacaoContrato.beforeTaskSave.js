function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	var ANEXAR = 44;
	var ADITIVO = 49;
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");	
	
	if (ativAtual == ABERTURA || ativAtual == SOLICITAR){
		var dataAtual = new Date();         
	    var dataSolicitacao = convertDataToString(dataAtual);
	         
		hAPI.setCardValue("dataSolicitacao", dataSolicitacao);
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