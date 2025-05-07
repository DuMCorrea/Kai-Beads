document.addEventListener("DOMContentLoaded", function () {
    const contadorCarrinho = document.getElementById("contador-carrinho");

    function atualizarContadorCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        contadorCarrinho.textContent = carrinho.length;
        contadorCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
    }

    // Atualiza o contador quando a página carrega
    atualizarContadorCarrinho();

    // Escuta o evento "atualizarCarrinho" para atualizar o contador em tempo real
    window.addEventListener("atualizarCarrinho", atualizarContadorCarrinho);

    // Adicionando produtos ao carrinho
    const botoesAdicionar = document.querySelectorAll(".btn-add-carrinho");

    botoesAdicionar.forEach((botao) => {
        botao.addEventListener("click", function () {
            const nome = botao.getAttribute("data-nome");
            const preco = botao.getAttribute("data-preco");
            const imagem = botao.getAttribute("data-imagem");

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            carrinho.push({ nome, preco, imagem });
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            alert("Produto adicionado ao carrinho!");

            // Dispara o evento para atualizar o contador do carrinho em todas as páginas
            window.dispatchEvent(new Event("atualizarCarrinho"));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const linksProduto = document.querySelectorAll(".link-produto");

    linksProduto.forEach((elemento) => {
        elemento.addEventListener("click", () => {
            const nome = encodeURIComponent(elemento.getAttribute("data-nome"));
            const preco = encodeURIComponent(elemento.getAttribute("data-preco"));
            const imagem = encodeURIComponent(elemento.getAttribute("data-imagem"));

            // Redireciona para a página de detalhes
            window.location.href = `produto.html?nome=${nome}&preco=${preco}&imagem=${imagem}`;
        });
    });
});



let index = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carrossel-container .slide');
    const totalSlides = slides.length;
    const imagesToShow = 3; // Número de imagens visíveis por vez

    // Atualizando o índice com base no movimento (para frente ou para trás)
    index += step;

    if (index < 0) {
        index = 0; // Não permite que a navegação vá para trás, sempre volta para o início
    }
    if (index >= totalSlides - imagesToShow + 1) {
        index = 0; // Quando chegar no final, volta para as 3 primeiras imagens
    }

    // Mover as imagens para a posição correta
    const newTransformValue = `translateX(-${index * (100 / imagesToShow)}%)`;
    document.querySelector('.carrossel-container .slides').style.transform = newTransformValue;
}
function toggleForm(formId) {
    // Remova essa lógica, já que o login será feito diretamente com o Google
    //document.getElementById('login-form').style.display = 'none';
    //document.getElementById('register-form').style.display = 'none';
    //document.getElementById(formId).style.display = 'block';
}


// CAMPO PESQUISAR



document.addEventListener('DOMContentLoaded', async function () {
    const input = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocomplete-list');

    let produtos = [];

    // Função para extrair nomes de produtos da página atual
    function getProdutosDaPaginaAtual() {
        return Array.from(document.querySelectorAll('.card-produto')).map(card => {
            const nome = card.querySelector('.produto-nome')?.textContent.trim() || '';
            const preco = card.querySelector('.preco')?.textContent.replace('R$ ', '').replace(',', '.') || '';
            const imagem = card.querySelector('.img-produ')?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || '';
            return { nome, preco, imagem };
        });
    }
    
    async function getProdutosDeOutraPagina(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
    
            return Array.from(doc.querySelectorAll('.card-produto')).map(card => {
                const nome = card.querySelector('.produto-nome')?.textContent.trim() || '';
                const preco = card.querySelector('.preco')?.textContent.replace('R$ ', '').replace(',', '.') || '';
                const imagem = card.querySelector('.img-produ')?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || '';
                return { nome, preco, imagem };
            });
        } catch (error) {
            console.error('Erro ao carregar a outra página:', error);
            return [];
        }
    }
    

    // Verifica se está na home ou categorias e define a outra página
    const paginaAtual = window.location.pathname.includes('home.html') ? 'home' : 'categorias';
    const outraPagina = paginaAtual === 'home' ? 'categorias.html' : 'home.html';

    // Coleta os produtos da página atual
    const produtosAtuais = getProdutosDaPaginaAtual();

    // Coleta os produtos da outra página
    const produtosDaOutraPagina = await getProdutosDeOutraPagina(outraPagina);

    // Junta tudo
    produtos = [...produtosAtuais, ...produtosDaOutraPagina];

    // Evento de digitação no campo de busca
    input.addEventListener('input', function () {
        const valor = this.value.toLowerCase();
        autocompleteList.innerHTML = '';
    
        if (!valor) return;
    
        const sugestões = produtos.filter(p => p.nome.toLowerCase().includes(valor));
    
        sugestões.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = produto.nome;
            li.addEventListener('click', () => {
                const nome = encodeURIComponent(produto.nome);
                const preco = encodeURIComponent(produto.preco);
                const imagem = encodeURIComponent(produto.imagem);
                window.location.href = `produto.html?nome=${nome}&preco=${preco}&imagem=${imagem}`;
            });
    
            autocompleteList.appendChild(li);
        });
    });
    

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-container')) {
            autocompleteList.innerHTML = '';
        }
    });
});







// DÚVIDAS FREQUENTES


document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  const faqAnswers = document.querySelectorAll('.faq-answer');
  faqAnswers.forEach(answer => {
      answer.style.display = 'none'; 
  });

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const arrow = question.querySelector('.arrow');

          faqQuestions.forEach(q => {
              if (q !== question) {
                  const otherAnswer = q.nextElementSibling;
                  const otherArrow = q.querySelector('.arrow');

                  otherAnswer.style.display = 'none'; 
                  otherArrow.classList.remove('active'); 
                  q.style.color = 'black'; 
              }
          });

          if (answer.style.display === 'none' || !answer.style.display) {
              answer.style.display = 'block'; 
              arrow.classList.add('active'); 
              question.style.color = 'black'; 
          } else {
              answer.style.display = 'none'; 
              arrow.classList.remove('active'); 
              question.style.color = 'black'; 
          }
      });
  });
});

  


 // FOOTER

 document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("scroll") && urlParams.get("scroll") === "footer") {
      document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  }
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o recarregamento da página

  const form = event.target;
  const formData = new FormData(form);
  const successMessage = document.getElementById("success-message");

  fetch(form.action, {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
          successMessage.style.display = "block"; // Exibe a mensagem de sucesso
          form.reset(); // Limpa os campos do formulário

          // Espera 3 segundos e então rola para o footer
          setTimeout(() => {
              window.location.href = "home.html#footer";
          }, 3000);
      } else {
          alert("Erro ao enviar mensagem. Tente novamente.");
      }
  })
  .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao enviar mensagem.");
  });
});












