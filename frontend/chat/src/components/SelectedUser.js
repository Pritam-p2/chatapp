import React, {useState } from 'react'
import { saveContact } from '../store/userSlice';
import { useDispatch} from 'react-redux';



const SelectedUser = (props) => {
    const [inputName, setInputName] = useState('')
    const dispatch = useDispatch()
    


    const showUserProfile = (email) => {
        props.handleFemail(email)
    }
    const saveDetails = (friend_email) => {
        dispatch(saveContact({ inputName, friend_email }))
    }

    return (
        <div className='p-2'>
            <div className='w-100 rounded-2 bg-success py-1'>
                <div class="d-flex w-100 align-items-center">
                    <img className='photo mx-2' onClick={() => showUserProfile(props.user)} src='./unknown.jpg' />


                    <div className='m-0 p-0 w-75'>
                        <div className="d-flex justify-content-between">
                            <input value={inputName} placeholder='Enter Name' onChange={(e) => setInputName(e.target.value)} />
                            {/* <h5 className='text-start p-0 m-0 w-100 text-truncate flex-grow-1'>Rajat Debnath</h5> */}
                            <button type="button" onClick={() => saveDetails(props.user)} className="btn btn-info p-0 px-2">Save</button>
                        </div>
                        <p className='m-0 p-0 text-start text-truncate w-100'> {props.user}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SelectedUser
