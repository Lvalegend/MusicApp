import io from 'socket.io-client';
import { hostNetwork } from '../../host/HostNetwork';

const serverUrl = `http://${hostNetwork}:3000/socket`; 

const socket = io(serverUrl);

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('chat message', (msg) => {
    console.log('Message from server:', msg);
    // Xử lý tin nhắn từ server ở đây
});
