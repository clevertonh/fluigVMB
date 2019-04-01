var ABERTURA = 0;
var SOLICITAR = 4;
var APROVACAO_GESTOR = 5;
var VALIDACAO = 48;
var APROVACAO_RH = 27;
var ALTERACAO_DATA = 67;


var dtSolicitacao;
var dtPagamento;



//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR){
		dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
		
	}
	else if (ATIVIDADE == VALIDACAO || ATIVIDADE == ALTERACAO_DATA){
		 dtPagamento = FLUIGC.calendar('#dtPagamento', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true, 
		    minDate: new Date().toLocaleString()
		    
		});		
	}

	
});


function retornaImagemFuncionario(){
	// metodo GET  /profile/image/{genericId}/{type}
	    var loading = FLUIGC.loading("body", {
	        textMessage: "Carregando foto de perfil do funcionário..."
	    });
	    loading.show();
	    $.ajax({
	        type: 'GET',
	        dataType: 'json',
	        contentType: 'aplication/json',
	        url: 'http://visaomundial3806.fluig.cloudtotvs.com.br/social/api/rest/social/image/profile/[wasley_santoswvi.org]/SMALL_PICTURE',
	        success: function(data, status, xhr) {
	            if (data != null) {
	                console.log("Usuario Obtido");
	                console.log(data);
	                infoUser = data;
	                infoUser = infoUser[0];

	                //aqui seta o comando para adicionar a imagem no campo
	                loading.hide();
	            }
	        },
	        error: function(xhr, status, error) {
	            FLUIGC.toast({
	                message: "Não foi possível carregar a foto de perfil do funcionário. Mas isso não impedirá você de fazer a solicitação!",
	                type: "danger"
	            });
	            loading.hide();
	        }
	    });
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
    var FUNCIONARIO = "Funcionario";
    var DEPENDENTE ="dependente"
    


    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
    console.log("Retornando resultado removedZoomItem");
    console.log(removedItem);


    if (linhaPagamento[0] == CCUSTO) {
        //limpa todos os campos           
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";
        //limpa filtro
        //reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(CATEGORIA + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);


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
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";

    } else if (linhaPagamento[0] == ATIVIDADE) {

        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";

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
    
    else if (campoZOOM == FUNCIONARIO){
    	 $("#cpfbeneficiario").val("");
    	 window[DEPENDENTE].clear();
    	 $("#dtNascimento").val("");
     	 $("#idade").val("");
     	 //window[DEPENDENTE].disable(false);
    }
    
    else if (campoZOOM == DEPENDENTE){
    	$("#dtNascimento").val("");
    	$("#idade").val("");
    }
        
  
}

function setZoomData(instance, value) {
    window[instance].setValue(value);
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
  var FUNCIONARIO = "Funcionario";
  var DEPENDENTE ="dependente";



  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;

  //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
  //separa string
  var linhaPagamento = campoZOOM.split('___');


  console.log("---IDENTIFICANDO CAMPO ZOOM FILHOS-------");
  console.log(linhaPagamento[0]);
  console.log(linhaPagamento[1]);
  
  console.log("Retornando resultado selectedItem");  
  console.log(selectedItem);

  

  
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

          console.log(selectedItem["Codigo"]);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
          reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

      } 
      else {
          //desabilita zoom que não devem ser preenchidos
          console.log(selectedItem["CODIGO"]);
          window[PROJETO + "___" + linhaPagamento[1]].disable(false);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

      }

      window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
      window[FONTE + "___" + linhaPagamento[1]].disable(true);
      window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


  } 
  else if (linhaPagamento[0] == PROJETO) {

      console.log("------PROJETO--------");
      console.log(selectedItem["CODIGO"]);

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
      reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
      reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
      reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
      $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

  } 
  else if (linhaPagamento[0] == ATIVIDADE) {
      $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
      $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

  }
  
  else if (campoZOOM == FUNCIONARIO ){	 	  
		 console.log(selectedItem["CPF"]);
	  	 $("#cpfbeneficiario").val(selectedItem["CPF"]);
	  	 
	  	 //window[DEPENDENTE].disable(true);
	  	 //window[DEPENDENTE].clear();
	  	
	  	 reloadZoomFilterValues(DEPENDENTE, "CPF_F," + selectedItem["CPF"]);
	  
	  	 
	  	 //enviar email do funcionario para recuperar login fluig
	  	 var dataset = UsuarioLogado(selectedItem["EMAIL_F"]);	  	
	  	 var login =  dataset.getValue(0, "login");
	  	 ///social/api/rest/social/image/profile/login/SMALL_PICTURE;
			
	  }
  else if (campoZOOM == DEPENDENTE){
		$('#dtNascimento').val(selectedItem["DTNASC"]);
				
		var datanasc = convertStringToData($('#dtNascimento').val());

		console.log(datanasc.getFullYear());
		console.log(datanasc.getMonth());
		console.log(datanasc.getDate());
	
		$('#idade').val(idade(datanasc.getFullYear(), datanasc.getMonth()+1, datanasc.getDate()));
		
		
		
  }
  


 
  else if (campoZOOM == RATEIO) {    
  	console.log("---ENTROU AQUI 9 ----");
  	buscaItensRateio(selectedItem["CODIGO"]);
  	
  }

  

      
  
}

function UsuarioLogado(solicitante){
	 var constraints   = new Array();
	 constraints.push(DatasetFactory.createConstraint("mail", solicitante, solicitante, ConstraintType.MUST));
	 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

	 return dataset;
}


function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}


function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
	 y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}

function idade(calyear,calmon,calday)
{
	var d = new Date();
	var curday = d.getDate();
	var curmon = d.getMonth() + 1;
	var curyear = d.getFullYear();
	
		var curd = new Date(curyear,curmon-1,curday);
		var cald = new Date(calyear,calmon-1,calday);
		
		var diff =  Date.UTC(curyear,curmon,curday,0,0,0)
			 - Date.UTC(calyear,calmon,calday,0,0,0);

		var dife = datediff(curd,cald);
		
		return dife[0]+" anos, "+dife[1]+" meses e "+dife[2]+" dias";

}



//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}

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
        
        if (itens[i].CENTROCUSTO == '99990'){
        	 $("#contacontabil___" + indice).val(itens[i].CONTA);
        }
       
        
        //precisa trocar o ponto por virgula
       // $("#percentual___" + indice).val(itens[i].PERCENTUAL);
        
        $("#rateio___" + indice).val(itens[i].RATEIO);

    }
}

function justificativaValidacao(){
	if (document.getElementById("validacao").checked == true){
		document.getElementById("justificativaReprovacaoV").style.display = "none";
	}
	else {
		document.getElementById("justificativaReprovacaoV").style.display = "block";	
	}
	
}

function justificativaReprovacao(){
	if (document.getElementById("aprovacao").checked == true || document.getElementById("devolver").checked == true ){
		document.getElementById("justificativaR").style.display = "none";
	}
	else {
		document.getElementById("justificativaR").style.display = "block";	
	}
	
}

