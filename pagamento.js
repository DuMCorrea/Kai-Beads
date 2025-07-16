document.getElementById('formCliente').addEventListener('submit', function (e) {
  e.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    endereco: document.getElementById('endereco').value.trim(),
    numero: document.getElementById('numero').value.trim(),
    complemento: document.getElementById('complemento').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
    estado: document.getElementById('estado').value.trim(),
    cep: document.getElementById('cep').value.trim()
  };

  for (const key in dados) {
    if (!dados[key] && key !== "complemento") {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  }

  // Preencher o resumo com os dados fornecidos
  document.getElementById('resumo-nome').textContent = dados.nome;
  document.getElementById('resumo-email').textContent = dados.email;
  document.getElementById('resumo-telefone').textContent = dados.telefone;
  document.getElementById('resumo-endereco').textContent = dados.endereco;
  document.getElementById('resumo-numero').textContent = dados.numero;
  document.getElementById('resumo-complemento').textContent = dados.complemento || 'N/A';
  document.getElementById('resumo-cidade').textContent = dados.cidade;
  document.getElementById('resumo-estado').textContent = dados.estado;
  document.getElementById('resumo-cep').textContent = dados.cep;

  // Mostrar o resumo e ocultar o formulário
  document.querySelector('form').style.display = 'none';
  document.getElementById('resumo').style.display = 'block';

  // Configurar o botão de editar
  document.getElementById('editarButton').addEventListener('click', function () {
    // Restaurar os valores preenchidos no formulário
    document.getElementById('nome').value = dados.nome;
    document.getElementById('email').value = dados.email;
    document.getElementById('telefone').value = dados.telefone;
    document.getElementById('endereco').value = dados.endereco;
    document.getElementById('numero').value = dados.numero;
    document.getElementById('complemento').value = dados.complemento || ''; // Caso complemento esteja vazio
    document.getElementById('cidade').value = dados.cidade;
    document.getElementById('estado').value = dados.estado;
    document.getElementById('cep').value = dados.cep;

    // Mostrar novamente o formulário e ocultar o resumo
    document.querySelector('form').style.display = 'flex';
    document.getElementById('resumo').style.display = 'none';

    // Garantir que o botão de continuar volte ao estilo original
    const continuarButton = document.querySelector('form button');
    continuarButton.style.backgroundColor = '#ADD8E6';
    continuarButton.style.color = '#fff';
    continuarButton.style.cursor = 'pointer';
  });


  // SESSÃO DE ENTREGA


  // Ativa a seção de Método de Entrega
  const metodoEntrega = document.getElementById('metodoEntrega');
  metodoEntrega.classList.add('ativa');

  // Habilita os radio buttons da entrega
  const radios = metodoEntrega.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.disabled = false);

  // Scroll automático
  metodoEntrega.scrollIntoView({ behavior: 'smooth' });
});

// Ativa botão "Continuar" da entrega quando uma opção for selecionada
const radiosEntrega = document.querySelectorAll('input[name="entrega"]');
const botaoContinuar = document.getElementById('botaoContinuarEntrega');

radiosEntrega.forEach(radio => {
  radio.addEventListener('change', () => {
    botaoContinuar.disabled = false;
  });
});

// SESSÃO DE PAGAMENTO

botaoContinuar.addEventListener('click', () => {
  const entregaSelecionada = document.querySelector('input[name="entrega"]:checked');

  const sessaoPagamento = document.getElementById('sessaoPagamento');
  sessaoPagamento.classList.add('ativa');

  const valorFrete = entregaSelecionada
    .closest('label')
    .querySelector('.descricao')?.textContent || 'Sem taxa';


  document.getElementById('frete-valor').textContent = valorFrete;

  const radiosPagamento = sessaoPagamento.querySelectorAll('input[type="radio"]');
  radiosPagamento.forEach(r => r.disabled = false);

  sessaoPagamento.scrollIntoView({ behavior: 'smooth' });

  if (entregaSelecionada) {
    const infoEntrega = entregaSelecionada.closest('label').querySelector('.info-entrega');

    document.getElementById('formEntrega').style.display = 'none';
    document.getElementById('resumo-entrega-opcao').innerHTML = infoEntrega.innerHTML;
    document.getElementById('resumo-entrega').style.display = 'block';
  }
});

