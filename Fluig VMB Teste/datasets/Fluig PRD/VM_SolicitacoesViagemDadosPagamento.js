function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NumFormulario");
    dataset.addColumn("Solicitacao");
	dataset.addColumn("solicitante");
    dataset.addColumn("dataSolicitacao");
	dataset.addColumn("atendida");
	dataset.addColumn("tipoviagem");
    dataset.addColumn("CentroCusto");
    dataset.addColumn("Projeto");
    dataset.addColumn("Categoria");
    dataset.addColumn("FonteFinanciamento");
    dataset.addColumn("Atividade");
    dataset.addColumn("AreaEstrategica");
    dataset.addColumn("Alocacao");
    dataset.addColumn("Localizacao");
    dataset.addColumn("ContaContabil");
    dataset.addColumn("Percentual");
    dataset.addColumn("nomepassageiro");
	dataset.addColumn("datacompra");

     
       
    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
	//constraints.push(DatasetFactory.createConstraint("solicitacao", "55" , "55", ConstraintType.MUST));
    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
    
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
    	var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
        var atendida = datasetPrincipal.getValue(i, "atendida");	
        var vooComprado = datasetPrincipal.getValue(i, "vooComprado");	
        var hotelComprado = datasetPrincipal.getValue(i, "hotelComprado");	
        var empresa = datasetPrincipal.getValue(i, "companyid");
    	
        
        if (vooComprado =='sim' || hotelComprado =='sim'){
        	atendida = "atendida";	
        }
        
    	//BUSCA CODIGO DA SOLICITACAO
		 var constraintsCodigoSolicitacao  = new Array();	    	 
		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardIndexDocumentId", 2897 , 2897, ConstraintType.MUST));
		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardDocumentId", documentId , documentId, ConstraintType.MUST));	    	
   	     	 
        var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsCodigoSolicitacao, null);		       		 
        var solicitacaoId = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
    	
        
      //BUSCAR DATA DA COMPRA
   	 var constraintsCompra  = new Array();	    	 
   	 constraintsCompra.push(DatasetFactory.createConstraint("processHistoryPK.companyId", empresa , empresa, ConstraintType.MUST));
   	 constraintsCompra.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", solicitacaoId , solicitacaoId, ConstraintType.MUST));	    	
   	 constraintsCompra.push(DatasetFactory.createConstraint("stateSequence", 13 , 13, ConstraintType.SHOULD));
     constraintsCompra.push(DatasetFactory.createConstraint("status", 3 , 3, ConstraintType.SHOULD));	
   	
        var historicoprocesso = DatasetFactory.getDataset("processHistory", null, constraintsCompra, null);	    	 
        var data_compra =  historicoprocesso.getValue(0,"realDateTime"); 
        
        
        
        
        
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
  
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    documentId,
                    solicitacaoId,
                    datasetPrincipal.getValue(i, "solicitante"),
                    datasetPrincipal.getValue(i, "dataSolicitacao"),
                    atendida,
                    datasetPrincipal.getValue(i, "tipoviagem"),
                    datasetFilhos.getValue(j, "txtcentrocusto"),
                    datasetFilhos.getValue(j, "txtprojeto"),
                    datasetFilhos.getValue(j, "txtcategoria"),
                    datasetFilhos.getValue(j, "txtfontefinanciamento"),
                    datasetFilhos.getValue(j, "txtatividade"),
                    datasetFilhos.getValue(j, "txtareaestrategica"),
                    datasetFilhos.getValue(j, "alocacao"),
                    datasetFilhos.getValue(j, "localizacao"),
                    datasetFilhos.getValue(j, "contacontabil"),
                    datasetFilhos.getValue(j, "percentual"),
                    datasetPrincipal.getValue(i, "nomepassageiro"),
                    data_compra.toString()
            ));
        }
        
    }
     
    return dataset;
}