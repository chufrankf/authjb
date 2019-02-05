# Auth JB

The goal of Auth JB is to create a Single-Sign on experience for my applications. More notes will be put in here to detail how to start a new application that connects with Auth JB. After those details are layed out, I hope to create an npm package and cdn that will make these tasks simpler.


# Installing npm modules

> npm install --save-dev babel-cli babel-preset-env babel-register nodemon

> npm install --save bcryptjs body-parser cors dotenv express express-handlebars jsonwebtoken mysql2 passport passport-local sequelize

# Setting Up MySQL

> CREATE USER 'authjs'@'localhost' IDENTIFIED BY 'password';
> GRANT ALL PRIVILEGES ON *.* TO 'authjs'@'localhost';
> ALTER USER 'authjs'@'localhost' IDENTIFIED WITH mysql_native_password by 'PASSWORD'