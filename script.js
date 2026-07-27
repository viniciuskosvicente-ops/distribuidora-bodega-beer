let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const container = document.getElementById('itensCarrinho');
    container.innerHTML = '';

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-carrinho';
        itemDiv.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick="removerItem(${index})">Remover</button>
        `;
        container.appendChild(itemDiv);
    });

    document.getElementById('totalCarrinho').innerText = total.toFixed(2).replace('.', ',');
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada! Obrigado pelo pedido.');
    carrinho = [];
    atualizarCarrinho();
}