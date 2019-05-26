var infoUser;
var ABERTURA = 0;
var SOLICITARVIAGEM = 4;
var APROVACAO = 97;
var COMPRARPASSAGEM = 13;
var SOLICITACANCELAMENTO = 33
var CANCELAMENTOPASSAGEM = 64;
var CONFIRMARREEMBOLSO = 79;
var CORRIGIRSOLICITACAO = 98;
var COTARREMARCACAO = 135;
var PAGARDIARIAS = 129;
var dadosGestor;
var site;
var AtividadeAtual;



//onlyDate.setDate(new Date().toLocaleString());

var dataAprovacao = FLUIGC.calendar('#dataAprovacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

var onlyDate;
var dataNasc;
var datapartida1;
var dataretorno1;
var datapartida2;
var datapartida3;
var datacheckout;
var datacheckin;
var datacheckout2;
var datacheckin2;
var datacheckout3;
var datacheckin3;
var dataReembolso;
var dataPagamento;
var dataViagem;
var evento;
/*
dataViagem = FLUIGC.calendar('#calendardtViagem',{
	pickDate: true,
    pickTime: false
    }).setDate($('#calendardtViagem :input').attr('value') != null ? $("#calendardtViagem :input").attr('value') : new Date());

*/
$(document).ready(function() {
	if (ATIVIDADE == SOLICITACANCELAMENTO) {
        document.getElementById("cancelarpassagem").checked = false;

    }
    
	if (ATIVIDADE == COMPRARPASSAGEM){
		document.getElementById("btn_add_itemS").style.display = "none";
		
	}
	
	if (ATIVIDADE != ABERTURA && ATIVIDADE != CORRIGIRSOLICITACAO && ATIVIDADE != SOLICITARVIAGEM && ATIVIDADE != APROVACAO){
		document.getElementById("btn_add_item").style.display = "none";
	}
    if (ATIVIDADE == CONFIRMARREEMBOLSO) {
    		dataReembolso = FLUIGC.calendar('#datareembolso', {
    	    pickDate: true,
    	    pickTime: false
    	    //    sideBySide: true,
    	    //minDate: new Date().toLocaleString()

    	    //daysOfWeekDisabled: [0,6] desativar dias da semana
    	});

    }
    
    
    if (ATIVIDADE == PAGARDIARIAS) {
    	dataPagamento = FLUIGC.calendar('#dtPgto', {
              pickDate: true,
              pickTime: false
          });

    }
    

    if (ATIVIDADE == ABERTURA || ATIVIDADE == CORRIGIRSOLICITACAO || ATIVIDADE == SOLICITARVIAGEM) {
    	
        if (ATIVIDADE == ABERTURA) {
            document.getElementById("viagemplanejadaN").checked = true;
            
                onlyDate = FLUIGC.calendar('#dataSolicitacao', {
                pickDate: true,
                pickTime: false,
                useCurrent: true
            });
            
            onlyDate.setDate(new Date().toLocaleString());

            var datasFormulario = retornaDatas();
            
            var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
            
           for (var a=0; a < datasFormulario.length; a++){
        	   
        	   $("#"+datasFormulario[a]).blur(function(){
                   var data = this.value;
                   //reset campo aceite norma
            	   //$("#aceitenorma").value("");
            	   document.getElementById("aceitenorma").checked = false;
                   //$("#aceitenorma").attr('checked', false);
                  
                   var arr = data.split("/").reverse();
                   var teste = new Date(arr[0], arr[1] - 1, arr[2]);
                   var dia = teste.getDay();
                   
                   //minDate: new Date().toLocaleString()
                   
                   if (dia ==0 || dia == 6){
                       FLUIGC.toast({
                           title: 'Atenção',
                           message: 'Você está informando que irá viajar no '+ semana[dia] +', será necessário justificar o motivo através do campo observação.',
                           type: 'warning',
                           timeout: 6000
                       });
                   }
               }); 
           }
            
           
            
        }
    	
    	
        dataNasc = FLUIGC.calendar('#datanasc', {
            pickDate: true,
            pickTime: false
        });

        datapartida1 = FLUIGC.calendar('#datapartida1', {
            pickDate: true,
            pickTime: false,
            //    sideBySide: true,
            minDate: new Date().toLocaleString()

            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });


        dataretorno1 = FLUIGC.calendar('#dataretorno1', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()            
        });

        datapartida2 = FLUIGC.calendar('#datapartida2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });


        datapartida3 = FLUIGC.calendar('#datapartida3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });


        datacheckout = FLUIGC.calendar('#datacheckout', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

        datacheckin = FLUIGC.calendar('#datacheckin', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

        datacheckout2 = FLUIGC.calendar('#datacheckout2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

        datacheckin2 = FLUIGC.calendar('#datacheckin2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

        datacheckout3 = FLUIGC.calendar('#datacheckout3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

        datacheckin3 = FLUIGC.calendar('#datacheckin3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
        });

    }



});


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

function solicitanteFunc() {
    $('#solicitantepassageiro').attr("checked", false);
    $('#solicitanteNpassageiro').attr("checked", false);
    $('#passageirofuncionarionao').attr("checked", false);
    $('#passageirofuncionario').attr("checked", false);
    document.getElementById("divOutroFun").style.display = "none";
    document.getElementById("divdadospassageiro").style.display = "none";

   
}

function solicitanteNFunc() {
    $('#solicitantepassageiro').attr("checked", false);
    $('#solicitanteNpassageiro').attr("checked", false);
    $('#passageirofuncionarionao').attr("checked", false);
    $('#passageirofuncionario').attr("checked", false);

    $('#nomepassageiro').val("");
    $('#nomemae').val("");
    $('#rgpassageiro').val("");
    $('#cpfpassageiro').val("");
    $('#passaporte').val("");
    dataNasc.setDate(null);
    window["outroFuncionario"].clear();

    document.getElementById("divOutroFun").style.display = "none";
    document.getElementById("divdadospassageiro").style.display = "none";

   
}

function solicitantePassageiro() {
    if (document.getElementById("solicitanteFuncionario").checked == true) {
        $('#passageirofuncionarionao').attr("checked", false);
        document.getElementById("passageirofuncionario").click();
        document.getElementById("divOutroFun").style.display = "none";
        document.getElementById("divdadospassageiro").style.display = "block";

    }
}

function solicitanteNaoPass() {
    $('#passageirofuncionarionao').attr("checked", false);
    $('#passageirofuncionario').attr("checked", false);
    $("#passageiroestrangeironao").attr('checked', false);
    $("#passageiroestrangeiro").attr('checked', false);
    
    $('#nomepassageiro').val("");
    $('#nomemae').val("");
    $('#rgpassageiro').val("");
    $('#cpfpassageiro').val("");
    $('#passaporte').val("");
    dataNasc.setDate(null); 
    window["outroFuncionario"].clear();

    document.getElementById("divdadospassageiro").style.display = "none";
    document.getElementById("divOutroFun").style.display = "none";

    
    
}

function passageiroFuncionario() {
    $('#passageirofuncionarionao').attr("checked", false);
    $('#nomepassageiro').val("");
    $('#nomemae').val("");
    $('#rgpassageiro').val("");
    $('#cpfpassageiro').val("");
    $('#passaporte').val("");
    dataNasc.setDate(null);
    window["outroFuncionario"].clear();
    document.getElementById("div_embaixador").style.display = "none";

    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true) {
        //busca dados do funcionario
    	dadosFuncionarioDataSet();	
       
    	document.getElementById("embaixadorN").click();
        document.getElementById("divdadospassageiro").style.display = "block";
        document.getElementById("divOutroFun").style.display = "none";
    
    }

    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitanteNpassageiro").checked == true &&
        document.getElementById("passageirofuncionario").checked == true) {
        
    	//alert("É recomendado que o próprio passageiro/hóspede realize sua solicitação de viagem quando funcionário.");
    	alertaFuncionario();
        
        document.getElementById("divOutroFun").style.display = "block";
        document.getElementById("div_embaixador").style.display = "none";
        document.getElementById("embaixadorN").click();
     
    }

    if (document.getElementById("solicitanteNfuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true &&
        document.getElementById("passageirofuncionario").checked == true
    ) {
        $('#passageirofuncionario').attr("checked", false);
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();

    
         document.getElementById("divOutroFun").style.display = "none";
         document.getElementById("divdadospassageiro").style.display = "none";
    }


    if (document.getElementById("solicitanteNfuncionario").checked == true &&
    		 document.getElementById("solicitanteNpassageiro").checked == true &&
    		 document.getElementById("passageirofuncionario").checked == true
    ){
//    	alert("É recomendado que o próprio passageiro/hóspede realize sua solicitação de viagem quando funcionário.");
        
    	alertaFuncionario();
    	
    	document.getElementById("divOutroFun").style.display = "block";
        document.getElementById("divdadospassageiro").style.display = "none";
        document.getElementById("div_embaixador").style.display = "none";
        document.getElementById("embaixadorN").click();

    }


}

function alertaFuncionario(){
    FLUIGC.toast({
        title: 'Orientação: ',
        message: 'É recomendado que o próprio passageiro/hóspede realize sua solicitação de viagem quando funcionário.',
        type: 'info'
    });
}

function passageiroNfuncionario() {	 
	//sim, sim, sim
    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true &&
        document.getElementById("passageirofuncionario").checked == true) {
        $('#passageirofuncionarionao').attr("checked", false);

        $('#embaixadorN').attr("checked", false);
        
        document.getElementById("divdadospassageiro").style.display = "none";
        document.getElementById("div_embaixador").style.display = "none";
        
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
      
  
    }

    //campos sim, nao, não
    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitanteNpassageiro").checked == true &&
        document.getElementById("passageirofuncionarionao").checked == true) {

        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
        document.getElementById("divdadospassageiro").style.display = "block";
        document.getElementById("div_embaixador").style.display = "block";


    }

    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true &&
        document.getElementById("passageirofuncionarionao").checked == true
    ) {

        $('#passageirofuncionarionao').attr("checked", false);
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
        document.getElementById("divdadospassageiro").style.display = "none";
        document.getElementById("div_embaixador").style.display = "none";
        

    }
    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitanteNpassageiro").checked == true) {
        document.getElementById("divOutroFun").style.display = "none";


    }


    if (document.getElementById("solicitanteNfuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true &&
        document.getElementById("passageirofuncionarionao").checked == true
    ) {
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
        document.getElementById("divdadospassageiro").style.display = "block";
        document.getElementById("div_embaixador").style.display = "block";

    }

    if (document.getElementById("solicitanteNfuncionario").checked == true &&
        document.getElementById("solicitanteNpassageiro").checked == true &&
        document.getElementById("passageirofuncionarionao").checked == true
    ) {
        $('#passageirofuncionario').attr("checked", false);
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
    
        document.getElementById("divOutroFun").style.display = "none";
        document.getElementById("divdadospassageiro").style.display = "block";
        document.getElementById("div_embaixador").style.display = "block";
    }


}

//usado para resetar e forçar que usuario escolha primeiro o tipo de voo para saber quais campos serao apresentados
function clickTipoViagem() {

    //oculta campos de voo
    $('#tipovoo0').attr("checked", false);
    $('#tipovoo1').attr("checked", false);
    $('#tipovoo2').attr("checked", false);

    document.getElementById("trecho1").style.display = "none";
    document.getElementById("trecho2").style.display = "none";
    document.getElementById("trecho3").style.display = "none";

  
    
}

function tipoViagem() {
    if (document.getElementById("internacional").checked == true || document.getElementById("nacional").checked == true) {
        //alert("Você precisa selecionar o tipo de viagem primeiro!");
        return true;
    }

    return false;
}

function clickCamposHospedagem() {
    document.getElementById("divDatasHotel1").style.display = "none";
    document.getElementById("divDatasHotel2").style.display = "none";
    document.getElementById("divDatasHotel3").style.display = "none";


    if (tipoViagem() == true) {
        document.getElementById("divDatasHotel1").style.display = "block";
        document.getElementById("observacaoHotel").style.display = "block";

        //verifica se o tipo de voo é varios trechos então habilita campos para varias hospedagem		  
        if (document.getElementById("tipovoo2").checked == true) {
            document.getElementById("divDatasHotel2").style.display = "block";
            document.getElementById("divDatasHotel3").style.display = "block";

        }
    } else {
        alertaTipoViagem();
    }


}

function clickCancelarPassagem() {
    if (document.getElementById("cancelarpassagem").checked == true) {
        document.getElementById("justificativacanc").style.display = "block";
    }
}

function clickNaoCancelarPassagem() {
    if (document.getElementById("ncancelarpassagem").checked == true) {
        document.getElementById("justificativacanc").style.display = "none";
        $('#justificativacancelamento').val("");
    }

}

function clickReprovado() {
    document.getElementById("divJustificativaReprovacaoViagem").style.display = "block";
}

function clickCobrancaTx() {
    if (document.getElementById("cobranca").checked == true) {
        document.getElementById("div_valortx").style.display = "block";
    } else {
        document.getElementById("div_valortx").style.display = "none";
    }

}

function clickAprovado() {
    $('#justificativaReprovacao').val("");
    document.getElementById("divJustificativaReprovacaoViagem").style.display = "none";

}

function ocultaCamposVooNacional() {
    document.getElementById("div_Nacional1").style.display = "none";
    document.getElementById("div_Nacional2").style.display = "none";
    document.getElementById("div_Nacional3").style.display = "none";

}

function ocultaCamposVooInternacional() {
    document.getElementById("div_internacional1").style.display = "none";
    document.getElementById("div_internacional2").style.display = "none";
    document.getElementById("div_internacional3").style.display = "none";
}

function alertaTipoViagem() {
  //  alert("Você deve selecionar o tipo de viagem primeiro!");
    
    FLUIGC.toast({
        title: 'Atenção: ',
        message: 'Você deve selecionar o tipo de viagem primeiro!',
        type: 'warning'
    });
    
}

function clickTipoVoo0() {
    if (tipoViagem() == true) {
        apagaDadosVoo();
        document.getElementById("trecho1").style.display = "block";
        document.getElementById("div_destino1").style.display = "block";
        document.getElementById("div_datadestino1").style.display = "block";
        document.getElementById("trecho2").style.display = "none";
        document.getElementById("trecho3").style.display = "none";

        if (document.getElementById("internacional").checked == true) {
            ocultaCamposVooNacional();
            document.getElementById("div_internacional1").style.display = "block";

        } else {
            document.getElementById("div_Nacional1").style.display = "block";
            ocultaCamposVooInternacional();
        }

        document.getElementById("observacaoVoo").style.display = "block";

    } else {
        alertaTipoViagem();
    }

}

function clickTipoVoo1() {
    if (tipoViagem() == true) {
        apagaDadosVoo();
        document.getElementById("trecho1").style.display = "block";
        document.getElementById("trecho2").style.display = "none";
        document.getElementById("trecho3").style.display = "none";
        document.getElementById("div_destino1").style.display = "block";
        document.getElementById("div_datadestino1").style.display = "none";

        if (document.getElementById("internacional").checked == true) {
            ocultaCamposVooNacional();


        } else {
            document.getElementById("div_Nacional1").style.display = "block";
            ocultaCamposVooInternacional();

        }
        document.getElementById("observacaoVoo").style.display = "block";
    } else {
        alertaTipoViagem();
    }

}

function clickTipoVoo2() {
    if (tipoViagem() == true) {
        apagaDadosVoo();
        document.getElementById("trecho1").style.display = "block";
        document.getElementById("trecho2").style.display = "block";
        document.getElementById("trecho3").style.display = "block";
        document.getElementById("div_destino1").style.display = "block";
        document.getElementById("div_datadestino1").style.display = "none";


        if (document.getElementById("internacional").checked == true) {
            ocultaCamposVooNacional();
            document.getElementById("div_internacional1").style.display = "block";
            document.getElementById("div_internacional2").style.display = "block";
            document.getElementById("div_internacional3").style.display = "block";


        } else {
            document.getElementById("div_Nacional1").style.display = "block";
            document.getElementById("div_Nacional2").style.display = "block";
            document.getElementById("div_Nacional3").style.display = "block";
            ocultaCamposVooInternacional();

        }

        document.getElementById("observacaoVoo").style.display = "block";
    } else {
        alertaTipoViagem();
    }

}

//limpa campos dos voos
function apagaDadosVoo() {

    $('#datapartida1').val("");
    $('#datapartida2').val("");
    $('#datapartida3').val("");
    $('#dataretorno1').val("");

    window["origem1"].clear();
    window["origem2"].clear();
    window["origem3"].clear();
    window["destino1"].clear();
    window["destino2"].clear();
    window["destino3"].clear();

    $('#internacionalOrigem1').val("");
    $('#internacionalOrigem2').val("");
    $('#internacionalOrigem3').val("");
    $('#internacionalDestino1').val("");
    $('#internacionalDestino2').val("");
    $('#internacionalDestino3').val("");

}

function clickRemarcacao() {
    if (document.getElementById("remarcacao").checked == true) {
        document.getElementById("selecaodeviagens").style.display = "block";
        document.getElementById("div_justificativaremarcacao").style.display = "block";


    }

}

function clickNovaSolicitacao() {

    if (document.getElementById("novasolicitacao").checked == true) {
        document.getElementById("selecaodeviagens").style.display = "none";
        document.getElementById("div_justificativaremarcacao").style.display = "none";


    }
}

function removeItens() {
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITARVIAGEM || ATIVIDADE == APROVACAO || ATIVIDADE == COMPRARPASSAGEM){
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);
	    }
	}

}

