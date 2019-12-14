function validateForm(form){
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 15;
	var RESULTADO = 11;
	var MATRICIAL = 20;
	
	
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	
	 //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    var usuariosubstituto = getValue('WKReplacement');
    
    if (usuariosubstituto != null){
    	usuarioLogado = usuariosubstituto;
    }
	
    //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
    
	//throw dataLimiteAcordo.toString();
	
	
	
    
    if (activity == INICIAL || activity == ACORDO){
		if (form.getValue("Funcionario") == "" || form.getValue("Funcionario") == null){
    		 throw "Você precisa selecionar o nome do funcionário a qual o acordo está sendo cadastrado.";
     	}
  	
      	if (form.getValue("dataAdmissao") =="" ) {
     		 	throw "A data de admissão do funcionário não foi preenchida pelo sistema, tente novamente mais tarde.";
      	}
      	
      	if (form.getValue("dataAcordo") =="" ) {
      		throw "Data do acordo não foi preenchida pelo sistema, tente novamente mais tarde.";
      	}
      	
      	if (email != form.getValue("emailGestorImediato") ){
      	//	throw "O funcionário selecionado não faz parte de um departamento no qual você seja o responsável. Em caso de dúvidas procure o setor de Recursos Humanos!";
      	}
      	
    	
   		var dataAcordo = convertStringToData(form.getValue("dataAcordo"));
   		var dataAtual = new Date();
   		var anofiscal;
   		
   		if (dataAtual.getMonth() > 8){
   			anofiscal = dataAtual.getFullYear() +1;
   		} else {
   			anofiscal = dataAtual.getFullYear();
   		}
   		
   		var dataLimiteAcordo = convertStringToData('31/05/'+anofiscal);
   		var dataAdmissao = convertStringToData(form.getValue("dataAdmissao"));
   		

   		if (dataAdmissao >= dataLimiteAcordo) {
   			throw "O acordo de desempenho do ano fiscal vigênte só pode ser incluido para funcionário admitido até a data de 31 de maio.";
   		}
   		
   		
    	
    	if (nextAtv == FEEDBACK1){       	
	       		var indexes = form.getChildrenIndexes("tableMetas");
	       		
	       		if (indexes.length == 0){
	       			throw "Você precisa incluir de 3 a 5 metas.";	
	       		}
	       			    
	       		
	       		if (indexes.length <3 ){
	       			 throw "Você precisa incluir de 3 a 5 metas.";	
	       		}
	          	
	       		if (indexes.length > 5){
	      			 	throw "Você precisa incluir de 3 a 5 metas.";	
	       		}
	       	
	           	   
	               for (var i = 0; i < indexes.length; i++) {
	                   var acao = form.getValue("acao___" + indexes[i]);
	                   var porque = form.getValue("porque___" + indexes[i]);
	                   var como = form.getValue("como___" + indexes[i]);
	                   var competencia = form.getValue("txcompetencia___" + indexes[i]);                
	         
	               	} 
	       		
	   	            if (acao == null || acao == "") {
	   	                throw "O campo ação não foi preenchido para uma das metas cadastradas";	
	   	            }
	   	            if (porque == null || porque == "") {
	   	                throw "O campo porque não foi preenchido para uma das metas cadastradas";	
	   	            }
	   	            if (como == null || como == "") {
	   	                throw "O campo como não foi preenchido para uma das metas cadastradas";	
	   	            }
	   	            if (competencia == null || competencia == "") {
	   	                throw "O campo competencia não foi preenchido para uma das metas cadastradas";	
	   	            }	
	     
       	   	
       	
		       	if (form.getValue("campo1") =="" || form.getValue("campo1") == null) {
		       		throw "O campo aprendizado e desenvolvimento pessoal não foi preenchido";
		       	}
		       	if (form.getValue("campo2") =="" || form.getValue("campo2") == null) {
		       		throw "O campo Apoio do líder imediato não foi preenchido.";
		       	}
		       	if (form.getValue("campo3") =="" || form.getValue("campo3") == null) {
		       		throw "O campo Equilíbrio de vida não foi preenchido.";
		       	}
		       	if (form.getValue("campo4") =="" || form.getValue("campo4") == null) {
		       		throw "O campo qual o próximo passo de carreira que aspiro alcançar?";
		       	}
		       	if (form.getValue("campo5") =="" || form.getValue("campo5") == null) {
		       		throw "O campo o que eu posso fazer para alcança-lo e quem mais precisa se envolver?";
		       	}
    	}
    	
    	
    	
    	
    }
    else if (activity == FEEDBACK1 && nextAtv == FEEDBACK2){
    	var qtdeMetasValidas =0;
    	var indexes = form.getChildrenIndexes("tableMetas");
    	
        for (var i = 0; i < indexes.length; i++) {        
        	var progresso = form.getValue("progresso___" + indexes[i]);
        	var comentarioF = form.getValue("comentarioF___" + indexes[i]);
            var comoFoiFeito = form.getValue("campo10___" + indexes[i]);
            var comentarioG = form.getValue("comentarioG___" + indexes[i]);
      
            if (progresso =="" || progresso == null) {
        		throw "É necessário indicar o progresso do funcionário para o primeiro feedback";
        	}
            else if (progresso !="branco" ){
            	if (comentarioF =="" || comentarioF == null) {
            		throw "É necessário inserir o comentário do funcionário para o primeiro feedback";
            	}
            	if (comoFoiFeito =="" || comoFoiFeito == null) {
            		throw "É necessário informar o campo campo isso foi feito para o primeiro feedback";
            	}
            	if (comentarioG =="" || comentarioG == null) {
            		throw "É necessário que você insirá o seu comentário como líder do funcionário para o primeiro feedback";
            	}     	
            }
  
                           		
    		
    		if (progresso != 'branco'){
    			qtdeMetasValidas = qtdeMetasValidas + 1;
    		}
    		
    		
        
        } 
    	
        
        if (qtdeMetasValidas == 0){
			throw "Você precisa incluir de 3 a 5 metas.";	
		}
			    
		
		if (qtdeMetasValidas <3 ){
			 throw "Você precisa incluir de 3 a 5 metas.";	
		}
   	
		if (qtdeMetasValidas > 5){
			 	throw "Você precisa incluir de 3 a 5 metas.";	
		}
		

    	if (form.getValue("campo6") =="" || form.getValue("campo6")== null) {
    		throw "O comentário da linha de aprendizado e desenvolvimento para o primeiro feedback não foi preenchido";
    	}
    	if (form.getValue("campo7") =="" || form.getValue("campo7")== null) {
    		throw "O comentário da linha de apoio do líder imediato para o primeiro feedback não foi preenchido";
    	}
    	if (form.getValue("campo8") =="" || form.getValue("campo8")== null) {
    		throw "O comentário da linha de equilibrio e vida para o primeiro feedback não foi preenchido";
    	}
    	if (form.getValue("campo9")=="" || form.getValue("campo9")== null) {
    		throw "O comentário da linha de qual próximo passo de carreira/o que posso fazer para o primeiro feedback não foi preenchido";
    	}
    	
    	

    	
    }
    else if (activity == FEEDBACK2 && nextAtv == AVALIACAO){
    	var qtdeMetasValidas =0;
    	var indexes = form.getChildrenIndexes("tableMetas");
    	 for (var i = 0; i < indexes.length; i++) {
             var comentarioF = form.getValue("campo15___" + indexes[i]);
             var comoFoiFeito = form.getValue("campo16___" + indexes[i]);
             var comentarioG = form.getValue("campo17___" + indexes[i]);
             var progresso = form.getValue("progresso2___" + indexes[i]);
             
         	if (progresso =="" || progresso == null) {
         		throw "É necessário indicar o progresso do funcionário para o segundo feedback";
         	}
         	else if (progresso !="branco" ){
         		  if (comentarioF =="" || comentarioF == null) {
               		throw "É necessário inserir o comentário do funcionário para o segundo feedback";
               	}
               	if (comoFoiFeito =="" || comoFoiFeito == null) {
               		throw "É necessário informar o campo campo isso foi feito para o segundo feedback";
               	}
               	if (comentarioG =="" || comentarioG == null) {
               		throw "É necessário que você insirá o seu comentário como líder do funcionário para o segundo feedback";
               	}
         	}
   
         
         
         	
     		
    		if (progresso != 'branco'){
    			qtdeMetasValidas = qtdeMetasValidas + 1;
    		}
    		
         } 
    	 
    	 
         
         if (qtdeMetasValidas == 0){
 			throw "Você precisa incluir de 3 a 5 metas.";	
 		}
 			    
 		
 		if (qtdeMetasValidas <3 ){
 			 throw "Você precisa incluir de 3 a 5 metas.";	
 		}
    	
 		if (qtdeMetasValidas > 5){
 			 	throw "Você precisa incluir de 3 a 5 metas.";	
 		}

    	if (form.getValue("campo11") =="" || form.getValue("campo11") == null) {
    		throw "O comentário da linha de aprendizado e desenvolvimento para o segundo feedback não foi preenchido";
    	}
    	if (form.getValue("campo12") =="" || form.getValue("campo12") == null) {
    		throw "O comentário da linha de apoio do líder imediato para o primeiro segundo não foi preenchido";
    	}
    	if (form.getValue("campo13") =="" || form.getValue("campo13") == null) {
    		throw "O comentário da linha de equilibrio e vida para o primeiro segundo não foi preenchido";
    	}
    	if (form.getValue("campo14") =="" || form.getValue("campo14") == null) {
    		throw "O comentário da linha de qual próximo passo de carreira/o que posso fazer para o primeiro segundo não foi preenchido";
    	}
    
    	
    }
    
    else if (activity == AVALIACAO && nextAtv == RESULTADO){
    	var qtdeMetasValidas =0;
    	var indexes = form.getChildrenIndexes("tableMetas");
    	 for (var i = 0; i < indexes.length; i++) {
             var comentarioF = form.getValue("campo18___" + indexes[i]);
             var comoFoiFeito = form.getValue("campo19___" + indexes[i]);
             var comentarioG = form.getValue("campo20___" + indexes[i]);
             var progresso = form.getValue("progresso3___" + indexes[i]);
             
         	if (progresso =="" || progresso == null) {
         		throw "É necessário indicar o progresso do funcionário para o segundo feedback";
         	}
         	else if (progresso !="branco" ){
         		  if (comentarioF =="" || comentarioF == null) {
               		throw "É necessário inserir o comentário do funcionário para o segundo feedback";
               	}
               	if (comoFoiFeito =="" || comoFoiFeito == null) {
               		throw "É necessário informar o campo campo isso foi feito para o segundo feedback";
               	}
               	if (comentarioG =="" || comentarioG == null) {
               		throw "É necessário que você insirá o seu comentário como líder do funcionário para o segundo feedback";
               	}
         	}
   
         
         
         	
     		
    		if (progresso != 'branco'){
    			qtdeMetasValidas = qtdeMetasValidas + 1;
    		}
    		
         } 
    	 
    	 
         
         if (qtdeMetasValidas == 0){
 			throw "Você precisa incluir de 3 a 5 metas.";	
 		}
 			    
 		
 		if (qtdeMetasValidas <3 ){
 			 throw "Você precisa incluir de 3 a 5 metas.";	
 		}
    	
 		if (qtdeMetasValidas > 5){
 			 	throw "Você precisa incluir de 3 a 5 metas.";	
 		}

    	if (form.getValue("campo24") =="" || form.getValue("campo24") == null) {
    		throw "O comentário da linha de aprendizado e desenvolvimento para o segundo feedback não foi preenchido";
    	}
    	if (form.getValue("campo23") =="" || form.getValue("campo23") == null) {
    		throw "O comentário da linha de apoio do líder imediato para o primeiro segundo não foi preenchido";
    	}
    	if (form.getValue("campo22") =="" || form.getValue("campo22") == null) {
    		throw "O comentário da linha de equilibrio e vida para o primeiro segundo não foi preenchido";
    	}
    	if (form.getValue("campo21") =="" || form.getValue("campo21") == null) {
    		throw "O comentário da linha de qual próximo passo de carreira/o que posso fazer para o primeiro segundo não foi preenchido";
    	}
    
    	
    }
    
    
    function retornaEmailUsuario(userId){
      	 var constraints   = new Array();
   		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST));
   		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
   			
   	        if (dataset != null && dataset.values.length > 0) {
   	        	return dataset.getValue(0, "mail");
   	        }  
   	        else {
   	        	return null;
   	        }	    
      }
    
    
    //recebe data do Fluig e convert para data normal
    function convertStringToData(StringToData) {   
    	//01/05/2019
        var data = StringToData.split('/');

        return new Date(data[1] + "/" + data[0] + "/" + data[2]);
    } 
	
}