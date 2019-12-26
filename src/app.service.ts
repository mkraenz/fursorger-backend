import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getHello(): string {
        return 'Hello World! This is the official Fursorger Backend speaking. This world is dying. Can you save us?';
    }
}
