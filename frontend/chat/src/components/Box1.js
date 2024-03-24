import React, { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useDispatch, useSelector } from 'react-redux';
import { initialChaters } from '../store/chattingPartner';
import { setProfilePic } from '../store/profilePicSlice';
import { removeProfilePic } from '../store/profilePicSlice';


const Box1 = ({ userPart, handleFemail }) => {
    const [senders, setSenders] = useState([])
    const dispatch = useDispatch()
    // const [NewUser, setNewUser] = useState(false)
    const myData = useSelector((state) => state.myData)
    // const dp = useSelector((state) => state.profilePic);
    // const chatingPartner = useSelector((state) => state.chattingPartner);

   

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
        `${process.env.REACT_APP_WS}initials/backend/${userPart}/`,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {

        if (senders[0]) {

            dispatch(initialChaters({ "image": senders[0].profile, "email": senders[0].sender, "name": senders[0].name }))
        }
    }, [senders[0]])


    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const receivedData = JSON.parse(lastMessage.data);
            if (receivedData.type === 'initial') {
                setSenders(receivedData.sender_msg)
            }
        }
    }, [lastMessage]);

    useEffect(()=>{
        if(senders){
            console.log(senders)
        }
    },[senders])

    const handle_pic = (e, img_url, email) => {
        e.stopPropagation()
        handleFemail(email)
        dispatch(setProfilePic({ "me": false, "dp": img_url }))
    }

    const handle_div = (profile_img, email, name) => {
        console.log(email)
        console.log("div click")
        dispatch(initialChaters({ "image": profile_img, "email": email, "name": name }))
        dispatch(removeProfilePic())
    }

    return (
        <>
            
            {

                senders &&

                senders.map((sender, index) => {
                    return (
                        <div className='pt-2 px-2' key={index}>
                            <div onClick={() => { handle_div(sender.profile, sender.sender, sender.name) }} className='w-100 rounded-2 bg-success py-1'>
                                <div class="d-flex w-100">
                                    <img className='photo mx-2' onClick={(e) => { handle_pic(e, sender.profile, sender.sender) }} src={sender.profile ? "http://127.0.0.1:8000" + sender.profile : '/unknown.jpg'} />
                                    <div className='m-0 p-0 w-75'>
                                        {/* <div className='d-flex'>



                                <h5 className='text-start p-0 m-0 w-100 text-truncate'>Rajat Debnath</h5>
                            </div> */}


                                        <div class="d-flex">
                                            <h5 className='text-start p-0 m-0 w-100 text-truncate flex-grow-1'>{sender.name ? sender.name : sender.sender}</h5>
                                            <h5 className='p-0 m-0 chatsNumber'>200</h5>
                                        </div>


                                        <p className='m-0 p-0 text-start text-truncate w-100'> {sender.msg} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })



            }
        </>

    )
    // return (
    //     <></>
    // )
}

export default Box1
