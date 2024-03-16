import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  },
  request: '',
  data: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save_email(state, action) {
      state.user.email = action.payload.toLowerCase()
    },
    save_first(state, action) {
      state.user.first_name = action.payload
    },
    save_last(state, action) {
      state.user.last_name = action.payload
    },
    save_password(state, action) {
      state.user.password = action.payload
    },
    login_password_got(state, action) {
      state.request = 'login_password_got'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, state => {
        state.request = 'register' + '_fulfilled'
      })
      .addCase(register.rejected, state => {
        state.request = 'register' + '_rejected'
      })
      .addCase(register.pending, state => {
        state.request = 'pending'
      })
      .addCase(login.pending, state => {
        state.request = 'pending'
      })
      .addCase(login.fulfilled, state => {
        state.request = 'login' + '_fulfilled'
      })
      .addCase(login.rejected, state => {
        state.request = 'login' + '_rejected'
      })
      .addCase(upload_pic.fulfilled, (state,action) => {
        state.request = 'profile_pic' + '_fulfilled'
        state.user = process.env.URL+action.payload.image_url
      })
      .addCase(upload_pic.rejected, state => {
        state.request = 'profile_pic' + '_rejected'
      })
      .addCase(get_user_pic.fulfilled, (state,action) => {
        state.request = 'profile_pic' + '_fulfilled'
        if(action.payload.image_url){
          state.user = process.env.URL+action.payload.image_url
        }
        else{
          state.user = ''
        }
      })
      .addCase(get_user_pic.rejected, state => {
        state.request = 'get_profile_pic' + '_rejected'
      })
      .addCase(get_user_details.fulfilled, (state,action) => {
        state.request = 'user_details' + '_fulfilled'
        state.data = action.payload
      })
      .addCase(get_user_details.rejected, state => {
        state.request = 'get_profile_pic' + '_rejected'
      })
      .addCase(get_user_emails.fulfilled, (state,action) => {
        state.data = action.payload.emails
        state.request = 'registered_emails' + '_fulfilled'
      })
      .addCase(get_user_emails.rejected, state => {
        state.request = 'registered_emails' + '_rejected'
      })
      .addCase(get_contacts_of_user.pending, state => {
        state.request = 'get_contact_of_user' + '_pending'
      })
      .addCase(get_contacts_of_user.fulfilled, (state,action) => {
        state.data = action.payload.accounts
        state.request = 'get_contact_of_user' + '_fulfilled'
      })
 

  }

})


export const register = createAsyncThunk('user/register', async (payload, thunkAPI) => {
  const { first_name, last_name, email, password } = payload.user;

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password
  })
  try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body
    })
    const data = await res.json()
    if (res.status === 201) {
      return data;
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


export const login = createAsyncThunk('user/login', async (payload, thunkAPI) => {
  const { email, password } = payload.user;

  const body = JSON.stringify({
    email,
    password
  })
  try {
    const res = await fetch(process.env.REACT_APP_URL+'/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body
    })
    const data = await res.json()
    console.log("res from login: ", res)
    if (res.status === 200) {
      console.log("data saved to storage")
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      window.location.reload();
      return data;
    } 
    else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  catch (err) {
    console.log('error')
    return thunkAPI.rejectWithValue(err.response.data);
  }
})

export const upload_pic = createAsyncThunk('user/upload_profile', async (payload, thunkAPI) => {

  const { image } = payload;

  const formData = new FormData();
  formData.append("file", image);

  const token = localStorage.getItem('access')

  try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/pic/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    const data = await res.json()
    if (res.status === 200) {
      console.log(data)
      return data;
    } else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  catch (err) {
    console.log('error')
  }
})

export const get_user_pic = createAsyncThunk('user/get_profile', async (payload, thunkAPI) => {
  const token = localStorage.getItem('access')
  
  try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/pic/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    const data = await res.json()
    console.log(data)
    if (res.status === 200) {
      console.log(data)
      return data;
    } 
    else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
   }
  catch (err) {
    console.log('error')
  }
}
)


export const get_user_details = createAsyncThunk('user/user_details', async (payload, thunkAPI) => {
  const token = localStorage.getItem('access')
  try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/details/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    console.log(res)
    if (res.status === 200) {
      return data;
    } else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  catch (err) {
    console.log('error')
  }
})


export const get_user_emails = createAsyncThunk('users/registered_emails', async (payload, thunkAPI) => {
  const token = localStorage.getItem('access')
  // try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/registered_emails/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    if (res.status === 200) {
      return data;
    } else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  // catch (err) {
  //   console.log('error')
  // }
//}
)


export const get_contacts_of_user = createAsyncThunk('users/contacts', async (payload, thunkAPI) => {
  const token = localStorage.getItem('access')
  // try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/contacts/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 200) {
      return data;
    } else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  // catch (err) {
  //   console.log('error')
  // }
//}
)


export const saveContact = createAsyncThunk('user/save_contact', async (payload, thunkAPI) => {
  const inputName  = payload.inputName;
  const friend_email  = payload.friend_email;
  const token = localStorage.getItem('access')

  const body = JSON.stringify(
    {inputName,friend_email}
  )

  // try {
    const res = await fetch(process.env.REACT_APP_URL+'/account/registered_emails/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
    const data = await res.json()
    console.log(res)
    console.log(data)
    if (res.status === 200) {
      console.log("sent data")
      return data;
    } else {
      console.log("else")
      return thunkAPI.rejectWithValue(data)
    }
  }
  // catch (err) {
  //   console.log('error')
  //   return thunkAPI.rejectWithValue(err.response.data);
  // }
// }
)


export const { save_email, save_first, save_last, save_password, login_password_got } = userSlice.actions;
export default userSlice.reducer;  