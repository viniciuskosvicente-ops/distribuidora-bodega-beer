// ==================== DADOS DOS PRODUTOS ====================  
const produtos = [  
    // VODKA  
    {  
        id: 1,  
        nome: "Copão de Vodka + Energético",  
        categoria: "vodka",  
        descricao: "Copão caprichado de vodka com energético gelado e gelo.",  
        preco: 25.00,  
        imagem: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",  
        classe: "table-drink"  
    },  
    {  
        id: 2,  
        nome: "Copão de Vodka com Limão",  
        categoria: "vodka",  
        descricao: "Vodka premium, limão espremido na hora e muito gelo.",  
        preco: 28.00,  
        imagem: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400"  
    },  
    {  
        id: 3,  
        nome: "Vodka Red Bull",  
        categoria: "vodka",  
        descricao: "Clássico com vodka e energético red bull.",  
        preco: 30.00,  
        imagem: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400"  
    },  

    // GIN  
    {  
        id: 4,  
        nome: "Gin Tônica Clássico",  
        categoria: "gin",  
        descricao: "Gin premium com água tônica, limão siciliano e zimbro.",  
        preco: 32.00,  
        imagem: "https://images.unsplash.com/photo-1551538829-6c037c2cbf53?w=400"  
    },  
    {  
        id: 5,  
        nome: "Gin de 10 com Tônica",  
        categoria: "gin",  
        descricao: "O famoso gin de 10, servido com tônica e frutas vermelhas.",  
        preco: 35.00,  
        imagem: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400"  
    },  
    {  
        id: 6,  
        nome: "Brazilian Gin",  
        categoria: "gin",  
        descricao: "Gin importado com toque tropical de frutas nacionais.",  
        preco: 38.00,  
        imagem: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?w=400"  
    },  

    // WHISKY  
    {  
        id: 7,  
        nome: "Whisky Red Label",  
        categoria: "whisky",  
        descricao: "O clássico Red Label, puro ou no copão com energético.",  
        preco: 45.00,  
        imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400"  
    },  
    {  
        id: 8,  
        nome: "Whisky Black Label",  
        categoria: "whisky",  
        descricao: "Blend sofisticado com notas de fumaça e baunilha.",  
        preco: 60.00,  
        imagem: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400"  
    },  
    {  
        id: 9,  
        nome: "Whisky com Energético",  
        categoria: "whisky",  
        descricao: "Whisky variado com energético e muito gelo no copão.",  
        preco: 42.00,  
        imagem: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"  
    },  
    {  
        id: 10,  
        nome: "Whisky com Cola",  
        categoria: "whisky",  
        descricao: "Blend suave com cola e limão. Refrescante do jeito certo.",  
        preco: 40.00,  
        imagem: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400"  
    }  
];  

// ==================== ESTADO DO CARRINHO ====================  
let carrinho = [];  

// ==================== RENDERIZAR PRODUTOS ====================  
const grid = document.getElementById('productGrid');  

function renderizarProdutos(filtro = 'all') {  
    grid.innerHTML = '';  
    const filtrados = filtro === 'all'  
        ? produtos  
        : produtos.filter(p => p.categoria === filtro);  

    filtrados.forEach(produto => {  
        // Escolhe uma imagem adequada por categoria se a padrão não tiver classe  
        const card = document.createElement('div');  
        card.className = 'product-card';  

        const img = document.createElement('img');  
        img.src = produto.imagem;  
        img.alt = produto.nome;  

        const info = document.createElement('div');  
        info.className = 'product-info';  
        info.innerHTML = `  
            <span class="product-category">${categoriaLabel(produto.categoria)}</span>  
            <h3 class="product-name">${produto.nome}</h3>  
            <p class="product-desc">${produto.descricao}</p>  
            <div class="product-bottom">  
                <span class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>  
                <button class="add-btn" onclick="addToCart(${produto.id})">Adicionar</button>  
            </div>  
        `;  

        card.appendChild(img);  
        card.appendChild(info);  
        grid.appendChild(card);  
    });  
}  

function categoriaLabel(cat) {  
    const labels = {  
        vodka: 'Vodka',  
        gin: 'Gin',  
        whisky: 'Whisky'  
    };  
    return labels[cat] || cat;  
}  

// ==================== FILTROS ====================  
document.querySelectorAll('.filter-btn').forEach(btn => {  
    btn.addEventListener('click', () => {  
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));  
        btn.classList.add('active');  
        renderizarProdutos(btn.dataset.filter);  
    });  
});  

// ==================== CARRINHO ====================  
function addToCart(id) {  
    const produto = produtos.find(p => p.id === id);  
    const existente = carrinho.find(item => item.id === id);  

    if (existente) {  
        existente.qty++;  
    } else {  
        carrinho.push({ ...produto, qty: 1 });  
    }  

    atualizarCarrinho();  
    mostrarToast(`${produto.nome} adicionado ao carrinho! 🍾`);  
}  

function atualizarCarrinho() {  
    const totalItens = carrinho.reduce((sum, item) => sum + item.qty, 0);  
    document.getElementById('cartCount').textContent = totalItens;  

    // Renderizar itens no modal  
    const cartItems = document.getElementById('cartItems');  
    if (carrinho.length === 0) {  
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio 😢</p>';  
    } else {  
        cartItems.innerHTML = '';  
        carrinho.forEach(item => {  
            const div = document.createElement('div');  
            div.className = 'cart-item';  

            const precoTotal = item.preco * item.qty;  
            div.innerHTML = `  
                <div class="cart-item-info">  
                    <strong>${item.nome}</strong>  
                    <div class="cart-item-qty">  
                        <button class="qty-btn" onclick="mudarQty(${item.id}, -1)">−</button>  
                        <span>${item.qty}</span>  
                        <button class="qty-btn" onclick="mudarQty(${item.id}, 1)">+</button>  
                        <span>R$ ${precoTotal.toFixed(2).replace('.', ',')}</span>  
                        <button class="remove-btn" onclick="removerItem(${item.id})">Remover</button>  
                    </div>  
                </div>  
            `;  
            cartItems.appendChild(div);  
        });  
    }  

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.qty), 0);  
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;  
}  

function mudarQty(id, delta) {  
    const item = carrinho.find(i => i.id === id);  
    if (item) {  
        item.qty += delta;  
        if (item.qty <= 0) {  
            carrinho = carrinho.filter(i => i.id !== id);  
        }  
        atualizarCarrinho();  
    }  
}  

function removerItem(id) {  
    carrinho = carrinho.filter(i => i.id !== id);  
    atualizarCarrinho();  
}  

// ==================== MODAL DO CARRINHO ====================  
const cartModal = document.getElementById('cartModal');  
const cartBtn = document.getElementById('cartBtn');  
const closeCart = document.getElementById('closeCart');  

cartBtn.addEventListener('click', () => {  
    cartModal.classList.add('active');  
});  

closeCart.addEventListener('click', () => {  
    cartModal.classList.remove('active');  
});  

window.addEventListener('click', (e) => {  
    if (e.target === cartModal) {  
        cartModal.classList.remove('active');  
    }  
});  

// ==================== FINALIZAR PEDIDO ====================  
document.getElementById('checkoutBtn').addEventListener('click', () => {  
    if (carrinho.length === 0) {  
        mostrarToast('Adicione itens ao carrinho primeiro!');  
        return;  
    }  

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.qty), 0);  
    mostrarToast(`Pedido realizado! Total: R$ ${total