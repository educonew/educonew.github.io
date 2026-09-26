// ==========================================
// EDUCONEW — MOTOR DE EJERCICIOS
// ==========================================

let juegoActual = null;


// ==========================================
// CONFIGURACIÓN DE NIVELES
// ==========================================

const niveles = {
    facil: {
        nombre: "Fácil",
        color: "🟢"
    },

    medio: {
        nombre: "Medio",
        color: "🟡"
    },

    dificil: {
        nombre: "Difícil",
        color: "🔴"
    },

    experto: {
        nombre: "Experto",
        color: "🟣"
    }
};


// ==========================================
// NÚMEROS ALEATORIOS
// ==========================================

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ==========================================
// INICIAR JUEGO
// ==========================================

function iniciarJuego(tema, nivel) {

    if (!niveles[nivel]) {
        console.error("Nivel no válido:", nivel);
        return;
    }

    juegoActual = {
        tema: tema,
        nivel: nivel,
        pregunta: 0,
        aciertos: 0,
        total: 10,
        bloqueado: false
    };

    prepararZonaJuego();

    mostrarPregunta();
}


// ==========================================
// PREPARAR ZONA DE JUEGO
// ==========================================

function prepararZonaJuego() {

    const contenedor = document.getElementById("juegoMatematicas");

    if (!contenedor) {
        console.error("No existe #juegoMatematicas");
        return;
    }

    contenedor.innerHTML = `
        <div class="tarjeta" style="text-align:center;">

            <p
                id="progresoJuego"
                style="
                    color:#667085;
                    font-weight:700;
                    margin-bottom:10px;
                "
            ></p>

            <div
                id="nivelJuego"
                style="
                    font-weight:800;
                    margin-bottom:10px;
                "
            ></div>

            <h2
                id="preguntaJuego"
                style="
                    font-size:2rem;
                    margin:20px 0;
                "
            ></h2>

            <div
                id="respuestasJuego"
                style="
                    display:grid;
                    grid-template-columns:repeat(2,1fr);
                    gap:12px;
                    max-width:600px;
                    margin:auto;
                "
            ></div>

            <p
                id="resultadoJuego"
                style="
                    font-weight:800;
                    min-height:28px;
                    margin-top:18px;
                "
            ></p>

        </div>
    `;
}


// ==========================================
// GENERAR PREGUNTA
// ==========================================

