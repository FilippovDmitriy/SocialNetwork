import React, {FC} from "react";
import style from "./ProfileContacts.module.scss";
import {ContactsType} from "../../../../../types/types";

type Props = {
    contacts: ContactsType
};

const ProfileContact: FC<Props> = ({contacts}) => {
    const contactsKeys = Object.keys(contacts);

    type ContactsKey = keyof typeof contacts;

    return (
        <div className={style.contacts}>
            {contactsKeys.map((e) =>
                contacts[e as ContactsKey] && <div key={contactsKeys.indexOf(e)}
                                                   className={style.information}>{e}: {contacts[e as ContactsKey]}</div>
            )}
        </div>
    );
};

export default ProfileContact;