// FUNCIONALIDADE BOTÃO "EDITAR" DE ENTREGA
document.getElementById('editarEntrega').addEventListener('click', () => {
  document.getElementById('formEntrega').style.display = 'block';
  document.getElementById('resumo-entrega').style.display = 'none';

  // Desativa a sessão de pagamento
  const radiosPagamento = document.querySelectorAll('#sessaoPagamento input[type="radio"]');
  radiosPagamento.forEach(r => r.disabled = true);
  document.getElementById('sessaoPagamento').classList.remove('ativa');
});

document.addEventListener("DOMContentLoaded", function () {
  // Função que atualiza o total a pagar
  function atualizarValorTotal() {
    const valorTotalElemento = document.getElementById("valor-total");
    const freteElemento = document.getElementById("frete-valor");
    const totalGeralElemento = document.getElementById("total-geral");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtosAgrupados = {};
    carrinho.forEach(produto => {
      if (produtosAgrupados[produto.nome]) {
        produtosAgrupados[produto.nome].quantidade += 1;
      } else {
        produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
      }
    });

    // Calcular o subtotal
    const total = Object.values(produtosAgrupados).reduce((soma, produto) => {
      return soma + produto.preco * produto.quantidade;
    }, 0);

    // Atualizar o valor do subtotal
    valorTotalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Verificar o valor do frete
    let frete = freteElemento.textContent === "A calcular" || freteElemento.textContent === "Sem taxa" ? 0 : parseFloat(freteElemento.textContent.replace("R$", "").replace(",", ".").trim());

    // Atualizar o total a pagar, somando subtotal e frete
    const totalGeral = total + (isNaN(frete) ? 0 : frete);
    totalGeralElemento.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
  }

  // Atualiza o valor do frete e o total a pagar ao selecionar um método de entrega
  const radiosEntrega = document.querySelectorAll('input[name="entrega"]');
  radiosEntrega.forEach(radio => {
    radio.addEventListener('change', function () {
      const valorFrete = this.closest('label').querySelector('.descricao')?.textContent || 'Sem taxa';
      document.getElementById('frete-valor').textContent = valorFrete;

      // Atualiza o total a pagar
      atualizarValorTotal();
    });
  });

  // Função para atualizar o resumo dos itens no carrinho
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

  // Habilitar botão "Fazer pedido e pagar" ao selecionar um método de pagamento
const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
const botaoFinalizar = document.getElementById('botaoFinalizarPedido');

radiosPagamento.forEach(radio => {
  radio.addEventListener('change', () => {
    botaoFinalizar.disabled = false;
  });
});

// Inicializa o conteúdo do resumo ao carregar a página
atualizarValorTotal();
atualizarResumoItens();

// Evento para finalizar o pedido e redirecionar para o Mercado Pago
document.getElementById('botaoFinalizarPedido').addEventListener('click', () => {
  const metodoSelecionado = document.querySelector('input[name="pagamento"]:checked');

  if (!metodoSelecionado) {
    alert("Por favor, selecione um método de pagamento.");
    return;
  }

  if (metodoSelecionado.value === "Mercado Pago") {
    // Recalcular o total, incluindo o frete
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtosAgrupados = {};
    carrinho.forEach(produto => {
      if (produtosAgrupados[produto.nome]) {
        produtosAgrupados[produto.nome].quantidade += 1;
      } else {
        produtosAgrupados[produto.nome] = { ...produto, quantidade: 1 };
      }
    });

    const totalProdutos = Object.values(produtosAgrupados).reduce((soma, produto) => {
      return soma + produto.preco * produto.quantidade;
    }, 0);

    // Pega o valor do frete
    const freteTexto = document.getElementById("frete-valor").textContent;
    const frete = freteTexto === "A calcular" || freteTexto === "Sem taxa"
      ? 0
      : parseFloat(freteTexto.replace("R$", "").replace(",", ".").trim());

    const totalFinal = totalProdutos + frete;

    // Envia a requisição com o total final
    fetch('http://127.0.0.1:5000/criar-preferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descricao: "Pedido no Kai Beads",
        preco: Number(totalFinal.toFixed(2))
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.init_point) {
          // Redireciona para a página de pagamento do Mercado Pago
          window.location.href = data.init_point;
        } else {
          alert("Erro ao criar a preferência de pagamento.");
        }
      })
      .catch(error => {
        console.error('Erro ao criar preferência:', error);
        alert('Ocorreu um erro ao iniciar o pagamento.');
      });

  } else {
    // Pagamento Offline: apenas mostra uma mensagem
    alert("Pagamento via PIX selecionado. Seu pedido já foi confirmado. Em breve entraremos em contato!");
  }
});
});

