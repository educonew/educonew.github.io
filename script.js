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

        const j =
            Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] =
            [copia[j], copia[i]];
    }

    return copia;
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
// ZONA MATEMÁTICAS
// ==========================================

function prepararZonaJuego() {

    const contenedor =
        document.getElementById(
            "juegoMatematicas"
        );

    if (!contenedor) {
        console.error(
            "No existe #juegoMatematicas"
        );
        return;
    }

    contenedor.innerHTML = `

        <div
            class="tarjeta"
            style="text-align:center;"
        >

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
// GENERADOR MATEMÁTICAS
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

            } else if (nivel === "medio") {

                a = numeroAleatorio(10, 100);
                b = numeroAleatorio(10, 100);

            } else if (nivel === "dificil") {

                a = numeroAleatorio(100, 999);
                b = numeroAleatorio(100, 999);

            } else {

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

            } else if (nivel === "medio") {

                a = numeroAleatorio(30, 150);

            } else if (nivel === "dificil") {

                a = numeroAleatorio(100, 999);

            } else {

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

            } else if (nivel === "medio") {

                a = numeroAleatorio(2, 20);
                b = numeroAleatorio(2, 12);

            } else if (nivel === "dificil") {

                a = numeroAleatorio(10, 50);
                b = numeroAleatorio(10, 30);

            } else {

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

                respuesta =
                    numeroAleatorio(1, 10);

            } else if (nivel === "medio") {

                b = numeroAleatorio(2, 12);

                respuesta =
                    numeroAleatorio(2, 20);

            } else if (nivel === "dificil") {

                b = numeroAleatorio(5, 30);

                respuesta =
                    numeroAleatorio(5, 50);

            } else {

                b = numeroAleatorio(10, 100);

                respuesta =
                    numeroAleatorio(10, 100);
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

                denominador =
                    numeroAleatorio(2, 6);

            } else if (nivel === "medio") {

                denominador =
                    numeroAleatorio(3, 10);

            } else if (nivel === "dificil") {

                denominador =
                    numeroAleatorio(5, 20);

            } else {

                denominador =
                    numeroAleatorio(10, 50);
            }


            numerador =
                numeroAleatorio(
                    1,
                    denominador - 1
                );


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

            } else if (nivel === "medio") {

                porcentaje =
                    numeroAleatorio(1, 9) * 10;

                cantidad =
                    numeroAleatorio(1, 20) * 10;

            } else if (nivel === "dificil") {

                porcentaje =
                    numeroAleatorio(5, 95);

                cantidad =
                    numeroAleatorio(2, 20) * 10;

            } else {

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

            } else if (nivel === "medio") {

                base = numeroAleatorio(5, 20);
                altura = numeroAleatorio(5, 20);

            } else if (nivel === "dificil") {

                base = numeroAleatorio(10, 50);
                altura = numeroAleatorio(10, 50);

            } else {

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

                precio =
                    numeroAleatorio(2, 20);

                cantidad =
                    numeroAleatorio(2, 10);

            } else if (nivel === "medio") {

                precio =
                    numeroAleatorio(10, 50);

                cantidad =
                    numeroAleatorio(2, 15);

            } else if (nivel === "dificil") {

                precio =
                    numeroAleatorio(20, 100);

                cantidad =
                    numeroAleatorio(5, 20);

            } else {

                precio =
                    numeroAleatorio(50, 200);

                cantidad =
                    numeroAleatorio(10, 30);
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

            falsa =
                correcta + diferencia;

        } else {

            falsa =
                correcta - diferencia;
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

    } else {

        respuestas =
            [pregunta.respuesta];


        while (respuestas.length < 4) {

            const falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;


            if (
                !respuestas.includes(falsa)
            ) {

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

    } else {

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
// RESULTADO FINAL MATEMÁTICAS
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

    } else if (porcentaje >= 80) {

        mensaje = "🔥 ¡Excelente trabajo!";

    } else if (porcentaje >= 60) {

        mensaje = "👏 ¡Muy bien!";

    } else if (porcentaje >= 40) {

        mensaje = "💪 ¡Sigue practicando!";

    } else {

        mensaje = "📚 ¡Vamos a mejorar!";
    }


    const contenedor =
        document.getElementById(
            "juegoMatematicas"
        );


    if (!contenedor) return;


    contenedor.innerHTML = `

        <div
            class="resultado-final"
            style="text-align:center;"
        >

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
            opciones: ["casa", "cassa", "kasa", "caza"],
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
            opciones: ["escuela", "escuella", "esk uela", "escueIa"],
            correcta: "escuela"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["amigo", "amijo", "amígo", "hamigo"],
            correcta: "amigo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["familia", "fhamilia", "famillia", "família"],
            correcta: "familia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["pelota", "pellota", "pelotta", "pelotta"],
            correcta: "pelota"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["cuchara", "cucharra", "kuchara", "cuchára"],
            correcta: "cuchara"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["helado", "elado", "helhado", "elado"],
            correcta: "helado"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["hospital", "ospital", "hosspital", "hospital"],
            correcta: "hospital"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["jueves", "juebes", "gueves", "jueves"],
            correcta: "jueves"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["zapatería", "sapatería", "zapateria", "zapattería"],
            correcta: "zapatería"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["teléfono", "telefono", "teléfonno", "telephono"],
            correcta: "teléfono"
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
            opciones: ["ocurrir", "ocurir", "okurrir", "ocurrír"],
            correcta: "ocurrir"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["privilegio", "pribilegio", "privilejio", "privillegio"],
            correcta: "privilegio"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vegetación", "begetación", "vegetazión", "vejetación"],
            correcta: "vegetación"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["conseguir", "consegir", "consequir", "conseguír"],
            correcta: "conseguir"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["exigente", "exijente", "ecsijente", "exigiénte"],
            correcta: "exigente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["prohibido", "proivido", "prohibído", "proibido"],
            correcta: "prohibido"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["ahora", "aora", "haora", "ahorra"],
            correcta: "ahora"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraño", "estraño", "extrano", "estrañó"],
            correcta: "extraño"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["hervir", "ervir", "herbir", "hervír"],
            correcta: "hervir"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["maravilloso", "marabilloso", "maraviyoso", "maravillóso"],
            correcta: "maravilloso"
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
            opciones: ["adolescente", "adoleszente", "adolescente", "adolesente"],
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
            opciones: ["inmediatamente", "inmediataménte", "inmediatemente", "inmediatamente"],
            correcta: "inmediatamente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["beneficioso", "veneficioso", "benefisioso", "beneficióso"],
            correcta: "beneficioso"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["desarrollo", "desarollo", "desarrollo", "desarroyo"],
            correcta: "desarrollo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["consciencia", "conciencia", "conziencia", "consiencia"],
            correcta: "consciencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["circunstancia", "circunstáncia", "circumstancia", "circunstansia"],
            correcta: "circunstancia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["responsabilidad", "responsavilidad", "responsabílidad", "responsabilidaz"],
            correcta: "responsabilidad"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["presupuesto", "presupesto", "presupuessto", "presupuexto"],
            correcta: "presupuesto"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["descripción", "descrición", "descripsión", "descripcion"],
            correcta: "descripción"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["investigación", "investigazión", "inbestigación", "investigacion"],
            correcta: "investigación"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["consecuencia", "consecuéncia", "consekuencia", "consequencia"],
            correcta: "consecuencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["adquisición", "adquisición", "adquisiciónn", "adquisizión"],
            correcta: "adquisición"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["espectáculo", "espectaculo", "expectáculo", "espectacúlo"],
            correcta: "espectáculo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["reivindicar", "reinvindicar", "reivindícar", "reivindik ar"],
            correcta: "reivindicar"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraordinariamente", "estraordinariamente", "extraordinaríamente", "extraordinariaménte"],
            correcta: "extraordinariamente"
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
            opciones: ["heterogéneo", "heterogeneo", "heterojéneo", "heterogéneo"],
            correcta: "heterogéneo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["jurisprudencia", "jurisprudéncia", "jurisprudenccia", "jurisprude ncia"],
            correcta: "jurisprudencia"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inconmensurable", "inconmensuravle", "inconmensuráble", "incomensurable"],
            correcta: "inconmensurable"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["desahucio", "deshaucio", "desaucio", "desahuzio"],
            correcta: "desahucio"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["exhaustivo", "exahustivo", "exaustivo", "exhaustibo"],
            correcta: "exhaustivo"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["idiosincrásico", "idiosincrácico", "idiosincrasico", "idiosincrásiko"],
            correcta: "idiosincrásico"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["paradójico", "paradojico", "paradogico", "paradóxico"],
            correcta: "paradójico"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["inherente", "inerente", "injerente", "inherénte"],
            correcta: "inherente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["efervescente", "efervesente", "efervecente", "efervescénte"],
            correcta: "efervescente"
        },

        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["omnisciente", "omnisziente", "omniscente", "omnizciente"],
            correcta: "omnisciente"
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
            pregunta: "¿Qué tipo de palabra es «alto»?",
            opciones: ["Adjetivo", "Verbo", "Adverbio", "Pronombre"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «mesa»?",
            opciones: ["Sustantivo", "Verbo", "Adverbio", "Adjetivo"],
            correcta: "Sustantivo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «cantar»?",
            opciones: ["Verbo", "Sustantivo", "Adjetivo", "Artículo"],
            correcta: "Verbo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «muy»?",
            opciones: ["Adverbio", "Verbo", "Sustantivo", "Adjetivo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Cuál es el verbo en «El niño juega»?",
            opciones: ["El", "niño", "juega", "ninguna"],
            correcta: "juega"
        },

        {
            pregunta: "¿Cuál es el sustantivo en «La casa grande»?",
            opciones: ["La", "casa", "grande", "ninguna"],
            correcta: "casa"
        },

        {
            pregunta: "¿Qué tipo de palabra es «ellos»?",
            opciones: ["Pronombre", "Verbo", "Adjetivo", "Sustantivo"],
            correcta: "Pronombre"
        },

        {
            pregunta: "¿Qué tipo de palabra es «feliz»?",
            opciones: ["Adjetivo", "Verbo", "Pronombre", "Adverbio"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Cuál es el verbo en «Ana lee un libro»?",
            opciones: ["Ana", "lee", "libro", "un"],
            correcta: "lee"
        },

        {
            pregunta: "¿Cuál es el sustantivo en «El coche rojo»?",
            opciones: ["El", "coche", "rojo", "ninguna"],
            correcta: "coche"
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
            pregunta: "¿Cuál es el sujeto en «Los niños juegan en el parque»?",
            opciones: ["Los niños", "juegan", "en el parque", "parque"],
            correcta: "Los niños"
        },

        {
            pregunta: "¿Cuál es el predicado en «La profesora explica la lección»?",
            opciones: ["La profesora", "explica la lección", "profesora", "la lección"],
            correcta: "explica la lección"
        },

        {
            pregunta: "¿Qué tipo de palabra es «dos» en «dos casas»?",
            opciones: ["Determinante numeral", "Adjetivo", "Verbo", "Adverbio"],
            correcta: "Determinante numeral"
        },

        {
            pregunta: "¿Qué tipo de palabra es «mañana» en «Mañana iremos al cine»?",
            opciones: ["Adverbio", "Sustantivo", "Adjetivo", "Verbo"],
            correcta: "Adverbio"
        },

        {
            pregunta: "¿Cuál es el sujeto en «Mis amigos vienen mañana»?",
            opciones: ["Mis amigos", "vienen", "mañana", "amigos vienen"],
            correcta: "Mis amigos"
        },

        {
            pregunta: "¿Cuál es el predicado en «Pedro compró un libro»?",
            opciones: ["Pedro", "compró un libro", "un libro", "compró"],
            correcta: "compró un libro"
        },

        {
            pregunta: "¿Qué tipo de palabra es «aquellos»?",
            opciones: ["Determinante demostrativo", "Verbo", "Adverbio", "Conjunción"],
            correcta: "Determinante demostrativo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «rápido» en «El coche es rápido»?",
            opciones: ["Adjetivo", "Adverbio", "Verbo", "Sustantivo"],
            correcta: "Adjetivo"
        },

        {
            pregunta: "¿Cuál es el verbo en «Los pájaros vuelan alto»?",
            opciones: ["pájaros", "vuelan", "alto", "los"],
            correcta: "vuelan"
        },

        {
            pregunta: "¿Qué tipo de palabra es «yo»?",
            opciones: ["Pronombre personal", "Sustantivo", "Adjetivo", "Verbo"],
            correcta: "Pronombre personal"
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
            pregunta: "¿Qué función cumple «en el parque» en «Los niños juegan en el parque»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Cuál es el atributo en «El cielo está oscuro»?",
            opciones: ["El cielo", "está", "oscuro", "ninguna"],
            correcta: "oscuro"
        },

        {
            pregunta: "¿Qué función cumple «un regalo» en «Compré un regalo»?",
            opciones: ["Complemento directo", "Complemento indirecto", "Atributo", "Sujeto"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Hay muchos alumnos»?",
            opciones: ["Impersonal", "Pasiva", "Copulativa", "Interrogativa"],
            correcta: "Impersonal"
        },

        {
            pregunta: "¿Qué función cumple «con mi hermano» en «Fui al cine con mi hermano»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de palabra es «porque»?",
            opciones: ["Conjunción", "Preposición", "Pronombre", "Adjetivo"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Cuál es el complemento directo en «María compró flores»?",
            opciones: ["María", "compró", "flores", "ninguna"],
            correcta: "flores"
        },

        {
            pregunta: "¿Qué función cumple «muy rápido» en «El coche corre muy rápido»?",
            opciones: ["Complemento circunstancial", "Atributo", "Complemento directo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de oración es «Mi padre parece cansado»?",
            opciones: ["Copulativa", "Impersonal", "Pasiva", "Interrogativa"],
            correcta: "Copulativa"
        },

        {
            pregunta: "¿Qué función cumple «para el examen» en «Estudio para el examen»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            correcta: "Complemento circunstancial"
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
            pregunta: "¿Qué función cumple «a los alumnos» en «El profesor explicó la lección a los alumnos»?",
            opciones: ["Complemento indirecto", "Complemento directo", "Complemento agente", "Atributo"],
            correcta: "Complemento indirecto"
        },

        {
            pregunta: "¿Qué función cumple «la lección» en «El profesor explicó la lección a los alumnos»?",
            opciones: ["Complemento directo", "Complemento indirecto", "Sujeto", "Atributo"],
            correcta: "Complemento directo"
        },

        {
            pregunta: "¿Qué tipo de oración es «Se alquilan pisos»?",
            opciones: ["Pasiva refleja", "Impersonal", "Copulativa", "Pasiva perifrástica"],
            correcta: "Pasiva refleja"
        },

        {
            pregunta: "¿Qué función cumple «por miedo» en «No salió por miedo»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Atributo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de oración es «Juan fue elegido delegado»?",
            opciones: ["Pasiva perifrástica", "Activa", "Impersonal", "Copulativa"],
            correcta: "Pasiva perifrástica"
        },

        {
            pregunta: "¿Qué función cumple «delegado» en «Juan fue elegido delegado»?",
            opciones: ["Complemento predicativo", "Complemento directo", "Complemento indirecto", "Sujeto"],
            correcta: "Complemento predicativo"
        },

        {
            pregunta: "¿Qué tipo de palabra es «aunque»?",
            opciones: ["Conjunción", "Preposición", "Pronombre", "Adverbio"],
            correcta: "Conjunción"
        },

        {
            pregunta: "¿Qué función cumple «con mucha atención» en «Escuchó con mucha atención»?",
            opciones: ["Complemento circunstancial", "Complemento directo", "Atributo", "Sujeto"],
            correcta: "Complemento circunstancial"
        },

        {
            pregunta: "¿Qué tipo de oración es «Es necesario estudiar»?",
            opciones: ["Impersonal", "Pasiva refleja", "Activa", "Interrogativa"],
            correcta: "Impersonal"
        },

        {
            pregunta: "¿Qué función cumple «por sus compañeros» en «Fue ayudado por sus compañeros»?",
            opciones: ["Complemento agente", "Complemento directo", "Complemento indirecto", "Atributo"],
            correcta: "Complemento agente"
        }

    ]

};


// ==========================================
// ==========================================
// SISTEMA NUEVO DE LENGUA
// ==========================================
// ==========================================


// Esta función crea una partida nueva.
// IMPORTANTE:
// Si hay 20 preguntas disponibles,
// solamente se eligen 10.
// Por eso las partidas cambian.
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


    let banco;


    if (tema === "ortografia") {

        banco =
            preguntasOrtografia[nivel];

    } else if (tema === "gramatica") {

        banco =
            preguntasGramatica[nivel];

    } else {

        console.error(
            "Tema de Lengua no válido:",
            tema
        );

        return;
    }


    if (
        !Array.isArray(banco) ||
        banco.length === 0
    ) {

        console.error(
            "No hay preguntas disponibles."
        );

        return;
    }


    // ======================================
    // BARAJAMOS TODO EL BANCO
    // ======================================

    const bancoMezclado =
        mezclarArray(banco);


    // ======================================
    // COGEMOS SOLO 10
    // ======================================

    const preguntasPartida =
        bancoMezclado.slice(
            0,
            Math.min(10, bancoMezclado.length)
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


    setTimeout(
        () => {

            contenedor.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        50
    );
}


// ==========================================
// MOSTRAR PREGUNTA LENGUA
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
    // MEZCLAR RESPUESTAS
    // ======================================

    const respuestas =
        mezclarArray(
            pregunta.opciones
        );


    const zona =
        document.getElementById(
            "respuestasLengua"
        );


    respuestas.forEach(
        opcion => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type = "button";


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

    } else {

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

    } else if (porcentaje >= 80) {

        mensaje =
            "🔥 ¡Excelente trabajo!";

    } else if (porcentaje >= 60) {

        mensaje =
            "👏 ¡Muy bien!";

    } else if (porcentaje >= 40) {

        mensaje =
            "💪 ¡Sigue practicando!";

    } else {

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
