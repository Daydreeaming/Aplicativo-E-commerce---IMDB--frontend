const elementoTitulo = document.querySelector(".tituloDoFilme");


const requisicaoGenero = () => {
fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR")
    .then(respostaGenero => respostaGenero.json())
    .then(respostaJsonGenero => {
        elementoTitulo.innerText = respostaJsonGenero.name 
    })
};

const requisicaoPopularidade = () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(respostaPopularidade => respostaPopularidade.json())
    .then(respostaJsonPopularidade => {

    })
};

const requisicaoNaoSeiOq = () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=<id do gênero>&language=pt-BR")
    .then(respostaNaoSeiOq => respostaNaoSeiOq.json())
    .then(respostaJsonNaoSeiOq => {

    })
};

// const generoFilme = (respostaJsonGenero, respostaJsonPopularidade.id) => {
//     if (respostaJsonGenero.id === respostaJsonPopularidade.)
// }