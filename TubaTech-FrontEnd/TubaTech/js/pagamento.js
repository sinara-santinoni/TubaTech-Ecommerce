document.addEventListener('DOMContentLoaded', () => {
  const resumo = JSON.parse(localStorage.getItem('resumoCompra')); // Recupera o resumo da compra do localStorage e converte de string para objeto

  if (!resumo) {
    alert('Nenhum resumo de compra encontrado. Retornando ao carrinho.'); // Se não houver resumo salvo, alerta o usuário e redireciona para o carrinho
    window.location.href = 'carrinho.html';
    return;
  }
   // Extrai os dados do resumo ou define valores padrão se estiverem ausentes

  const valorProdutos = resumo.valorProdutos || 0;
  const frete = resumo.frete || 0;
  const freteOriginal = resumo.freteOriginal || 0;
  const tipoFrete = resumo.tipoFrete || 'INCLUSO';
  const valorTotal = resumo.totalFinal || valorProdutos + frete;

  // Exibe o valor nos blocos de entrega
  const valorFreteIncluso = document.getElementById('valor-frete-incluso');
  const valorFreteGratis = document.getElementById('valor-frete-gratis');

  if (valorFreteIncluso) {
    valorFreteIncluso.textContent = `+R$${freteOriginal.toFixed(2).replace('.', ',')}`;
  }

  if (valorFreteGratis) {
    valorFreteGratis.textContent = 'R$0,00';
  }

  // Destaca a opção de frete usada
  const blocoFreteIncluso = document.getElementById('opcao-frete-incluso');
  const blocoFreteGratis = document.getElementById('opcao-frete-gratis');

  if (tipoFrete === 'GRÁTIS') {
    blocoFreteGratis.classList.add('selecionado');
  } else {
    blocoFreteIncluso.classList.add('selecionado');
  }

  // Exibe o total final dentro do bloco selecionado
  const valorResumoFinal = document.createElement('p');
  valorResumoFinal.classList.add('total-final-frete');
  valorResumoFinal.innerHTML = `<strong>Total da Compra:</strong> R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

  if (tipoFrete === 'GRÁTIS') {
    blocoFreteGratis.appendChild(valorResumoFinal);
  } else {
    blocoFreteIncluso.appendChild(valorResumoFinal);
  }

  // Evento de clique para finalizar a compra
  const botaoConcluir = document.getElementById('concluir-compra');
  if (botaoConcluir) {
    botaoConcluir.addEventListener('click', (event) => {
      event.preventDefault();

      const formaSelecionada = document.querySelector('input[name="pagamento"]:checked');
      if (!formaSelecionada) {
        alert("Selecione uma forma de pagamento.");
        return;
      }

      let totalFinal = valorTotal;
      let desconto = 0;
      
 // Aplica 10% de desconto se a forma for Pix
      if (formaSelecionada.value === 'pix') {
        desconto = totalFinal * 0.10;
        totalFinal *= 0.90;
      }

      // Seleciona a div onde será exibida a mensagem final

      const msgFinal = document.getElementById('mensagem-final');
      if (msgFinal) { // Exibe o resumo da compra com forma de pagamento, valores e desconto
        msgFinal.innerHTML = `
          ✅ Pagamento concluído com sucesso!<br>
          <strong>Forma de pagamento:</strong> ${formaSelecionada.value.toUpperCase()}<br>
          <strong>Valor dos produtos:</strong> R$ ${valorProdutos.toFixed(2).replace('.', ',')}<br>
          <strong>Frete:</strong> ${tipoFrete === 'GRÁTIS' ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}<br>
          ${formaSelecionada.value === 'pix' ? '<strong>Desconto Pix:</strong> 10%<br>' : ''}
          <strong>Total final:</strong> R$ ${totalFinal.toFixed(2).replace('.', ',')}
        `;
        msgFinal.style.display = 'block';  // Torna a mensagem visível
      }

       // Limpa os dados salvos do carrinho e do resumo da compra
      localStorage.removeItem("carrinho");
      localStorage.removeItem("resumoCompra");
    });
  }
});
