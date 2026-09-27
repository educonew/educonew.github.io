// ==========================================
// EDUCONEW — MOTOR COMPLETO DE EJERCICIOS
// MATEMÁTICAS + LENGUA
// ==========================================


// ==========================================
// UTILIDADES
// ==========================================

function numeroAleatorio(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


// ==========================================
// NIVELES
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
// VARIABLES MATEMÁTICAS
// ==========================================

let juegoActual = null;


// ==========================================
// MATEMÁTICAS
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
// PREPARAR JUEGO MATEMÁTICAS
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
// GENERAR PREGUNTA MATEMÁTICA
// ==========================================

function generarPregunta(tema, nivel) {

    let a;
    let b;
    let respuesta;
    let simbolo;


    switch (tema) {


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



        case "fracciones": {

            let denominador;

            let numerador;


            if (nivel === "facil") {

                denominador =
                    numeroAleatorio(2, 6);

            }

            else if (nivel === "medio") {

                denominador =
                    numeroAleatorio(3, 10);

            }

            else if (nivel === "dificil") {

                denominador =
                    numeroAleatorio(5, 20);

            }

            else {

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



        case "geometria": {

            let base;

            let altura;


            if (nivel === "facil") {

                base =
                    numeroAleatorio(2, 10);

                altura =
                    numeroAleatorio(2, 10);

            }

            else if (nivel === "medio") {

                base =
                    numeroAleatorio(5, 20);

                altura =
                    numeroAleatorio(5, 20);

            }

            else if (nivel === "dificil") {

                base =
                    numeroAleatorio(10, 50);

                altura =
                    numeroAleatorio(10, 50);

            }

            else {

                base =
                    numeroAleatorio(20, 100);

                altura =
                    numeroAleatorio(20, 100);

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



        case "problemas": {

            let precio =
                numeroAleatorio(2, 20);

            let cantidad =
                numeroAleatorio(2, 10);


            if (nivel === "medio") {

                precio =
                    numeroAleatorio(10, 50);

                cantidad =
                    numeroAleatorio(2, 15);

            }


            if (nivel === "dificil") {

                precio =
                    numeroAleatorio(20, 100);

                cantidad =
                    numeroAleatorio(5, 20);

            }


            if (nivel === "experto") {

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


        let diferencia =
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

        }

        else {

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

        let falsa =
            correcta + respuestas.length;


        if (!respuestas.includes(falsa)) {

            respuestas.push(falsa);

        }

    }


    return respuestas.sort(
        () => Math.random() - 0.5
    );

}


// ==========================================
// MOSTRAR PREGUNTA MATEMÁTICA
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
        typeof pregunta.respuesta === "number"
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

            let falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;


            if (
                !respuestas.includes(falsa)
            ) {

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


    if (juegoActual.bloqueado)
        return;


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
// COMPATIBILIDAD MATEMÁTICAS
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
// MENSAJES MATEMÁTICAS
// ==========================================

function mostrarMensaje(tema) {

    alert(
        "🚀 " +
        tema +
        " estará disponible próximamente en Educonew."
    );

}


// ==================================================
// ==================================================
// LENGUA
// ==================================================
// ==================================================


// ==========================================
// VARIABLES LENGUA
// ==========================================

let juegoLenguaActual = null;


// ==========================================
// INICIAR LENGUA
// ==========================================

function iniciarJuegoLengua(
    actividad,
    nivel
) {

    if (!niveles[nivel]) {

        console.error(
            "Nivel de Lengua no válido:",
            nivel
        );

        return;

    }


    juegoLenguaActual = {

        actividad: actividad,

        nivel: nivel,

        pregunta: 0,

        aciertos: 0,

        total: 10,

        bloqueado: false

    };


    prepararZonaLengua();

    mostrarPreguntaLengua();

}


// ==========================================
// PREPARAR ZONA LENGUA
// ==========================================

function prepararZonaLengua() {

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


    contenedor.innerHTML = `

        <div
            class="tarjeta"
            style="
                text-align:center;
                padding:35px 25px;
            "
        >

            <p
                id="progresoLengua"
                style="
                    color:#667085;
                    font-weight:700;
                    margin-bottom:10px;
                "
            ></p>


            <div
                id="nivelLengua"
                style="
                    font-weight:800;
                    margin-bottom:10px;
                "
            ></div>


            <div
                id="tipoLengua"
                style="
                    color:#667085;
                    font-weight:700;
                    margin-bottom:10px;
                "
            ></div>


            <h2
                id="preguntaLengua"
                style="
                    font-size:1.8rem;
                    margin:25px 0;
                "
            ></h2>


            <div
                id="respuestasLengua"
                style="
                    display:grid;
                    grid-template-columns:repeat(2,1fr);
                    gap:12px;
                    max-width:650px;
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

}


// ==========================================
// GENERAR PREGUNTA LENGUA
// ==========================================

function generarPreguntaLengua(
    actividad,
    nivel
) {


    // ======================================
    // ORTOGRAFÍA
    // ======================================

    if (actividad === "ortografia") {

        const preguntas = {


            facil: [

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "casa",
                        "caza",
                        "cassa",
                        "kasa"
                    ],
                    respuesta: "casa"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "árbol",
                        "arbol",
                        "árvol",
                        "arbolh"
                    ],
                    respuesta: "árbol"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "huevo",
                        "uevo",
                        "huebo",
                        "uebo"
                    ],
                    respuesta: "huevo"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "zapato",
                        "sapato",
                        "zapato",
                        "çapato"
                    ],
                    respuesta: "zapato"
                }

            ],


            medio: [

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "habitación",
                        "avitación",
                        "habitazión",
                        "abitación"
                    ],
                    respuesta: "habitación"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "decisión",
                        "desición",
                        "decizión",
                        "desizión"
                    ],
                    respuesta: "decisión"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "examen",
                        "ecsamen",
                        "esamen",
                        "exámen"
                    ],
                    respuesta: "examen"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "vergüenza",
                        "verguenza",
                        "bergüenza",
                        "vergüensa"
                    ],
                    respuesta: "vergüenza"
                }

            ],


            dificil: [

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "extraordinario",
                        "estraordinario",
                        "extrahordinario",
                        "estraordinarío"
                    ],
                    respuesta: "extraordinario"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "beneficio",
                        "veneficio",
                        "benefizio",
                        "venefizio"
                    ],
                    respuesta: "beneficio"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "construcción",
                        "construción",
                        "construcción",
                        "construcsión"
                    ],
                    respuesta: "construcción"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "responsabilidad",
                        "responsavilidad",
                        "responzabilidad",
                        "responsabilidád"
                    ],
                    respuesta: "responsabilidad"
                }

            ],


            experto: [

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "inmediatamente",
                        "inmediatamiente",
                        "inmediatamente",
                        "inmediatamenthe"
                    ],
                    respuesta: "inmediatamente"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "subvención",
                        "subbención",
                        "subvenzión",
                        "suvención"
                    ],
                    respuesta: "subvención"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "idiosincrasia",
                        "idiosincracia",
                        "idiosincracia",
                        "idiosincrásia"
                    ],
                    respuesta: "idiosincrasia"
                },

                {
                    texto: "¿Cuál está escrita correctamente?",
                    opciones: [
                        "paradójico",
                        "paradojíco",
                        "paradogico",
                        "paradójíco"
                    ],
                    respuesta: "paradójico"
                }

            ]

        };


        return
            preguntas[nivel][
                numeroAleatorio(
                    0,
                    preguntas[nivel].length - 1
                )
            ];

    }



    // ======================================
    // GRAMÁTICA
    // ======================================

    if (actividad === "gramatica") {

        const preguntas = {


            facil: [

                {
                    texto:
                        "¿Qué tipo de palabra es «casa»?",

                    opciones: [
                        "Sustantivo",
                        "Verbo",
                        "Adjetivo",
                        "Adverbio"
                    ],

                    respuesta:
                        "Sustantivo"
                },


                {
                    texto:
                        "¿Qué tipo de palabra es «correr»?",

                    opciones: [
                        "Verbo",
                        "Sustantivo",
                        "Adjetivo",
                        "Artículo"
                    ],

                    respuesta:
                        "Verbo"
                },


                {
                    texto:
                        "¿Qué tipo de palabra es «azul»?",

                    opciones: [
                        "Adjetivo",
                        "Verbo",
                        "Sustantivo",
                        "Pronombre"
                    ],

                    respuesta:
                        "Adjetivo"
                },


                {
                    texto:
                        "¿Qué tipo de palabra es «rápidamente»?",

                    opciones: [
                        "Adverbio",
                        "Verbo",
                        "Sustantivo",
                        "Artículo"
                    ],

                    respuesta:
                        "Adverbio"
                }

            ],


            medio: [

                {
                    texto:
                        "En «El perro corre», ¿cuál es el verbo?",

                    opciones: [
                        "El",
                        "perro",
                        "corre",
                        "El perro"
                    ],

                    respuesta:
                        "corre"
                },


                {
                    texto:
                        "En «La casa grande», ¿cuál es el adjetivo?",

                    opciones: [
                        "La",
                        "casa",
                        "grande",
                        "La casa"
                    ],

                    respuesta:
                        "grande"
                },


                {
                    texto:
                        "En «María compró pan», ¿cuál es el sujeto?",

                    opciones: [
                        "María",
                        "compró",
                        "pan",
                        "compró pan"
                    ],

                    respuesta:
                        "María"
                },


                {
                    texto:
                        "En «Los niños juegan», ¿cuál es el sujeto?",

                    opciones: [
                        "Los niños",
                        "juegan",
                        "Los",
                        "niños juegan"
                    ],

                    respuesta:
                        "Los niños"
                }

            ],


            dificil: [

                {
                    texto:
                        "En «El alumno estudia mucho», ¿cuál es el predicado?",

                    opciones: [
                        "El alumno",
                        "estudia mucho",
                        "El",
                        "mucho"
                    ],

                    respuesta:
                        "estudia mucho"
                },


                {
                    texto:
                        "En «Mi hermana compró un libro», ¿cuál es el complemento directo?",

                    opciones: [
                        "Mi hermana",
                        "compró",
                        "un libro",
                        "Mi"
                    ],

                    respuesta:
                        "un libro"
                },


                {
                    texto:
                        "¿Cuál de estas palabras es un pronombre?",

                    opciones: [
                        "nosotros",
                        "mesa",
                        "correr",
                        "bonito"
                    ],

                    respuesta:
                        "nosotros"
                },


                {
                    texto:
                        "¿Cuál de estas palabras es una conjunción?",

                    opciones: [
                        "y",
                        "casa",
                        "rápido",
                        "ellos"
                    ],

                    respuesta:
                        "y"
                }

            ],


            experto: [

                {
                    texto:
                        "En «Juan entregó el trabajo a su profesor», ¿qué es «a su profesor»?",

                    opciones: [
                        "Complemento indirecto",
                        "Sujeto",
                        "Complemento directo",
                        "Atributo"
                    ],

                    respuesta:
                        "Complemento indirecto"
                },


                {
                    texto:
                        "En «Laura encontró las llaves», ¿qué función cumple «las llaves»?",

                    opciones: [
                        "Complemento directo",
                        "Complemento indirecto",
                        "Sujeto",
                        "Atributo"
                    ],

                    respuesta:
                        "Complemento directo"
                },


                {
                    texto:
                        "¿Cuál es un pronombre personal?",

                    opciones: [
                        "ellos",
                        "mesa",
                        "grande",
                        "rápidamente"
                    ],

                    respuesta:
                        "ellos"
                },


                {
                    texto:
                        "En «El cielo está nublado», ¿qué función cumple «nublado»?",

                    opciones: [
                        "Atributo",
                        "Sujeto",
                        "Complemento directo",
                        "Complemento indirecto"
                    ],

                    respuesta:
                        "Atributo"
                }

            ]

        };


        return
            preguntas[nivel][
                numeroAleatorio(
                    0,
                    preguntas[nivel].length - 1
                )
            ];

    }


    return null;

}


// ==========================================
// MOSTRAR PREGUNTA LENGUA
// ==========================================

function mostrarPreguntaLengua() {

    if (!juegoLenguaActual)
        return;


    if (
        juegoLenguaActual.pregunta >=
        juegoLenguaActual.total
    ) {

        mostrarResultadoLengua();

        return;

    }


    const pregunta =
        generarPreguntaLengua(
            juegoLenguaActual.actividad,
            juegoLenguaActual.nivel
        );


    if (!pregunta) {

        console.error(
            "No se pudo generar la pregunta de Lengua."
        );

        return;

    }


    const preguntaElemento =
        document.getElementById(
            "preguntaLengua"
        );


    const respuestasElemento =
        document.getElementById(
            "respuestasLengua"
        );


    const progresoElemento =
        document.getElementById(
            "progresoLengua"
        );


    const nivelElemento =
        document.getElementById(
            "nivelLengua"
        );


    const tipoElemento =
        document.getElementById(
            "tipoLengua"
        );


    const resultadoElemento =
        document.getElementById(
            "resultadoLengua"
        );


    if (
        !preguntaElemento ||
        !respuestasElemento ||
        !progresoElemento ||
        !resultadoElemento
    ) {

        console.error(
            "No se encontraron los elementos de Lengua."
        );

        return;

    }


    juegoLenguaActual.bloqueado =
        false;


    preguntaElemento.textContent =
        pregunta.texto;


    progresoElemento.textContent =
        `Pregunta ${juegoLenguaActual.pregunta + 1} de ${juegoLenguaActual.total}`;


    nivelElemento.textContent =
        `${niveles[juegoLenguaActual.nivel].color} ${niveles[juegoLenguaActual.nivel].nombre}`;


    tipoElemento.textContent =
        juegoLenguaActual.actividad ===
        "ortografia"
            ? "✏️ Ortografía"
            : "🧩 Gramática";


    resultadoElemento.textContent =
        "";


    respuestasElemento.innerHTML =
        "";


    const respuestas =
        [...pregunta.opciones].sort(
            () => Math.random() - 0.5
        );


    respuestas.forEach(
        respuesta => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "respuesta";


            boton.textContent =
                respuesta;


            boton.style.cursor =
                "pointer";


            boton.addEventListener(
                "click",
                () => {

                    comprobarRespuestaLengua(
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
// COMPROBAR LENGUA
// ==========================================

function comprobarRespuestaLengua(
    respuestaUsuario,
    respuestaCorrecta
) {

    if (!juegoLenguaActual)
        return;


    if (juegoLenguaActual.bloqueado)
        return;


    juegoLenguaActual.bloqueado =
        true;


    const botones =
        document.querySelectorAll(
            "#respuestasLengua .respuesta"
        );


    botones.forEach(
        boton => {

            boton.disabled =
                true;


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
            "resultadoLengua"
        );


    if (!resultado)
        return;


    if (
        String(respuestaUsuario) ===
        String(respuestaCorrecta)
    ) {

        juegoLenguaActual.aciertos++;


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


    juegoLenguaActual.pregunta++;


    setTimeout(
        () => {

            mostrarPreguntaLengua();

        },
        1000
    );

}


// ==========================================
// RESULTADO FINAL LENGUA
// ==========================================

function mostrarResultadoLengua() {

    const porcentaje =
        Math.round(
            (
                juegoLenguaActual.aciertos /
                juegoLenguaActual.total
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


    if (!contenedor)
        return;


    const actividad =
        juegoLenguaActual.actividad;


    const nivel =
        juegoLenguaActual.nivel;


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
                    ${juegoLenguaActual.aciertos}
                </strong>

                de

                <strong>
                    ${juegoLenguaActual.total}
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
                    iniciarJuegoLengua(
                        '${actividad}',
                        '${nivel}'
                    )
                "
            >
                🔄 Volver a jugar
            </button>


            <br><br>


            <a
                href="index.html"
                class="boton-secundario"
            >
                ← Volver a Educonew
            </a>

        </div>

    `;

}


// ==========================================
// COMPATIBILIDAD
// ==========================================

function empezarOrtografia(nivel) {

    iniciarJuegoLengua(
        "ortografia",
        nivel
    );

}


function empezarGramatica(nivel) {

    iniciarJuegoLengua(
        "gramatica",
        nivel
    );

}
