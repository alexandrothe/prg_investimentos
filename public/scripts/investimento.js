const filteIcon = document.querySelector('.filter-icon');
const updatePopuop = document.querySelector('.filter-field');
const resetFilterBtn = document.querySelector('#reset-filter-btn');
const applyFilterBtn = document.getElementById('apply-filter-btn');
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



applyFilterBtn.addEventListener('click',  () => {

    let urlQuery = '';

    if(filterData.value){ urlQuery += `data=${filterData.value}&` }
    if(filterCodigoAtivo.value){  urlQuery += `codigoAtivo=${filterCodigoAtivo.value}&` }
    if(filterCompraVenda.value){ urlQuery += `compraVenda=${filterCompraVenda.value}&` }
    if(filterValorFinal.value){ urlQuery += `valorFinal=${filterValorFinal.value}&`}

    //  {} length = 2  so ist null

    fetch('http://localhost:4613/app/investimentos/data?filter=true&'+urlQuery)
    .then( response => response.json())
    .then( data => {
        let {codigoList, allInvestimentos} = data;
        
        displayData(allInvestimentos,2)
    })
    // if(!urlQuery.length){ window.location.href = '/app/investimentos?filter=false' }
    // else{ window.location.href = '/app/investimentos?filter=true&'+urlQuery }
    


});


function displayData(allInvestimentos, codigoList){

    let itemField = document.querySelector('.item-field');
    let buttonField = document.querySelector('.button-field');

    allInvestimentos.forEach( item => {
        itemField.innerHTML += `
        <div class="item">
            <p>${item.data}</p>
            <p>${item.codigoAtivo}</p>
            <p>${item.quantidade }</p>
            <p>${item.valorUnidade }</p>
            <p>${item.compraVenda }</p>
            <p>${item.quantidade * item.valorUnidade }</p>
            <p>${item.taxaCorretagem }</p>
            <p>${((item.quantidade * item.valorUnidade) * 0.0003 ).toFixed(2) }</p>
            <p>
            ${
                item.compraVenda === 'c'
                ? (item.quantidade * item.valorUnidade + (item.quantidade * item.valorUnidade) * 0.0003 + item.taxaCorretagem).toFixed(2)
                : (item.quantidade * item.valorUnidade - (item.quantidade * item.valorUnidade) * 0.0003 + item.taxaCorretagem).toFixed(2)
            }
            </p>
        </div> `

        buttonField.innerHTML += `
        <div class="button-item">
            <a href="http://localhost:4613/app/investimentos/update/${item.id}/">
                <div class="update-icon">
                    <i class="fa-solid fa-pencil"></i>
                </div>
            </a>
            <div class="delete-icon">
                <i class="fa-solid fa-x" onclick="deleteItem(event)"  data-item-id="${ item.id }"></i>
            </div>
        </div>
        `
    });

}

( () => {
    fetch('http://localhost:4613/app/investimentos/data')
    .then( response => response.json())
    .then( data => {
        let { codigoList, allInvestimentos} = data;

        displayData(allInvestimentos, codigoList);
    })
})()