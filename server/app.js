const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'segredo-corporativo-123',
  resave: false,
  saveUninitialized: false
}));

const authRouter = require('./Routers/auth');
const dashboardRouter = require('./Routers/dashboard');
const estoqueRouter = require('./Routers/estoque');
const pagarRouter = require('./Routers/pagar');
const relatoriosRouter = require('./Routers/relatorios');
const expedicaoRouter = require('./Routers/expedicao');
const algoritmosRouter = require('./Routers/algoritmos');

app.use('/', authRouter);

function ensureAuth(req, res, next) {
  if (!req.session.corporativo) return res.redirect('/');
  next();
}

app.use('/corporativo', ensureAuth, dashboardRouter);

app.use('/estoque', ensureAuth, estoqueRouter);
app.use('/pagar', ensureAuth, pagarRouter);
app.use('/relatorios', ensureAuth, relatoriosRouter);
app.use('/expedicao', ensureAuth, expedicaoRouter);
app.use('/algoritmos', algoritmosRouter);

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor corporativo rodando na porta ${PORT}`);
});
