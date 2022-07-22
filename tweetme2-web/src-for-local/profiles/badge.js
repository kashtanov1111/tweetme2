import React, {useState, useEffect} from 'react'

import { apiProfileDetail, apiProfileFollowToggle } from './lookup'
import { UserDisplay, UserPicture } from './components'

import { DisplayCount } from './utils'

function ProfileBadge (props) {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? 'Loading...' : currentVerb

    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            console.log('lla') 
            didFollowToggle(currentVerb)
        }
    }
    
    return user ? 
        <div>
            <UserPicture user={user} hidelink />
            <p><UserDisplay user={user} includeFullName hidelink /></p>
            <p><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? 'follower' : 'followers'}</p>
            <p><DisplayCount>{user.following_count}</DisplayCount> following</p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <button onClick={handleFollowToggle} className='btn btn-primary'>{currentVerb}</button>
        </div> : null
}

export function ProfileBadgeComponent (props) {
    const {username} = props
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        } 
    }

    useEffect(() => {
        apiProfileDetail(username, handleBackendLookup)
    }, [username])

    const handleNewFollow = (actionVerb) => {
        setProfileLoading(true)
        apiProfileFollowToggle(username, actionVerb, (response, status) => {
            console.log(response, status)
            if (status === 200) {
                setProfile(response)
                // apiProfileDetail(username, handleBackendLookup)
            }
            setProfileLoading(false)
        })
    }
    
    return profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : "Loading..."
}