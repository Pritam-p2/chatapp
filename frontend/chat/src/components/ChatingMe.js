import React from 'react'
import { useSelector } from 'react-redux'

const ChatingMe = (props) => {
    const mydetails = useSelector((state) => state.myData)

    return (
        <>
            <div class="d-flex flex-row-reverse mb-2 align-items-baseline">
                <div className="px-2">
                    <img className='chat_pic' src={mydetails.my_profile_pic? process.env.REACT_APP_URL + mydetails.my_profile_pic:'./unknown.jpg'} />
                </div>
                <div className='maxi_width rounded-3 bg-warning m-0 p-0'>
                    <p className='px-2 py-1 text-center m-0'>{props.chat}</p>
                    <p className='m-0 px-2 text-end fw-light' style={{ fontSize: '12px' }}>{props.last_seen}</p>
                </div>
            </div>
        </>
    )
}

export default ChatingMe
