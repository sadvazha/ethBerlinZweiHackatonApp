import io from 'socket.io-client';

class SocketIO {
  constructor() {
    this.handlers = [];

    this.socket = io('http://localhost:3001/');

    this.socket.on('connect', () => {
      console.log('Connected to socket.io');
    });

    this.socket.on('success', () => {
      console.log('Success!');
    });
  }

  registerHandler(handler) {
    this.handlers.push(handler);
  }

  requestId(handleId) {
    this.socket.once('id', handleId);
    this.socket.emit('request', null);
  }
}

export default new SocketIO();
