# MERNDevEnv2
MERNスタック（MongoDB, Express, React, Node.js）開発環境の最小構成です。  
状態管理にReduxを用いています。


## 関数コンポーネントとHooksを用いたReact処理  
- https://tyotto-good.com/blog/reaseons-to-use-function-component  
Reactでクラスコンポーネントより関数コンポーネントを使うべき理由5選  
- https://ja.reactjs.org/docs/hooks-intro.html
- https://ja.reactjs.org/docs/hooks-effect.html


## 関数コンポーネントとHooksについて  
https://ja.reactjs.org/docs/hooks-overview.html  
フックとは、関数コンポーネントに state やライフサイクルといった React の機能を “接続する (hook into)” ための関数です。  
フックの接頭辞には「use」が使われる。  
おもに次の2つ（+1+α）のフックがある。  
1. ステートフックの「useState()」  
2. 副作用フックの「useEffect()」  
3. カスタムフック（+1, 自分で作る独自のフック）
4. useReducer()

### 1. ステートフックの「useState()」
速習：https://ja.reactjs.org/docs/hooks-overview.html#state-hook  
詳細：https://ja.reactjs.org/docs/hooks-state.html （多分速習でほとんどわかる）  
`const [count, setCount] = useState(0);`の  
- `count`はstateのプロパティ。  
- `setCount`はstateのプロパティを更新する関数。  
useState は現在の state の値と、それを更新するための関数とを**ペアにして**返します。  
この関数（`setCount()`）はイベントハンドラやその他の場所から呼び出すことができます。  
`useState(0)`の「0」は state (上の例の場合だと`count`)の初期値です。引数として渡された state の初期値は最初のレンダー時にのみ使用されます。  
`useState()`は複数呼び出すことができます。  

例：  
```
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

#### 個人的な所感  
classコンポーネントのthis.stateやそれ以降this.stateに与える処理を一括で定義など行う感じ。  

### 2. 副作用フックの「useEffect()」  
速習：https://ja.reactjs.org/docs/hooks-overview.html#effect-hook  
詳細：https://ja.reactjs.org/docs/hooks-effect.html  
`componentDidMount()`といったライフサイクルを関数コンポーネントで利用できるようにした感じ。  

> React のライフサイクルに馴染みがある場合は、useEffect フックを componentDidMount と componentDidUpdate とcomponentWillUnmount がまとまったものだと考えることができます。  

↓ ちょっと副作用の説明がわからないから後でよく理解しておく。  
> これまでに React コンポーネントの内部から、外部データの取得や購読 (subscription)、あるいは手動での DOM 更新を行ったことがおありでしょう。これらの操作は他のコンポーネントに影響することがあり、またレンダーの最中に実行することができないので、われわれはこのような操作を “副作用 (side-effects)“、あるいは省略して “作用 (effects)” と呼んでいます。

**useEffect()は毎回レンダリング後に呼ばれるようだ。**  

> Q:useEffect は毎回のレンダー後に呼ばれるのか？ 
> A:その通りです！ デフォルトでは、副作用関数は **初回のレンダー時および毎回の更新時に呼び出されます** 。あとでカスタマイズする方法について説明します。「マウント」と「更新」という観点で考えるのではなく、「レンダーの後」に副作用は起こる、というように考える方が簡単かもしれません。React は、副作用が実行される時点では DOM が正しく更新され終わっていることを保証します。

`useEffect()`も複数呼び出すことができます。  

`useEffect()`はクロージャを活用している。  
この部分の詳細はよくわかっていないので、また後で読む。  

### 3. 独自のフック：カスタムフック
速習：https://ja.reactjs.org/docs/hooks-overview.html#building-your-own-hooks  
詳細：https://ja.reactjs.org/docs/hooks-custom.html  
**カスタムフックを作る際には慣習的に`use`という接頭辞をつける**  
カスタムフックと言っているが、要は **「普通の関数と同じ」** で、引数を受け取って処理して他の関数などに渡したい値をreturnすればいいということになる。  

例：  
```
//カスタムフック
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);
    〜様々な処理〜
    return isOnline;
}

function FriendStatus(props) {
    //引数propsは何？←おそらくReactコンポーネント<App 〇〇="aaa">の「〇〇="aaa"」のこと。
    //今回は<FriendStatus friend="aaa">？
    const isOnline = useFriendStatus(props.friend.id); //カスタムフックの呼びだし
    return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) { //この引数propsは何？
    const isOnline = useFriendStatus(props.friend.id); //カスタムフックの呼びだし
    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}

