function enableFields(form){
	var atividade = getValue("WKNumState");
	
	if(atividade == 5){
		form.setEnabled("txt_cod_centro_custo", false);
		form.setEnabled("txt_nome_centro_custo", false);
		form.setEnabled("txt_classe_centro_custo", false);
	}
	
	else if(atividade == 15){
		form.setEnabled("txt_justificativa_gestor", false);
		form.setEnabled("txt_aprov_gestor", false);		
	}
}