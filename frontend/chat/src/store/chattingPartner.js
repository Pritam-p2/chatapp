import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const domain = process.env.REACT_APP_URL    // no slash

const initialState = {
    partner_pic: '',
    partner_name: '',
    partner_email:'',
};

const chattingPartnerSlice = createSlice({
    name: 'chattingPartner',
    initialState,
    reducers: {
        initialChaters(state,action){
            console.log(action.payload)
            if(action.payload.image){
                state.partner_pic=domain+action.payload.image
            }
            else{
                state.partner_pic = ''
            }
            
            state.partner_name=action.payload.name
            state.partner_email = action.payload.email
        }
    },
    // extraReducers: builder => {
    //     builder
    //       .addCase(get_chats.fulfilled, (state,action) => {
    //         state.user_email = action.payload
    //       })
    //     }      
})

// replacement making
// export const get_chats = createAsyncThunk('user/chats', async (payload, thunkAPI) => {
//     const token = localStorage.getItem('access')
//     const me = payload.me
//     const friend = payload.friend
//     // try {
//       const res = await fetch(domain+`/account/chats/?me=${me}&friend=${friend}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//           }
//       })
//       const data = await res.json()
//       console.log(res)
//       console.log(data)
    //   if (res.status === 200) {
    //     return ''
    //   } else {
    //     console.log("else")
    //     return thunkAPI.rejectWithValue(data)
    //   }
    
    // catch (err) {
  //     console.log('error')
  //     return thunkAPI.rejectWithValue(err.response.data);
  //   }
//   })


  // export const get_all_frnds = createAsyncThunk('user/contact/emails', async (payload, thunkAPI) => {
  //   const token = localStorage.getItem('access')

  //   try {
  //     const res = await fetch(domain+'account/contact/emails/', {
  //       method: 'GET',
  //       headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //     })
  //     const data = await res.json()
  //     console.log(res)
  //     console.log(data)
  //     if (res.status === 200) {
  //       return data.email;
  //     } else {
  //       console.log("else")
  //       return thunkAPI.rejectWithValue(data)
  //     }
  //   }
  //   catch (err) {
  //     console.log('error')
  //     return thunkAPI.rejectWithValue(err.response.data);
  //   }
  // })



export const { initialChaters } = chattingPartnerSlice.actions;
export default chattingPartnerSlice.reducer;  