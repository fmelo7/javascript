x-app is a prototype virtual store app
======================================

- Spring Boot
- Spring Security
- Thymeleaf
- Angular Material
- Npm
- Bower
- Grunt


Prerequisites
-------------

- JDK 8
- Maven
- Nodejs
- Bower
- Grunt 


Building the project
--------------------

Clone the repository:

> git clone https://github.com/fmelo7/x-app

Navigate to the newly created folder:

> cd x-app

Run npm to install development dependencies

> npm install

> npm install -g bower

> npm install -g grunt-cli

Run bower to install modules dependencies

> bower install

Run mvn to install development dependencies

> mvn install

Run grunt to copy modules dependencies

> grunt

Run the project with:

> ./mvnw clean spring-boot:run

To package the project:

> ./mvnw clean package


References:
-----------

- Spring Boot Docs
- Spring Security Docs
- Thymeleaf Docs
- Angular Material