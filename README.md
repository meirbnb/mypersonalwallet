# mypersonalwallet
Moralis Web3 dApp made using React.JS

1) Clone the project using `git clone ...`

2) Make sure you have installed node js

3) Install necessary dependencies for backend by:

from the root folder `cd backend`

and then `npm i moralis express cors dotenv nodemon`

4) Install axios to make API requests to the backend from the frontend:

first `cd frontend`

second `npm i axios`

5) To make frontend more userfriendly I used web3uikit. Install it by:

`npm install @web3uikit/core @web3uikit/web3 @web3uikit/icons`

6) Run the project using `npm run` in both frontend & backend directories.

7) To integrate Firebase Auth install firebase tools:

`npm install -g firebase-tools`

8) Then go to firebase console and switch to Pay As You Go plan (you dont have to pay anything)

9) Create a project and copy its configuration details and paste it into walletInput.js inside components folder in frontend. Replace firebaseConfig with your config

10) Go to project settings and download a private key by generating a new private key

12) Use the following converter to fetch project details needed for moralis app:

https://moralisweb3.github.io/firebase-extensions/service-account-converter/

13) Install moralis auth extension to your firebase project by:

`firebase ext:install moralis/moralis.auth`

while installing CLI will prompt you to ask several questions

  - choose Google Cloud Secret Manager
  - Iowa us-central
  - take your Moralis API Key from moralis dashboard after authorizing and paste it in this command line when asked

14) Open the link provided in the CLI and enable Secret Manager API

15) Repeat 13th step (after having done 14) and fill the command line with necessary details you got from moralis converter (look 12th step)

16) deploy extensions using `firebase deploy --only extensions`

17) deploy the project to firebase hosting `firebase deploy --only hosting`

Now you can run the project using `npm run start` & test it locally or go to the link shown in the CLI to access it globally
