# 📊 Sistema de Calculadoras Estáticas

## Como Funciona

O sistema de calculadoras agora utiliza **dados estáticos embutidos diretamente no HTML** de cada página, eliminando a dependência do localStorage e da página `/calc`.

## Estrutura dos Dados

Cada página HTML contém seus próprios dados da calculadora no formato:

```javascript
window.calculadoraData = {
    "tipo_produto": {
        "prazos": [
            {"prazo": 12, "coeficiente_parcela": 0.08950, "coeficiente_liberado": 0.09250},
            {"prazo": 24, "coeficiente_parcela": 0.04890, "coeficiente_liberado": 0.05190},
            // ... mais prazos
        ]
    }
};
```

## Páginas com Calculadoras

### 1. **servidor-publico.html**
- **Tipo:** `consignado_servidor`
- **Produto:** Crédito Consignado para Servidor Público
- **Prazos:** 12 a 96 meses

### 2. **aposentado-inss.html**
- **Tipo:** `consignado_inss`
- **Produto:** Crédito Consignado para Aposentado/Pensionista INSS
- **Prazos:** 12 a 84 meses

### 3. **clt.html**
- **Tipo:** `clt`
- **Produto:** Consignado para CLT
- **Prazos:** 12 a 60 meses

## Como Editar os Dados

### Opção 1: Editar Diretamente no HTML

1. Abra o arquivo HTML da página desejada
2. Localize o bloco `<script>` com `window.calculadoraData`
3. Modifique os valores de `prazo`, `coeficiente_parcela` e `coeficiente_liberado`
4. Salve o arquivo

### Opção 2: Usar o Arquivo JSON de Referência

1. Consulte o arquivo `calculadora-dados.json` para ver todos os dados organizados
2. Copie os dados desejados e cole no HTML correspondente
3. Mantenha o formato exato da estrutura

## Exemplo de Modificação

Para adicionar um novo prazo de 120 meses na página de servidor público:

```javascript
window.calculadoraData = {
    "consignado_servidor": {
        "prazos": [
            {"prazo": 12, "coeficiente_parcela": 0.08950, "coeficiente_liberado": 0.09250},
            {"prazo": 24, "coeficiente_parcela": 0.04890, "coeficiente_liberado": 0.05190},
            // ... prazos existentes ...
            {"prazo": 96, "coeficiente_parcela": 0.01980, "coeficiente_liberado": 0.02180},
            {"prazo": 120, "coeficiente_parcela": 0.01850, "coeficiente_liberado": 0.02050}  // NOVO PRAZO
        ]
    }
};
```

## Vantagens do Sistema Estático

✅ **Independente:** Não depende de localStorage ou páginas externas
✅ **Rápido:** Dados carregam instantaneamente com a página
✅ **Simples:** Fácil de modificar diretamente no HTML
✅ **Confiável:** Não há risco de dados serem perdidos
✅ **Portável:** Cada página é autossuficiente

## Arquivo de Backup

O arquivo `calculadora-dados.json` contém todos os dados organizados e pode ser usado como:
- Backup dos dados atuais
- Referência para novos prazos
- Template para criar novas calculadoras

## Como os Cálculos Funcionam

### Simulação por Valor da Parcela
**Fórmula:** `Valor Liberado = Valor da Parcela ÷ coeficiente_parcela`

### Simulação por Valor Liberado  
**Fórmula:** `Valor da Parcela = Valor Liberado × coeficiente_liberado`

### Exemplo Prático
Para 24 meses com `coeficiente_parcela: 0.04890` e `coeficiente_liberado: 0.05190`:
- **Parcela R$ 500,00** → Libera R$ 10.224,49 (500 ÷ 0.04890)
- **Liberar R$ 10.000,00** → Parcela R$ 519,00 (10.000 × 0.05190)

### ⚠️ Importante: Coeficientes Diferentes
O sistema agora usa **coeficientes diferentes** para cada tipo de simulação:
- `coeficiente_parcela` → Para calcular valor liberado quando informada a parcela
- `coeficiente_liberado` → Para calcular parcela quando informado o valor a liberar 