function validateForm(form){
	
    //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO
        var indexes = form.getChildrenIndexes("tableItens");
        var total = 0;

        for (var i = 0; i < indexes.length; i++) {
            var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
            if (isNaN(fieldValue)) {
                //    fieldValue = 0;
                throw "Existem linhas sem percentual informado no rateio de pagamento.";

            }

            total = total + fieldValue;
            log.info(total);

            //console.log(total); 	        
        }
      
        if ((total < 100) || total > 100) {
            throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
        }
  
	
        //
   
            var indexes = form.getChildrenIndexes("tableItens");

            for (var i = 0; i < indexes.length; i++) {
                var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
                var projeto = form.getValue("txtprojeto___" + indexes[i]);
                var area = form.getValue("txtareaestrategica___" + indexes[i]);
                var categoria = form.getValue("txtcategoria___" + indexes[i]);
                var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
                var atividade = form.getValue("txtatividade___" + indexes[i]);

                //linhas em caso de projeto
                if (ccusto == "99990") {
                    if (projeto == null || projeto == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo projeto não foi informado";

                    }
                    if (area == null || area == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo area estratégica não foi informado";

                    }
                    if (categoria == null || categoria == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo categoria não foi informado";

                    }
                    if (fonte == null || fonte == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo fonte de financiamento não foi informado";

                    }
                    if (atividade == null || atividade == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                    }


                } else {
                    if (ccusto == null || ccusto == "") {
                        //    fieldValue = 0;
                        throw "Existem linhas no rateio de pagamento cujo campo centro de custo não foi informado.";

                    }

                    if (atividade == null || atividade == "") {
                        throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                    }

                }

            }
	
	
}