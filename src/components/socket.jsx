import io from 'socket.io-client'
const ENDPOINT = "localhost:5000";
const HEROKUENDPOINT= "https://sopa-numerica-server.herokuapp.com/";
const socket = io.connect(HEROKUENDPOINT);
export {socket}