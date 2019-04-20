function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("metadata#id");
    dataset.addColumn("CENTRO_CUSTO");
    dataset.addColumn("PROJETO");
    dataset.addColumn("CATEGORIA");
    dataset.addColumn("FONTE");
    dataset.addColumn("ATIVIDADE");
    dataset.addColumn("AREA");
    dataset.addColumn("ALOCACAO");
    dataset.addColumn("LOCALIZACAO");
    dataset.addColumn("CONTA_CONTABIL");
    dataset.addColumn("PERCENTUAL");
    dataset.addColumn("SOLICITACAO");
    dataset.addColumn("DATASOLICITACAO");
    dataset.addColumn("SOLICITANTE");
    dataset.addColumn("NOMEPASSAGEIRO");
    dataset.addColumn("TIPOVIAGEM");
    dataset.addColumn("VALORPASSAGEM");
    dataset.addColumn("VOOCOMPRADO");
    dataset.addColumn("HOTELCOMPRADO");
    dataset.addColumn("ATENDIDA");
    dataset.addColumn("CANCELADO");
   
    
    
    //dataset interno
    var constraintsActive = new Array();
    constraintsActive.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsActive, null);
    
 
        if(datasetPrincipal != null && datasetPrincipal.rowsCount > 0) { // implementação somente para o MUST
            for(var a=0;a < datasetPrincipal.rowsCount;a++){
            	var documentId = datasetPrincipal.getValue(a, "metadata#id");
                var documentVersion = datasetPrincipal.getValue(a, "metadata#version");            	
            	var empresa = datasetPrincipal.getValue(a, "companyid");            	
            	var cardindexdocumentid = datasetPrincipal.getValue(a, "metadata#card_index_id");
            	
            	 var historicoFormulario = retornaSolicitacao(cardindexdocumentid,documentId,empresa);
            	
            	 var solicitacao;
            	 var dataSolicitacao;
            	 var atendida = datasetPrincipal.getValue(a, "atendida");	
            	 var vooComprado = datasetPrincipal.getValue(a, "vooComprado");	
            	 var hotelComprado = datasetPrincipal.getValue(a, "hotelComprado");	
                    
            	 if (historicoFormulario.rowsCount > 0){
                	  solicitacao = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
                	  dataSolicitacao = historicoFormulario.getValue(0,"startDateProcess");
                 }
                 
            	 
            	 	//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
                    var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
                    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
                    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
                    var constraintsFilhos = new Array(c1, c2, c3);

                    
                    //Cria as constraints para buscar os produtos comprados
                    var c4 = DatasetFactory.createConstraint("tablename", "tableViagem" , "tableViagem", ConstraintType.MUST);
                    var c5 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
                    var c6 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
                    var constraintsServicos = new Array(c4, c5, c6);
                    
                    
                    //Busca o dataset para buscar os produtos comprados e somar o valor
                    var datasetServicos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsServicos, null);
                    var valorPassagem;
                    var hospedagem;
                    
                    if (datasetServicos != null && datasetServicos.rowsCount > 0){
                        for (var j = 0; j < datasetServicos.rowsCount; j++) {
                        	if (datasetServicos.getValue(j, "codigoProduto") == "DVPSG001" ){
                        		valorPassagem = valorPassagem + datasetServicos.getValue(j, "valores");
                        	}
                        	else if (datasetServicos.getValue(j, "codigoProduto") == "DVPSG002" ){
                        		valorPassagem = hospedagem + datasetServicos.getValue(j, "valores");
                        	}
                        	
                        }                	
                       		
                    }
                    else {
                    	valorPassagem = datasetPrincipal.getValue(a, "valorVoo") ;
                    	hospedagem = datasetPrincipal.getValue(a, "valorHotel") ;
                    }
      
                    
                    
                    //Busca o dataset
                    var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
                    for (var j = 0; j < datasetFilhos.rowsCount; j++) {                	
                   	 	
                     	//Adiciona os valores nas colunas respectivamente.
                        dataset.addRow(new Array(
                                documentId,
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
                                solicitacao,
                                dataSolicitacao.toString(),
                                datasetPrincipal.getValue(a,"solicitante"),
                                datasetPrincipal.getValue(a,"nomepassageiro"),
                                datasetPrincipal.getValue(a,"tipoviagem"),
                                valorPassagem,
                                vooComprado,
                                hotelComprado,
                                atendida,
                                datasetPrincipal.getValue(a,"cancelarpassagem")
                        ));
                    }
                
            
            	
            }
        }
     
    return dataset;
}

function getConstraints(constraints, field){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field){
			return constraints[i].initialValue;
		}
	}
	
	return null;
}
//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 

   return historicoFormulario;
} 