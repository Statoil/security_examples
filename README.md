#Security Examples
Software Development focus on various examples, theory related to authentication, authorisation,  certificates etc 

***This repository will contain no internal information.*** All examples etc. will be described and demoed from a principal perspective.


#Scenarios
Scenarios that we should explain and demonstrate with example code. 

###Principles
* Certificates
* Single Sign-On (SSO)
* SAML, Kerberos, OAuth, JWT  (Token based)
* Human to machine, Machine to machine, Human to machine to machine (impersonation)
* PGP (GnuPG)

###Authentication
* Authenticate towards Azure AD
* Authenticate towards local AD

###Authorisation
* Authorize with Azure AD
* Authorize with local AD

###Communication
* HTTPS
* TLS

###Use cases
* Logged in to statoil pc in office. When navigating to a statoil web application, application should single sign on based upon users login, using oauth/jwt, send the token on to application server. And added bonus if the token can be used/forwarded to a database requiring kerberos ticket. Application server should be able to read token and authorize access, i.e the token should contain the claims from AD.
