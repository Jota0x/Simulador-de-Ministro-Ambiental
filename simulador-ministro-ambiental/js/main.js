// Estado do jogo
const estado = {
    clima: 50,      // Aprovação pública/sustentabilidade
    economia: 50,   // Saúde econômica
    tempo: 5,       // Anos restantes de mandato
    decisaoAtual: 0,
    historico: {
        clima: [50],
        economia: [50],
        anos: [0]
    },
    conselheirosAtivos: [],
    eventosAleatorios: [
        {
            titulo: "Protestos Ambientais!",
            descricao: "Manifestantes bloqueiam rodovias exigindo ação climática imediata.",
            impacto: { clima: -10, economia: -5 }
        },
        {
            titulo: "Crise Econômica Global",
            descricao: "Mercados em queda exigem medidas pró-negócios para evitar recessão.",
            impacto: { clima: -5, economia: -15 }
        },
        {
            titulo: "Desastre Natural",
            descricao: "Enchentes atingem principais cidades, aumentando pressão por ações.",
            impacto: { clima: -15, economia: -10 }
        },
        {
            titulo: "Inovação Tecnológica",
            descricao: "Nova bateria revolucionária torna energia renovável mais barata!",
            impacto: { clima: +15, economia: +5 }
        }
    ],
    eventoAtivo: null
};

// Elementos DOM
const elementos = {
    painelDecisao: document.getElementById('painel-decisao'),
    resultadoFinal: document.getElementById('resultado-final'),
    climaDisplay: document.getElementById('clima'),
    economiaDisplay: document.getElementById('economia'),
    tempoDisplay: document.getElementById('tempo'),
    conselheirosPanel: document.getElementById('conselheiros-painel'),
    eventoAleatorioPanel: document.getElementById('evento-aleatorio-painel'),
    graficoCanvas: document.getElementById('grafico-evolucao')
};

// Funções para conselheiros
function selecionarConselheiros() {
    // Embaralha e pega 3 conselheiros aleatórios
    const shuffled = [...conselheiros].sort(() => 0.5 - Math.random());
    estado.conselheirosAtivos = shuffled.slice(0, 3);
}

function renderizarConselheiros() {
    elementos.conselheirosPanel.innerHTML = '<h4 style="color: var(--verde-escuro); margin-bottom: 15px;">Conselheiros</h4>';
    
    estado.conselheirosAtivos.forEach(cons => {
        const div = document.createElement('div');
        div.className = 'conselheiro';
        div.innerHTML = `
            <div class="conselheiro-header">
                <div class="conselheiro-avatar">${cons.avatar}</div>
                <div class="conselheiro-info">
                    <h4 style="color: ${cons.cor}">
                        ${cons.nome}
                        <span class="conselheiro-tendencia tendencia-${cons.tendencia}">
                            ${cons.tendencia.toUpperCase()}
                        </span>
                    </h4>
                    <div class="conselheiro-cargo">${cons.cargo}</div>
                </div>
            </div>
            <p>"${cons.opiniao}"</p>
        `;
        elementos.conselheirosPanel.appendChild(div);
    });
}

// Eventos aleatórios
function verificarEventoAleatorio() {
    if (Math.random() < 0.3 && estado.decisaoAtual > 0) {
        const evento = estado.eventosAleatorios[Math.floor(Math.random() * estado.eventosAleatorios.length)];
        estado.eventoAtivo = evento;
        
        elementos.eventoAleatorioPanel.style.display = 'block';
        elementos.eventoAleatorioPanel.innerHTML = `
            <div class="evento-aleatorio">
                <h4>${evento.titulo}</h4>
                <p>${evento.descricao}</p>
            </div>
        `;
        
        // Aplicar impacto
        estado.clima += evento.impacto.clima;
        estado.economia += evento.impacto.economia;
        atualizarStatus();
    } else {
        elementos.eventoAleatorioPanel.style.display = 'none';
        estado.eventoAtivo = null;
    }
}

// Atualizar status
function atualizarStatus() {
    // Garantir que os valores estejam dentro dos limites
    estado.clima = Math.max(0, Math.min(100, estado.clima));
    estado.economia = Math.max(0, Math.min(100, estado.economia));
    
    elementos.climaDisplay.textContent = estado.clima;
    elementos.economiaDisplay.textContent = estado.economia;
    elementos.tempoDisplay.textContent = estado.tempo;
    
    // Atualizar cores
    elementos.climaDisplay.style.color = estado.clima > 60 ? 'var(--verde-claro)' : 
                                      estado.clima > 30 ? 'var(--dourado)' : 'var(--vermelho)';
    elementos.economiaDisplay.style.color = estado.economia > 60 ? 'var(--dourado)' : 
                                          estado.economia > 30 ? 'var(--verde-claro)' : 'var(--vermelho)';
}

