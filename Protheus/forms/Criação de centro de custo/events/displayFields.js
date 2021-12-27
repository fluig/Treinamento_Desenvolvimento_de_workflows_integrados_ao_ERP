function displayFields(form,customHTML){
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 4){
		var user = getUser();
		form.setVisibleById("panelGestor", false);
		form.setValue("txt_solicitante", user.getFullName());
		form.setValue("txt_solic_email", user.getEmail());
		form.setValue("txt_dt_solic", getDate());
	}
}

function getUser(){
	return fluigAPI.getUserService().getCurrent();
}

function getDate(){
	return new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(new java.util.Date());

}