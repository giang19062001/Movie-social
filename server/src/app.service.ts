import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  getConnection(): string {
    if (this.connection.readyState === 1) {
      return 'Connected successfully';
    } else {
      return 'Disconnected';
    }
  }
}
