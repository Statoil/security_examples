# Microsoft Graph Connect Sample for Angular

## Introduction
This code is based on the Angular sample as provided from Microsoft at https://developer.microsoft.com/en-us/graph/quick-start

The original code shows how to send an email through the MS Graph API. The code in this repository is extended to be able to read emails and events as well.

In order to run the code - you will have to create an app registration at https://apps.dev.microsoft.com/#/appList. 
Note that an app registration is automatically created if you follow the wizard at https://developer.microsoft.com/en-us/graph/quick-start. 
The application id needs to be inserted into the clientId variable in the config.js file.


# The following part is the original README content as provided from Microsoft

## Table of contents

* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Register the application](#register-the-application)
* [Build and run the sample](#build-and-run-the-sample)
* [Code of note](#code-of-note)
* [Questions and comments](#questions-and-comments)
* [Contributing](#contributing)
* [Additional resources](#additional-resources)

## Introduction

This sample shows how to connect an Angular app to a Microsoft work or school (Azure Active Directory) or personal (Microsoft) account  using the Microsoft Graph API to send an email. In addition, the sample uses the Office Fabric UI for styling and formatting the user experience.

![Microsoft Graph Connect sample screenshot](./README assets/screenshot.png)

## Prerequisites

To use the Microsoft Graph Connect sample for Angular, you need the following:
* [Node.js](https://nodejs.org/). Node is required to run the sample on a development server and to install dependencies. 

* [Bower](https://bower.io). Bower is required to install front-end dependencies.

* Either a [Microsoft account](https://www.outlook.com) or [Office 365 for business account](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment#bk_Office365Account)

## Register the application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**. 
	
   The registration page displays, listing the properties of your app.

4. Copy the Application Id. This is the unique identifier for your app. 

5. Under **Platforms**, choose **Add Platform**.

6. Choose **Web**.

7. Make sure the **Allow Implicit Flow** check box is selected, and enter *http://localhost:8080/login* as the Redirect URI. 

8. Choose **Save**.


## Build and run the sample

1. Download or clone the Microsoft Graph Connect Sample for Angular.

2. Using your favorite IDE, open **config.js** in *public/scripts*.

3. Replace the **clientId** placeholder value with the application ID of your registered Azure application.

4. In a command prompt, run the following command in the root directory of the starter project. This installs project dependencies and the [Hello.js](http://adodson.com/hello.js/) client-side authententication library.

  ```
npm install
bower install hello
  ```
  
5. Run `npm start` to start the development server.

6. Navigate to `http://localhost:8080` in your web browser.

7. Choose the **Connect** button.

8. Sign in with your personal or work or school account and grant the requested permissions.

9. Optionally edit the recipient's email address, and then choose the **Send mail** button. When the mail is sent, a Success message is displayed below the button.

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Questions and comments

We'd love to get your feedback about this sample. You can send your questions and suggestions in the [Issues](https://github.com/microsoftgraph/angular-connect-rest-sample/issues) section of this repository.

Questions about Microsoft Graph development in general should be posted to [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Make sure that your questions or comments are tagged with [microsoftgraph].
  
## Additional resources

- [Other Microsoft Graph Connect samples](https://github.com/MicrosoftGraph?utf8=%E2%9C%93&query=-Connect)
- [Microsoft Graph](http://graph.microsoft.io)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.





