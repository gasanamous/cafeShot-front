import { io } from 'socket.io-client'

const token = localStorage.getItem('adminToken')

console.log('API:', import.meta.env.VITE_API)
console.log('SOCKET:', import.meta.env.VITE_API_SOCKET)

const socket = io(import.meta.env.VITE_API_SOCKET, {
    extraHeaders: {
        token
    }
}).on('connect', () => {
    console.log("Connected")
})

export default socket
