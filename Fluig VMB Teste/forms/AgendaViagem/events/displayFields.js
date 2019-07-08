function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var REVISAR_AGENDA = 13;
	
	var activity = getValue('WKNumState');
	
	//var idFormulario = getCardIndex();
	
	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
    
	 form.setVisibleById("divAlterAgenda",false);
	
	 //botoes para aprovar e reprovar todas as atividades
	 form.setVisibleById("divBtGeral",false);	
	 form.setVisibleById("divReprovacao",false);
	
    
	if (activity == ABERTURA){
		 //OCULTA COLUNAS DE APROVAÇÃO E STATUS DA APROVAÇÃO
		form.setVisibleById("grid_apr",false); 
		form.setVisibleById("div_apr",false);
		 		 		 
		 form.setVisibleById("grid_jus",false);		 
		 form.setVisibleById("div_just",false);
		 form.setVisibleById("divReprovacao",false);
		 form.setVisibleById("divBtGeral",false);	 
		 
		
		 form.setHideDeleteButton(false);

	}
	
	if (activity == APROVACAO){
		form.setVisibleById("btn_add_item",false);
	
		//remove botão de excluir item da agenda
		 form.setHideDeleteButton(true);
		
	}
	
	if (activity == REVISAR_AGENDA){
		 form.setHideDeleteButton(false);			
		 form.setVisibleById("divReprovacao",false);
		 form.setVisibleById("divBtGeral",false);	 
		 
		 var indexes = form.getChildrenIndexes("tbAgendaViagem");
	        for (var i = 0; i < indexes.length; i++) {
	            form.setVisible("removeitem" + indexes[i], false);
	        }
	        
	        
	}

	
}