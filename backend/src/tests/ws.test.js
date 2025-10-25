const WebSocket = require('ws')

describe('Websocket Server', () => {
    let socket;

    beforeAll((onOpen) => {
        socket = new WebSocket('ws://localhost:3000')
        socket.on('open', () => onOpen())
    });

    afterAll(() => {
        socket.close();
    });

    test('websocket should echo message', (done) => {
        const message = "test123";
        socket.on('message', (dataBuf) => {
            const data = dataBuf.toString();
            expect(data).toBe(`Echo: ${message}`);
            done();
        });
        socket.send(message);
    });
});
