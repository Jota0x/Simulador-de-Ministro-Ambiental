// Gráficos
let grafico;

function inicializarGrafico() {
    const ctx = elementos.graficoCanvas.getContext('2d');
    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: estado.historico.anos,
            datasets: [
                {
                    label: 'Aprovação Pública',
                    data: estado.historico.clima,
                    borderColor: 'var(--verde-medio)',
                    backgroundColor: 'rgba(45, 106, 79, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Economia',
                    data: estado.historico.economia,
                    borderColor: 'var(--dourado)',
                    backgroundColor: 'rgba(212, 160, 23, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

function atualizarGrafico() {
    grafico.data.labels = estado.historico.anos;
    grafico.data.datasets[0].data = estado.historico.clima;
    grafico.data.datasets[1].data = estado.historico.economia;
    grafico.update();
}

function criarGraficoFinal() {
    const canvas = document.createElement('canvas');
    canvas.id = 'grafico-final';
    canvas.width = 400;
    canvas.height = 200;
    
    const container = document.createElement('div');
    container.style.margin = '30px 0';
    container.appendChild(canvas);
    
    elementos.resultadoFinal.insertBefore(container, elementos.resultadoFinal.querySelector('button'));
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Aprovação Pública', 'Economia'],
            datasets: [{
                data: [estado.clima, estado.economia],
                backgroundColor: [
                    'var(--verde-medio)',
                    'var(--dourado)'
                ],
                borderColor: [
                    'var(--verde-escuro)',
                    '#8a6d0b'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}