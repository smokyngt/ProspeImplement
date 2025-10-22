import { ProsperifyClient } from '../src/client/ProsperifyClient';
import { CreateAssistantRequest } from '../src/resources/assistants/types';

async function main() {
    const client = new ProsperifyClient();

    // Example of creating a new assistant
    const newAssistant: CreateAssistantRequest = {
        name: 'Customer Support Assistant',
    };

    try {
        const response = await client.assistants.create(newAssistant);
        console.log('Assistant created successfully:', response.data.assistant);
    } catch (error) {
        console.error('Error creating assistant:', error);
    }

    // Example of retrieving an assistant by ID
    const assistantId = '123e4567-e89b-12d3-a456-426614174000';

    try {
        const response = await client.assistants.get(assistantId);
        console.log('Assistant retrieved successfully:', response.data.assistant);
    } catch (error) {
        console.error('Error retrieving assistant:', error);
    }
}

main();