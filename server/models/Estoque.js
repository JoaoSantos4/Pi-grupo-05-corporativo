const Produto = require('./Produto');

class Estoque extends Produto {
  constructor(cod, nome, preco, estoque) {
    super(cod, nome, preco, estoque);
  }

  removerEstoque(qtd) {
    console.log(`[Estoque] Removendo ${qtd} do produto ${this.nome}`);
    super.removerEstoque(qtd);
  }
}

module.exports = Estoque;