function removeServico() {
	console.log("------TENTANDO REMOVER SERVIÇO---------");
	console.log("----ATIVIDADE ATUAL----- "+AtividadeAtual);
	if (AtividadeAtual == COMPRARPASSAGEM){
	    var linhas = $("#tbodyViagem tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);
	    }
	}

}

function removeItensAgenda() {
    var linhas = $("#tbodyItensAgenda tr");
    for (var i = 1; i < linhas.length; i++) {
        var td = $(linhas[i]).children()[0];
        var span = $(td).children()[0];
        fnWdkRemoveChild(span);
    }
}

function prazoMinino() {
	
	
	var dataVoo = document.getElementById("datapartida1").value;
    var dataHotel = document.getElementById("datacheckin").value;


	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITARVIAGEM || ATIVIDADE == CORRIGIRSOLICITACAO) {
		var maiorDataInformada;
        var dataAtual = new Date();
        var prazoMinimo;
        var menorDataInformada;

        //verificar se data de voo é diferente de vazio ou null
	        if (dataVoo.length > 0 && dataHotel.length > 0) {
	            //verifica se a data de voo é menor que a data de hospedagem ja que nao sao null/vazio
	            if (dataVoo <= dataHotel) {
	                menorDataInformada = dataVoo;
	                console.log("Retorno data Voo 1: " + menorDataInformada);

	            }
	            //retorna a data de hospedagem porque é menor que de voo
	            else {
	                menorDataInformada = dataHotel;
	                console.log("Retorno data Hotel 1: " + menorDataInformada);

	            }
	        }

	        //retorna a data do voo porque hotel é null
	        else if (dataVoo.length > 0 && dataHotel.length == 0) {
	            menorDataInformada = dataVoo;
	            console.log("Retorno data Voo 2: " + menorDataInformada);


	        } else if (dataHotel.length > 0 && dataVoo.length == 0) {
	            menorDataInformada = dataHotel;
	            console.log("Retorno data Hotel 2: " + menorDataInformada);


	        }

	        //adiciona prazo minimo de solicitação de viagem internacional
	        if (document.getElementById("internacional").checked == true) {	        
	            var dataset = prazoViagem("VM_PRVIAGI");	        
	        	if (dataset != null && dataset.values.length > 0) {	        		
	        		prazoMinimo = addDias(dataAtual, parseInt(dataset.values[0]["VALOR"]));

	        	}
	        }
	        //adiciona prazo minimo de solicitação de viagem nacional
	        else {	        	
	        	var dataset = prazoViagem("VM_PRVIAGN");	        
	        	if (dataset != null && dataset.values.length > 0) {	        		
	        		prazoMinimo = addDias(dataAtual, parseInt(dataset.values[0]["VALOR"]));

	        	}
	        }

	        //recebe menor data string do Fluig e converte para tipo Data MM/DD/YYYY
	        var menorDataConvertida = convertStringToData(menorDataInformada);

	        if (menorDataInformada.length > 0 && (menorDataConvertida <= prazoMinimo)) {
	            //habilita campo para justificar prazo de antecedencia não cumprido
	            document.getElementById("divJustificativa").style.display = "block";
	        } else {
	            var Jus = document.getElementById("justificativa").value = " ";
	            document.getElementById("divJustificativa").style.display = "none";
	        }

	        //chama função para set prazo de aprovação
	        prazoAprovacao(menorDataConvertida);

	        //chama função que verifica qual maior data informada da viagem
	        maiorDataInformadaViagem();	    	
    }
	

}

