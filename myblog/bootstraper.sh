#!/usr/bin/env bash

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Vagrant provisioning....
────────────────────────────────────────────────────────────────────────────────────────────────────────"

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Sit back, this may take a while: installing PHP7, update and install all tools
────────────────────────────────────────────────────────────────────────────────────────────────────────"
sudo add-apt-repository ppa:ondrej/php      >> /dev/null 2>&1
sudo apt-get update                         >> /dev/null 2>&1

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Installing MySql 5.6 - DB name: blog | user:root | password:12345
────────────────────────────────────────────────────────────────────────────────────────────────────────"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password 12345"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 12345"

sudo apt-get install -y mysql-common mysql-server-5.6 mysql-client-5.6  >> /dev/null 2>&1
mysql -u root -p12345  -e "CREATE DATABASE blog;"                       >> /dev/null 2>&1

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Install PHP 7.0 and rest packages
────────────────────────────────────────────────────────────────────────────────────────────────────────"
sudo apt-get install -y zip unzip   >> /dev/null 2>&1
sudo apt-get install -y nginx       >> /dev/null 2>&1
sudo apt-get install -y curl git    >> /dev/null 2>&1
sudo apt-get install -y php7.0-zip php7.0-fpm php7.0-mcrypt php7.0-curl php7.0-cli php7.0-mysql php7.0-gd php7.0-intl php7.0-xsl php7.0-mbstring >> /dev/null 2>&1
sudo apt-get install -y php-xdebug  >> /dev/null 2>&1

if [ ! -f /var/www/blog/config/autoload/local.php ]; then
    cp /var/www/blog/config/autoload/local.php.dist /var/www/blog/config/autoload/local.php
fi


echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Install and run composer
────────────────────────────────────────────────────────────────────────────────────────────────────────"
sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024   >> /dev/null 2>&1
sudo /sbin/mkswap /var/swap.1                               >> /dev/null 2>&1
sudo /sbin/swapon /var/swap.1                               >> /dev/null 2>&1

cd /tmp/
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"   >> /dev/null 2>&1
php composer-setup.php                                                      >> /dev/null 2>&1
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
cd /var/www/blog/

if [ -d "vendor" ]; then
 composer update      >> /dev/null 2>&1
else
 composer install     >> /dev/null 2>&1
fi

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Import MySQL dump
────────────────────────────────────────────────────────────────────────────────────────────────────────"
mysql -u root -p12345 blog < /var/www/blog/data/mysqldump.sql


# During development log every query in /tmp/mysql.log .. thanks me later
echo "
general_log = on
general_log_file=/tmp/mysql.log
" >> /etc/mysql/my.cnf

# mysql does not need to use that much ram for dev environment
sudo sed -i '/\[mysqld\]/a table_definition_cache=200' /etc/mysql/my.cnf    >> /dev/null 2>&1
sudo service mysql restart                                                  >> /dev/null 2>&1

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Setup Nginx vhost and change config
────────────────────────────────────────────────────────────────────────────────────────────────────────"
sudo php -r '$f = file_get_contents("/etc/nginx/nginx.conf"); $new_f = str_replace("sendfile on;", "sendfile off; client_max_body_size 12M;", $f);  file_put_contents("/etc/nginx/nginx.conf", $new_f);'
sudo touch /etc/nginx/sites-available/blog.test

sudo bash -c "echo 'server {
    listen 80;
    listen [::]:80;
    root /var/www/blog/public;
    index index.php index.html index.htm;
    server_name blog.test;
    location / {
        root /var/www/blog/public;
        index  index.html index.htm index.php;
        try_files \$uri \$uri/ /index.php?\$args;
    }
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
    location ~ \.php$ {
        try_files \$uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }
}' > /etc/nginx/sites-available/blog.test"

sudo cp /etc/nginx/sites-available/blog.test /etc/nginx/sites-enabled/
sudo service nginx restart          >> /dev/null 2>&1
sudo service php7.0-fpm restart     >> /dev/null 2>&1

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   change php.ini config
────────────────────────────────────────────────────────────────────────────────────────────────────────"
echo "
error_reporting = E_ALL
display_errors = On
log_errors = On
html_errors = On
error_log = /tmp/php_errors.log
" >> /etc/php/7.0/fpm/php.ini
sudo service nginx restart          >> /dev/null 2>&1
sudo service php7.0-fpm restart     >> /dev/null 2>&1

echo "
────────────────────────────────────────────────────────────────────────────────────────────────────────
   Almost done,
   In your /etc/hosts file add line
   192.168.73.15 blog.test
────────────────────────────────────────────────────────────────────────────────────────────────────────"
