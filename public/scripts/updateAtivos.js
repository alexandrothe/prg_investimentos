const nomeEmpresa = document.getElementById('nome-put');
const cnpjEmpresa = document.getElementById('cnpj-put');
const codigo = document.getElementById('codigo-put');


const putFormBtn = document.getElementById('put-form-btn');
const erroField = document.getElementById("erro-msg");




cnpjEmpresa.addEventListener('keydown', (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
    const currentValue = e.target.value
    
    if (!allowedKeys.includes(e.key) && currentValue.length >= 18) {
        e.preventDefault()
        return
    }
    
    if (e.key === 'Backspace' && /[.\/-]$/.test(currentValue)) {
        e.preventDefault()
        cnpjEmpresa.value = currentValue.slice(0, -1)
        return
    }
    
    if (e.key === 'Delete' && /^[.\d]{2}[.]\d{3}[.]\d{3}[\/]\d{4}[-]?\d{2}$/.test(currentValue)) {
        e.preventDefault()
        cnpjEmpresa.value = currentValue.slice(0, -1)
        return
    }
})

cnpjEmpresa.addEventListener('input', (e) => {
    if(e.target.value.length == 2){
        cnpjEmpresa.value += '.'
    }
    if (e.target.value.length === 6){
        cnpjEmpresa.value += '.'
    }
    if (e.target.value.length === 10){
        cnpjEmpresa.value += '/'
    }
    if (e.target.value.length === 15){
        cnpjEmpresa.value += '-'
    }
})


putFormBtn.addEventListener('click', async () => {
    try{
        let idToUpdate = window.location.href.split('/')[6];

        console.log(idToUpdate)
        // event.preventDefault()
        const regexCodePattern = /^[A-Z]{4}\d{1,2}$/;
    
        let cnpjPattern = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/;

        if(!cnpjPattern.test(cnpjEmpresa.value)){
            throw "CNPJ Invalido"
        }

        if (!regexCodePattern.test(codigo.value)) {
            // If the input does not match the pattern, show the error message
            throw "Codigo Invalido"
        }

        const dataToPut = {
            nome:nomeEmpresa.value,
            cnpj:cnpjEmpresa.value,
            codigo: codigo.value
        }

        await fetch('http://localhost:4613/app/ativos/update/'+idToUpdate, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dataToPut)
        });

        window.location.href = "http://localhost:4613/app/ativos"
        
        erroField.textContent = "";
    }
    catch(err){
        erroField.textContent = `Error: ${err}`;
    }
});