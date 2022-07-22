# from rest_framework.test import APIClient

# from django.contrib.auth import get_user_model
# from django.test import TestCase

# from .models import Tweet

# User = get_user_model()

# class TweetTestCase(TestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(username='cfe', password='somepassword')
#         self.userb = User.objects.create_user(username='cfe-2', password='somepassword2')
#         Tweet.objects.create(content='my first tweet', 
#             user=self.user)
#         Tweet.objects.create(content='my first tweet', 
#             user=self.user)
#         Tweet.objects.create(content='my first tweet', 
#             user=self.userb)
#         self.currentCount = Tweet.objects.all().count()

#     def test_tweet_created(self):
#         tweet = Tweet.objects.create(content='my second tweet',
#              user=self.user)
#         self.assertEqual(tweet.user, self.user)
#         self.assertEqual(tweet.id, 13)
    
#     def get_client(self):
#         client = APIClient()
#         client.login(username=self.user.username, password='somepassword')
#         return client
        
        
#     def test_tweet_list(self):
#         client = self.get_client()
#         response = client.get('/api/tweets/')
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.json()), 3)

#     def test_action_like(self):
#         client = self.get_client()
#         response = client.post('/api/tweets/action/', {'id': 1, 'action': 'like'})
#         self.assertEqual(response.status_code, 200)
#         like_count = response.json().get('likes')
#         self.assertEqual(like_count, 1)

#     def test_action_unlike(self):
#         client = self.get_client()
#         response = client.post('/api/tweets/action/', {'id': 7, 'action': 'like'})
#         print(response.json())
#         self.assertEqual(response.status_code, 200)
#         response = client.post('/api/tweets/action/', {'id': 7, 'action': 'unlike'})
#         self.assertEqual(response.status_code, 200)
#         like_count = response.json().get('likes')
#         self.assertEqual(like_count, 0)
#         print(Tweet.objects.all())

#     # def test_action_retweet(self):
#     #     client = self.get_client()
#     #     response = client.post('/api/tweets/action/', {'id': 14, 'action': 'retweet'})
#     #     self.assertEqual(response.status_code, 201)
        
        