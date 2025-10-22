import { CreateAssistantRequest } from '../resources/assistants/types';
import { ValidationError } from '../core/errors/ValidationError';

export function validateCreateAssistantRequest(request: CreateAssistantRequest): void {
    if (!request.name || request.name.length < 1 || request.name.length > 100) {
        throw new ValidationError('The name field is required and must be between 1 and 100 characters.');
    }
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}