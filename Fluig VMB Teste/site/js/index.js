var htmlProjectTitle = 'Fluig VMB Teste - Fluig Documental Process Site';
var projectHeaderString = 'Fluig VMB Teste - Fluig Documental Process Site';

var allProcessArray = Properties("Agendadeviagem,Agenda de viagem.png|RenovaçaodeEstagio,Avaliação de Estagio.png|Cadastro para uso de taxi,Cadastro para uso de taxi.png|Recrutamento e Selecao de Estagiario,Contratacao de estagiario.png|Encerramento de contrato de estagio,Encerramento de contrato de estagio.png|MovimentaçãodePessoal,Movimentação de Pessoal.png|Solicitacao de Reembolso Creche,Reembolso Auxilio Creche.png|Remoçãodoserviçodetaxi,Remoção do serviço de taxi.png|Renovaçãodelimiteparataxi,Renovação de limite para taxi.png|SolicitacaodeAdiantamento,Solicitacao de Adiantamento.png|SolicitacaodeEventos,Solicitacao de Eventos.png|Solicitacao de Reembolso,Solicitacao de Reembolso.png|Solicitacao de Viagem,Solicitacao de Viagem 2.png|Solicitacao de Viagem,Solicitacao de Viagem.png|SolicitacaodeservicodeCartorio,Solicitacao de serviço de Cartorio.png|SolicitaçãodeserviçodeMotoBoy,Solicitação de serviço de MotoBoy.png");

function Properties(props) {
	var PropertiesArray = new Array();
	var propsArray = props.split('|');
	$.each(propsArray, function(index, value) { 
		var prop = value.split(',');
		var PropertiesObject = new Object();
		PropertiesObject.id = prop[0];
		PropertiesObject.image = prop[1]; 
		PropertiesArray.push(PropertiesObject);
	});
	return PropertiesArray;
}

$(document).ready(function() {
	document.title = htmlProjectTitle;
	document.getElementById("project-header").getElementsByTagName("h1")[0].textContent = projectHeaderString;

	/*
	* Alterando o html
	*
	*/

	var diagramsDiv = document.getElementById("process-diagrams");
	$.each(allProcessArray, function(index, value) { 
 		var newProcessDiv = document.createElement('div');
		newProcessDiv.setAttribute('class', 'boxgrid caption');
		
		var newProcessDivHtml = '<a href="' + value.id + '.htm"><img src="thumbs/' + value.image + '" width="350"/></a>'
				      + '<div class="cover boxcaption"><a href="' + value.id + '.htm"><h3>' + value.id + '</h3></a><p></p></div>';
		newProcessDiv.innerHTML = newProcessDivHtml;
		diagramsDiv.appendChild(newProcessDiv);
	});	

	$('.boxgrid.slidedown').hover(function() {
		$(".cover", this).stop().animate({ top: '-260px' }, { queue: false, duration: 300 });
	}, function() {
		$(".cover", this).stop().animate({ top: '0px' }, { queue: false, duration: 300 });
	});

	$('.boxgrid.caption').hover(function() {
		$(".cover", this).stop().animate({ top: '92px' }, { queue: false, duration: 300 });
	}, function() {
		$(".cover", this).stop().animate({ top: '170px' }, { queue: false, duration: 300 });
	});
});

