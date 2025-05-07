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

