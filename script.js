// ==========================================
// EDUCONEW — MOTOR COMPLETO DE EJERCICIOS
// MATEMÁTICAS + LENGUA
// VERSIÓN DEFINITIVA
// ==========================================

let juegoActual = null;
let juegoLengua = null;


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
// UTILIDADES
// ==========================================

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mezclarArray(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


// Selecciona una cantidad de elementos sin repetir
function seleccionarAleatorios(array, cantidad) {
    return mezclarArray(array).slice(
        0,
        Math.min(cantidad, array.length)
    );
}


// ==========================================
// ==========================================
// MATEMÁTICAS
// ==========================================
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
// PREPARAR MATEMÁTICAS
// ==========================================

function prepararZonaJuego() {

    const contenedor =
        document.getElementById("juegoMatematicas");

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
// GENERAR PREGUNTA MATEMÁTICAS
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

            numerador =
                numeroAleatorio(1, denominador - 1);

            return {
                texto:
                    `¿Qué fracción representa ${numerador} de ${denominador}?`,

                respuesta:
                    `${numerador}/${denominador}`
            };
        }


        // ==================================
        // PORCENTAJES
        // ==================================

        case "porcentajes": {

            let porcentaje;
            let cantidad;

            if (nivel === "facil") {

                porcentaje =
                    numeroAleatorio(1, 5) * 10;

                cantidad =
                    numeroAleatorio(1, 10) * 10;
            }

            else if (nivel === "medio") {

                porcentaje =
                    numeroAleatorio(1, 9) * 10;

                cantidad =
                    numeroAleatorio(1, 20) * 10;
            }

            else if (nivel === "dificil") {

                porcentaje =
                    numeroAleatorio(5, 95);

                cantidad =
                    numeroAleatorio(2, 20) * 10;
            }

            else {

                porcentaje =
                    numeroAleatorio(5, 95);

                cantidad =
                    numeroAleatorio(10, 100) * 10;
            }

            respuesta =
                (cantidad * porcentaje) / 100;

            return {
                texto:
                    `¿Cuánto es el ${porcentaje}% de ${cantidad}?`,

                respuesta:
                    respuesta
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

            respuesta =
                (base * altura) / 2;

            return {
                texto:
                    `¿Cuál es el área de un triángulo de base ${base} y altura ${altura}?`,

                respuesta:
                    respuesta
            };
        }


        // ==================================
        // PROBLEMAS
        // ==================================

        case "problemas": {

            let precio;
            let cantidad;

            if (nivel === "facil") {
                precio = numeroAleatorio(2, 20);
                cantidad = numeroAleatorio(2, 10);
            }

            else if (nivel === "medio") {
                precio = numeroAleatorio(10, 50);
                cantidad = numeroAleatorio(2, 15);
            }

            else if (nivel === "dificil") {
                precio = numeroAleatorio(20, 100);
                cantidad = numeroAleatorio(5, 20);
            }

            else {
                precio = numeroAleatorio(50, 200);
                cantidad = numeroAleatorio(10, 30);
            }

            respuesta =
                precio * cantidad;

            return {
                texto:
                    `Cada producto cuesta ${precio} €. Si compras ${cantidad}, ¿cuánto pagarás?`,

                respuesta:
                    respuesta
            };
        }


        default:
            return null;
    }

    return {
        texto:
            `${a} ${simbolo} ${b} = ?`,

        respuesta:
            respuesta
    };
}


// ==========================================
// RESPUESTAS MATEMÁTICAS
// ==========================================

