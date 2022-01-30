rm -r .git
heroku destroy -a evening-citadel-36388
heroku create evening-citadel-36388
git init
git config user.name 'test'
git config user.email 'supermail@mail.com'
git add .
git commit -m "testing"
heroku git:remote evening-citadel-36388
git push heroku master
heroku logs --tail
