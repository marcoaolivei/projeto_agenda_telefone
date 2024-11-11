const form = document.getElementById('form-atualizar');
let linhas = '';
const atividades = [];


form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (numeroTelefone()) {
        adicionarLinha();
        atualizarTabela();
        contarContatos();
    } else {
        alert('Número de telefone inválido!');
    }
});

function numeroTelefone () {
    const inputTelefoneElement = document.getElementById('numero-telefone');
    let inputTelefone = inputTelefoneElement.value.replace(/\D/g, '');

    // Aplica a máscara (XX) XXXX-XXXX ou (XX) XXXXX-XXXX dependendo do tamanho
    if (inputTelefone.length > 10) {
        inputTelefoneElement.value = `(${inputTelefone.slice(0, 2)}) ${inputTelefone.slice(2, 7)}-${inputTelefone.slice(7, 11)}`;
    } else {
        inputTelefoneElement.value = `(${inputTelefone.slice(0, 2)}) ${inputTelefone.slice(2, 6)}-${inputTelefone.slice(6, 10)}`;
    }

    // Valida o número de telefone usando regex
    const telefoneFormatado = inputTelefoneElement.value;
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Regex para os formatos especificados
    return regex.test(telefoneFormatado); // Retorna true se o telefone estiver no formato correto
};

function adicionarLinha () {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputTelefoneElement = document.getElementById('numero-telefone');

    if (atividades.includes(inputNomeContato.value)) {
        alert(`Contato ${inputNomeContato.value} já cadastrado!`);
    } else {
        atividades.push(inputNomeContato.value);

        let linha = '<tr>';
        linha += `<td>${inputNomeContato.value}</td>`;
        linha += `<td>${inputTelefoneElement.value}</td>`;
        linha += '</tr>';
        linhas += linha
    }

    inputNomeContato.value = '';
    inputTelefoneElement.value = '';
}

function atualizarTabela () {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function contarContatos () {
    const totalContatos = document.getElementById('total-contatos');
    totalContatos.textContent = atividades.length;
}
    
