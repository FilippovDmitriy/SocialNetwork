import React, {FC} from 'react';
import Person from "./Person/Person";
import Message from "./Message/Message";
import style from './Dialogs.module.scss';
import DialogsForm from "./DialogsForm/DialogsForm";
import {MessageType, PersonType} from "../../types/types";

type PropsType = {
    personsData: Array<PersonType>,
    messagesData: Array<MessageType>,
    addMessage: (text: string) => void
};

const Dialogs: FC<PropsType> = ({personsData, messagesData, addMessage}) => {
    const personsElements = personsData
        .map(person => <Person name={person.name} key={person.id} id={person.id} />);
    const messagesElements = messagesData
        .map(message => <Message message={message.message} key={message.id}/>);

    return (
        <div className={style.dialogs}>
            <div className={style.persons}>
                {personsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <DialogsForm addMessage={addMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;