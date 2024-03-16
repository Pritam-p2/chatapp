import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  my_email:'',
  my_profile_pic:''
};

const myDataSlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    save_details(state, action) {
        state.my_email = action.payload.email
        state.my_profile_pic = action.payload.pic
    }
  },
//   extraReducers: builder => {
//     builder
//       .addCase(register.fulfilled, state => {
//         state.request = 'register' + '_fulfilled'
//       })
//       .addCase(register.rejected, state => {
//         state.request = 'register' + '_rejected'
//       })
      
 

//   }

})







// export const saveContact = createAsyncThunk('user/save_contact', async (payload, thunkAPI) => {
//   const inputName  = payload.inputName;
//   const friend_email  = payload.friend_email;
//   const token = localStorage.getItem('access')

//   const body = JSON.stringify(
//     {inputName,friend_email}
//   )

//   // try {
//     const res = await fetch('http://127.0.0.1:8000/account/registered_emails/', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: body
//     })
//     const data = await res.json()
//     console.log(res)
//     console.log(data)
//     if (res.status === 200) {
//       console.log("sent data")
//       return data;
//     } else {
//       console.log("else")
//       return thunkAPI.rejectWithValue(data)
//     }
//   }
//   // catch (err) {
//   //   console.log('error')
//   //   return thunkAPI.rejectWithValue(err.response.data);
//   // }
// // }
// )


export const { save_details } = myDataSlice.actions;
export default myDataSlice.reducer;  