//preciso acrescentar isso numa chamada assincrona e colocar uma progressbar
function prazoViagem(parametro){
	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CODIGO", parametro, parametro, ConstraintType.MUST));	        	
	
    var dataset = DatasetFactory.getDataset("ds_get_Parametros", null, constraints, null);
	if (dataset != null && dataset.values.length > 0) {
		return dataset;
	}
	
	return null;
	
}

function prazoReembolso() {	
	if (document.getElementById("credito").checked == true) {
		  $("#tipormb").attr('checked', false);
		  $("#tipormbn").attr('checked', false);
	
	}
	
    //preenche PRAZO REEMBOLSO
    if (ATIVIDADE = CANCELAMENTOPASSAGEM) {
    	   var dataAtual = new Date();
           var prazoReembolso = addMeses(dataAtual, 6);
           var prazoConvertido = convertDataToString(prazoReembolso);
           $('#prazoreembolso').val(prazoConvertido);

    }
    
}

function prazoAprovacao(dataViagem) {
    var dtPrazoApr = convertDataToString(dataViagem);
    var prazoAprovacao;
    if (dtPrazoApr.length > 0) {
        prazoAprovacao = addDias(dataViagem, -1);
        //set data prazo de cancelamento em campo
        var dtPrazoApr2 = document.getElementById("prazoaprovacao").value = convertDataToString(prazoAprovacao);

    }

}

