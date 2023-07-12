import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../../utils/baseUrl'

const initialState = {
  account: {},
  accounts: [],
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
}

export const createAccountAction = createAsyncThunk(
  'account/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, accountType, initialBalance, notes } = payload

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token

      const header = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.post(
        `${BASE_URL}/accounts`,
        {
          name,
          accountType,
          initialBalance,
          notes,
        },
        header
      )
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateAccountAction = createAsyncThunk(
  "edit/account", async (payload, {
    rejectWithValue,
    getState,
    dispatch
  }) => {
    const { name, accountType, initialBalance, notes, id } = payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      const response = await axios.put(`${BASE_URL}/accounts/${id}`, {
        name, accountType, notes, initialBalance,
      }, header)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleAccountAction = createAsyncThunk(
  'account/getSingle',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token

      const header = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(`${BASE_URL}/accounts/${id}`, header)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Create a slice
const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccountAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.account = action.payload
    })
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.account = null
    })

    // Fetch Single Account
    builder.addCase(getSingleAccountAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.account = action.payload
    })
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.account = null
    })

    // Update Account
    builder.addCase(updateAccountAction.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.account = action.payload
    })
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.account = null
      state.isUpdated = false
      state.error = action.payload
    })
  },
})

export default accountSlice.reducer
