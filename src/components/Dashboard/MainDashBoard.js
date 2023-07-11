import React from 'react'
import AccountList from './AccountList'
import AccountSummary from './AccountSummary'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserProfile } from '../../redux/slice/users/usersSlice'

const MainDashBoard = () => {
  const dispatch = useDispatch()

  const { profile, error, loading } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-500 my-auto">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-red-500 my-auto">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  )
}

export default MainDashBoard
