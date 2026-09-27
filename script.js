// ==========================================
// EDUCONEW — MOTOR COMPLETO DE EJERCICIOS
// MATEMÁTICAS + LENGUA
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
// FUNCIONES ALEATORIAS
// ==========================================

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mezclar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


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
// GENERAR PREGUNTAS DE MATEMÁTICAS
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

            const numerador =
                numeroAleatorio(1, denominador - 1);

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

            respuesta = precio * cantidad;

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
        intentos < 200
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
            falsa >= 0 &&
            !respuestas.includes(falsa)
        ) {
            respuestas.push(falsa);
        }
    }

    while (respuestas.length < 4) {

        const falsa =
            correcta + numeroAleatorio(1, 50);

        if (!respuestas.includes(falsa)) {
            respuestas.push(falsa);
        }
    }

    return mezclar(respuestas);
}


// ==========================================
// MOSTRAR PREGUNTA MATEMÁTICAS
// ==========================================

function mostrarPregunta() {

    if (!juegoActual) {
        return;
    }

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

        respuestas = [
            pregunta.respuesta
        ];

        while (
            respuestas.length < 4
        ) {

            const falsa =
                `${numeroAleatorio(1, 9)}/${numeroAleatorio(2, 10)}`;

            if (
                !respuestas.includes(falsa)
            ) {
                respuestas.push(falsa);
            }
        }

        respuestas = mezclar(respuestas);
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

    if (!juegoActual) {
        return;
    }

    if (juegoActual.bloqueado) {
        return;
    }


    juegoActual.bloqueado = true;


    const botones =
        document.querySelectorAll(
            "#respuestasJuego .respuesta"
        );


    botones.forEach(
        boton => {

            boton.disabled = true;


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


            if (
                String(
                    boton.textContent
                ) ===
                String(
                    respuestaUsuario
                ) &&
                String(
                    respuestaUsuario
                ) !==
                String(
                    respuestaCorrecta
                )
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
            "resultadoJuego"
        );


    if (!resultado) {
        return;
    }


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


    if (!contenedor) {
        return;
    }


    const tema =
        juegoActual.tema;

    const nivel =
        juegoActual.nivel;


    contenedor.innerHTML = `

        <div
            class="resultado-final"
            style="
                text-align:center;
                padding:40px 20px;
            "
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
                        '${tema}',
                        '${nivel}'
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
// LENGUA — ORTOGRAFÍA
// ==========================================

const ortografia = {

    facil: [

        ["casa", "caza", "kasa", "cassa"],
        ["queso", "keso", "qeso", "kesso"],
        ["vaca", "baca", "vakka", "vacca"],
        ["jirafa", "girafa", "jirrafa", "girapha"],
        ["zapato", "sapato", "zappato", "zapatho"],
        ["árbol", "arbol", "árvol", "árboll"],
        ["camión", "camion", "kamión", "camionn"],
        ["lápiz", "lapiz", "lápis", "lapíz"],
        ["ventana", "bentana", "ventanna", "bentanna"],
        ["escuela", "escuella", "eskuela", "escueala"],
        ["familia", "família", "familiaa", "familiya"],
        ["helado", "elado", "hellado", "helhado"],
        ["camino", "kamino", "cammino", "caminno"],
        ["biblioteca", "biblioteka", "bibblioteca", "bibliotheca"],
        ["mariposa", "maripoza", "maripossa", "mariphoza"],
        ["zapatero", "sapatero", "zappatero", "zapathero"],
        ["ventilador", "bentilador", "ventiladorr", "bentilador"],
        ["cuchara", "cuxara", "cucharra", "kuchara"],
        ["familia", "famila", "familiaa", "fammilia"],
        ["montaña", "montana", "montaňa", "montañaa"]
    ],


    medio: [

        ["haber", "aver", "haver", "aber"],
        ["huevo", "uevo", "huévo", "huebo"],
        ["también", "tanbién", "tambien", "tambiénn"],
        ["miércoles", "miercoles", "miércolles", "miercolés"],
        ["vergüenza", "verguenza", "vergüensa", "berguenza"],
        ["decisión", "desición", "decision", "decizión"],
        ["necesario", "necesário", "nesesario", "necesareo"],
        ["examen", "ecsamen", "exámen", "esamen"],
        ["vegetación", "begetación", "vegetacion", "vejetación"],
        ["prohibido", "proivido", "prohibído", "prohivido"],
        ["siguiente", "sigiente", "siguente", "sijiente"],
        ["extraño", "estraño", "extrañó", "extrano"],
        ["ocurrir", "ocurir", "okurrir", "ocurrír"],
        ["precisión", "presición", "precision", "prezisión"],
        ["conocimiento", "conosimiento", "conocimientto", "conocimento"],
        ["aproximación", "aprocsimación", "aproximacion", "aproximasión"],
        ["responsable", "responzable", "responsavle", "responsablle"],
        ["educación", "educasion", "educacion", "edukación"],
        ["explicación", "esplicación", "explicacion", "eksplikación"],
        ["situación", "situacion", "situasión", "situazión"]
    ],


    dificil: [

        ["subterráneo", "subterraneo", "subterráneó", "subterranéo"],
        ["extraordinario", "estraordinario", "extraordinareo", "extraordinarío"],
        ["construcción", "construción", "construccion", "construcsión"],
        ["adolescente", "adoleszente", "adolesente", "adolescente"],
        ["privilegio", "pribilegio", "privilejio", "privillegio"],
        ["excepción", "exepción", "excepsión", "excepcion"],
        ["inmediatamente", "inmediataménte", "inmediatemente", "inmediatamentte"],
        ["beneficioso", "veneficioso", "benefisioso", "beneficióso"],
        ["suscripción", "suscrición", "suscripcion", "suscripsión"],
        ["circunstancia", "circunstanzia", "circunstansia", "circunstáncia"],
        ["responsabilidad", "responzabilidad", "responsavilidad", "responsabilidád"],
        ["desarrollar", "desarroyar", "desarrollár", "desarollar"],
        ["inconveniente", "inconbeniente", "inconveniénte", "inconvenente"],
        ["imprescindible", "inprescindible", "imprescindíble", "imprescindivle"],
        ["aproximadamente", "aprocsimadamente", "aproximadamentte", "aproximadámente"],
        ["extraordinariamente", "estraordinariamente", "extraordinaríamente", "extraordinariaménte"],
        ["desafortunadamente", "desafortundamente", "desafortunadamenté", "desafortunademente"],
        ["incomprensible", "inconprensible", "incomprensivle", "incomprensíble"],
        ["considerablemente", "considervablemente", "considerablemmente", "considerablementé"],
        ["indispensable", "indispensavle", "indispensíble", "indispenzable"]
    ],


    experto: [

        ["idiosincrasia", "idiosincracia", "idiosincracía", "idiosincrásia"],
        ["susceptible", "susceptíble", "suseptible", "susceptivle"],
        ["convalecencia", "convalesencia", "convalecensia", "convalezencia"],
        ["extravagante", "estravagante", "extrabagante", "extravagánte"],
        ["ambigüedad", "ambiguedad", "anbigüedad", "ambigüedád"],
        ["paralelepípedo", "paralelepipedo", "paralelepípedó", "paralelipípedo"],
        ["circunferencia", "circunferéncia", "circunferenzia", "circunferensia"],
        ["efervescencia", "efervescensia", "efervecencia", "efervescéncia"],
        ["omnisciente", "omniscente", "omnizciente", "omnisciente"],
        ["inconmensurable", "inconmensuravle", "incomensurable", "inconmensuráble"],
        ["yuxtaposición", "yustaposición", "yuxtaposicion", "yuxtaposizión"],
        ["heterogeneidad", "heterogeneidád", "eterogeneidad", "heterojeneidad"],
        ["procrastinación", "procrastrinación", "procrastinacion", "procastinación"],
        ["perspicacia", "perspicásia", "perspicacía", "perspicacia"],
        ["idiosincrásico", "idiosincracico", "idiosincrásiko", "idiosincrácico"],
        ["ininteligible", "ininteligible", "inintellijible", "ininteligíble"],
        ["inextricable", "inextricavle", "inextricáble", "inextricable"],
        ["epistemología", "epistemolojía", "epistemologia", "epistemológuía"],
        ["circunscripción", "circunscripsión", "circunscrición", "circunscripción"],
        ["electroencefalograma", "electroensfalograma", "electroencefalográma", "electroencefalogama"]
    ]
};


// ==========================================
// LENGUA — GRAMÁTICA
// ==========================================

const gramatica = {

    facil: [

        ["¿Qué tipo de palabra es «casa»?",
            ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
            "Sustantivo"],

        ["¿Qué tipo de palabra es «correr»?",
            ["Verbo", "Sustantivo", "Adjetivo", "Artículo"],
            "Verbo"],

        ["¿Qué tipo de palabra es «bonito»?",
            ["Adjetivo", "Verbo", "Pronombre", "Artículo"],
            "Adjetivo"],

        ["¿Qué tipo de palabra es «rápidamente»?",
            ["Adverbio", "Verbo", "Sustantivo", "Adjetivo"],
            "Adverbio"],

        ["¿Cuál es el verbo de «María estudia mucho»?",
            ["María", "estudia", "mucho", "ninguna"],
            "estudia"],

        ["¿Cuál es el sustantivo en «El perro corre»?",
            ["El", "perro", "corre", "ninguna"],
            "perro"],

        ["¿Qué tipo de palabra es «mesa»?",
            ["Sustantivo", "Verbo", "Adverbio", "Pronombre"],
            "Sustantivo"],

        ["¿Qué tipo de palabra es «saltar»?",
            ["Verbo", "Adjetivo", "Artículo", "Sustantivo"],
            "Verbo"],

        ["¿Qué tipo de palabra es «azul»?",
            ["Adjetivo", "Verbo", "Adverbio", "Pronombre"],
            "Adjetivo"],

        ["¿Cuál es el verbo en «Ana canta»?",
            ["Ana", "canta", "la", "ninguna"],
            "canta"],

        ["¿Cuál es el sustantivo en «El gato duerme»?",
            ["El", "gato", "duerme", "ninguna"],
            "gato"],

        ["¿Qué tipo de palabra es «ayer»?",
            ["Adverbio", "Sustantivo", "Verbo", "Adjetivo"],
            "Adverbio"],

        ["¿Qué tipo de palabra es «libro»?",
            ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
            "Sustantivo"],

        ["¿Qué tipo de palabra es «grande»?",
            ["Adjetivo", "Verbo", "Pronombre", "Artículo"],
            "Adjetivo"],

        ["¿Cuál es el verbo en «Pedro corre»?",
            ["Pedro", "corre", "el", "ninguna"],
            "corre"]
    ],


    medio: [

        ["¿Cuál es el sujeto en «Los alumnos estudian»?",
            ["Los alumnos", "estudian", "alumnos estudian", "Los"],
            "Los alumnos"],

        ["¿Cuál es el predicado en «Mi hermano juega al fútbol»?",
            ["Mi hermano", "juega al fútbol", "hermano", "fútbol"],
            "juega al fútbol"],

        ["¿Qué tipo de palabra es «lentamente»?",
            ["Adverbio", "Adjetivo", "Sustantivo", "Verbo"],
            "Adverbio"],

        ["¿Qué tipo de palabra es «ellos»?",
            ["Pronombre", "Adjetivo", "Verbo", "Sustantivo"],
            "Pronombre"],

        ["¿Qué tipo de palabra es «tres» en «tres libros»?",
            ["Determinante numeral", "Verbo", "Adverbio", "Pronombre personal"],
            "Determinante numeral"],

        ["¿Cuál es el verbo en «El niño pequeño juega»?",
            ["niño", "pequeño", "juega", "el"],
            "juega"],

        ["¿Cuál es el sujeto en «Mis amigos llegaron tarde»?",
            ["Mis amigos", "llegaron tarde", "tarde", "llegaron"],
            "Mis amigos"],

        ["¿Cuál es el predicado en «Laura lee un libro»?",
            ["Laura", "lee un libro", "libro", "Laura lee"],
            "lee un libro"],

        ["¿Qué tipo de palabra es «nosotros»?",
            ["Pronombre", "Adjetivo", "Verbo", "Adverbio"],
            "Pronombre"],

        ["¿Qué tipo de palabra es «muy»?",
            ["Adverbio", "Sustantivo", "Verbo", "Determinante"],
            "Adverbio"],

        ["¿Cuál es el determinante en «La casa grande»?",
            ["La", "casa", "grande", "ninguna"],
            "La"],

        ["¿Cuál es el adjetivo en «El coche rojo»?",
            ["El", "coche", "rojo", "ninguna"],
            "rojo"],

        ["¿Cuál es el sujeto en «El profesor explica la lección»?",
            ["El profesor", "explica la lección", "la lección", "explica"],
            "El profesor"],

        ["¿Cuál es el predicado en «Los niños juegan en el parque»?",
            ["Los niños", "juegan en el parque", "el parque", "niños"],
            "juegan en el parque"],

        ["¿Qué tipo de palabra es «mañana»?",
            ["Adverbio", "Verbo", "Adjetivo", "Pronombre"],
            "Adverbio"]
    ],


    dificil: [

        ["¿Qué función cumple «a María» en «Juan llamó a María»?",
            ["Complemento directo", "Sujeto", "Atributo", "Complemento circunstancial"],
            "Complemento directo"],

        ["¿Qué función cumple «en Madrid» en «Vivo en Madrid»?",
            ["Complemento circunstancial", "Sujeto", "Complemento directo", "Atributo"],
            "Complemento circunstancial"],

        ["¿Qué tipo de oración es «Llueve mucho»?",
            ["Impersonal", "Pasiva", "Interrogativa", "Copulativa"],
            "Impersonal"],

        ["¿Cuál es el atributo en «Laura es inteligente»?",
            ["Laura", "es", "inteligente", "ninguna"],
            "inteligente"],

        ["¿Qué tipo de palabra es «aunque»?",
            ["Conjunción", "Adverbio", "Pronombre", "Preposición"],
            "Conjunción"],

        ["¿Qué función cumple «con rapidez» en «Corrió con rapidez»?",
            ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento circunstancial"],

        ["¿Qué función cumple «un regalo» en «Pedro compró un regalo»?",
            ["Complemento directo", "Complemento indirecto", "Atributo", "Sujeto"],
            "Complemento directo"],

        ["¿Qué función cumple «ayer» en «Llegó ayer»?",
            ["Complemento circunstancial", "Complemento directo", "Atributo", "Sujeto"],
            "Complemento circunstancial"],

        ["¿Qué tipo de oración es «María está cansada»?",
            ["Copulativa", "Impersonal", "Pasiva", "Transitiva"],
            "Copulativa"],

        ["¿Qué función cumple «muy alto» en «El edificio es muy alto»?",
            ["Atributo", "Complemento directo", "Sujeto", "Complemento agente"],
            "Atributo"],

        ["¿Qué tipo de palabra es «sin»?",
            ["Preposición", "Conjunción", "Adverbio", "Pronombre"],
            "Preposición"],

        ["¿Qué función cumple «para su madre» en «Compró flores para su madre»?",
            ["Complemento circunstancial de finalidad", "Sujeto", "Atributo", "Complemento directo"],
            "Complemento circunstancial de finalidad"],

        ["¿Qué función cumple «un coche» en «Compró un coche»?",
            ["Complemento directo", "Sujeto", "Atributo", "Complemento indirecto"],
            "Complemento directo"],

        ["¿Qué tipo de oración es «El niño parece cansado»?",
            ["Copulativa", "Impersonal", "Pasiva", "Interrogativa"],
            "Copulativa"],

        ["¿Qué función cumple «en casa» en «Estudio en casa»?",
            ["Complemento circunstancial", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento circunstancial"]
    ],


    experto: [

        ["¿Qué función cumple «a su hermano» en «Pedro entregó el regalo a su hermano»?",
            ["Complemento indirecto", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento indirecto"],

        ["¿Qué tipo de oración es «El libro fue escrito por Cervantes»?",
            ["Pasiva perifrástica", "Activa", "Impersonal", "Copulativa"],
            "Pasiva perifrástica"],

        ["¿Qué función cumple «por Cervantes» en «El libro fue escrito por Cervantes»?",
            ["Complemento agente", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento agente"],

        ["¿Qué tipo de palabra es «sin»?",
            ["Preposición", "Conjunción", "Adverbio", "Pronombre"],
            "Preposición"],

        ["¿Qué función cumple «muy interesante» en «La película es muy interesante»?",
            ["Atributo", "Complemento directo", "Complemento agente", "Sujeto"],
            "Atributo"],

        ["¿Qué tipo de oración es «Se venden casas»?",
            ["Pasiva refleja", "Impersonal", "Copulativa", "Interrogativa"],
            "Pasiva refleja"],

        ["¿Qué función cumple «a Juan» en «Marta entregó el libro a Juan»?",
            ["Complemento indirecto", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento indirecto"],

        ["¿Qué función cumple «por la mañana» en «Estudio por la mañana»?",
            ["Complemento circunstancial de tiempo", "Complemento directo", "Atributo", "Complemento agente"],
            "Complemento circunstancial de tiempo"],

        ["¿Qué tipo de oración es «Se vive bien aquí»?",
            ["Impersonal refleja", "Pasiva refleja", "Copulativa", "Pasiva perifrástica"],
            "Impersonal refleja"],

        ["¿Qué función cumple «de madera» en «La mesa es de madera»?",
            ["Atributo", "Complemento directo", "Complemento agente", "Sujeto"],
            "Atributo"],

        ["¿Qué tipo de oración es «Los alumnos fueron premiados»?",
            ["Pasiva perifrástica", "Activa", "Impersonal", "Pasiva refleja"],
            "Pasiva perifrástica"],

        ["¿Qué función cumple «el premio» en «El profesor entregó el premio»?",
            ["Complemento directo", "Complemento indirecto", "Atributo", "Complemento agente"],
            "Complemento directo"],

        ["¿Qué función cumple «por sus compañeros» en «Fue ayudado por sus compañeros»?",
            ["Complemento agente", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento agente"],

        ["¿Qué tipo de oración es «Se alquilan apartamentos»?",
            ["Pasiva refleja", "Impersonal", "Activa", "Copulativa"],
            "Pasiva refleja"],

        ["¿Qué función cumple «a los estudiantes» en «El profesor explicó la lección a los estudiantes»?",
            ["Complemento indirecto", "Complemento directo", "Sujeto", "Atributo"],
            "Complemento indirecto"]
    ]
};


// ==========================================
// PREPARAR BANCO DE LENGUA
// ==========================================

function obtenerBancoLengua(tema, nivel) {

    if (tema === "ortografia") {

        const banco =
            ortografia[nivel] || [];

        return banco.map(
            opciones => {

                return {
                    pregunta:
                        "¿Cuál está escrita correctamente?",

                    opciones:
                        [...opciones],

                    correcta:
                        opciones[0]
                };
            }
        );
    }


    if (tema === "gramatica") {

        const banco =
            gramatica[nivel] || [];

        return banco.map(
            item => {

                return {
                    pregunta:
                        item[0],

                    opciones:
                        [...item[1]],

                    correcta:
                        item[2]
                };
            }
        );
    }


    return [];
}


// ==========================================
// INICIAR JUEGO LENGUA
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


    const banco =
        obtenerBancoLengua(
            tema,
            nivel
        );


    if (!banco.length) {

        console.error(
            "No hay preguntas para:",
            tema,
            nivel
        );

        return;
    }


    /*
     * AQUÍ ESTÁ LA CORRECCIÓN IMPORTANTE.
     *
     * Se mezclan TODAS las preguntas
     * una sola vez al comenzar la partida.
     *
     * Después se guardan en juegoLengua.
     *
     * Por tanto:
     *
     * Pregunta 1 → aleatoria
     * Pregunta 2 → otra diferente
     * Pregunta 3 → otra diferente
     * ...
     *
     * No se vuelve a mezclar el banco
     * después de cada pregunta.
     */

    const preguntasAleatorias =
        mezclar(banco);


    const cantidad =
        Math.min(
            10,
            preguntasAleatorias.length
        );


    juegoLengua = {

        tema:
            tema,

        nivel:
            nivel,

        preguntas:
            preguntasAleatorias.slice(
                0,
                cantidad
            ),

        pregunta:
            0,

        aciertos:
            0,

        total:
            cantidad,

        bloqueado:
            false
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

    if (!juegoLengua) {
        return;
    }


    if (
        juegoLengua.pregunta >=
        juegoLengua.total
    ) {

        mostrarResultadoFinalLengua();

        return;
    }


    /*
     * IMPORTANTE:
     * Aquí NO se vuelve a elegir
     * una pregunta al azar.
     *
     * Se coge exactamente la que
     * corresponde a esta posición
     * de la lista aleatoria creada
     * al comenzar la partida.
     */

    const pregunta =
        juegoLengua.preguntas[
            juegoLengua.pregunta
        ];


    const contenedor =
        document.getElementById(
            "juegoLengua"
        );


    if (!pregunta || !contenedor) {
        return;
    }


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


    const zona =
        document.getElementById(
            "respuestasLengua"
        );


    /*
     * También mezclamos las respuestas
     * para que la correcta no aparezca
     * siempre en la misma posición.
     */

    const respuestas =
        mezclar(
            pregunta.opciones
        );


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

    if (!juegoLengua) {
        return;
    }


    if (juegoLengua.bloqueado) {
        return;
    }


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


    if (!resultado) {
        return;
    }


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

    if (!juegoLengua) {
        return;
    }


    const porcentaje =
        Math.round(
            (
                juegoLengua.aciertos /
                juegoLengua.total
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
            "juegoLengua"
        );


    if (!contenedor) {
        return;
    }


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
