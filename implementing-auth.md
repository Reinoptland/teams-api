# Implementing authentication

```
Authenticate user by checking the information in the token
 X Make User Model
 - Make a way for a user to sign up
    X Backend
    - Frontend
 - Make a way for a user to login (this is when we give them a token)
    X Backend
    - Frontend
      X Make a route
      X Make a form component
      X Make an action that sends a request
      X We have token now -> store it (dispatch and make reducer)
      X Redirect the user to homepage? when user is logged in
      - Error handling .. hehehe
 - Make the user send us their token in requests that require authorization
    - Frontend
      X Post teams -> posting teams & sending the token

 Update the middleware
 X Change this auth middleware to check database iif this user exists
 X Add the information from the user to the "req" object (so we can use it in the next step)
```
