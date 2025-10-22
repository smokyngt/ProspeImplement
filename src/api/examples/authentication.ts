import { ProsperifyClient } from '../src/client/ProsperifyClient';
import { AuthManager } from '../src/core/auth/AuthManager';

async function authenticate() {
    const client = new ProsperifyClient();
    const authManager = new AuthManager(client);

    try {
        const credentials = {
            username: 'your_username',
            password: 'your_password',
        };

        const response = await authManager.login(credentials);
        console.log('Authentication successful:', response);
    } catch (error) {
        console.error('Authentication failed:', error);
    }
}

authenticate();