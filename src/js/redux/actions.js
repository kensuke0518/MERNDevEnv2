// 文字列定数
export const CHANGE_COMMENT = 'CHANGE_COMMENT'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA_ACCESS = 'RECEIVE_DATA_ACCESS'
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED'

/**
 * アクションクリエイター
 *
 * - ユーザーのイベントによってアクションを作成する。
 * - React（コンポーネント）からdispatchで呼び出す。
 * - returnされる値はレデューサーの引数actionとなる。
 */
//CREATE（コメント追加）
export const changeCommentAction = comment => ({ //フォームからデータをバックエンドへ送信するアクション
    type: CHANGE_COMMENT,
    comment,
})
export const initializeFormAction = () => ({
    type: INITIALIZE_FORM,
})

//READ,UPDATE,DELETE（コメント表示）
export const requestDataAction = () => ({ //データ取得中とするアクション
    type: REQUEST_DATA,
});
export const receiveDataSuccessAction = characterArray => ({ //データ取得成功後のアクション
    type: RECEIVE_DATA_ACCESS,
    characterArray,
});
export const receiveDataFailedAction = () => ({ //データ取得失敗後のアクション
    type: REVEIVE_DATA_FAILED,
});
