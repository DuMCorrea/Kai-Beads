document.addEventListener("DOMContentLoaded", function () {
    const targetId = localStorage.getItem('scrollToTarget');
    if (targetId) {
        const element = document.querySelector(targetId);
        if (element) {
            // Oculta temporariamente o conteúdo
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease';

            // Scroll instantâneo para o centro
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'auto', block: 'center' });

                // Ajuste fino da posição: sobe 100px
                window.scrollBy({ top: 120, left: 0, behavior: 'auto' });

                // Fade-in suave após rolagem
                setTimeout(() => {
                    element.style.opacity = '1';
                    localStorage.removeItem('scrollToTarget');
                }, 10);
            }, 10);
        }
    }
});

// Captura o clique e armazena o destino no localStorage
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('data-target');
        if (targetId) {
            localStorage.setItem('scrollToTarget', targetId);
        }
    });
});

document.getElementById("link-todos-produtos").addEventListener("click", function (e) {
    e.preventDefault();
    // Marca que queremos rolar ao elemento na outra página
    sessionStorage.setItem("scrollToProdutos", "true");
    // Redireciona
    window.location.href = "categorias.html";
});


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
    const urlParams = new URLSearchParams(window.location.search);
    const nome = urlParams.get("nome");
    const preco = urlParams.get("preco");
    const imagem = urlParams.get("imagem");

    // Preenche os dados do produto
    document.getElementById("nome-produto").textContent = nome;
    document.getElementById("preco-produto").textContent = `R$ ${preco}`;
    document.getElementById("imagem-produto").src = imagem;

    const botaoAdicionar = document.getElementById("adicionar-carrinho");

    botaoAdicionar.addEventListener("click", function () {
        const quantidade = parseInt(document.getElementById("quantidade").value);

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        for (let i = 0; i < quantidade; i++) {
            carrinho.push({ nome, preco, imagem });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("Produto adicionado ao carrinho!");

        // Dispara o evento para atualizar o contador do carrinho
        window.dispatchEvent(new Event("atualizarCarrinho"));
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  const nome = decodeURIComponent(urlParams.get('nome') || '');
  const preco = decodeURIComponent(urlParams.get('preco') || '');
  const imagem = decodeURIComponent(urlParams.get('imagem') || '');
  const observacoes = decodeURIComponent(urlParams.get('observacoes') || '');
  const especificacao = decodeURIComponent(urlParams.get('especificacao') || '');

  document.getElementById('nome-produto').textContent = nome;
  document.getElementById('preco-produto').textContent = `R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}`;
  document.getElementById('imagem-produto').src = imagem;
  document.getElementById('observacao-produto').textContent = observacoes || 'Nenhuma observação disponível.';
  // Aqui vem a formatação de lista:
  const especificacaoElement = document.getElementById('especificacao-produto');
  especificacaoElement.innerHTML = ''; // Limpa antes

  if (especificacao && especificacao.trim()) {
    const linhas = especificacao.split('\n').map(item => item.trim()).filter(item => item.length);
    linhas.forEach(linha => {
      const li = document.createElement('li');
      li.textContent = linha;
      especificacaoElement.appendChild(li);
    });
  } else {
    especificacaoElement.innerHTML = '<li>Nenhuma especificação disponível.</li>';
  }
});





// FUNCIONALIDADE IMAGENS DO PRODUTO.HTML




document.addEventListener("DOMContentLoaded", function () {
    const miniaturas = document.querySelectorAll(".miniatura");
    const imagemPrincipal = document.getElementById("imagem-produto");

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener("click", () => {
            imagemPrincipal.src = miniatura.src;
        });
    });
});




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


window.addEventListener("load", function () {
    const shouldScroll = sessionStorage.getItem("scrollToProdutos");
    if (shouldScroll === "true") {
        sessionStorage.removeItem("scrollToProdutos"); // limpa após usar
        setTimeout(() => {
            const target = document.querySelector("#inicio-produtos");
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 86, // ajuste aqui conforme necessário
                    behavior: "smooth"
                });
            }
        }, 100);
    }
});

document.getElementById("link-todos-produtos").addEventListener("click", function (e) {
    e.preventDefault();
    // Marca que queremos rolar ao elemento na outra página
    sessionStorage.setItem("scrollToProdutos", "true");
    // Redireciona
    window.location.href = "categorias.html";
});



document.getElementById("link-quem-somos").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.setItem("scrollToSobre", "true");
    window.location.href = "index.html";
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


document.getElementById("link-duvidas").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.setItem("scrollToDuvidas", "true");
    window.location.href = "index.html";
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

