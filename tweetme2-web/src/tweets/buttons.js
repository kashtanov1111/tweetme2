import React from "react";

import {apiTweetAction} from "./lookup";

export function ActionBtn(props) {
    const {tweet, action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes : 0
    const actionDisplay = action.display ? action.display : 'Action'
    const className = (
      props.className ? props.className : 'btn btn-primary btn-small')
  
    const handleActionBackendEvent = (response, status) => {
      if ((status === 200 || status === 201) && didPerformAction) {
          console.log(response)
          didPerformAction(response, status)
      }
    }  
      
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id, action.type, handleActionBackendEvent)
    }  
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
  }