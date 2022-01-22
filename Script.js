var contador = 0;
var azul = "#1F53C5";
var verde = "#B3C100";

function recibirdatos() {
    const cajas = document.querySelector('#cajas');
    var valor = document.numeros.valores.value;

    valor = parseInt(valor);
    if (contador < 9) {
        if (valor >= -9999 && valor <= 9999) {
            number = document.createElement('div');
            number.className = 'caja';

            number.id = 'x' + (contador + 1);

            var tam = 0;

            tam = 110 * contador;
            if (screen.width > 1000 && screen.width <= 1200) {
                tam = 70 * contador;
            }



            var pixeles = tam + "px";
            number.style.left = pixeles;
            contenedorDeNumeros = document.createElement('div');
            number.appendChild(contenedorDeNumeros);
            contenedorDeNumeros.className = 'Centrar';
            contenedorDeNumeros.textContent = valor;
            cajas.appendChild(number);
            contador++;
        } else {
            var error = document.getElementById('error');
            error.style.display = 'flex';

        }
        document.getElementById("numero").value = "";
    }

}

function Acomodar() {
    var mydivchild = document.getElementById('cajas').childNodes;
    var boton = document.getElementById('botonAcomodar');
    boton.disabled = true;

    console.log(mydivchild.length);
    bandera = 0;
    var i = 1;
    var time = setInterval(() => {
        //Obtenemos los valores dentro del Div
        var identifacion = 'x' + i;
        var identifacion2 = 'x' + (i + 1);
        if (i != 1) {
            var identifacion3 = 'x' + (i - 1);
            var caja3 = document.getElementById(identifacion3);
            caja3.style.borderColor = verde;
        }

        var caja1 = document.getElementById(identifacion);
        var caja2 = document.getElementById(identifacion2);

        var numeroMenor = caja1.firstChild.innerHTML;
        var numeroMayor = caja2.firstChild.innerHTML;

        caja1.style.borderColor = azul;
        caja2.style.borderColor = azul;


        numeroMenor = parseInt(numeroMenor);
        numeroMayor = parseInt(numeroMayor);

        console.log(numeroMenor + " es mayor que " + numeroMayor);
        if (numeroMenor > numeroMayor) {

            //Obtenemos posición del primer valor
            let elementStyleMenor = window.getComputedStyle(caja1);
            let positionMenor = elementStyleMenor.getPropertyValue('left');
            //Obtenemos la posición del segundo valor
            let elementStyleMayor = window.getComputedStyle(caja2);
            let positionMayor = elementStyleMayor.getPropertyValue('left');


            var aux = positionMenor;
            caja1.style.left = positionMayor;
            caja2.style.left = aux;


            caja1.id = identifacion2;
            caja2.id = identifacion;
            bandera = bandera + 1;
        }
        i = 1 + i;
        //Terminar el bucle o continuar
        if (i == mydivchild.length - 1) {
            setTimeout(function() {
                caja2.style.borderColor = verde;
                caja1.style.borderColor = verde;
            }, 1000);
            if (bandera == 0) {
                boton.disabled = false;
                clearInterval(time);
            } else {
                bandera = 0;
                i = 1;
            }
        }
    }, 2000);
}

function cerrar() {
    var error = document.getElementById('error');
    error.style.display = 'none';
}

window.onload = function() {
    document.numeros.obtener.onclick = recibirdatos
    document.numeros.Acomodo.onclick = Acomodar

}

window.addEventListener("resize", function() {
    var pantalla = screen.width;
    if (pantalla > 1000 && pantalla <= 1200) {
        BoxSize(70);

    }
    if (pantalla > 1200) {
        BoxSize(110);
    }

    if (pantalla <= 1000) {
        BoxSize(35);
    }

    function BoxSize(datos) {
        for (var i = 0; i < contador; i++) {
            var tam = datos * i;
            var idBox = 'x' + (i + 1);
            var newtam = document.getElementById(idBox);
            newtam.style.left = tam + "px";
        }

    }
});