const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5500", credentials: true }));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));

// Dummy user database (replace with real DB in production)
const users = {};

// === USER AUTHENTICATION ===
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = hashedPassword;
  res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || !(await bcrypt.compare(password, users[username]))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.user = username;
  res.json({ message: 'Login successful' });
});

// === ENCRYPTION & DECRYPTION ===
function caesarCipher(text, shift, decrypt = false) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const base = char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90 ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + (decrypt ? -shift : shift)) % 26 + 26) % 26 + base);
    }
    return char;
  }).join('');
}

function base64Encrypt(text) { return Buffer.from(text).toString('base64'); }
function base64Decrypt(cipher) { return Buffer.from(cipher, 'base64').toString('utf-8'); }

function aesEncrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}
function aesDecrypt(cipher, key) {
  return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
}

function sha256Hash(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

app.post('/encrypt', (req, res) => {
  const { text, method, key } = req.body;
  let result;
  switch (method) {
    case 'caesar': result = caesarCipher(text, parseInt(key)); break;
    case 'base64': result = base64Encrypt(text); break;
    case 'aes': result = aesEncrypt(text, key); break;
    case 'sha256': result = sha256Hash(text); break;
    default: return res.status(400).json({ message: 'Invalid encryption method' });
  }
  res.json({ ciphertext: result });
});

app.post('/decrypt', (req, res) => {
    const { ciphertext, method, key } = req.body;
    let result;
    switch (method) {
      case 'caesar': result = caesarCipher(ciphertext, parseInt(key), true); break;
      case 'base64': result = base64Decrypt(ciphertext); break;
      case 'aes': result = aesDecrypt(ciphertext, key); break;
      default: return res.status(400).json({ message: 'Invalid decryption method' });
    }
    res.json({ plaintext: result });
  });
  
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
app.get("/", (req, res) => {
    res.send("<h1>Backend is Running 🚀</h1>");
  });  