import React from 'react';
import { connect } from 'react-redux';
import { requestDataAction, receiveDataSuccessAction, receiveDataFailedAction } from '../redux/actions'

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

class CharacterList extends React.Component {
    constructor(props) {
        super(props);
        this.doReadAction = this.doReadAction.bind(this);
        this.doDeleteAction = this.doDeleteAction.bind(this);
    }
    //READ
    doReadAction() {
        this.props.dispatch(requestDataAction());
        fetch('http://localhost:8080/api/item/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const array = data;
                console.log(array);
                this.props.dispatch(receiveDataSuccessAction(array));
            })
            .catch(err => {
                console.err(new Error(err));
                this.props.dispatch(receiveDataFailedAction());
            });
    }
    //DELETE
    doDeleteAction(id) {
        const data = { id }; //JSONデータにしないといけない。
        this.props.dispatch(requestDataAction());
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
                this.props.dispatch(receiveDataSuccessAction(array));
            })
            .catch(err => {
                console.err(new Error(err));
                this.props.dispatch(receiveDataFailedAction());
            });
    }
    componentDidMount() {
        this.doReadAction();
    }
    render() {
        return ( //下記は式である必要がある。
            <div>
                {
                    this.props.characters.isFetching
                    ? <h2>ロード中です。</h2>
                    : <div>
                        <ul>
                            {
                                //console.log(this.props.characters)
                                this.props.characters.characterArray.map(character => (
                                    <li key={character._id}>
                                        {`${character.comment}`}
                                        <button onClick={() => this.doDeleteAction(character._id)}>削除</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}
CharacterList = connect(mapStateToProps)(CharacterList);

export { CharacterList }
