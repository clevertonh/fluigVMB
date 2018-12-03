var htmlTitle = 'Solicitacao de Reembolso - Fluig Documental Process Site';
var headerString = 'Fluig VMB Teste - Fluig Documental Process Site';
var selectedTab = 11;

var currentProcess = Properties("id,Solicitacao de Reembolso|name,Solicitacao de Reembolso|version,1");
var processImageName = 'Solicitacao de Reembolso.png';

var propsLabel = Properties("id,Código|name,Nome|color,Cor:|version,Versão:|author,Autor|subprocessid,Subprocesso");


var componentList = new Array();
componentList.push(Component('rect','40.0,268.0,941.0,402.0','SwimLane','type.swim.lane.png',Properties("id,bpmnswimlane15|name,Assist. Financeiro")));
componentList.push(Component('circle','167.5,99.5,17.5','Inicial','startnormal.png',Properties("id,startevent4|name,Início")));
componentList.push(Component('rect','210.0,152.0,316.0,222.0','Atividade','tasknormal.png',Properties("id,task5|name,Realizar aprovação")));
componentList.push(Component('rect','210.0,20.0,315.0,75.0','Anotação','annotation.png',Properties("id,annotationtask7|name,Preencher formulário")));
componentList.push(Component('rect','410.0,140.0,470.0,242.0','Exclusivo','gatewayexclusive.png',Properties("id,exclusivegateway9|name,Aprovado?")));
componentList.push(Component('circle','677.5,187.5,17.5','Final','endnormal.png',Properties("id,endevent11|name,Reprovado")));
componentList.push(Component('rect','390.0,302.0,496.0,372.0','Atividade','tasknormal.png',Properties("id,task13|name,Validar informações")));
componentList.push(Component('circle','687.5,336.5,17.5','Final','endnormal.png',Properties("id,endevent18|name,Fim")));
componentList.push(Component('rect','40.0,536.0,941.0,671.0','SwimLane','type.swim.lane.png',Properties("id,swimlane22|name,Procuradores")));
componentList.push(Component('rect','40.0,402.0,941.0,536.0','SwimLane','type.swim.lane.png',Properties("id,swimlane20|name,Controller")));
componentList.push(Component('rect','40.0,134.0,941.0,268.0','SwimLane','type.swim.lane.png',Properties("id,swimlane3|name,Gestor")));
componentList.push(Component('rect','40.0,0.0,941.0,134.0','SwimLane','type.swim.lane.png',Properties("id,swimlane2|name,Solicitante")));
componentList.push(Component('rect','10.0,0.0,40.0,671.0','Pool','pool.png',Properties("id,pool1|name,Pool")));


var processList = new Array();
processList.push(Properties("id,Agendadeviagem|name,Agenda de viagem"));
processList.push(Properties("id,RenovaçaodeEstagio|name,Renovaçao de Estagio"));
processList.push(Properties("id,Cadastro para uso de taxi|name,Cadastro para uso de taxi"));
processList.push(Properties("id,Recrutamento e Selecao de Estagiario|name,Recrutamento e Selecao de Estagiario"));
processList.push(Properties("id,Encerramento de contrato de estagio|name,Encerramento de contrato de estagio"));
processList.push(Properties("id,MovimentaçãodePessoal|name,Movimentação de Pessoal"));
processList.push(Properties("id,Solicitacao de Reembolso Creche|name,Solicitacao de Reembolso Creche"));
processList.push(Properties("id,Remoçãodoserviçodetaxi|name,Remoção do serviço de taxi"));
processList.push(Properties("id,Renovaçãodelimiteparataxi|name,Renovação de limite para taxi"));
processList.push(Properties("id,SolicitacaodeAdiantamento|name,Solicitação de Adiantamento"));
processList.push(Properties("id,SolicitacaodeEventos|name,Solicitacao de Eventos"));
processList.push(Properties("id,Solicitacao de Reembolso|name,Solicitacao de Reembolso"));
processList.push(Properties("id,Solicitacao de Viagem|name,Solicitacao de Viagem"));
processList.push(Properties("id,Solicitacao de Viagem|name,Solicitacao de Viagem"));
processList.push(Properties("id,SolicitacaodeservicodeCartorio|name,Solicitação de serviço de Cartório"));
processList.push(Properties("id,SolicitaçãodeserviçodeMotoBoy|name,Solicitação de serviço de MotoBoy"));


var dataNames = function() {
	var names = currentProcess.name;
	if(names) {
		$.each(componentList, function(index, value) { 
	 		 names = names.concat('|' + value.name);
		});
	} else {
		names = new String();
	}
	return names;
};

function Properties(props) {
	var PropertiesObject = new Object();
	PropertiesObject.propNames = new Array();
	var propsArray = props.split('|');
	$.each(propsArray, function(index, value) { 
		var prop = value.split(',');
		PropertiesObject[prop[0]] = prop[1]; 
		PropertiesObject.propNames.push(prop[0]);
	});
	return PropertiesObject;
}

function Component(type, points, title, image, properties) {
	ComponentObject = properties;
	ComponentObject['points'] = points;
	ComponentObject['type'] = type;
	ComponentObject['title'] = title;	
	ComponentObject['image'] = image;	
	return ComponentObject;	
}

function getSubProcessId(name) {
	var subProcessId = new String();
	$.each(processList, function(index, process) { 
		if (process.name === name) {
			subProcessId = process.id;
		}
	});
	return subProcessId;
}

$(function($) {
	document.title = htmlTitle;
	$("#q").Watermark('Search');
});

