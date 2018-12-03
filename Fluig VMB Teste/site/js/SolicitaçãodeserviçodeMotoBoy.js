var htmlTitle = 'Solicitação de serviço de MotoBoy - Fluig Documental Process Site';
var headerString = 'Fluig VMB Teste - Fluig Documental Process Site';
var selectedTab = 15;

var currentProcess = Properties("id,SolicitaçãodeserviçodeMotoBoy|name,Solicitação de serviço de MotoBoy|version,1");
var processImageName = 'Solicitação de serviço de MotoBoy.png';

var propsLabel = Properties("id,Código|name,Nome|color,Cor:|version,Versão:|author,Autor|subprocessid,Subprocesso");


var componentList = new Array();
componentList.push(Component('circle','167.5,99.5,17.5','Inicial','startnormal.png',Properties("id,startevent4|name,Início")));
componentList.push(Component('rect','230.0,167.0,336.0,223.0','Atividade','tasknormal.png',Properties("id,task5|name,Aprovar")));
componentList.push(Component('rect','210.0,20.0,315.0,75.0','Anotação','annotation.png',Properties("id,annotationtask7|name,Start")));
componentList.push(Component('rect','230.0,300.0,336.0,356.0','Atividade','tasknormal.png',Properties("id,task12|name,Autorizar")));
componentList.push(Component('rect','230.0,420.0,336.0,476.0','Atividade','tasknormal.png',Properties("id,task17|name,Finalizar")));
componentList.push(Component('circle','427.5,447.5,17.5','Final','endnormal.png',Properties("id,endevent19|name,Fim")));
componentList.push(Component('rect','40.0,376.0,841.0,501.0','SwimLane','type.swim.lane.png',Properties("id,swimlane16|name,Fornecedor")));
componentList.push(Component('rect','40.0,254.0,841.0,376.0','SwimLane','type.swim.lane.png',Properties("id,swimlane11|name,Administração")));
componentList.push(Component('rect','40.0,132.0,841.0,254.0','SwimLane','type.swim.lane.png',Properties("id,swimlane3|name,Gerente imediato")));
componentList.push(Component('rect','40.0,10.0,841.0,132.0','SwimLane','type.swim.lane.png',Properties("id,swimlane2|name,Solicitante")));
componentList.push(Component('rect','10.0,10.0,40.0,501.0','Pool','pool.png',Properties("id,pool1|name,Solicitação de serviços de motoboy")));


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

