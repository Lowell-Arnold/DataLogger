const crypto = require("crypto");

exports.encode = (text, password) => {
  let key = crypto.createCipher('aes-128-cbc', password);
  let encodedString = key.update(text, 'utf8', 'hex')
  encodedString += key.final('hex');
  return encodedString;
}

exports.decode = (hash, password) => {
  let key = crypto.createDecipher('aes-128-cbc', password);
  let decodedString = key.update(hash, 'hex', 'utf8')
  decodedString += key.final('utf8');
  return decodedString
}
