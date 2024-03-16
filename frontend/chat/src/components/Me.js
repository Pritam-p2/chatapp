import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ask_first_name, no_sign_up } from '../store/chatSlice';

const Me = ({ chat,ind }) => {
    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chat)

    const yes_sign_up = (i) => {
        if(chats.question.length-1==i){
            dispatch(ask_first_name())
        }
    }

    const no_signup = (i) => {
        if(chats.question.length-1==i){
            dispatch(no_sign_up())
            console.log("not sign up know")
        }
    }


    return (
        <>
            {chat.admin || chat.me ? (
                <div className='d-flex'>
                    <div className="px-2">
                        <img className='chat_pic' src='./admin.png' />
                    </div>
                    <p className='p-2 bg-success rounded-3 maxi_width text-start mb-2'>{chat.msg}</p>
                    {chat.option && <><button type="button" onClick={()=>yes_sign_up(ind)} class="btn btn-primary mx-2 option_btn">Yes</button><button onClick={()=>no_signup(ind)} type="button" class="option_btn btn btn-primary">No</button></>}
                    
                </div>
            ) : (
                <div className="d-flex flex-row-reverse">
                    <div className="px-2">
                        <img className='chat_pic' src='./unknown.jpg' />
                    </div>
                    <div className='d-flex align-items-center'>
                    <p className='p-2 bg-warning rounded-3 text-end mb-2'>{chat.msg}</p>
                    </div>
                </div>
            )}

        </>
    )
}

export default Me
