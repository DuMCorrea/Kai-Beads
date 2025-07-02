function adicionarAoCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco, imagem });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
  window.dispatchEvent(new Event("atualizarCarrinho"));
}





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


document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("produtos-destaque");
    const secoes = [
  "aneis", "brincos", "colares", "correntes", "pulseiras",
  "piercings", "limpeza", "canga-toalhas", "moletons"
];

let favoritos = [];

secoes.forEach(sessao => {
  const produtosSessao = JSON.parse(localStorage.getItem(`produtos-${sessao}`)) || [];
  const destacados = produtosSessao.filter(p => p.favorito);
  favoritos = favoritos.concat(destacados);
});

const destaque = favoritos.slice(0, 6); // até 6 produtos em destaque


    destaque.forEach(produto => {
        const div = document.createElement("div");
        div.classList.add("produto-item");

        const card = document.createElement("div");
        card.className = "card-produto";

        const link = document.createElement("a");
        link.href = `produto.html?nome=${encodeURIComponent(produto.nome)}&preco=${produto.preco}&imagem=${encodeURIComponent(produto.imagem)}&observacoes=${encodeURIComponent(produto.observacao || "")}&especificacao=${encodeURIComponent(produto.especificacao || "")}`;

        const imgDiv = document.createElement("div");
        imgDiv.className = "img-produ";
        imgDiv.style.backgroundImage = `url(${produto.imagem})`;

        const infoDiv = document.createElement("div");
        infoDiv.className = "info-produto";

        const h3 = document.createElement("h3");
        h3.className = "produto-nome";
        h3.textContent = produto.nome;

        const p = document.createElement("p");
        p.className = "preco";
        p.textContent = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;

        const btnDiv = document.createElement("div");
        btnDiv.className = "btn-comprar";

        const button = document.createElement("button");
        button.className = "btn-add-carrinho";
        button.setAttribute("data-nome", produto.nome);
        button.setAttribute("data-preco", produto.preco);
        button.setAttribute("data-imagem", produto.imagem);
        button.textContent = "ADICIONAR AO CARRINHO";

        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            adicionarAoCarrinho(produto.nome, produto.preco, produto.imagem);
        });

        btnDiv.appendChild(button);
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);
        infoDiv.appendChild(btnDiv);
        link.appendChild(imgDiv);
        card.appendChild(link);
        card.appendChild(infoDiv);
        div.appendChild(card);
        container.appendChild(div);
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



  // CAMPO PESQUISAR //



  // ==== ATUALIZAR CONTADOR CARRINHO (DESKTOP E MOBILE) ==== //
function atualizarContadorCarrinhoGeral() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    // Desktop
    const contadorDesktop = document.getElementById("contador-carrinho");
    if (contadorDesktop) {
        contadorDesktop.textContent = carrinho.length;
        contadorDesktop.style.display = carrinho.length > 0 ? "flex" : "none";
    }
    // Mobile
    const contadorMobile = document.getElementById("contador-carrinho-mobile");
    if (contadorMobile) {
        contadorMobile.textContent = carrinho.length;
        contadorMobile.style.display = carrinho.length > 0 ? "flex" : "none";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    atualizarContadorCarrinhoGeral();
    window.addEventListener("atualizarCarrinho", atualizarContadorCarrinhoGeral);
});

