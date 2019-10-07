var INICIO =0;
var ABERTURA = 4;
var APROVACAO = 5;
var CORRIGIR = 45;
var GERENCIAR = 55;
var AVALIACAO = 57;


var dtSolicitacao;
var dtInicioEvento;
var dtFimEvento;
var dtcheckout;
var dtcheckin;


//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

  var $target = $(e.target);

  if ($target.parent().hasClass('disabled')) {
      return false;
  }
});

$(".next-step").click(function(e) {

  var $active = $('.wizard .nav-tabs li.active');
  $active.next().removeClass('disabled');
  nextTab($active);

});
$(".prev-step").click(function(e) {

      var $active = $('.wizard .nav-tabs li.active');
      prevTab($active);

  }

);


//termina aqui o read

function nextTab(elem) {
  $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
  $(elem).prev().find('a[data-toggle="tab"]').click();
}

var visibilidade = true;

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO){
		dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
	
		dtInicioEvento = FLUIGC.calendar('#dtInicioEvento', {
			pickDate: true,
            pickTime: true,
            useCurrent: true, 
            minDate: new Date().toLocaleString()
		});
		
		dtFimEvento = FLUIGC.calendar('#dtFimEvento', {
		    pickDate: true,
		    pickTime: true,
		    useCurrent: true,
		    minDate: new Date().toLocaleString()
		});
		
		dtcheckin = FLUIGC.calendar('#dtcheckin', {
		    pickDate: true,
		    pickTime: true,
		    useCurrent: true,
		    minDate: new Date().toLocaleString()
		});
		
		dtcheckout = FLUIGC.calendar('#dtcheckout', {
		    pickDate: true,
		    pickTime: true,
		    useCurrent: true,
		    minDate: new Date().toLocaleString()
		});
		
		
	}

	if (ATIVIDADE != INICIO  && ATIVIDADE != ABERTURA  && ATIVIDADE != CORRIGIR){
		 document.getElementById("btn_add_item").style.display = "none";
		 document.getElementById("btn_add_itemS").style.display = "none";
		 
	}

	
});

//customFnDelete="fnCustomDeleteRateio(this)"
function fnCustomDeleteRateio(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO || ATIVIDADE == CORRIGIR ){								
		fnWdkRemoveChild(oElement);	

	}
	else {
		FLUIGC.toast({
            title: 'Atenção',
            message: 'Você não pode remover nenhuma linha do rateio.',
            type: 'warning',
            timeout: 3000
        });		
	}		
}

function fnCustomDeleteHospedagem(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO || ATIVIDADE == CORRIGIR){								
		fnWdkRemoveChild(oElement);	

	}
	else {
		FLUIGC.toast({
            title: 'Atenção',
            message: 'Você não pode remover nenhuma linha.',
            type: 'warning',
            timeout: 3000
        });		
	}		
}
//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
    var LOCALIZACAO = "localizacao";
    var CONTA = "contacontabil";
    var CCUSTO = "txtcentrocusto";
    var CATEGORIA = "txtcategoria";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";
    var ALOCACAO = "alocacao";
    var RATEIO = "rateioconfigurado";
 
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
 
    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');

    //compara para verificar se o zoom é o campo centro de custo
    if (linhaPagamento[0] == CCUSTO) {
        //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");

        if (selectedItem["CODIGO"] != '99990') {
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

        } else {
            //desabilita zoom que não devem ser preenchidos
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } 
    else if (linhaPagamento[0] == PROJETO) {
 
        //LIMPA TODOS AS COLUNAS POSTERIORES
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");

        //DESBLOQUEIA TODOS OS CAMPOS
        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
        window[FONTE + "___" + linhaPagamento[1]].disable(false);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(false);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(false);

        //ENVIAR VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
        $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

    } 
    else if (linhaPagamento[0] == ATIVIDADE) {
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    }
    else if (campoZOOM == RATEIO) {        	
    	buscaItensRateio(selectedItem["CODIGO"]);
    	
    }

    else if (linhaPagamento[0] == FONTE){
  	  $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
    }
    
}


