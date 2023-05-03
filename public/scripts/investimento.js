const filteIcon = document.querySelector('.filter-icon');
const updatePopuop = document.querySelector('.filter-field');
const resetFilterBtn = document.querySelector('#reset-filter-btn');
const formPost = document.getElementById('myForm');


/// Variables POST Form
const postData = document.getElementById('post-data');
const postCodigo = document.getElementById('post-codigo');
const postQuantidade = document.getElementById('post-quantidade');
const postValorUnitario = document.getElementById('post-valor-unitario');
const postCompraVenda = document.getElementById('post-compra-venda');
const postTaxaCorretagem = document.getElementById('post-taxa-corretagem');

/// Variables filter Inputs
const filterData = document.querySelector('#filter-data-investimento');
const filterCodigoAtivo = document.querySelector('#filter-codigo-ativo');
const filterCompraVenda = document.querySelector('#filter-compra-venda');
const filterValorFinal = document.querySelector('#filter-valor-final');

resetFilterBtn.addEventListener('click', (event) => {
    filterData.selectedIndex = 0
    filterCodigoAtivo.selectedIndex = 0
    filterCompraVenda.selectedIndex = 0
    filterValorFinal.selectedIndex = 0
})


/// when the user click the filter icon it will check if is open
/// if its alread open its gonna close and vice-versa
filteIcon.addEventListener('click', () => {
    if(updatePopuop.style.display == "none"){
        updatePopuop.style.display = "block"
    }
    else{
        console.log('is none')
        updatePopuop.style.display = "none"
    }
});

document.addEventListener('click', (event) => {
    if(!updatePopuop.contains(event.target) && !filteIcon.contains(event.target)){
        updatePopuop.style.display = 'none'
    }
});




//// check the valur of the POST form 
//// so the user can not enter wrong values

function validateDate(dateInput) {
    // Get the current date
    var currentDate = new Date();
    
    // Parse the input date string into a Date object
    var inputDate = new Date(dateInput.split("/").reverse().join("-"));
    
    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      // If the input date is invalid, show the error message
      return false;
    }
    
    // Check if the input date is after the current date
    if (inputDate.getTime() > currentDate.getTime()) {
      // If the input date is after the current date, show the error message
      return false;
    }
    
    return true;
}

formPost.addEventListener('submit', (event) => {
    try{
        event.preventDefault();
    
        console.log(postData.value)

        const  regexCodePattern = /^[A-Z]{4}\d{1,2}$/;
        if (!regexCodePattern.test(postCodigo.value)) {
            // If the input does not match the pattern, show the error message
            throw "Codigo Invalido"
        }

       if(!validateDate(postData.value)){
        throw "Data invalido"
       }
       if(postQuantidade.value == "" ||  postTaxaCorretagem.value == "" || postValorUnitario.value == "" ){
        throw "Formularo não pode estar vazio!!!"
       }

       formPost.submit()
    }
    catch(err){
        console.log(err)
    }
});

async function deleteItem(event){
    const idToDelete = event.target.getAttribute('data-item-id');

    await fetch('http://localhost:4613/app/investimentos/delete/'+idToDelete, {
        method:'DELETE'
    });

    window.location.href = "http://localhost:4613/app/investimentos"

}






postData.addEventListener('keydown', (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
    const currentValue = e.target.value
    
    if (!allowedKeys.includes(e.key) && currentValue.length >= 18) {
        e.preventDefault()
        return
    }
    
    if (e.key === 'Backspace' && /[.\/-]$/.test(currentValue)) {
        e.preventDefault()
        postData.value = currentValue.slice(0, -1)
        return
    }
    
    if (e.key === 'Delete' && /^[.\d]{2}[.]\d{3}[.]\d{3}[\/]\d{4}[-]?\d{2}$/.test(currentValue)) {
        e.preventDefault()
        postData.value = currentValue.slice(0, -1)
        return
    }
})
postData.addEventListener('input', (e) => {
    if(e.target.value.length == 2){
        postData.value += '/'
    }
    if (e.target.value.length === 5){
        postData.value += '/'
    }
})