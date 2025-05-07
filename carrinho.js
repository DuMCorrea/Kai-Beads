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
        carrinhoContainer.innerHTML = "";
        carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
        if (carrinho.length === 0) {
            mensagemVazio.style.display = "block";
        } else {
            mensagemVazio.style.display = "none";
    
            const produtosAgrupados = {};
            carrinho.forEach(produto => {
                if (produtosAgrupados[produto.nome]) {
                    produtosAgrupados[produto.nome].quantidade += 1;
                } else {
                    produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
                }
            });
    
            Object.values(produtosAgrupados).forEach(produto => {
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
        atualizarValorTotal(); // Atualiza o campo total
    }
    
    function atualizarValorTotal() {
        const valorTotalElemento = document.getElementById("valor-total");
    
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
        // Agrupar produtos por nome para considerar a quantidade
        const produtosAgrupados = {};
        carrinho.forEach(produto => {
            if (produtosAgrupados[produto.nome]) {
                produtosAgrupados[produto.nome].quantidade += 1;
            } else {
                produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
            }
        });
    
        // Calcular o total considerando a quantidade
        const total = Object.values(produtosAgrupados).reduce((soma, produto) => {
            return soma + produto.preco * produto.quantidade;
        }, 0);
    
        valorTotalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }   
    atualizarCarrinho();
});





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


// REDIRECIONAMENTO PARA PAGAMENTO


document.addEventListener("DOMContentLoaded", function() {
    const finalizarCompraBtn = document.querySelector('.finalizar-compra');
    
    finalizarCompraBtn.addEventListener('click', function() {
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
  
  
 
