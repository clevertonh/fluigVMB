var ABERTURA = 0;
var INICIO = 4;
var ATUALIZACAO = 5;
var dtSolicitacao;
	


//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	 console.log("atividade");
	 console.log(ATIVIDADE);
	 if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO) { 
	
		 dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
			    pickDate: true,
			    pickTime: false,
			    useCurrent: true,
			    minDate: new Date().toLocaleString(),
			    maxDate: new Date().toLocaleString()
			});
			
		 dtSolicitacao.setDate(new Date().toLocaleString()); 
			
		   	 $("#cep").blur(function(){
				 reloadZoomFilterValues("estadoCivil", "IDENTIFICADOR," + "ESTADO_CIVIL");
				 reloadZoomFilterValues("tipoSanguineo", "IDENTIFICADOR," + "TIPO_SANGUINIO");
				 reloadZoomFilterValues("etnia", "IDENTIFICADOR," + "ETNIA");
				 reloadZoomFilterValues("PNE", "IDENTIFICADOR," + "PNE");
				 reloadZoomFilterValues("parentesco", "IDENTIFICADOR," + "PARENTESCO");
				 reloadZoomFilterValues("tamanhoCamisa", "IDENTIFICADOR," + "TAMANHO_CAMISA");
				 
				 //consulta endereço após informado CEP
				 
				
				 
				 
		     });
			
			
	 }
			
});
