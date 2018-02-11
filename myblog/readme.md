# Info
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

### How to run

1. Open cmd then type ```composer install```
2. Modify ```Vagrantfile``` if necessary for avoiding port or address conflict, then type ```vagrant up```, wait for installation to end then type ```vagrant ssh```
3. In vagrant enviroment type ```cd /etc```, then ```sudo nano hosts```
4. copy into file: ```192.168.73.15 blog.test``` (if you are a windows user you might need to copy this to your windows HOSTS file)
5. upload db  ``` mysql -u root -p123456 blog < /var/www/blog/data/mysql.sql```
6. in your local enviroment navigate to the /public folder and type ```npm install``` if you want to modify css or javascript files via webpack

## What to do

* Access the website by url ```http://blog.test```
* Admin area is in the ```/admin``` route aka ```http://blog.test/admin```
* Username and password are: ```admin@mysite.com```, with password ```123456```
* Write, delete, edit posts

### Author note
Since this website was serving as personal practice with some possibility that it will go online, many modifications are not implemented, and some of them need further improvement.