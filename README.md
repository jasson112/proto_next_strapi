# proto

for install node_modules run:

```console
lerna bootstrap --hoist
```

for run you can use
```console
yarn dev
npm run dev
```

pm2 commands

pm2 start yarn -i max --name 'proto-api' -- workspace proto-api run dev