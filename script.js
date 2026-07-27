let carrinho = [];
let total = 0;

// Seleção de elementos do DOM
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

// Abrir e fechar modal do carrinho
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Adicionar produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
    cartCount.innerText = carrinho.length;
    cartItems.innerHTML = '';
    total = 0;

    carrinho.forEach((item) => {
        total += item.preco;
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.nome}</span> <span>R$ ${item.preco.toFixed(2)}</span>`;
        cartItems.appendChild(li);
    });

    cartTotalPrice.innerText = total.toFixed(2);
}

// Finalizar pedido via WhatsApp
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

    // Substitua pelo seu número de telefone com DDD (ex: 5511999999999)
    const numeroTelefone = "5500000000000"; 
    const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsapp, '_blank');
}