function prazoCancelamento(dataViagem) {
    var dtPrazo = convertDataToString(dataViagem);
    var prazo;
    if (dtPrazo.length > 0) {
        prazo = addDias(dataViagem, 2);
        //set data prazo de cancelamento em campo
        var dtPrazoCancelamento = document.getElementById("prazoCancelamento").value = convertDataToString(prazo);

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
    var REMARCACAO = "dataset_solicitacaoviagem";
    var RATEIO = "rateioconfigurado";
    var AGENDA = "agenda";
    var FUNCIONARIO = "outroFuncionario";
    var SERVICO = "txtservico";
    var EVENTO ="dataset_solicitacaoevento";
  
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
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
        	console.log("---ENTROU AQUI 2 ----");
            console.log("---CENTRO DE CUSTO---"+selectedItem["CODIGO"]);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

        } else {
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } else if (linhaPagamento[0] == PROJETO) {
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
        
        //$('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

    } else if (linhaPagamento[0] == ATIVIDADE) {      
    	//window[AREAESTRATEGICA + "___" + linhaPagamento[1]].setValue(selectedItem["AREA_ESTRATEGICA"]);
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    }

    else if (linhaPagamento[0] == FONTE){
    	  $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
    }

    else if (campoZOOM == REMARCACAO) {
         if (selectedItem["tipoviagem"] == "nacional") {
            document.getElementById("nacional").checked = true;

            document.getElementById("nacional").click();
        } else {
            $("#internacional").attr('checked', 'checked');	 
            document.getElementById("internacional").click();

        }

        //document.getElementById("solicitanteNpassageiro").click();
        $('#nomepassageiro').val(selectedItem["nomepassageiro"]);
        $('#nomemae').val(selectedItem["nomemae"]);
        $('#cpfpassageiro').val(selectedItem["cpfpassageiro"]);
        $('#rgpassageiro').val(selectedItem["rgpassageiro"]);
        $('#passaporte').val(selectedItem["passaporte"]);
        $('#datanasc').val(selectedItem["datanasc"]);
        $('#finalidade').val(selectedItem["finalidade"]);

        //preenche informações de pagamento
        buscaRemarcacao(selectedItem);



    }

    else if (campoZOOM == RATEIO) {    
    	buscaItensRateio(selectedItem["CODIGO"]);
    	
    }

    //preenche dados do funcionario
    else if (campoZOOM == FUNCIONARIO) {
    	console.log("---ENTROU AQUI 10 ----");
        $('#nomepassageiro').val(selectedItem["NOME"]);
        $('#nomemae').val(selectedItem["MAE"]);
        $('#cpfpassageiro').val(selectedItem["CPF"]);
        $('#rgpassageiro').val(selectedItem["RG"]);
        $('#passaporte').val(selectedItem["PASSAPORTE"]);
        $('#datanasc').val(selectedItem["DTNASC"]);
        $('#emailPassageiro').val(selectedItem["EMAIL_F"]);

        console.log(selectedItem["EMAIL_F"]);
        
        if (selectedItem["EXTRANGEIRO"] == 'SIM'){        
        	document.getElementById("passageiroestrangeiro").click();
        }
        else{
        	document.getElementById("passageiroestrangeironao").click();
        }      
        //mostra campos do passageiro
        var Visivel = document.getElementById("divdadospassageiro").style.display = "block";

        if (document.getElementById("solicitanteNfuncionario").checked == true &&
            document.getElementById("solicitanteNpassageiro").checked == true &&
            document.getElementById("passageirofuncionario").checked == true) {

            var emailFuncionarioPassageiro = selectedItem["EMAIL_USUARIO"];

        }

    }



    else if (linhaPagamento[0] == AGENDA) {
          buscaAtividades(selectedItem);
    }   
    

    else if (linhaPagamento[0] == SERVICO) {
     	$('#codigoProduto' + "___" + linhaPagamento[1]).val(selectedItem["CODIGO"]);
    	$('#geraSolicCompra' + "___" + linhaPagamento[1]).val(selectedItem["GERA_SC"]);
    }
    
    else if (campoZOOM = EVENTO){    	
    	console.log(selectedItem["FINANEVENTO"]);
    	if (selectedItem["FINANEVENTO"] =="sim"){
    		evento = selectedItem["SOLICITACAO"];    		
    		document.getElementById("carregaFinan").click();  
    		
    	}
    	else {
    		evento = selectedItem["SOLICITACAO"];  
    	}
    }
    
}


