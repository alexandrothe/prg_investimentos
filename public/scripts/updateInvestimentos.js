const data = document.getElementById('data-put');
const taxaCorretagem = document.getElementById('taxa-corretagem-put');
const codigo = document.getElementById('codigo-put');
const quantidade = document.getElementById('quantidade-put');
const valorUnitario = document.getElementById('valor-unitario-put');
const compraVenda = document.getElementById('compra-venda-put');


const putFormBtn = document.getElementById('put-form-btn');
const erroField = document.getElementById("erro-msg");


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

putFormBtn.addEventListener('click', () => {
    try{
        let idToUpdate = window.location.href.split('/')[6];


        const  regexCodePattern = /^[A-Z]{4}\d{1,2}$/;
        if (!regexCodePattern.test(codigo.value)) {
            // If the input does not match the pattern, show the error message
            throw "Codigo Invalido"
        }
        if(!validateDate(data.value)){
            throw "Data invalido"
        }
        if(quantidade.value == "" || taxaCorretagem.value == "" || valorUnitario.value == "" ){
            throw "Formularo não pode estar vazio!!!"
        }
    
        const dataToPut = {
            data: data.value,
            codigo: codigo.value,
            quantidade: quantidade.value,
            valorUnitario: valorUnitario.value,
            compraVenda: compraVenda.value,
            taxaCorretagem: taxaCorretagem.value,
        }

        fetch('http://localhost:3000/app/investimentos/update/'+ idToUpdate, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dataToPut)
        })
        .then( (response) => {
            console.log(response)
            return response.json()
        })
        .then( (data) => {
            if( data.ok){
                window.location.href = "http://localhost:3000/app/investimentos/page"
            }
            else{
                throw Error(data.msg);
            }
        })
        .catch( err => console.error(err));

        
        erroField.textContent = "";
    }
    catch(err){
        erroField.textContent = `Error: ${err}`;
    }
});