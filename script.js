const API_URL = "http://localhost:3000";

// Encrypt Function
async function encryptText() {
  const plainText = document.getElementById('plaintext').value;
  const algorithm = document.getElementById('algorithm').value;
  const key = document.getElementById('key').value;
  const output = document.getElementById('ciphertext');
  
  if (!plainText) return alert("Enter some text.");
  if (!algorithm) return alert("Select an encryption method.");

  const response = await fetch(`${API_URL}/encrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: plainText, method: algorithm, key })
  });

  const data = await response.json();
  output.value = data.ciphertext;
}

// Decrypt Function
async function decryptText() {
    const cipherText = document.getElementById('ciphertext').value;
    const method = document.getElementById('algorithm').value;
    const key = document.getElementById('key').value;

  if (!cipherText) return alert("Please enter encrypted text.");
    if (!method) return alert("Select an encryption method.");

  const response = await fetch(`${API_URL}/decrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  cipherText, method, key  })
  });

  const data = await response.json();
    document.getElementById('decryptedText').value = data.plaintext;
}

// Example AES encryption/decryption functions
function encryptAES(text) {
  return CryptoJS.AES.encrypt(text, 'your-secret-key').toString();
}

function decryptAES(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, 'your-secret-key');
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Copy Ciphertext
function copyToClipboard() {
  const output = document.getElementById('ciphertext');
  output.select();
  document.execCommand("copy");
  alert("Copied!");
}

// Register & Login
async function register() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  alert(data.message);
}

async function login() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  alert(data.message);
}