function clickFinanceiroEvento(){	
	if (document.getElementById("carregaFinan").checked == true){
		buscaDadosFinanceiroEvento(evento);	
	}
	
	
}

function buscaRemarcacao(item) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("solicitacao", item.solicitacao, item.solicitacao, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);

    constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
    dataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);

    if (dataset != null && dataset.values.length > 0) {
        adicionaItem(dataset.values);
    }
}

function buscaDadosFinanceiroEvento(item){
	   var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("solicitacao", item, item, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, constraints, null);

	    constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
	    dataset = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, constraints, null);

	    if (dataset != null && dataset.values.length > 0) {
	        adicionaItem(dataset.values);
	    }
}

function adicionaItem(itens) {
	console.log(itens);
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");

        window["txtcentrocusto___" + indice].setValue(itens[i].txtcentrocusto);

        if (itens[i].txtprojeto == null || itens[i].txtprojeto == "") {
            window["txtprojeto___" + indice].disable(true);
        } else {
            window["txtprojeto___" + indice].setValue(itens[i].txtprojeto);
        }

        window["txtatividade___" + indice].setValue(itens[i].txtatividade);

        if (itens[i].txtcategoria == null || itens[i].txtcategoria == "") {
            window["txtcategoria___" + indice].disable(true);
        } else {
            window["txtcategoria___" + indice].setValue(itens[i].txtcategoria);
        }

        if (itens[i].txtfontefinanciamento == null || itens[i].txtfontefinanciamento == "") {
            window["txtfontefinanciamento___" + indice].disable(true);
        } else {
            window["txtfontefinanciamento___" + indice].setValue(itens[i].txtfontefinanciamento);
        }

        if (itens[i].txtareaestrategica == null || itens[i].txtareaestrategica == "") {
            window["txtareaestrategica___" + indice].disable(true);
        } else {
            window["txtareaestrategica___" + indice].setValue(itens[i].txtareaestrategica);
        }

        $("#alocacao___" + indice).val(itens[i].alocacao);
        $("#localizacao___" + indice).val(itens[i].localizacao);
        $("#contacontabil___" + indice).val(itens[i].contacontabil);
        $("#percentual___" + indice).val(itens[i].percentual);
        $("#rateio___" + indice).val(itens[i].rateio);


    }
}

