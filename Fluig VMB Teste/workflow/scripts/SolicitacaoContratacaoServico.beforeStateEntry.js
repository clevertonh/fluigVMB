function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO_COMPRAS = 12;
	var REALIZAR_COTACAO_HOSPITALIDADE = 22;
	var ENVIAR_APROVACAO_COMPRAS = 209;
	var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
	var APROVACAO_SERVICO_COMPRAS = 105;
	var APROVACAO_SERVICO_HOSPITALIDADE = 94;
	var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
	var VERIFICAR_APROVACAO_COMPRAS = 145;
	var SOLICITACAO_CONTRATO_HOSPITALIDADE = 66;
	var SOLICITACAO_CONTRATO_COMPRAS = 63;
	var INTEGRAR_PROTHEUS_COMPRAS = 212;
	var INTEGRAR_PROTHEUS_COMPRAS = 215;
	var VALIDAR_RH = 16;
	
	
	
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");		
	//RECUPERA CODIGO DA SOLICITAÇÃO
	var codSolicitacao 	 = getValue("WKNumProces");
	//VERIFICA QUAL A PROXIMA ATIVIDADE
	var nextAtv  		 = getValue("WKNextState");
	//RECUPERA NUMERO DO DOCUMENTO
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
	 //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
	
    var aprovacao = hAPI.getCardValue("aprovacao");
    var valor = hAPI.getCardValue("valor");
    var produto = hAPI.getCardValue("codigoProduto");
    
    var cgc = hAPI.getCardValue("codigoProduto");
    var codigoSA2 = hAPI.getCardValue("codigoProduto");
    var razaoSocial = hAPI.getCardValue("codigoProduto");
    var valido = hAPI.getCardValue("codigoProduto");
    
    
 if (ativAtual == REALIZAR_COTACAO_COMPRAS  || ativAtual == REALIZAR_COTACAO_HOSPITALIDADE){ 
	 
	 //SALVA NO COMENTÁRIO OS DADOS DO FORNECEDOR ATUAL PARA O CASO DE HAVER TROCA DE FORNECEDOR
	 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Fornecedor " + cgc +"-"+razaoSocial + " selecionado como melhor opção do processo de cotação.");
	 	 
                  var constraint = new Array();                                 
                  constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                  constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));
                  constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
                  
                  /*
                   var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);                                                                    
                      
                   if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                         throw resultDataset.getValue(0,"RETORNO");
                      }
                   else {
                	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Fornecedor selecionado e processo enviado para aprovação");
                   }
                      
                   */
          
           
    }	
 
 else if (ativAtual == VALIDAR_RH){
	 if (valido == "negado"){
		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "O fornecedor " + cgc +"-"+razaoSocial + " não pode ser contratado pois não atende aos requisitos da legislação trabalhista.");
	 }
 }
 
 
 
 
 
 
}