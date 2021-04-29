import React from 'react';
import { AddForm } from './components/AddForm';
import { CharacterList } from './components/CharacterList';

export function App () {
    return (
        <div>
            <AddForm />
            <CharacterList />
        </div>
    );
}