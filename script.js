// Seleção de elementos
const botaoLogin = document.getElementById("botaoLogin");
const botaoCriarConta = document.getElementById("botaoCriarConta");
const loginModal = document.getElementById("login");
const criarContaModal = document.getElementById("criarConta");
const btnFecharLogin = document.getElementById("fecharLogin");
const btnFecharCriarConta = document.getElementById("btnFechar");
const mensagemBoasVindas = document.getElementById("mensagemBoasVindas");

botaoLogin.onclick = () => loginModal.showModal();
btnFecharLogin.onclick = () => loginModal.close();
botaoCriarConta.onclick = () => criarContaModal.showModal();
btnFecharCriarConta.onclick = () => criarContaModal.close();

document
 .getElementById("formCadastro")
 .addEventListener("submit", function (event) {
   event.preventDefault();

   const nome = document.getElementById("nmCompleto").value;
   const email = document.getElementById("emailCadastro").value;
   const dtNascimento = document.getElementById("dtNascimento").value;
   const telefone = document.getElementById("telefone").value;
   const senha = document.getElementById("senhaCadastro").value;
   const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
   const novoUsuario = {
     nome,
     email,
     dtNascimento,
     telefone,
     senha,
   };

   usuarios.push(novoUsuario);

   localStorage.setItem("usuarios", JSON.stringify(usuarios));

   this.reset();
   criarContaModal.close();
 });

document
 .getElementById("formLogin")
 .addEventListener("submit", function (event) {
   event.preventDefault();

   const email = document.getElementById("emailLogin").value;
   const senha = document.getElementById("senhaLogin").value;
   const dadosUsuario = JSON.parse(localStorage.getItem("usuarios"));
   const dadosAdmin = JSON.parse(localStorage.getItem("admin"));
   const erroAntigo = document.querySelector(".erro");

   if (erroAntigo) {
     erroAntigo.remove();
   }

   if (dadosAdmin && dadosAdmin.email === email && dadosAdmin.senha === senha) {
     sessionStorage.setItem(
       "usuarioLogado",
       JSON.stringify({ nome: dadosAdmin.nome, email: dadosAdmin.email, tipo: "admin" })
     );
     loginModal.close();
     window.location.href = "./admin/admin.html";
   }

    const usuarioEncontrado = dadosUsuario.find(
     (usuario) => usuario.email === email && usuario.senha === senha
   );

   if (usuarioEncontrado) {
     sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
     mensagemBoasVindas.textContent = `Olá, ${usuarioEncontrado.nome}`;
     loginModal.close();
     window.location.href = "./movielist/formulario.html";
   
   } else {
     let erro = document.createElement("p");
     erro.classList.add("erro");
     erro.innerText = "Login ou senha inválidos!";
     formLogin.insertBefore(erro, formLogin.firstChild);
     formLogin.reset();
   }
 });

document.addEventListener("DOMContentLoaded", () => {
 const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

 if (usuarioLogado) {
   mensagemBoasVindas.textContent = `Bem-vindo, ${usuarioLogado.nome}`;
   document.getElementById("botaoLogin");
   document.getElementById("logout");
 } else {
   document.getElementById("logout");
 }
});

if (!localStorage.getItem("admin")) {
 const admin = {
   nome: "Admin",
   email: "admin@admin.com",
   senha: "admin123",
   tipo: "admin",
 };
 localStorage.setItem("admin", JSON.stringify(admin));
}

document.querySelector(".formMovie").addEventListener("submit", function (event) {
event.preventDefault();

 const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
 const filme = document.getElementById("filme").value;
 const classificacao = document.getElementById("classificacao").value;
 let filmesPorUsuario = JSON.parse(localStorage.getItem("filmesPorUsuario")) || {};

 if (!filmesPorUsuario[usuarioLogado.email]) {
   filmesPorUsuario[usuarioLogado.email] = [];
 }

 filmesPorUsuario[usuarioLogado.email].push({ filme, classificacao });

 localStorage.setItem("filmesPorUsuario", JSON.stringify(filmesPorUsuario));
 atualizarTabela(filmesPorUsuario[usuarioLogado.email]);

 this.reset();
});

 const filmesPorUsuario = JSON.parse(localStorage.getItem("filmesPorUsuario")) || {};
 const filmesDoUsuario = filmesPorUsuario[usuarioLogado.email] || [];

 atualizarTabela(filmesDoUsuario);