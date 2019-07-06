function validateForm(form){
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	
	 //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    
    
    
    var mapaForm = new java.util.HashMap();
    mapaForm = form.getCardData();
    var it = mapaForm.keySet().iterator();
     
    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
        var key = it.next();
        if (key != "solicitacao"){
        	  if (form.getValue(key) == "" ){
          		//throw "O campo " + key + " não pode ficar em branco." ;
          	}
        }
      
    }
    
    
	
	
}