# movies-explorer-frontend

Фронтенд для дипломного проекта на курсах Веб-разработчик от Яндекс Практикума.
Полноценно работает. 

макет в figma: https://disk.yandex.ru/d/i5wmFybJMG_GDQ

Адрес сайта: https://badass.nomoredomains.club/

Как запустить на сервере/локальной машине в docker:

    docker build -t react-app .  
    docker run -dp 3000:3000 --name react-front react-app

Как запустить на сервере/локальной машине без docker:

    install npm
    clone distro
    npm ci
    npm run start
