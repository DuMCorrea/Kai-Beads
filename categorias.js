function mostrarMensagemSemProdutos(container) {
    // Remove qualquer mensagem antiga antes de adicionar outra
    let msgAntiga = container.querySelector('.mensagem-sem-produtos');
    if (msgAntiga) msgAntiga.remove();

    // Se o container NÃO tem nenhum produto visível, exibe a mensagem
    const produtosVisiveis = Array.from(container.children).filter(el => 
        el.classList.contains('produto-item') && el.style.display !== 'none'
    );
    if (produtosVisiveis.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'mensagem-sem-produtos';
        msg.textContent = "Não há produtos a serem exibidos";
        container.appendChild(msg);
    }
}






// ====================== ADICIONAR AO CARRINHO ===========================
function adicionarAoCarrinho(nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, preco, imagem });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
    window.dispatchEvent(new Event("atualizarCarrinho"));
}

// ====================== PRODUTOS - CARREGAMENTO DINÂMICO ===============
document.addEventListener("DOMContentLoaded", function () {
    const contadorCarrinho = document.getElementById("contador-carrinho");

    function atualizarContadorCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        contadorCarrinho.textContent = carrinho.length;
        contadorCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
    }

    atualizarContadorCarrinho();
    window.addEventListener("atualizarCarrinho", atualizarContadorCarrinho);

    const secoes = [
        { chave: "aneis", id: "container-aneis" },
        { chave: "brincos", id: "container-brincos" },
        { chave: "colares", id: "container-colares" },
        { chave: "correntes", id: "container-correntes" },
        { chave: "pulseiras", id: "container-pulseiras" },
        { chave: "piercings", id: "container-piercings" },
        { chave: "limpeza", id: "container-limpeza" },
        { chave: "canga-toalhas", id: "container-cangas" },
        { chave: "moletons", id: "container-moletons" }
    ];

    secoes.forEach(secao => {
        carregarProdutosPorSessao(secao.chave, secao.id);
    });
});

function carregarProdutosPorSessao(sessao, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const produtos = JSON.parse(localStorage.getItem(`produtos-${sessao}`)) || [];
    produtos.forEach(produto => {
        const div = document.createElement("div");
        div.classList.add("produto-item");

        const link = document.createElement("a");
        link.href = `produto.html?nome=${encodeURIComponent(produto.nome)}&preco=${produto.preco}&imagem=${encodeURIComponent(produto.imagem)}&observacoes=${encodeURIComponent(produto.observacao || "")}&especificacao=${encodeURIComponent(produto.especificacao || "")}`;
        link.className = "link-card-produto";
        link.style.textDecoration = "none";

        const card = document.createElement("div");
        card.className = "card-produto";

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
        card.appendChild(imgDiv);
        card.appendChild(infoDiv);
        link.appendChild(card);
        div.appendChild(link);
        container.appendChild(div);
    });
    mostrarMensagemSemProdutos(container)
}

function carregarTodosProdutos() {
    const categorias = [
        "aneis", "brincos", "colares", "correntes", "pulseiras", "piercings", "limpeza", "cangas", "moletons"
    ];
    const containerTodos = document.getElementById('container-todos-produtos');
    categorias.forEach(categoria => {
        const dados = localStorage.getItem(`produtos-${categoria}`);
        if (dados) {
            const produtos = JSON.parse(dados);
            produtos.forEach(produto => {
                const card = criarCardProduto(produto);
                containerTodos.appendChild(card);
            });
        }
    });
}

function criarCardProduto(produto) {
    const div = document.createElement("div");
    div.classList.add("produto-item");

    const link = document.createElement("a");
    link.href = `produto.html?nome=${encodeURIComponent(produto.nome)}&preco=${produto.preco}&imagem=${encodeURIComponent(produto.imagem)}&observacoes=${encodeURIComponent(produto.observacao || "")}&especificacao=${encodeURIComponent(produto.especificacao || "")}`;
    link.className = "link-card-produto";

    const card = document.createElement("div");
    card.className = "card-produto";

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
    card.appendChild(imgDiv);
    card.appendChild(infoDiv);
    link.appendChild(card);
    div.appendChild(link);

    return div;
}

// Chama ao carregar a página:
carregarTodosProdutos();

// ====================== MENU LATERAL E HASH SCROLL ======================
let ultimoSelecionado = '.produtos-todos';