function generarPregunta(tema, nivel) {

    let a;
    let b;
    let respuesta;
    let simbolo;

    switch (tema) {

        // ==================================
        // SUMAS
        // ==================================

        case "sumas":

            if (nivel === "facil") {
                a = numeroAleatorio(1, 20);
                b = numeroAleatorio(1, 20);
            }

            else if (nivel === "medio") {
                a = numeroAleatorio(10, 100);
                b = numeroAleatorio(10, 100);
            }

            else if (nivel === "dificil") {
                a = numeroAleatorio(100, 999);
                b = numeroAleatorio(100, 999);
            }

            else {
                a = numeroAleatorio(1000, 9999);
                b = numeroAleatorio(1000, 9999);
            }

            respuesta = a + b;
            simbolo = "+";

            break;


        // ==================================
        // RESTAS
        // ==================================

        case "restas":

            if (nivel === "facil") {
                a = numeroAleatorio(5, 30);
            }

            else if (nivel === "medio") {
                a = numeroAleatorio(30, 150);
            }

            else if (nivel === "dificil") {
                a = numeroAleatorio(100, 999);
            }

            else {
                a = numeroAleatorio(1000, 9999);
            }

            b = numeroAleatorio(1, a);

            respuesta = a - b;
            simbolo = "−";

            break;


        // ==================================
        // MULTIPLICACIONES
        // ==================================

        case "multiplicaciones":

            if (nivel === "facil") {
                a = numeroAleatorio(1, 10);
                b = numeroAleatorio(1, 10);
            }

            else if (nivel === "medio") {
                a = numeroAleatorio(2, 20);
                b = numeroAleatorio(2, 12);
            }

            else if (nivel === "dificil") {
                a = numeroAleatorio(10, 50);
                b = numeroAleatorio(10, 30);
            }

            else {
                a = numeroAleatorio(20, 200);
                b = numeroAleatorio(20, 100);
            }

            respuesta = a * b;
            simbolo = "×";

            break;


        // ==================================
        // DIVISIONES
        // ==================================

        case "divisiones":

            if (nivel === "facil") {
                b = numeroAleatorio(2, 10);
                respuesta = numeroAleatorio(1, 10);
            }

            else if (nivel === "medio") {
                b = numeroAleatorio(2, 12);
                respuesta = numeroAleatorio(2, 20);
            }

            else if (nivel === "dificil") {
                b = numeroAleatorio(5, 30);
                respuesta = numeroAleatorio(5, 50);
            }

            else {
                b = numeroAleatorio(10, 100);
                respuesta = numeroAleatorio(10, 100);
            }

            a = b * respuesta;
            simbolo = "÷";

            break;


        // ==================================
        // FRACCIONES
        // ==================================

        case "fracciones": {

            let denominador;
            let numerador;

            if (nivel === "facil") {
                denominador = numeroAleatorio(2, 6);
            }

            else if (nivel === "medio") {
                denominador = numeroAleatorio(3, 10);
            }

            else if (nivel === "dificil") {
                denominador = numeroAleatorio(5, 20);
            }

            else {
                denominador = numeroAleatorio(10, 50);
            }

            numerador = numeroAleatorio(1, denominador - 1);

            return {
                texto: `¿Qué fracción representa ${numerador} de ${denominador}?`,
                respuesta: `${numerador}/${denominador}`
            };
        }


        // ==================================
        // PORCENTAJES
        // ==================================

        case "porcentajes": {

            let porcentaje;
            let cantidad;

            if (nivel === "facil") {
                porcentaje = numeroAleatorio(1, 5) * 10;
                cantidad = numeroAleatorio(1, 10) * 10;
            }

            else if (nivel === "medio") {
                porcentaje = numeroAleatorio(1, 9) * 10;
                cantidad = numeroAleatorio(1, 20) * 10;
            }

            else if (nivel === "dificil") {
                porcentaje = numeroAleatorio(5, 95);
                cantidad = numeroAleatorio(2, 20) * 10;
            }

            else {
                porcentaje = numeroAleatorio(5, 95);
                cantidad = numeroAleatorio(10, 100) * 10;
            }

            respuesta = (cantidad * porcentaje) / 100;

            return {
                texto: `¿Cuánto es el ${porcentaje}% de ${cantidad}?`,
                respuesta: respuesta
            };
        }


        // ==================================
        // GEOMETRÍA
        // ==================================

        case "geometria": {

            let base;
            let altura;

            if (nivel === "facil") {
                base = numeroAleatorio(2, 10);
                altura = numeroAleatorio(2, 10);
            }

            else if (nivel === "medio") {
                base = numeroAleatorio(5, 20);
                altura = numeroAleatorio(5, 20);
            }

            else if (nivel === "dificil") {
                base = numeroAleatorio(10, 50);
                altura = numeroAleatorio(10, 50);
            }

            else {
                base = numeroAleatorio(20, 100);
                altura = numeroAleatorio(20, 100);
            }

            respuesta = (base * altura) / 2;

            return {
                texto: `¿Cuál es el área de un triángulo de base ${base} y altura ${altura}?`,
                respuesta: respuesta
            };
        }


        // ==================================
        // PROBLEMAS
        // ==================================

        case "problemas": {

            let precio = numeroAleatorio(2, 20);
            let cantidad = numeroAleatorio(2, 10);

            if (nivel === "medio") {
                precio = numeroAleatorio(10, 50);
                cantidad = numeroAleatorio(2, 15);
            }

            if (nivel === "dificil") {
                precio = numeroAleatorio(20, 100);
                cantidad = numeroAleatorio(5, 20);
            }

            if (nivel === "experto") {
                precio = numeroAleatorio(50, 200);
                cantidad = numeroAleatorio(10, 30);
            }

            respuesta = precio * cantidad;

            return {
                texto: `Cada producto cuesta ${precio} €. Si compras ${cantidad}, ¿cuánto pagarás?`,
                respuesta: respuesta
            };
        }


        default:
            return null;
    }


    return {
        texto: `${a} ${simbolo} ${b} = ?`,
        respuesta: respuesta
    };
}


