var config = {
	apiKey: "AIzaSyC6ywDHGPyv3mA7-BntxTUqw21c0X02GMQ",
	authDomain: "nota-7fb52.firebaseapp.com",
	databaseURL: "https://nota-7fb52.firebaseio.com",
	projectId: "nota-7fb52",
	storageBucket: "nota-7fb52.appspot.com",
	messagingSenderId: "1026270155856"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("notas");

var chave;
var empresa;
var valor;
var icms;

$(document).ready( function(){
	$("#escolha").hide()
	$("#sucesso").hide()
});

function carregar(result) {
	$("#inicio").hide()
	$("#escolha").show()
	var url = result
	chave = url.split('?')[1].split('=')[1].split('&')[0]
	valor = url.split('?')[1].split('NF=')[1].split('&')[0]
	icms = url.split('?')[1].split('ICMS=')[1].split('&')[0]
	$("#chave").text(chave)
	$("#valor").text(valor)
	$("#icms").text(icms)
}

$('.botoes').on('click',function(){
	$('#escolha').hide()
	$('#sucesso').show()
	setTimeout(function() {
		$('#sucesso').hide()
		$('#inicio').show()
	}, 3000);
})

var scanner = new Instascan.Scanner({ video: document.getElementById('preview'),
	mirror:false });
scanner.addListener('scan', function (content) {
	carregar(content);
});
Instascan.Camera.getCameras().then(function (cameras) {
	if (cameras.length > 1) {
		scanner.start(cameras[1]);
	} else if (cameras.length > 0) {
		scanner.start(cameras[0]);
	}else {
		alert("Camera não econtrada, experimente em outro aparelho!");
		console.error('No cameras found.');
	}
}).catch(function (e) {
	console.error(e);
});

function salvaNota(empresa){
	var data = new Date();
	var usersRef = ref.child('notas');
	console.log(chave, empresa, valor, icms);
	var userRef = ref.push({
		nota: chave,
		empresa: empresa,
		valor: valor,
		icms: icms,
		date: data
	});
}

var ticketRef = ref.child("notas");
var count = 0;
ticketRef.on("notas", function(snapshot) {
	var newTicket = snapshot.val();
	count++;
	console.log(count);
});