import SocketIO from 'socket.io-client';

const url = 'http://localhost:3000';

export const SOCKET_EVENT = {

};

class SocketService {
  static instance: SocketService | null = null;
  static getInstance() {
    return !SocketService.instance ? (SocketService.instance = new SocketService()) : SocketService.instance;
  }

  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = SocketIO(url);
    this.socket.on('connect', () => {
      console.log('connect !');
    })
  }

  emit(event: string, data: any) {
    if (!this.socket.connected) this.socket.connect();
    this.socket.emit(event, data);
  }


  on(event: string, callback: Function) {
    this.socket.on(event, callback)
  }

}

export default SocketService.getInstance();