window.addEventListener('DOMContentLoaded', function () {
    const categoriaList = document.getElementById('categoria-list');
    const todosBtn = document.getElementById('todos-btn');
    categoriaList.style.display = 'block';
    document.querySelector(ultimoSelecionado).style.display = 'block';

    document.querySelectorAll('.produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza, .produtos-cangas, .produtos-moletons').forEach(function (produto) {
        produto.style.display = 'none';
    });

    todosBtn.classList.add('ativo');

    todosBtn.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelectorAll('#categoria-list li a').forEach(function (link) {
            link.classList.remove('ativo');
        });
        todosBtn.classList.add('ativo');
        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza, .produtos-cangas, .produtos-moletons').forEach(function (produto) {
            produto.style.display = 'none';
        });
        document.querySelector('.produtos-todos').style.display = 'block';
        ultimoSelecionado = '.produtos-todos';
    });
});

document.getElementById('categoria-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const categoriaList = document.getElementById('categoria-list');
    categoriaList.style.display = categoriaList.style.display === 'block' ? 'none' : 'block';
    if (categoriaList.style.display === 'none') {
        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza, .produtos-cangas, .produtos-moletons').forEach(function (produto) {
            produto.style.display = 'none';
        });
        document.querySelector(ultimoSelecionado).style.display = 'block';
    }
});

document.querySelectorAll('#categoria-list li a').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelectorAll('#categoria-list li a').forEach(function (link) {
            link.classList.remove('ativo');
        });
        link.classList.add('ativo');
        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza, .produtos-cangas, .produtos-moletons').forEach(function (produto) {
            produto.style.display = 'none';
        });

        if (link.id === 'todos-btn') {
            document.querySelector('.produtos-todos').style.display = 'block';
            ultimoSelecionado = '.produtos-todos';
        } else if (link.id === 'anel-btn') {
            document.querySelector('.produtos-anel').style.display = 'block';
            ultimoSelecionado = '.produtos-anel';
        } else if (link.id === 'brinco-btn') {
            document.querySelector('.produtos-brinco').style.display = 'block';
            ultimoSelecionado = '.produtos-brinco';
        } else if (link.id === 'colar-btn') {
            document.querySelector('.produtos-colar').style.display = 'block';
            ultimoSelecionado = '.produtos-colar';
        } else if (link.id === 'corrente-btn') {
            document.querySelector('.produtos-corrente').style.display = 'block';
            ultimoSelecionado = '.produtos-corrente';
        } else if (link.id === 'pulseira-btn') {
            document.querySelector('.produtos-pulseira').style.display = 'block';
            ultimoSelecionado = '.produtos-pulseira';
        } else if (link.id === 'piercing-btn') {
            document.querySelector('.produtos-piercing').style.display = 'block';
            ultimoSelecionado = '.produtos-piercing';
        } else if (link.id === 'limpeza-btn') {
            document.querySelector('.produtos-limpeza').style.display = 'block';
            ultimoSelecionado = '.produtos-limpeza';
        } else if (link.id === 'cangas-btn') {
            document.querySelector('.produtos-cangas').style.display = 'block';
            ultimoSelecionado = '.produtos-cangas';
        } else if (link.id === 'moletons-btn') {
            document.querySelector('.produtos-moletons').style.display = 'block';
            ultimoSelecionado = '.produtos-moletons';
        }
    });
});

window.addEventListener('DOMContentLoaded', function () {
    function ativarCategoriaPorHash() {
        if (window.location.hash) {
            const btn = document.querySelector(window.location.hash);
            if (btn) btn.click();
            setTimeout(() => {
                const target = document.getElementById('inicio-produtos');
                if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY - 65;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }

                // --- EFEITO FADEIN NOS PRODUTOS DA SESSÃO ATUAL ---
                // 1. Remove fade anterior
                document.querySelectorAll('.fadein').forEach(el => el.classList.remove('show'));
                // 2. Aplica fadein nos elementos visíveis
                setTimeout(() => {
                    // Só aplica em produtos visíveis
                    document.querySelectorAll('.fadein').forEach((el, i) => {
                        // Só faz o fade nos que estão visíveis (display diferente de 'none')
                        if (el.offsetParent !== null) {
                            setTimeout(() => {
                                el.classList.add('show');
                            }, i * 80);
                        }
                    });
                }, 20);
                // --- FIM DO FADEIN ---
            }, 250);
        }
    }
    ativarCategoriaPorHash();
    window.addEventListener('hashchange', ativarCategoriaPorHash);
});


