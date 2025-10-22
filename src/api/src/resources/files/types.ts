export interface File {
    id: string;
    name: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
    mimeType: string;
}

export interface UploadFileRequest {
    file: File;
    folderId?: string;
}