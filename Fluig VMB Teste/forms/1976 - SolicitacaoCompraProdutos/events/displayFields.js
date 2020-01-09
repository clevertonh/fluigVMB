function displayFields(form,customHTML){
	var activity = getValue('WKNumState');

	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    var ABERTURA = 0;
    var INICIO = 4;
    var APROVACAO =5;    
	var CORRIGIR = 15;
	var APROVACAO_DIR = 50;
	var APROVACAO_DN = 51;
	var ASSUMIR = 42;
    
  //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("_matriculasolicitante", false);
	 
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("_matricula", false);
	 form.setVisibleById("prazoaprovacao", false); 
	 
	 
  

	 
	 
	 
}