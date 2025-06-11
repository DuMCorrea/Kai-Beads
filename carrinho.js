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




document.addEventListener("DOMContentLoaded", function () {
    const carrinhoContainer = document.getElementById("itens-carrinho");
    const mensagemVazio = document.getElementById("mensagem-vazio");
    const contadorCarrinho = document.getElementById("contador-carrinho");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function atualizarContadorCarrinho() {
        contadorCarrinho.textContent = carrinho.length;
        contadorCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
        window.dispatchEvent(new Event("atualizarCarrinho"));
    }

    function removerItem(nomeProduto) {
        carrinho = carrinho.filter(produto => produto.nome !== nomeProduto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        const resumoCarrinho = document.getElementById("resumo-carrinho");
        resumoCarrinho.style.display = carrinho.length === 0 ? "none" : "block";

        carrinhoContainer.innerHTML = "";
        carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        if (carrinho.length === 0) {
            mensagemVazio.style.display = "block";
            resumoCarrinho.style.display = "none";
        } else {
            mensagemVazio.style.display = "none";
            resumoCarrinho.style.display = "block";
            ;

            const produtosAgrupados = {};
            carrinho.forEach(produto => {
                if (produtosAgrupados[produto.nome]) {
                    produtosAgrupados[produto.nome].quantidade += 1;
                } else {
                    produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
                }
            });

            Object.values(produtosAgrupados)
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .forEach(produto => {
                    const precoTotal = (produto.preco * produto.quantidade).toFixed(2);

                    const item = document.createElement("div");
                    item.classList.add("produto-item");
                    item.innerHTML = `
                    <div class="card-produto">
                        <div class="img-produ" style="background-image: url(${produto.imagem});"></div>
                        <div class="info-produto">
                            <h3>${produto.nome}</h3>
                            <p class="preco">R$ ${precoTotal}</p>
                            <div class="quantidade-container">
                                <button class="btn-decrementar" data-nome="${produto.nome}">-</button>
                                <input type="number" class="input-quantidade" data-nome="${produto.nome}" value="${produto.quantidade}" min="1" readonly>
                                <button class="btn-incrementar" data-nome="${produto.nome}">+</button>
                            </div>
                            <button class="btn-remover" data-nome="${produto.nome}">Remover</button>
                        </div>
                    </div>
                `;
                    carrinhoContainer.appendChild(item);
                });

            document.querySelectorAll(".btn-remover").forEach(botao => {
                botao.addEventListener("click", function () {
                    const nomeProduto = botao.getAttribute("data-nome");
                    removerItem(nomeProduto);
                });
            });

            document.querySelectorAll(".btn-incrementar").forEach(botao => {
                botao.addEventListener("click", () => {
                    const nome = botao.getAttribute("data-nome");
                    const produtoOriginal = carrinho.find(p => p.nome === nome);
                    if (produtoOriginal) {
                        carrinho.push(produtoOriginal);
                        localStorage.setItem("carrinho", JSON.stringify(carrinho));
                        atualizarCarrinho();
                    }
                });
            });

            document.querySelectorAll(".btn-decrementar").forEach(botao => {
                botao.addEventListener("click", () => {
                    const nome = botao.getAttribute("data-nome");
                    const index = carrinho.findIndex(p => p.nome === nome);
                    if (index !== -1) {
                        carrinho.splice(index, 1);
                        localStorage.setItem("carrinho", JSON.stringify(carrinho));
                        atualizarCarrinho();
                    }
                });
            });
        }

        atualizarContadorCarrinho();
        atualizarValorTotal();
        atualizarResumoItens(); // <-- ESSA LINHA É A CORREÇÃO PRINCIPAL
    }

    function atualizarValorTotal() {
        const valorTotalElemento = document.getElementById("valor-total");

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const produtosAgrupados = {};
        carrinho.forEach(produto => {
            if (produtosAgrupados[produto.nome]) {
                produtosAgrupados[produto.nome].quantidade += 1;
            } else {
                produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
            }
        });

        const total = Object.values(produtosAgrupados).reduce((soma, produto) => {
            return soma + produto.preco * produto.quantidade;
        }, 0);

        valorTotalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    function atualizarResumoItens() {
        const resumoItens = document.getElementById("resumo-itens");
        resumoItens.innerHTML = "";

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const produtosAgrupados = {};
        carrinho.forEach(produto => {
            if (produtosAgrupados[produto.nome]) {
                produtosAgrupados[produto.nome].quantidade += 1;
            } else {
                produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
            }
        });

        const lista = document.createElement("ul");
        lista.classList.add("lista-resumo-itens");

        Object.values(produtosAgrupados)
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach(produto => {
                const item = document.createElement("li");
                item.textContent = `${produto.nome} (Quant.: ${produto.quantidade})`;
                lista.appendChild(item);
            });
        resumoItens.appendChild(lista);
    }
    atualizarCarrinho(); // inicializa carrinho e atualiza tudo ao carregar
});






// CAMPO PESQUISAR



document.addEventListener('DOMContentLoaded', async function () {
  const input = document.getElementById('searchInput');
  const autocompleteList = document.getElementById('autocomplete-list');

  let produtos = [];

  // Função para extrair produtos de outra página
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
      console.error('Erro ao carregar a página:', error);
      return [];
    }
  }

  // Coletar produtos de todas as páginas principais
  const produtosHome = await getProdutosDeOutraPagina('home.html');
  const produtosCategorias = await getProdutosDeOutraPagina('categorias.html');

  produtos = [...produtosHome, ...produtosCategorias];

  // Evento de input
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



// REDIRECIONAMENTO PARA PAGAMENTO


document.addEventListener("DOMContentLoaded", function () {
    const finalizarCompraBtn = document.querySelector('.finalizar-compra');

    finalizarCompraBtn.addEventListener('click', function () {
        // Aqui, você pode passar as informações do carrinho para a página de pagamento, se necessário
        // Como exemplo, vou passar o total da compra para a próxima página através da URL
        const total = document.getElementById('valor-total').textContent;

        // Você pode usar localStorage para armazenar temporariamente o total ou outras informações do carrinho
        localStorage.setItem('totalCompra', total);

        // Redireciona para a página de pagamento
        window.location.href = "pagamento.html";
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
    window.location.href = "home.html";
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
    window.location.href = "home.html";
});