interface ImageDimensions {
    width: number;
    height: number;
}

export const getImageDimensions = (base64Data: string): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Data;
        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
        img.onerror = reject;
    });
};