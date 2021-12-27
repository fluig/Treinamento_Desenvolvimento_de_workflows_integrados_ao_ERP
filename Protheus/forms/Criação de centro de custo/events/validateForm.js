function validateForm(form){
	var atividade = getValue("WKNumState");

	var msg = "";
	
	if(atividade == 0 || atividade == 4){
		if(form.getValue("txt_cod_centro_custo").trim() == ""){
			msg += "<br />- Código do Centro de custo";
		}
		
		if(form.getValue("txt_nome_centro_custo").trim() == ""){
			msg += "<br />- Nome do Centro de custo";
		}
		
		if(form.getValue("txt_classe_centro_custo").trim() == "" || form.getValue("txt_cod_classe_centro_custo").trim() == ""){
			msg += "<br />- Tipo do Centro de custo";
		}
	}
	
	
	if(atividade == 5){
		if(form.getValue("txt_aprov_gestor") == ""){
			msg += "<br />- Solicitação aprovada?";
		} else if(form.getValue("txt_aprov_gestor") == "nao" && form.getValue("txt_justificativa_gestor") == ""){
			msg += "<br />- Justificativa";
		}
	}
	
	if(msg != ""){
		throw "Os seguintes campos são de preenchimento obrigatório: " + msg;
	}		
}