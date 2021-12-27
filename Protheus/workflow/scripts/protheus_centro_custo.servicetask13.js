function servicetask13(attempt, message) {
	
	var constraints = [
   	  DatasetFactory.createConstraint("Class", hAPI.getCardValue("txt_cod_classe_centro_custo"), "", ConstraintType.MUST),
   	  DatasetFactory.createConstraint("Name", hAPI.getCardValue("txt_nome_centro_custo"), "", ConstraintType.MUST),
   	  DatasetFactory.createConstraint("Code", hAPI.getCardValue("txt_cod_centro_custo"), "", ConstraintType.MUST)
    ];
	
	var dsProtheus = DatasetFactory.getDataset("protheus_criar_centro_custo", [], constraints, []);
	
	if(dsProtheus.getValue(0, "status") != "201"){
		throw dsProtheus.getValue(0, "detalhe");
	}
}