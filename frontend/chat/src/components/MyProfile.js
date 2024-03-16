import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { upload_pic } from '../store/userSlice';
import { get_friend_details } from '../store/profilePicSlice';


const MyProfile = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.user);
    const profilePic = useSelector((state) => state.profilePic);
    const mydetails = useSelector((state) => state.myData)
    const [lastseen, setLastseen] = useState('')
    const [femail, setFemail] = useState('')
    

    const handleImageChange = (event) => {
        dispatch(upload_pic({ 'image': event.target.files[0] }))
    };
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    useEffect(() => {
        if (props.fmail) {
            setFemail(props.fmail)
            const token = localStorage.getItem('access')
            if (token) {
               dispatch(get_friend_details({"email":props.fmail}))
            }
        }
    }, [props.fmail])

    useEffect(() => {
        if (profilePic.me === false) {
            setLastseen("api under construnction")
        }
    }, [profilePic.me])


    return (

        <div className="h-100 rounded-4 chatting_box2 overflow_css d-flex justify-content-center align-items-center">

            <div className='d-flex flex-column align-items-center'>

                <div className='pb-3'>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    {lastseen ?
                        <img className='account_pic' src={profilePic.dp ? profilePic.dp : './unknown.jpg'} />
                        :
                        <img onClick={triggerFileInput} id='profile_pic' className={`account_pic ${isHovered ? 'bluish-image' : ''}`} onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} src={profilePic.dp ? profilePic.dp : './unknown.jpg'} />
                    }

                    {lastseen && <p>last seen: {lastseen}</p>}
                </div>


                <div className='w-100'>

                    <div className='m-0 p-0 d-flex flex-column'>
                        <hr />

                        <div className='d-flex justify-content-start m-0 p-0' style={{ 'height': '20px' }}>
                            <p>Name</p>
                        </div>

                        <div className='d-flex justify-content-between'>
                            {/* {fname ? fname :
                                user.data.first_name && user.request === 'user_details_fulfilled' ? <h2>{user.data.first_name + ' ' + user.data.last_name}</h2> : <h5>Myreal Name</h5>
                            } */}
                            {props.name && profilePic.me === true && <h5>{props.name}</h5>}
                            {profilePic.name && profilePic.me === false && <h5>{profilePic.name}</h5>}

                            {lastseen === '' && <button type="button" class="btn btn-light mx-2">Update</button>}


                        </div>
                        <hr />

                    </div>
                    <div className='m-0 p-0 d-flex flex-column'>

                        <div className='d-flex justify-content-start m-0 p-0' style={{ 'height': '20px' }}>
                            <p>Email</p>
                        </div>

                        <div className='d-flex justify-content-between'>

                            {mydetails.my_email && profilePic.me === true && <h5>{mydetails.my_email}</h5>}
                            {femail && profilePic.me === false && <h5>{femail}</h5>}

                            {lastseen === '' && <button type="button" class="btn btn-light mx-2">Update</button>}

                        </div>
                        <hr />

                    </div>
                    <div className='m-0 p-0 d-flex flex-column'>

                        <div className='d-flex justify-content-start m-0 p-0' style={{ 'height': '20px' }}>
                            <p>Bio</p>
                        </div>

                        <div className='d-flex justify-content-between'>
                            {profilePic.me === true && props.about !== null && <h5>{props.about}</h5>}
                            {profilePic.me === true && props.about === null && <input className='rounded-2 mt-2' />}
                            {profilePic.about && profilePic.me === false && <h5>{profilePic.about}</h5>}
                            {lastseen === '' && <button type="button" className="btn btn-light mx-2">Update</button>}

                        </div>
                        <hr />

                    </div>

                </div>



            </div>
        </div>
    )
}

export default MyProfile