function adicionaLinhaTipoHospedagem() {
	
	var row = wdkAddChild('tableHospedagem');
/*	
	//capiturar dados do pai e preencher automaticamente no filho		
	if ($("#solteiro").val() =="solteiro" ){
		$('#idhospedagem' + "___" + row).val($("#solteiro").val());
	}
	else if ($("#duplic").val() =="duplo" ){
		$('#idhospedagem' + "___" + row).val($("#duplo").val());
	}
	else if ($("#triplo").val() =="triplo" ){
		$('#idhospedagem' + "___" + row).val($("#triplo").val());
	}
	else if ($("#outros").val() =="outros" ){
		$('#idhospedagem' + "___" + row).val($("#outros").val());
	}	

	$('#idhospedagem' + "___" + row).val($("#duplo").val());
	$('#idquantidade' + "___" + row).val($("[name=vl_HospedeporQ]").val());
	
*/
}

function adicionaLinha() {
    var indice = wdkAddChild('tableItens');
    window["txtprojeto___" + indice].disable(true);
    window["txtatividade___" + indice].disable(true);
    window["txtcategoria___" + indice].disable(true);
    window["txtfontefinanciamento___" + indice].disable(true);
    window["txtareaestrategica___" + indice].disable(true);
}

function adicionaLinhaAvaliacao(){
	var indice = wdkAddChild('tableAvaliacao');
	
}


function removedZoomItem(removedItem) {
    var LOCALIZACAO = "localizacao";
    var CCUSTO = "txtcentrocusto";
    var CATEGORIA = "txtcategoria";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";
    var ALOCACAO = "alocacao";
    var RATEIO = "rateioconfigurado";
    var ITEMRATEIO ="rateio";
    var CONTA = "contacontabil";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');


    if (linhaPagamento[0] == CCUSTO) {
         //limpa todos os campos do pagamento          
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } 
    else if (linhaPagamento[0] == PROJETO) {
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");


    } 
    else if (linhaPagamento[0] == ATIVIDADE) {
    	  $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
          $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
          $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
         


    } 
    else if (campoZOOM == RATEIO) {
        //removeItensRateio();
 	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);	
	        
	    }
    } 

    else if (linhaPagamento[0] == FONTE) {
   	   $('#' + CONTA + "___" + linhaPagamento[1]).val("");
      }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function buscaItensRateio(rateio) {

	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("RATEIO", rateio, rateio, ConstraintType.MUST));	
	var dataset = DatasetFactory.getDataset("ds_get_ItensRateio", null, constraints, null);
	
	adicionaItensRateio(dataset.values) ;

}

function adicionaItensRateio(itens) {
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");
        
        window["txtcentrocusto___" + indice].setValue(itens[i].CENTROCUSTO);   
        
       
        
        if (itens[i].PROJETO == null || itens[i].PROJETO == "") {
            window["txtprojeto___" + indice].disable(true);
        } else {
            window["txtprojeto___" + indice].setValue(itens[i].PROJETO);
            //$("#projeto").val(itens[i].PROJETO);
        }
        
        window["txtatividade___" + indice].setValue(itens[i].ATIVIDADE);
       
        
        if (itens[i].CATEGORIA == null || itens[i].CATEGORIA == "") {
            window["txtcategoria___" + indice].disable(true);
        } else {
            window["txtcategoria___" + indice].setValue(itens[i].CATEGORIA);
        }

        if (itens[i].FONTE == null || itens[i].FONTE == "") {
            window["txtfontefinanciamento___" + indice].disable(true);
        } else {
            window["txtfontefinanciamento___" + indice].setValue(itens[i].FONTE);
        }

        if (itens[i].AREA == null || itens[i].AREA == "") {
            window["txtareaestrategica___" + indice].disable(true);
        } else {
            window["txtareaestrategica___" + indice].setValue(itens[i].AREA);
        }

        $("#alocacao___" + indice).val(itens[i].ALOCACAO);
        $("#localizacao___" + indice).val(itens[i].LOCALIZACAO);
        $("#contacontabil___" + indice).val(itens[i].CONTA);
        $("#percentual___" + indice).val(itens[i].PERCENTUAL);        
        $("#rateio___" + indice).val(itens[i].RATEIO);
      

        
    }
    
    
}