function generarRespuestas(correcta) {

    const respuestas = [correcta];

    let intentos = 0;

    while (
        respuestas.length < 4 &&
        intentos < 100
    ) {

        intentos++;

        const diferencia =
            numeroAleatorio(
                1,
                Math.max(
                    3,
                    Math.floor(
                        Math.abs(correcta) * 0.15
                    )
                )
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

    while (respuestas.length < 4) {

        const falsa =
            correcta + respuestas.length;

        if (!respuestas.includes(falsa)) {
            respuestas.push(falsa);
        }
    }

    return mezclarArray(respuestas);
}


// ==========================================
// MOSTRAR MATEMÁTICAS
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

    const pregunta =
        generarPregunta(
            juegoActual.tema,
            juegoActual.nivel
        );

    if (!pregunta) {
        console.error(
            "No se pudo generar la pregunta."
        );

        return;
    }

    const preguntaElemento =
        document.getElementById(
            "preguntaJuego"
        );

    const respuestasElemento =
        document.getElementById(
            "respuestasJuego"
        );

    const progresoElemento =
        document.getElementById(
            "progresoJuego"
        );

    const resultadoElemento =
        document.getElementById(
            "resultadoJuego"
        );

    const nivelElemento =
        document.getElementById(
            "nivelJuego"
        );

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

    if (
        typeof pregunta.respuesta ===
        "number"
    ) {

        respuestas =
            generarRespuestas(
                pregunta.respuesta
            );
    }

    else {

        respuestas =
            [pregunta.respuesta];

        while (respuestas.length < 4) {

            const falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;

            if (!respuestas.includes(falsa)) {
                respuestas.push(falsa);
            }
        }

        respuestas =
            mezclarArray(respuestas);
    }

    respuestas.forEach(
        respuesta => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            boton.className =
                "respuesta";

            boton.textContent =
                respuesta;

            boton.style.cursor =
                "pointer";

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
// COMPROBAR MATEMÁTICAS
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
// RESULTADO MATEMÁTICAS
// ==========================================

function mostrarResultadoFinal() {

    const porcentaje =
        Math.round(
            (
                juegoActual.aciertos /
                juegoActual.total
            ) * 100
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
                <strong>${juegoActual.aciertos}</strong>
                de
                <strong>${juegoActual.total}</strong>
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
// COMPATIBILIDAD MATEMÁTICAS
// ==========================================

function empezarSumas(nivel) {
    iniciarJuego("sumas", nivel);
}

function empezarRestas(nivel) {
    iniciarJuego("restas", nivel);
}

function empezarMultiplicaciones(nivel) {
    iniciarJuego("multiplicaciones", nivel);
}

function empezarDivisiones(nivel) {
    iniciarJuego("divisiones", nivel);
}

function empezarFracciones(nivel) {
    iniciarJuego("fracciones", nivel);
}


// ==========================================
// ==========================================
// LENGUA
// ==========================================
// ==========================================


// ==========================================
// BANCO DE ORTOGRAFÍA
// AHORA HAY MUCHAS MÁS PREGUNTAS
// ==========================================

const preguntasOrtografia = {

    // ======================================
    // FÁCIL
    // ======================================

    facil: [

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["casa", "caza", "kasa", "cassa"],
            correcta: "casa"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["queso", "keso", "qeso", "queso"],
            correcta: "queso"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vaca", "baca", "vakka", "vacca"],
            correcta: "vaca"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["jirafa", "girafa", "jirrafa", "girapha"],
            correcta: "jirafa"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["zapato", "sapato", "zappato", "zapatho"],
            correcta: "zapato"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["árbol", "arbol", "árvol", "árbol"],
            correcta: "árbol"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["camión", "camion", "kamión", "camionn"],
            correcta: "camión"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["lápiz", "lapiz", "lápis", "lapíz"],
            correcta: "lápiz"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["mesa", "meza", "mezza", "messa"],
            correcta: "mesa"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["ventana", "bentana", "venttana", "bentanna"],
            correcta: "ventana"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["escuela", "escuella", "ezcuela", "escueIa"],
            correcta: "escuela"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["familia", "família", "familiaa", "phamilia"],
            correcta: "familia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["amigo", "amijo", "amiggo", "hamigo"],
            correcta: "amigo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["zapato", "sapato", "zabato", "zapatho"],
            correcta: "zapato"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["coche", "koche", "cochee", "cocche"],
            correcta: "coche"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["domingo", "dominggo", "domingo", "domingó"],
            correcta: "domingo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["helado", "elado", "helhado", "hellado"],
            correcta: "helado"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["hospital", "ospital", "hosspital", "hospitál"],
            correcta: "hospital"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["jirafa", "girafa", "girrafa", "jirapha"],
            correcta: "jirafa"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["pelota", "pellota", "pelotta", "peloda"],
            correcta: "pelota"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["familia", "famillia", "familiaa", "phamilia"],
            correcta: "familia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["mañana", "manana", "mañanna", "mañána"],
            correcta: "mañana"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["sábado", "sabado", "sávado", "sabbado"],
            correcta: "sábado"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["teléfono", "telefono", "teléphono", "telefonó"],
            correcta: "teléfono"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["pájaro", "pajaro", "pájaro", "páxaro"],
            correcta: "pájaro"
        }
    ],


    // ======================================
    // MEDIO
    // ======================================

    medio: [

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["haber", "aver", "haver", "aber"],
            correcta: "haber"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["huevo", "uevo", "huévo", "huebo"],
            correcta: "huevo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["también", "tanbién", "tambien", "tambiénn"],
            correcta: "también"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["miércoles", "miercoles", "miércolles", "miercolés"],
            correcta: "miércoles"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vergüenza", "verguenza", "vergüensa", "berguenza"],
            correcta: "vergüenza"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["decisión", "desición", "decision", "decizión"],
            correcta: "decisión"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["necesario", "necesário", "nesesario", "necesareo"],
            correcta: "necesario"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["examen", "ecsamen", "exámen", "esamen"],
            correcta: "examen"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["tambor", "tanbor", "tampor", "tamborr"],
            correcta: "tambor"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["biblioteca", "bivlioteca", "biblioteka", "bibloteca"],
            correcta: "biblioteca"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vegetación", "begetación", "vegetazión", "vegetacion"],
            correcta: "vegetación"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["observar", "ovservar", "obserbar", "obserbar"],
            correcta: "observar"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["hervir", "ervir", "herbir", "hervír"],
            correcta: "hervir"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["decisión", "desisión", "decición", "decision"],
            correcta: "decisión"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["también", "tanbien", "tambien", "tanbién"],
            correcta: "también"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["geografía", "jeografía", "geografia", "geográfia"],
            correcta: "geografía"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["historia", "istoria", "hystoria", "história"],
            correcta: "historia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["prohibido", "proivido", "prohibído", "prohibitto"],
            correcta: "prohibido"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["ahora", "aora", "haora", "ahorra"],
            correcta: "ahora"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vehículo", "veículo", "vehiculo", "veehículo"],
            correcta: "vehículo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["excepción", "exepción", "excepsión", "excepcion"],
            correcta: "excepción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["construcción", "construción", "construccion", "construcsión"],
            correcta: "construcción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraordinario", "estraordinario", "extraordinarío", "extraordinareo"],
            correcta: "extraordinario"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["subterráneo", "subterraneo", "subterráneó", "subterráneo"],
            correcta: "subterráneo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vergüenza", "verguënza", "verguenza", "berguenza"],
            correcta: "vergüenza"
        }
    ],


    // ======================================
    // DIFÍCIL
    // ======================================

    dificil: [

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["subterráneo", "subterraneo", "subterráneo", "subterráneó"],
            correcta: "subterráneo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraordinario", "estraordinario", "extraordinareo", "extraordinarío"],
            correcta: "extraordinario"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["construcción", "construción", "construccion", "construcsión"],
            correcta: "construcción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["adolescente", "adoleszente", "adolesente", "adolescénte"],
            correcta: "adolescente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["privilegio", "pribilegio", "privilejio", "privillegio"],
            correcta: "privilegio"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["excepción", "exepción", "excepsión", "excepcion"],
            correcta: "excepción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inmediatamente", "inmediataménte", "inmediatemente", "inmediatamenté"],
            correcta: "inmediatamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["beneficioso", "veneficioso", "benefisioso", "beneficióso"],
            correcta: "beneficioso"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["desarrollo", "desarollo", "desarroyo", "desarroyó"],
            correcta: "desarrollo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["consciencia", "conciencia", "conziencia", "consiencia"],
            correcta: "consciencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["circunstancia", "circumstancia", "circunstáncia", "circunstansia"],
            correcta: "circunstancia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["imprescindible", "inprescindible", "impresindible", "imprecindible"],
            correcta: "imprescindible"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["responsabilidad", "responsavilidad", "responzabilidad", "responsábilidad"],
            correcta: "responsabilidad"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraordinariamente", "estraordinariamente", "extraordinarimente", "extraordináriamente"],
            correcta: "extraordinariamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["aproximadamente", "aprosimadamente", "aproximadaménte", "aprocsimadamente"],
            correcta: "aproximadamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["desafortunadamente", "desafortunadamenté", "desafortunadaménte", "desafortunademente"],
            correcta: "desafortunadamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inconveniente", "inconveniente", "inconbeniente", "inconveniénte"],
            correcta: "inconveniente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["consecuencia", "consecuéncia", "consekuencia", "consecuensia"],
            correcta: "consecuencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["circunferencia", "circunferéncia", "circunferenzia", "circunferensia"],
            correcta: "circunferencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["independiente", "indepediente", "independiénte", "indepentiente"],
            correcta: "independiente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["descripción", "descripsión", "descrición", "descripcion"],
            correcta: "descripción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["organización", "organisación", "organizazión", "organizacion"],
            correcta: "organización"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["investigación", "inbestigación", "investigazión", "investigacion"],
            correcta: "investigación"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["completamente", "completaménte", "completamente", "completementé"],
            correcta: "completamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["evidentemente", "evidenteménte", "evidentemente", "evidentementé"],
            correcta: "evidentemente"
        }
    ],


    // ======================================
    // EXPERTO
    // ======================================

    experto: [

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["idiosincrasia", "idiosincracia", "idiosincracía", "idiosincrásia"],
            correcta: "idiosincrasia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["susceptible", "susceptíble", "suseptible", "susceptivle"],
            correcta: "susceptible"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["convalecencia", "convalesencia", "convalecensia", "convalezencia"],
            correcta: "convalecencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extravagante", "estravagante", "extrabagante", "extravagánte"],
            correcta: "extravagante"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["ambigüedad", "ambiguedad", "anbigüedad", "ambigüedád"],
            correcta: "ambigüedad"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["paralelepípedo", "paralelepipedo", "paralelepípedó", "paralelipípedo"],
            correcta: "paralelepípedo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["circunferencia", "circunferéncia", "circunferenzia", "circunferensia"],
            correcta: "circunferencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["ininteligible", "ininteljible", "inintelijible", "ininteligible"],
            correcta: "ininteligible"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["meticulosamente", "meticulósamente", "meticuluzamente", "meticulosaménte"],
            correcta: "meticulosamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["idiosincrasia", "idiosincracia", "idiosincrásia", "idiosincracía"],
            correcta: "idiosincrasia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["heterogéneo", "heterogeneo", "heterogéneo", "heterojéneo"],
            correcta: "heterogéneo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["yuxtaposición", "llustaposición", "yuxtaposicion", "yuxtapozición"],
            correcta: "yuxtaposición"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["epistemología", "epistemolojía", "epistemologia", "epistemolugía"],
            correcta: "epistemología"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["circunscripción", "circunscripsión", "circunscrición", "circunscripcion"],
            correcta: "circunscripción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["idiosincrático", "idiosincractico", "idiosincrático", "idiosincrásico"],
            correcta: "idiosincrático"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inconmensurable", "inconmensuravle", "incomensurable", "inconmensuráble"],
            correcta: "inconmensurable"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["perspicacia", "perspicásia", "perspicacia", "perspicasia"],
            correcta: "perspicacia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["procrastinación", "procastinación", "procrastinacion", "procrastrinación"],
            correcta: "procrastinación"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vicisitud", "visicitud", "vicisidud", "vicisitud"],
            correcta: "vicisitud"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["beneplácito", "beneplacito", "beneplásito", "beneplácitto"],
            correcta: "beneplácito"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inextricable", "inextricavle", "inextricable", "inextricáble"],
            correcta: "inextricable"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["susceptibilidad", "susceptivilidad", "suseptibilidad", "susceptibílidad"],
            correcta: "susceptibilidad"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["omnisciente", "omnisziente", "omnisciente", "omniscéncia"],
            correcta: "omnisciente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["idiosincrasia", "idiosincracia", "idiosincrasía", "idiosincrássia"],
            correcta: "idiosincrasia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["paradójicamente", "paradojicamente", "paradojícamente", "paradogicamente"],
            correcta: "paradójicamente"
        }
    ]
};


