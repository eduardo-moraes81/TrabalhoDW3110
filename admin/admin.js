const tabelaBody = document.getElementById("tabelaBody");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function popularTabela(usuarios) {
  tabelaBody.innerHTML = "";
  usuarios.forEach((usuarios) => {
    const linha = document.createElement("tr");

    const colunaNome = document.createElement("td");
    colunaNome.textContent = usuarios.nome;
    linha.appendChild(colunaNome);

    const colunaEmail = document.createElement("td");
    colunaEmail.textContent = usuarios.email;
    linha.appendChild(colunaEmail);

    const colunaNumero = document.createElement("td");
    colunaNumero.textContent = usuarios.telefone;
    linha.appendChild(colunaNumero);
    tabelaBody.appendChild(linha);
  });
}

document.getElementById('logout').addEventListener('click', () =>{
  sessionStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('nomeUsuario');
  window.location.href = "../index.html";
});

popularTabela(usuarios);
