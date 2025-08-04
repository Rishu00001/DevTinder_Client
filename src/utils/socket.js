import {io} from "socket.io-client"
import { server_url } from "./constants"


export const createSocketConnection = ()=>{
    return io(server_url)
}