// Registrar objeto
document.getElementById("form-objeto").addEventListener("submit", function(e){
  e.preventDefault();

  const nome = this.nome.value;
  const trecho = this.trecho.value;
  const dia = this.dia.value;
  const numero = this.numero.value;
  const assento = this.assento.value;
  const descricao = this.descricao.value;

  const resposta = `
    <h3>Objeto Registrado!</h3>
    <p><strong>Cliente:</strong> ${nome}</p>
    <p><strong>Trecho:</strong> ${trecho}</p>
    <p><strong>Dia:</strong> ${dia}</p>
    <p><strong>Voo:</strong> ${numero}</p>
    <p><strong>Assento:</strong> ${assento}</p>
    <p><strong>Descrição:</strong> ${descricao}</p>
  `;

  document.getElementById("resposta").innerHTML = resposta;

  this.reset();
});

// Copiar resultado
document.getElementById("btn-copiar").addEventListener("click", function(){
  const respostaText = document.getElementById("resposta").innerText;
  navigator.clipboard.writeText(respostaText).then(() => {
    alert("Resultado copiado para a área de transferência!");
  });
});
