var dtRegistro;
	
//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
		
dtRegistro = FLUIGC.calendar('#dtRegistro', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtRegistro.setDate(new Date().toLocaleString());
			
});
