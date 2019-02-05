Simple web application for managing users.

For using you need:
- change db property in hikaricp.properties
- execute in console npm install && npm run test-build-webpack
- execute in console mvn clean install
- set up Tomcat and run

Functionality:
- creating user
- editing user
- deleting user


Frontend:
- react+redux
- bootstrap

Backend:
- Java
DB
- mysql

Assembled with Babel and webpack

For use https need: 
- execute in console createSelfSigned.bat
- add keystore.jks in ../users/{your_user}/
- add to server.xml(in Tomcat directory) data from customServer.xml