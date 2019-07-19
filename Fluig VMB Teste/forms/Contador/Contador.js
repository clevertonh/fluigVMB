var timeCrono; 
var hor = 0;
var min = 0;
var seg = 0;
var startTime; 
var start;
var nCriancas;
var tempo;

function Iniciar(){
	nCriancas = 0;
	seg = 0;
	min = 0;
	hor = 0;
	document.form.mortalidade.value = nCriancas;
	startTime = new Date(); 
	StartCrono();	
}

function Parar(){
	clearTimeout(tempo);
}

function StartCrono() {
	start = startTime.getSeconds();

	if (seg == 10){
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	else if (seg == 20){
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	else if (seg == 30){
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	else if (seg == 40){
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	else if (seg == 50){
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	
	if (seg + 1 > 59) { 
		min+= 1 ;
		
		nCriancas = nCriancas + 1;
		document.form.mortalidade.value = nCriancas;
	}
	if (min > 59) {
		min = 0;
		hor+= 1;
	}
	var time = new Date(); 
	if (time.getSeconds() >= start) {
		seg = time.getSeconds() - start;
	} 
	else {
		seg = 60 + (time.getSeconds() - start);
		
	}
	timeCrono= (hor < 10) ? "0" + hor : hor;
	timeCrono+= ((min < 10) ? ":0" : ":") + min;
	timeCrono+= ((seg < 10) ? ":0" : ":") + seg;
	document.form.cronometro.value = timeCrono;

	tempo = setTimeout("StartCrono()",1000);
		
} 