document.getElementById('botaoFinalizarPedido').addEventListener('click', async (e) => {
  e.preventDefault(); // Evita o envio normal do form

  const nomeCliente = document.querySelector('#formCliente input[name="nome"]').value;
  const telefoneCliente = document.querySelector('#formCliente input[name="telefone"]').value;
  const emailCliente = document.querySelector('#formCliente input[name="email"]').value;
  const valorTotal = document.getElementById('total-geral').textContent;

  // Atualiza os inputs ocultos
  document.getElementById('pedido-nome').value = nomeCliente;
  document.getElementById('pedido-telefone').value = telefoneCliente;
  document.getElementById('pedido-email').value = emailCliente;
  document.getElementById('pedido-total').value = valorTotal;

  const form = document.getElementById('form-pedido');
  const formData = new FormData(form);

  try {
    // Envia o form para o FormSubmit via fetch
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json' // Se o FormSubmit aceitar JSON de resposta
      }
    });

    if (response.ok) {
      alert('Pedido enviado com sucesso!');

      // Limpa o carrinho
      localStorage.removeItem('carrinho');

      // Redireciona para home
      window.location.href = 'index.html';

    } else {
      alert('Erro ao enviar o pedido. Tente novamente.');
    }

  } catch (error) {
    alert('Erro ao enviar o pedido. Tente novamente.');
    console.error(error);
  }
});



// AJUSTES CAMPOS DO FORMULÁRIO



document.addEventListener('DOMContentLoaded', function() {
  const cepInput = document.getElementById('cep');

  cepInput.addEventListener('input', function(e) {
    let value = cepInput.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    cepInput.value = value.slice(0, 9); // Máximo 9 caracteres: 00000-000
  });

  cepInput.addEventListener('blur', function() {
    if (cepInput.value.length !== 9) {
      cepInput.setCustomValidity('Digite um CEP válido no formato 00000-000');
      cepInput.reportValidity();
    } else {
      cepInput.setCustomValidity('');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cepInput = document.getElementById('cep');
  const enderecoInput = document.getElementById('endereco');
  const cidadeInput = document.getElementById('cidade');
  const estadoInput = document.getElementById('estado');

  let ultimoCepBuscado = '';

  cepInput.addEventListener('input', function(e) {
    let value = cepInput.value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    cepInput.value = value.slice(0, 9);

    // Só busca o CEP quando tiver os 8 dígitos (9 com o traço) e evitar requisições duplicadas
    if (cepInput.value.length === 9 && cepInput.value !== ultimoCepBuscado) {
      let cepLimpo = cepInput.value.replace('-', '');
      buscarCep(cepLimpo);
      ultimoCepBuscado = cepInput.value;
    }
  });

  cepInput.addEventListener('blur', function() {
    if (cepInput.value.length !== 9) {
      cepInput.setCustomValidity('Digite um CEP válido no formato 00000-000');
      cepInput.reportValidity();
    } else {
      cepInput.setCustomValidity('');
    }
  });

  function buscarCep(cep) {
    enderecoInput.value = 'Carregando...';
    cidadeInput.value = '';
    estadoInput.value = '';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          enderecoInput.value = '';
          cidadeInput.value = '';
          estadoInput.value = '';
          alert('CEP não encontrado.');
          return;
        }
        enderecoInput.value = data.logradouro || '';
        cidadeInput.value = data.localidade || '';
        estadoInput.value = data.uf || '';
      })
      .catch(err => {
        enderecoInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';
        alert('Erro ao buscar CEP. Tente novamente.');
      });
  }
});

