
const searchAddress = async (cepParam) => {
    const mensagemErro = document.querySelector('#erro');
    mensagemErro.textContent = '';
    try {
        const cep = await fetch(`https://viacep.com.br/ws/${cepParam}/json/`);
        const cepJson = await cep.json();

        if (cepJson.erro) {
            throw Error('CEP não existente.');
        }

        const cidade = document.querySelector('#cidade');
        const logradouro = document.querySelector('#endereco');
        const estado = document.querySelector('#estado');

        cidade.value = cepJson.localidade;
        logradouro.value = cepJson.logradouro;
        estado.value = cepJson.uf;
        
        return cepJson;
    } catch (err) {
        console.error(err);
        mensagemErro.textContent = 'CEP inválido. Tente novamente!';
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => searchAddress(cep.value));