import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import userReducer from './userSlice';
import myDataReducer from './myDataSlice'
import chattingPartnerReducer from './chattingPartner'
import profilepicReducer from './profilePicSlice'

const store = configureStore({
    reducer:{
        chat: chatReducer,
        user : userReducer,
        myData: myDataReducer,
        chattingPartner : chattingPartnerReducer,
        profilePic : profilepicReducer
    }
});

export default store