$(document).ready(function() {
	document.getElementById("image-header").getElementsByTagName("h1")[0].textContent = headerString;

	/*
	* Alterando html
	* 
	*/
	// Titulo do Processo
	document.getElementById("diagram-title").innerHTML = '<a href="#' + currentProcess.id + '" class="diagelem"><h2>' + currentProcess.name + '</h2></a>';

	// lista de abas
	var liNodes = new String();
	$.each(processList, function(index, value) { 
		if (value.id == currentProcess.id) {
			liNodes = liNodes.concat('<li class="i-state-default ui-corner-top ui-state-active ui-tabs-selected">');
			liNodes = liNodes.concat('<a href="#tabs-0" title="tabs-0">' + value.id + '</a></li>');
		} else {
			liNodes = liNodes.concat('<li class="i-state-default ui-corner-top">');
			liNodes = liNodes.concat('<a href="' + value.id + '.htm" title="tabs-' + (index + 1)  + '">' + value.id + '</a></li>');
		}
	});

	document.getElementById("tab-list").innerHTML = liNodes;

	// Div Processo
	var currentProcessDiv = document.getElementById("current-process-div");
	currentProcessDiv.setAttribute("id", currentProcess.id + "_doc");
	currentProcessDiv.setAttribute("title", currentProcess.name);

	var currentProcessDivHtml = '<a name="' + currentProcess.id + '" id="' + currentProcess.id + '"></a>';	
	$.each(currentProcess.propNames, function(index, value) { 
		currentProcessDivHtml = currentProcessDivHtml.concat('<h4>' + ( propsLabel[value] || value )+'</h4>');		
		currentProcessDivHtml = currentProcessDivHtml.concat('<p>' + currentProcess[value] +'</p>');
	});

	currentProcessDiv.innerHTML = currentProcessDivHtml;

	//Div Componentes e Mapping
	var mapNode = document.getElementById("map");
	var areaNode = mapNode.getElementsByTagName("area")[0];

	$.each(componentList, function(index, value) { 
 		var newComponentDiv = document.createElement('div');
		newComponentDiv.setAttribute('id', value.id + "_doc");
		newComponentDiv.setAttribute('class', currentProcessDiv.getAttribute('class'));
		newComponentDiv.setAttribute('title', value.title);	
		
		var newComponentDivHtml = '<a name="' + value.id + '" id="' + value.id + '"></a>';
		newComponentDivHtml = newComponentDivHtml.concat('<img id="componen-div-image" class="icon" src="images/' + value.image + '" border="0" />');			

		$.each(value.propNames, function(indexAux, valueAux) { 
			newComponentDivHtml = newComponentDivHtml.concat('<h4>' + ( propsLabel[valueAux] || valueAux ) +'</h4>');	
			if (valueAux === 'subprocessid') {
				var subProcessId = getSubProcessId(value[valueAux]);
				newComponentDivHtml = newComponentDivHtml.concat('<p><span class="InLinkBtn"><a href="' + subProcessId + '.htm">' + subProcessId + '</a></span></p>');
			} else {
				newComponentDivHtml = newComponentDivHtml.concat('<p>' + value[valueAux].replace(/\n/gi, '<br/>') +'</p>');
			}
		});	

		newComponentDiv.innerHTML = newComponentDivHtml;
		document.getElementById("documentation").appendChild(newComponentDiv);
		
		var newAreaNode = areaNode.cloneNode(false)
		newAreaNode.setAttribute('shape', value.type);
		newAreaNode.setAttribute('coords', value.points);
		newAreaNode.setAttribute('title', value.name);
		newAreaNode.setAttribute('href', '#' + value.id);

		mapNode.appendChild(newAreaNode);
	});

	mapNode.removeChild(areaNode);

	// Imagem do Diagrama
	var imgNode = document.createElement('img');
	imgNode.setAttribute('src', 'thumbs/' + processImageName);
	imgNode.setAttribute('border', '0');
	imgNode.setAttribute('usemap', '#map');
	imgNode.setAttribute('class', 'map');
	
	document.getElementById("diagramimage").insertBefore(imgNode, mapNode);

	$("#tabs").tabs({
		selected: selectedTab, 
		select: function(event, ui) {
			var url = $.data(ui.tab, 'load.tabs');
			if (url) {
				location.href = url;
				return false;
			}
			return true;
		}
	});

	$("#tabs").tabs('paging');

	
	var arrayNames = new Array();

	$.each(componentList, function(index, value) { 
		arrayNames.push({"name":value.name, "id":value.id});
	});

	var data = dataNames().split('|');
	$("#q").autocomplete(arrayNames,
	{
		formatItem: function(row, i, max, term) {
			return ( row.name || "" );
		}
	}
	);
	$('#q').result(function(event, data, formatted) {
		var val = data.id;
		var anchor = '#' + val;
		var dia = anchor + '_doc';
		$(dia).dialog('open');
	});
	
	

	var minWidth = 610;
	if ($(".docelem img").hasClass("imageForm")) {
		var width = $(".docelem .imageForm").width();
	} else {
		var width = minWidth;
	};
	$('.docelem').dialog({ 
		autoOpen: false, 
		width: (width + 30),
		height: 480, 
		modal: true,
		show: 'slide'
	});
	$('.docelem').dialog('option', 'minWidth', 640);

	$('.diagelem').click(function() {
		var t = $(this).attr('href');
		t = t.replace('#', '');
		var dia = $(this).attr('href') + '_doc';
		$(dia).dialog('open');
	});

	$(function() {
		$('.map').maphilight();
	});

});

