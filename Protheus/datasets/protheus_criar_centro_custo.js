function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("status");
	dataset.addColumn("detalhe");
	
	// Preparar parametros para enviar para a integração
	var parametros = {
	    "Class": "", 				// 1 -> Sintetico / 2 -> Analitico
	    "Code": "", 				// Cod. do centro de custo
	    "CompanyId": "01", 			// Empresa do TOTVS Protheus
	    "Name": "", 				// Nome do centro de custo
	    "RegisterSituation": "2" 	// 1 -> BLOQUEADO / 2 -> ATIVO
	}
	
	// Verificar se possui constraints
	if(constraints != null){
		
		// Se possui, vamos percorrer todas elas e armazenar o valor em seu respectivo parametro
		for(var i = 0; i < constraints.length; i++){
			if(constraints[i].fieldName == "Class"){
				parametros["Class"] = String(constraints[i].initialValue);
			}
			else if(constraints[i].fieldName == "Code"){
				parametros["Code"] = String(constraints[i].initialValue);
			}
			else if(constraints[i].fieldName == "Name"){
				parametros["Name"] = String(constraints[i].initialValue);
			}
		}
	}

	// Recuperar o serviço de segurança para pegar o código da empresa dinamicamente, documentação: http://127.0.0.1:8080/api/sdk/com/fluig/sdk/service/SecurityService.html
	var sendData = {	
		companyId: String(fluigAPI.getSecurityService().getCurrentTenantId()),
		serviceCode: "PROTHEUS_COSTCENTERS",
		endpoint: "/",
		method: "POST",
		params: parametros
	}
	
	// Fornece acesso aos serviços externos com autenticação oauth, documentação: http://127.0.0.1:8080/api/sdk/com/fluig/sdk/service/AuthorizeClientSdkService.html
	var clientService = fluigAPI.getAuthorizeClientService(); 
	
	// Realizar a integração
	// Documentação da API: https://api.totvs.com.br/apidetails/CostCenter_v1_000.json
	var vo = clientService.invokeService(JSON.stringify(sendData));
	
	// A variavel vo é onde armazenamos o retorno da integração, a partir dela vamos analisar o retorno e tratar de acordo com a regra de negocio.
	// Aqui nós vamos printar ela no log apenas para visualizar tudo o que temos dentro dela.
	log.dir(vo);

	// Armazenar o status HTTP da integração, esse passo é muito importante para idenficar se tudo ocorreu como deveria!
	// Fique atento!!! Cada API pode ter um retorno diferente, a melhor prática é consultar documentação oficial em api.totvs.com.br e checar 
	// os seus respectivos métodos e retornos possíveis.
	// O método getHttpStatusResult é da classe AuthorizeClientSdkServiceVO (Variavel clientService do nosso código)
	// Documentação completa: http://127.0.0.1:8080/api/sdk/com/fluig/sdk/api/authorizeclient/AuthorizeClientSdkServiceVO.html
	var status = String(vo.getHttpStatusResult())

	// 201 -> Sucesso na integração
	if(status == "201"){
		dataset.addRow(new Array(
			status,
			"Centro de custo criado com sucesso"
		));	
	}
	
	// 400 -> Erro de negocio na Integração
	else if (status == "400"){
	
		// Pegar o retorno da API
		var parseResult = JSON.parse(vo.getResult());
		
		// A partir do retorno pegar a mensagem de erro
		var parseError = JSON.parse(parseResult.errorMessage);

		// A partir da mensagem de erro, pegar somente os detalhes do erro
		var msg = parseError.detailedMessage
		
		dataset.addRow(new Array(
			status,
			msg
		));
	}
	
	// Erro desconhecido/Forbidden
	else {
		dataset.addRow(new Array(
			"403",
			"Ops, aconteceu um erro desconhecido, por favor tente mais tarde."
		));
	}
	
	return dataset;
}

function onMobileSync(user) {

}

