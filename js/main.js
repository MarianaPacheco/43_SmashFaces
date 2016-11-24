$(document).ready(function() {
    var j;
    //Verificamos que el puntaje este inicializado
    //LocalStorage: Guarda información que permanecerá almacenada por 
    //tiempo indefinido; sin importar que el navegador se cierre.
    if(!localStorage['buenas']){
        localStorage['buenas'] = 0;
        localStorage['malas'] = 0;
        localStorage['marca'] = 0;
        j = 0;
        $('#ok').val(localStorage['buenas']);
        $('#mal').val(localStorage['malas']);
    }
    else{
        localStorage['marca']++;
        if(localStorage['marca'] >24){
            nota('warning','Empezamos de nuevo!!');
            localStorage['buenas'] = 0;
            localStorage['malas'] = 0;
            localStorage['marca'] = 0;
        }
        j = localStorage['marca'];
        $('#ok').val(localStorage['buenas']);
        $('#mal').val(localStorage['malas']);
    }
 
    //Nombres 
    nombres = ['Frida Kahlo',
        'Benito Juárez',
        'Emiliano Zapata',
        'Sor Juana Inés de la Cruz'];
 
    //Seleccionamos un nombre
    var buena;
    var src = 'img/'+nombres[j]+'.jpg';
    $('#pick').html('<img class="img-responsive foto" src="'+src+'">');
    buena = nombres[j];
 
    //Inicializamos un cronometro de 15 seg para poner la respuesta
    var cron = 15;
    var inter = setInterval(function(){
        $('#tiempo').html(cron--);
        if(cron < 0){
            clearInterval(inter);
            nota('error','Sigue intentando. La respuesta es '+buena.toUpperCase());
            localStorage['malas']++;
            setTimeout(function(){location.href = 'index.html'},4000);
        }
    },1000);
 
 
    //Comprobamos que la respuesta este correcta.
    $('#comprobar').click(function(event) {
        tem = $('#res').val().toLowerCase();
        if(tem.indexOf(buena)>-1){
            nota('success','<strong>Excelente acertaste</strong>');
            localStorage['buenas']++;
            clearInterval(inter);
            setTimeout(function(){location.href = 'index.html'},2000);
        }
        else{
            nota('error','Sigue intentando');
        }        
    });
 
    //Cuando se hace click en SIGUIENTE cargamos la pagina de nuevo
    $('#reset').click(function(event) {
        localStorage['malas']++;
        location.href="index.html";
    });
}); 
 
 
function nota(op,msg,time){
    if(time == undefined)time = 5000;
    var n = noty({
        text: msg,
        animation: {
            open: {height: 'toggle'}, 
            close: {height: 'toggle'},
            easing: 'swing', 
            speed: 500,
        },
        type:op,
        killer:true,
        timeout:time,
        layout: 'center',
        maxVisible: 1,
    });
}
