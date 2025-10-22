import { ProsperifyError } from '../errors/ProsperifyError';

export class ResponseHandler {
    static handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            return this.handleErrorResponse(response);
        }
        return response.json();
    }

    private static handleErrorResponse(response: Response): Promise<never> {
        return response.json().then((errorData) => {
            const error = new ProsperifyError(errorData.message || 'An error occurred');
            error.code = errorData.code;
            throw error;
        });
    }
}