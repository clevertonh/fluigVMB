function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var INICIAR = 0;
	var SOLICITAR = 56;
	var GERENTE_ADM =5;
	var DIRETOR_FIN = 35;
	var DIRETOR_RH = 11;
	var DIRETOR_MINISTERIO = 13;
	var DIRETOR_MKT = 15;
	var DIRETOR_ADVOCACY = 18;
	var DIRETOR_NACIONAL = 27;
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");	
	
	if (ativAtual == INICIAR || ativAtual == SOLICITAR){
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