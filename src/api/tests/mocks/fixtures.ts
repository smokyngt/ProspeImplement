import { Assistant } from '../../src/resources/assistants/types';
import { ChatMessage } from '../../src/resources/chat/types';
import { File } from '../../src/resources/files/types';
import { Organization } from '../../src/resources/organizations/types';
import { User } from '../../src/resources/users/types';

// Mock data for testing purposes

export const mockAssistants: Assistant[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Customer Support Assistant',
        createdAt: 1726282800000,
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        organization: '123e4567-e89b-12d3-a456-426614174000',
        object: 'assistant'
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Sales Assistant',
        createdAt: 1726282801000,
        createdBy: '123e4567-e89b-12d3-a456-426614174001',
        organization: '123e4567-e89b-12d3-a456-426614174001',
        object: 'assistant'
    }
];

export const mockChatMessages: ChatMessage[] = [
    {
        id: 'msg-1',
        content: 'Hello, how can I help you?',
        sender: 'assistant',
        timestamp: 1726282802000
    },
    {
        id: 'msg-2',
        content: 'I need assistance with my account.',
        sender: 'user',
        timestamp: 1726282803000
    }
];

export const mockFiles: File[] = [
    {
        id: 'file-1',
        name: 'Document.pdf',
        size: 102400,
        createdAt: 1726282804000,
        organization: '123e4567-e89b-12d3-a456-426614174000'
    },
    {
        id: 'file-2',
        name: 'Image.png',
        size: 204800,
        createdAt: 1726282805000,
        organization: '123e4567-e89b-12d3-a456-426614174001'
    }
];

export const mockOrganizations: Organization[] = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Acme Corp',
        createdAt: 1726282806000
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Globex Inc',
        createdAt: 1726282807000
    }
];

export const mockUsers: User[] = [
    {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: 1726282808000,
        organization: '123e4567-e89b-12d3-a456-426614174000'
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        createdAt: 1726282809000,
        organization: '123e4567-e89b-12d3-a456-426614174001'
    }
];