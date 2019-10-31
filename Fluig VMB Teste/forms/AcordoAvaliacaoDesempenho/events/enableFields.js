function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 11;
	
	
	var activity = getValue('WKNumState');
	
	
	    
  if (activity ==  FEEDBACK1){
		
		 form.setEnabled("Funcionario", false);	
		 form.setEnabled("dataAdmissao", false);	
		 form.setEnabled("campo_1", false);	
		 form.setEnabled("campo_2", false);	
		 form.setEnabled("campo_3", false);	
		 form.setEnabled("campo_4", false);	
		 form.setEnabled("campo_5", false);	
		
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
		        form.setEnabled("tx_competencia___"+ indexes[i], false);
		     	form.setEnabled("campo_15___"+ indexes[i], false);
		        form.setEnabled("campo_16___"+ indexes[i], false);
		        form.setEnabled("campo_17___"+ indexes[i], false);	
		        form.setEnabled("progresso2___"+ indexes[i], false);
		    }
		    
			
		    
		    
		  
	}
	else if (activity ==  FEEDBACK2){		
			 form.setEnabled("Funcionario", false);	
			 form.setEnabled("dataAdmissao", false);	
			 form.setEnabled("campo_1", false);	
			 form.setEnabled("campo_2", false);	
			 form.setEnabled("campo_3", false);	
			 form.setEnabled("campo_4", false);	
			 form.setEnabled("campo_5", false);	
			 
			 form.setEnabled("campo_6", false);		
			 form.setEnabled("campo_7", false);	
			 form.setEnabled("campo_8", false);	
			 form.setEnabled("campo_9", false);	
	
			 
		
			 
			 
			//BLOQUEIA CAMPOS DE SERVIÇO
			 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
			    for (var i = 0; i < indexes.length; i++) {
			        form.setEnabled("acao___"+ indexes[i], false);	
			       	form.setEnabled("porque___"+ indexes[i], false);
			        form.setEnabled("como___"+ indexes[i], false);	
			        form.setEnabled("tx_competencia___"+ indexes[i], false);
			        form.setEnabled("comentarioF___"+ indexes[i], false);
			        form.setEnabled("campo_10___"+ indexes[i], false);
			        form.setEnabled("comentarioG___"+ indexes[i], false);			        
			        form.setEnabled("progresso___"+ indexes[i], false);
		        
			        if (form.getValue("progresso___" + indexes[i]) =="0"){
			        	 form.setValue("progresso2___"+ indexes[i],"0");
			        	 form.setEnabled("progresso2___"+ indexes[i], false);
			        	 
			        	 form.setEnabled("campo_15___"+ indexes[i], false);	
						 form.setEnabled("campo_16___"+ indexes[i], false);	
						 form.setEnabled("campo_17___"+ indexes[i], false);	
						 
						 
			        }
			    }
		    
		   
			    
			    
		    
	}
    else if (activity ==  AVALIACAO){
    	
   	 form.setEnabled("Funcionario", false);	
	 form.setEnabled("dataAdmissao", false);	
	 form.setEnabled("campo_1", false);	
	 form.setEnabled("campo_2", false);	
	 form.setEnabled("campo_3", false);	
	 form.setEnabled("campo_4", false);	
	 form.setEnabled("campo_5", false);	
	 
	 form.setEnabled("campo_6", false);		
	 form.setEnabled("campo_7", false);	
	 form.setEnabled("campo_8", false);	
	 form.setEnabled("campo_9", false);
	 form.setEnabled("campo_10", false);	
	 form.setEnabled("campo_11", false);	
	 form.setEnabled("campo_12", false);	
	 form.setEnabled("campo_13", false);	
	 form.setEnabled("campo_14", false);	

	 
	 
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
		        form.setEnabled("tx_competencia___"+ indexes[i], false);
		        form.setEnabled("comentarioF___"+ indexes[i], false);
		        form.setEnabled("campo_10___"+ indexes[i], false);
		        form.setEnabled("comentarioG___"+ indexes[i], false);			        
		        form.setEnabled("progresso___"+ indexes[i], false);
	        
		        if (form.getValue("progresso___" + indexes[i]) =="0"){
		        	 form.setValue("progresso2___"+ indexes[i],"0");
		        	 form.setEnabled("progresso2___"+ indexes[i], false);
		        	 
		        	 form.setEnabled("campo_15___"+ indexes[i], false);	
					 form.setEnabled("campo_16___"+ indexes[i], false);	
					 form.setEnabled("campo_17___"+ indexes[i], false);	
					 
					 
		        }
		    }
	    
    	
		    //calcula resultado final da avaliação
		    calculaResultadoFinalAvaliacao();
    	
     	 
    }

	    
  function calculaResultadoFinalAvaliacao(){
	  var indexes = form.getChildrenIndexes("tableMetas");	  
	  var progresso1 = 0;
 	  var qtdeProgresso1 = 0;
 	  var progresso2 = 0;
 	  var qtdeProgresso2 = 0;
 	  var qtdetotal = 0;
 	  var totalProgresso = 0;
 	  var sumario = 0;
 	 
 	 
 	  for (var i = 0; i < indexes.length; i++) {
 		  if (parseFloat(form.getValue("progresso___" + indexes[i])) != 0){
 			  progresso1 = progresso1 + parseFloat(form.getValue("progresso___" + indexes[i]));
 			  qtdeProgresso1 = qtdeProgresso1 + 1;
 			  
 			  
 			  console.log(parseFloat(form.getValue("progresso___" + indexes[i])));
 			  
 		  }
 		  
 		  if (parseFloat(form.getValue("progresso2___" + indexes[i])) != 0){
 			  progresso2 = progresso2 + parseFloat(form.getValue("progresso2___" + indexes[i]));
 			  qtdeProgresso2 = qtdeProgresso2 + 1;
 			  
 			 console.log(parseFloat(form.getValue("progresso2___" + indexes[i])));
 		  }
 	  }
 	  
 	  qtdetotal = qtdeProgresso1 + qtdeProgresso2; 	  
 	  totalProgresso = progresso1 + progresso2; 	  
 	  sumario = totalProgresso/qtdetotal;
 	  
 	  console.log("RESULTADO 3");
 	  console.log(qtdetotal);
 	 console.log(totalProgresso);
 	console.log(sumario);
 	  
 	  
 	  if (sumario <=1){
 		  form.setValue("pontuacao","Precisa melhorar");
 		  form.setValue("definicao","O desempenho geral não atendeu às expectativas da função este ano. O desempenho pode estar melhorando, mas ainda não atingiu o pleno potencial de desempenho (em termos de o que/resultados e/ou como/comportamento). Este nível de desempenho pode ser demonstrado por um novo funcionário inexperiente ainda tentando atingir os requisitos da função (tipicamente, em seus primeiros 6-12 meses), ou porque o desempenho necessita melhorar em algum ou em todos os aspectos da função.");
 	  }
 	  else if (sumario <=2){
 		  form.setValue("pontuacao","Desempenho valorizado");
 		  form.setValue("definicao","Desempenho bom, bem-sucedido e eficaz, como se espera normalmente desta função/grau - atingiu todos os requisitos/objetivos do cargo, e, algumas vezes, teve resultados acima dos esperados para a função (em termos de o que/resultados e/ou como/comportamento).  As atitudes e comportamentos refletiram interesse em melhorar e atingir resultados de nível mais elevado para si e para a organização.");
 	  }
 	  else if (sumario >=3){
 		  form.setValue("pontuacao","Desempenho excepcional");
 		  form.setValue("definicao","Atingiu resultados extraordinários que tiveram um impacto positivo significativo sobre a equipe ou organização, excedendo bastante o que se considera típico para esta função/nível. Promoveu o uso de novas mentalidades e comportamentos para nortear decisões, colocando-se como exemplo. Outras pessoas foram influenciadas positivamente pelos resultados profissionais e pessoais alcançados.");
 	  }
  }
	
	
	
}