> ※React のコンポーネントと違い、カスタムフックは特定のシグネチャを持つ必要はありません。
何を引数として受け取り、そして（必要なら）何を返すのか、といったことは自分で決めることができます。
別の言い方をすると、 **普通の関数と同じだ** ということです。
```

## 4. useReducer()
userState()では、  
- ステートの値（state）	
- ステートの値を変更する関数（setState()）
の2つが渡された。  
onChangeなどで、「onChange={setState{state + 1)}」のようにすればstateの値を変更することができた。  
  
しかしstateの数が増えるにつれ、冗長なコードとなっていく。  
そこで **useReducer()** を使う。  
  
useReducer()では、  
- ステートの値（state）
- ディスパッチ関数（dispatch()）：レデューサーに処理を分岐させたり値を渡すアクションを送る関数。
の2つが渡される。  

useReducer()の引数は、  
- 第一引数：実際に使うレデューサー関数が入る
- 第二引数：ステートの値（state）
が入る。  
  
あとはReduxと同じで、レデューサーがステートの値を新しくする.  
  
## フックのルール
速習：https://ja.reactjs.org/docs/hooks-overview.html#rules-of-hooks  
詳細：https://ja.reactjs.org/docs/hooks-rules.html  
1. 関数のトップレベルのみで呼び出してください。ループや条件分岐やネストした関数の中でフックを呼び出さないでください。
2. 関数コンポーネントの内部のみで呼び出してください。通常の JavaScript 関数内では呼び出さないでください（ただしフックを呼び出していい場所がもう 1 カ所だけあります — **自分のカスタムフックの中です**）。

## useEffect()でfetchするとループが発生。
https://qiita.com/ossan-engineer/items/c3853315f59dc20bc9dc
> アプリケーションを実行すると厄介なループに陥るでしょう。副作用フックはコンポーネントのマウント時だけでなく、更新時にも実行されます。データを取得するたびに state を設定しているため、コンポーネントが更新されて副作用が再び実行されるからです。データ取得を何度も繰り返してしまいます。これはバグなので回避する必要があります。コンポーネントのマウント時にだけデータを取得するようにしましょう。 **副作用フックの第2引数に空配列（[]）を渡す** ことで、コンポーネント更新時ではなくマウント時にだけ有効化することができます。

## 使い方
1. `npm ci`でパッケージをインストール。
2. DBを起動する。DBフォルダを`/Users/ユーザーの名前〇〇/Documents/ProgrammingTest/project/__dbfolder/`内の任意の場所に作成する。
    - ターミナルをもう一つ開き、次のコマンドを起動する。
    - `sudo mongod --dbpath /Users/ユーザーの名前〇〇/Documents/ProgrammingTest/project/__dbfolder/任意で作成したフォルダ名`
3. npm scriptsの`npm run dev`で開発環境が走る。
4. フロントエンドサーバーとバックエンドサーバーの両方にアクセスして、表示されるか確認。
    - http://localhost:8080/  
    ↑ フロントエンドサーバー（`webpack-dev-server`）フロントエンド開発時に利用。  
    - http://localhost:3000/  
    ↑ バックエンドサーバー（Expressサーバー）バックエンドAPI利用時に使用。  
    - http://localhost:8080/api/  
    ↑ `server/server.js`でルーティングしているページ。  
    `{"message":"こんにちは、世界"}`が表示されているか  
5. DBモデルはすでに`server/models/itemModel.js`に作成してある。
    - DBモデル参考：https://qiita.com/ngmr_mo/items/73cc7160d002a4989416#model%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BD%9C%E6%88%90
6. POSTしてデータが記録されるか確認する。  
    - http://localhost:8080/  にアクセスして `Hello, World`を入力し、追加ボタンを押す  
    - 追加したデータが表示されていればOK  
    ※curlコマンドでもサーバーにデータを送ることができる。覚えておくと役立つ。  
    例：`curl -X POST -H "Content-Type: application/json" -d '{"comment":"コメントのデータです。"}' localhost:3000/api/item/`  
    - http://localhost:8080/api/item/  
    ↑ バックエンドからフロントエンドへプロクシを繋いでCORS問題が解消されているか確認。  
    `[{"_id":"〇〇","comment":"Hello, World","__v":0}]`と表示されていればOK  
    - `curl http://localhost:8080/api/item | jq .`を実行して`Hello, World`を含むJSONオブジェクトが表示されていればOK。（"_id"部分は適当な数字でいい）  
7. 完了。  
    ※あとは、React.jsやJavaScriptでSPAを構築する作業を行う。  


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


## 技術スタック
- React
- Redux
- MongoDB
- Expressサーバー
- webpack-dev-server（開発時。ProxyでExpressサーバーと繋ぐ。webpack.config.dev.js）
- Babel


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
