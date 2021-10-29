import React, {FC} from "react";
import {Field, Form, Formik} from "formik";
import {Input} from "../../common/FormElements/FormElements";
import {emptyForm} from "../../../utils/validators/validators";
import {sendMessage} from "../../../redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import {getIsConnected} from "../../../redux/chatSelectors";

export const ChatForm: FC = () => {
    type FormValueType = {
        newMessage: string
    };

    const isConnected = useSelector(getIsConnected);
    const dispatch = useDispatch();

    const onSubmitForm = (values: FormValueType, {resetForm}: {resetForm: () => void}) => {
        dispatch(sendMessage(values.newMessage));
        resetForm();
    };

    return <Formik
        initialValues={{newMessage: ''}}
        onSubmit={onSubmitForm}
    >
        {({isValid,dirty }) => (
            <Form>
                <Field component={Input} validate={emptyForm} name={'newMessage'}/>
                <button disabled={!isConnected || !isValid || !dirty} type="submit">
                    Submit
                </button>
            </Form>
        )}
    </Formik>
};