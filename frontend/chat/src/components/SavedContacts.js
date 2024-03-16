import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_contacts_of_user } from '../store/userSlice';
import { removeProfilePic,setProfilePic } from '../store/profilePicSlice';
import { initialChaters } from '../store/chattingPartner';

const SavedContacts = (props) => {
    const dispatch = useDispatch()
    const request_signal = useSelector((state) => state.user.request)
    const contacts = useSelector((state) => state.user.data)
    const [myContacts, setMyContacts] = useState([])
    const [buffer, setBuffer] = useState(false)
    

    useEffect(() => {
        dispatch(get_contacts_of_user())
    }, [])

    const handleImageClick = (url,email) => {
        props.handleFemail(email) 
        dispatch(setProfilePic({"me":false,"dp":url}))
    }

    useEffect(() => {
        if (request_signal === 'get_contact_of_user' + '_pending') {
            setBuffer(true)
        }
        if (request_signal === 'get_contact_of_user' + '_fulfilled') {
            setMyContacts(contacts)
        }
    }, [request_signal])

    const handleChatting = (image,name,email) => {
        dispatch(initialChaters({ 'image': image,'name':name,'email':email }))
        dispatch(removeProfilePic())
    }

    return (
        <div className='p-2'>
            {myContacts ?
                myContacts.map((contact, index) => {
                    return (
                        <div className='w-100 rounded-2 bg-success py-1 mb-2'>
                            <div key={index} class="d-flex w-100">
                                <img className='photo mx-2' onClick={()=>handleImageClick(contact.profile_url,contact.email)} src={contact.profile_url ? process.env.REACT_APP_URL + contact.profile_url : '/unknown.jpg'} />
                                <div className='m-0 p-0 w-75'>
                                    <div className="d-flex justify-content-between">

                                        <h5 className='text-start p-0 m-0 w-100 text-truncate flex-grow-1'>{contact.name}</h5>
                                        <button type="button" className="btn btn-info p-0 px-2" onClick={()=>handleChatting(contact.profile_url, contact.name,contact.email)}>Chat</button>
                                    </div>

                                    <p className='m-0 p-0 text-start text-truncate w-100'> {contact.email} </p>
                                </div>
                            </div>
                        </div>
                    )

                })
                :
                <p>fetching data</p>
            }

        </div>
    
    )
}

export default SavedContacts
