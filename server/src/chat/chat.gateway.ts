import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
interface data {
  roomId: string;
  message: string;
  user: string;
  image: string;
}
@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer() server;
  @SubscribeMessage('room')
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    client.join(roomId);
  }
  @SubscribeMessage('chat')
  handleMessage(@MessageBody() chat: data): void {
    this.server.to(chat.roomId).emit('chat', chat);
  }
}
