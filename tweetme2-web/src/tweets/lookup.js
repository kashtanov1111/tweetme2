import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweet, callback) {
    backendLookup('POST', '/tweets/create/', callback, {content: newTweet})
}

export function apiTweetAction(tweetid, action, callback) {
    backendLookup('POST', '/tweets/action/', callback, {id: tweetid, action: action})
}
  
export function apiTweetDetail(tweetId, callback) {
    backendLookup('GET', `/tweets/${tweetId}`, callback)
}

export function apiTweetList(username, callback, nextUrl) {
    let endpoint = '/tweets/'
    if (username) {
        endpoint = `/tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace('http://localhost:8000/api', '')
    }
    backendLookup('GET', endpoint, callback)
}

export function apiTweetFeed(callback, nextUrl) {
    let endpoint = '/tweets/feed/'
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace('http://localhost:8000/api', '')
    }
    backendLookup('GET', endpoint, callback)
}