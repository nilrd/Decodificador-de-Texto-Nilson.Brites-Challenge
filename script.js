document.getElementById('input-texto').addEventListener('keyup', function() {
    const maxLength = 300;
    if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
    }
    this.value = this.value.toLowerCase();
    autoResizeTextarea(this);

    if (this.value === '') {
        document.getElementById('output-texto').value = '';
        document.getElementById('output-area').classList.add('hide');
        document.getElementById('initial-message').style.display = 'block';
    } else {
        document.getElementById('initial-message').style.display = 'none';
    }
});

document.getElementById('btn-criptografar').addEventListener('click', function() {
    var texto = document.getElementById('input-texto').value;
    if (texto.trim() === '') {
        alert('Por favor, insira um texto para criptografar.');
        return;
    }
    processarTexto('criptografar');
});

document.getElementById('btn-descriptografar').addEventListener('click', function() {
    var texto = document.getElementById('input-texto').value;
    if (texto.trim() === '') {
        alert('Por favor, insira um texto para descriptografar.');
        return;
    }
    processarTexto('descriptografar');
});

document.getElementById('btn-copiar').addEventListener('click', function() {
    copiarTexto();
});

function processarTexto(acao) {
    var texto = document.getElementById('input-texto').value.toLowerCase();
    var errorMessage = document.getElementById('error-message');
    
    if (/[^a-z\s]/.test(texto)) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Por favor, insira apenas letras minúsculas sem acentos ou caracteres especiais.";
        errorMessage.focus(); 
        return;
    }
    errorMessage.style.display = 'none';

    var textoFinal;
    if (acao === 'criptografar') {
        textoFinal = texto.replace(/e/g, 'enter')
                          .replace(/i/g, 'imes')
                          .replace(/a/g, 'ai')
                          .replace(/o/g, 'ober')
                          .replace(/u/g, 'ufat');
    } else if (acao === 'descriptografar') {
        textoFinal = texto.replace(/enter/g, 'e')
                          .replace(/imes/g, 'i')
                          .replace(/ai/g, 'a')
                          .replace(/ober/g, 'o')
                          .replace(/ufat/g, 'u');
    }

    document.getElementById('output-texto').value = textoFinal;
    showOutputArea();
    autoResizeTextarea(document.getElementById('output-texto'));
}

function copiarTexto() {
    var textoCopiado = document.getElementById('output-texto');
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textoCopiado.value)
        .then(() => {
            var errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Texto copiado para a área de transferência!';
            errorMessage.focus();  
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2000);
        })
        .catch(err => {
            var errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Erro ao copiar o texto: ' + err;
            errorMessage.focus();  
        });
}

function showOutputArea() {
    document.getElementById('output-area').classList.remove('hide');
    document.getElementById('output-texto').focus(); 
}

function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    const maxHeight = window.innerHeight - 200;
    if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = maxHeight + 'px';
    } else {
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}

document.getElementById('input-texto').addEventListener('input', function() {
    autoResizeTextarea(this);
    if (!this.value) {
        document.getElementById('output-texto').value = '';
        document.getElementById('output-area').classList.add('hide');
        document.getElementById('initial-message').style.display = 'block';
    }
});

document.getElementById('output-texto').addEventListener('input', function() {
    autoResizeTextarea(this);
});
