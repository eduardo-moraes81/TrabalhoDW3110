document
  .querySelector(".formMovie")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var filme = document.getElementById("filme").value;
    var classificacao = document.getElementById("classificacao").value;
    var filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    if (this.dataset.editarIndex !== undefined) {
      filmes[parseInt(this.dataset.editarIndex)] = {
        filme: filme,
        classificacao: classificacao,
      };
      delete this.dataset.editarIndex;
    } else {
      filmes.push({ filme: filme, classificacao: classificacao });
    }

    localStorage.setItem("filmes", JSON.stringify(filmes));

    atualizarTabela(filmes);

    document.getElementById("filme").value = "";
    document.getElementById("classificacao").value = "";
  });

function atualizarTabela(filmes) {
  var tabela = document
    .getElementById("tabelaDeFilmes")
    .getElementsByTagName("tbody")[0];
  tabela.innerHTML = "";

  filmes.forEach(function (item, index) {
    var novaLinha = tabela.insertRow();
    var celulaFilme = novaLinha.insertCell(0);
    var celulaClassificacao = novaLinha.insertCell(1);
    var celulaEditar = novaLinha.insertCell(2);
    var celulaExcluir = novaLinha.insertCell(3);

    celulaFilme.textContent = item.filme;
    celulaClassificacao.textContent = item.classificacao;

    var botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = function () {
      editarFilme(index);
    };
    celulaEditar.appendChild(botaoEditar);

    var botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
      excluirFilme(index);
    };
    celulaExcluir.appendChild(botaoExcluir);
  });
}

function editarFilme(index) {
  var filmes = JSON.parse(localStorage.getItem("filmes"));
  document.getElementById("filme").value = filmes[index].filme;
  document.getElementById("classificacao").value = filmes[index].classificacao;
  document.querySelector(".formMovie").dataset.editarIndex = index;
}

function excluirFilme(index) {
  var filmes = JSON.parse(localStorage.getItem("filmes"));
  filmes.splice(index, 1);

  localStorage.setItem("filmes", JSON.stringify(filmes));

  atualizarTabela(filmes);
}

function carregarFilmes() {
  var filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  atualizarTabela(filmes);
}


document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioLogado");
  sessionStorage.removeItem("nomeUsuario");
  window.location.href = "../index.html";
});

document
  .querySelector(".formStreaming")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var streaming = document.getElementById("streaming").value;

    var streamings = JSON.parse(localStorage.getItem("streamings")) || [];

    if (this.dataset.editarIndex !== undefined) {
      streamings[parseInt(this.dataset.editarIndex)] = streaming;
      delete this.dataset.editarIndex;
    } else {
      streamings.push(streaming);
    }

    localStorage.setItem("streamings", JSON.stringify(streamings));

    atualizarTabelaStreamings(streamings);

    document.getElementById("streaming").value = "";
  });

function atualizarTabelaStreamings(streamings) {
  var tabela = document
    .getElementById("tabelaDeStreamings")
    .getElementsByTagName("tbody")[0];
  tabela.innerHTML = "";

  streamings.forEach(function (item, index) {
    var novaLinha = tabela.insertRow();
    var celulaStreaming = novaLinha.insertCell(0);
    var celulaExcluir = novaLinha.insertCell(1);

    celulaStreaming.textContent = item;

    var botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
      excluirStreaming(index);
    };
    celulaExcluir.appendChild(botaoExcluir);
  });
}

function excluirStreaming(index) {
  var streamings = JSON.parse(localStorage.getItem("streamings"));
  streamings.splice(index, 1); 

  localStorage.setItem("streamings", JSON.stringify(streamings));

  atualizarTabelaStreamings(streamings);
}


function carregarStreamings() {
  var streamings = JSON.parse(localStorage.getItem("streamings")) || [];
  atualizarTabelaStreamings(streamings);
}


window.onload = function() {
  carregarFilmes();
  carregarStreamings();
};

