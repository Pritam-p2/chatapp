import Chatting from '../components/Chatting'
import React, { useState, useEffect } from 'react'
import { ask_email } from '../store/chatSlice';

import MyProfile from '../components/MyProfile';
import Leftpart from '../components/Leftpart';
import { get_user_pic } from '../store/userSlice';
import axios from 'axios';


// import { get_user_email } from '../store/myChatsSlice';
import { useSelector, useDispatch } from 'react-redux'
import { save_details } from '../store/myDataSlice';



const Home = (props) => {
    const dispatch = useDispatch()
    const [hasAccessToken, setHasAccessToken] = useState(false)
    const [first,setFirst] = useState('')
    const [last,setLast] = useState('')
    const [about,setAbout] = useState('')
    const profilePic = useSelector((state) => state.profilePic);
    const [fmail,setFmail] = useState('')
    

    const handle_setFmail=(mail)=>{
        setFmail(mail)
    }



    useEffect(() => {
        const storedToken = localStorage.getItem('access');
        console.log(storedToken)

        if (storedToken) {
            setHasAccessToken(true)
            console.log("found token in local storage")
            dispatch(get_user_pic())

            const url = process.env.REACT_APP_URL+'/account/details/';
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        setFirst(response.data.first_name)
                        setLast(response.data.last_name)
                        setAbout(response.data.about)
                        const email = response.data.email
                        const pic = response.data.profile_img
                        dispatch(save_details({email,pic}))
                    }
                    else {
                        console.log('else')
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setHasAccessToken(false)
            dispatch(ask_email())
        }
    }, [])





    return (
        <div className="text-center" style={{overflow:'hidden',height:'100vh'}}>
            <div className="row me-0" style={{height:'100%'}}>
                <div className="col-4 bg-success text-dark bg-opacity-50 pe-0" style={{height:'100%'}}>
                    {/* {
                        lenContacts === Roomname.length && Roomname.map((room) => {
                            return <ComponentWS room={room} />
                        })
                    } */}

                    <Leftpart hasAccessToken={hasAccessToken} logout={props.logout} handle_femail={handle_setFmail} />
                </div>

                <div className="col-8 px-2 py-2 chatting_layout d-flex flex-column">
                    {profilePic.me ===true && hasAccessToken && <MyProfile name={first +' '+last} about={about} />}
                    {profilePic.me ===false && fmail && hasAccessToken && <MyProfile fmail={fmail} /> }
                    {profilePic.me ==='' && profilePic.dp==='' && hasAccessToken && <Chatting />}
                    {/* {showProfile === false && hasAccessToken && viewChatsComponent && <Chatting users={users} />} */}
                    { hasAccessToken === false  && <Chatting />}
                    
                </div>
            </div>
        </div>
    )
}

export default Home
