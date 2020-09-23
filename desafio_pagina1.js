const descontoCupom = document.querySelector('.card_esquerda_cima');
const inputDescontoVazio = document.querySelector('.cupomDesconto1');
const inputDesconto = document.querySelector('.cupomDesconto2');
const elementoTopFilmes = document.querySelector("#topFilmes");
const botaoGeneroTodos = document.querySelector('#generoTodos');
const botaoGeneroAcao = document.querySelector('#generoAcao');
const botaoGeneroRomance = document.querySelector('#generoRomance');
const botaoGeneroFiccao = document.querySelector('#generoFiccao');
const botaoGeneroTerror = document.querySelector('#generoTerror');
const elementoFilmes = document.querySelector("#filmes");
const cronometro = document.querySelector("#cronometro");
const conteudoMeioDoCarinho = document.querySelector(".conteudo_global_carrinho");
const sacolitaSemProduto = document.querySelector(".carrinho_de_compras");
const sacolitaComProduto = document.querySelector(".carrinho_de_compras2");
const botaoConcluido = document.querySelector('.botao_concluido2');

let movies = [];
let topMovies = [];   
let carrinho = [];

const relogio = (minuto, segundos) => {
    if ((minuto > 0) || (segundos > 0)) {
        if (segundos == 0) {
            segundos = 59
            minuto--
        } else {
            segundos --
        } 

        if (minuto.toString().length === 1) {
            minuto = "0" + minuto
        }

        if (segundos.toString().length === 1) {
            segundos = "0" + segundos;
        }
        cronometro.innerHTML = `${minuto}:${segundos}`
        setTimeout(function(){
            relogio(minuto, segundos)
        }, 1000);
    } else {
        descontoCupom.style.display = "none"
    }
}

const desconto = () => {
    descontoCupom.style.display = "none"

    inputDescontoVazio.value = 'HTMLNAOELINGUAGEM'
    inputDesconto.value = 'HTMLNAOELINGUAGEM'
}

const desaparecerDesconto = () => {
    cronometro.innerHTML = `05:00`
    setTimeout(function(){
        relogio(5, 0)
    }, 1000);
}

const atualizarQuantidadeRemover = (event) => {

    const idTratado = Number(event.target.id.replace('id', ''));
    const quantidadeSpan = document.getElementById(`qtdID${idTratado}`);

    let quantidade = Number(quantidadeSpan.innerText) - 1
    quantidadeSpan.innerText = `${quantidade}`
    if (quantidade <= 0) {
        const botaoRemover = event.target;
        const filmesSacola = botaoRemover.closest("li");
        filmesSacola.remove()
    } 
    atualizarVisualCarrinho(idTratado);
}

const atualizarQuantidadeAdicionar = (id) => {
    const idTratado = Number(id.replace('id', ''));
    const quantidadeSpan = document.getElementById(`qtdID${idTratado}`);

    let quantidade = Number(quantidadeSpan.innerText) + 1
    quantidadeSpan.innerText = `${quantidade}`;

    atualizarVisualCarrinho(idTratado);
}

const visualizarFilmesByGenero = (categoria) => {

    botaoGeneroTodos.classList.remove('ativo')
    botaoGeneroAcao.classList.remove('ativo')
    botaoGeneroRomance.classList.remove('ativo')
    botaoGeneroFiccao.classList.remove('ativo')
    botaoGeneroTerror.classList.remove('ativo')

    if (categoria === 'Todos') {
        botaoGeneroTodos.classList.add('ativo')
    } else if (categoria === 'Ação') {
        botaoGeneroAcao.classList.add('ativo')
    } else if (categoria === 'Romance') {
        botaoGeneroRomance.classList.add('ativo')
    } else if (categoria === "SciFi") {
        botaoGeneroFiccao.classList.add('ativo')
    } else {
        botaoGeneroTerror.classList.add('ativo')
    }
}

const atualizarVisualCarrinho = (id) => {
    if (conteudoMeioDoCarinho.children.length > 0)  {
        sacolitaSemProduto.hidden = true
        sacolitaComProduto.hidden = false
    } else {
        sacolitaSemProduto.hidden = false
        sacolitaComProduto.hidden = true
        return
    }

    const filtrarFilmes = movies.filter((movie) => {
        if(movie.id === id) {
            return movie
        }
    })

    const valorFilme = filtrarFilmes[0].price

    const precoFilme = document.getElementById(`precoId${id}`);
    const quantidade = document.getElementById(`qtdID${id}`);

    precoFilme.innerHTML = "$" + ` ${(Number(quantidade.innerHTML) * valorFilme).toFixed(2)}`;

    
    botaoDeConcluir()
}

