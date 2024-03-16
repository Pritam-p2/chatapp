import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { get_user_emails } from '../store/userSlice';
import SelectedUser from './SelectedUser';
// import SavedContacts from '../components/SavedContacts';


const EmailSearch = (props) => {
    const [input, setInput] = useState('')
    const [showUsers, setShowUsers] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [regisEmails, setRegisEmails] = useState([])


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
            {/* {showUsers===false && <SavedContacts />} */}
        </>
    )
}

export default EmailSearch
