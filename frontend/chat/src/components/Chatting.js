import React, { useEffect,useState } from 'react'
import ChattingBox2 from './ChattingBox2'
import ChattingBox1 from './ChattingBox1'
import { useSelector} from 'react-redux'
import ChattingBox2WithoutWs from './ChattingBox2WithoutWs'



const Chatting = () => {
    const chattingPartner = useSelector((state)=> state.chattingPartner)
    const mydetails = useSelector((state)=> state.myData)
    const [ws, setWs] = useState('')
    const token = localStorage.getItem('access')

    useEffect(()=>{
        if(ws){
            console.log(ws)
        }
    },[ws])
    useEffect(()=>{
        if(chattingPartner.partner_email && mydetails.my_email){
            const f = chattingPartner.partner_email
            const f_email = f.substring(0,f.indexOf('@'))
            const m =  mydetails.my_email
            const m_email = m.substring(0,m.indexOf('@'))
            const email_array = [f_email, m_email]
            email_array.sort()
            const room_name = email_array[0]+email_array[1]
            const WS_URL = process.env.REACT_APP_WS+`chatroom/${room_name}/`
            setWs(WS_URL)
        }
    },[chattingPartner.partner_email,mydetails.my_email])


    

    
    return (
        <>

        {token && <ChattingBox1 />}
        {ws && <ChattingBox2 ws={ws}/>}
        {ws==='' && <ChattingBox2WithoutWs/> }
        </>
    )
}

export default Chatting
