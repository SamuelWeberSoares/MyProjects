// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação do header no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(37, 99, 235, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navegação ativa baseada na posição do scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animação dos círculos flutuantes
document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.floating-circle');
    
    circles.forEach((circle, index) => {
        // Movimento aleatório suave
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            circle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
});

// Efeito de parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start).toLocaleString();
        
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        }
    }, 16);
}

// Inicializar contadores quando visíveis
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            
            // Extrair número do texto
            const number = text.match(/\d+/);
            if (number) {
                const targetNumber = parseInt(number[0]);
                animateCounter(element, targetNumber);
            }
            
            counterObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number:not(.dynamic-counter)');
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Inicializar contador dinâmico
    initDynamicCounter();
});

// Contador dinâmico para clientes (varia entre 4.163 e 8.511)
function initDynamicCounter() {
    const dynamicCounter = document.querySelector('.dynamic-counter');
    if (!dynamicCounter) return;
    
    let currentValue = 4163; // Valor inicial
    const minValue = 4163;
    const maxValue = 8511;
    
    // Função para formatar número com ponto
    function formatNumber(num) {
        return num.toLocaleString('pt-BR');
    }
    
    // Atualizar contador a cada 3-7 segundos
    function updateCounter() {
        // Incremento aleatório entre 1 e 15
        const increment = Math.floor(Math.random() * 15) + 1;
        
        // Sempre incrementar, nunca diminuir
        currentValue += increment;
        
        // Se chegou próximo ao máximo, reiniciar do mínimo (simulando novo período)
        if (currentValue > maxValue) {
            currentValue = minValue + Math.floor(Math.random() * 100); // Começar próximo ao mínimo
        }
        
        // Atualizar o display com animação
        animateCounterUpdate(dynamicCounter, currentValue);
        
        // Próxima atualização em 3-7 segundos
        const nextUpdate = Math.random() * 4000 + 3000; // 3-7 segundos
        setTimeout(updateCounter, nextUpdate);
    }
    
    // Animação suave para atualização do contador
    function animateCounterUpdate(element, newValue) {
        element.style.transform = 'scale(1.05)';
        element.style.color = 'var(--accent-color)';
        
        setTimeout(() => {
            element.textContent = formatNumber(newValue);
            element.style.transform = 'scale(1)';
            element.style.color = 'var(--primary-color)';
        }, 200);
    }
    
    // Iniciar o contador após 2 segundos
    setTimeout(updateCounter, 2000);
}

// Formulário de contato (se existir)
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Adicionar efeito de clique
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Se for um link do WhatsApp, abrir
            if (button.textContent.includes('Fale Conosco') || button.textContent.includes('Contato')) {
                window.open('https://api.whatsapp.com/send?phone=5549998171239&text=Olá! Gostaria de mais informações sobre os serviços da Finax.', '_blank');
            }
        });
    });
});

// Adicionar loading state para botões
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Carregando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Menu mobile (para futuras implementações)
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    // Adicionar classe para indicar JavaScript carregado
    header.classList.add('js-loaded');
    
    // Efeito de hover personalizado para cards
    const cards = document.querySelectorAll('.stat-card, .service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
});

// Função para melhorar a performance das animações
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar eventos de scroll
const optimizedScroll = debounce(() => {
    // Lógica de scroll otimizada
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Preloader simples
document.addEventListener('DOMContentLoaded', () => {
    // Simular carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Animações de entrada mais suaves
const fadeInElements = document.querySelectorAll('.hero-badge, .section-badge');
fadeInElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, index * 200);
});

console.log('🎉 Finax - Design Branco carregado com sucesso!'); 

// --- Simulador Consignado Reutilizável ---
function renderSimuladorConsignado(containerId, tipoConvenio, subdivisao) {
    // Usar dados embutidos no HTML em vez de localStorage
    const key = subdivisao ? `${tipoConvenio}_${subdivisao}` : tipoConvenio;
    const dadosCalculadora = window.calculadoraData && window.calculadoraData[key];
    const prazos = dadosCalculadora && dadosCalculadora.prazos ? dadosCalculadora.prazos : [];
    
    if (prazos.length === 0) {
        document.getElementById(containerId).innerHTML = `
            <div class="calc-container">
                <div class="calc-title">🔧 Simulador em Configuração</div>
                <p style="text-align: center; color: var(--gray-600); margin: 2rem 0;">
                    Os prazos e coeficientes ainda não foram configurados para este produto.
                    <br><small>Entre em contato conosco para mais informações.</small>
                </p>
            </div>`;
        return;
    }
    
    const html = `
    <div class="calc-container">
        <div class="calc-title">💰 Simule seu Crédito</div>
        <form id="simulador-form-${containerId}">
            <div class="calc-section">
                <label class="calc-label">🎯 Tipo de Simulação</label>
                <div class="flex-row">
                    <label><input type="radio" name="tipo-simulacao-${containerId}" value="parcela" checked> 💳 Valor da Parcela</label>
                    <label><input type="radio" name="tipo-simulacao-${containerId}" value="liberado"> 💵 Valor Liberado</label>
                </div>
                <input class="calc-input" type="number" id="valor-${containerId}" min="0" step="0.01" placeholder="Digite o valor em R$..." required>
            </div>
            <button type="submit" class="calc-btn">🚀 Simular Agora</button>
        </form>
        <div class="calc-results" id="calc-results-${containerId}"></div>
    </div>`;
    
    document.getElementById(containerId).innerHTML = html;
    
    document.getElementById(`simulador-form-${containerId}`).onsubmit = function(e) {
        e.preventDefault();
        const tipo = document.querySelector(`input[name='tipo-simulacao-${containerId}']:checked`).value;
        const valor = parseFloat(document.getElementById(`valor-${containerId}`).value);
        
        if (!valor || prazos.length === 0) {
            alert('Por favor, digite um valor válido!');
            return;
        }
        
        let resultHtml = '<h3 style="text-align: center; color: var(--primary-color); margin-bottom: 1rem;">📊 Resultado da Simulação</h3>';
        resultHtml += '<table class="calc-table"><thead><tr><th>📅 Prazo</th>';
        
        if (tipo === 'parcela') {
            resultHtml += '<th>💰 Valor Liberado</th>';
        } else {
            resultHtml += '<th>💳 Valor da Parcela</th>';
        }
        
        resultHtml += '</tr></thead><tbody>';
        
        prazos.forEach(p => {
            if (tipo === 'parcela') {
                // Para simulação por parcela, usa coeficiente_parcela para calcular valor liberado
                const liberado = (valor / p.coeficiente_parcela).toFixed(2);
                resultHtml += `<tr><td>${p.prazo} meses</td><td>R$ ${Number(liberado).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td></tr>`;
            } else {
                // Para simulação por valor liberado, usa coeficiente_liberado para calcular parcela
                const parcela = (valor * p.coeficiente_liberado).toFixed(2);
                resultHtml += `<tr><td>${p.prazo} meses</td><td>R$ ${Number(parcela).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td></tr>`;
            }
        });
        
        resultHtml += '</tbody></table>';
        resultHtml += '<p style="text-align: center; margin-top: 1rem; color: var(--gray-600); font-size: 0.9rem;">💡 <em>Valores aproximados para simulação. Entre em contato para condições finais.</em></p>';
        
        document.getElementById(`calc-results-${containerId}`).innerHTML = resultHtml;
    };
} 