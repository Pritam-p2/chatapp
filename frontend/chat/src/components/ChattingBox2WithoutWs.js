import React, { useEffect, useState } from 'react'
import Me from './Me'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { task_processing, some_error_in_last_operation, account_creation_success, send_pass_error_msg, send_invalid_password_msg, signup_now, email_found, email_not_found, save_users_chats, ask_last_name, ask_password, ask_c_password, provide_asked_details } from '../store/chatSlice';
import { useDispatch } from 'react-redux';
import { save_first, save_password, save_last, save_email, register, login, login_password_got } from '../store/userSlice';


const ChattingBox2WithoutWs = () => {
    const [userInput, setUserInput] = useState("")
    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chat);
    const user = useSelector((state) => state.user)
    const request_signal = useSelector((state) => state.user.request)


    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if (user.request === 'login_password_got') {
            dispatch(login(user))
        }
        if (user.request === 'login_rejected') {
            dispatch(send_invalid_password_msg())
        }
        if (user.request === 'register_fulfilled') {
            dispatch(account_creation_success())
            dispatch(login(user))
        }
        if (user.request === 'register_rejected') {
            dispatch(some_error_in_last_operation())
        }
    }, [user.request])





    const send_mail_to_backend = (mail) => {
        const url = process.env.REACT_APP_URL+'/account/anonymous/';
        const data = {
            mail: mail.toLowerCase()
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


    const handle_send = async () => {
        const input = document.getElementById('myInput')
        if (request_signal === 'pending') {
            dispatch(task_processing())
        }
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
            if (chats.requirement === 'password_login') {
                dispatch(save_password(input.value))
                dispatch(login_password_got())
            }
            if (chats.requirement === 'password') {
                dispatch(save_password(input.value))
                dispatch(ask_c_password())
            }
            if (chats.requirement === 'c_password') {
                console.log("c password")
                if (input.value === user.user.password) {
                    console.log("if")
                    const res = dispatch(register(user));
                    console.log(res)
                    if (res.password) {
                        console.log("if if")
                        dispatch(send_pass_error_msg(res.password))
                    }
                }
                else {
                    console.log("else")
                    dispatch(send_invalid_password_msg())
                }
            }
        }
        setUserInput('')
    }
    return (
        <div className="h-100 rounded-3 chatting_box2 d-flex flex-column mt-2 py-1 overflow_css">



            {chats.question.map((chat, index) => (
                <Me chat={chat} ind={index} key={index} />
            ))}

            {/* {
                chats.question.map((chat, index) => (
                    <Me users={users} chat={chat} ind={index} key={index} />
                ))
            } */}

            <div className='d-flex justify-content-end gap-3 me-2 mb-2'>
                <textarea id="myInput" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="rounded-2 w-75 m-0" rows='1'></textarea>
                <button onClick={() => handle_send()}>send</button>
            </div>

        </div>
    )
}

export default ChattingBox2WithoutWs
