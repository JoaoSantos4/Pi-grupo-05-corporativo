class Produto {
  #cod;
  #nome;
  #preco;
  #estoque;

  constructor(cod, nome, preco = 0, estoque = 0) {
    this.#cod = cod;
    this.#nome = nome;
    this.#preco = preco;
    this.#estoque = estoque;
  }

  get cod() { return this.#cod; }
  get nome() { return this.#nome; }
  get preco() { return this.#preco; }
  get estoque() { return this.#estoque; }

  set preco(v) {
    if (v < 0) throw new Error('Preço inválido');
    this.#preco = v;
  }

  adicionarEstoque(qtd) {
    if (!Number.isInteger(qtd) || qtd <= 0) throw new Error('Quantidade inválida');
    this.#estoque += qtd;
  }

  removerEstoque(qtd) {
    if (!Number.isInteger(qtd) || qtd <= 0) throw new Error('Quantidade inválida');
    if (qtd > this.#estoque) throw new Error('Estoque insuficiente');
    this.#estoque -= qtd;
  }

  toJSON() {
    return {
      cod: this.#cod,
      nome: this.#nome,
      preco: this.#preco,
      estoque: this.#estoque
    };
  }
}

module.exports = Produto;
