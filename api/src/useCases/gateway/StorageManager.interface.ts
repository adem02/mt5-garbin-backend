export interface StorageManagerInterface {
    upload(file: Buffer, filePath: string): Promise<string>;
}
