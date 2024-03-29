import React from "react";

export function UserDisplay (props) {
  const {user, includeFullName, hidelink} = props
  const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name}` : null

  return (
    <React.Fragment>
      {nameDisplay}{' '}
      {hidelink === true ? `@${user.username}`:
      <UserLink username={user.username}>@{user.username}</UserLink>}
    </React.Fragment>
  )
}

export function UserLink (props) {
  const {username} = props

  const handleUserLink = (event) => {
    window.location.href = `/profile/${username}`
  }
  
  return (
    <span className='pointer' onClick={handleUserLink}>
      {props.children}
    </span>
  )  
}

export function UserPicture (props) {
  const {user, hidelink} = props
  const userIdSpan = <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
                      {user.username[0]}
                    </span> 
  return ( hidelink === true ? userIdSpan : <UserLink username={user.username}>
    {userIdSpan}
    </UserLink>
  )
}