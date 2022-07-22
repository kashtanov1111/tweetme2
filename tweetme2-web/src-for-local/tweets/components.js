import React, { useEffect, useState} from "react";

import { TweetCreate } from "./create"; 
import { FeedList } from "./feed";
import { TweetsList } from "./list";
import { Tweet } from "./detail";
import { apiTweetDetail } from "./lookup";


export function FeedComponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === 'false' ? false : true
    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreate 
                className='col-12 mb-3'
                didTweet={handleNewTweet} />}
            <FeedList newTweets={newTweets} {...props}/>
        </div>
    )
}

export function TweetsComponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === 'false' ? false : true
    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreate 
                className='col-12 mb-3'
                didTweet={handleNewTweet} />}
            <TweetsList newTweets={newTweets} {...props}/>
        </div>
    )
}

export function TweetDetailComponent(props) {
    const {tweetId} = props
    // const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)

    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setTweet(response)
        } else {
            alert('There was an error finding your tweet.')
        }
    }

    // useEffect(() => {
    //     if (didLookup === false) {
    //         apiTweetDetail(tweetId, handleBackendLookup)
    //         setDidLookup(true)
    //         console.log('a')
    //     }
    // }, [didLookup, tweetId])

    useEffect(() => {
        apiTweetDetail(tweetId, handleBackendLookup)
        console.log('a')
    }, [tweetId])
    
    return (
        tweet === null ? null : <Tweet tweet={tweet} className={props.classname} />       
    )
}