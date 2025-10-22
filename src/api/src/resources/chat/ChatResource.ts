import { ProsperifyClient } from '../../client/ProsperifyClient';
import { ChatMessage, ChatResponse } from './types';

export class ChatResource {
    private client: ProsperifyClient;

    constructor(client: ProsperifyClient) {
        this.client = client;
    }

    async sendMessage(chatId: string, message: string): Promise<ChatResponse> {
        const response = await this.client.post(`/v1/chats/${chatId}/messages`, { message });
        return response.data;
    }

    async getMessages(chatId: string): Promise<ChatMessage[]> {
        const response = await this.client.get(`/v1/chats/${chatId}/messages`);
        return response.data;
    }

    async deleteMessage(chatId: string, messageId: string): Promise<void> {
        await this.client.delete(`/v1/chats/${chatId}/messages/${messageId}`);
    }
}