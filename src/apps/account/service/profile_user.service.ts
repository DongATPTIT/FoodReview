import { Injectable, Inject } from '@nestjs/common';
@Injectable()
export class ProfileService {
    constructor(@Inject('CLOUDINARY') private readonly cloudinary) {}

    async uploadImage(url: string, publicId: string): Promise<any> {
        const options = { public_id: publicId };
        const result = await this.cloudinary.uploader.upload(url, options);
        return result;
    }

    generateImageUrl(publicId: string, width: number, height: number): string {
        const options = {
            width: width,
            height: height,
            crop: 'fill',
        };
        return this.cloudinary.url(publicId, options);
    }
}
