// Caesar Cipher
function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  }
  
  // Base64 Encryption
  function base64Encrypt(text) {
    return btoa(text);
  }
  
  // AES Encryption using CryptoJS
  function aesEncrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
  }  