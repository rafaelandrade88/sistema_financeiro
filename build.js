/**
 * build.js - FinanceFlow
 * ----------------------
 * Script de build executado pelo Netlify antes de publicar o site.
 * Le os arquivos do projeto, substitui os placeholders das chaves Firebase
 * pelas variaveis de ambiente injetadas pelo Netlify, e grava o resultado
 * na pasta dist/ (que e publicada, nunca commitada no Git).
 *
 * As chaves reais NUNCA ficam no codigo-fonte nem sobem para o GitHub.
 */

const fs   = require("fs");
const path = require("path");

// --------------------------------------------------------------------------
// 1. Validacao: garante que todas as variaveis estao definidas no Netlify
// --------------------------------------------------------------------------
const ENV_VARS = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];

const missing = ENV_VARS.filter((v) => !process.env[v]);
if (missing.length > 0) {
  console.error("ERRO: as seguintes variaveis de ambiente nao estao definidas no Netlify:");
  missing.forEach((v) => console.error("  -", v));
  console.error("\nVa em: Netlify > Site settings > Environment variables");
  process.exit(1);
}

// --------------------------------------------------------------------------
// 2. Cria a pasta dist/ do zero
// --------------------------------------------------------------------------
const DIST = path.join(__dirname, "dist");
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST);

// --------------------------------------------------------------------------
// 3. Funcoes auxiliares
// --------------------------------------------------------------------------

/** Copia arquivo ou pasta recursivamente para dist/, aplicando substituicoes em arquivos de texto. */
function copiar(origem, destino) {
  const stat = fs.statSync(origem);

  if (stat.isDirectory()) {
    fs.mkdirSync(destino, { recursive: true });
    for (const item of fs.readdirSync(origem)) {
      copiar(path.join(origem, item), path.join(destino, item));
    }
    return;
  }

  const TEXTO_EXTS = [".html", ".js", ".css", ".json", ".txt", ".webmanifest"];
  const ehTexto = TEXTO_EXTS.includes(path.extname(origem).toLowerCase());

  if (ehTexto) {
    let conteudo = fs.readFileSync(origem, "utf8");
    conteudo = substituirPlaceholders(conteudo);
    fs.writeFileSync(destino, conteudo, "utf8");
  } else {
    fs.copyFileSync(origem, destino);
  }
}

/** Troca todos os placeholders %%VARIAVEL%% pelos valores reais. */
function substituirPlaceholders(texto) {
  return texto
    .replace(/%%FIREBASE_API_KEY%%/g,            process.env.FIREBASE_API_KEY)
    .replace(/%%FIREBASE_AUTH_DOMAIN%%/g,         process.env.FIREBASE_AUTH_DOMAIN)
    .replace(/%%FIREBASE_PROJECT_ID%%/g,          process.env.FIREBASE_PROJECT_ID)
    .replace(/%%FIREBASE_STORAGE_BUCKET%%/g,      process.env.FIREBASE_STORAGE_BUCKET)
    .replace(/%%FIREBASE_MESSAGING_SENDER_ID%%/g, process.env.FIREBASE_MESSAGING_SENDER_ID)
    .replace(/%%FIREBASE_APP_ID%%/g,              process.env.FIREBASE_APP_ID);
}

// --------------------------------------------------------------------------
// 4. Copia tudo para dist/ (exceto pastas/arquivos que nao devem ir pro build)
// --------------------------------------------------------------------------
const IGNORAR = new Set([
  "node_modules", "dist", ".git", ".env",
  "build.js", "netlify.toml", ".gitignore", "README.md",
]);

for (const item of fs.readdirSync(__dirname)) {
  if (IGNORAR.has(item)) continue;
  copiar(path.join(__dirname, item), path.join(DIST, item));
  console.log("copiado:", item);
}

// --------------------------------------------------------------------------
// 5. Confirmacao final
// --------------------------------------------------------------------------
console.log("\nBuild concluido com sucesso!");
console.log("Arquivos em dist/ prontos para publicacao pelo Netlify.");
console.log("Chaves Firebase injetadas via variaveis de ambiente — nao expostas no codigo.");
