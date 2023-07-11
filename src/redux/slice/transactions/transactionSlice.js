import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../../utils/baseUrl'

const initialState = {
  transactions: [],
  transaction: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
}

export const createTransactionAction = createAsyncThunk(
  'transaction/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, transactionType, amount, category, notes } = payload

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token

      const header = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(
        `${BASE_URL}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
        },
        header
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTransactionAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false
      state.isAdded = true
      state.transaction = action.payload
    })
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.transaction = null
    })
  },
})

export default transactionSlice.reducer