// Carregar cenário
function carregarCenario() {
    if (estado.decisaoAtual < cenarios.length && estado.tempo > 0) {
        verificarEventoAleatorio();
        selecionarConselheiros();
        renderizarConselheiros();
        
        const cenarioAtual = cenarios[estado.decisaoAtual];
        
        let opcoesHTML = cenarioAtual.opcoes.map(opcao => `
            <div class="opcao ${opcao.classe}" onclick="tomarDecisao(${estado.decisaoAtual}, ${cenarioAtual.opcoes.indexOf(opcao)})">
                <h3>${opcao.titulo}</h3>
                <p>${opcao.descricao}</p>
                <div style="margin-top: 10px;">
                    <span class="impacto impacto-clima">Clima: ${opcao.impacto.clima > 0 ? '+' : ''}${opcao.impacto.clima}</span>
                    <span class="impacto impacto-economia">Economia: ${opcao.impacto.economia > 0 ? '+' : ''}${opcao.impacto.economia}</span>
                </div>
            </div>
        `).join('');

        elementos.painelDecisao.innerHTML = `
            <div class="cenario">
                <h2>${cenarioAtual.titulo}</h2>
                <p>${cenarioAtual.descricao}</p>
                <div class="opcoes">
                    ${opcoesHTML}
                </div>
            </div>
        `;

        atualizarStatus();
    } else {
        finalizarJogo();
    }
}

// Tomar decisão
function tomarDecisao(cenarioIndex, opcaoIndex) {
    const impacto = cenarios[cenarioIndex].opcoes[opcaoIndex].impacto;
    
    // Aplicar influência dos conselheiros
    estado.conselheirosAtivos.forEach(cons => {
        estado.clima += cons.influencia.clima;
        estado.economia += cons.influencia.economia;
    });
    
    // Aplicar impacto da decisão
    estado.clima += impacto.clima;
    estado.economia += impacto.economia;
    estado.tempo -= 1;
    estado.decisaoAtual += 1;
    
    // Atualizar histórico
    estado.historico.clima.push(estado.clima);
    estado.historico.economia.push(estado.economia);
    estado.historico.anos.push(5 - estado.tempo);
    
    atualizarStatus();
    atualizarGrafico();
    carregarCenario();
}

// Finalizar jogo
function finalizarJogo() {
    elementos.painelDecisao.style.display = 'none';
    elementos.resultadoFinal.style.display = 'block';
    
    let mensagem = '';
    let emoji = '';
    
    if (estado.tempo <= 0) {
        mensagem = "Seu mandato chegou ao fim. ";
        emoji = "⏳";
    }
    
    if (estado.clima >= 70 && estado.economia >= 50) {
        mensagem += "Você foi um líder visionário! Conseguiu equilibrar perfeitamente desenvolvimento e sustentabilidade.";
        emoji = "🌍✨";
    } else if (estado.clima >= 50) {
        mensagem += "Seu legado ambiental é positivo, mas a economia ficou fragilizada. Será lembrado como um idealista.";
        emoji = "🌱";
    } else if (estado.economia >= 60) {
        mensagem += "Impulsionou a economia, mas ao custo do meio ambiente. O mercado celebra, mas as futuras gerações sofrerão.";
        emoji = "📉";
    } else {
        mensagem += "Seu mandato foi marcado por crises em todas as áreas. A população está descontente e o país está mais vulnerável.";
        emoji = "💥";
    }
    
    elementos.resultadoFinal.innerHTML = `
        <h2>Relatório Final ${emoji}</h2>
        <p>${mensagem}</p>
        <div style="margin: 30px 0;">
            <p><strong>Aprovação Pública Final:</strong> ${estado.clima}/100</p>
            <p><strong>Desempenho Econômico Final:</strong> ${estado.economia}/100</p>
        </div>
        <button class="botao-reiniciar" onclick="reiniciarJogo()">Governar Novamente</button>
    `;
    
    criarGraficoFinal();
}

// Reiniciar jogo
function reiniciarJogo() {
    estado.clima = 50;
    estado.economia = 50;
    estado.tempo = 5;
    estado.decisaoAtual = 0;
    estado.historico = {
        clima: [50],
        economia: [50],
        anos: [0]
    };
    estado.eventoAtivo = null;
    
    elementos.painelDecisao.style.display = 'block';
    elementos.resultadoFinal.style.display = 'none';
    elementos.eventoAleatorioPanel.style.display = 'none';
    
    // Limpar o gráfico existente
    if (grafico) {
        grafico.destroy();
    }
    
    inicializarGrafico();
    carregarCenario();
}

// Iniciar jogo
window.onload = function() {
    inicializarGrafico();
    carregarCenario();
};