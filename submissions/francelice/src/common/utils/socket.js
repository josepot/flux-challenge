 export default (cb) => {
    const socket = new WebSocket('ws://localhost:4000');

    socket.addEventListener('open', Function.prototype);
    socket.addEventListener('message', e => {
        let data = JSON.parse(e.data);
        console.log(data);
        cb(data);
    });
}