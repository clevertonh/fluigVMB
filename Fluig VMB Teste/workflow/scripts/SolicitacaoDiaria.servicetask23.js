function servicetask23(attempt, message) {
	   //RECUPERA NUMERO DA ATIVIDADE
    var ativAtual = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento = getValue("WKCardId");
    var idFormulario = getValue("WKFormId")
    var empresa = getValue("WKCompany");
    
    var dtAtual = new Date();
        
    var constraint = new Array();                                 
    constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
    
    var resultDataset = DatasetFactory.getDataset("ds_get_Pagamentos", null, constraint, null);
          
     
  	if (resultDataset !== null && resultDataset.rowsCount >0 ){
 		if (resultDataset.getValue(0,"DATA_PAGAMENTO") != ''){
 			//preenche data de pagamento
        	hAPI.setCardValue("dtBaixa",resultDataset.getValue(0,"DATA_PAGAMENTO"));  	
 		}
 		else {
 			 throw 'Pagamento atrasado!';
 		}     		     	
 	}
 	else {
 		 throw 'Pagamento não localizado!';
 	}

}

//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}