// ==========================================
// GENERAR RESPUESTAS
// ==========================================

function generarRespuestas(correcta) {

    const respuestas = [correcta];

    let intentos = 0;

    while (respuestas.length < 4 && intentos < 100) {

        intentos++;

        let diferencia = numeroAleatorio(
            1,
            Math.max(3, Math.floor(Math.abs(correcta) * 0.15))
        );

        let falsa;

        if (Math.random() < 0.5) {
            falsa = correcta + diferencia;
        }

        else {
            falsa = correcta - diferencia;
        }

        if (
            !respuestas.includes(falsa) &&
            falsa >= 0
        ) {
            respuestas.push(falsa);
        }
    }


    // Por seguridad, rellenamos si hiciera falta.

    while (respuestas.length < 4) {

        let falsa = correcta + respuestas.length;

        if (!respuestas.includes(falsa)) {
            respuestas.push(falsa);
        }
    }


    return respuestas.sort(
        () => Math.random() - 0.5
    );
}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

    if (!juegoActual) return;


    if (
        juegoActual.pregunta >=
        juegoActual.total
    ) {
        mostrarResultadoFinal();
        return;
    }


    const pregunta = generarPregunta(
        juegoActual.tema,
        juegoActual.nivel
    );


    if (!pregunta) {
        console.error("No se pudo generar la pregunta.");
        return;
    }


    const preguntaElemento =
        document.getElementById("preguntaJuego");

    const respuestasElemento =
        document.getElementById("respuestasJuego");

    const progresoElemento =
        document.getElementById("progresoJuego");

    const resultadoElemento =
        document.getElementById("resultadoJuego");

    const nivelElemento =
        document.getElementById("nivelJuego");


    if (
        !preguntaElemento ||
        !respuestasElemento ||
        !progresoElemento ||
        !resultadoElemento
    ) {
        console.error(
            "No se encontraron los elementos del juego."
        );

        return;
    }


    juegoActual.bloqueado = false;


    preguntaElemento.textContent =
        pregunta.texto;


    progresoElemento.textContent =
        `Pregunta ${juegoActual.pregunta + 1} de ${juegoActual.total}`;


    if (nivelElemento) {

        nivelElemento.textContent =
            `${niveles[juegoActual.nivel].color} ${niveles[juegoActual.nivel].nombre}`;
    }


    resultadoElemento.textContent = "";

    respuestasElemento.innerHTML = "";


    let respuestas;


    if (typeof pregunta.respuesta === "number") {

        respuestas =
            generarRespuestas(
                pregunta.respuesta
            );
    }

    else {

        respuestas = [pregunta.respuesta];


        while (respuestas.length < 4) {

            let falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;

            if (!respuestas.includes(falsa)) {
                respuestas.push(falsa);
            }
        }


        respuestas.sort(
            () => Math.random() - 0.5
        );
    }


    respuestas.forEach(
        respuesta => {

            const boton =
                document.createElement("button");


            boton.type = "button";

            boton.className = "respuesta";

            boton.textContent = respuesta;


            boton.style.cursor = "pointer";


            boton.addEventListener(
                "click",
                () => {

                    comprobarRespuesta(
                        respuesta,
                        pregunta.respuesta
                    );

                }
            );


            respuestasElemento.appendChild(
                boton
            );
        }
    );
}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(
    respuestaUsuario,
    respuestaCorrecta
) {

    if (!juegoActual) return;


    if (juegoActual.bloqueado) return;


    juegoActual.bloqueado = true;


    const botones =
        document.querySelectorAll(
            "#respuestasJuego .respuesta"
        );


    botones.forEach(
        boton => {

            boton.disabled = true;

            if (
                String(boton.textContent) ===
                String(respuestaCorrecta)
            ) {

                boton.style.background =
                    "#10b981";

                boton.style.color =
                    "white";
            }

        }
    );


    const resultado =
        document.getElementById(
            "resultadoJuego"
        );


    if (!resultado) return;


    if (
        String(respuestaUsuario) ===
        String(respuestaCorrecta)
    ) {

        juegoActual.aciertos++;


        resultado.textContent =
            "✅ ¡Correcto!";


        resultado.style.color =
            "#10b981";
    }

    else {

        resultado.textContent =
            `❌ Incorrecto. La respuesta era ${respuestaCorrecta}`;


        resultado.style.color =
            "#ef4444";
    }


    juegoActual.pregunta++;


    setTimeout(
        () => {

            mostrarPregunta();

        },
        900
    );
}


