function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 15;
	var RESULTADO = 11;
	var MATRICIAL = 20;
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  


	if (activity ==  INICIAL || activity ==  ACORDO){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 var nomeGestor = dataset.getValue(0, "colleagueName");
		 var emailGestor = dataset.getValue(0, "mail");
		 
		 form.setValue("gestor",nomeGestor);
		 form.setValue("emailGestor",emailGestor);
		 
		 
		 
		 
	}
	
	    
	else if (activity ==  FEEDBACK1){
		
		 form.setEnabled("Funcionario", false);	
		 form.setEnabled("dataAdmissao", false);	
		 form.setEnabled("campo1", false);	
		 form.setEnabled("campo2", false);	
		 form.setEnabled("campo3", false);	
		 form.setEnabled("campo4", false);	
		 form.setEnabled("campo5", false);	
		

		 var indexes = form.getChildrenIndexes("tableMetas1");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
		        form.setEnabled("txcompetencia___"+ indexes[i], false);
		     	form.setEnabled("campo15___"+ indexes[i], false);
		        form.setEnabled("campo16___"+ indexes[i], false);
		        form.setEnabled("campo17___"+ indexes[i], false);	
		        form.setEnabled("progresso2___"+ indexes[i], false);
		    }
		    
			
		    
		    
		  
	}
	else if (activity ==  FEEDBACK2){		
			 form.setEnabled("Funcionario", false);	
			 form.setEnabled("dataAdmissao", false);	
			 form.setEnabled("campo1", false);	
			 form.setEnabled("campo2", false);	
			 form.setEnabled("campo3", false);	
			 form.setEnabled("campo4", false);	
			 form.setEnabled("campo5", false);	
			 
			 form.setEnabled("campo6", false);		
			 form.setEnabled("campo7", false);	
			 form.setEnabled("campo8", false);	
			 form.setEnabled("campo9", false);	
	
			 

			 var indexes = form.getChildrenIndexes("tableMetas1");	    	    	    	   
			    for (var i = 0; i < indexes.length; i++) {
			        form.setEnabled("acao___"+ indexes[i], false);	
			       	form.setEnabled("porque___"+ indexes[i], false);
			        form.setEnabled("como___"+ indexes[i], false);	
			        form.setEnabled("txcompetencia___"+ indexes[i], false);
			        form.setEnabled("comentarioF___"+ indexes[i], false);
			        form.setEnabled("campo10___"+ indexes[i], false);
			        form.setEnabled("comentarioG___"+ indexes[i], false);			        
			        form.setEnabled("progresso___"+ indexes[i], false);
		        
			        if (form.getValue("progresso___" + indexes[i]) =="0"){
			        	 form.setValue("progresso2___"+ indexes[i],"0");
			        	 form.setEnabled("progresso2___"+ indexes[i], false);
			        	 
			        	 form.setEnabled("campo15___"+ indexes[i], false);	
						 form.setEnabled("campo16___"+ indexes[i], false);	
						 form.setEnabled("campo17___"+ indexes[i], false);	
						 
						 
			        }
			    }
		    
		   
			    
			    
		    
	}
	else if (activity ==  AVALIACAO){
		 form.setEnabled("Funcionario", false);	
		 form.setEnabled("dataAdmissao", false);	
		 form.setEnabled("campo1", false);	
		 form.setEnabled("campo2", false);	
		 form.setEnabled("campo3", false);	
		 form.setEnabled("campo4", false);	
		 form.setEnabled("campo5", false);	
		 
		 form.setEnabled("campo6", false);		
		 form.setEnabled("campo7", false);	
		 form.setEnabled("campo8", false);	
		 form.setEnabled("campo9", false);
		 
		 form.setEnabled("campo11", false);	
		 form.setEnabled("campo12", false);
		 form.setEnabled("campo13", false);
		 form.setEnabled("campo14", false);

		 

		 var indexes = form.getChildrenIndexes("tableMetas1");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
		        form.setEnabled("txcompetencia___"+ indexes[i], false);
		        form.setEnabled("comentarioF___"+ indexes[i], false);
		        form.setEnabled("campo10___"+ indexes[i], false);
		        form.setEnabled("comentarioG___"+ indexes[i], false);			        
		        form.setEnabled("progresso___"+ indexes[i], false);
		        
		        
		        
		        form.setEnabled("campo15___"+ indexes[i], false);	
				form.setEnabled("campo16___"+ indexes[i], false);	
				form.setEnabled("campo17___"+ indexes[i], false);	
			
				
		        form.setEnabled("progresso2___"+ indexes[i], false);
		        
		        
	        
		        if (form.getValue("progresso___" + indexes[i]) =="0"){
		        	 form.setValue("progresso2___"+ indexes[i],"0");
		        	 form.setEnabled("progresso2___"+ indexes[i], false);
		        	 
		        	 form.setEnabled("campo15___"+ indexes[i], false);	
					 form.setEnabled("campo16___"+ indexes[i], false);	
					 form.setEnabled("campo17___"+ indexes[i], false);	
					 
					 
		        }
		        
	
		        
		        
		    }
	    
	}
    else if (activity ==  RESULTADO){  
    	
    	 var dataset = usuarioMatricial(form.getValue("emailMatricial"));
    	 if (dataset!= null && dataset.length > 0){
    		 var matriculaMatricial = dataset.getValue(0, "colleaguePK.colleagueId");
    		 form.setValue("matriculaMatricial",matriculaMatricial);
        	
        		 
    	 }
		 
    	
		    //calcula resultado final da avaliação
		    calculaResultadoFinalAvaliacao();
    	
		  
     	 
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		   
		  
		    
		    form.setEnabled("comentarioFinalF", true);	
		    form.setEnabled("comentarioFinalG", true);
		    form.setEnabled("comentarioFinalM", true);
		    form.setEnabled("comentarioFinalG2", true);
		    form.setEnabled("pontuacao", true);
		    form.setEnabled("definicao", true);
		    	
		     
		    
		    
    }
    else if (activity == MATRICIAL){
	    	var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("comentarioFinalM", true);
		    
    }

  
  
	function usuarioMatricial(emailMatricial){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("mail", emailMatricial, emailMatricial, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		  
		
		 return dataset;
	}
	
	


	    
  function calculaResultadoFinalAvaliacao(){
	  var indexes = form.getChildrenIndexes("tableMetas1");	  
	  var progresso1 = 0;
 	  var qtdeProgresso1 = 0;
 	  var progresso2 = 0;
 	  var qtdeProgresso2 = 0;
 	 var progresso3 = 0;
	  var qtdeProgresso3 = 0;
 	  var qtdetotal = 0;
 	  var totalProgresso = 0;
 	  var sumario = 0;
 	  
 	  
 	  
 	 
 	 
 	  for (var i = 0; i < indexes.length; i++) {
 		  if (parseFloat(form.getValue("progresso___" + indexes[i])) != 0){
 			  progresso1 = progresso1 + parseFloat(form.getValue("progresso___" + indexes[i]));
 			  qtdeProgresso1 = qtdeProgresso1 + 1;
  			  
 		  }
 		  
 		  if (parseFloat(form.getValue("progresso2___" + indexes[i])) != 0){
 			  progresso2 = progresso2 + parseFloat(form.getValue("progresso2___" + indexes[i]));
 			  qtdeProgresso2 = qtdeProgresso2 + 1;
  		  }
 		  
 		  if (parseFloat(form.getValue("progresso3___" + indexes[i])) != 0){
 			  progresso3 = progresso3 + parseFloat(form.getValue("progresso3___" + indexes[i]));
 			  qtdeProgresso3 = qtdeProgresso3 + 1;

 		  }
 		  
 	  }
 	  
 	  qtdetotal = qtdeProgresso1 + qtdeProgresso2 + qtdeProgresso3; 	  
 	  totalProgresso = progresso1 + progresso2 + progresso3; 	  
 	  sumario = totalProgresso/qtdetotal;
 	  	  
 	  
  	  
 	  if (sumario.toFixed(2) <= 1){
 		
 		  form.setValue("pontuacao","Precisa melhorar");
 		  form.setValue("definicao","O desempenho geral não atendeu às expectativas da função este ano. O desempenho pode estar melhorando, mas ainda não atingiu o pleno potencial de desempenho (em termos de o que/resultados e/ou como/comportamento). Este nível de desempenho pode ser demonstrado por um novo funcionário inexperiente ainda tentando atingir os requisitos da função (tipicamente, em seus primeiros 6-12 meses), ou porque o desempenho necessita melhorar em algum ou em todos os aspectos da função.");
 	  }
 	  else if (sumario.toFixed(2) >= 2  && sumario.toFixed(2) < 3){
 		
 		  form.setValue("pontuacao","Desempenho valorizado");
 		  form.setValue("definicao","Desempenho bom, bem-sucedido e eficaz, como se espera normalmente desta função/grau - atingiu todos os requisitos/objetivos do cargo, e, algumas vezes, teve resultados acima dos esperados para a função (em termos de o que/resultados e/ou como/comportamento).  As atitudes e comportamentos refletiram interesse em melhorar e atingir resultados de nível mais elevado para si e para a organização.");
 	  }
 	  else if (sumario.toFixed(2) >= 3){
 		
 		  form.setValue("pontuacao","Desempenho excepcional");
 		  form.setValue("definicao","Atingiu resultados extraordinários que tiveram um impacto positivo significativo sobre a equipe ou organização, excedendo bastante o que se considera típico para esta função/nível. Promoveu o uso de novas mentalidades e comportamentos para nortear decisões, colocando-se como exemplo. Outras pessoas foram influenciadas positivamente pelos resultados profissionais e pessoais alcançados.");
 	  }
 
 	  
  }
	//AZUL EXCEPCIONAL
  	//VERDE VALORIZADO
	//VERMELHO RUIM
	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}
}