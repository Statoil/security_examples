/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

(function () {
  angular
    .module('app')
    .controller('MainController', MainController);

  function MainController($http, $log, $window, GraphHelper) {
    let vm = this;

    // View model properties
    vm.displayName;
    vm.emailAddress;
    vm.emailContent = getEmailContent();
    vm.emailSubject = 'Welcome to Microsoft Graph development with Angular and the Microsoft Graph Connect sample';
    vm.emailAddressSent;
    vm.sendSuccess;
    vm.readSuccess;
    vm.sendRequestFinished;
    vm.readRequestFinished;
    vm.readEventsFinished;
    vm.readEventsSuccess;
    vm.emails;
    vm.events;
    
    vm.sender;

    vm.sendEmailActive=true;
    vm.readEmailActive=false;
    vm.readEventActive=false;

    // View model methods
    vm.sendMail = sendMail;
    vm.readMail = readMail;
    vm.readEvents = readEvents;
    vm.login = login;
    vm.logout = logout;
    vm.isAuthenticated = isAuthenticated;
    vm.initAuth = initAuth;

    vm.changeTab = changeTab;



    /////////////////////////////////////////
    // End of exposed properties and methods.

    function changeTab(name) {
      if (name=='send') {vm.sendEmailActive=true;vm.readEmailActive=false;vm.readEventActive=false};
      if (name=='read') {vm.readEmailActive=true; vm.sendEmailActive=false; vm.readEventActive=false;}
      if (name=='event') {vm.readEventActive=true;vm.sendEmailActive=false;vm.readEmailActive=false;}
    }

    function initAuth() {

      // Check initial connection status.
      if (localStorage.auth) {
          processAuth();
      } else {
        let auth = hello('aad').getAuthResponse();
        if (auth !== null) {
          localStorage.auth = angular.toJson(auth);
          processAuth();
        }
      }
    }

    // Auth info is saved in localStorage by now, so set the default headers and user properties.
    function processAuth() {
        let auth = angular.fromJson(localStorage.auth); 

        // Check token expiry. If the token is valid for another 5 minutes, we'll use it.       
        let expiration = new Date();
        expiration.setTime((auth.expires - 300) * 1000); 
        if (expiration > new Date()) {

          // Add the required Authorization header with bearer token.
          $http.defaults.headers.common.Authorization = 'Bearer ' + auth.access_token;
          
          // This header has been added to identify our sample in the Microsoft Graph service. If extracting this code for your project please remove.
          $http.defaults.headers.common.SampleID = 'angular-connect-rest-sample';

          if (localStorage.getItem('user') === null) {

            // Get the profile of the current user.
            GraphHelper.me().then(function(response) {
              
              // Save the user to localStorage.
              let user =response.data;
              localStorage.setItem('user', angular.toJson(user));

              vm.displayName = user.displayName;
              vm.emailAddress = user.mail || user.userPrincipalName;
              vm.sender = vm.emailAddress;
            });
          } else {
            let user = angular.fromJson(localStorage.user);
              
            vm.displayName = user.displayName;
            vm.emailAddress = user.mail || user.userPrincipalName;
            vm.sender = vm.emailAddress;
          }
       }
    }

    vm.initAuth();    

    function isAuthenticated() {
      return localStorage.getItem('user') !== null;
    }

    function login() {
      GraphHelper.login();
    }

    function logout() {
      GraphHelper.logout();
    }
    
    // Send an email on behalf of the current user.
    function sendMail() {

      // Check token expiry. If the token is valid for another 5 minutes, we'll use it.
      let auth = angular.fromJson(localStorage.auth);       
      let expiration = new Date();
      expiration.setTime((auth.expires - 300) * 1000); 
      if (expiration > new Date()) {
        
        // Build the HTTP request payload (the Message object).
        var email = {
            Subject: vm.emailSubject,
            Body: {
              ContentType: 'HTML',
              Content: vm.emailContent
            },
            ToRecipients: [
              {
                EmailAddress: {
                  Address: vm.emailAddress
                }
              }
            ]
        };

        // Save email address so it doesn't get lost with two way data binding.
        vm.emailAddressSent = vm.emailAddress;
        
        GraphHelper.sendMail(email)
          .then(function (response) {
            $log.debug('HTTP request to the Microsoft Graph API returned successfully.', response);
            response.status === 202 ? vm.sendSuccess = true : vm.sendSuccess = false;
            vm.sendRequestFinished = true;
          }, function (error) {
            $log.error('HTTP request to the Microsoft Graph API failed.');
            vm.sendSuccess = false;
            vm.sendRequestFinished = true;
          });
       } else {

         // If the token is expired, this sample just redirects the user to sign in.
         GraphHelper.login();
       }
    };
    
    // read email 
    function readMail() {

      vm.emails = null;
      // Check token expiry. If the token is valid for another 5 minutes, we'll use it.
      let auth = angular.fromJson(localStorage.auth);       
      let expiration = new Date();
      expiration.setTime((auth.expires - 300) * 1000); 
      if (expiration > new Date()) {
       
        // Save email address so it doesn't get lost with two way data binding.
        vm.emailAddressSent = vm.emailAddress;
        var sender = vm.sender;
        
        GraphHelper.readMail(sender)
          .then(function (response) {
            $log.debug('HTTP get request to the Microsoft Graph API returned successfully.', response);
            //$log.debug('First mail createtime is: ' + response.data.value[0].createdDateTime);
            vm.emails = response.data;
            response.status === 200 ? vm.readSuccess = true : vm.readSuccess = false;
            vm.readRequestFinished = true;
          }, function (error) {
            $log.error('HTTP get request to the Microsoft Graph API failed.');
            vm.readSuccess = false;
            vm.readRequestFinished = true;
          });
       } else {

         // If the token is expired, this sample just redirects the user to sign in.
         GraphHelper.login();
       }
    };


    // read calendar events 
    function readEvents() {

      vm.events = null;
      // Check token expiry. If the token is valid for another 5 minutes, we'll use it.
      let auth = angular.fromJson(localStorage.auth);       
      let expiration = new Date();
      expiration.setTime((auth.expires - 300) * 1000); 
      if (expiration > new Date()) {
       
        // Save email address so it doesn't get lost with two way data binding.
        //vm.emailAddressSent = vm.emailAddress;
        var sender = '';
        
        GraphHelper.readEvents(sender)
          .then(function (response) {
            $log.debug('HTTP get request to the Microsoft Graph API returned successfully.', response);
            //$log.debug('First mail createtime is: ' + response.data.value[0].createdDateTime);
            vm.events = response.data;
            response.status === 200 ? vm.readEventsSuccess = true : vm.readEventsSuccess = false;
            vm.readEventsFinished = true;
          }, function (error) {
            $log.error('HTTP get request to the Microsoft Graph API failed.');
            vm.readEventsSuccess = false;
            vm.readEventsFinished = true;
          });
       } else {
         // If the token is expired, this sample just redirects the user to sign in.
         GraphHelper.login();
       }
    };

    // Get the HTMl for the email to send.
    function getEmailContent() {
      return "<html><head> <meta http-equiv=\'Content-Type\' content=\'text/html; charset=us-ascii\'> <title></title> </head><body style=\'font-family:calibri\'> <p>Congratulations " + vm.displayName + ",</p> <p>This is a message from the Microsoft Graph Connect sample. You are well on your way to incorporating Microsoft Graph endpoints in your apps. </p> <h3>What&#8217;s next?</h3><ul><li>Check out <a href='https://graph.microsoft.io' target='_blank'>graph.microsoft.io</a> to start building Microsoft Graph apps today with all the latest tools, templates, and guidance to get started quickly.</li><li>Use the <a href='https://graph.microsoft.io/graph-explorer' target='_blank'>Graph explorer</a> to explore the rest of the APIs and start your testing.</li><li>Browse other <a href='https://github.com/microsoftgraph/' target='_blank'>samples on GitHub</a> to see more of the APIs in action.</li></ul> <h3>Give us feedback</h3> <ul><li>If you have any trouble running this sample, please <a href='https://github.com/microsoftgraph/angular-connect-rest-sample/issues' target='_blank'>log an issue</a>.</li><li>For general questions about the Microsoft Graph API, post to <a href='https://stackoverflow.com/questions/tagged/microsoftgraph?sort=newest' target='blank'>Stack Overflow</a>. Make sure that your questions or comments are tagged with [microsoftgraph].</li></ul><p>Thanks and happy coding!<br>Your Microsoft Graph samples development team</p> <div style=\'text-align:center; font-family:calibri\'> <table style=\'width:100%; font-family:calibri\'> <tbody> <tr> <td><a href=\'https://github.com/microsoftgraph/angular-connect-rest-sample\'>See on GitHub</a> </td> <td><a href=\'https://officespdev.uservoice.com/\'>Suggest on UserVoice</a> </td> <td><a href=\'https://twitter.com/share?text=I%20just%20started%20developing%20%23Angular%20apps%20using%20the%20%23MicrosoftGraph%20Connect%20sample!%20&url=https://github.com/microsoftgraph/angular-connect-rest-sample\'>Share on Twitter</a> </td> </tr> </tbody> </table> </div>  </body> </html>";
    };
    
  };
})();