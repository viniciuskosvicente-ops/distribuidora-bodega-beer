const produtos = [
    {
        nome: "Copão de Vodka com Energético",
        preco: "R$ 25,00",
        imagem: "https://images.unsplash.com/photo-1603906546653-7b5e9d5e0b0f?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80",
        descricao: "Vodka gelada com energético para animar sua festa!"
    },
    {
        nome: "Gin de 10 Anos",
        preco: "R$ 50,00",
        imagem: "https://images.unsplash.com/photo-1612831455541-3d7a7eebf1a8?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80",
        descricao: "Gin premium envelhecido de 10 anos, sabor único."
    },
    {
        nome: "Whisky de Frutas",
        preco: "R$ 45,00",
        imagem: "https://images.unsplash.com/photo-1616467165224-2b8efff6473f?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80",
        descricao: "Whisky com sabor de frutas variadas, perfeito para ocasiões especiais."
    },
    {
        nome: "Whisky Baileys Sabor Caramelo",
        preco: "R$ 55,00",
        imagem: "https://images.unsplash.com/photo-1600706006764-4f6c7f1d0684?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80",
        descricao: "Delicioso whisky com sabor de caramelo, ideal para sobremesas."
    }
];

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.className = 'product-image';

    const detalhes = document.createElement('div');
    detalhes.className = 'product-details';

    const titulo = document.createElement('h3');
    titulo.className = 'product-title';
    titulo.innerText = produto.nome;

    const preco = document.createElement('p');
    preco.className = 'product-price';
    preco.innerText = produto.preco;

    const descricao = document.createElement('p');
    descricao.innerText = produto.descricao;

    const botao = document.createElement('button');
    botao.className = 'btn-comprar';
    botao.innerText = 'Comprar';

    detalhes.appendChild(titulo);
    detalhes.appendChild(preco);
    detalhes.appendChild(descricao);
    detalhes.appendChild(botao);

    card.appendChild(img);
    card.appendChild(detalhes);

    return card;
}

const listaProdutos = document.getElementById('products');

produtos.forEach(produto => {
    const card = criarCardProduto(produto);
    listaProdutos.appendChild(card);
});