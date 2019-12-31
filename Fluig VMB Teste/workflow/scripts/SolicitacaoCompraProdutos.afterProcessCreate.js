function afterProcessCreate(processId){
/*
    //Captura o número do processo "Pai"
    var parentProcess = hAPI.getParentInstance(processId);

    //Se houver um processo Pai, chama a função que captura os registros da tabela pai x filho
    if(parentProcess){
        setChildTable(parentProcess);
    }
}

function setChildTable(numProcessoPai){

    //Pega o CardData do processo Pai
    var cardData = hAPI.getCardData(numProcessoPai);

    var keys = cardData.keySet().toArray();

    //Percorre os campos
    for (var key in keys) {

        var field = keys[key]

        if (field.indexOf("companyid___") > -1) {

            //Monta o Array com os campos filhos
            var childData = new java.util.HashMap();

              var index = field.replace("companyid___", "");

              childData.put("ITEMPRODUTO",cardData.get("ITEMPRODUTO___" + index));
              childData.put("ITEMQTD",cardData.get("ITEMQTD___" + index));
              childData.put("ITEMCODIGOPRD",cardData.get("ITEMCODIGOPRD___" + index));
              childData.put("ITEMIDPRD",cardData.get("ITEMIDPRD___" + index));
              childData.put("ITEMCODUND",cardData.get("ITEMCODUND___" + index));
              childData.put("ITEMSTATUS",cardData.get("ITEMSTATUS___" + index));
              childData.put("ITEMDATAENTREGA",cardData.get("ITEMDATAENTREGA___" + index));
              childData.put("ITEMRESPENTREGA",cardData.get("ITEMRESPENTREGA___" + index));
              childData.put("ITEMIDMOV",cardData.get("ITEMIDMOV___" + index));
              childData.put("ITEMNSEQITMMOV",cardData.get("ITEMNSEQITMMOV___" + index));

              //Adiciona a tabela filha os itens capturados do CardData Pai
              hAPI.addCardChild("tableItens",childData)
         }
    }
*/
}