export interface StorageStrategyInterface {
    upload(file: Buffer, filePath: string): Promise<string>;
}
