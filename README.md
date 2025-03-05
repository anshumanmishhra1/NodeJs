📌 Day - 1
1. first initialize the project using 
   npm init -y (this create a json file)
2. we create a src folder and app.js file
3. We use expressJs for creating our server
4. Use nodemon otherwise every time we have
    to save and run the file after closing.


📌 Day - 2
1. Check all the routes and play with 
    routes and check the output
2. Order or writing the routes matters
    a lot. 
3. Post/get/path/delete all these are 
    http methods that are supported by
    http protocol
4.  get request / post request difference
5.  while using app.use -> whether we use
    get and post request the output will be
    same but using get request with different
    routes the output will not be different


📌 Day - 3
1. What happen we don't use router handler
    route handler means we don't send the
    response.
2. What will happen if we use multiple request
    handler check whether the first router 
    handler doesn't send anything and the 
    second handler is sending something  
3. Understanding the Middlewares for checking
    whether the token is verified or not
    if any issue visit 1:04:10 sec at namaste 
    nodejs
4. Create a middlewares folder and make auth.js
    file and code 1:14:00
5. Try catch Understanding
                         


📌 Day - 4
1. Create a folder config and a file database.js
    in it.
2. We are using mongoose to create models,
    schema and connect to databases.
3.  Make sure the database connected first
    and then we console the listen port at 8888
4. Make a model folder and create a user.js
    file in it and create a userSchema 
5. Now make an api so that we can create
    a user in our database.



📌 Day - 5
1. Send the data through the api without using
    the static method, find the difference between
    JSON and Javascript Object
2. Create a feed api that will get all the users
    from the database using email
3. Find all the user using email it will be a different
    api
4. Create a delete API
5. Create a Update API for updating the user
    details.



📌 Day - 6
1. Make your schema good by taking care that
    which one is mandatory to create user in
    our database
2. Add photoUrl, about, skills photourl = 
    https://geographyandyou.com/images/user-profile.png
    work on email so that every letter is in lower 
    case. also take care that first name is not
    bigger than 4 and less than 50, also check
    the user is 18 years or greater, also check
    gender is male female or others
3. Add time stamps to the users when they are
    created and  50:00
4. Make sure that email is not updated as it 
    as a sensitive data for any company
5. Add a validation to the skills where you can't
    add more skills than 20
6. Make your gmail validator so that without
    @, .com no gmail can be accepted


📌 Day - 8
1. Today, we are learning JWT and how to make
    authentication, we will learn about cookie.
2. After every request there must be authentication
    so that they can do any post,get, patch 
    request
3. I will create a token after this i will add the
    token to the key and send the response to
    the user.
4. create a profile api, where i will validate my
    cookie when ever we need to read the cookie
    i need a middleware named as cookie-parser
5.  I need that every api should work after 
    authentication means ours token should be
    validated. first we have to create the 
    userAuth and in it read the token from the
    req cookies, validate the token,  find the 
    user. find the user in the database after
    validation
6. Make an api for sending the connection 
    request ("/sendConnectionRequest") but
    for this make sure that the user is 
    authenticated then after some one can 
    send the request of connection. 
    S2 V10 completed

📌 Day - 9 
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User Not Found!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("User not found!!");
  }

  //hm hmesha user(jo ki ek model hai) usme mein hi find karenge jahir si bat hai isliye User.find
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (error) {
    res.status(404).send("kya kar raha hai bhai yaha koi nahi hai apna");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("User Not found or deleted Already");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send({ message: "User updated successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

-> may be in future we use this 

1. List all the api that we need to make the
   devtinder website such as post api for
    signup, login, logout; Patch api for update
    the profile; get api for profile; Patch api
    for updating the password
    
    ------------------------------------------------------------------------------------------------
    |    authRouter :                                                                              |
    |    - post/singup                                                                             |
    |    - post/login                                                                              |
    |    - post/logout                                                                             |
    |                                                                                              |
    |    profileRouter :                                                                           |
    |    -get /profile/view                                                                        |
    |    -get /profile/edit                                                                        |
    |    -get /profile/password                                                                    |
    |                                                                                              |
    |    connectionRequestRouter :                                                                 |
    |    -post /request/send/interested/:userId                                                    |
    |    -post /request/send/ignored/:userId                                                       |
    |    -post /request/review/accepted/:requestId                                                 |
    |    -post /request/review/rejected/:requestId                                                 |
    |                                                                                              |
    |    userRouter :                                                                              |
    |    -get /users/connections                                                                   |
    |    -get /users/requests                                                                      |
    |    -get /users/feeds (it will get you a lot users in a single call)                          |
    |                                                                                              |
    |    -status : ignore, interested, accepted, rejected.                                         |
    ------------------------------------------------------------------------------------------------

2. in our src folder create a folder named routes
    in it create a file auth.js (route specific to auth)
    in it create a file profile.js (route for profile)
    in it create a file request.js (route for request)
    