import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../../utils/baseUrl'

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (
    { fullname, password, email },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${BASE_URL}/users/register`,
        {
          fullname,
          email,
          password,
        },
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const loginUserAction = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        {
          email,
          password,
        },
        config
      )
     // Save user info to local storage
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logoutUserAction = createAsyncThunk(
 'user/logout',
 async () => {
  localStorage.removeItem('userInfo')

  return { message: 'User logged out' }
 }
)

//initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo") ?
     JSON.parse(localStorage.getItem("userInfo")) :
     null,
  },
}

// slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // logoutUser: (state) => {
    //   localStorage.removeItem('userInfo')
    //   state.userAuth.userInfo = null
    // },
  },
  // Register user
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.userAuth.userInfo = action.payload
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false
      state.userAuth.error = action.payload
    })

    // Login user
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.userAuth.userInfo = action.payload
    })
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false
      state.userAuth.error = action.payload
    })

   // Logout user

   // builder.addCase('user/logoutUser', (state) => {
   //   localStorage.removeItem('userInfo')
   //   state.userAuth.userInfo = null
   // }
  // )
   builder.addCase(logoutUserAction.pending, (state) => {
     state.userAuth.loading = true
   }
   )
   builder.addCase(logoutUserAction.fulfilled, (state, action) => {
     state.userAuth.loading = false
     state.userAuth.userInfo = null
   }
   )
   builder.addCase(logoutUserAction.rejected, (state, action) => {
     state.userAuth.loading = false
     state.userAuth.error = action.payload
   }
   )
  },
})

// actions
export const { logoutUser } = usersSlice.actions

// reducer
export default usersSlice.reducer

// selectors
export const selectUsers = (state) => state.users.users
