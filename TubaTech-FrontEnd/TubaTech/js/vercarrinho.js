function carregarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;

  lista.innerHTML = "";

  carrinho.forEach((produto, index) => {
    const precoNumerico = parseFloat(
      produto.preco.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );

    total += precoNumerico * produto.quantidade;

    const item = document.createElement("div");
    item.classList.add("carrinho-item");
    item.innerHTML = `
<img src="${produto.imagem}" alt="${produto.titulo}">
<div class="carrinho-info">
<h4>${produto.titulo}</h4>
 <p>${produto.categoria}</p>
<p><strong>${produto.preco}</strong></p>
</div>
 <div class="carrinho-quantidade">
 <button onclick="alterarQtd(${index}, -1)">−</button>
<span>${produto.quantidade}</span>
<button onclick="alterarQtd(${index}, 1)">+</button>
</div>
 `;
    lista.appendChild(item);
  });

  // Lógica de frete
  let frete = 0;
  let mensagemFrete = "Frete: R$ 29,90";
  if (total >= 200) {
    frete = 0;
    mensagemFrete = "Frete grátis!";
  } else if (total > 0) {
    frete = 29.90;
  }

  const totalComFrete = total + frete;

  // Atualiza elementos na tela
  const totalElement = document.getElementById("total");
  const freteMsg = document.getElementById("mensagem-frete");

  if (totalElement) {
    totalElement.innerHTML = ` Total dos produtos: R$ ${total.toFixed(2).replace(".", ",")}<br> ${mensagemFrete}<br>
<strong>Total com frete: R$ ${totalComFrete.toFixed(2).replace(".", ",")}</strong>
`;
  }

  if (freteMsg) {
    freteMsg.style.display = total >= 200 ? "block" : "none";
  }
}

function alterarQtd(index, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho[index]) {
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1);
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
  }
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  carregarCarrinho();
}

function voltar() {
  window.location.href = "index.html";
}

function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  // Calcular total dos produtos
  let totalProdutos = 0;
  carrinho.forEach(item => {
    const preco = parseFloat(item.preco.replace("R$", "").replace(/\./g, "").replace(",", "."));
    totalProdutos += preco * item.quantidade;
  });

  // Define o valor original do frete
  const freteOriginal = 29.90;

  // Calcula o frete que será aplicado ao total (0 se for grátis)
  let freteAplicado = totalProdutos >= 200 ? 0 : freteOriginal;
  let totalFinal = totalProdutos + freteAplicado;
  let tipoFrete = freteAplicado === 0 ? "GRÁTIS" : "INCLUSO";

  // Salvar resumo no localStorage
  const resumo = {
    valorProdutos: totalProdutos,
    frete: freteAplicado, // Valor que será cobrado (0 ou 29.90)
    freteOriginal: freteOriginal, // NOVO: Valor original do frete (sempre 29.90)
    totalFinal: totalFinal,
    tipoFrete: tipoFrete
  };
  localStorage.setItem("resumoCompra", JSON.stringify(resumo));

  // Redirecionar para a página de pagamento
  window.location.href = "pagamento.html";
}

window.onload = carregarCarrinho;
//fimm