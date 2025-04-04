# Information Security

## Encryption Techniques Used

### 1. Base64 Encoding (Encryption and Decryption)
Base64 is a binary-to-text encoding scheme used to represent binary data in an ASCII string format. This technique is commonly used for encoding data like images, files, and text for transfer over networks. Base64 encoding is not a true encryption method, as it is not meant to keep data confidential, but rather to ensure data integrity during transmission.

- **Encryption:** The text is converted into a sequence of ASCII characters that represents the binary data. This transformation is achieved using the `btoa()` function in JavaScript.
- **Decryption:** The encrypted Base64 string is reverted to its original form using the `atob()` function.

While Base64 encoding is commonly used for data transfer, it is not a secure way to protect sensitive information, as it can easily be decoded by anyone who has access to the encoded string.

### 2. AES Encryption (Advanced Encryption Standard)
AES is a symmetric encryption algorithm used to encrypt and decrypt data using the same secret key. It is a widely adopted encryption standard that provides strong security for sensitive data.

- **Encryption:** Using AES encryption, a plaintext string is transformed into an unreadable ciphertext. This is achieved by applying a cryptographic function with a secret key. For AES encryption in the frontend, libraries like CryptoJS are used, where the encryption process can be invoked using the `CryptoJS.AES.encrypt()` function.
- **Decryption:** To decrypt the data, the ciphertext is passed through the AES decryption function, using the same secret key. The original plaintext is recovered using the `CryptoJS.AES.decrypt()` function.

AES encryption ensures that only those with the secret key can access the original data, making it a secure method for protecting sensitive information.