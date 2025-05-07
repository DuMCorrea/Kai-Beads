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
        const sessaoPagamento = document.getElementById('sessaoPagamento');
        sessaoPagamento.classList.add('ativa');
      
        const radiosPagamento = sessaoPagamento.querySelectorAll('input[type="radio"]');
        radiosPagamento.forEach(r => r.disabled = false);
      
        sessaoPagamento.scrollIntoView({ behavior: 'smooth' });
      
        const entregaSelecionada = document.querySelector('input[name="entrega"]:checked');
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
      
  