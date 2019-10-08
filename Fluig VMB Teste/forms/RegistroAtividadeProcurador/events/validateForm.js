function validateForm(form){
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	var solicitante = getValue("WKUser"); 
	
	
	
	if (!existeGrupo(solicitante)){
		throw "Apenas procuradores podem usar esse processo.";
	}
	
	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}
	
	function existeGrupo(usuario){
		var constraint = new Array();
		constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuario, usuario, ConstraintType.MUST));
		constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Procuradores", "Procuradores", ConstraintType.MUST));
		var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraint, null);
		return dataset.rowsCount > 0;
	}
	
}