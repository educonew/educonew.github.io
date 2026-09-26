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
// SISTEMA DE PROGRESO
// ==========================================

const CLAVE_PROGRESO = "educonew_progreso";


function obtenerProgreso() {

    const guardado =
        localStorage.getItem(CLAVE_PROGRESO);

    if (guardado) {

        try {

            return JSON.parse(guardado);

        } catch (error) {

            console.error(
                "No se pudo leer el progreso guardado.",
                error
            );
        }
    }


    return {
        puntos: 0,
        ejercicios: 0,
        aciertos: 0,
        errores: 0,
        mejorRacha: 0,
        materias: {},
        niveles: {},
        logros: []
    };
}


function guardarProgreso(progreso) {

    localStorage.setItem(
        CLAVE_PROGRESO,
        JSON.stringify(progreso)
    );
}


function registrarResultadoFinal() {

    if (!juegoActual) return;


    const progreso =
        obtenerProgreso();


    progreso.puntos +=
        juegoActual.puntos;


    progreso.ejercicios +=
        juegoActual.total;


    progreso.aciertos +=
        juegoActual.aciertos;


    progreso.errores +=
        juegoActual.errores;


    if (
        juegoActual.mejorRacha >
        progreso.mejorRacha
    ) {

        progreso.mejorRacha =
            juegoActual.mejorRacha;
    }


    // ======================================
    // REGISTRAR MATERIA
    // ======================================

    if (!progreso.materias[juegoActual.tema]) {

        progreso.materias[juegoActual.tema] = {
            ejercicios: 0,
            aciertos: 0,
            puntos: 0
        };
    }


    progreso.materias[
        juegoActual.tema
    ].ejercicios +=
        juegoActual.total;


    progreso.materias[
        juegoActual.tema
    ].aciertos +=
        juegoActual.aciertos;


    progreso.materias[
        juegoActual.tema
    ].puntos +=
        juegoActual.puntos;


    // ======================================
    // REGISTRAR NIVEL
    // ======================================

    const claveNivel =
        `${juegoActual.tema}_${juegoActual.nivel}`;


    if (!progreso.niveles[claveNivel]) {

        progreso.niveles[claveNivel] = {
            jugado: true,
            completado: false,
            porcentaje: 0
        };
    }


    const porcentaje =
        Math.round(
            (
                juegoActual.aciertos /
                juegoActual.total
            ) * 100
        );


    progreso.niveles[
        claveNivel
    ].jugado = true;


    progreso.niveles[
        claveNivel
    ].porcentaje = porcentaje;


    /*
     * Consideramos un nivel completado
     * cuando se consigue al menos un 80%.
     */

    if (porcentaje >= 80) {

        progreso.niveles[
            claveNivel
        ].completado = true;
    }


    guardarProgreso(progreso);


    comprobarLogros(progreso);


    return progreso;
}


// ==========================================
// SISTEMA DE LOGROS
// ==========================================

function comprobarLogros(progreso) {

    const nuevosLogros = [];


    function añadirLogro(
        id,
        nombre,
        descripcion
    ) {

        if (
            !progreso.logros.includes(id)
        ) {

            progreso.logros.push(id);

            nuevosLogros.push({
                id: id,
                nombre: nombre,
                descripcion: descripcion
            });
        }
    }


    // Primer ejercicio completado

    if (
        progreso.ejercicios >= 10
    ) {

        añadirLogro(
            "primer_ejercicio",
            "Primer paso",
            "Has completado tu primera tanda de ejercicios."
        );
    }


    // 500 puntos

    if (
        progreso.puntos >= 500
    ) {

        añadirLogro(
            "500_puntos",
            "En marcha",
            "Has conseguido 500 puntos."
        );
    }


    // 1000 puntos

    if (
        progreso.puntos >= 1000
    ) {

        añadirLogro(
            "1000_puntos",
            "Gran estudiante",
            "Has conseguido 1000 puntos."
        );
    }


    // 10 aciertos seguidos

    if (
        progreso.mejorRacha >= 10
    ) {

        añadirLogro(
            "racha_10",
            "Racha imparable",
            "Has conseguido 10 aciertos seguidos."
        );
    }


    // 50 ejercicios

    if (
        progreso.ejercicios >= 50
    ) {

        añadirLogro(
            "50_ejercicios",
            "Constancia",
            "Has completado 50 ejercicios."
        );
    }


    // 100 ejercicios

    if (
        progreso.ejercicios >= 100
    ) {

        añadirLogro(
            "100_ejercicios",
            "Máquina de aprender",
            "Has completado 100 ejercicios."
        );
    }


    // Guardar nuevos logros

    if (nuevosLogros.length > 0) {

        guardarProgreso(
            progreso
        );

        mostrarLogrosNuevos(
            nuevosLogros
        );
    }
}


