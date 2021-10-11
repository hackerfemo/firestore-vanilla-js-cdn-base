// "Easily add sign-in to your Web app with FirebaseUI"
// https://firebase.google.com/docs/auth/web/firebaseui?authuser=0

let loggedInUser = null;

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log("successful sign-in!", authResult);
      loggedInUser = authResult.user;
      return false; //return false or it'll try to redirect (e.g. to signInSuccessUrl)
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  //   signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
};

ui.start("#firebaseui-auth-container", uiConfig);
