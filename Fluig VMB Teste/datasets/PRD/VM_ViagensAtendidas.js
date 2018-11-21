function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("solicitacao");
	dataset.addColumn("dataSolicitacao");
	dataset.addColumn("solicitante");
	dataset.addColumn("aprovador");
	dataset.addColumn("dataAprovacao");
	dataset.addColumn("datacompra");
	dataset.addColumn("origem1");
	dataset.addColumn("datapartida1");
	dataset.addColumn("destino1");
	dataset.addColumn("dataretorno1");
	dataset.addColumn("origem2");
	dataset.addColumn("destino2");
	dataset.addColumn("datapartida2");
	dataset.addColumn("origem3");
	dataset.addColumn("destino3");
	dataset.addColumn("datapartida3");
	dataset.addColumn("passageirofuncionario");
	dataset.addColumn("nomepassageiro");
	dataset.addColumn("remarcacao");
	dataset.addColumn("localhospedagem");
	dataset.addColumn("passageirofuncionario");
	dataset.addColumn("justificativa");
	dataset.addColumn("tipoviagem");
	dataset.addColumn("id_remarcacao");
	dataset.addColumn("datacheckin");
	dataset.addColumn("datacheckout");
	dataset.addColumn("datacheckin2");
	dataset.addColumn("datacheckout2");
	dataset.addColumn("datacheckin3");
	dataset.addColumn("datacheckout3");	
	dataset.addColumn("itinerario");
	dataset.addColumn("cancelado");
	dataset.addColumn("atendida");
	dataset.addColumn("vooComprado");
	dataset.addColumn("hotelComprado");
	dataset.addColumn("id");	
	dataset.addColumn("hospedagem1");
	dataset.addColumn("hospedagem2");
	dataset.addColumn("hospedagem3");
	dataset.addColumn("tipoVoo");
	
	
	var constraints = new Array();	
	constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
	//constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	//constraints.push(DatasetFactory.createConstraint("solicitacao", "55" , "55", ConstraintType.MUST));
	 var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
	 
	    for(var x = 0 ; x < retornoDataset.rowsCount; x++){   
	    	 //var solicitacaoId = retornoDataset.getValue(x, "solicitacao");	    
	    	 var documentId =  retornoDataset.getValue(x, "documentid");
	    	 var formulario = retornoDataset.getValue(x, "metadata#parent_id")	         
	    	 var empresa = retornoDataset.getValue(x, "companyid");
	    	 var tipoViagem = retornoDataset.getValue(x, "tipoviagem");	   
	    	 var atendida = retornoDataset.getValue(x, "atendida");	
	    	 var vooComprado = retornoDataset.getValue(x, "vooComprado");	
	    	 var hotelComprado = retornoDataset.getValue(x, "hotelComprado");	
	    	 
	    	 var tipo_hosp1 = retornoDataset.getValue(x, "tipo_hosp1");	
	    	 var tipo_hosp2 = retornoDataset.getValue(x, "tipo_hosp2");	
	    	 var tipo_hosp3 = retornoDataset.getValue(x, "tipo_hosp3");	
	    	 
	    	 var tipoVoo = retornoDataset.getValue(x, "tipovoo");	

	    	 
	   	 if (vooComprado =='sim' || hotelComprado =='sim' || atendida == "atendida"){	   
	    		 //BUSCA CODIGO DA SOLICITACAO E DATA DA SOLICITAÇÃO
	    		 var constraintsCodigoSolicitacao  = new Array();	    	 
	    		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardIndexDocumentId", formulario , formulario, ConstraintType.MUST));
	    		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("cardDocumentId", documentId , documentId, ConstraintType.MUST));	    	
	    		 constraintsCodigoSolicitacao.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
	    	   	        	 
		         var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsCodigoSolicitacao, null);		       		 
		         var solicitacaoId = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
		         var dataSolicitacao = historicoFormulario.getValue(0,"startDateProcess");
	    		 
	    		 //BUSCA DATA DA COMPRA
		    	 var constraintsCompra  = new Array();	    	 
		    	 constraintsCompra.push(DatasetFactory.createConstraint("processTaskPK.companyId", empresa , empresa, ConstraintType.MUST));
		    	 constraintsCompra.push(DatasetFactory.createConstraint("processTaskPK.processInstanceId", solicitacaoId , solicitacaoId, ConstraintType.MUST));	    	
		    	 constraintsCompra.push(DatasetFactory.createConstraint("choosedSequence", 13 , 13, ConstraintType.MUST));
		    	 constraintsCompra.push(DatasetFactory.createConstraint("status", 2 , 2, ConstraintType.MUST));
		   
		         var historicoprocesso = DatasetFactory.getDataset("processTask", null, constraintsCompra, null);	    	 
		         var data_compra =  historicoprocesso.getValue(0,"endDate"); 
		       
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

         
		         
		         
		        /* 
		         //BUSCAR DATA DA APROVAÇÃO
		         var constraintsAprovacao  = new Array();	    	 
		         constraintsAprovacao.push(DatasetFactory.createConstraint("processHistoryPK.companyId", empresa , empresa, ConstraintType.MUST));
		         constraintsAprovacao.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", solicitacaoId , solicitacaoId, ConstraintType.MUST));	    	
		         //constraintsAprovacao.push(DatasetFactory.createConstraint("previousMovementSequence", 1 , 1, ConstraintType.MUST));
		         constraintsAprovacao.push(DatasetFactory.createConstraint("status", 3 , 3, ConstraintType.MUST));		         
		         constraintsAprovacao.push(DatasetFactory.createConstraint("stateSequence", 5 , 5, ConstraintType.SHOULD));         
		         constraintsAprovacao.push(DatasetFactory.createConstraint("stateSequence", 97 , 97, ConstraintType.SHOULD));
		         
		         var historicoAprovacao = DatasetFactory.getDataset("processHistory", null, constraintsAprovacao, null);	    	 
		         var data_aprovacao =  historicoAprovacao.getValue(0,"realDateTime"); 
		 	      */   
		       
		         		if (tipoViagem.localeCompare("nacional") == 0){
			         		dataset.addRow([solicitacaoId,
			         		                dataSolicitacao.toString(),
				    		                retornoDataset.getValue(x,"solicitante"),
				    		                aprovador,
				    		                data_aprovacao.toString(),	  		                
				    		                data_compra.toString(),	    		
				    		                retornoDataset.getValue(x,"origem1"),
				    		                retornoDataset.getValue(x,"datapartida1"),
				    		                retornoDataset.getValue(x,"destino1"),
				    		                retornoDataset.getValue(x,"dataretorno1"),
				    		                retornoDataset.getValue(x,"origem2"),
				    		                retornoDataset.getValue(x,"destino2"),
				    		                retornoDataset.getValue(x,"datapartida2"),
				    		                retornoDataset.getValue(x,"origem3"),
				    		                retornoDataset.getValue(x,"destino3"),
				    		                retornoDataset.getValue(x,"datapartida3"),	    		               	    		          	    		            
				    		                retornoDataset.getValue(x,"passageirofuncionario"),
				    		                retornoDataset.getValue(x,"nomepassageiro"),
				    		                retornoDataset.getValue(x,"remarcacao"),
				    		                retornoDataset.getValue(x,"localhospedagem"),
				    		                retornoDataset.getValue(x,"passageirofuncionario"),
				    		                retornoDataset.getValue(x,"justificativa"),
				    		                retornoDataset.getValue(x,"tipoviagem"),
				    		                retornoDataset.getValue(x,"dataset_solicitacaoviagem"),
				    		                retornoDataset.getValue(x,"datacheckin"),
				    		                retornoDataset.getValue(x,"datacheckout"),
				    		                retornoDataset.getValue(x,"datacheckin2"),
				    		                retornoDataset.getValue(x,"datacheckout2"),
				    		                retornoDataset.getValue(x,"datacheckin3"),
				    		                retornoDataset.getValue(x,"datacheckout3"),				    		                
				    		                retornoDataset.getValue(x,"tipovoo"),
				    		                retornoDataset.getValue(x,"cancelarpassagem"),
				    		                atendida,				    		                
				    		                retornoDataset.getValue(x,"vooComprado"),
				    		                retornoDataset.getValue(x,"hotelComprado"),
				    		                retornoDataset.getValue(x,"id"),
				    		                tipo_hosp1,
				    		                tipo_hosp2,
				    		                tipo_hosp3,
				    		                tipoVoo		
				    		               
				    		                ]); 
			         	}
			         	else {
			         		dataset.addRow([solicitacaoId,
			         		               dataSolicitacao.toString(),
				    		                retornoDataset.getValue(x,"solicitante"),
				    		                aprovador,
				    		                data_aprovacao.toString(),	  		                
				    		                data_compra.toString(),	   		
				    		                retornoDataset.getValue(x,"internacionalOrigem1"),
				    		                retornoDataset.getValue(x,"datapartida1"),
				    		                retornoDataset.getValue(x,"internacionalDestino1"),
				    		                retornoDataset.getValue(x,"dataretorno1"),
				    		                retornoDataset.getValue(x,"internacionalOrigem2"),
				    		                retornoDataset.getValue(x,"internacionalDestino2"),
				    		                retornoDataset.getValue(x,"datapartida2"),
				    		                retornoDataset.getValue(x,"internacionalOrigem3"),
				    		                retornoDataset.getValue(x,"internacionalDestino3"),
				    		                retornoDataset.getValue(x,"datapartida3"),	    		               	    		          	    		            
				    		                retornoDataset.getValue(x,"passageirofuncionario"),
				    		                retornoDataset.getValue(x,"nomepassageiro"),
				    		                retornoDataset.getValue(x,"remarcacao"),
				    		                retornoDataset.getValue(x,"localhospedagem"),
				    		                retornoDataset.getValue(x,"passageirofuncionario"),
				    		                retornoDataset.getValue(x,"justificativa"),
				    		                retornoDataset.getValue(x,"tipoviagem"),
				    		                retornoDataset.getValue(x,"dataset_solicitacaoviagem"),
				    		                retornoDataset.getValue(x,"datacheckin"),
				    		                retornoDataset.getValue(x,"datacheckout"),
				    		                retornoDataset.getValue(x,"datacheckin2"),
				    		                retornoDataset.getValue(x,"datacheckout2"),
				    		                retornoDataset.getValue(x,"datacheckin3"),
				    		                retornoDataset.getValue(x,"datacheckout3"),					    		                
				    		                retornoDataset.getValue(x,"tipovoo"),
				    		                retornoDataset.getValue(x,"cancelarpassagem"),
				    		                atendida,	
				    		                retornoDataset.getValue(x,"vooComprado"),
				    		                retornoDataset.getValue(x,"hotelComprado"),
				    		                retornoDataset.getValue(x,"id"),
				    		                tipo_hosp1,
				    		                tipo_hosp2,
				    		                tipo_hosp3,
				    		                tipoVoo				
				    		              
				    		                ]); 
			         	}
	    		 
	    	 } //fim do filtro de atendido
	    	 
	    	

	    } //fim do FOR
	    	
		return dataset;

}