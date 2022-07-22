import random
from site import USER_BASE

from django.conf import settings
from django.db import models
from django.db.models import Q

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    
    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_users_ids = []
        if profiles_exist:
            followed_users_ids = user.following.values_list('user__id', flat=True) #[x.user.id for x in profiles]
        return self.filter(
            Q(user__id__in=followed_users_ids) |
            Q(user=user)).distinct().order_by('-timestamp')

class TweetManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)

class Tweet(models.Model):
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tweets')
    likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, null=True, through=TweetLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return str(self.content)

    objects = TweetManager()

    @property
    def is_retweet(self):
        return self.parent != None

    class Meta:
        ordering = ['-id']

    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'content': self.content,
    #         'likes': random.randint(0, 123),
    #     }