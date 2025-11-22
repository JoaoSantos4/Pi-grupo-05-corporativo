const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// === CONFIGURAÇÃO DE VIEWS E ARQUIVOS ESTÁTICOS ===
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// === SESSÃO ===
app.use(
  session({
    secret: "segredo-corporativo-123",
    resave: false,
    saveUninitialized: false,
  })
);

// === IMPORTAÇÃO DAS ROTAS ===
const authRouter = require("./Routers/auth");
const dashboardRouter = require("./Routers/dashboard");
const estoqueRouter = require("./Routers/estoque");
const pagarRouter = require("./Routers/pagar");
const relatoriosRouter = require("./Routers/relatorios");
const expedicaoRouter = require("./Routers/expedicao");
const algoritmosRouter = require("./Routers/algoritmos");

// === AUTENTICAÇÃO CORPORATIVA ===
function ensureAuth(req, res, next) {
  if (!req.session.corporativo) return res.redirect("/");
  next();
}

// === USO DAS ROTAS ===
app.use("/", authRouter);

// Rotas protegidas
app.use("/corporativo", ensureAuth, dashboardRouter);
app.use("/estoque", ensureAuth, estoqueRouter);
app.use("/pagar", ensureAuth, pagarRouter);
app.use("/relatorios", ensureAuth, relatoriosRouter);
app.use("/expedicao", ensureAuth, expedicaoRouter);

// Rota pública
app.use("/algoritmos", algoritmosRouter);

// === INICIAR SERVIDOR ===
const PORT = 3020;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor corporativo rodando em http://127.0.0.1:${PORT}`);
});