// ==========================================
// BANCO DE GRAMÁTICA
// ==========================================

const preguntasGramatica = {

    // ======================================
    // FÁCIL
    // ======================================

    facil: [

        {
            pregunta: "¿Qué tipo de palabra es «casa»?",
            opciones: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
            correcta: "Sustantivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «correr»?",
            opciones: ["Verbo", "Sustantivo", "Adjetivo", "Artículo"],
            correcta: "Verbo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «bonito»?",
            opciones: ["Adjetivo", "Verbo", "Pronombre", "Artículo"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «rápidamente»?",
            opciones: ["Adverbio", "Verbo", "Sustantivo", "Adjetivo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Cuál es el verbo de «María estudia mucho»?",
            opciones: ["María", "estudia", "mucho", "ninguna"],
            correcta: "estudia"
        },

        {
            pregunta: "¿Cuál es el sustantivo en «El perro corre»?",
            opciones: ["El", "perro", "corre", "ninguna"],
            correcta: "perro"
        },

        {
            pregunta: "¿Qué tipo de palabra es «azul»?",
            opciones: ["Adjetivo", "Verbo", "Sustantivo", "Adverbio"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «ayer»?",
            opciones: ["Adverbio", "Verbo", "Adjetivo", "Sustantivo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Cuál es el verbo en «Pedro salta»?",
            opciones: ["Pedro", "salta", "ninguna", "el"],
            correcta: "salta"
        },

        {
            pregunta: "¿Cuál es el sustantivo en «La niña sonríe»?",
            opciones: ["La", "niña", "sonríe", "ninguna"],
            correcta: "niña"
        },

        {
            pregunta: "¿Qué tipo de palabra es «feliz»?",
            opciones: ["Adjetivo", "Verbo", "Sustantivo", "Preposición"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «casa»?",
            opciones: ["Sustantivo", "Adverbio", "Verbo", "Conjunción"],
            correcta: "Sustantivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «muy»?",
            opciones: ["Adverbio", "Sustantivo", "Verbo", "Artículo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Qué tipo de palabra es «ellos»?",
            opciones: ["Pronombre", "Verbo", "Adjetivo", "Artículo"],
            correcta: "Pronombre"
        },

        {
            pregunta: "¿Qué tipo de palabra es «y»?",
            opciones: ["Conjunción", "Verbo", "Sustantivo", "Adjetivo"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Qué tipo de palabra es «el» en «el coche»?",
            opciones: ["Artículo", "Verbo", "Adverbio", "Pronombre"],
            correcta: "Artículo"
        },

        {
            pregunta: "¿Cuál es el verbo en «Ana canta»?",
            opciones: ["Ana", "canta", "la", "ninguna"],
            correcta: "canta"
        },

        {
            pregunta: "¿Cuál es el sustantivo en «El gato duerme»?",
            opciones: ["El", "gato", "duerme", "ninguna"],
            correcta: "gato"
        },

        {
            pregunta: "¿Qué tipo de palabra es «lentamente»?",
            opciones: ["Adverbio", "Adjetivo", "Verbo", "Sustantivo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Qué tipo de palabra es «grande»?",
            opciones: ["Adjetivo", "Verbo", "Adverbio", "Pronombre"],
            correcta: "Adjetivo"
        }
    ],


    // ======================================
    // MEDIO
    // ======================================

    medio: [

        {
            pregunta: "¿Cuál es el sujeto en «Los alumnos estudian»?",
            opciones: ["Los alumnos", "estudian", "alumnos estudian", "Los"],
            correcta: "Los alumnos"
        },

        {
            pregunta: "¿Cuál es el predicado en «Mi hermano juega al fútbol»?",
            opciones: ["Mi hermano", "juega al fútbol", "hermano", "fútbol"],
            correcta: "juega al fútbol"
        },

        {
            pregunta: "¿Qué tipo de palabra es «lentamente»?",
            opciones: ["Adverbio", "Adjetivo", "Sustantivo", "Verbo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Qué tipo de palabra es «ellos»?",
            opciones: ["Pronombre", "Adjetivo", "Verbo", "Sustantivo"],
            correcta: "Pronombre"
        },

        {
            pregunta: "¿Qué tipo de palabra es «tres» en «tres libros»?",
            opciones: ["Determinante numeral", "Verbo", "Adverbio", "Pronombre personal"],
            correcta: "Determinante numeral"
        },

        {
            pregunta: "¿Cuál es el verbo en «El niño pequeño juega»?",
            opciones: ["niño", "pequeño", "juega", "el"],
            correcta: "juega"
        },

        {
            pregunta: "¿Cuál es el sujeto en «Mi hermana canta»?",
            opciones: ["Mi hermana", "canta", "hermana canta", "Mi"],
            correcta: "Mi hermana"
        },

        {
            pregunta: "¿Cuál es el predicado en «El perro corre rápido»?",
            opciones: ["El perro", "corre rápido", "perro", "rápido"],
            correcta: "corre rápido"
        },

        {
            pregunta: "¿Qué tipo de palabra es «nosotros»?",
            opciones: ["Pronombre", "Verbo", "Adjetivo", "Adverbio"],
            correcta: "Pronombre"
        },

        {
            pregunta: "¿Qué tipo de palabra es «grande»?",
            opciones: ["Adjetivo", "Sustantivo", "Verbo", "Pronombre"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Cuál es el sujeto en «La profesora explica la lección»?",
            opciones: ["La profesora", "explica", "la lección", "profesora explica"],
            correcta: "La profesora"
        },

        {
            pregunta: "¿Cuál es el predicado en «Los niños juegan en el parque»?",
            opciones: ["Los niños", "juegan en el parque", "niños", "el parque"],
            correcta: "juegan en el parque"
        },

        {
            pregunta: "¿Qué tipo de palabra es «cinco» en «cinco alumnos»?",
            opciones: ["Determinante numeral", "Adjetivo", "Verbo", "Adverbio"],
            correcta: "Determinante numeral"
        },

        {
            pregunta: "¿Qué tipo de palabra es «aquellos» en «aquellos libros»?",
            opciones: ["Determinante demostrativo", "Verbo", "Adverbio", "Conjunción"],
            correcta: "Determinante demostrativo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «mi» en «mi casa»?",
            opciones: ["Determinante posesivo", "Pronombre", "Verbo", "Adverbio"],
            correcta: "Determinante posesivo"
        },

        {
            pregunta: "¿Cuál es el verbo en «Mis amigos estudian matemáticas»?",
            opciones: ["Mis", "amigos", "estudian", "matemáticas"],
            correcta: "estudian"
        },

        {
            pregunta: "¿Cuál es el sujeto en «El coche rojo corre mucho»?",
            opciones: ["El coche rojo", "corre mucho", "rojo", "mucho"],
            correcta: "El coche rojo"
        },

        {
            pregunta: "¿Cuál es el predicado en «Mi padre trabaja mucho»?",
            opciones: ["Mi padre", "trabaja mucho", "padre", "mucho"],
            correcta: "trabaja mucho"
        },

        {
            pregunta: "¿Qué tipo de palabra es «porque»?",
            opciones: ["Conjunción", "Adjetivo", "Sustantivo", "Pronombre"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Qué tipo de palabra es «mañana» en «Mañana iremos al colegio»?",
            opciones: ["Adverbio", "Adjetivo", "Sustantivo", "Verbo"],
            correcta: "Adverbio"
        }
    ],


    // ======================================
    // DIFÍCIL
    // ======================================

    dificil: [

        {
            pregunta: "¿Qué función cumple «a María» en «Juan llamó a María»?",
            opciones: ["Complemento directo", "Sujeto", "Atributo", "Complemento circunstancial"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué función cumple «en Madrid» en «Vivo en Madrid»?",
            opciones: ["Complemento circunstancial", "Sujeto", "Complemento directo", "Atributo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de oración es «Llueve mucho»?",
            opciones: ["Impersonal", "Pasiva", "Interrogativa", "Copulativa"],
            correcta: "Impersonal"
        },

        {
            pregunta: "¿Cuál es el atributo en «Laura es inteligente»?",
            opciones: ["Laura", "es", "inteligente", "ninguna"],
            correcta: "inteligente"
        },

        {
            pregunta: "¿Qué tipo de palabra es «aunque»?",
            opciones: ["Conjunción", "Adverbio", "Pronombre", "Preposición"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Qué función cumple «con rapidez» en «Corrió con rapidez»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué función cumple «un libro» en «Compré un libro»?",
            opciones: ["Complemento directo", "Sujeto", "Atributo", "Complemento agente"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Ana está cansada»?",
            opciones: ["Copulativa", "Impersonal", "Pasiva", "Transitiva"],
            correcta: "Copulativa"
        },

        {
            pregunta: "¿Qué función cumple «por la tarde» en «Estudio por la tarde»?",
            opciones: ["Complemento circunstancial", "Sujeto", "Atributo", "Complemento directo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de palabra es «pero»?",
            opciones: ["Conjunción", "Preposición", "Adverbio", "Pronombre"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Qué función cumple «con mis amigos» en «Salí con mis amigos»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué función cumple «un regalo» en «Pedro compró un regalo»?",
            opciones: ["Complemento directo", "Complemento indirecto", "Sujeto", "Atributo"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Los niños juegan en el parque»?",
            opciones: ["Activa", "Pasiva", "Impersonal", "Copulativa"],
            correcta: "Activa"
        },

        {
            pregunta: "¿Cuál es el atributo en «El cielo está nublado»?",
            opciones: ["El cielo", "está", "nublado", "ninguna"],
            correcta: "nublado"
        },

        {
            pregunta: "¿Qué función cumple «muy rápido» en «El coche circula muy rápido»?",
            opciones: ["Complemento circunstancial", "Atributo", "Complemento directo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de oración es «Pedro parece cansado»?",
            opciones: ["Copulativa", "Pasiva", "Impersonal", "Transitiva"],
            correcta: "Copulativa"
        },

        {
            pregunta: "¿Qué función cumple «por la mañana» en «Trabajo por la mañana»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Atributo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de palabra es «sin»?",
            opciones: ["Preposición", "Conjunción", "Adverbio", "Pronombre"],
            correcta: "Preposición"
        },

        {
            pregunta: "¿Cuál es el complemento directo en «María escribió una carta»?",
            opciones: ["María", "escribió", "una carta", "ninguna"],
            correcta: "una carta"
        },

        {
            pregunta: "¿Cuál es el sujeto en «Ayer llegaron los invitados»?",
            opciones: ["Ayer", "llegaron", "los invitados", "Ayer llegaron"],
            correcta: "los invitados"
        }
    ],


    // ======================================
    // EXPERTO
    // ======================================

    experto: [

        {
            pregunta: "¿Qué función cumple «a su hermano» en «Pedro entregó el regalo a su hermano»?",
            opciones: ["Complemento indirecto", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento indirecto"
        },

        {
            pregunta: "¿Qué tipo de oración es «El libro fue escrito por Cervantes»?",
            opciones: ["Pasiva perifrástica", "Activa", "Impersonal", "Copulativa"],
            correcta: "Pasiva perifrástica"
        },

        {
            pregunta: "¿Qué función cumple «por Cervantes» en «El libro fue escrito por Cervantes»?",
            opciones: ["Complemento agente", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento agente"
        },

        {
            pregunta: "¿Qué tipo de palabra es «sin»?",
            opciones: ["Preposición", "Conjunción", "Adverbio", "Pronombre"],
            correcta: "Preposición"
        },

        {
            pregunta: "¿Qué función cumple «muy interesante» en «La película es muy interesante»?",
            opciones: ["Atributo", "Complemento directo", "Complemento agente", "Sujeto"],
            correcta: "Atributo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Se venden casas»?",
            opciones: ["Pasiva refleja", "Impersonal", "Copulativa", "Interrogativa"],
            correcta: "Pasiva refleja"
        },

        {
            pregunta: "¿Qué función cumple «a Juan» en «María vio a Juan»?",
            opciones: ["Complemento directo", "Complemento indirecto", "Sujeto", "Atributo"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué función cumple «para sus padres» en «Compró un regalo para sus padres»?",
            opciones: ["Complemento indirecto", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento indirecto"
        },

        {
            pregunta: "¿Qué tipo de oración es «Los alumnos fueron felicitados»?",
            opciones: ["Pasiva perifrástica", "Activa", "Impersonal", "Pasiva refleja"],
            correcta: "Pasiva perifrástica"
        },

        {
            pregunta: "¿Qué función cumple «muy rápido» en «El coche circula muy rápido»?",
            opciones: ["Complemento circunstancial", "Atributo", "Complemento directo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué función cumple «a los alumnos» en «La profesora explicó el ejercicio a los alumnos»?",
            opciones: ["Complemento indirecto", "Complemento directo", "Complemento agente", "Atributo"],
            correcta: "Complemento indirecto"
        },

        {
            pregunta: "¿Qué función cumple «el ejercicio» en «La profesora explicó el ejercicio a los alumnos»?",
            opciones: ["Complemento directo", "Complemento indirecto", "Sujeto", "Atributo"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Se alquilan apartamentos»?",
            opciones: ["Pasiva refleja", "Impersonal", "Copulativa", "Pasiva perifrástica"],
            correcta: "Pasiva refleja"
        },

        {
            pregunta: "¿Qué tipo de oración es «Hay muchos libros en la biblioteca»?",
            opciones: ["Impersonal", "Pasiva refleja", "Copulativa", "Activa personal"],
            correcta: "Impersonal"
        },

        {
            pregunta: "¿Cuál es el complemento agente en «La novela fue publicada por la editorial»?",
            opciones: ["La novela", "fue publicada", "por la editorial", "ninguna"],
            correcta: "por la editorial"
        },

        {
            pregunta: "¿Qué función cumple «de madera» en «La mesa es de madera»?",
            opciones: ["Atributo", "Complemento directo", "Complemento agente", "Sujeto"],
            correcta: "Atributo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Los alumnos han terminado el examen»?",
            opciones: ["Activa", "Pasiva refleja", "Impersonal", "Copulativa"],
            correcta: "Activa"
        },

        {
            pregunta: "¿Qué función cumple «con mucha atención» en «Escuchó al profesor con mucha atención»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Atributo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Cuál es el sujeto en «A los alumnos les gustan las matemáticas»?",
            opciones: ["A los alumnos", "les", "gustan", "las matemáticas"],
            correcta: "las matemáticas"
        },

        {
            pregunta: "¿Qué tipo de oración es «María se peina»?",
            opciones: ["Reflexiva", "Pasiva refleja", "Impersonal", "Copulativa"],
            correcta: "Reflexiva"
        }
    ]
};


// ==========================================
// INICIAR LENGUA
// ==========================================

function iniciarJuegoLengua(tema, nivel) {

    if (!niveles[nivel]) {
        console.error(
            "Nivel de Lengua no válido:",
            nivel
        );

        return;
    }

    const contenedor =
        document.getElementById(
            "juegoLengua"
        );

    if (!contenedor) {
        console.error(
            "No existe #juegoLengua"
        );

        return;
    }


    // ======================================
    // SELECCIONAR BANCO
    // ======================================

    let banco;

    if (tema === "ortografia") {

        banco =
            preguntasOrtografia[nivel];
    }

    else if (tema === "gramatica") {

        banco =
            preguntasGramatica[nivel];
    }

    else {

        console.error(
            "Tema de Lengua no válido:",
            tema
        );

        return;
    }


    // ======================================
    // AQUÍ ESTÁ LA CORRECCIÓN IMPORTANTE
    //
    // NO SE USAN SIEMPRE LAS MISMAS 10.
    //
    // Tenemos un banco de 20-25 preguntas
    // y elegimos 10 diferentes al azar.
    // ======================================

    const preguntasPartida =
        seleccionarAleatorios(
            banco,
            10
        );


    juegoLengua = {

        tema: tema,

        nivel: nivel,

        pregunta: 0,

        aciertos: 0,

        total: preguntasPartida.length,

        bloqueado: false,

        preguntas: preguntasPartida
    };


    mostrarPreguntaLengua();


    setTimeout(() => {

        contenedor.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);
}


// ==========================================
// MOSTRAR LENGUA
// ==========================================

function mostrarPreguntaLengua() {

    if (!juegoLengua) return;


    if (
        juegoLengua.pregunta >=
        juegoLengua.total
    ) {

        mostrarResultadoFinalLengua();

        return;
    }


    const pregunta =
        juegoLengua.preguntas[
            juegoLengua.pregunta
        ];


    if (!pregunta) {

        console.error(
            "No existe la pregunta solicitada."
        );

        return;
    }


    const contenedor =
        document.getElementById(
            "juegoLengua"
        );


    if (!contenedor) return;


    juegoLengua.bloqueado = false;


    const nombreTema =
        juegoLengua.tema === "ortografia"
            ? "✏️ Ortografía"
            : "🧩 Gramática";


    contenedor.innerHTML = `

        <div
            class="tarjeta"
            style="
                text-align:center;
                padding:clamp(25px,5vw,45px);
            "
        >

            <p
                style="
                    color:#667085;
                    font-weight:700;
                    margin-bottom:10px;
                "
            >
                Pregunta
                ${juegoLengua.pregunta + 1}
                de
                ${juegoLengua.total}
            </p>


            <div
                style="
                    font-weight:800;
                    margin-bottom:10px;
                "
            >
                ${niveles[juegoLengua.nivel].color}
                ${niveles[juegoLengua.nivel].nombre}
                ·
                ${nombreTema}
            </div>


            <h2
                style="
                    font-size:clamp(1.4rem,4vw,2rem);
                    margin:25px 0;
                "
            >
                ${pregunta.pregunta}
            </h2>


            <div
                id="respuestasLengua"
                style="
                    display:grid;
                    grid-template-columns:repeat(2,1fr);
                    gap:12px;
                    max-width:700px;
                    margin:auto;
                "
            ></div>


            <p
                id="resultadoLengua"
                style="
                    font-weight:800;
                    min-height:28px;
                    margin-top:20px;
                "
            ></p>

        </div>
    `;


    // ======================================
    // LAS RESPUESTAS CAMBIAN DE POSICIÓN
    // EN CADA PREGUNTA
    // ======================================

    const respuestas =
        mezclarArray(
            pregunta.opciones
        );


    const zona =
        document.getElementById(
            "respuestasLengua"
        );


    if (!zona) return;


    respuestas.forEach(
        opcion => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.textContent =
                opcion;


            boton.className =
                "respuesta";


            boton.style.minHeight =
                "58px";


            boton.style.border =
                "1px solid #e4e7ec";


            boton.style.borderRadius =
                "15px";


            boton.style.background =
                "#ffffff";


            boton.style.font =
                "inherit";


            boton.style.fontWeight =
                "800";


            boton.style.fontSize =
                "1rem";


            boton.style.cursor =
                "pointer";


            boton.style.padding =
                "12px";


            boton.addEventListener(
                "click",
                () => {

                    comprobarRespuestaLengua(
                        opcion,
                        pregunta.correcta
                    );

                }
            );


            zona.appendChild(
                boton
            );
        }
    );
}


// ==========================================
// COMPROBAR LENGUA
// ==========================================

function comprobarRespuestaLengua(
    respuestaUsuario,
    respuestaCorrecta
) {

    if (!juegoLengua) return;

    if (juegoLengua.bloqueado) return;


    juegoLengua.bloqueado = true;


    const botones =
        document.querySelectorAll(
            "#respuestasLengua .respuesta"
        );


    botones.forEach(
        boton => {

            boton.disabled = true;


            if (
                boton.textContent ===
                respuestaCorrecta
            ) {

                boton.style.background =
                    "#10b981";

                boton.style.color =
                    "white";
            }


            if (
                boton.textContent ===
                respuestaUsuario &&
                respuestaUsuario !==
                respuestaCorrecta
            ) {

                boton.style.background =
                    "#ef4444";

                boton.style.color =
                    "white";
            }
        }
    );


    const resultado =
        document.getElementById(
            "resultadoLengua"
        );


    if (!resultado) return;


    if (
        respuestaUsuario ===
        respuestaCorrecta
    ) {

        juegoLengua.aciertos++;


        resultado.textContent =
            "✅ ¡Correcto!";


        resultado.style.color =
            "#10b981";
    }

    else {

        resultado.textContent =
            `❌ Incorrecto. La respuesta era: ${respuestaCorrecta}`;


        resultado.style.color =
            "#ef4444";
    }


    juegoLengua.pregunta++;


    setTimeout(
        () => {

            mostrarPreguntaLengua();

        },
        900
    );
}


// ==========================================
// RESULTADO FINAL LENGUA
// ==========================================

function mostrarResultadoFinalLengua() {

    if (!juegoLengua) return;


    const porcentaje =
        Math.round(
            (
                juegoLengua.aciertos /
                juegoLengua.total
            ) * 100
        );


    let mensaje;


    if (porcentaje === 100) {

        mensaje =
            "🏆 ¡Perfecto!";
    }

    else if (porcentaje >= 80) {

        mensaje =
            "🔥 ¡Excelente trabajo!";
    }

    else if (porcentaje >= 60) {

        mensaje =
            "👏 ¡Muy bien!";
    }

    else if (porcentaje >= 40) {

        mensaje =
            "💪 ¡Sigue practicando!";
    }

    else {

        mensaje =
            "📚 ¡Vamos a mejorar!";
    }


    const contenedor =
        document.getElementById(
            "juegoLengua"
        );


    if (!contenedor) return;


    const tema =
        juegoLengua.tema;

    const nivel =
        juegoLengua.nivel;


    contenedor.innerHTML = `

        <div
            class="resultado-final"
            style="
                text-align:center;
                padding:40px 20px;
            "
        >

            <div
                style="
                    font-size:4rem;
                "
            >
                ${porcentaje >= 80 ? "🏆" : "🎯"}
            </div>


            <h2>
                ${mensaje}
            </h2>


            <p>
                Has conseguido
                <strong>
                    ${juegoLengua.aciertos}
                </strong>
                de
                <strong>
                    ${juegoLengua.total}
                </strong>
                respuestas correctas.
            </p>


            <div
                class="resultado-porcentaje"
            >
                ${porcentaje}%
            </div>


            <button
                type="button"
                class="boton-principal"
                onclick="
                    iniciarJuegoLengua(
                        '${tema}',
                        '${nivel}'
                    )
                "
            >
                🔄 Volver a jugar
            </button>

        </div>
    `;


    contenedor.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// MENSAJE ANTIGUO
// ==========================================

function mostrarMensaje(tema) {

    alert(
        "🚀 " +
        tema +
        " estará disponible próximamente en Educonew."
    );
}