function adicionaLinha() {
    var indice = wdkAddChild('tableItens');
    window["txtprojeto___" + indice].disable(true);
    window["txtatividade___" + indice].disable(true);
    window["txtcategoria___" + indice].disable(true);
    window["txtfontefinanciamento___" + indice].disable(true);
    window["txtareaestrategica___" + indice].disable(true);
}

function adicionaLinhaServico() {
	var row = wdkAddChild('tableViagem');
	FLUIGC.calendar("#dtViagem___" + row, {
		pickDate: true,
		pickTime: false
	});
	
	reloadZoomFilterValues("txtservico" + "___" + row, "FLUIG," + "1");

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
    var REMARCACAO = "dataset_solicitacaoviagem"; 
    var AGENDA = "agenda";
    var FUNCIONARIO = "outroFuncionario";
    var SERVICO = "txtservico";
    var PRODUTO ="codigoProduto";
    var CONTA = "contacontabil";
    var EVENTO ="dataset_solicitacaoevento";

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




    } else if (linhaPagamento[0] == PROJETO) {
  //  	console.log("---REMOVEU AQUI 2----");
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
//        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
//        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
//        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";
        
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");


    } else if (linhaPagamento[0] == ATIVIDADE) {
  //  	console.log("---REMOVEU AQUI 3----");
 //       var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
  //      var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
 //       var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";


        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        
    }

    //REMOVE INFORMAÇÕES DE REMARCAÇÃO
    else if (campoZOOM == REMARCACAO) {
   // 	console.log("---REMOVEU AQUI 4----");
  //      console.log("-----REMOVE INFORMAÇÕES DE REMARCAÇÃO AUTOMATICAMENTE--------");
        document.getElementById("nacional").checked = false;
        $("#internacional").attr('checked', false);
        $("#solicitanteNpassageiro").attr('checked', false);
        $('#nomepassageiro').val('');
        $('#nomemae').val('');
        $('#cpfpassageiro').val('');
        $('#rgpassageiro').val('');
        $('#passaporte').val('');
        $('#datanasc').val('');
        //remove linhas de pagamento
        removeItens();
    }

    else if (campoZOOM == AGENDA) {
    	console.log("---REMOVEU AQUI 5----");
        removeItensAgenda();

    }

    else if (campoZOOM == RATEIO) {
        //removeItensRateio();
    	console.log("---REMOVEU AQUI 6----");
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);	
	        
	    }
    }


    else if (campoZOOM == FUNCIONARIO) {
  //  	console.log("---REMOVEU AQUI 7----");
        $('#nomepassageiro').val('');
        $('#nomemae').val('');
        $('#cpfpassageiro').val('');
        $('#rgpassageiro').val('');
        $('#passaporte').val('');
        $('#datanasc').val('');
        $('#emailPassageiro').val('');
    
    }

    else if (linhaPagamento[0] == SERVICO) {   	    	 
      	 $('#codigoProduto' + "___" + linhaPagamento[1]).val('');
      	 $('#geraSolicCompra' + "___" + linhaPagamento[1]).val('');
    	 
    }

    else if (linhaPagamento[0] == FONTE) {
 	   $('#' + CONTA + "___" + linhaPagamento[1]).val("");
    }
    else if (campoZOOM == EVENTO){
    	$("#carregaFinan").attr('checked', false);
    	$("#NcarregaFinan").attr('checked', false);
    	
    	//remove linhas de pagamento
        removeItens();

    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}

