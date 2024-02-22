import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        email:'',
        first_name:'',
        last_name: '',
        password:'',
        c_password:'',
        show_details:false
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        save_email(state,action){
            state.user.email = action.payload
        },
        save_first(state,action){
            state.user.first_name = action.payload
        },
        save_last(state,action){
            state.user.last_name = action.payload
        },
        save_password(state,action){
            state.user.password = action.payload
        },
        save_cpassword(state,action){
            state.user.c_password = action.payload
            state.user.show_details = true
        },
        show_details_false(state,action){
            state.user.show_details = false
        }
    }})




export const { save_cpassword,save_email,save_first,save_last,save_password,show_details_false } = userSlice.actions;
export default userSlice.reducer;  