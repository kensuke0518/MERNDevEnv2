import React from 'react';
import { connect } from 'react-redux';
import { changeCommentAction, initializeFormAction, requestDataAction, receiveDataSuccessAction, receiveDataFailedAction } from '../redux/actions';

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        const comment = this.props.form;
        //console.log(comment);
        this.state = {
            comment: ''
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }
    doChange(e) {
        this.setState({
            comment: e.target.value
        });
    }
    //CREATE
    doAction(e) {
        e.preventDefault();
        fetch('http://localhost:8080/api/item/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(this.state),
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                //this.props.dispatch(initializeFormAction()); //これが必要か検討する。
                const characterArray = data;
                this.props.dispatch(receiveDataSuccessAction(characterArray));
                this.setState({
                    comment: ''
                });
            })
            .catch(err => {
                console.error(new Error(err));
                this.props.dispatch(receiveDataFailedAction());
            });
    }
    render() {
        return (
            <form onSubmit={this.doAction}>
                <input type="text" onChange={this.doChange} value={this.state.comment} />
                <input type="submit" value="追加" />
            </form>
        );
    }
}
AddForm = connect(mapStateToProps)(AddForm);

export { AddForm };