// ============== MENU LATERAL ÍCONES =====================
const categoriaBtn = document.getElementById("categoria-btn");
const categoriaList = document.getElementById("categoria-list");
const toggleIcon = categoriaBtn.querySelector(".toggle-icon");
let isMenuOpen = true;
categoriaList.style.display = "block";
toggleIcon.textContent = "-";
categoriaBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (isMenuOpen) {
        categoriaList.style.display = "none";
        toggleIcon.textContent = "+";
        isMenuOpen = false;
    } else {
        categoriaList.style.display = "block";
        toggleIcon.textContent = "-";
        isMenuOpen = true;
    }
});

// ============== FILTRO DE PREÇO =========================
const precoBtn = document.getElementById("preco-btn");
const precoList = document.getElementById("preco-list");
const toggleIconPreco = precoBtn.querySelector(".toggle-icon-preco");
precoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (precoList.style.display === "none" || getComputedStyle(precoList).display === "none") {
        precoList.style.display = "block";
        toggleIconPreco.textContent = "-";
    } else {
        precoList.style.display = "none";
        toggleIconPreco.textContent = "+";
    }
});
precoList.style.display = "block";
toggleIconPreco.textContent = "-";
const minRange = document.getElementById("min-price");
const maxRange = document.getElementById("max-price");
const minValueDisplay = document.getElementById("min-value");
const maxValueDisplay = document.getElementById("max-value");
const sliderTrack = document.querySelector(".slider-track");
const minGap = 20;
function updateTrackFill() {
    const min = parseInt(minRange.value);
    const max = parseInt(maxRange.value);
    const range = parseInt(minRange.max) - parseInt(minRange.min);
    const minPercent = ((min - minRange.min) / range) * 100;
    const maxPercent = ((max - minRange.min) / range) * 100;
    sliderTrack.style.left = minPercent + "%";
    sliderTrack.style.width = (maxPercent - minPercent) + "%";
}
function updateMinPrice() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);
    if (min > max - minGap) {
        min = max - minGap;
        minRange.value = min;
    }
    minValueDisplay.textContent = `R$ ${min}`;
    updateTrackFill();
}
function updateMaxPrice() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);
    if (max < min + minGap) {
        max = min + minGap;
        maxRange.value = max;
    }
    maxValueDisplay.textContent = `R$ ${max}`;
    updateTrackFill();
}
minRange.addEventListener("input", updateMinPrice);
maxRange.addEventListener("input", updateMaxPrice);
updateMinPrice();
updateMaxPrice();
const btnFiltrar = document.getElementById("btn-filtrar");
btnFiltrar.addEventListener("click", () => {
    const min = parseInt(minRange.value);
    const max = parseInt(maxRange.value);
    const produtos = document.querySelectorAll(".produto-item");
    produtos.forEach(produto => {
        const precoTexto = produto.querySelector(".preco").textContent;
        const precoNumerico = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim());
        if (precoNumerico >= min && precoNumerico <= max) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }
    });
    const container = document.querySelector(ultimoSelecionado + ' .flex');
mostrarMensagemSemProdutos(container)
});

