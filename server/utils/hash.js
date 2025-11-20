const crypto = require('crypto');

function gerarHashComSalt(senha) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(senha, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

function validarSenha(senhaDigitada, senhaArmazenada, salt) {
  if (!salt) {
    return senhaDigitada === senhaArmazenada;
  }
  const hash = crypto
    .pbkdf2Sync(senhaDigitada, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === senhaArmazenada;
}

module.exports = { gerarHashComSalt, validarSenha };
