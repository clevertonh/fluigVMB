function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("DDD");
    dataset.addColumn("Fone");
    dataset.addColumn("Nome");
     
    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
         
  
    
    if(constraints!=null && constraints.length){ //se tiver constraint filtra
         
        if(constraints[0].constraintType==ConstraintType.MUST) { // implementação somente para o MUST
             
            for(var a=0;a< tempDataset.length;a++){
            	log.info("----CONSTRAINT----");
            	log.info(constraints[0].initialValue);
            	log.info(tempDataset[a][constraints[0].fieldName]);
                // se o valor inicial da constraint for igual ao valor do campo na constraint adiciona a linha
                if(constraints[0].initialValue==tempDataset[a][constraints[0].fieldName]){                
                    dataset.addRow(new Array(tempDataset[a]["DDD"], tempDataset[a]["Fone"],tempDataset[a]["Nome"]));
                }
            }
        }
    } else { // se não tiver constraint adiciona todas as linhas
        for(var a=0;a<   tempDataset.length;a++){
            dataset.addRow(new Array(tempDataset[a]["DDD"], tempDataset[a]["Fone"],tempDataset[a]["Nome"]));
        }
    }
     
    return dataset;
}
 
function getDefaultValues(){ // retorna valores default para serem filtrados
    return  [{
                DDD: "47",
                Fone: "1111-1111",
                Nome: "Marcos"
            },
            {
                DDD: "47",
                Fone: "2222-2222",
                Nome: "Roberto"
            },
            {
                DDD: "41",
                Fone: "3333-3333",
                Nome: "Maria"
            },
            {
                DDD: "31",
                Fone: "4444-4444",
                Nome: "Francisco"
            },
            {
                DDD: "11",
                Fone: "5555-5555",
                Nome: "Michel"
            }];
}