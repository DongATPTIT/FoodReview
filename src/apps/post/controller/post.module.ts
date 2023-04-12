import { Controller, Get } from '@nestjs/common';
import { PostService } from '../service/post.service';

@Controller('images')
export class ImageController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async uploadImage(): Promise<any> {
    const url =
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg';
    const publicId = 'olympic_flag';
    const result = await this.postService.uploadImage(url, publicId);
    return result;
  }

  @Get('generate')
  generateImageUrl(): string {
    const publicId = 'olympic_flag';
    const width = 100;
    const height = 150;
    const url = this.postService.generateImageUrl(publicId, width, height);
    return url;
  }
}
