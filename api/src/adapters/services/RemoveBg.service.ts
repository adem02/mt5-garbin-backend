export class RemoveBgService {
    async removeBackground(buffer: Buffer, filePath: string): Promise<Buffer> {
        const formData = new FormData();
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        formData.append('size', 'auto');
        formData.append('image_file', blob, filePath);

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': process.env.REMOVE_BG_API_KEY as string,
            },
            body: formData as any,
        });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
}
