import React,{useState} from 'react'
import { useSelector} from 'react-redux'
import Profile from '../components/Profile';
import EmailSearch from '../components/EmailSearch';
import SavedContacts from '../components/SavedContacts';
import Box1 from '../components/Box1'

const Leftpart = (props) => {
    
    
    const [emailSearchBool,setEmailSearchBool] = useState(false)
    const [searchedEmail,setSearchedEmail] = useState(false)
    const myData = useSelector((state) => state.myData)
    const userPart = myData.my_email.substring(0, myData.my_email.indexOf('@'))
    
 
    const true_search_email=()=>{
        setSearchedEmail(true)
    }

    const false_search_email=()=>{
        setSearchedEmail(false)
    }
   
   
    const changeSearchEmail = () =>{
        setEmailSearchBool(!emailSearchBool)
    }
    return (
        <>
            {props.hasAccessToken && emailSearchBool && <EmailSearch handleFemail={props.handle_femail} emailSearchBool={emailSearchBool} searchedEmail={searchedEmail} true_search_email={true_search_email} false_search_email={false_search_email} change_email={changeSearchEmail} />}
            {props.hasAccessToken && emailSearchBool === false && <Profile hasToken={props.hasAccessToken} change_email={changeSearchEmail} logout_fun={props.logout} />}
           
            {props.hasAccessToken === false && emailSearchBool === false && <h4>Get acccess after login</h4>}

            

            {searchedEmail===false && props.hasAccessToken === false && <p>Get access after you login</p>}
            {searchedEmail===false && props.hasAccessToken && emailSearchBool && <SavedContacts handleFemail={props.handle_femail} />}

            {userPart && searchedEmail===false && props.hasAccessToken && emailSearchBool === false && <Box1 handleFemail={props.handle_femail} userPart={userPart}/>}

        </>
    )
}

export default Leftpart
