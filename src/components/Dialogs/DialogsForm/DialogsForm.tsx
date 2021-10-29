import React, {FC} from "react";
import {Field, Form, Formik} from "formik";
import style from "./DialogsForm.module.scss";
import {emptyForm} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormElements/FormElements";

type PropsType = {
    addMessage: (text: string) => void
};

const DialogsForm: FC<PropsType> = ({addMessage}) => {

    type DialogFormValuesType = {
        newMessage: string
    };

    const onSubmitForm = (value: DialogFormValuesType, {resetForm}: {resetForm: () => void}) => {
        addMessage(value.newMessage);
        resetForm();
    };

    return <Formik
        initialValues={{newMessage: ''}}
        onSubmit={onSubmitForm}
    >
        {({isValid,dirty }) => (
            <Form>
                <div className={style.textarea}>
                    <Field name='newMessage' placeholder='Your message' validate={emptyForm} component={Textarea}/>
                </div>
                <button type="submit" disabled={!isValid || !dirty}>Add message</button>
            </Form>
        )}
    </Formik>
};

export default DialogsForm;