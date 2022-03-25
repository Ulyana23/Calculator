function cipherButton(showFields) {
    showFields.forEach(function(field) { // отображаем указанные элементы на странице
        $('#' + field).show();
    });

    $('.description_text').text(descriptionArray[currentCipher]);

    if (currentCipher === "polybius_square") {
        createMatrixInputPolybius();
    }

    if (currentCipher === "matrix") {
        matrixInputKey();
    }

    if (currentCipher === "shannon") {
        createMatrixParams();
    }

    if (currentCipher === "gamming") {
        createGammingParams();
    }

    if (currentCipher === "rsa") {
        createRSAParams();
    }

    if (currentCipher === "elgamal") {
        createElgamalParams();
    }

    if (currentCipher === "ecc") {
        createECCParams();
    }

    if (currentCipher === "gost94") {
        GOST94ParamsButtons();
    }

    if (currentCipher === "gost12") {
        GOST12ParamsButtons();
    }

    if (currentCipher === "rsaDigital") {
        rsaDigitalParamsButtons();
    }

    if (currentCipher === "elgamalDigital") {
        elgamalDigitalParamsButtons();
    }

    if (currentCipher === "diffieHellman") {
        diffieHellmanParamsButtons();
    }
}

// проверочки
function fieldsValidation() {
    if ($('#key').css('display') !== 'none') {
        if (getValues("key") === "") {
            alert("Введите ключ.");
            return false;
        }
    }

    if ($('#alphabet').css('display') !== 'none') {
        if (getValues("alphabet_value") === "") {
            alert("Введите алфавит.");
            return false;
        }

        let textArray = getValues("text").split("");
        let alpalphabetArray = getValues("alphabet_value").split("");
        if (textArray.every(e => alpalphabetArray.includes(e)) === false) {
            alert("Некоторые символы из текста не присутствуют в алфавите, попробуйте расширить алфавит.");
            return false;
        }

        let uniqueArray = alpalphabetArray.filter(function(item, pos) {
            return alpalphabetArray.indexOf(item) === pos;
        });

        $("#alphabet_value").val(uniqueArray.join(''));
    }

    // Цезарь
    if (currentCipher === "caesar") {
        if (!isNumber(getValues("key"))) {
            alert("В поле ключа введите только цифры.");
            return false;
        }
    }

    // Виженер
    if (currentCipher === "vigenere") {
        if (getValues("key").length !== 1) {
            alert("В поле ключа может быть только один символ.");
            return false;
        }
    }

    // Решётка Кардано
    if (currentCipher === "cardano") {
        let key = getValues("key").split(", ");
        if ((key.length * 4) !== 60) {
            alert("Неверная длина ключа, попробуйте другой.");
            return false;
        }
    }

    // Блокнот Шеннона
    if (currentCipher === "shannon") {
        if (getValues("Ti").length === 0) {
            alert("Введите параметр T0.");
            return false;
        }

        if (getValues("a").length === 0) {
            alert("Введите параметр a.");
            return false;
        }

        if (Number(getValues("a")) % 4 !== 1) {
            alert("Введите такое a, чтобы a mod 4 было равно 1.");
            return false;
        }

        if (getValues("c").length === 0) {
            alert("Введите параметр c.");
            return false;
        }

        if (Number(getValues("c")) % 2 === 0) {
            alert("Введите нечётное c.");
            return false;
        }

        if (getValues("m").length === 0) {
            alert("Введите параметр m.");
            return false;
        }
    }

    // Гаммирование ГОСТ
    if (currentCipher === "gamming") {
        if (getValues("gammingKey").length < 16) {
            alert("Ключ должен быть не менее 16 символов.");
            return false;
        }

        if (getValues("S").length < 4) {
            alert("Синхропосылка должна быть не менее 4 символов.");
            return false;
        }
    }

    // A5/1
    if (currentCipher === "A5_1") {
        if (getValues("key").length < 4) {
            alert("Ключ должен быть не менее 4 символов.");
            return false;
        }
    }

    // A5/2
    if (currentCipher === "A5_2") {
        if (getValues("key").length < 6) {
            alert("Ключ должен быть не менее 6 символов.");
            return false;
        }
    }

    // МАГМА
    if (currentCipher === "magma") {
        if (getValues("key").length < 16) {
            alert("Ключ должен быть не менее 16 символов.");
            return false;
        }
    }

    // AES
    if (currentCipher === "aes") {
        if (getValues("key").length < 8) {
            alert("Ключ должен быть не менее 8 символов.");
            return false;
        }
    }

    // КУЗНЕЧИК
    if (currentCipher === "grasshopper") {
        if (getValues("key").length < 16) {
            alert("Ключ должен быть не менее 16 символов.");
            return false;
        }
    }

    // RSA
    if (currentCipher === "rsa") {
        let P = Number(getValues("P"));
        let Q = Number(getValues("Q"));

        let ArrayP = [1, P], ArrayQ = [1, Q];

        if (getValues("P").length === 0) {
            alert("Введите параметр P.");
            return false;
        }

        if (getDivisorsNumber(P).toString() !== ArrayP.toString()) {
            alert("Ваше число P не простое, попробуйте ещё раз.");
            return false;
        }

        if (getValues("Q").length === 0) {
            alert("Введите параметр Q.");
            return false;
        }

        if (getDivisorsNumber(Q).toString() !== ArrayQ.toString()) {
            alert("Ваше число Q не простое, попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "decrypt") {
            if (getValues("D").length === 0) {
                alert("При расшифровке требуется параметр D. Ведите его.");
                return false;
            }
        }
    }

    // ELGAMAL
    if (currentCipher === "elgamal") {
        let p = Number(getValues("p"));

        let ArrayP = [1, p];

        if (getValues("p").length === 0) {
            alert("Введите параметр p.");
            return false;
        }

        if (getDivisorsNumber(p).toString() !== ArrayP.toString()) {
            alert("Ваше число p не простое, попробуйте ещё раз.");
            return false;
        }

        if (getValues("x").length === 0) {
            alert("Введите параметр x.");
            return false;
        }

        if ((Number(getValues("x")) <= 1) || (Number(getValues("x")) >= p)) {
            alert("Ваше число x не входит в промежуток 1 < x < p, попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "encrypt") {
            if (getValues("g").length === 0) {
                alert("Введите параметр g.");
                return false;
            }

            if ((Number(getValues("g")) <= 1) || (Number(getValues("g")) >= p)) {
                alert("Ваше число g не входит в промежуток 1 < g < p, попробуйте ещё раз.");
                return false;
            }
        }

    }

    // ECC
    if (currentCipher === "ecc") {
        let p = Number(getValues("p"));
        let a = Number(getValues("a"));
        let b = Number(getValues("b"));
        let Cb = Number(getValues("Cb"));

        let ArrayP = [1, p];

        if (getValues("p").length === 0) {
            alert("Введите параметр p.");
            return false;
        }

        if (getDivisorsNumber(p).toString() !== ArrayP.toString()) {
            alert("Ваше число p не простое, попробуйте ещё раз.");
            return false;
        }

        if ((4 * (a ** 3) + 27 * (b ** 2)) % p === 0) {
            alert("Ваша кривая непригодна для вычислений, попробуйте ещё раз.");
            return false;
        }

        if (getValues("a").length === 0) {
            alert("Введите параметр a.");
            return false;
        }

        if (getValues("b").length === 0) {
            alert("Введите параметр b.");
            return false;
        }

        if ((Cb <= 0) || (Cb >= p)) {
            alert("Ваш секретный ключ не входит в промежуток 0 < Cb < p, попробуйте ещё раз.");
            return false;
        }

        if (getValues("Cb").length === 0) {
            alert("Введите параметр Cb (секретный ключ).");
            return false;
        }
    }

    // ГОСТ Р 34.10-94
    if (currentCipher === "gost94") {
        let p = Number(getValues("p"));
        let q = Number(getValues("q"));
        let a = Number(getValues("a"));
        let x = Number(getValues("x"));
        let y = Number(getValues("y"));

        let ArrayP = [1, p];

        if (getValues("p").length === 0) {
            alert("Введите параметр p.");
            return false;
        }

        if (getDivisorsNumber(p).toString() !== ArrayP.toString()) {
            alert("Ваше число p не простое, попробуйте ещё раз.");
            return false;
        }

        if (getValues("q").length === 0) {
            alert("Введите параметр q.");
            return false;
        }

        if ((p-1) % q !== 0) {
            alert("ваше число q не является сомножителем (p-1), попробуйте ещё раз.");
            return false;
        }

        if (getValues("a").length === 0) {
            alert("Введите параметр a.");
            return false;
        }

        if ((a <= 1) || (a >= (p-1))) {
            alert("Ваш параметр а не входит в промежуток 1 < a < (p-1), попробуйте ещё раз.");
            return false;
        }

        if (powMod(a, q, p) !== 1) {
            alert("Выражение (а^q mod p) не равно 1, попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "encrypt") {
            if (getValues("x").length === 0) {
                alert("Введите параметр x.");
                return false;
            }

            if (x >= q) {
                alert("Ваше число x больше либо равно числу q, попробуйте ещё раз.");
                return false;
            }
        }

        if (typeOperation === "decrypt") {
            if (getValues("y").length === 0) {
                alert("Введите параметр y.");
                return false;
            }

            if (getValues("r").length === 0) {
                alert("Введите параметр r.");
                return false;
            }

            if (getValues("s").length === 0) {
                alert("Введите параметр s.");
                return false;
            }
        }
    }

    // ГОСТ Р 34.10-2012
    if (currentCipher === "gost12") {
        let p = Number(getValues("p"));
        let xa = Number(getValues("xa"));
        let a = Number(getValues("a"));
        let b = Number(getValues("b"));


        let ArrayP = [1, p];

        if (getValues("p").length === 0) {
            alert("Введите параметр p.");
            return false;
        }

        if (getDivisorsNumber(p).toString() !== ArrayP.toString()) {
            alert("Ваше число p не простое, попробуйте ещё раз.");
            return false;
        }

        if (p < 500) {
            alert("Ваше число p слишком маленькое, введите чилсо больше 500.");
            return false;
        }

        if (typeOperation === "encrypt") {
            if (getValues("xa").length === 0) {
                alert("Введите параметр xa.");
                return false;
            }
        }

        if ((4 * (a ** 3) + 27 * (b ** 2)) % p === 0) {
            alert("Ваша кривая непригодна для вычислений, попробуйте ещё раз.");
            return false;
        }

        if (getValues("a").length === 0) {
            alert("Введите параметр a.");
            return false;
        }

        if (getValues("b").length === 0) {
            alert("Введите параметр b.");
            return false;
        }


        if (typeOperation === "decrypt") {
            if (getValues("Ya1").length === 0) {
                alert("Введите точку Ya.");
                return false;
            }

            if (getValues("Ya2").length === 0) {
                alert("Введите точку Ya.");
                return false;
            }

            if (getValues("G1").length === 0) {
                alert("Введите точку G.");
                return false;
            }

            if (getValues("G2").length === 0) {
                alert("Введите точку G.");
                return false;
            }
        }


    }

    // RSA ЦИФРОВАЯ ПОДПИСЬ
    if (currentCipher === "rsaDigital") {
        let P = Number(getValues("P"));
        let Q = Number(getValues("Q"));

        let ArrayP = [1, P], ArrayQ = [1, Q];

        if (getValues("P").length === 0) {
            alert("Введите параметр P.");
            return false;
        }

        if (getDivisorsNumber(P).toString() !== ArrayP.toString()) {
            alert("Ваше число P не простое, попробуйте ещё раз.");
            return false;
        }

        if (getValues("Q").length === 0) {
            alert("Введите параметр Q.");
            return false;
        }

        if (getDivisorsNumber(Q).toString() !== ArrayQ.toString()) {
            alert("Ваше число Q не простое, попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "decrypt") {
            if (getValues("E").length === 0) {
                alert("Для проверки требуется параметр E. Ведите его.");
                return false;
            }

            if (getValues("S").length === 0) {
                alert("Для проверки требуется цифровая подпись. Ведите её.");
                return false;
            }
        }
    }

    // ELGAMAL ЦИФРОВАЯ ПОДПИСЬ
    if (currentCipher === "elgamalDigital") {
        let p = Number(getValues("P"));
        let x = Number(getValues("X"));

        let ArrayP = [1, p];

        if (getValues("P").length === 0) {
            alert("Введите параметр p.");
            return false;
        }

        if (getDivisorsNumber(p).toString() !== ArrayP.toString()) {
            alert("Ваше число p не простое, попробуйте ещё раз.");
            return false;
        }

        if (getValues("G").length === 0) {
            alert("Введите параметр g.");
            return false;
        }

        if (Number(getValues("G")) >= p) {
            alert("Ваше число больше или равно p, попробуйте ещё раз.");
            return false;
        }

        if (getValues("X").length === 0) {
            alert("Введите параметр x.");
            return false;
        }

        if (x <= 1 || x > (p - 1)) {
            alert("Ваш параметр x не удовлетворяет условию (1 < x <= p-1), попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "decrypt") {
            if (getValues("Y").length === 0) {
                alert("Для проверки требуется параметр y. Ведите его.");
                return false;
            }

            if (getValues("a").length === 0 || getValues("b").length === 0) {
                alert("Для проверки требуется цифровая подпись. Ведите её.");
                return false;
            }
        }
    }

    // ELGAMAL ЦИФРОВАЯ ПОДПИСЬ
    if (currentCipher === "diffieHellman") {
        let n = Number(getValues("n"));
        let a = Number(getValues("a"));
        let Ka = Number(getValues("Ka"));
        let Kb = Number(getValues("Kb"));

        if (getValues("n").length === 0) {
            alert("Введите параметр n.");
            return false;
        }

        if (n < 2) {
            alert("Ваше значение n меньше либо равно 1, попробуйте ещё раз.");
            return false;
        }

        if (typeOperation === "encrypt") {
            if (getValues("a").length === 0) {
                alert("Введите параметр a.");
                return false;
            }

            if (a >= n || a <= 1) {
                alert("Ваше значение a не удовлетворяет условию (1 < a < n), попробуйте ещё раз.");
                return false;
            }

            if (getValues("Ka").length === 0) {
                alert("Введите параметр Ka.");
                return false;
            }

            if (Ka < 2 || Ka > n-1) {
                alert("Ваш секретный ключ не удовлетворяет условию (1 < Ka < n), попробуйте ещё раз.");
                return false;
            }

            if (getValues("Kb").length === 0) {
                alert("Введите параметр Kb.");
                return false;
            }

            if (Kb < 2 || Kb > n-1) {
                alert("Ваш секретный ключ не удовлетворяет условию (1 < Kb < n), попробуйте ещё раз.");
                return false;
            }
        }
    }


    if ($('#text').css('display') !== 'none') {
        if (getValues("text") === "") {
            alert("Введите текст.");
            return false;
        }
    }

    return true;
}

let fieldsArray = { // где какие поля отображать
    atbash: ["encrypt", "decrypt", "text", "alphabet"],
    caesar: ["key", "encrypt", "decrypt", "text", "alphabet"],
    polybius_square: ["encrypt", "decrypt", "text", "matrix-block"],
    trythemia: ["encrypt", "decrypt", "text", "alphabet"],
    belazo: ["encrypt", "decrypt", "text", "alphabet", "key"],
    vigenere: ["encrypt", "decrypt", "text", "alphabet", "key"],
    magma_s_blocks: ["encrypt", "decrypt", "text"],
    playfair: ["key", "encrypt", "decrypt", "text", "alphabet"], // "matrix-block"
    matrix: ["encrypt", "decrypt", "text", "matrix-block"],
    cardano: ["encrypt", "decrypt", "text", "key"],
    vertical: ["encrypt", "decrypt", "text", "key"],
    shannon: ["encrypt", "decrypt", "text", "keys", "alphabet"],
    gamming: ["encrypt", "decrypt", "text", "keys"],
    A5_1: ["encrypt", "decrypt", "text", "key"],
    A5_2: ["encrypt", "decrypt", "text", "key"],
    magma: ["encrypt", "decrypt", "text", "key"],
    aes: ["encrypt", "decrypt", "text", "key"],
    grasshopper: ["encrypt", "decrypt", "text", "key"],
    rsa: ["encrypt", "decrypt", "text", "keys"],
    elgamal: ["encrypt", "decrypt", "text", "keys"],
    ecc: ["encrypt", "decrypt", "text", "keys"],
    gost94: ["encrypt", "decrypt", "text", "keys"],
    gost12: ["encrypt", "decrypt", "text", "keys"],
    rsaDigital: ["encrypt", "decrypt", "text", "keys"],
    elgamalDigital: ["encrypt", "decrypt", "text", "keys"],
    diffieHellman: ["encrypt", "decrypt", "keys"]
};

function chooseCipher(_cipher) { // по переменной currentCipher смотрим какой шифр текущий и вызываем нужную функцию
    if (_cipher === "atbash"){
        getAlphabet(); atbash();
    }

    if (_cipher === "caesar") {
        getAlphabet(); caesar(alphabetStandard);
    }

    if (_cipher === "polybius_square") {
        getValueFromSquare(polybiusMatrix); polybiusSquare(polybiusMatrix);
    }

    if (_cipher === "trythemia") {
        getAlphabet(); trythemia(alphabetStandard);
    }

    if (_cipher === "belazo") {
        getAlphabet(); belazo(alphabetStandard);
    }

    if (_cipher === "vigenere") {
        getAlphabet(); vigenere(alphabetStandard);
    }

    if (_cipher === "magma_s_blocks") {
        magmaSBlocks();
    }

    if (_cipher === "playfair") {
            getAlphabet(); playfair(alphabetStandard);
    }

    if (_cipher === "matrix") {
        getValueFromSquare(matrixNum); matrix();
    }

    if (_cipher === "cardano") {
        cardano();
    }

    if (_cipher === "vertical") {
        vertical();
    }

    if (_cipher === "shannon") {
        getAlphabet(); shannon(alphabetStandard);
    }

    if (_cipher === "gamming") {
        gamming();
    }

    if (_cipher === "A5_1") {
        A5_1();
    }

    if (_cipher === "A5_2") {
        A5_2();
    }

    if (_cipher === "magma") {
        magma();
    }

    if (_cipher === "aes") {
        aes();
    }

    if (_cipher === "grasshopper") {
        grasshopper();
    }

    if (_cipher === "rsa") {
        rsa();
    }

    if (_cipher === "elgamal") {
        elgamal();
    }

    if (_cipher === "ecc") {
        ecc();
    }

    if (_cipher === "gost94") {
        gost94();
    }

    if (_cipher === "gost12") {
        gost12();
    }

    if (_cipher === "rsaDigital") {
        rsaDigital();
    }

    if (_cipher === "elgamalDigital") {
        elgamalDigital();
    }

    if (_cipher === "diffieHellman") {
        diffieHellman();
    }
}


function replaceSymbols(_string, oldSymbol, newSymbol) { // замена букв
    _string= _string.replace(new RegExp(oldSymbol,'g'), newSymbol);
    return _string;
}

function delUnnecessarySymbols(_string, _symbolsArray) { // удаляем из строки символы, которых нет в алфавите
    let _stringArray = _string.split("");
    _string = "";
    _stringArray.forEach(function(_symbol) {
        if (_symbolsArray.indexOf(_symbol) !== -1) _string += _symbol;
    });
    return _string;
}


function result(_string) {
    $('#result').empty();
    $('#result').append(_string);
    $('#copy').show();
    $('#result_text').show();
}

function cipherSwitching() { // при переключении на новый шифр
    $('#result').empty();
    $('#text').val("");
    $('#key').val("");
    $('#copy').hide();
    $('#keys').hide().empty();
    $('#matrix').empty();
    $('#result_text').hide();
    $('#matrix-block').hide();
    $("#encrypt").empty().append("Зашифровать");
    $("#decrypt").empty().append("Расшифровать");
}

$(document).ready(function() {
    $('.menu__item').click(function() {  // по клику на другой шифр
        cipherSwitching();

        $('.menu__item').removeClass('active');
        $(this).addClass('active');

        let cipher = $(this).data("cipher"); // получаем название шифра

        ["key", "encrypt", "decrypt", "text", "matrix-block", "alphabet"].forEach(function(field) {
            $('#' + field).hide(); // перед отображением скроем все поля
        });

        currentCipher = cipher; // меняем текущий шифр
        cipherButton(fieldsArray[currentCipher]); // отображаем только нужные поля
    });

});

$("#encrypt").click(function () {
    typeOperation = "encrypt";
    if (fieldsValidation()) chooseCipher(currentCipher);
});

$("#decrypt").click(function () {
    typeOperation = "decrypt";
    if (fieldsValidation()) chooseCipher(currentCipher);
});

$("#copy").click(function () {
    copytext("#result");
});

