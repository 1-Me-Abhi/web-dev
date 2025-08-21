import { RSA } from 'react-native-rsa-native';
import { AES } from 'react-native-aes-crypto';
import CryptoJS from 'react-native-crypto-js';
import { Keychain } from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyPair, SessionKey } from '../store/slices/encryptionSlice';

export interface EncryptedMessage {
  encryptedContent: string;
  iv: string;
  keyId: string;
}

class EncryptionService {
  private userKeyPair: KeyPair | null = null;

  async initialize(): Promise<void> {
    try {
      // Try to load existing key pair from secure storage
      const existingKeyPair = await this.loadUserKeyPair();
      
      if (existingKeyPair) {
        this.userKeyPair = existingKeyPair;
      } else {
        // Generate new key pair
        await this.generateUserKeyPair();
      }
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      throw new Error('Encryption initialization failed');
    }
  }

  async generateUserKeyPair(): Promise<KeyPair> {
    try {
      const keyPair = await RSA.generateKeys(2048);
      
      this.userKeyPair = {
        publicKey: keyPair.public,
        privateKey: keyPair.private,
      };

      // Store securely
      await this.saveUserKeyPair(this.userKeyPair);
      
      return this.userKeyPair;
    } catch (error) {
      console.error('Failed to generate key pair:', error);
      throw new Error('Key pair generation failed');
    }
  }

  async saveUserKeyPair(keyPair: KeyPair): Promise<void> {
    try {
      // Store private key in keychain (most secure)
      await Keychain.setInternetCredentials(
        'user_private_key',
        'private_key',
        keyPair.privateKey
      );

      // Store public key in AsyncStorage (can be shared)
      await AsyncStorage.setItem('user_public_key', keyPair.publicKey);
    } catch (error) {
      console.error('Failed to save key pair:', error);
      throw new Error('Key pair storage failed');
    }
  }

  async loadUserKeyPair(): Promise<KeyPair | null> {
    try {
      // Load private key from keychain
      const credentials = await Keychain.getInternetCredentials('user_private_key');
      const publicKey = await AsyncStorage.getItem('user_public_key');

      if (credentials && publicKey) {
        return {
          publicKey,
          privateKey: credentials.password,
        };
      }

      return null;
    } catch (error) {
      console.error('Failed to load key pair:', error);
      return null;
    }
  }

  getUserPublicKey(): string | null {
    return this.userKeyPair?.publicKey || null;
  }

  async generateSessionKey(contactPublicKey: string): Promise<SessionKey> {
    try {
      // Generate ephemeral key pair for this session
      const ephemeralKeyPair = await RSA.generateKeys(2048);
      
      // Generate session key using ECDH-like approach
      const sessionKeyMaterial = CryptoJS.lib.WordArray.random(256/8);
      const sessionKey = CryptoJS.enc.Base64.stringify(sessionKeyMaterial);
      
      // Generate chain key for forward secrecy
      const chainKeyMaterial = CryptoJS.lib.WordArray.random(256/8);
      const chainKey = CryptoJS.enc.Base64.stringify(chainKeyMaterial);

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

      return {
        contactId: '', // Will be set by caller
        sessionKey,
        ephemeralPublicKey: ephemeralKeyPair.public,
        chainKey,
        messageNumber: 0,
        previousChainLength: 0,
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
    } catch (error) {
      console.error('Failed to generate session key:', error);
      throw new Error('Session key generation failed');
    }
  }

  async encryptMessage(
    message: string,
    sessionKey: SessionKey
  ): Promise<EncryptedMessage> {
    try {
      // Generate unique IV for this message
      const iv = CryptoJS.lib.WordArray.random(128/8);
      const ivString = CryptoJS.enc.Base64.stringify(iv);

      // Derive message key from chain key and message number
      const messageKey = this.deriveMessageKey(sessionKey.chainKey, sessionKey.messageNumber);

      // Encrypt message using AES
      const encrypted = AES.encrypt(message, messageKey, ivString);

      return {
        encryptedContent: encrypted,
        iv: ivString,
        keyId: `${sessionKey.contactId}_${sessionKey.messageNumber}`,
      };
    } catch (error) {
      console.error('Failed to encrypt message:', error);
      throw new Error('Message encryption failed');
    }
  }

  async decryptMessage(
    encryptedMessage: EncryptedMessage,
    sessionKey: SessionKey
  ): Promise<string> {
    try {
      // Extract message number from keyId
      const messageNumber = parseInt(encryptedMessage.keyId.split('_')[1], 10);
      
      // Derive message key
      const messageKey = this.deriveMessageKey(sessionKey.chainKey, messageNumber);

      // Decrypt message
      const decrypted = await AES.decrypt(
        encryptedMessage.encryptedContent,
        messageKey,
        encryptedMessage.iv
      );

      return decrypted;
    } catch (error) {
      console.error('Failed to decrypt message:', error);
      throw new Error('Message decryption failed');
    }
  }

  private deriveMessageKey(chainKey: string, messageNumber: number): string {
    // Derive message-specific key from chain key and message number
    const input = `${chainKey}_${messageNumber}`;
    const hash = CryptoJS.SHA256(input);
    return CryptoJS.enc.Base64.stringify(hash);
  }

  async rotateChainKey(currentChainKey: string): Promise<string> {
    try {
      // Generate new chain key by hashing current one
      const hash = CryptoJS.SHA256(currentChainKey + '_rotate');
      return CryptoJS.enc.Base64.stringify(hash);
    } catch (error) {
      console.error('Failed to rotate chain key:', error);
      throw new Error('Chain key rotation failed');
    }
  }

  async encryptWithPublicKey(message: string, publicKey: string): Promise<string> {
    try {
      return await RSA.encrypt(message, publicKey);
    } catch (error) {
      console.error('Failed to encrypt with public key:', error);
      throw new Error('Public key encryption failed');
    }
  }

  async decryptWithPrivateKey(encryptedMessage: string): Promise<string> {
    try {
      if (!this.userKeyPair?.privateKey) {
        throw new Error('Private key not available');
      }
      
      return await RSA.decrypt(encryptedMessage, this.userKeyPair.privateKey);
    } catch (error) {
      console.error('Failed to decrypt with private key:', error);
      throw new Error('Private key decryption failed');
    }
  }

  async clearKeys(): Promise<void> {
    try {
      // Clear from memory
      this.userKeyPair = null;

      // Clear from secure storage
      await Keychain.resetInternetCredentials('user_private_key');
      await AsyncStorage.removeItem('user_public_key');
    } catch (error) {
      console.error('Failed to clear keys:', error);
    }
  }
}

export const encryptionService = new EncryptionService();

// Export for store initialization
export const initializeEncryption = async (): Promise<void> => {
  await encryptionService.initialize();
};
