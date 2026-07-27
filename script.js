document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Você pode enviar o formulário via AJAX aqui se desejar
    // Para este exemplo, apenas exibe uma mensagem de confirmação

    const confirmacao = document.getElementById('mensagem-confirmacao');
    confirmacao.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;

    // Limpar o formulário
    document.getElementById('form-contato').reset();
});