const atualizarCarrinho = (id) => {

    let itemCarrinho

    const filtrarCarrinho = carrinho.filter((movie) => {
        if(movie.id === id) {
            return movie
        }
    })

    for (const movie of movies) {
        if(movie.id === id && !filtrarCarrinho.length > 0) {
            itemCarrinho = movie
            carrinho.push(itemCarrinho)
            break
        } else if (movie.id === id && filtrarCarrinho.length > 0) {
            atualizarQuantidadeAdicionar(id.toString())
            return
        }
    }

    const elementoLi = document.createElement('li');
    elementoLi.classList.add("itens_carrinho");

    const informacoesElementoLiEsquerda = document.createElement("div");
    informacoesElementoLiEsquerda.classList.add("informacoes_produto_esquerda");

    const imagem = document.createElement("img");
    imagem.classList.add("tamanho_imagem");
    imagem.src = itemCarrinho.poster_path

    const conteudoCarrinho = document.createElement("div");
    conteudoCarrinho.classList.add("conteudo_carrinho");

    const nomeFilme = document.createElement("span");
    nomeFilme.classList.add("nomeFilme");
    nomeFilme.innerText = itemCarrinho.title

    const precoFilme = document.createElement("span");
    precoFilme.classList.add("precoFilme")
    precoFilme.id = `precoId${itemCarrinho.id}`
    precoFilme.innerText = itemCarrinho.price.toFixed(2) 

    const informacoesElementoLiDireita = document.createElement("div");
    informacoesElementoLiDireita.classList.add("informacoes_produto_direita");

    const imagemBotaoAdicionar = document.createElement("img");
    imagemBotaoAdicionar.src = "imagens/botaoAdd.svg";
    imagemBotaoAdicionar.id = `id${itemCarrinho.id}`
    imagemBotaoAdicionar.addEventListener("click", (event) => {
        atualizarQuantidadeAdicionar(event.target.id)
    })

    const quantidade = document.createElement("span")
    quantidade.id = `qtdID${itemCarrinho.id}`
    quantidade.innerHTML = 1

    const imagemBotaoRemover = document.createElement("img");
    imagemBotaoRemover.src = "imagens/botaoRemove.svg";
    imagemBotaoRemover.id = `id${itemCarrinho.id}`
    imagemBotaoRemover.addEventListener("click", atualizarQuantidadeRemover)

    informacoesElementoLiDireita.append(imagemBotaoAdicionar)
    informacoesElementoLiDireita.append(quantidade)
    informacoesElementoLiDireita.append(imagemBotaoRemover)

    conteudoCarrinho.append(nomeFilme)
    conteudoCarrinho.append(precoFilme)
    informacoesElementoLiEsquerda.append(imagem);
    informacoesElementoLiEsquerda.append(conteudoCarrinho);
    elementoLi.append(informacoesElementoLiEsquerda)
    elementoLi.append(informacoesElementoLiDireita)
    conteudoMeioDoCarinho.append(elementoLi)

    
    atualizarVisualCarrinho(id)
}

const botaoDeConcluir = () => {

    let valorTotal = 0;

    const itensCarrinho = document.querySelectorAll(".precoFilme")

    for (const item of itensCarrinho) {
        const valor = Number(item.innerText.slice(1));
        valorTotal += valor
    }

    if (inputDesconto.value === 'HTMLNAOELINGUAGEM') {
        valorTotal = valorTotal/2;
    } 

    const botaoConcluir = document.querySelector('#concluir');

    botaoConcluir.innerHTML = `$ ${valorTotal.toFixed(2)}`
}

const armazenarJSON = () => { 

    const produtosInseridos = document.querySelectorAll('.itens_carrinho');

    let produtosDoCarrinho = {
        desconto : inputDesconto.value,
        produtos : []
    }

    for (let i = 0; i < produtosInseridos.length; i++) {
        const imagemDoFilme = produtosInseridos[i].querySelector(".tamanho_imagem");
        const tituloDoFilme = produtosInseridos[i].querySelector(".nomeFilme");
        const precoDoFilme = produtosInseridos[i].querySelector(".precoFilme");
        const quantidadeComprada = produtosInseridos[i].querySelector(".informacoes_produto_direita > span")
        const id = precoDoFilme.id
        const idTratado = id.replace('precoId', '')
        
        const informacoesCarrinho = {
            id : Number(idTratado),
            imagem : imagemDoFilme.src,
            tituloDoFilme : tituloDoFilme.innerText,
            precoDoFilme : precoDoFilme.innerText,
            quantidadeComprada : quantidadeComprada.innerText
        }
        produtosDoCarrinho.produtos.push(informacoesCarrinho) 
    }
    
    const transformarEmJSON = JSON.stringify(produtosDoCarrinho)
    localStorage.setItem("informacoesCarrinho", transformarEmJSON);

    location.href = ('desafio_pagina2.html');
}

