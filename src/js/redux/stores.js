import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { CHANGE_COMMENT, INITIALIZE_FORM, REQUEST_DATA, RECEIVE_DATA_ACCESS, RECEIVE_DATA_FAILED} from './actions';

/**
 * ステート
 */
const initialState = {
    form: {
        comment:''
    },
    characters: {
        isFetching: false,
        characterArray:[]
    }
}

/**
 * レデューサー
 * 
 * - アクションを元にステートを更新する。
 * - returnではステートの項目を全て返すようにしなければいけない？
 */
//CREATE（コメント追加）
const formReducer = (state = initialState.form, action) => { //actionって何？ = dispatchを呼び出してアクションクリエイターが返すオブジェクト。actionの中にはaction.typeオブジェクトが必要で、それを元にレデューサーの処理を分ける事になる。
    switch (action.type) {
        case CHANGE_COMMENT:
            return {
                ...state,
                comment:action.comment,
            }
        case INITIALIZE_FORM:
            return initialState.form;
        default:
            return state;
    }
}

//READ, UPDATE, DELETE（コメント表示）
const charactersReducer = (state = initialState.characters, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching:true,
            }
        case RECEIVE_DATA_ACCESS:
            return {
                ...state,
                isFetching: false,
                characterArray:action.characterArray,
            }
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching:false,
            }
    default:
      return state
  }
}

//レデューサーをまとめる
const rootReducer = combineReducers({
    form: formReducer,
    characters: charactersReducer,
});

/**
 * ストア
 */
export const rootStore = createStore(rootReducer, applyMiddleware(thunk, logger));

