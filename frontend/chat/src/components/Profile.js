import React from 'react'
import { setProfilePic } from '../store/profilePicSlice'
import { useSelector,useDispatch } from 'react-redux'

const Profile = (props) => {
    const hasAccessToken = props.hasToken
    const dispatch = useDispatch()
    const mydetails = useSelector((state)=> state.myData)

    const handle_img_click = (my_dp) =>{
        dispatch(setProfilePic({'me':true,'dp':my_dp}))
    }
    const handle_logout = ()=>{
        props.logout_fun()
        window.location.reload();
    }

    return (
        <div className='bg-secondary mt-2 mx-2 rounded-2' style={{ height: '65px'}}>
            <div className="h-100 d-flex justify-content-between px-2">
                <div className=" d-flex align-items-center">
                   
                        <img className='photo' style={{ cursor: 'pointer' }}
                            onClick={() => {handle_img_click(mydetails.my_profile_pic)}} src={`${mydetails.my_profile_pic ? process.env.REACT_APP_URL+mydetails.my_profile_pic : '/unknown.jpg'}`} />
                   
                </div>
                {hasAccessToken ? <div className='d-flex justify-content-between my-3'>
               
                    <button type="button" onClick={() => { props.change_email() }} className="btn btn-info p-0 me-3 px-2">Contacts</button>
                    <button type="button" onClick={handle_logout} className="btn btn-info p-0 px-2">Logout</button>

                </div>
                    : <p>features</p>}
            </div>
        </div>
    )
}


export default Profile