const getTopFilmes = () => {
    fetch(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR&sort_by=vote_count.desc`)
        .then(data => data.json())
        .then(movie => {
            topMoviesResultado = movie.results;
            const rows = topMoviesResultado.map(movie => {
                movies.push(movie)
                return `
                <li class="filmes">
                    <div class="imagemFilme" style="background-image: url(${movie.poster_path})">
                        <div class="opacidade">
                            <button class='card_cabecalho_filmes'>
                                <img src="imagens/estrela_topo.svg" />
                            </button>
                            <div class="containerRodapeFilme">
                                <div class="filmeInfos">
                                    <span class="tituloFilme">${movie.title}</span>
                                    <div class="containerEstrela">
                                        <img src="imagens/estrelaNota.svg" />
                                        <span class="notaFilme"> ${movie.vote_average} </span>
                                    </div>
                                </div>
                                <button class="comprarBotaoFilme" id=movie${movie.id}>
                                    <span> Sacola </span>
                                    <span> $ ${movie.price.toFixed(2)} </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                `;
            });
            const html = `${rows.slice(0, 5).join('')}`;
            elementoTopFilmes.innerHTML = html;
        })
};

const getFilmes = () => {
    fetch(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR`)
        .then(data => data.json())
        .then(movie => {
            moviesResultado = movie.results;
            const rows = moviesResultado.map(movie => {
                movies.push(movie)
                return `
                <li class="filmes">
                    <div class="imagemFilme" style="background-image: url(${movie.poster_path})">
                        <div class="opacidade">
                            <div class='card_cabecalho_filmes'>
                                <img src="imagens/estrela_topo.svg"/>
                            </div>
                            <div class="containerRodapeFilme">
                                <div class="filmeInfos">
                                    <span class="tituloFilme">${movie.title}</span>
                                    <div class="containerEstrela">
                                        <img src="imagens/estrelaNota.svg" />
                                        <span class="notaFilme"> ${movie.vote_average} </span>
                                    </div>
                                </div>
                                <button class="comprarBotaoFilme" id=movie${movie.id}>
                                    <span> Sacola </span>
                                    <span> $ ${movie.price.toFixed(2)} </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                `;
            });
            const html = `${rows.splice(',').join('')}`;
            elementoFilmes.innerHTML = html;
            const botarFilmeSacola = document.querySelectorAll(".comprarBotaoFilme");
            for (let i = 0; i < botarFilmeSacola.length; i++){
                const id = botarFilmeSacola[i].id
                const idTratado = Number(id.replace("movie", ''))
                botarFilmeSacola[i].addEventListener("click", () => {atualizarCarrinho(idTratado)})
            }
        })
};

const getFilmesByGenero = (id) => {

    fetch(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${id}&language=pt-BR`) 
    .then(data => data.json())
    .then(movie => {
        movies = movie.results;
            const rows = movies.map(movie => {
                return `
            <li class="filmes">
                <div class="imagemFilme" style="background-image: url(${movie.poster_path})">
                    <div class="opacidade">
                        <div class='card_cabecalho_filmes'>
                            <img src="imagens/estrela_topo.svg" />
                        </div>
                        <div class="containerRodapeFilme">
                            <div class="filmeInfos">
                                <span class="tituloFilme">${movie.title}</span>
                                <div class="containerEstrela">
                                    <img src="imagens/estrelaNota.svg" />
                                    <span class="notaFilme"> ${movie.vote_average} </span>
                                </div>
                            </div>
                            <button class="comprarBotaoFilme" id=movie${movie.id}>
                                <span> Sacola </span>
                                <span>R$ ${movie.price} </span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            `;
            });
            const html = `${rows.splice(',').join('')}`;
            elementoFilmes.innerHTML = html;
            const botarFilmeSacola = document.querySelectorAll(".comprarBotaoFilme");
            for (let i = 0; i < botarFilmeSacola.length; i++){
                const id = botarFilmeSacola[i].id
                const idTratado = Number(id.replace("movie", ''))
                botarFilmeSacola[i].addEventListener("click", () => {atualizarCarrinho(idTratado)})
            }
        })
};

descontoCupom.addEventListener("click", desconto);

// Botao Todos //

botaoGeneroTodos.addEventListener("click", () => {
    visualizarFilmesByGenero('Todos')
    getFilmes();
});

// Botao Ação //

botaoGeneroAcao.addEventListener("click", () => {

})
botaoGeneroAcao.addEventListener("click", () => {
    visualizarFilmesByGenero('Ação');
    getFilmesByGenero(28);
});

// Botao Romance //

botaoGeneroRomance.addEventListener("click", () => {
    visualizarFilmesByGenero('Romance')
    getFilmesByGenero(10749)
});

// Botao SciFi //

botaoGeneroFiccao.addEventListener("click", () => {
    visualizarFilmesByGenero('SciFi')
    getFilmesByGenero(878)
});

// Botao Terror //

botaoGeneroTerror.addEventListener("click", () => {
    visualizarFilmesByGenero('terror')
    getFilmesByGenero(27)
});

inputDesconto.addEventListener("input", botaoDeConcluir);
desaparecerDesconto()
getTopFilmes();
getFilmes();


botaoConcluido.addEventListener("click", armazenarJSON);