var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //base62
var base = alphabet.length; // base is the length of the alphabet (62 in this case)

// function to convert base10 integer to base62 string
function encode(num){
  var encoded = '';
  while (num){
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

//function to convert base62 string to base10 integer
function decode(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;