import React, {FC, useEffect, useRef, useState} from "react";
import style from "./MyPostsForm.module.scss";
import {Field, Form, Formik} from "formik";
import {emptyForm} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormElements/FormElements";

type Props = {
    addPost: (text: string) => void
};

const MyPostsForm: FC<Props> = (props) => {
    type MyPostsFormValuesType = {
        newPost: string
    };

    const [isRequiredSubmit, setIsRequiredSubmit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)
    const listenerKeyDownInput = (e: any) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            setIsRequiredSubmit(true);
        }
    };
    const onSubmitPost = (values: MyPostsFormValuesType, {resetForm}: {resetForm: () => void}) => {
        props.addPost(values.newPost);
        resetForm();
    };

    useEffect(() => {
        let currentInputRef = inputRef.current;
        currentInputRef?.addEventListener("keydown", listenerKeyDownInput);

        if (isRequiredSubmit && buttonRef.current) {
            buttonRef.current.click();
            setIsRequiredSubmit(false);
        }
        return () => {
            currentInputRef?.removeEventListener("keydown", listenerKeyDownInput);
        };
    }, [isRequiredSubmit])
    
    return <div className={style.postsForm}>
        <Formik
            initialValues={{newPost: ''}}
            onSubmit={onSubmitPost}
        >
            {({isValid,dirty }) => (
                <Form>
                    <div className={style.textarea} ref={inputRef}>
                        <Field component={Textarea} placeholder='New post' validate={emptyForm} name="newPost"/>
                    </div>
                    <button type="submit" ref={buttonRef} disabled={!isValid || !dirty}>Add post</button>
                </Form>
            )}
        </Formik>
    </div>
};

export default MyPostsForm;