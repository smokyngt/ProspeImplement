import { HttpClient } from '../../core/http/HttpClient';
import { UploadFileRequest, File } from './types';

export class FilesResource {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async uploadFile(request: UploadFileRequest): Promise<File> {
        const response = await this.httpClient.post('/v1/files/upload', request);
        return response.data;
    }

    async getFile(fileId: string): Promise<File> {
        const response = await this.httpClient.get(`/v1/files/${fileId}`);
        return response.data;
    }

    async deleteFile(fileId: string): Promise<void> {
        await this.httpClient.delete(`/v1/files/${fileId}`);
    }
}