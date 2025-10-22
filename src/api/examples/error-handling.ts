import { ProsperifyClient } from '../src/client/ProsperifyClient';
import { AuthenticationError, ValidationError, NetworkError } from '../src/core/errors';

async function handleErrorExample() {
    const client = new ProsperifyClient();

    try {
        // Attempt to create a new assistant
        const response = await client.assistants.create({ name: 'New Assistant' });
        console.log('Assistant created:', response);
    } catch (error) {
        if (error instanceof AuthenticationError) {
            console.error('Authentication failed. Please check your credentials.');
        } else if (error instanceof ValidationError) {
            console.error('Validation error:', error.message);
            console.error('Validation details:', error.details);
        } else if (error instanceof NetworkError) {
            console.error('Network error. Please check your connection.');
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}

handleErrorExample();