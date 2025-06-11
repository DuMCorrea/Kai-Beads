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

  index += step;

  if (index < 0) {
    index = 0;
  }
  if (index >= totalSlides - imagesToShow + 1) {
    index = 0;
  }

  updateCarousel();
}

function goToSlide(slideIndex) {
  index = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const imagesToShow = 3;
  const newTransformValue = `translateX(-${index * (100 / imagesToShow)}%)`;
  document.querySelector('.carrossel-container .slides').style.transform = newTransformValue;

  // Atualiza os dots
  const dots = document.querySelectorAll('.carrossel-container .dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
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

      // Cria o container do conteúdo
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('autocomplete-item');

      // Cria a imagem
      const img = document.createElement('img');
      img.src = produto.imagem;
      img.alt = produto.nome;
      img.classList.add('autocomplete-img');

      // Cria o span com o nome
      const nomeSpan = document.createElement('span');
      nomeSpan.textContent = produto.nome;

      // Junta imagem + texto
      itemContainer.appendChild(img);
      itemContainer.appendChild(nomeSpan);

      li.appendChild(itemContainer);

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

document.getElementById("link-email").addEventListener("click", function (e) {
  e.preventDefault();
  const destinatario = "kaibeads@gmail.com";
  // Redireciona para o Gmail com o campo "Para" preenchido
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}`, '_blank');
});

// REDIRECIONAMENTO CORRETO(ROLAGEM)


document.getElementById("link-todos-produtos").addEventListener("click", function (e) {
  e.preventDefault();
  // Marca que queremos rolar ao elemento na outra página
  sessionStorage.setItem("scrollToProdutos", "true");
  // Redireciona
  window.location.href = "categorias.html";
});



document.getElementById("link-quem-somos").addEventListener("click", function (e) {
  e.preventDefault();

  const target = document.querySelector("#sobre");
  if (target) {
    const offset = target.offsetTop;
    // Rola um pouco acima da seção
    window.scrollTo({
      top: offset - 56, // Ajuste esse valor conforme necessário
      behavior: "smooth"
    });
  }
});

// Rolagem ajustada para "Perguntas frequentes"
document.getElementById("link-duvidas").addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector("#duvidas");
  if (target) {
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  }
});


// SOBRE EM CATEGORIAS.HTML


window.addEventListener("load", function () {
  const scrollToProdutos = sessionStorage.getItem("scrollToProdutos");
  const scrollToSobre = sessionStorage.getItem("scrollToSobre");

  if (scrollToProdutos === "true") {
    sessionStorage.removeItem("scrollToProdutos");
    setTimeout(() => {
      const target = document.querySelector("#inicio-produtos");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 86,
          behavior: "smooth"
        });
      }
    }, 100);
  }

  if (scrollToSobre === "true") {
    sessionStorage.removeItem("scrollToSobre");
    setTimeout(() => {
      const target = document.querySelector("#sobre");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 57, // ajuste conforme necessário
          behavior: "smooth"
        });
      }
    }, 100);
  }
});

window.addEventListener("load", function () {
  // Redirecionamento para Produtos
  const scrollToProdutos = sessionStorage.getItem("scrollToProdutos");
  if (scrollToProdutos === "true") {
    sessionStorage.removeItem("scrollToProdutos");
    setTimeout(() => {
      const target = document.querySelector("#inicio-produtos");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 86,
          behavior: "smooth"
        });
      }
    }, 100);
  }

  // Redirecionamento para Sobre
  const scrollToSobre = sessionStorage.getItem("scrollToSobre");
  if (scrollToSobre === "true") {
    sessionStorage.removeItem("scrollToSobre");
    setTimeout(() => {
      const target = document.querySelector("#sobre");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 40,
          behavior: "smooth"
        });
      }
    }, 100);
  }

  // Redirecionamento para Dúvidas
  const scrollToDuvidas = sessionStorage.getItem("scrollToDuvidas");
  if (scrollToDuvidas === "true") {
    sessionStorage.removeItem("scrollToDuvidas");
    setTimeout(() => {
      const target = document.querySelector("#duvidas");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    }, 100);
  }
});


 // PARA O DOT EM CARROSSEL JÁ APARECER AO CARREGAR O SITE

document.addEventListener("DOMContentLoaded", function () {
  updateCarousel();
});
