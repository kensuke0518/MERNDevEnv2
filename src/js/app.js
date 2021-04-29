import React from 'react';
import { AddForm } from './components/AddForm';
import { CharacterList } from './components/CharacterList';

export class App extends React.Component {
    render() {
        return (
            <div>
                <AddForm />
                <CharacterList />
            </div>
        );
    }
}
//表示確認用
/*
export class App extends React.Component {
    render() {
        return <div>aaa</div>
    }
}
*/