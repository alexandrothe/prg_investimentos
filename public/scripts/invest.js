const form = document.querySelector('#myForm')

form.addEventListener('submit', (event) =>  {

    event.preventDefault();

    var data = document.getElementById("data").value;
    var codigo = document.getElementById("codigo").value;
    var quantidade = parseInt(document.getElementById("quantidade").value);
    var valor_unitario = parseFloat(document.getElementById("valor_unitario").value);
    var compra_venda = document.getElementById("compra_venda").value;
    var taxa_corretagem = parseFloat(document.getElementById("taxa_corretagem").value);

    form.submit();

});