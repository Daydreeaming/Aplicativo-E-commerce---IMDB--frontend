const infomacoesCarrinho = localStorage.getItem("informacoesCarrinho");
const conteudoMeioDoCarinho = document.querySelector(".conteudo_global_carrinho");
const inputsFormulario = document.querySelectorAll('.estilizar_input');
const botaoConcluirCompra = document.querySelector('.botao_concluido');
const inputDesconto = document.querySelector('#cupomDesconto');
const informacoesCarrinhoJSON =  JSON.parse(infomacoesCarrinho);


const verificarOsInputs = () => {
        for (let i = 0; i < inputsFormulario.length; i++) {
        if (inputsFormulario[i].value === '') {
            botaoConcluirCompra.disabled = true
            botaoConcluirCompra.classList.add('botaoDesabilitado')
            break
        } else {
            botaoConcluirCompra.disabled = false;
            botaoConcluirCompra.classList.remove('botaoDesabilitado')
        }
    }
}

const atualizarQuantidadeRemover = (event) => {

    const idTratado = Number(event.target.id.replace('id', ''));
    const quantidadeSpan = document.getElementById(`qtdID${idTratado}`);

    let quantidade = Number(quantidadeSpan.innerText) - 1
    
    if (quantidade < 0) {
        return
    }

    quantidadeSpan.innerText = `${quantidade}`

    atualizarVisualCarrinho(idTratado);
}

const atualizarQuantidadeAdicionar = (id) => {
    const idTratado = Number(id.replace('id', ''));
    const quantidadeSpan = document.getElementById(`qtdID${idTratado}`);

    let quantidade = Number(quantidadeSpan.innerText) + 1
    quantidadeSpan.innerText = `${quantidade}`;

    atualizarVisualCarrinho(idTratado);
}

const atualizarVisualCarrinho = (id) => {
        const filtrarFilmes = informacoesCarrinhoJSON.produtos.filter((movie) => {
        if(movie.id === id) {
            return movie
        }
    })

    const valorFilme = Number(filtrarFilmes[0].precoDoFilme.slice(1));

    const precoFilme = document.getElementById(`precoId${id}`);
    const quantidade = document.getElementById(`qtdID${id}`);

    console.log(quantidade.innerHTML)
    precoFilme.innerHTML = "$" + ` ${(Number(quantidade.innerHTML) * valorFilme).toFixed(2)}`;
    
    botaoDeConcluir()
}

const resumoPedido = () => {

    for (let i = 0; i < informacoesCarrinhoJSON.produtos.length; i++) {
        const elementoLi = document.createElement('li');
        elementoLi.classList.add("itens_carrinho");

        const informacoesElementoLiEsquerda = document.createElement("div");
        informacoesElementoLiEsquerda.classList.add("informacoes_produto_esquerda");

        const imagem = document.createElement("img");
        imagem.classList.add("tamanho_imagem");
        imagem.src = informacoesCarrinhoJSON.produtos[i].imagem // A IMAGEM DO LOCAL STORAGE 

        const conteudoCarrinho = document.createElement("div");
        conteudoCarrinho.classList.add("conteudo_carrinho");

        const nomeFilme = document.createElement("span");
        nomeFilme.classList.add("nomeFilme");
        nomeFilme.innerText = informacoesCarrinhoJSON.produtos[i].tituloDoFilme // TITULO DO FILME DO LOCAL STORAGE

        const precoFilme = document.createElement("span");
        precoFilme.classList.add("precoFilme")
        precoFilme.id = `precoId${informacoesCarrinhoJSON.produtos[i].id}`
        precoFilme.innerText = informacoesCarrinhoJSON.produtos[i].precoDoFilme // PREÇO DO FILME DO LOCAL STORAGE

        const informacoesElementoLiDireita = document.createElement("div");
        informacoesElementoLiDireita.classList.add("informacoes_produto_direita");

        const imagemBotaoAdicionar = document.createElement("img");
        imagemBotaoAdicionar.src = "imagens/botaoAdd.svg";
        imagemBotaoAdicionar.id = `id${informacoesCarrinhoJSON.produtos[i].id}`
        imagemBotaoAdicionar.addEventListener("click", (event) => {
            atualizarQuantidadeAdicionar(event.target.id)
        })

        const quantidade = document.createElement("span")
        quantidade.id = `qtdID${informacoesCarrinhoJSON.produtos[i].id}`
        quantidade.innerHTML = informacoesCarrinhoJSON.produtos[i].quantidadeComprada

        const imagemBotaoRemover = document.createElement("img");
        imagemBotaoRemover.src = "imagens/botaoRemove.svg";
        imagemBotaoRemover.id = `id${informacoesCarrinhoJSON.produtos[i].id}`
        imagemBotaoRemover.addEventListener("click", atualizarQuantidadeRemover);

        informacoesElementoLiDireita.append(imagemBotaoAdicionar);
        informacoesElementoLiDireita.append(quantidade);
        informacoesElementoLiDireita.append(imagemBotaoRemover);
        
        conteudoCarrinho.append(nomeFilme);
        conteudoCarrinho.append(precoFilme);
        informacoesElementoLiEsquerda.append(imagem);
        informacoesElementoLiEsquerda.append(conteudoCarrinho);
        elementoLi.append(informacoesElementoLiEsquerda);
        elementoLi.append(informacoesElementoLiDireita);
        conteudoMeioDoCarinho.append(elementoLi);
        atualizarVisualCarrinho(informacoesCarrinhoJSON.produtos[i].id)
    }    
}

const botaoDeConcluir = () => {
    let valorTotal = 0;

    const itensCarrinho = document.querySelectorAll(".precoFilme");

    for (const item of itensCarrinho) {
        const valor = Number(item.innerText.slice(1));
        valorTotal += valor
    }

    if (inputDesconto.value === 'HTMLNAOELINGUAGEM') {
        valorTotal = valorTotal/2;
    } 

    const botaoConcluirCompra = document.querySelector('.botao_concluido');
    botaoConcluirCompra.innerHTML = `<span>Comprar Agora</span> <span>$ ${valorTotal.toFixed(2)}</span>`


    const subTotalPreco = document.querySelector('.subtotalPreco');
    subTotalPreco.innerText = `$ ${valorTotal.toFixed(2)}`
}

for (const input of inputsFormulario) {
    input.addEventListener("input", verificarOsInputs)
}

botaoConcluirCompra.addEventListener("click", () => {
    location.href = 'desafio_pagina3.html';
})


inputDesconto.value = informacoesCarrinhoJSON.desconto;

inputDesconto.addEventListener("input", botaoDeConcluir);

verificarOsInputs();
resumoPedido();
botaoDeConcluir()