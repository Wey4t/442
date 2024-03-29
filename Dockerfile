FROM php:8.0-apache
WORKDIR /var/www/html

ADD api api
COPY apache-selfsigned.crt /etc/ssl/certs/apache-selfsigned.crt
COPY apache-selfsigned.key /etc/ssl/private/apache-selfsigned.key
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf 
COPY .htaccess .
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt update && a2enmod ssl && service apache2 restart
RUN apt install -y git
RUN service apache2 restart && chmod 755 /var/www/html && mkdir /var/www/html/uploads && chown www-data /var/www/html/uploads && a2enmod rewrite && service apache2 restart

EXPOSE 443