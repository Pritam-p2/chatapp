import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { get_user_emails } from '../store/userSlice';
import { initialChaters } from '../store/chattingPartner';
import { setProfilePic } from '../store/profilePicSlice';
import { removeProfilePic } from '../store/profilePicSlice';
import SelectedUser from './SelectedUser';
// import SavedContacts from '../components/SavedContacts';
import axios from 'axios';

const EmailSearch = (props) => {
    const [input, setInput] = useState('')
    const [showUsers, setShowUsers] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [regisEmails, setRegisEmails] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const myData = useSelector((state)=>state.myData)

    useEffect(() => {
            const storedToken = localStorage.getItem('access');


            if (storedToken) {

                const url = process.env.REACT_APP_URL + '/account/all/';
                axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            setAllUsers(response.data)
                        }
                        else {
                            console.log('else')
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },[]

    )

    const handle_onfocus = () => {
        dispatch(get_user_emails())
    }
    useEffect(() => {
        if (user.request === 'registered_emails_fulfilled') {
            setRegisEmails(user.data)
        }
    }, [user.request, user.data])

    useEffect(() => {
        if (input && regisEmails) {
            const i = input.toLowerCase()
            if (regisEmails.includes(i)) {
                if(!selectedUsers.includes(i)){
                    setSelectedUsers([i, ...selectedUsers])
                }
                setShowUsers(true)
            }
        }
        if (input.length === 0 && selectedUsers.length !== 0) {
            setShowUsers(false)
        }
    }, [input, regisEmails])

    if (selectedUsers) {
        props.true_search_email()
    }
    if(showUsers===false){
        props.false_search_email()
    }
    if (selectedUsers.length === 0) {
        props.false_search_email()
    }
    const handle_pic = (e, img_url, email) => {
        e.stopPropagation()
        props.handleFemail(email)
        dispatch(setProfilePic({ "me": false, "dp": img_url }))
    }

    const handle_div = (profile_img, email, name) => {
        console.log("div click")
        
        dispatch(initialChaters({ "image": profile_img, "email": email, "name": name }))
        dispatch(removeProfilePic())
    }


    return (
        <>
            <div className='bg-secondary' style={{ height: '65px' }}>
                <div className="h-100 d-flex justify-content-between">
                    <button type="button" onClick={() => { props.change_email() }} className="btn btn-info m-3 p-0 px-1">Back</button>
                    <input type="email" class="form-control m-3" value={input} id='email_input' onChange={(e) => setInput(e.target.value)} onFocus={handle_onfocus} placeholder="name@example.com" />
                </div>
            </div>
            {props.searchedEmail && showUsers && <div>
                {
                    selectedUsers.map((user) => {
                        return <SelectedUser handleFemail={props.handleFemail} key={selectedUsers.indexOf(user)} user={user} />
                    })
                }
            </div>}
            <hr className='h-1'/>
            <div className='mb-2' style={{overflow:"scroll",height:'84%'}}>

            {
                allUsers &&
                allUsers.map((user, index) => {
                    return (
                        user.email !==myData.my_email && <div className='pt-2 px-2' key={index}>
                            <div onClick={() => { handle_div(user.profile_img, user.email, user.first_name + ' ' + user.last_name) }} className='w-100 rounded-2 bg-success py-1'>
                                <div class="d-flex w-100">
                                    <img className='photo mx-2' onClick={(e) => { handle_pic(e, user.profile_img, user.email) }} src={user.profile_img ? process.env.REACT_APP_URL + user.profile_img : '/unknown.jpg'} />
                                    <div className='m-0 p-0 w-75'>

                                        <div class="d-flex">
                                            <h5 className='text-start p-0 m-0 w-100 text-truncate flex-grow-1'>{user.first_name ? user.first_name + ' ' + user.last_name : ''}</h5>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
        </>
    )
}

export default EmailSearch
