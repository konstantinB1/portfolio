#Info
Simple blog website made with Zend Framework 3 MVC. It was written in PHP PSR standards.
This is the first project that i was mentored to learn advanced workflow used in a professional enviroment.
For this website i learned to use Git, Vagrant - for team code sharing compability, Composer - for PHP module dependencies via Packagist, and on the front side - Webpack 3 for CSS, Javascrpt bundling and task running.
Zend Framework 3 was implemented from Zend Skeleton Application via github.
Javascript part was heavily based around jQuery Ajax since all the data was fetched from API based components.
For styling Sass preprocessor was used, with some custom made mixing library from past projects.

### Prerequisites

* Composer installed on your system (or run in localy: see proper documentation)
* Vagrant installed on your system (with Oracle VM)
* Node / npm installed on your system

### How to install

1. composer install
2. cd /public
3. npm install

### How to run

1. vagrant up
2. vagrant ssh
3. cd /etc
4. sudo nano hosts
5. copy into file: 192.168.73.15 blog.test (if you are a windows user you might need to copy it to your windows HOSTS file)
6. mysql -u root -p123456 blog < etc/www/blog/data/mysql-dump.sql
7. u

## What to do

* Access the website by url http://blog.test
* Admin area is in the /admin route aka http://blog.test/admin
* Username and password are: admin@example.com, with password 123456
* Play around with posts a little bit

### Files Note
*bootstrapper.sh - vagrant provisioning file

### Author note
Since this website was serving as personal practice with some possibility that it will go online, many modifications are not implemented, such as comments control, admin modification etc.