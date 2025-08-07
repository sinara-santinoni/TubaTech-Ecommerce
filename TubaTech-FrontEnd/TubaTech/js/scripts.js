// Adiciona produto ao carrinho


document.querySelectorAll('.btn-comprar').forEach((botao) => {  // Seleciona todos os botões com a classe "btn-comprar" e percorre cada um
  botao.addEventListener('click', () => {    // Adiciona um evento de clique em cada botão
    const card = botao.closest('.card');   // Encontra o elemento pai mais próximo com a classe "card"
    const imagem = card.querySelector('img').src; 
    const titulo = card.querySelector('.card-title').innerText;  
    const preco = card.querySelector('.card-text').innerText;
    const categoria = card.classList[1]; // ex: 'celular', 'tablet', etc.

    const produto = {
      imagem,
      titulo,
      preco,
      categoria,
      quantidade: 1
    };   // Cria um objeto com os dados do produto e define a quantidade inicial como 1

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Tenta recuperar o carrinho salvo no localStorage e transforma em array

    const existente = carrinho.find(p => p.titulo === produto.titulo);   // Se não existir, inicia como array vazio     
 
    if (existente) {
      existente.quantidade++;
    } else {
      carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));   // Salva o carrinho atualizado no localStorage, convertendo de objeto para string JSON
    alert('Produto adicionado com sucesso!');
  });
});



// Filtro por categoria

document.querySelectorAll('button[data-categoria]').forEach(botao => {   // Seleciona todos os botões que têm o atributo "data-categoria"
  botao.addEventListener('click', () => {
    const categoriaSelecionada = botao.getAttribute('data-categoria').toLowerCase();

    const cards = document.querySelectorAll('#produto-container .col-12');

    cards.forEach(col => {
      const card = col.querySelector('.card');
      const cardCategoria = card.classList.contains(categoriaSelecionada);

      if (categoriaSelecionada === 'todos' || cardCategoria) {
        col.style.display = 'block';
      } else {
        col.style.display = 'none';
      }
    });

    // Marca botão ativo
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active')); // Remove a classe "active" de todos os botões
    botao.classList.add('active');   // Adiciona a classe "active" apenas ao botão clicado
  });
});