//recebe data JS e convert para data FLuig
function convertDataToString(dataToString) {
    var dia;

    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
    var mes = dataToString.getMonth() + 1;

    console.log("MES: " + mes);

    if (dataToString.getDate().toString().length == 1) {
        dia = dataToString.getDate();
        dia = "0" + dia.toString();

    } else {
        dia = dataToString.getDate();

    }

    console.log("TAMANHO MES: " + mes.toString().length);
    //converte mes
    if (mes.toString().length == 1) {
        mes = "0" + mes.toString();

    }
    //else {mes = dataToString.getMonth() + 1;}


    //novo formato de data: para salvar em campos data do Fluig
    return dia + "/" + mes + "/" + dataToString.getFullYear();


}

function addDias(data, dias) {
    return new Date(data.setDate(data.getDate() + dias));;

}

function addMeses(data, meses) {
    return new Date(data.setMonth(data.getMonth() + meses));

}

function addAnos(data, anos) {
    return new Date(data.setYear(data.getFullYear() + anos));

}

function vooatendido() {
    var checkBoxHotel = document.getElementById("hotelComprado");
    var checkBoxVoo = document.getElementById("vooComprado");
	document.getElementById("btn_add_itemS").style.display = "block";        
    
    if (checkBoxVoo.checked == true && checkBoxHotel.checked == true) {	   
        document.getElementById("div_valores").style.display = "block";
        document.getElementById("div_valorp").style.display = "block";
        document.getElementById("div_valorh").style.display = "block";
        document.getElementById("div_valortx").style.display = "none";
    } else if (checkBoxVoo.checked == true) {    	    	          
    	document.getElementById("div_valores").style.display = "block";
        document.getElementById("div_valorp").style.display = "block";
        document.getElementById("div_valorh").style.display = "none";
        document.getElementById("div_valortx").style.display = "none";
    } else if (checkBoxVoo.checked == false) {
        document.getElementById("div_valorp").style.display = "none";
        
    }


}

function hotelatendido() {
	document.getElementById("btn_add_itemS").style.display = "block";    
    var checkBoxHotel = document.getElementById("hotelComprado");
    var checkBoxVoo = document.getElementById("vooComprado");
    if (checkBoxHotel.checked == true && checkBoxVoo.checked == true) {
        document.getElementById("div_valores").style.display = "block";
        document.getElementById("div_valorp").style.display = "block";
        document.getElementById("div_valorh").style.display = "block";
        document.getElementById("div_valortx").style.display = "none";

    } else if (checkBoxHotel.checked == true) {
        document.getElementById("div_valores").style.display = "block";
        document.getElementById("div_valorp").style.display = "none";
        document.getElementById("div_valorh").style.display = "block";
        document.getElementById("div_valortx").style.display = "none";
    } else if (checkBoxHotel.checked == false) {
        document.getElementById("div_valorh").style.display = "none";
    }

}

//buscar campo de maior data para calcular prazo final da viagem
function maiorDataInformadaViagem() {
    var maiorDataInformada;
    var dataVoo = '';
    var dataHotel = '';

    //VERIFICA SE EXISTE VOO
    if (document.getElementById("tipovoo0").checked == true) {
        dataVoo = document.getElementById("dataretorno1").value;
        console.log("DT Final 1: " + dataVoo);
        console.log("tamanho data final: " + dataVoo.length);

    } else if (document.getElementById("tipovoo1").checked == true) {
        dataVoo = document.getElementById("datapartida1").value;
        console.log("DT Final 2: " + dataVoo);

    } else if (document.getElementById("tipovoo2").checked == true) {
        var dataVoo2 = document.getElementById("datapartida2").value;
        var dataVoo3 = document.getElementById("datapartida3").value;

        if (dataVoo3 == null || dataVoo3 == '' || dataVoo3 > 0) {
            dataVoo = dataVoo2;
            console.log("DT Final 3: " + dataVoo);
        } else {
            dataVoo = dataVoo3;
            console.log("DT Final 4: " + dataVoo);

        }
    }

    //VERIFICA SE EXISTE HOSPEDAGEM
    if (document.getElementById("solteiro").checked == true || document.getElementById("duplo").checked == true ||
        document.getElementById("triplo").checked == true || document.getElementById("outroquarto").checked == true) {

        if (document.getElementById("tipovoo2").checked == true) {
            var dataHotel2 = document.getElementById("datacheckout2").value;
            var dataHotel3 = document.getElementById("datacheckout3").value;

            if (dataHotel3 == null || dataHotel3 == '' || dataHotel3 > 0) {
                dataHotel = dataHotel2;
                console.log("DT Final 5: " + dataHotel);
            } else {
                dataHotel = dataHotel3;
                console.log("DT Final 6: " + dataHotel);
            }

        } else {
            dataHotel = document.getElementById("datacheckout").value;
            console.log("DT Final 7: " + dataHotel);
        }
    }



    //verificar se data de voo é diferente de vazio ou null
    if (dataVoo.length > 0 && dataHotel.length > 0) {
        //verifica se a data de voo é maior que a data de hospedagem ja que nao sao null/vazio
        if (dataVoo >= dataHotel) {
            maiorDataInformada = dataVoo;


        }
        //retorna a data de hospedagem porque é maior que de voo
        else {
            maiorDataInformada = dataHotel;

        }
    }

    //retorna a data do voo porque hotel é null
    else if (dataVoo.length > 0 && dataHotel.length == 0) {
        maiorDataInformada = dataVoo;

    } else if (dataHotel.length > 0 && dataVoo.length == 0) {
        maiorDataInformada = dataHotel;

    }

    console.log("MAIOR DATA INFORMADA: " + maiorDataInformada);
    //recebe maior data string do Fluig e converte para tipo Data MM/DD/YYYY
    var maiorDataConvertida = convertStringToData(maiorDataInformada);

    //chama função para set prazo de cancelamento
    prazoCancelamento(maiorDataConvertida);

}

