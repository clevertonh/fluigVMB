function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("metadata#id", "1579", "1579", ConstraintType.MUST));     
	 
	 var itemServico = new Array();
	 
	 itemServico.push({ 
			produto: ''+"DVPSG001" +'', 
			quantidade: 1, 
			valor: '' + "200" + ''
				});
	
	 itemServico.push({ 
			produto: ''+"DVPSG002" +'', 
			quantidade: 1, 
			valor: '' + "200" + ''
				});
	  
	for (var a=0; a<itemServico.length; a++){
		constraint.push(DatasetFactory.createConstraint("produto", itemServico[a].produto, itemServico[a].produto, ConstraintType.MUST));  
		constraint.push(DatasetFactory.createConstraint("quantidade", itemServico[a].quantidade, itemServico[a].quantidade, ConstraintType.MUST));
		constraint.push(DatasetFactory.createConstraint("valor", itemServico[a].valor, itemServico[a].valor, ConstraintType.MUST)); 
	}
	
    var dataset = DatasetFactory.getDataset("VM_MATA110", null, constraint, null);
    
    return dataset;
	
	
}


/*
 *  [ {
  "fieldName" : "metadata#id",
  "initialValue" : "1579",
  "finalValue" : "1579",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "produto",
  "initialValue" : "DVPSG001",
  "finalValue" : "DVPSG001",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "quantidade",
  "initialValue" : "1",
  "finalValue" : "1",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "valor",
  "initialValue" : "200",
  "finalValue" : "200",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "produto",
  "initialValue" : "DVPSG002",
  "finalValue" : "DVPSG002",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "quantidade",
  "initialValue" : "1",
  "finalValue" : "1",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
}, {
  "fieldName" : "valor",
  "initialValue" : "200",
  "finalValue" : "200",
  "fieldType" : null,
  "likeSearch" : false,
  "constraintType" : "MUST"
} ]
 */
