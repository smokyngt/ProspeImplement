export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
}

export interface ChatResponse {
    messages: ChatMessage[];
    totalCount: number;
}

export interface SendMessageRequest {
    receiverId: string;
    content: string;
}

export interface ChatHistoryRequest {
    userId: string;
    limit?: number;
    offset?: number;
}