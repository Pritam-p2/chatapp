import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    question: [],
    requirement: ''
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        signup_now(state,action){
            state.question.push({'admin':true,'msg':'Will you sign up now? ','option':true})
        },
        ask_email(state, action) {
            state.requirement = 'email'
            state.question.push({'admin':true,'msg':'Hey there! We could not recognise you. Could You help us with your email! '})
        },
        email_found(state,action){
            state.requirement = 'password_login'
            state.question.push({'admin':true,'msg':'Aaha..! You are a known person. You need to just log in'})
            state.question.push({'admin':true,'msg':'Give password'})
        },
        email_not_found(state,action){
            state.question.push({'admin':true,'msg':'oops! We donot have your account. You need to sign up'})
        },
        save_users_chats(state,action){
            state.question.push({'msg':action.payload})
        },
        provide_asked_details(state,action){
            state.question.push({'admin':true,'msg':'Provide the correct detail!'})
        },
        ask_first_name(state,action){
            state.requirement = 'first_name'
            state.question.push({'admin':true,'msg':'ok then...'})
            state.question.push({'admin':true,'msg':'May I know your First name!'})
        },
        ask_last_name(state,action){
            state.requirement = 'last_name'
            state.question.push({'admin':true,'msg':'What is your Last name?'})
        },
        ask_password(state,action){
            state.requirement = 'password'
            state.question.push({'admin':true,'msg':'What password would you like to keep ?'})
        },
        ask_c_password(state,action){
            state.requirement = 'c_password'
            state.question.push({'admin':true,'msg':'Could you confirm the password ?'})
        },
        no_sign_up(state,action){
            state.question.push({'admin':true,'msg':'Well ok! Do let me know when You make your mind...'})
        },
        send_invalid_password_msg(state,action){
            state.question.push({'admin':true,'msg':'Note password is case sensitive'})
        },
        send_pass_error_msg(state,action){
            state.question.push([...action.payload])
        },
        account_creation_success(state,action){
            state.question.push({'admin':true,'msg':'Account Successfully Created'})
            state.question.push({'admin':true,'msg':'Wait...Loging You In'})
        },
        some_error_in_last_operation(state,action){
            state.question.push({'admin':true,'msg':'something wrong while taking data of last chat'})
        },
        task_processing(state,action){
            state.question.push({'admin':true,'msg':'Wait!!! I am processing a task'})
        }
    }

})


export const { task_processing,some_error_in_last_operation,account_creation_success,send_pass_error_msg,send_invalid_password_msg,no_sign_up,ask_email, email_found, email_not_found,save_users_chats, provide_email,ask_first_name,ask_last_name,ask_password,ask_c_password,provide_asked_details,signup_now } = chatSlice.actions;
export default chatSlice.reducer;  