function viagemPlanejadaS() {
    document.getElementById("divDataSetAgenda").style.display = "block";


}

function viagemPlanejadaN() {
    document.getElementById("divDataSetAgenda").style.display = "none";

}

function buscaAtividades(item) {
	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CODIGO", item.Codigo, item.Codigo, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("VM_ItensAgenda", null, constraints, null);
    
    if (dataset != null && dataset.values.length > 0) {
        analisaItem(dataset.values);
    }
    
}

/*
function buscaAtividades(item) {
    console.log("AGENDA DE VIAGEM: ");
    console.log(item.Codigo);

    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CodigoAgenda", item.Codigo, item.Codigo, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);


    constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("tablename", "tbAgendaViagem", "tbAgendaViagem", ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado", "aprovado", ConstraintType.MUST));

    dataset = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);


    if (dataset != null && dataset.values.length > 0) {
        analisaItem(dataset.values);
    }

}
*/

function analisaItem(itens) {
    for (var i in itens) {
        var indice = wdkAddChild("SolicAgendaViagem");

        $("#calendarPeriodoDe___" + indice).val(itens[i].calendarPeriodoDe);
        $("#calendarPeriodoAte___" + indice).val(itens[i].calendarPeriodoAte);
        $("#agendaAtividade___" + indice).val(itens[i].atividade);

    }

}

function desejaPassagem() {
    document.getElementById("div_tipoVoo").style.display = "block";
}

function desejaHotel() {
    document.getElementById("div_tipoHotel").style.display = "block";
}

//preciso acrescentar isso numa chamada assincrona e colocar uma progressbar
function AprovadorEmbaixador() {
         var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("mail", "raissa_rossiter@wvi.org", "raissa_rossiter@wvi.org", ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 		
		 $('#emailGestor').val("raissa_rossiter@wvi.org");
         $('#matriculaApr').val(dataset.values[0]["colleaguePK.colleagueId"]);
         $('#aprovador').val(dataset.values[0]["colleagueName"]);        
        
         
         FLUIGC.toast({
 	        title: 'Atenção: ',
 	        message: 'Sua solicitação será aprovada por: ' + dataset.values[0]["colleagueName"] ,
 	        type: 'info'
 	    }); 

}

//preciso acrescentar isso numa chamada assincrona e colocar uma progressbar
function carregaAprovador() {		
	var email = parent.WCMAPI.userEmail.toUpperCase();
		
	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("EMAIL_USUARIO", email, email, ConstraintType.MUST));
	
	    var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, constraints, null);
	    if (dataset != null && dataset.values.length > 0) {

	    	//SET CAMPOS DO APROVADOR
	        $('#emailGestor').val(dataset.values[0]["EMAIL_APROVADOR"]);
	        $('#matriculaApr').val(dataset.values[0]["MATRICULA_APROVADOR"]);
	        $('#aprovador').val(dataset.values[0]["DIRETOR"]);
	        //$('solicitanteFuncionario').val(dataset.values[0]["FUNCIONARIO_VMB"]);


	        FLUIGC.toast({
	 	        title: 'Atenção: ',
	 	        message: 'Sua solicitação será aprovada por: ' + dataset.values[0]["DIRETOR"] ,
	 	        type: 'info'
	 	    }); 
	        
	        
	    }
	 
	
}

//preciso acrescentar isso numa chamada assincrona e colocar uma progressbar
function dadosFuncionarioDataSet() {
    var email = parent.WCMAPI.userEmail.toUpperCase();

    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("EMAIL_F", email, email, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("ds_get_Funcionario", null, constraints, null);

    if (dataset != null && dataset.values.length > 0) {

        $('#nomepassageiro').val(dataset.values[0]["NOME"]);
        $('#nomemae').val(dataset.values[0]["MAE"]);
        $('#rgpassageiro').val(dataset.values[0]["RG"]);
        $('#cpfpassageiro').val(dataset.values[0]["CPF"]);
        $('#passaporte').val(dataset.values[0]["PASSAPORTE"]);
        dataNasc.setDate(dataset.values[0]["DTNASC"]);
        
        if (dataset.values[0]["EXTRANGEIRO"] == 'SIM'){        
        	document.getElementById("passageiroestrangeiro").click();
        }
        else{
        	document.getElementById("passageiroestrangeironao").click();
        } 

    }
    else {
    	  FLUIGC.toast({
    	        title: 'Atenção: ',
    	        message: 'Dados do funcionário não localizados',
    	        type: 'warning'
    	    });    		
    }    
}

//preciso acrescentar isso numa chamada assincrona e colocar uma progressbar
//carrega itens do rateio para informações de pagamento
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


function retornaDatas(){
	var datasSolicitacao = ["datapartida1","dataretorno1","datapartida2","datapartida3","datacheckin","datacheckout","datacheckin2","datacheckout2","datacheckin3","datacheckout3"];

	return datasSolicitacao;
}


/*
FLUIGC.message.alert({
    message: 'Você deve selecionar o tipo de viagem primeiro!',
    title: 'Tipo de Viagem',
    label: 'OK'
}, function(el, ev) {
    //Callback action executed by the user...
     
    //el: Element (button) clicked...
    //ev: Event triggered...
     
    this.someFunc();
});

*/



