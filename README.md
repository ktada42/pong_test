フォルダ構成について
nestjs-blogフォルダ内の
nestjs-blog-frontendフォルダがclient。
serverフォルダがbackendです。
nestjs-blog-apiは過去にnest.jsでbackendを実装した時の名残で現在は使っていません。



frontendの処理は
nestjs-blog/nestjs-blog-frontend/src/components/pongSocket.tsx

backendの処理は
nestjs-blog/server/index.js
に書かれています。

pongの起動法

nestjs-blog/serverフォルダで
npm start

nestjs-blog/nestjs-blog-frontendフォルダ(clientを担う)内で
sudo npm run dev

その後http://localhost:3000/pongにアクセス



