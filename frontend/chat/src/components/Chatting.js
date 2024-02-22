import React from 'react'
import ChattingBox2 from './ChattingBox2'

const Chatting = ({ users }) => {
    return (
        <>
            <div className="chatting_box1 d-flex justify-content-between">

                <div className="d-flex">
                    <div className="px-2">
                        <img className='photo' src={users[0].image} />
                    </div>
                    
                    <div className='d-flex flex-column'>
                        <h3 className='p-0 m-0' >{users[0].name}</h3>
                        <p className='m-0 p-0 text-start'>last seen: {users[0].status}</p>
                    </div>

                </div>

                <div className='rounded-4 px-3 d-flex align-items-center chatting_box2'>
                    <p className='m-0 p-0'>features</p>
                </div>

            </div>
            <ChattingBox2 users={users} />
            
        </>
    )
}

export default Chatting
