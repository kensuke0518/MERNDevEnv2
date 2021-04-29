import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeCommentAction, initializeFormAction, requestDataAction, receiveDataSuccessAction, receiveDataFailedAction } from '../redux/actions';

//ステートのマッピング
function mapStateToProps(state) {
    return state;
}

function func(props) {
    const [comment, setComment] = useState('');
    const doChange = (e) => {
        setComment(e.target.value);
    };
    const doAction = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/item/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ comment }),
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                const characterArray = data;
                props.dispatch(receiveDataSuccessAction(characterArray));
                setComment('');
            })
            .catch(err => {
                console.error(new Error(err));
                props.dispatch(receiveDataFailedAction());
            });
    };

    return (
        <form onSubmit={doAction}>
            <input type="text" onChange={doChange} value={comment} />
            <input type="submit" value="追加" />
        </form>
    );
}
export const AddForm = connect(mapStateToProps)(func);