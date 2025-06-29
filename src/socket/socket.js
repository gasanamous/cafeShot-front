import { io } from 'socket.io-client'

const token = localStorage.getItem('adminToken')
const socket = io(import.meta.env.VITE_API_SOCKET, {
    extraHeaders: {
        token
    }
}).on('connect', () => {
    console.log("Connected")
})

export default socket