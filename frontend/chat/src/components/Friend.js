import React from 'react'
import { useSelector } from 'react-redux'

const Friend = (props) => {
    const chattingPartner = useSelector((state)=> state.chattingPartner)
    // const friend_pic = useSelector((state) => state.mychats.profile_pic)
    return (
        <div class="d-flex flex-row mb-2 align-items-baseline">
            <div className="px-2">
                <img className='chat_pic' src={chattingPartner.partner_pic?chattingPartner.partner_pic:'./unknown.jpg'} />
            </div>

            <div className='maxi_width rounded-3 bg-info m-0 p-0'>
                    <p className='px-2 py-1 text-start m-0'>{props.chat}</p>
                    <p className='m-0 px-2 text-start fw-light' style={{ fontSize: '12px' }}>{props.last_seen}</p>
                </div>
        </div>
    )
}

export default Friend
