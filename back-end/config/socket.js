const socket = require('socket.io');


const createSocketServer = (server) => {

    const io = socket(server , {

        cors : {
            origin: "http://localhost:5173", // Frontend address
        }
    }) 

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('join' , ({userId ,targetUserId}) => {
            const roodId = [userId , targetUserId].join('_') ;
            console.log('Joinig room : ' , roodId)
            socket.join(roodId);
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}


module.exports = createSocketServer;