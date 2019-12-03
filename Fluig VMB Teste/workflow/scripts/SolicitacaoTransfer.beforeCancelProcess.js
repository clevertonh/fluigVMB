function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO = 5;
	var COTACAO = 15;
	var CORRIGIR = 12;
	var VALIDAR_RH = 30;
	var SOLICITAR_APROVACAO = 28;
	var APROVACAO_SERVICO = 36;
	var SOLICITAR_CONTRATO = 37;
	var SOLICITACAO_CONTRATO = 43;
	var VERIFICAR_ASSINATURA = 44;
	var FINALIZAR = 48;
	
	
	//RECUPERA NUMERO DA ATIVIDADE
    var ativAtual               = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao    = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv           = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento = getValue("WKCardId");
    var idFormulario = getValue("WKFormId")
    var empresa = getValue("WKCompany");
    //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
    
    
    //Opção desejada: 3-Inclusão; 4-Alteração ; 5-Exclusão ; 7-Aprovação (Somente versão Protheus 10)  
    var opcao = 5;
    
    if (ativAtual == COTACAO || ativAtual == VALIDAR_RH ||
    		ativAtual == SOLICITAR_APROVACAO ||
    		ativAtual == APROVACAO_SERVICO || 
    		ativAtual == SOLICITAR_CONTRATO || 
    		ativAtual == SOLICITACAO_CONTRATO ){
	    	var constraint = new Array();                                 
	        constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
	        constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
	        
	        var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
	           
	        if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	              throw resultDataset.getValue(0,"RETORNO");
	           }
	        else {
	     	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação excluida do sistema Protheus.");
	        }
    }
     
    
}