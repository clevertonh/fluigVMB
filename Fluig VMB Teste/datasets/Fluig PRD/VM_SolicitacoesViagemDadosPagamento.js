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
    dataset.addColumn("ValorPassagem");
    dataset.addColumn("nomepassageiro");
	dataset.addColumn("datacompra");
	dataset.addColumn("vooComprado");
	dataset.addColumn("hotelComprado");
	dataset.addColumn("cancelado");
     
       
    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
	//constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));	
    constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
	//constraints.push(DatasetFactory.createConstraint("solicitacao", "639" , "639", ConstraintType.MUST));
    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
    
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
    	var documentId = datasetPrincipal.getValue(i, "metadata#id");
    	var formulario = datasetPrincipal.getValue(i, "metadata#parent_id")
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
        var atendida = datasetPrincipal.getValue(i, "atendida");	
        var vooComprado = datasetPrincipal.getValue(i, "vooComprado");	
        var hotelComprado = datasetPrincipal.getValue(i, "hotelComprado");	
        var empresa = datasetPrincipal.getValue(i, "companyid");
   	 	var tipoViagem = datasetPrincipal.getValue(i, "tipoviagem");	 
   	 	var valorPassagem = datasetPrincipal.getValue(i, "valorVoo");	
   	
   	 	
     
        //BUSCA CODIGO DA SOLICITACAO E DATA DA SOLICITAÇÃO
		 var constraintsCodigoSolicitacao  = new Array();	    	 
		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardIndexDocumentId", formulario , formulario, ConstraintType.MUST));
		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardDocumentId", documentId , documentId, ConstraintType.MUST));	    	
		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
	   	        	 
        var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsCodigoSolicitacao, null);		       		 
        var solicitacaoId = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
        var dataSolicitacao = historicoFormulario.getValue(0,"startDateProcess");
		 
    
        //BUSCA ID APROVADOR E DATA DA APROVAÇÃO
        var constraintsHistoricoAprovador  = new Array();	    	 
        constraintsHistoricoAprovador.push(DatasetFactory.createConstraint("processTaskPK.companyId", empresa , empresa, ConstraintType.MUST));
        constraintsHistoricoAprovador.push(DatasetFactory.createConstraint("processTaskPK.processInstanceId", solicitacaoId , solicitacaoId, ConstraintType.MUST));	    	
        constraintsHistoricoAprovador.push(DatasetFactory.createConstraint("choosedSequence", 5 , 5, ConstraintType.SHOULD));
        constraintsHistoricoAprovador.push(DatasetFactory.createConstraint("choosedSequence", 97 , 97, ConstraintType.SHOULD));
        constraintsHistoricoAprovador.push(DatasetFactory.createConstraint("status", 3 , 3, ConstraintType.MUST));    	   
        
        var historicoAprovador = DatasetFactory.getDataset("processTask", null, constraintsHistoricoAprovador, null);	    	 
        var Idaprovador =  historicoAprovador.getValue(0,"choosedColleagueId"); 
        var data_aprovacao =  historicoAprovador.getValue(0,"endDate"); 
           	
        
        //BUSCA NOME DO APROVADOR
        var constraintsAprovador  = new Array();	    	 
        constraintsAprovador.push(DatasetFactory.createConstraint("colleaguePK.companyId", empresa , empresa, ConstraintType.MUST));
        constraintsAprovador.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", Idaprovador , Idaprovador, ConstraintType.MUST)); 	         
        
        var datasetAprovador = DatasetFactory.getDataset("colleague", null, constraintsAprovador, null);	    	 
        var aprovador =  datasetAprovador.getValue(0,"colleagueName"); 
 
        var data_compra;
        
        if (vooComprado =='sim' || hotelComprado =='sim'){
        	atendida = "atendida";	
        }
        
        //PASSAGEM COMPRADA POSSUI DATA DE COMPRA
        if (atendida == "atendida"){
        	 //BUSCA DATA DA COMPRA
	    	 var constraintsCompra  = new Array();	    	 
	    	 constraintsCompra.push(DatasetFactory.createConstraint("processTaskPK.companyId", empresa , empresa, ConstraintType.MUST));
	    	 constraintsCompra.push(DatasetFactory.createConstraint("processTaskPK.processInstanceId", solicitacaoId , solicitacaoId, ConstraintType.MUST));	    	
	    	 constraintsCompra.push(DatasetFactory.createConstraint("choosedSequence", 13 , 13, ConstraintType.MUST));
	    	 constraintsCompra.push(DatasetFactory.createConstraint("status", 2 , 2, ConstraintType.MUST));
	   
	         var historicoprocesso = DatasetFactory.getDataset("processTask", null, constraintsCompra, null);	    	 
	         
	         log.info("ID ERRO DATA_COMPRA");
	         log.info(solicitacaoId);
	         data_compra =  historicoprocesso.getValue(0,"endDate"); 
	   
        }
        
        
        
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
  
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
  
        	if (valorPassagem != null & valorPassagem != '' & valorPassagem > 0){
           	 	valorPassagem = parseFloat(valorPassagem) * parseFloat(datasetFilhos.getValue(j, "percentual")) /100;
           	 	}
        	
        	else {
        		valorPassagem = 0;
        	}
           	 	
        
        	
        	
        	//Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    documentId,
                    solicitacaoId,
                    datasetPrincipal.getValue(i, "solicitante"),
                    dataSolicitacao.toString(),
                    atendida,
                    tipoViagem,
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
                    parseFloat(valorPassagem.toFixed(2)),
                    datasetPrincipal.getValue(i, "nomepassageiro"),
                    data_compra.toString(),
                    vooComprado,
                    hotelComprado,
                    datasetPrincipal.getValue(i,"cancelarpassagem")
            ));
        }
        
    }
     
    return dataset;
}