# MERNDevEnv2
関数コンポーネントとHooksを用いたReact処理
https://tyotto-good.com/blog/reaseons-to-use-function-component
https://ja.reactjs.org/docs/hooks-effect.html

```
useEffect は毎回のレンダー後に呼ばれるのか？ その通りです！ デフォルトでは、副作用関数は **初回のレンダー時および毎回の更新時に呼び出されます** 。あとでカスタマイズする方法について説明します。「マウント」と「更新」という観点で考えるのではなく、「レンダーの後」に副作用は起こる、というように考える方が簡単かもしれません。React は、副作用が実行される時点では DOM が正しく更新され終わっていることを保証します。
```



MERNスタック（MongoDB, Express, React, Node.js）開発環境の最小構成です。  
状態管理にReduxを用いています。


## 使い方
1. `npm ci`でパッケージをインストール。
2. npm scriptsの`npm run dev`で開発環境が走る。
3. フロントエンドサーバーとバックエンドサーバーの両方にアクセスして、表示されるか確認。
    - http://localhost:8080/  
    ↑ フロントエンドサーバー（`webpack-dev-server`）フロントエンド開発時に利用。  
    - http://localhost:3000/  
    ↑ バックエンドサーバー（Expressサーバー）バックエンドAPI利用時に使用。  
    - http://localhost:8080/api/  
    ↑ `server/server.js`でルーティングしているページ。  
    `{"message":"こんにちは、世界"}`が表示されているか  
7. DBを起動する。DBフォルダを任意の場所に作成する。
    - ターミナルをもう一つ開き、次のコマンドを起動する。
    - `sudo mongod --dbpath /Users/morinagakensuke/Documents/ProgrammingTest/project/__dbfolder/任意で作成したフォルダ名`
8. DBモデルはすでに`server/models/itemModel.js`に作成してある。
    - DBモデル参考：https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#model%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BD%9C%E6%88%90
9. POSTしてデータが記録されるか確認する。  
    - http://localhost:8080/  にアクセスして `Hello, World`を入力し、追加ボタンを押す  
    - 追加したデータが表示されていればOK  
    - ターミナルをもう一つ開き、curlで下記のコマンドを実行する。  
    ※curlコマンドでもサーバーにデータを送ることができる。覚えておくと役立つ。  
    例：`curl -X POST -H "Content-Type: application/json" -d '{"name":"名前のデータです。", "category":"カテゴリーのデータです。", "price":"1234567890"}' localhost:3000/api/item/`  
    - http://localhost:8080/api/item/  
    ↑ バックエンドからフロントエンドへプロクシを繋いでCORS問題が解消されているか確認。  
    `[{"_id":"6089a22dde8bb67208432f77","comment":"Hello, World","__v":0}]`と表示されていればOK  
    - `curl http://localhost:8080/api/item | jq .`を実行して`Hello, World`を含むJSONオブジェクトが表示されていればOK  
11. 完了。※あとは、React.jsやJavaScriptでSPAを構築する作業を行う。


## 各フォルダとファイルの説明
1. `/docs`  
    本番公開用。`npm run build`で`/docs`用にファイルを生成する。
2. `/server`  
    バックエンド部分を担当する。Expressサーバー。次の業務を担当する。  
    以下の内容は`server.js`に集約される事になる  
    - MongoDBへの接続設定。  
        - `/server/models/itemModels.js`とMongooseで連携。  
    - ルーティング。  
        - `/server/routes/`内のファイルがルーターとなる。  
    - バックエンドExpressサーバー。  
        - `server.js`が担う。ポートは3000番。  
    <br>

    1. `/server/models`  
        - DB（MySQLなど）のテーブルの作成に相当する。  
        `module exports`で全体で扱えるようにして`/server/routes/`内のファイル（例として`item.js`）から`module exports`されたモデルを利用してMongoDBへの読み書きを行えるように準備する。
    2. `/server/routes`  
        - ルーティングによるURL生成とCRUD部分（`post（CREATE）`や`get（READ）`, `put（UPDATE）`, `delete（DELETE）`）を担う。ルーター。  
    3. `/server/server.js`  
        Expressサーバー設定とMongoDB設定が記述してある。  
3. `/src`  
    フロントエンド部分を担当する。HTMLやSass、React、Redux（状態管理）はここで行う。
    1. `/src/html`  
        webpackの「`html-webpack-plugin`」によって`/docs`にファイルが生成される  
        `/docs/index.html`などを編集したい場合はここから変更を行う。  
    2. `/src/js`  
        React、Reduxを担当する。  
        fetchなどでバックエンドからDB（API？）に読み書きを行う。  
        1. `/src/js/components`  
            各コンポーネントを記述する。  
            例として、よくある「フォーム入力」「データ表示」の2種類のコンポーネントを作成している。  
            ※コンポーネントは最終的に`/src/js/App.js`に集約する。
        2. `/src/js/redux`  
            Reduxに関する項目を記述している。  
            アクションクリエイターは`actions.js`  
            ストア（ステート、レデューサー）は`stores.js`  
        3. `/src/js/App.js`  
            `/src/js/components`で記述したコンポーネントをまとめる  
            まとめたコンポーネントは`index.js`にexportする
        4. `/src/js/index.js`  
            レンダリングを行う。  
            レンダリングを行う際に、Reduxのプロバイダーを用いてストアをコンポーネントに送り、コンポーネントのpropsとして使えるようにする。  


## Componentsについて
CSS in JSを採用したほうがいいかもしれない。  
Sassに書くとJSでのコンポーネント採用した意味が薄れると思う。  
コンポーネントを切り分けるのであれば、CSS in JSが妥当だと考える。  


## Reduxについて
### Reduxの流れ
イベントが発生する（入力など）  
↓  
イベントの処理中にdispatchをReact内でアクションクリエイターを引数にして実行  
↓  
アクションクリエイターに値が渡されて、アクションのオブジェクトを返す  
↓  
アクションからレデューサーが呼び出され、ステートと先ほどのアクションオブエジェクトを引数にして実行し、ステートを変更する。  
↓  
ステートが変更されたことにより、コンポーネントが再描画される。  


### Reduxに必要なもの
https://docs.google.com/spreadsheets/d/1xPQ7nLVP4uDpM4nJe9GhTpDhra0xzWnK42NK52oi51o/edit#gid=274878124&range=A59  
- ストア
    - レデューサー
    - ステート
- プロバイダー
- アクションクリエイター
- ディスパッチ（React内でアクションクリエイターを引数にして実行）

参考：  
https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7  


## 更新時に気をつけたいこと
- 差分のみを更新する
Reactは、ステートを利用して、ステートに変更があれば、その差分のみを再描画することができる。 


## プロジェクト別


## 参考元
- シンプルCRUDアプリ
    - https://qiita.com/muijp/items/573247b12ff0bc4e5d3c

- パッケージインストール〜環境構築
    - https://qiita.com/ohs30359-nobuhara/items/bdc06b2db1bef7af2439  〜lintの導入まで
    - https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#api%E3%82%92%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%A7%E5%88%86%E3%81%91%E3%81%A6%E7%B6%BA%E9%BA%97%E3%81%AB%E3%81%99%E3%82%8B  ページ内リンク先以降

- 導入方法について（自分のスプレッドシート）
    - https://docs.google.com/spreadsheets/d/1xPQ7nLVP4uDpM4nJe9GhTpDhra0xzWnK42NK52oi51o/edit#gid=1511416112

- その他
    - https://qiita.com/kazmaw/items/a2def8978127ffb11f92
