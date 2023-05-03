let formPost = document.getElementById('form-post');
let postCodigo = document.getElementById('codigo-ativo');
let cnpjEmpresa = document.getElementById('cnpj-empresa');



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



postCodigo.addEventListener('input', (e) => {
    postCodigo.value = e.target.value.toUpperCase();
})

formPost.addEventListener('submit', (event) => {
    try{
        event.preventDefault()
        const regexCodePattern = /^[A-Z]{4}\d{1,2}$/;
    
        let cnpjPattern = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/;

        if(!cnpjPattern.test(cnpjEmpresa.value)){
            throw "CNPJ Invalido"
        }

        if (!regexCodePattern.test(postCodigo.value)) {
            // If the input does not match the pattern, show the error message
            throw "Codigo Invalido"
        }

        formPost.submit();
    }
    catch(err){
        showFormError(err)
    }
})


function showFormError(msg){
    const errorArea = document.getElementById('erro-msg')
    errorArea.textContent = msg;
}