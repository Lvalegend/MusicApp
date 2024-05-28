import { io } from "socket.io-client";
import { hostNetwork } from "../host/hostNetwork";

const port = 5000

const url_socket = `http://${hostNetwork}:${port}`;

const path_socket = '/socket-io'
// const token:any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMyNGIwOGQ2ZmYwNjM1OTVlZmQ3ZGMiLCJpYXQiOjE3MTYzMDU3OTAsImV4cCI6MTcxNjMwOTM5MH0.ajMhUYQ1ZltQzNOqMsQo4JnMogEhgx9i6QsfvUaY_nA'

class SocketService {
    socket: any;

    constructor() {
        this.socket = null;
    }

    initializeSocket = async () => {
        try {
            this.socket = io(url_socket, { transports: ['websocket'], path: path_socket  }); // , auth: {token} , , path: path_socket
            console.log("initializing socket");

            this.socket.on("connect", () => {
                console.log("Socket connected");
            });

            this.socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            this.socket.on("error", (data: any) => {
                console.log("Socket error", data);
            });
        } catch (error) {
            console.log("Socket is not initialized: ", error);
        }
    }

    emit(event: any, data: any = {}) {
        if (this.socket) {
            this.socket.emit(event, data);
        } else {
            console.log("Socket not initialized");
        }
    }

    on(event: any, cb: any) {
        if (this.socket) {
            this.socket.on(event, cb);
        } else {
            console.log("Socket not initialized");
        }
    }

    removeListener(listenerName: any) {
        if (this.socket) {
            this.socket.removeListener(listenerName);
        } else {
            console.log("Socket not initialized");
        }
    }
}

const socketServices = new SocketService();
export default socketServices;
