// Opcional: adicionar funcionalidade ao clicar em "Comprar"
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Produto adicionado ao carrinho!');
    });
});