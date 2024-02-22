import React from 'react'
import Chatting from '../components/Chatting'
import { useState, useEffect } from 'react'
import { ask_email } from '../store/chatSlice';
import { useDispatch } from 'react-redux';
// import useWebSocket, { ReadyState } from "react-use-websocket"

// import Box1 from '../components/Box1'
// import Signup from '../components/Signup'

const Home = () => {
    const dispatch = useDispatch()
    const [hasAccessToken, setHasAccessToken] = useState(false)

    const users = [{ 'name': "Pritam Debnath", 'status': 'online', "user": "me", "image": 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { 'name': "Rajat Debnath", 'status': false, "user": "friend", "image": 'https://unsplash.com/photos/closeup-photography-of-woman-smiling-mEZ3PoFGs_k' }]

    const admin = [{ 'name': 'Admin', 'image': 'https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png' }]
    
    // connect_to_admin = () => {

    //         const WS_URL = "ws://127.0.0.1:800/newuser/"
    //         const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    //             WS_URL,
    //             {
    //                 share: false,
    //                 shouldReconnect: () => true,
    //             },
    //         )

    //         // Run when the connection state (readyState) changes
    //         useEffect(() => {
    //             console.log("Connection state changed")
    //             if (readyState === ReadyState.OPEN) {
    //                 sendJsonMessage({
    //                     event: "subscribe",
    //                     data: {
    //                         channel: "general-chatroom",
    //                     },
    //                 })
    //             }
    //         }, [readyState])

    //         // Run when a new WebSocket message is received (lastJsonMessage)
    //         useEffect(() => {
    //             console.log(`Got a new message: ${lastJsonMessage}`)
    //         }, [lastJsonMessage])

    //         return <Chat lastJsonMessage={lastJsonMessage} />
    //     }


    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');

        if (storedToken) {
            setHasAccessToken(true)
            console.log("found token in local storage")
        } else {
            setHasAccessToken(false)
            dispatch(ask_email())
        }
    }, [])

    return (
        <div class="container text-center">
            <div class="row">
                <div class="col-4 bg-success p-2 text-dark bg-opacity-50">
                    {/* if new user then signup and login option */}

                    {/* <div className='d-flex justify-content-center align-items-center'>
                        <div className='d-flex flex-column bg-danger-subtle p-2 rounded-2'>
                            <p className='m-0 p-0'>Help us to know you by  ---</p>
                            <div className='my-1'>
                                <button type="button" class="btn btn-success mx-2">Signup</button>
                                <button type="button" class="btn btn-info">Login</button>
                            </div>
                        </div>

                    </div> */}
                    {/* <Signup /> */}
                    {/* else */}
                    {/* <Box1 users={users}/>
                    <Box1 users={users}/> */}
                </div>
                <div class="col-8 py-2 chatting_layout d-flex flex-column">
                    {hasAccessToken ? (<Chatting users={users} />) : (
                        // <Chatting users={users} />
                        <Chatting users={admin} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