// ==== PESQUISA/ AUTOCOMPLETE TANTO DESKTOP QUANTO MOBILE ==== //
function autocompleteBusca(inputId, listId) {
    const input = document.getElementById(inputId);
    const autocompleteList = document.getElementById(listId);

    if (!input || !autocompleteList) return;

    // Carregar todos os produtos do localStorage (igual sua função)
    function carregarProdutosDoLocalStorage() {
        const secoes = [
            "aneis", "brincos", "colares", "correntes", "pulseiras",
            "piercings", "limpeza", "canga-toalhas", "moletons"
        ];
        let todos = [];
        secoes.forEach(sessao => {
            const produtosSessao = JSON.parse(localStorage.getItem(`produtos-${sessao}`)) || [];
            todos = todos.concat(produtosSessao);
        });
        // Remover duplicatas
        const nomesVistos = new Set();
        return todos.filter(p => {
            if (nomesVistos.has(p.nome)) return false;
            nomesVistos.add(p.nome);
            return true;
        });
    }
    const produtos = carregarProdutosDoLocalStorage();

    input.addEventListener('input', function () {
        const valor = this.value.toLowerCase();
        autocompleteList.innerHTML = '';
        if (!valor) return;

        const sugestões = produtos.filter(p => p.nome.toLowerCase().includes(valor));
        sugestões.forEach(produto => {
            const li = document.createElement('li');
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('autocomplete-item');
            const img = document.createElement('img');
            img.src = produto.imagem;
            img.alt = produto.nome;
            img.classList.add('autocomplete-img');
            const nomeSpan = document.createElement('span');
            nomeSpan.textContent = produto.nome;
            itemContainer.appendChild(img);
            itemContainer.appendChild(nomeSpan);
            li.appendChild(itemContainer);
            li.addEventListener('click', () => {
                const nome = encodeURIComponent(produto.nome);
                const preco = encodeURIComponent(produto.preco);
                const imagem = encodeURIComponent(produto.imagem);
                const observacoes = encodeURIComponent(produto.observacao || "");
                const especificacao = encodeURIComponent(produto.especificacao || "");
                window.location.href = `produto.html?nome=${nome}&preco=${preco}&imagem=${imagem}&observacoes=${observacoes}&especificacao=${especificacao}`;
            });
            autocompleteList.appendChild(li);
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${listId}`)) {
            autocompleteList.innerHTML = '';
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    autocompleteBusca('searchInput', 'autocomplete-list'); // Desktop
    autocompleteBusca('searchInputMobile', 'autocomplete-list-mobile'); // Mobile
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
          window.location.href = "index.html#footer";
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



// FIREBASE




document.addEventListener("DOMContentLoaded", function () {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA5u3vlPtjofjBgsaT9z1qu2fifBhkKPmo",
        authDomain: "kaibeads-2ab98.firebaseapp.com",
        projectId: "kaibeads-2ab98",
        storageBucket: "kaibeads-2ab98.appspot.com",
        messagingSenderId: "405735155633",
        appId: "1:405735155633:web:a9c151f7d4b611b788ff90",
        measurementId: "G-N2NDBL58J7"
    };
    // Inicializa Firebase só se ainda não foi inicializado
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const authButtons = document.getElementById("auth-buttons");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            authButtons.innerHTML = `
  <button class="btn-logout">
    <i class="fa-solid fa-arrow-right-from-bracket"></i> Sair
  </button>
`;
            document.querySelector(".btn-logout").addEventListener("click", () => {
                firebase.auth().signOut().then(() => {
                    window.location.reload();
                }).catch((error) => {
                    alert("Erro ao sair: " + error.message);
                });
            });
        } else {
            authButtons.innerHTML = `
    <a href="templates/register.html" class="btn-create-account">
        <i class="fa-solid fa-user-plus"></i> Criar conta
    </a>
    <a href="templates/login.html" class="btn-login">
        <i class="fa-solid fa-right-to-bracket"></i> Entrar
    </a>
`;

        }

        // Agora que a verificação terminou, exibe os botões corretamente
        authButtons.style.display = "block";
    });
});




// Responsividade

// Info-bar e cabeçalho(hamburguer)


document.addEventListener("DOMContentLoaded", function () {
    // Abre o menu lateral
    document.getElementById("open-menu").onclick = function () {
      document.getElementById("mobile-menu").classList.add("open");
      document.body.style.overflow = "hidden";
    };
    // Fecha o menu lateral
    document.getElementById("close-menu").onclick = function () {
      document.getElementById("mobile-menu").classList.remove("open");
      document.body.style.overflow = "";
    };
    // Fecha ao clicar em qualquer link
    document.querySelectorAll('.mobile-link').forEach(link => {
  link.onclick = function () {
    // Só fecha se NÃO for o botão "Categorias"
    document.getElementById("mobile-menu").classList.remove("open");
    document.body.style.overflow = "";
  };
});

    // Fecha ao clicar fora do menu (opcional)
    document.getElementById("mobile-menu").addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = "";
      }
    });
  });

const catBtn = document.querySelector('.mobile-categorias');
const catSubmenu = document.getElementById('submenu-categorias-mobile');
let catOpen = false;

catBtn.onclick = function(e) {
  e.stopPropagation();
  catOpen = !catOpen;
  catSubmenu.style.display = catOpen ? 'block' : 'none';
  catBtn.querySelector('span').innerHTML = catOpen ? '&#x25B2;' : '&#x25BC;';
  // Adiciona classe open para cor preta
  if (catOpen) {
    catBtn.classList.add('open');
    catSubmenu.classList.add('open');
  } else {
    catBtn.classList.remove('open');
    catSubmenu.classList.remove('open');
  }
};

// Se clicar em outro link, fecha submenu
document.querySelectorAll('.mobile-link:not(.mobile-categorias)').forEach(link => {
  link.onclick = function () {
    catSubmenu.style.display = 'none';
    catOpen = false;
    catBtn.querySelector('span').innerHTML = '&#x25BC;';
    catBtn.classList.remove('open');
    catSubmenu.classList.remove('open');
  };
});
