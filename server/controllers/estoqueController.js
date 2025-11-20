const db = require('../db');

exports.listar = (req, res) => {
    db.query('SELECT * FROM Produtos', (err, produtos) => {
        if (err) return res.send("Erro ao carregar estoque!");
        res.render('estoque', { produtos });
    });
};

exports.formNovo = (req, res) => {
    res.render('novo-produto');
};

exports.salvarNovo = (req, res) => {
    const { cod_produto, nome_produto, categoria, subcategoria, preco_real, disponibilidade, estoque } = req.body;

    db.query(
        `INSERT INTO Produtos VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [cod_produto, nome_produto, categoria, subcategoria, preco_real, disponibilidade, estoque],
        (err) => {
            if (err) return res.send("Erro ao salvar produto!");
            res.redirect('/estoque');
        }
    );
};

exports.formEditar = (req, res) => {
    db.query('SELECT * FROM Produtos WHERE cod_produto = ?', [req.params.id], (err, resultado) => {
        if (err || resultado.length === 0) return res.send("Produto não encontrado!");
        res.render('editar-produto', { produto: resultado[0] });
    });
};

exports.salvarEdicao = (req, res) => {
    const { nome_produto, categoria, subcategoria, preco_real, disponibilidade, estoque } = req.body;

    db.query(
        `UPDATE Produtos SET nome_produto=?, categoria=?, subcategoria=?, preco_real=?, disponibilidade=?, estoque=? 
         WHERE cod_produto=?`,
        [nome_produto, categoria, subcategoria, preco_real, disponibilidade, estoque, req.params.id],
        (err) => {
            if (err) return res.send("Erro ao atualizar!");
            res.redirect('/estoque');
        }
    );
};

exports.remover = (req, res) => {
    db.query('DELETE FROM Produtos WHERE cod_produto = ?', [req.params.id], (err) => {
        if (err) return res.send("Erro ao excluir!");
        res.redirect('/estoque');
    });
};

exports.addEstoque = (req, res) => {
    const { qtd } = req.body;

    db.query(
        "UPDATE Produtos SET estoque = estoque + ? WHERE cod_produto = ?",
        [Number(qtd), req.params.id],
        (err) => {
            if (err) return res.send("Erro ao adicionar estoque");
            res.redirect('/estoque');
        }
    );
};

exports.removerEstoque = (req, res) => {
    const { qtd } = req.body;

    db.query(
        "UPDATE Produtos SET estoque = GREATEST(estoque - ?, 0) WHERE cod_produto = ?",
        [Number(qtd), req.params.id],
        (err) => {
            if (err) return res.send("Erro ao remover estoque");
            res.redirect('/estoque');
        }
    );
};
