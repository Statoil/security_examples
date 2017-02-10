#Security Examples
First sample application.

Sample is taken from Visual Studio template and modified to better work with owr environment.
Application is written in C# using .Net Core 1.1

This application demonstrate the step needed to get authentication working from an web application using 
Azure Active Directory(AAD).

#Prerequisite
Computer with Windows, Linux or macOS.
.Net Core 1.1 from https://www.microsoft.com/net/core#macos
A working Git client(or just download the zip file)
Access to an AAD tenantId
Access to create a new "App registration" in AAD

#Steps to get the application installed and running.
##Azure registration
Open the Azure Portal (https://portal.azure.com/) and select Azure Active Directory on the left side.
Then select App registations and push the Add button.
Fill in Application name.
Select Web app/API
Fill in http://localhost:5050/signin-oidc as Sign-in URL
Push create button.

Select the new app registration and take a note of the Application Id.
This is the client id enviroment variable.

Select Required permissions for the new app registration.
Verify that there is a permissions selected to use AAD and Sign in and read user profile.

Create a client secret by create a new key. Enter a name select a duration and push save this key will only be 
showed once so take a note. This value is the client secret environment variable.

We now need to find the tenant id, so we push the AAD button on the left side of the screen, then properties
copy the value from then field Directory ID. This is the tenant id environment variable.

##Download the sample application from github
Use your favorite git client or just download a zip file from github.com.

##Register the needed environment variables.
On macOS and Linux you can use:
export ASPNETCORE_CLIENTID="Value from above step"
export ASPNETCORE_TENANTID="Value from above step"
export ASPNETCORE_CLIENTSECRET="Value from above step

On windows use:
set ASPNETCORE_CLIENTID="Value from above step"
set ASPNETCORE_TENANTID="Value from above step"
set ASPNETCORE_CLIENTSECRET="Value from above step

##Build and run the samle application
Open a terminal/command prompt and navigate to the directory where the application is.

Register the needed environment variables using the above step.
Restore needed .Net packages using "dotnet restore"
Build using "dotnet build"
Run with "dotnet run"

Open a webbrowser and navigate to https://localhost:5050.
You will be prompted to allow the application to use your information after accepting this you 
will be auhtenticated and loged in to the application.

If all works well you can try to extend the application to support claims based authorization. 

