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
1. Never trust your req.body, validate your 
    data user must send proper data from the
    frontend to create the user in your database.
    for this we create utils and a file name
    validation.js (where i write the logic or the 
    function of of validation)
2. Making the password encrypted as now we
    are storing the data in plain text that is
    readable and hence anyone can crack this 
3. And after doing this you should encrypt the
    data. For this we use bcrypt to hash our 
    password
4. create a login api and check whether the
    user can login into the application or not
    and for it validate the email and use bcrypt
    to validate the users identity
5. for this we will first whether the emailid 
    is present in our database 
