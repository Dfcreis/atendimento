

function quebrarEm56(texto) {
  texto = texto.replace(/\r?\n/g, " ");
  let resultado = "";
  let contador = 0;
  for (let i = 0; i < texto.length; i++) {
    resultado += texto[i];
    contador++;
    if (contador === 56) {
      resultado += "\n";
      contador = 0;
    }
  }
  return resultado.trimEnd();
}

const waiveSelect = document.getElementById("waive");
const waveDetalheDiv = document.getElementById("wave-detalhe");
const tipoWaive = document.getElementById("tipoWaive");
const waiveBox = document.getElementById("waiveBox");

const waiverMap = {
  "Erro sistêmico": "waiver 1",
  "Cliente smiles categorizado cobrando assento": "waiver 1",
  "Regra tarifária possuem bagagem mas em VCR não conta": "waiver 1",
  "Cancelamento dentro das 24hrs": "waiver 8",
  "Cancelamento de serviço": "waiver 8",
  "Remarcação laudo médico": "waiver 13",
  "Cancelamento laudo médico": "waiver 13",
  "Remarcação concurso público": "waiver 13",
  "Cancelamento concurso público": "waiver 13",
  "Duplicidade de compra": "waiver 13",
  "Remarcação erro do cliente dentro das 24hrs": "waiver 13",
  "Cancelamento por acomodação": "waiver 14",
  "Intenção de assento por acomodação": "waiver 14",
  "Intenção de assento para menos de 16 anos": "waiver 8"
};

waiveSelect.addEventListener("change", () => {
  waveDetalheDiv.style.display = waiveSelect.value === "Sim" ? "block" : "none";
  waiveBox.style.display = "none";
});

tipoWaive.addEventListener("change", () => {
  const selecionada = tipoWaive.value;
  if (selecionada && waiverMap[selecionada]) {
    waiveBox.textContent = waiverMap[selecionada];
    waiveBox.style.display = "block";
  } else {
    waiveBox.style.display = "none";
  }
});

document.getElementById("gerar").onclick = function() {
  const ticket = document.getElementById("ticket").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const pnr = document.getElementById("localizador").value.trim();
  const resumo = document.getElementById("resumo").value.trim();
  const waive = waiveSelect.value;
  const tipo = tipoWaive.value;
  const assinatura = document.getElementById("assinatura").value.trim();
  const resumoFormatado = quebrarEm56(resumo);
  const waiverText = waiverMap[tipo] ? waiverMap[tipo] : "";

  // Monta o texto do resultado
  let texto = 
`🗣Resumo do cliente
${resumoFormatado}

------------------------------------- 
DADOS DO CLIENTE
📓 contato - ${numero}
🔍 Localizador - ${pnr}
✍Assinatura - ${assinatura}

-------------------------------------------------
Ticket - ${ticket}
Utilizou waiver - ${waive}${waive === "Sim" && tipo ? `
Qual waive - ${waiverText}
Motivo - ${tipo}` : ""}`; // <-- Motivo só aparece se houver waive

  document.getElementById("resultado").value = texto;
  document.getElementById("copyButton").style.display = "block";
};

/* copiar */
document.getElementById("copyButton").onclick = function() {
  const resultText = document.getElementById("resultado").value;
  navigator.clipboard.writeText(resultText);
  this.textContent = "✅ Copiado!";
  setTimeout(() => this.textContent = "📋 Copiar Resultado", 2000);
};

/* limpar */
document.getElementById("limpar").onclick = function() {
  document.querySelectorAll("input, textarea").forEach(el => el.value = "");
  document.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
  document.getElementById("resultado").value = "";
  waveDetalheDiv.style.display = "none";
  waiveBox.style.display = "none";
  document.getElementById("copyButton").style.display = "none";
};

/* ----- Melhoria UX: contador de caracteres do resumo ----- */
const resumoEl = document.getElementById("resumo");
const restanteEl = document.getElementById("caracteresRestantes");
resumoEl.addEventListener("input", () => {
  const left = 336 - resumoEl.value.length;
  restanteEl.textContent = `${left} caracteres restantes`;
});

/* ----- Menu lateral toggle + navegação visual (simples) ----- */
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
toggleSidebar && toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

/* Navegação simples entre seções (apenas visual, não altera form) */
document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    btn.classList.add("active");
    // Se quisermos mostrar/ocultar seções diferentes futuramente, fazemos aqui.
  });
});
