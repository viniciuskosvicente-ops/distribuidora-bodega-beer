/* ============================================  
   Drinks & Co. — Script (JavaScript)  
   ============================================ */  

// ===== CONFIGURAÇÕES DO WHATSAPP =====  
// Substitua pelo seu número real no formato: 55 + DDD + número  
const WHATSAPP_NUMBER = '5500000000000';  
const WHATSAPP_MESSAGE_PREFIX = 'Olá! Vim pelo site da Drinks & Co.';  

// ===== FUNÇÃO: GERAR LINK DO WHATSAPP =====  
function gerarLinkWhatsApp(produto, preco) {  
    const mensagem = `${WHATSAPP_MESSAGE_PREFIX}\n\nQuero pedir: ${produto}\nValor: ${preco}`;  
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;  
}  

// ===== MENU RESPONSIVO (HAMBÚRGUER) =====  
document.addEventListener('DOMContentLoaded', () => {  
    const menuIcon = document.querySelector('.menu-icon');  
    const navLinks = document.getElementById('navLinks');  

    if (menuIcon && navLinks) {  
        // Abrir/fechar menu  
        menuIcon.addEventListener('click', () => {  
            navLinks.classList.toggle('active');  
        });  

        // Fechar menu ao clicar em um link (mobile)  
        navLinks.querySelectorAll('a').forEach(link => {  
            link.addEventListener('click', () => {  
                navLinks.classList.remove('active');  
            });  
        });  
    }  

    // ===== DESTACAR LINK ATIVO CONFORME SCROLL =====  
    const sections = document.querySelectorAll('section[id]');  
    const navAnchors = document.querySelectorAll('.nav-links a');  

    function destacarLinkAtivo() {  
        let posicaoAtual = window.scrollY + 100;  

        sections.forEach(section => {  
            if (posicaoAtual >= section.offsetTop && posicaoAtual < section.offsetTop + section.offsetHeight) {  
                const id = section.getAttribute('id');  
                navAnchors.forEach(link => {  
                    link.classList.remove('active');  
                    if (link.getAttribute('href') === `#${id}`) {  
                        link.classList.add('active');  
                    }  
                });  
            }  
        });  
    }  

    window.addEventListener('scroll', destacarLinkAtivo);  

    // ===== BOTÕES "PEDIR" → WHATSAPP =====  
    const orderButtons = document.querySelectorAll('.order-btn');  

    orderButtons.forEach(btn => {  
        btn.addEventListener('click', function () {  
            const card = this.closest('.card');  
            if (!card) return;  

            const nomeProduto = card.querySelector('h3').textContent.trim();  
            const preco = card.querySelector('.price').textContent.trim();  

            window.open(gerarLinkWhatsApp(nomeProduto, preco), '_blank');  
        });  
    });  

    // ===== ANIMAÇÃO DE ENTRADA DOS CARDS =====  
    // Usa IntersectionObserver para revelar elementos ao rolar  
    if ('IntersectionObserver' in window) {  
        const cards = document.querySelectorAll('.card');  

        const observer = new IntersectionObserver((entries) => {  
            entries.forEach((entry, index) => {  
                if (entry.isIntersecting) {  
                    // Pequeno atraso em cascata para efeito suave  
                    setTimeout(() => {  
                        entry.target.style.opacity = '1';  
                        entry.target.style.transform = 'translateY(0)';  
                    }, index * 100);  
                    observer.unobserve(entry.target);  
                }  
            });  
        }, { threshold: 0.15 });  

        cards.forEach(card => {  
            card.style.opacity = '0';  
            card.style.transform = 'translateY(30px)';  
            card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';  
            observer.observe(card);  
        });  
    }  

    // ===== ANIMAÇÃO DO BOTÃO "PEDIR PELO WHATSAPP" =====  
    const whatsappBtn = document.querySelector('a[href*="wa.me"]');  
    if (whatsappBtn) {  
        whatsappBtn.addEventListener('click', () => {  
            // Caso queira registrar clique ou analytics aqui  
            console.log('Clique no botão do WhatsApp (pedido geral)');  
        });  
    }  