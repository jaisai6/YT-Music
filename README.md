# YT-Music

A Node.js application which displays Youtube Music videos in the dashboard.

## Setup
To run the file locally, follow the instructions below:

1. Clone the repository into the local machine.
2. Create a .env file in the root directory of the project.
3. Now, create a new project in the google developer console and acquire the API key (Enable the Youtube data API).
4. Create a new MongoDB collection and acquire the MongoDB url.
5. Store the environment variables in the .env file.
    
   ```
   DB_URL = <YOUR MONGODB DATABASE URL>
   API_KEY = <YOUR GOOGLE API KEY>
   ```
6. Make sure that the stable version of node version 16.14.0 is installed in the local machine.
7. Now, install all the packages in the pacakage.json file by running the following command.
   
   ```
   npm install
   ```
   
8. Once all the pacakages are installed, run the application:

   ```
   npm run start
   ```
   
9. Now, head over to ```http://localhost:3000```.
