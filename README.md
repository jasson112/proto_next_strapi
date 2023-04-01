
# Project Proto 👹

Dev repo baked in nextjs - strapi - Mysql

## Notes 🤖

- I used Mysql because Strapi v4 not support MongoDB again, wating for an update

# Requirements

- Node v16
- Yarn
- Docker Desktop
- Nice to have linux or unix 🙏 (also works on windows but if you use windows i recomend to use WSL 2 with ubuntu)

# Installation and configuration

First create the following `.env` files

- `packages/api/.env`
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=/c9AsFOTqJC+MrFqIB+w9g==,X1PZz7SuHY5aThzdaWOiRQ==,sC2AF2ytD1yLqIok5n/Sww==,C2Sg3CAxbF7zU3Ip92lqpg==
API_TOKEN_SALT=+mH+kb6gns7CCX514qXu0Q==
ADMIN_JWT_SECRET=ttagB2I0ru0537fl7eaajQ==
TRANSFER_TOKEN_SALT=30XQC5QtWUreHjUXwAFDOQ==JWT_SECRET=g91bz+MjSgicXbGsRcHiAA==
JWT_SECRET=ihAvVPR57QGUVRBPDPUr3Q==

```
- `packages/front/.env`

```
CMS_URL=http://localhost:1337
SITE_KEY2=124
SITE_KEY=124
```

Then run `yarn` in order to install all the nodejs dependencies, once you have all installed correctly please be sure that you have docker up and running then you can run `yarn dev` i used lerna in order to manage my monorepo

If you need to run a command over an specific repo you can run the following

```
yarn dev --scope=<my-scope>
```

please replace with the corresponding repo

- `proto-db` - Is the repo that manage the database
- `proto-api` - Strapi
- `proto-front` - Nextjs application connected with the proto api

Once Strapi opens the new tab with the first isntallation please follow the instructions and create the user, please dont forget the user

over content manager you can add the content to the different pages like home, etc