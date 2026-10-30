# Loja Bella Aurora — Cestas de Café & Flores com Gateway XPay Brasil

Este projeto contém a loja virtual integrada diretamente com o gateway de pagamentos **XPay Brasil** para geração de **PIX imediato** com QR Code e Copia e Cola transparente.

---

## 🚀 Como Iniciar o Servidor

Para rodar o projeto localmente:

```bash
node server.js
```

Depois abra no seu navegador:
👉 **http://localhost:3000** (redireciona automaticamente para a loja) ou **http://localhost:3000/flor/**

---

## 💳 Como Funciona a Integração

1. **Catálogo & Carrinho (`/flor/index.html`):**
   - O cliente escolhe as cestas, flores, chocolates, pelúcias ou bolos.
   - Pode selecionar adicionais (cartão de recado, balão, itens extras).
   - O pedido fica salvo no carrinho.
2. **Checkout Transparente (`/flor/checkout.html`):**
   - O cliente preenche os dados (Nome, CPF com validação oficial, WhatsApp e CEP com preenchimento automático de endereço via ViaCEP).
   - Pode escrever a mensagem personalizada do cartão de presente e selecionar o turno de entrega.
3. **Geração do PIX via XPay Brasil:**
   - O frontend envia os dados para `POST /api/create-pix`.
   - O servidor `server.js` autentica com a sua chave `X-API-KEY` de forma segura (sem expor a chave no navegador).
   - A XPay Brasil gera a cobrança com o QR Code e o código Pix Copia e Cola.
4. **Confirmação Automática:**
   - A página consulta a cada 3 segundos o endpoint `GET /api/check-status/:chargeId`.
   - Assim que o cliente realiza o pagamento pelo app do banco, a tela atualiza imediatamente para **"Pagamento Confirmado!"** e disponibiliza o botão para acompanhamento via WhatsApp.

---

## ⚙️ Configuração das Chaves de API

No arquivo `.env` (ou variáveis de ambiente do seu servidor de hospedagem):

```env
XPAY_API_KEY=cpk_live_ex84lopcp2xexagmazz6za11
PORT=3000
```
