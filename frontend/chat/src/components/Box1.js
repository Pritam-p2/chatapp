import React from 'react'

const Box1 = ({ users }) => {
    return (
        <div className='p-2'>
            <div className='w-100 rounded-2 bg-success py-1'>
                <div class="d-flex w-100">
                    <img className='photo mx-2' src={users[0].image} />
                    <div className='m-0 p-0 w-75'>
                        {/* <div className='d-flex'>



                            <h5 className='text-start p-0 m-0 w-100 text-truncate'>Rajat Debnath</h5>
                        </div> */}


                        <div class="d-flex">
                        <h5 className='text-start p-0 m-0 w-100 text-truncate flex-grow-1'>Rajat Debnath</h5>
                        <h5 className='p-0 m-0 chatsNumber'>200</h5>
                        </div>


                        <p className='m-0 p-0 text-start text-truncate w-100'> chats 1 jndf osdf sf sdf jndf anadf nadf sdf sdf df sdf pad poad </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Box1
