function createDataset(fields, constraints, sortFields) {
    var c1 = DatasetFactory.createConstraint("DDD", "47", "47", ConstraintType.MUST);
     
    var dataset = DatasetFactory.getDataset("TESTE2", null, new Array(c1), null);
    return dataset;
}