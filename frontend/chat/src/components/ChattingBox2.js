import React, { useEffect } from 'react'
import Me from './Me'
// import Friend from './Friend'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showing_detail,signup_now, email_found, email_not_found, save_users_chats, ask_last_name, ask_password, ask_c_password, provide_asked_details } from '../store/chatSlice';
import { useDispatch } from 'react-redux';
import { save_cpassword, save_first, save_password, save_last, save_email } from '../store/userSlice';

const ChattingBox2 = ({ users }) => {
    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chat);
    const user = useSelector((state) => state.user)
    console.log(user)
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

   

    // useEffect(()=>{
    //     console.log("effect")
    //     if(user.show_details){
    //         console.log(user.first_name, user.last_name, user.email, user.password)
    //         // dispatch(showing_detail(user.first_name, user.last_name, user.email, user.password))
    //     }
    // },[user.show_details])

    

    const send_mail_to_backend = (mail) => {
        const url = 'http://127.0.0.1:8000/auth/anonymous/';
        const data = {
            mail: mail
        };
        axios.post(url, data)
            .then(response => {
                // Handle success
                if (response.data.data !== '') {
                    // user is in db
                    // just need to login
                    dispatch(email_found())
                }
                else {
                    // user not in db
                    // create account
                    dispatch(email_not_found())
                    dispatch(signup_now())
                }
            })
            .catch(error => {
                console.error('Error from ChattingBox2 component: ', error);
            });
    }

    // const verify_details = () => {
    //     console.log(user)
    //     if (user.password === user.c_password) {
    //         // dispatch(show_details())
    //         console.log(user.first_name, ' ', user.last_name, '   ', user.email, '   ', user.password)
    //     }
    // }

    const handle_send = () => {
        const input = document.getElementById('myInput')
        if (input.value) {
            dispatch(save_users_chats(input.value))
            if (chats.requirement === 'email') {
                if (isValidEmail(input.value)) {
                    send_mail_to_backend(input.value)
                    dispatch(save_email(input.value))
                }
                else {
                    dispatch(provide_asked_details())
                }
            }
            if (chats.requirement === 'first_name') {
                const t = input.value.indexOf(' ')
                if (t > -1) {
                    if (t > 0) {
                        dispatch(save_first(input.value.substring(0, t)))

                    } else {
                        dispatch(provide_asked_details())
                    }
                }
                else {
                    dispatch(save_first(input.value))
                }
                dispatch(ask_last_name())
            }
            if (chats.requirement === 'last_name') {
                const t = input.value.indexOf(' ')
                if (t > -1) {
                    if (t > 0) {
                        dispatch(save_last(input.value.substring(0, t)))
                    } else {
                        dispatch(provide_asked_details())
                    }
                }
                else {
                    dispatch(save_last(input.value))
                }
                dispatch(ask_password())
            }
            if (chats.requirement === 'password') {
                dispatch(save_password(input.value))
                dispatch(ask_c_password())
            }
            if (chats.requirement === 'c_password') {
                dispatch(save_cpassword(input.value))
                
            }
        }

    }

    


    return (
        <div className="h-100 rounded-4 chatting_box2 d-flex flex-column py-1 overflow_css">
            <p className='pb-1 m-0'>16/02/2024</p>

            {
                chats.question.map((chat, index) => (
                    <Me users={users} chat={chat} ind={index} key={index} />
                ))
            }

            <div style={{ paddingLeft: '400px' }}>
                <input id="myInput" className='rounded-2 w-75 m-2' />
                <button onClick={() => handle_send()}>send</button>
            </div>

        </div>
    )
}

export default ChattingBox2
