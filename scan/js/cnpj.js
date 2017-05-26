$(document).ready(function(){
	$(".cnpj").mask("00.000.000/0000-00");
});

function consultaCNPJ(){
	var cnpj = document.getElementsByTagName("cnpj").val();
	//var url = "https://www.receitaws.com.br/v1/cnpj/"+cnpj;
	console.log(cnpj);
	
}