// ==========================================
// RESULTADO FINAL
// ==========================================

function mostrarResultadoFinal() {

    const porcentaje =
        Math.round(
            (juegoActual.aciertos /
                juegoActual.total) * 100
        );


    let mensaje;


    if (porcentaje === 100) {
        mensaje = "🏆 ¡Perfecto!";
    }

    else if (porcentaje >= 80) {
        mensaje = "🔥 ¡Excelente trabajo!";
    }

    else if (porcentaje >= 60) {
        mensaje = "👏 ¡Muy bien!";
    }

    else if (porcentaje >= 40) {
        mensaje = "💪 ¡Sigue practicando!";
    }

    else {
        mensaje = "📚 ¡Vamos a mejorar!";
    }


    const contenedor =
        document.getElementById(
            "juegoMatematicas"
        );


    if (!contenedor) return;


    contenedor.innerHTML = `

        <div class="resultado-final">

            <div style="font-size:4rem;">
                ${porcentaje >= 80 ? "🏆" : "🎯"}
            </div>

            <h2>
                ${mensaje}
            </h2>

            <p>
                Has conseguido
                <strong>
                    ${juegoActual.aciertos}
                </strong>
                de
                <strong>
                    ${juegoActual.total}
                </strong>
                respuestas correctas.
            </p>

            <div class="resultado-porcentaje">
                ${porcentaje}%
            </div>

            <button
                type="button"
                class="boton-principal"
                onclick="
                    iniciarJuego(
                        '${juegoActual.tema}',
                        '${juegoActual.nivel}'
                    )
                "
            >
                🔄 Volver a jugar
            </button>

        </div>

    `;
}


// ==========================================
// COMPATIBILIDAD CON LA WEB ANTIGUA
// ==========================================

function empezarSumas(nivel) {

    iniciarJuego(
        "sumas",
        nivel
    );
}


function empezarRestas(nivel) {

    iniciarJuego(
        "restas",
        nivel
    );
}


function empezarMultiplicaciones(nivel) {

    iniciarJuego(
        "multiplicaciones",
        nivel
    );
}


function empezarDivisiones(nivel) {

    iniciarJuego(
        "divisiones",
        nivel
    );
}


function empezarFracciones(nivel) {

    iniciarJuego(
        "fracciones",
        nivel
    );
}


// ==========================================
// MENSAJES TEMPORALES
// ==========================================

function mostrarMensaje(tema) {

    alert(
        "🚀 " +
        tema +
        " estará disponible próximamente en Educonew."
    );
}
