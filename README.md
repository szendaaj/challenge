## Local developent

### 1. Staring server
Start server to reach api by `node server.js` command in server folder. Server will listen on port 5300.

### 2. Starting frontend

Go to test folder and check if environment variables are set correctly for the frontend. 

`REACT_APP_API_URL` variable must point to the port server listens to.

To start frontend in development mode run `npm start`. The app will run on port [3001](http://localhost:3001).

**Notes:**
- The data.json file contains the parsed data. If you remove that, you can upload a new flat file. Please note there is no validation for the file yet so please upload valid files only.