// ============== BUSCA AUTOCOMPLETE =======================
document.addEventListener('DOMContentLoaded', async function () {
    const input = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocomplete-list');
    let produtos = [];
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
        return todos;
    }
    function removerDuplicatas(lista) {
        const nomesVistos = new Set();
        return lista.filter(p => {
            if (nomesVistos.has(p.nome)) return false;
            nomesVistos.add(p.nome);
            return true;
        });
    }
    produtos = removerDuplicatas(carregarProdutosDoLocalStorage());
    input.addEventListener('input', function () {
        const valor = this.value.toLowerCase();
        autocompleteList.innerHTML = '';
        if (!valor) return;
        const sugestoes = produtos.filter(p => p.nome.toLowerCase().includes(valor));
        sugestoes.forEach(produto => {
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
        if (!e.target.closest('.search-container')) {
            autocompleteList.innerHTML = '';
        }
    });
});

// ============== ORDENAÇÃO ================================
document.getElementById("ordenacao").addEventListener("change", function () {
    const tipoOrdenacao = this.value;
    const container = document.querySelector(ultimoSelecionado);
    const grid = container.querySelector(".flex");
    const produtos = Array.from(grid.querySelectorAll(".produto-item"));
    produtos.sort((a, b) => {
        const nomeA = a.querySelector(".produto-nome").textContent.toUpperCase();
        const nomeB = b.querySelector(".produto-nome").textContent.toUpperCase();
        const precoA = parseFloat(
            a.querySelector(".preco").textContent.replace("R$", "").replace(",", ".").trim()
        );
        const precoB = parseFloat(
            b.querySelector(".preco").textContent.replace("R$", "").replace(",", ".").trim()
        );
        switch (tipoOrdenacao) {
            case "az":
                return nomeA.localeCompare(nomeB);
            case "za":
                return nomeB.localeCompare(nomeA);
            case "preco-asc":
                return precoA - precoB;
            case "preco-desc":
                return precoB - precoA;
            default:
                return 0;
        }
    });
    produtos.forEach(produto => grid.appendChild(produto));
});

// ============== FOOTER, CONTATO E ROLAGEM AUTOMÁTICA =====
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("scroll") && urlParams.get("scroll") === "footer") {
        document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
    }
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const successMessage = document.getElementById("success-message");
    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = "block";
                form.reset();
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
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}`, '_blank');
});

// ================= REDIRECIONAMENTO ENTRE PÁGINAS (ROLAGEM) ================
window.addEventListener("load", function () {
    const shouldScroll = sessionStorage.getItem("scrollToProdutos");
    if (shouldScroll === "true") {
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
});
document.getElementById("link-todos-produtos").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.setItem("scrollToProdutos", "true");
    window.location.href = "categorias.html";
});

document.getElementById("link-quem-somos").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.setItem("scrollToSobre", "true");
    window.location.href = "home.html";
});

// Rolagem para perguntas frequentes
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
    window.location.href = "home.html";
});

// ================= OVERLAY (opcional para UX) ===============
if (window.location.hash) {
    document.getElementById("overlay-scroll-fix").style.display = "block";
    setTimeout(() => {
        document.getElementById("overlay-scroll-fix").classList.add("oculto");
        setTimeout(() => {
            document.getElementById("overlay-scroll-fix").style.display = "none";
            document.getElementById("overlay-scroll-fix").classList.remove("oculto");
            document.querySelectorAll('.fadein').forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('show');
                }, i * 80);
            });
        }, 200);
    }, 400);
} else {
    document.getElementById("overlay-scroll-fix").style.display = "none";
    document.querySelectorAll('.fadein').forEach((el) => {
        el.classList.add('show');
    });
}

window.addEventListener('load', function () {
    if (window.location.hash) {
        const btn = document.querySelector(window.location.hash);
        if (btn) btn.click();
        setTimeout(() => {
            const targetContainer = document.querySelector('#inicio-produtos');
            if (targetContainer) {
                const y = targetContainer.getBoundingClientRect().top + window.scrollY - 110;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 250);
    }
});
// FADE-IN nos subitens do cabeçalho ao navegar em categorias.html

// Função para ativar o fadein (igual ao overlay, mas reaproveitável)
function ativarFadeInProdutos() {
    // Esconde tudo antes
    document.querySelectorAll('.fadein').forEach(el => {
        el.classList.remove('show');
    });

    // Mostra com efeito
    setTimeout(() => {
        document.querySelectorAll('.fadein').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('show');
            }, i * 80);
        });
    }, 10);
}

// Aplica o fadein ao clicar em qualquer subitem de categoria do cabeçalho
document.querySelectorAll('.submenu-nested a, .submenu-nestedC a, .submenu-nestedM a').forEach(link => {
    link.addEventListener('click', function (e) {
        // Se for link para a própria categorias.html (hash), deixa o overlay e o scroll cuidar
        if (this.href.includes('categorias.html#')) {
            // Espera o hash e aplica o fade
            setTimeout(() => {
                ativarFadeInProdutos();
            }, 420); // após o overlay (ajuste conforme necessário)
        } else {
            // Para outros links, faz fade imediato
            ativarFadeInProdutos();
        }
    });
});

// Também ativa no clique do menu principal "Categorias" caso você navegue entre hashes
document.getElementById('link-categorias').addEventListener('click', function () {
    setTimeout(() => {
        ativarFadeInProdutos();
    }, 420);
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



