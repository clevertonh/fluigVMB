var infoUser;
var ABERTURA = 0;
var SOLICITARVIAGEM = 4;
var APROVACAO = 97;
var COMPRARPASSAGEM = 13;
var SOLICITACANCELAMENTO = 33
var CANCELAMENTOPASSAGEM = 64;
var CONFIRMARREEMBOLSO = 79;
var CORRIGIRSOLICITACAO = 98;
var dadosGestor;

var onlyDate = FLUIGC.calendar('#dataSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

//onlyDate.setDate(new Date().toLocaleString());

var dataAprovacao = FLUIGC.calendar('#dataAprovacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});


var dataReembolso = FLUIGC.calendar('#calendariodataReembolso', {
    pickDate: true,
    pickTime: false
    //    sideBySide: true,
    //minDate: new Date().toLocaleString()

    //daysOfWeekDisabled: [0,6] desativar dias da semana
});


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


$(document).ready(function() {

    if (ATIVIDADE == SOLICITACANCELAMENTO) {
        document.getElementById("cancelarpassagem").checked = false;

    }

    if (ATIVIDADE == ABERTURA || ATIVIDADE == CORRIGIRSOLICITACAO || ATIVIDADE == SOLICITARVIAGEM) {
    	
        if (ATIVIDADE == ABERTURA) {
            document.getElementById("viagemplanejadaN").checked = true;
            onlyDate.setDate(new Date().toLocaleString());

        }
    	
    	
        dataNasc = FLUIGC.calendar('#calendariodatanasc', {
            pickDate: true,
            pickTime: false
        });

        datapartida1 = FLUIGC.calendar('#calendariodatapartida1', {
            pickDate: true,
            pickTime: false,
            //    sideBySide: true,
            minDate: new Date().toLocaleString()

            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });


        dataretorno1 = FLUIGC.calendar('#calendariodataretorno1', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datapartida2 = FLUIGC.calendar('#calendariodatapartida2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });


        datapartida3 = FLUIGC.calendar('#calendariodatapartida3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });


        datacheckout = FLUIGC.calendar('#calendariodatacheckout', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datacheckin = FLUIGC.calendar('#calendariodatacheckin', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datacheckout2 = FLUIGC.calendar('#calendariodtcheckout2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datacheckin2 = FLUIGC.calendar('#calendariodtcheckin2', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datacheckout3 = FLUIGC.calendar('#calendariodtcheckout3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
        });

        datacheckin3 = FLUIGC.calendar('#calendariodtcheckin3', {
            pickDate: true,
            pickTime: false,
            minDate: new Date().toLocaleString()
            //daysOfWeekDisabled: [0,6] desativar dias da semana
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

    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true) {
        //busca dados do funcionario
        dadosFuncionario();


        document.getElementById("divdadospassageiro").style.display = "block";
        document.getElementById("divOutroFun").style.display = "none";
    
    }

    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitanteNpassageiro").checked == true &&
        document.getElementById("passageirofuncionario").checked == true) {
        alert("É recomendado que o próprio passageiro/hóspede realize sua solicitação de viagem quando funcionário.");
        document.getElementById("divOutroFun").style.display = "block";


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
    	alert("É recomendado que o próprio passageiro/hóspede realize sua solicitação de viagem quando funcionário.");
        document.getElementById("divOutroFun").style.display = "none";
        document.getElementById("divdadospassageiro").style.display = "none";
    	
    }


}

function passageiroNfuncionario() {	 
    if (document.getElementById("solicitanteFuncionario").checked == true &&
        document.getElementById("solicitantepassageiro").checked == true &&
        document.getElementById("passageirofuncionario").checked == true) {
        $('#passageirofuncionarionao').attr("checked", false);

        document.getElementById("divdadospassageiro").style.display = "none";
        $('#nomepassageiro').val("");
        $('#nomemae').val("");
        $('#rgpassageiro').val("");
        $('#cpfpassageiro').val("");
        $('#passaporte').val("");
        dataNasc.setDate(null);
        window["outroFuncionario"].clear();
  
    }

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

    //carrega aprovador de viagem
    carregaAprovador();
   
    
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
    alert("Você deve selecionar o tipo de viagem primeiro!");
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

function clickPagamentoNormal() {
    if (document.getElementById("normal").checked == true) {
        document.getElementById("selecaorateio").style.display = "none";
        document.getElementById("panelItens").style.display = "block";

        //limpa campos do rateio
        $('#codigorateio').val("");
        window["rateioconfigurado"].clear();
    }
}

function clickPagamentoRateio() {
    if (document.getElementById("rateio").checked == true) {
        document.getElementById("selecaorateio").style.display = "block";
        document.getElementById("panelItens").style.display = "none";

    }
}

function removeItens() {
    var linhas = $("#tbodyItens tr");
    for (var i = 1; i < linhas.length; i++) {
        var td = $(linhas[i]).children()[0];
        var span = $(td).children()[0];
        fnWdkRemoveChild(span);
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
	            prazoMinimo = addDias(dataAtual, 15);

	        }
	        //adiciona prazo minimo de solicitação de viagem nacional
	        else {
	            prazoMinimo = addDias(dataAtual, 8);

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

function prazoReembolso() {
    //preenche PRAZO REEMBOLSO
    if (ATIVIDADE = CANCELAMENTOPASSAGEM) {
        if (document.getElementById("reembolso").checked == true) {
            var dataAtual = new Date();
            var prazoReembolso = addMeses(dataAtual, 6);
            var prazoConvertido = convertDataToString(prazoReembolso);
            $('#prazoreembolso').val(prazoConvertido);

        } else {
            $('#prazoreembolso').val('');
        }

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
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;

    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');


    console.log("---IDENTIFICANDO CAMPO ZOOM FILHOS-------");
    console.log(linhaPagamento[0]);
    console.log(linhaPagamento[1]);

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

        if (selectedItem["Codigo"] != '99990') {

            console.log(selectedItem["Codigo"]);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);

        } else {
            //desabilita zoom que não devem ser preenchidos
            console.log(selectedItem["Codigo"]);
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } else if (linhaPagamento[0] == PROJETO) {

        console.log("------PROJETO--------");
        console.log(selectedItem["Codigo"]);

        console.log("------CAMPO ATIVIDADE--------");
        console.log(ATIVIDADE + "___" + linhaPagamento[1]);

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

        //ENVIA VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);
        $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["Conta"]);

    } else if (linhaPagamento[0] == ATIVIDADE) {
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["Localizacao"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["Alocacao"]);

    }


    if (campoZOOM == REMARCACAO) {

        console.log("-----REMARCACAO: PREENCHENDO CAMPOS AUTOMATICAMENTE--------");

        if (selectedItem["tipoviagem"] == "nacional") {
            document.getElementById("nacional").checked = true;

            document.getElementById("nacional").click();
        } else {
            $("#internacional").attr('checked', 'checked');
            //document.getElementById("internacional").checked = true;			 
            document.getElementById("internacional").click();
            //falta bloquear o campo tipo de viagem
        }


        if (selectedItem["tipoPagamento"] == "normal") {
            document.getElementById("normal").checked = true;
            document.getElementById("normal").click();
        } else {
            document.getElementById("rateio").checked = true;
            document.getElementById("rateio").click();
            window["rateioconfigurado"].setValue(selectedItem["rateioconfigurado"]);
            $('#codigorateio').val(selectedItem["codigorateio"]);



        }

        document.getElementById("solicitanteNpassageiro").click();
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

    //GRAVA CODIGO DO RATEIO EM CAMPO OCULTO 
    if (campoZOOM == RATEIO) {
        removeItens();
        $("#codigorateio").val(selectedItem["Codigo"]);

    }

    //preenche dados do funcionario
    if (campoZOOM == FUNCIONARIO) {
        $('#nomepassageiro').val(selectedItem["NOME"]);
        $('#nomemae').val(selectedItem["MAE"]);
        $('#cpfpassageiro').val(selectedItem["CPF"]);
        $('#rgpassageiro').val(selectedItem["RG"]);
        $('#passaporte').val(selectedItem["PASSAPORTE"]);
        $('#datanasc').val(selectedItem["DTNASC"]);

        //mostra campos do passageiro
        var Visivel = document.getElementById("divdadospassageiro").style.display = "block";

        if (document.getElementById("solicitanteNfuncionario").checked == true &&
            document.getElementById("solicitanteNpassageiro").checked == true &&
            document.getElementById("passageirofuncionario").checked == true) {

            var emailFuncionarioPassageiro = selectedItem["EMAIL_USUARIO"];

            if (emailFuncionarioPassageiro != null && emailFuncionarioPassageiro != "") {
                //  AprovadorViagem(emailFuncionarioPassageiro);
            }
        }

    }



    if (linhaPagamento[0] == AGENDA) {
        buscaAtividades(selectedItem);
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

function adicionaItem(itens) {
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");

        window["txtcentrocusto___" + indice].setValue(itens[i].txtcentrocusto);

        if (itens[i].txtprojeto == null || itens[i].txtprojeto == "") {
            window["txtprojeto___" + indice].disable(true);
            //$('#'+"txtprojeto___" + indice).attr('readonly', 'readonly');
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

function removedZoomItem(removedItem) {
    var LOCALIZACAO = "localizacao";
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
   

    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
    console.log("Retornando resultado removedZoomItem");
    console.log(removedItem);


    if (linhaPagamento[0] == CCUSTO) {
        //limpa todos os campos do pagamento          
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";

        //limpa filtro
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(CATEGORIA + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Centro_Custo," + null);


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } else if (linhaPagamento[0] == PROJETO) {

        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";


    } else if (linhaPagamento[0] == ATIVIDADE) {

        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";


    }

    //REMOVE INFORMAÇÕES DE REMARCAÇÃO
    else if (campoZOOM == REMARCACAO) {

        console.log("-----REMOVE INFORMAÇÕES DE REMARCAÇÃO AUTOMATICAMENTE--------");
        document.getElementById("nacional").checked = false;
        $("#internacional").attr('checked', false);
        document.getElementById("normal").checked = false;
        document.getElementById("rateio").checked = false;
        $("#solicitanteNpassageiro").attr('checked', false);
        window["rateioconfigurado"].clear();
        $('#codigorateio').val('');
        $('#nomepassageiro').val('');
        $('#nomemae').val('');
        $('#cpfpassageiro').val('');
        $('#rgpassageiro').val('');
        $('#passaporte').val('');
        $('#datanasc').val('');
        //remove linhas de pagamento
        removeItens();
    }

    //GRAVA CODIGO DO RATEIO EM CAMPO OCULTO 
    if (campoZOOM == RATEIO) {
        removeItens();
        $("#codigorateio").val('');

    }

    if (campoZOOM == AGENDA) {
        removeItensAgenda();

    }


    if (campoZOOM == FUNCIONARIO) {
        $('#nomepassageiro').val('');
        $('#nomemae').val('');
        $('#cpfpassageiro').val('');
        $('#rgpassageiro').val('');
        $('#passaporte').val('');
        $('#datanasc').val('');

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

function carregaAprovador() {
	// Component construction by setting the window.
	var myLoading2 = FLUIGC.loading("body", {
        textMessage: "Carregando aprovador, aguarde...",
        timeout: 30,
    });
	// We can show the message of loading
	myLoading2.show();		
	
	//analisar para descobrir como enviar parametro para um dataset customizado
    var dataset = DatasetFactory.getDataset("VM_Aprovador", null, null, null);
    if (dataset != null && dataset.values.length > 0) {

    	//SET CAMPOS DO APROVADOR
        $('#emailGestor').val(dataset.values[0]["EMAIL_APROVADOR"]);
        $('#matriculaApr').val(dataset.values[0]["MATRICULA_APROVADOR"]);
        $('#aprovador').val(dataset.values[0]["DIRETOR"]);


    }

	// We can hide the message of loading
	myLoading2.hide();
	
}

////falta implementar dataset para receber email funcionario porque dataset customizado não aceita constraint
function dadosFuncionarioDataSet() {
    var email = parent.WCMAPI.userEmail.toUpperCase();

    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("EMAIL", email, email, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("VM_Funcionario", null, constraints, null);

    if (dataset != null && dataset.values.length > 0) {

        $('#nomepassageiro').val(dataset.values[0]["NOME"]);
        $('#nomemae').val(dataset.values[0]["MAE"]);
        $('#rgpassageiro').val(dataset.values[0]["RG"]);
        $('#cpfpassageiro').val(dataset.values[0]["CPF"]);
        $('#passaporte').val(dataset.values[0]["PASSAPORTE"]);
        dataNasc.setDate(dataset.values[0]["DTNASC"]);

    }

}

//depois que o metodo dadosFuncionarioDataSet for implementado esse metado pode ser descartado
function dadosFuncionario() {
    if ((ATIVIDADE == ABERTURA || ATIVIDADE == CORRIGIRSOLICITACAO)) {
        var email = parent.WCMAPI.userEmail.toUpperCase();
        var site = 'http://189.80.206.136:8087/rest/FUNCIONARIO/' + email;
        //var site = 'http://189.80.206.136:8082/rest/FUNCIONARIO/'+ email;
        carregaDados();
    }
}

//carrega dados do funcionario quando ele clica em solicitante é passageiro e funcionario solicitante esta marcado como true
function carregaDados() {
    var loading = FLUIGC.loading("body", {
        textMessage: "Carregando Dados, aguarde..."
    });
    loading.show();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'applpication/json',
        url: site,
        success: function(data, status, xhr) {
            if (data != null) {
                console.log("Usuario Obtido");
                console.log(data);
                infoUser = data;
                infoUser = infoUser[0];

                window["outroFuncionario"].clear();
                $('#nomepassageiro').val(infoUser.CNOME);
                $('#nomemae').val(infoUser.CMAE);
                $('#rgpassageiro').val(infoUser.CRG);
                $('#cpfpassageiro').val(infoUser.CCPF);
                $('#passaporte').val(infoUser.CPASSAP);
                dataNasc.setDate(infoUser.CDATANASC);

                loading.hide();
            }
        },
        error: function(xhr, status, error) {
            FLUIGC.toast({
                message: "Erro ao carregar os dados, caso não esteja de férias, atualize a página ou tente novamente mais tarde",
                type: "danger"
            });
            loading.hide();
        }
    });
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
