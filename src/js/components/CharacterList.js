import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { requestDataAction, receiveDataSuccessAction, receiveDataFailedAction } from '../redux/actions'

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

function Func(props){ //このpropsは、下のconnect()()でストアに接続した際にプロバイダ経由で受け取るストアのデータ
    //READ
    useEffect(() => {
        //console.log(props);
        props.dispatch(requestDataAction());
        fetch('http://localhost:8080/api/item/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const array = data;
                //console.log(array);
                props.dispatch(receiveDataSuccessAction(array));
            })
            .catch(err => {
                console.err(new Error(err));
                props.dispatch(receiveDataFailedAction());
            });
    }, []);
    
    //DELETE
    const doDeleteAction = (id) => {
        const data = { id }; //JSONデータにしないといけない。
        props.dispatch(requestDataAction());
        fetch('http://localhost:8080/api/item/', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const array = data;
                props.dispatch(receiveDataSuccessAction(array));
            })
            .catch(err => {
                console.err(new Error(err));
                props.dispatch(receiveDataFailedAction());
            });
    }

    return (
        
        <div>
            {
                props.characters.isFetching
                    ? <h2>ロード中です。</h2>
                    : <div>
                        <ul>
                            {
                                props.characters.characterArray.map(character => (
                                    //console.log(character)
                                    <li key={character._id}>
                                        {`${character.comment}`}
                                        <button onClick={() => doDeleteAction(character._id)}>削除</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
            }
        </div>
    )
}

export const CharacterList = connect(mapStateToProps)(Func);

//表示確認用
/*
export function FuncComp() {
    //stateの作成
    const [count, setCount] = useState(0);
    //ライフサイクルの設定。レンダリングに毎回呼び出される（初回も含む）。
    useEffect(() => {
       console.log(count);
    });
    return (
        <div>
            <p>{count}回クリックしたよ！</p>
            <button onClick={()=> setCount(count + 1)}>クリック</button>
        </div>
    )
}
*/