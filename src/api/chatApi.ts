import {ChatMessageType} from "../types/types";

let subscribers = {
    'messagesReceived': [] as MessagesReceivedSubscribeType[],
    'changeIsConnected': [] as StatusChangedSubscribeType[],
};

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('CLOSE WS');
    setTimeout(connectToWebSocket, 3000);
};
const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers['messagesReceived'].forEach(s => s(newMessage));
};
const openHandler = () => {
    notifySubscribersAboutIsConnected(true);
};
const errorHandler = () => {
    notifySubscribersAboutIsConnected(false);
};

const notifySubscribersAboutIsConnected = (isConnected: boolean) => {
    subscribers.changeIsConnected.forEach(s => s(isConnected));
};

const closeWebSocketChannel = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler)
    ws?.close();
};
const connectToWebSocket = () => {
    closeWebSocketChannel();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler)
};

export const chatAPI = {
    start() {
        connectToWebSocket();
    },
    stop() {
        subscribers.messagesReceived = [];
        subscribers.changeIsConnected = [];
        closeWebSocketChannel();
    },
    subscribe(eventName: EventNameType, callback: MessagesReceivedSubscribeType | IsConnectedSubscribeType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
    },
    unsubscribe(eventName: EventNameType, callback: MessagesReceivedSubscribeType | IsConnectedSubscribeType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
};

type EventNameType = 'messagesReceived' | 'changeIsConnected';
type MessagesReceivedSubscribeType = (messages: ChatMessageType[]) => void;
type IsConnectedSubscribeType = (isConnected: boolean) => void;
type StatusChangedSubscribeType = (status: boolean) => void;