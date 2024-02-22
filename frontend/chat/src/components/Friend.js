import React from 'react'

const Friend = ({ users }) => {
    return (
        <div class="d-flex flex-row-reverse">
            <div className="px-2">
                <img className='chat_pic' src={users[0].image} />
            </div>

            <p className='px-2 bg-warning rounded-3 maxi_width text-end mb-2'>diuhubihbi ibieud ljnedf ffffffffffffff lllllllllll</p>
            

        </div>
    )
}

export default Friend
