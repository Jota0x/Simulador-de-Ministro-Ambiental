// Cenários e decisões
const cenarios = [
    {
        titulo: "Crise Energética",
        descricao: "O inverno rigoroso aumentou a demanda por energia. As reservas estão baixas e o preço da eletricidade disparou. Como você responde?",
        opcoes: [
            {
                titulo: "Reativar usinas a carvão",
                descricao: "Garante energia barata e empregos no curto prazo, mas com alto custo ambiental.",
                impacto: { clima: -15, economia: +10 },
                classe: "opcao-negativo"
            },
            {
                titulo: "Acelerar investimentos em renováveis",
                descricao: "Incentivos massivos para energia eólica e solar, com subsídios temporários à população.",
                impacto: { clima: +10, economia: -5 },
                classe: "opcao-positivo"
            }
        ]
    },
    {
        titulo: "Transporte Urbano",
        descricao: "As cidades estão paralisadas pelo trânsito. A poluição do ar atingiu níveis críticos nesta semana.",
        opcoes: [
            {
                titulo: "Expandir rodovias urbanas",
                descricao: "Alivia imediatamente o trânsito, mas pode aumentar o uso de carros particulares.",
                impacto: { clima: -10, economia: +5 },
                classe: "opcao-negativo"
            },
            {
                titulo: "Revolucionar o transporte público",
                descricao: "Metrôs 24h, faixas exclusivas e subsídios para ônibus elétricos.",
                impacto: { clima: +15, economia: -10 },
                classe: "opcao-positivo"
            }
        ]
    },
    {
        titulo: "Agricultura Sustentável",
        descricao: "Os agricultores protestam contra as novas regulamentações ambientais, alegando prejuízos.",
        opcoes: [
            {
                titulo: "Flexibilizar as leis",
                descricao: "Permitir mais desmatamento e agrotóxicos para aumentar a produção.",
                impacto: { clima: -20, economia: +15 },
                classe: "opcao-negativo"
            },
            {
                titulo: "Programa de transição ecológica",
                descricao: "Subsídios para agricultura regenerativa e capacitação técnica.",
                impacto: { clima: +20, economia: -10 },
                classe: "opcao-positivo"
            }
        ]
    },
    {
        titulo: "Proteção Florestal",
        descricao: "Madeireiras ilegais avançam sobre áreas protegidas. Empresas do setor pressionam por mais áreas de corte.",
        opcoes: [
            {
                titulo: "Abrir áreas para manejo controlado",
                descricao: "Legalizar parte do corte em troca de royalties para o governo.",
                impacto: { clima: -25, economia: +20 },
                classe: "opcao-negativo"
            },
            {
                titulo: "Operação de fiscalização total",
                descricao: "Aumentar o efetivo do IBAMA com apoio das Forças Armadas.",
                impacto: { clima: +25, economia: -15 },
                classe: "opcao-positivo"
            }
        ]
    },
    {
        titulo: "Crise Hídrica",
        descricao: "Nível dos reservatórios atinge 30%. Indústrias ameaçam demissões se não houver água para produção.",
        opcoes: [
            {
                titulo: "Priorizar o setor industrial",
                descricao: "Reduzir vazão para consumo residencial e irrigação.",
                impacto: { clima: -15, economia: +10 },
                classe: "opcao-negativo"
            },
            {
                titulo: "Racionamento equilibrado",
                descricao: "Todos os setores terão cortes, com multas para desperdício.",
                impacto: { clima: +15, economia: -5 },
                classe: "opcao-positivo"
            }
        ]
    }
];