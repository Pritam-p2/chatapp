import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const domain = process.env.REACT_APP_URL

const initialState = {
    dp: '',
    me: '',
    name: '',
    about: ''
};

const profilepicSlice = createSlice({
    name: 'profilepic',
    initialState,
    reducers: {
        setProfilePic(state, action) {
            if(action.payload.dp){
                state.dp = domain + action.payload.dp
            }
            else{
                state.dp = ''
            }
            
            if (action.payload.me === false) {
                state.me = action.payload.me
            }
            else {
                state.me = true
            }
        },
        removeProfilePic(state, action) {
            state.dp = ''
            state.me = ''
            state.name = ''
            state.about = ''
        }
    },
    extraReducers: builder => {
        builder
          .addCase(get_friend_details.fulfilled, (state,action) => {
            state.name = action.payload.name
            state.about = action.payload.bio
          })
        }      
})


export const get_friend_details = createAsyncThunk('friend/details', async (payload, thunkAPI) => {
    const token = localStorage.getItem('access')
    const friend_email = payload.email
    const body = JSON.stringify({
        friend_email
      })
    try {
        const res = await fetch(domain + `/account/name/bio/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body
        })
        const data = await res.json()

        if (res.status === 200) {
            return data
        } else {
            console.log("else")
            return thunkAPI.rejectWithValue(data)
        }
    }
    catch (err) {
        console.log('error')
        return thunkAPI.rejectWithValue(err.response.data);
    }
})


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



export const { setProfilePic, removeProfilePic } = profilepicSlice.actions;
export default profilepicSlice.reducer;  