function mostrarLogrosNuevos(logros) {

    /*
     * Por ahora mostramos los logros
     * de forma discreta.
     *
     * Más adelante tendremos una
     * sección visual dedicada a ellos.
     */

    if (!logros || !logros.length) {
        return;
    }


    console.log(
        "🏆 Nuevos logros:",
        logros
    );
}


// ==========================================
// NÚMEROS ALEATORIOS
// ==========================================

function numeroAleatorio(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


// ==========================================
// INICIAR JUEGO
// ==========================================

function iniciarJuego(
    tema,
    nivel
) {

    if (!niveles[nivel]) {

        console.error(
            "Nivel no válido:",
            nivel
        );

        return;
    }


    juegoActual = {

        tema: tema,

        nivel: nivel,

        pregunta: 0,

        aciertos: 0,

        errores: 0,

        racha: 0,

        mejorRacha: 0,

        puntos: 0,

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
            style="
                text-align:center;
                position:relative;
            "
        >

            <div
                id="marcadorJuego"
                style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:10px;
                    margin-bottom:20px;
                "
            ></div>


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
                    grid-template-columns:
                        repeat(2,1fr);
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
// ACTUALIZAR MARCADOR
// ==========================================

function actualizarMarcador() {

    if (!juegoActual) return;


    const marcador =
        document.getElementById(
            "marcadorJuego"
        );


    if (!marcador) return;


    marcador.innerHTML = `

        <div
            style="
                background:#f1f5ff;
                color:#4f46e5;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            ⭐ ${juegoActual.puntos} puntos
        </div>


        <div
            style="
                background:#ecfdf3;
                color:#059669;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            🔥 Racha: ${juegoActual.racha}
        </div>


        <div
            style="
                background:#f8fafc;
                color:#475467;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            🎯 ${juegoActual.aciertos}/${juegoActual.total}
        </div>

    `;
}


// ==========================================
// GENERAR PREGUNTA
// ==========================================

function generarPregunta(
    tema,
    nivel
) {

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

                a = numeroAleatorio(
                    1,
                    20
                );

                b = numeroAleatorio(
                    1,
                    20
                );
            }


            else if (nivel === "medio") {

                a = numeroAleatorio(
                    10,
                    100
                );

                b = numeroAleatorio(
                    10,
                    100
                );
            }


            else if (nivel === "dificil") {

                a = numeroAleatorio(
                    100,
                    999
                );

                b = numeroAleatorio(
                    100,
                    999
                );
            }


            else {

                a = numeroAleatorio(
                    1000,
                    9999
                );

                b = numeroAleatorio(
                    1000,
                    9999
                );
            }


            respuesta =
                a + b;

            simbolo =
                "+";

            break;


        // ==================================
        // RESTAS
        // ==================================

        case "restas":

            if (nivel === "facil") {

                a = numeroAleatorio(
                    5,
                    30
                );
            }


            else if (nivel === "medio") {

                a = numeroAleatorio(
                    30,
                    150
                );
            }


            else if (nivel === "dificil") {

                a = numeroAleatorio(
                    100,
                    999
                );
            }


            else {

                a = numeroAleatorio(
                    1000,
                    9999
                );
            }


            b = numeroAleatorio(
                1,
                a
            );


            respuesta =
                a - b;

            simbolo =
                "−";

            break;


        // ==================================
        // MULTIPLICACIONES
        // ==================================

        case "multiplicaciones":

            if (nivel === "facil") {

                a = numeroAleatorio(
                    1,
                    10
                );

                b = numeroAleatorio(
                    1,
                    10
                );
            }


            else if (nivel === "medio") {

                a = numeroAleatorio(
                    2,
                    20
                );

                b = numeroAleatorio(
                    2,
                    12
                );
            }


            else if (nivel === "dificil") {

                a = numeroAleatorio(
                    10,
                    50
                );

                b = numeroAleatorio(
                    10,
                    30
                );
            }


            else {

                a = numeroAleatorio(
                    20,
                    200
                );

                b = numeroAleatorio(
                    20,
                    100
                );
            }


            respuesta =
                a * b;

            simbolo =
                "×";

            break;


        // ==================================
        // DIVISIONES
        // ==================================

        case "divisiones":

            if (nivel === "facil") {

                b = numeroAleatorio(
                    2,
                    10
                );

                respuesta =
                    numeroAleatorio(
                        1,
                        10
                    );
            }


            else if (nivel === "medio") {

                b = numeroAleatorio(
                    2,
                    12
                );

                respuesta =
                    numeroAleatorio(
                        2,
                        20
                    );
            }


            else if (nivel === "dificil") {

                b = numeroAleatorio(
                    5,
                    30
                );

                respuesta =
                    numeroAleatorio(
                        5,
                        50
                    );
            }


            else {

                b = numeroAleatorio(
                    10,
                    100
                );

                respuesta =
                    numeroAleatorio(
                        10,
                        100
                    );
            }


            a =
                b * respuesta;

            simbolo =
                "÷";

            break;


        // ==================================
        // FRACCIONES
        // ==================================

        case "fracciones": {

            let denominador;
            let numerador;


            if (nivel === "facil") {

                denominador =
                    numeroAleatorio(
                        2,
                        6
                    );
            }


            else if (nivel === "medio") {

                denominador =
                    numeroAleatorio(
                        3,
                        10
                    );
            }


            else if (nivel === "dificil") {

                denominador =
                    numeroAleatorio(
                        5,
                        20
                    );
            }


            else {

                denominador =
                    numeroAleatorio(
                        10,
                        50
                    );
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
                    numeroAleatorio(
                        1,
                        5
                    ) * 10;

                cantidad =
                    numeroAleatorio(
                        1,
                        10
                    ) * 10;
            }


            else if (nivel === "medio") {

                porcentaje =
                    numeroAleatorio(
                        1,
                        9
                    ) * 10;

                cantidad =
                    numeroAleatorio(
                        1,
                        20
                    ) * 10;
            }


            else if (nivel === "dificil") {

                porcentaje =
                    numeroAleatorio(
                        5,
                        95
                    );

                cantidad =
                    numeroAleatorio(
                        2,
                        20
                    ) * 10;
            }


            else {

                porcentaje =
                    numeroAleatorio(
                        5,
                        95
                    );

                cantidad =
                    numeroAleatorio(
                        10,
                        100
                    ) * 10;
            }


            respuesta =
                (
                    cantidad *
                    porcentaje
                ) / 100;


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

                base =
                    numeroAleatorio(
                        2,
                        10
                    );

                altura =
                    numeroAleatorio(
                        2,
                        10
                    );
            }


            else if (nivel === "medio") {

                base =
                    numeroAleatorio(
                        5,
                        20
                    );

                altura =
                    numeroAleatorio(
                        5,
                        20
                    );
            }


            else if (nivel === "dificil") {

                base =
                    numeroAleatorio(
                        10,
                        50
                    );

                altura =
                    numeroAleatorio(
                        10,
                        50
                    );
            }


            else {

                base =
                    numeroAleatorio(
                        20,
                        100
                    );

                altura =
                    numeroAleatorio(
                        20,
                        100
                    );
            }


            respuesta =
                (
                    base *
                    altura
                ) / 2;


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

            let precio =
                numeroAleatorio(
                    2,
                    20
                );


            let cantidad =
                numeroAleatorio(
                    2,
                    10
                );


            if (nivel === "medio") {

                precio =
                    numeroAleatorio(
                        10,
                        50
                    );

                cantidad =
                    numeroAleatorio(
                        2,
                        15
                    );
            }


            if (nivel === "dificil") {

                precio =
                    numeroAleatorio(
                        20,
                        100
                    );

                cantidad =
                    numeroAleatorio(
                        5,
                        20
                    );
            }


            if (nivel === "experto") {

                precio =
                    numeroAleatorio(
                        50,
                        200
                    );

                cantidad =
                    numeroAleatorio(
                        10,
                        30
                    );
            }


            respuesta =
                precio *
                cantidad;


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
// GENERAR RESPUESTAS
// ==========================================

function generarRespuestas(
    correcta
) {

    const respuestas =
        [correcta];


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
                        Math.abs(
                            correcta
                        ) * 0.15
                    )
                )
            );


        let falsa;


        if (
            Math.random() < 0.5
        ) {

            falsa =
                correcta +
                diferencia;

        }

        else {

            falsa =
                correcta -
                diferencia;
        }


        if (
            !respuestas.includes(
                falsa
            ) &&
            falsa >= 0
        ) {

            respuestas.push(
                falsa
            );
        }
    }


    while (
        respuestas.length < 4
    ) {

        let falsa =
            correcta +
            respuestas.length;


        if (
            !respuestas.includes(
                falsa
            )
        ) {

            respuestas.push(
                falsa
            );
        }
    }


    return respuestas.sort(
        () =>
            Math.random() - 0.5
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


    juegoActual.bloqueado =
        false;


    preguntaElemento.textContent =
        pregunta.texto;


    progresoElemento.textContent =
        `Pregunta ${juegoActual.pregunta + 1} de ${juegoActual.total}`;


    if (nivelElemento) {

        nivelElemento.textContent =
            `${niveles[juegoActual.nivel].color} ${niveles[juegoActual.nivel].nombre}`;
    }


    resultadoElemento.textContent =
        "";


    respuestasElemento.innerHTML =
        "";


    actualizarMarcador();


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
            [
                pregunta.respuesta
            ];


        while (
            respuestas.length < 4
        ) {

            let falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;


            if (
                !respuestas.includes(
                    falsa
                )
            ) {

                respuestas.push(
                    falsa
                );
            }
        }


        respuestas.sort(
            () =>
                Math.random() - 0.5
        );
    }


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


    if (
        juegoActual.bloqueado
    ) return;


    juegoActual.bloqueado =
        true;


    const botones =
        document.querySelectorAll(
            "#respuestasJuego .respuesta"
        );


    botones.forEach(
        boton => {

            boton.disabled =
                true;


            if (
                String(
                    boton.textContent
                ) ===
                String(
                    respuestaCorrecta
                )
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


    // ==================================
    // RESPUESTA CORRECTA
    // ==================================

    if (
        String(
            respuestaUsuario
        ) ===
        String(
            respuestaCorrecta
        )
    ) {

        juegoActual.aciertos++;


        juegoActual.racha++;


        if (
            juegoActual.racha >
            juegoActual.mejorRacha
        ) {

            juegoActual.mejorRacha =
                juegoActual.racha;
        }


        const puntosGanados =
            100 +
            (
                (
                    juegoActual.racha - 1
                ) * 25
            );


        juegoActual.puntos +=
            puntosGanados;


        resultado.textContent =
            `✅ ¡Correcto! +${puntosGanados} puntos`;


        resultado.style.color =
            "#10b981";
    }


    // ==================================
    // RESPUESTA INCORRECTA
    // ==================================

    else {

        juegoActual.errores++;


        juegoActual.racha =
            0;


        resultado.textContent =
            `❌ Incorrecto. La respuesta era ${respuestaCorrecta}`;


        resultado.style.color =
            "#ef4444";
    }


    actualizarMarcador();


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
            (
                juegoActual.aciertos /
                juegoActual.total
            ) * 100
        );


    let mensaje;

    let emoji;


    if (
        porcentaje === 100
    ) {

        mensaje =
            "¡Perfecto!";

        emoji =
            "🏆";
    }


    else if (
        porcentaje >= 80
    ) {

        mensaje =
            "¡Excelente trabajo!";

        emoji =
            "🔥";
    }


    else if (
        porcentaje >= 60
    ) {

        mensaje =
            "¡Muy bien!";

        emoji =
            "👏";
    }


    else if (
        porcentaje >= 40
    ) {

        mensaje =
            "¡Sigue practicando!";

        emoji =
            "💪";
    }


    else {

        mensaje =
            "¡Vamos a mejorar!";

        emoji =
            "📚";
    }


    /*
     * Guardamos el resultado
     * antes de mostrar la pantalla final.
     */

    registrarResultadoFinal();


    const contenedor =
        document.getElementById(
            "juegoMatematicas"
        );


    if (!contenedor) return;


    contenedor.innerHTML = `

        <div
            class="resultado-final"
            style="
                text-align:center;
                padding:20px 10px;
            "
        >

            <div
                style="
                    font-size:4.5rem;
                    margin-bottom:10px;
                "
            >
                ${emoji}
            </div>


            <h2
                style="
                    font-size:2rem;
                    margin:0 0 10px;
                "
            >
                ${mensaje}
            </h2>


            <p
                style="
                    color:#667085;
                    font-size:1rem;
                "
            >
                Has terminado el nivel
                <strong>
                    ${niveles[juegoActual.nivel].nombre}
                </strong>.
            </p>


            <div
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(2,minmax(0,1fr));
                    gap:12px;
                    max-width:500px;
                    margin:25px auto;
                "
            >

                <div
                    style="
                        background:#f1f5ff;
                        border-radius:18px;
                        padding:18px;
                    "
                >

                    <div
                        style="
                            font-size:1.5rem;
                        "
                    >
                        🎯
                    </div>

                    <strong
                        style="
                            display:block;
                            font-size:1.4rem;
                            margin-top:5px;
                        "
                    >
                        ${juegoActual.aciertos}/${juegoActual.total}
                    </strong>

                    <span
                        style="
                            color:#667085;
                            font-size:.85rem;
                        "
                    >
                        Aciertos
                    </span>

                </div>


                <div
                    style="
                        background:#ecfdf3;
                        border-radius:18px;
                        padding:18px;
                    "
                >

                    <div
                        style="
                            font-size:1.5rem;
                        "
                    >
                        ⭐
                    </div>

                    <strong
                        style="
                            display:block;
                            font-size:1.4rem;
                            margin-top:5px;
                        "
                    >
                        ${juegoActual.puntos}
                    </strong>

                    <span
                        style="
                            color:#667085;
                            font-size:.85rem;
                        "
                    >
                        Puntos
                    </span>

                </div>


                <div
                    style="
                        background:#fff7ed;
                        border-radius:18px;
                        padding:18px;
                    "
                >

                    <div
                        style="
                            font-size:1.5rem;
                        "
                    >
                        🔥
                    </div>

                    <strong
                        style="
                            display:block;
                            font-size:1.4rem;
                            margin-top:5px;
                        "
                    >
                        ${juegoActual.mejorRacha}
                    </strong>

                    <span
                        style="
                            color:#667085;
                            font-size:.85rem;
                        "
                    >
                        Mejor racha
                    </span>

                </div>


                <div
                    style="
                        background:#f8fafc;
                        border-radius:18px;
                        padding:18px;
                    "
                >

                    <div
                        style="
                            font-size:1.5rem;
                        "
                    >
                        📊
                    </div>

                    <strong
                        style="
                            display:block;
                            font-size:1.4rem;
                            margin-top:5px;
                        "
                    >
                        ${porcentaje}%
                    </strong>

                    <span
                        style="
                            color:#667085;
                            font-size:.85rem;
                        "
                    >
                        Precisión
                    </span>

                </div>

            </div>


            <div
                style="
                    display:flex;
                    justify-content:center;
                    gap:12px;
                    flex-wrap:wrap;
                    margin-top:20px;
                "
            >

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


                <button
                    type="button"
                    class="boton-secundario"
                    onclick="
                        if (
                            typeof volverATemas ===
                            'function'
                        ) {
                            volverATemas();
                        }
                    "
                >
                    📚 Cambiar tema
                </button>

            </div>

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
// ==========================================
// EDUCONEW — LENGUA: ORTOGRAFÍA
// ==========================================

const preguntasOrtografia = {

    facil: [
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["avión", "abión", "havión", "avíon"],
            respuesta: "avión"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["casa", "cassa", "caza", "kasa"],
            respuesta: "casa"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["queso", "keso", "qeso", "quesoo"],
            respuesta: "queso"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["jirafa", "girafa", "girrafa", "jirrafa"],
            respuesta: "jirafa"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["huevo", "uevo", "huvo", "huebo"],
            respuesta: "huevo"
        }
    ],

    medio: [
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["haber", "aver", "haver", "a ver"],
            respuesta: "haber"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["viaje", "biage", "viaje", "biaje"],
            respuesta: "viaje"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["vergüenza", "verguenza", "vergüensa", "berguenza"],
            respuesta: "vergüenza"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["examen", "ecsamen", "exámen", "esamen"],
            respuesta: "examen"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["también", "tanbién", "tambien", "tanbien"],
            respuesta: "también"
        }
    ],

    dificil: [
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["desarrollar", "desarollar", "desarroyar", "desarrolllar"],
            respuesta: "desarrollar"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["privilegio", "previlegio", "privilejio", "pribilegio"],
            respuesta: "privilegio"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["excepción", "escepción", "exepción", "exceción"],
            respuesta: "excepción"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["construcción", "construción", "construccion", "construcsión"],
            respuesta: "construcción"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: ["extraordinario", "estraordinario", "extrahordinario", "extraordinarío"],
            respuesta: "extraordinario"
        }
    ],

    experto: [
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: [
                "idiosincrasia",
                "idiosincracia",
                "idiosincracia",
                "idiosincrasiaa"
            ],
            respuesta: "idiosincrasia"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: [
                "subsanar",
                "subsanár",
                "supsanar",
                "subsanhar"
            ],
            respuesta: "subsanar"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: [
                "ambigüedad",
                "ambiguedad",
                "anbigüedad",
                "ambigüedád"
            ],
            respuesta: "ambigüedad"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: [
                "heterogéneo",
                "eterogéneo",
                "heterogeneo",
                "heterojéneo"
            ],
            respuesta: "heterogéneo"
        },
        {
            pregunta: "¿Cuál está escrita correctamente?",
            opciones: [
                "inconmensurable",
                "inconmensuráble",
                "incomensurable",
                "inconmenssurable"
            ],
            respuesta: "inconmensurable"
        }
    ]
};


// ==========================================
// INICIAR ORTOGRAFÍA
// ==========================================

function empezarOrtografia(nivel) {

    if (!preguntasOrtografia[nivel]) {

        console.error(
            "Nivel de ortografía no válido:",
            nivel
        );

        return;
    }


    juegoLenguaActual = {

        tema: "ortografia",

        nivel: nivel,

        pregunta: 0,

        aciertos: 0,

        errores: 0,

        racha: 0,

        mejorRacha: 0,

        puntos: 0,

        total: 10,

        bloqueado: false,

        preguntas:
            crearPartidaOrtografia(nivel)
    };


    prepararZonaLengua();

    mostrarPreguntaOrtografia();
}


// ==========================================
// CREAR PARTIDA ALEATORIA
// ==========================================

function crearPartidaOrtografia(nivel) {

    const disponibles =
        [...preguntasOrtografia[nivel]];


    const partida = [];


    while (
        partida.length < 10
    ) {

        const indice =
            Math.floor(
                Math.random() *
                disponibles.length
            );


        const pregunta =
            disponibles[indice];


        partida.push({
            pregunta: pregunta.pregunta,
            opciones: [...pregunta.opciones],
            respuesta: pregunta.respuesta
        });


        disponibles.splice(
            indice,
            1
        );


        if (
            disponibles.length === 0
        ) {

            disponibles.push(
                ...preguntasOrtografia[nivel]
            );
        }
    }


    return partida;
}


// ==========================================
// VARIABLES DEL JUEGO DE LENGUA
// ==========================================

let juegoLenguaActual = null;


// ==========================================
// PREPARAR ZONA DE LENGUA
// ==========================================

function prepararZonaLengua() {

    let contenedor =
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
                position:relative;
            "
        >

            <div
                id="marcadorLengua"
                style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:10px;
                    margin-bottom:20px;
                "
            ></div>


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


            <h2
                id="preguntaLengua"
                style="
                    font-size:1.6rem;
                    margin:25px 0;
                "
            ></h2>


            <div
                id="respuestasLengua"
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(2,1fr);
                    gap:12px;
                    max-width:600px;
                    margin:auto;
                "
            ></div>


            <p
                id="resultadoLengua"
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
// MOSTRAR PREGUNTA DE ORTOGRAFÍA
// ==========================================

function mostrarPreguntaOrtografia() {

    if (!juegoLenguaActual) return;


    if (
        juegoLenguaActual.pregunta >=
        juegoLenguaActual.total
    ) {

        mostrarResultadoLengua();

        return;
    }


    const pregunta =
        juegoLenguaActual.preguntas[
            juegoLenguaActual.pregunta
        ];


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


    const resultadoElemento =
        document.getElementById(
            "resultadoLengua"
        );


    const nivelElemento =
        document.getElementById(
            "nivelLengua"
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
        pregunta.pregunta;


    progresoElemento.textContent =
        `Pregunta ${juegoLenguaActual.pregunta + 1} de ${juegoLenguaActual.total}`;


    if (nivelElemento) {

        nivelElemento.textContent =
            `${niveles[juegoLenguaActual.nivel].color} ${niveles[juegoLenguaActual.nivel].nombre}`;
    }


    resultadoElemento.textContent =
        "";


    respuestasElemento.innerHTML =
        "";


    actualizarMarcadorLengua();


    const opciones =
        [...pregunta.opciones];


    opciones.sort(
        () =>
            Math.random() - 0.5
    );


    opciones.forEach(
        opcion => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "respuesta";


            boton.textContent =
                opcion;


            boton.style.cursor =
                "pointer";


            boton.addEventListener(
                "click",
                () => {

                    comprobarRespuestaLengua(
                        opcion,
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
// MARCADOR DE LENGUA
// ==========================================

function actualizarMarcadorLengua() {

    if (!juegoLenguaActual) return;


    const marcador =
        document.getElementById(
            "marcadorLengua"
        );


    if (!marcador) return;


    marcador.innerHTML = `

        <div
            style="
                background:#f1f5ff;
                color:#4f46e5;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            ⭐ ${juegoLenguaActual.puntos} puntos
        </div>


        <div
            style="
                background:#ecfdf3;
                color:#059669;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            🔥 Racha: ${juegoLenguaActual.racha}
        </div>


        <div
            style="
                background:#f8fafc;
                color:#475467;
                padding:8px 14px;
                border-radius:999px;
                font-weight:800;
            "
        >
            🎯
            ${juegoLenguaActual.aciertos}/
            ${juegoLenguaActual.total}
        </div>

    `;
}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuestaLengua(
    respuestaUsuario,
    respuestaCorrecta
) {

    if (!juegoLenguaActual) return;


    if (
        juegoLenguaActual.bloqueado
    ) return;


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

        juegoLenguaActual.aciertos++;


        juegoLenguaActual.racha++;


        if (
            juegoLenguaActual.racha >
            juegoLenguaActual.mejorRacha
        ) {

            juegoLenguaActual.mejorRacha =
                juegoLenguaActual.racha;
        }


        const puntos =
            100 +
            (
                (
                    juegoLenguaActual.racha - 1
                ) * 25
            );


        juegoLenguaActual.puntos +=
            puntos;


        resultado.textContent =
            `✅ ¡Correcto! +${puntos} puntos`;


        resultado.style.color =
            "#10b981";
    }


    else {

        juegoLenguaActual.errores++;


        juegoLenguaActual.racha =
            0;


        resultado.textContent =
            `❌ Incorrecto. La respuesta era ${respuestaCorrecta}`;


        resultado.style.color =
            "#ef4444";
    }


    actualizarMarcadorLengua();


    juegoLenguaActual.pregunta++;


    setTimeout(
        () => {

            mostrarPreguntaOrtografia();

        },
        900
    );
}


// ==========================================
// RESULTADO FINAL DE LENGUA
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


    if (
        porcentaje === 100
    ) {

        mensaje =
            "🏆 ¡Perfecto!";
    }

    else if (
        porcentaje >= 80
    ) {

        mensaje =
            "🔥 ¡Excelente trabajo!";
    }

    else if (
        porcentaje >= 60
    ) {

        mensaje =
            "👏 ¡Muy bien!";
    }

    else if (
        porcentaje >= 40
    ) {

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


    contenedor.innerHTML = `

        <div
            class="resultado-final"
            style="
                text-align:center;
                padding:25px;
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
                    ${juegoLenguaActual.aciertos}
                </strong>
                de
                <strong>
                    ${juegoLenguaActual.total}
                </strong>
                respuestas correctas.
            </p>


            <div
                class="resultado-porcentaje"
            >
                ${porcentaje}%
            </div>


            <p
                style="
                    margin-top:15px;
                    font-weight:800;
                "
            >
                ⭐
                ${juegoLenguaActual.puntos}
                puntos
            </p>


            <button
                type="button"
                class="boton-principal"
                onclick="
                    empezarOrtografia(
                        '${juegoLenguaActual.nivel}'
                    )
                "
            >
                🔄 Volver a jugar
            </button>

        </div>

    `;
}
