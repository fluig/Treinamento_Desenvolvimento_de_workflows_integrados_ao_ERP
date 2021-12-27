function validateForm(form){
	var msg = "";
	
	if(form.getValue("txt_cod_classe") == ""){
		msg += "<br />- " + i18n.translate("txt.cod.centro.custo");
	}

	if(form.getValue("txt_descr_classe") == ""){
		msg += "<br />- " + i18n.translate("txt.descr.centro.custo");
	}
	
	if(msg!=""){
		throw msg;
	}
}