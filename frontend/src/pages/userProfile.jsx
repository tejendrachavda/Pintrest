import React from 'react'
import Profile from '../components/profile'
import { UserData } from '../context/UserContext';

function UserProfile() {
      const { user } = UserData()
        const User = user;

  return (
    <Profile User={User}/>
  )
}

export default UserProfile