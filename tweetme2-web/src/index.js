import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProfileBadgeComponent } from './profiles';
import { FeedComponent, TweetsComponent, TweetDetailComponent } from './tweets';
import reportWebVitals from './reportWebVitals';

const appEl = document.getElementById('root')
if (appEl) {
  const root = ReactDOM.createRoot(appEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
const e = React.createElement
const tweetsEl = document.getElementById('tweetme-2')
if (tweetsEl) {
  const root = ReactDOM.createRoot(tweetsEl)
  root.render(e(TweetsComponent, tweetsEl.dataset))
}

const tweetFeedEl = document.getElementById('tweetme-2-feed')
if (tweetFeedEl) {
  const root = ReactDOM.createRoot(tweetFeedEl)
  root.render(e(FeedComponent, tweetFeedEl.dataset))
}

const tweetDetailElement = document.querySelectorAll('.tweetme-2-detail')

tweetDetailElement.forEach(container => {
  ReactDOM.createRoot(container).render(
    e(TweetDetailComponent, container.dataset))
})

const userProfileBadgeElements = document.querySelectorAll('.tweetme-2-profile-badge')

userProfileBadgeElements.forEach(container => {
  ReactDOM.createRoot(container).render(
    e(ProfileBadgeComponent, container.dataset))
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
