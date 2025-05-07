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
        botao.addEventListener("click", function (event) {
            event.preventDefault(); // Impede que o botão redirecione para outra página
        
            const nome = botao.getAttribute("data-nome");
            const preco = botao.getAttribute("data-preco");
            const imagem = botao.getAttribute("data-imagem");
        
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        
            carrinho.push({ nome, preco, imagem });
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        
            alert("Produto adicionado ao carrinho!");
        
            window.dispatchEvent(new Event("atualizarCarrinho"));
        });        
    });
});



let ultimoSelecionado = '.produtos-todos'; // Começa com "Todos" como padrão

// Exibe o submenu de categoria e os produtos "Todos" ao carregar a página
window.addEventListener('load', function() {
    const categoriaList = document.getElementById('categoria-list');
    const todosBtn = document.getElementById('todos-btn');  // O botão "Todos"
    
    categoriaList.style.display = 'block'; // Exibe o submenu de categorias

    // Exibe todos os produtos inicialmente
    document.querySelector(ultimoSelecionado).style.display = 'block';

    // Oculta os outros conjuntos de produtos
    document.querySelectorAll('.produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza').forEach(function(produto) {
        produto.style.display = 'none';
    });

    // Adiciona a classe 'ativo' ao botão "Todos"
    todosBtn.classList.add('ativo');
    
    todosBtn.addEventListener('click', function(event) {
        event.preventDefault();

        document.querySelectorAll('#categoria-list li a').forEach(function(link) {
            link.classList.remove('ativo');
        });

        todosBtn.classList.add('ativo');

        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza').forEach(function(produto) {
            produto.style.display = 'none';
        });

        // Exibe os produtos "Todos"
        document.querySelector('.produtos-todos').style.display = 'block';
        ultimoSelecionado = '.produtos-todos'; // Atualiza o último selecionado
    });
});

// Abre e fecha o menu de categorias
document.getElementById('categoria-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const categoriaList = document.getElementById('categoria-list');
    categoriaList.style.display = categoriaList.style.display === 'block' ? 'none' : 'block';

    if (categoriaList.style.display === 'none') {
        // Exibe o último submenu selecionado ao fechar o menu
        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza').forEach(function(produto) {
            produto.style.display = 'none';
        });

        document.querySelector(ultimoSelecionado).style.display = 'block';
    }
});
// Exibe os produtos corretos ao clicar no submenu
document.querySelectorAll('#categoria-list li a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        document.querySelectorAll('#categoria-list li a').forEach(function(link) {
            link.classList.remove('ativo');
        });

        link.classList.add('ativo');

        document.querySelectorAll('.produtos-todos, .produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza').forEach(function(produto) {
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
            ultimoSelecionado = '.produtos-piercing';
        }
    });
});
window.addEventListener('load', function() {
    const categoriaList = document.getElementById('categoria-list');
    const todosBtn = document.getElementById('todos-btn');  // O botão "Todos"
    const anelBtn = document.getElementById('anel-btn');  // O botão "Anéis"
    const brincoBtn = document.getElementById('brinco-btn');  // O botão "Brincos"
    const colarBtn = document.getElementById('colar-btn');  // O botão "Colares"
    const correnteBtn = document.getElementById('corrente-btn');  // O botão "Correntes"
    const pulseiraBtn = document.getElementById('pulseira-btn');  // O botão "Pulseiras"
    const piercingBtn = document.getElementById('piercing-btn');  // O botão "Piercings"
    const limpezaBtn = document.getElementById('limpeza-btn');  // O botão "Limpeza"

    categoriaList.style.display = 'block'; // Exibe o submenu de categorias

    // Exibe todos os produtos inicialmente
    document.querySelector(ultimoSelecionado).style.display = 'block';

    // Oculta os outros conjuntos de produtos
    document.querySelectorAll('.produtos-anel, .produtos-brinco, .produtos-colar, .produtos-corrente, .produtos-pulseira, .produtos-piercing, .produtos-limpeza').forEach(function(produto) {
        produto.style.display = 'none';
    });

    // Adiciona a classe 'ativo' ao botão "Todos"
    todosBtn.classList.add('ativo');

    // Checa qual categoria foi passada na URL (hash)
    switch (window.location.hash) {
        case '#anel-btn':
            anelBtn.click();  // Simula o clique no botão "Anéis"
            break;
        case '#brinco-btn':
            brincoBtn.click();  // Simula o clique no botão "Brincos"
            break;
        case '#colar-btn':
            colarBtn.click();  // Simula o clique no botão "Colares"
            break;
        case '#corrente-btn':
            correnteBtn.click();  // Simula o clique no botão "Correntes"
            break;
        case '#pulseira-btn':
            pulseiraBtn.click();  // Simula o clique no botão "Pulseiras"
            break;
        case '#piercing-btn':
            piercingBtn.click();  // Simula o clique no botão "Piercings"
            break;
        case '#limpeza-btn':
            limpezaBtn.click();  // Simula o clique no botão "Limpeza"
            break;
        default:
            break;
    }

    // Outros eventos para os botões "Todos", "Anéis", etc. já estão definidos no seu código original
});


// ÍCONES MENU LATERAL

const categoriaBtn = document.getElementById("categoria-btn");
const categoriaList = document.getElementById("categoria-list");
const toggleIcon = categoriaBtn.querySelector(".toggle-icon");

// Define o menu como aberto por padrão
let isMenuOpen = true;
categoriaList.style.display = "block";
toggleIcon.textContent = "-";

// Evento de clique no botão "Categoria"
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

// Limite mínimo de distância entre sliders (se quiser, pode trocar para 1 ou outro valor)
const minGap = 20;

function updateTrackFill() {
  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);
  const range = parseInt(minRange.max) - parseInt(minRange.min);
  const minPercent = ((min - minRange.min) / range) * 100;
  const maxPercent = ((max - maxRange.min) / range) * 100;
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

// Inicializa
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
      produto.style.display = "block"; // mostra o produto
    } else {
      produto.style.display = "none"; // esconde o produto
    }
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







  

