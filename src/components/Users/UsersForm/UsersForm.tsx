import React, {FC} from "react";
import style from "./UsersForm.module.scss"
import {Field, Form, Formik} from "formik";
import {Input} from "../../common/FormElements/FormElements";
import {FilterType} from "../../../redux/usersReducer";
import {convertFriendValueToBoolean} from "../../../utils/functions/convertStringToBoolean";
import {useSelector} from "react-redux";
import {getFilter} from "../../../redux/usersSelectors";

type Props = {
    setFilter: (filter: FilterType) => void
};

const UsersForm: FC<Props> = ({setFilter}) => {
    const filter = useSelector(getFilter);

    type UsersFormValuesType = {
        term: string
        friend: string
    };

    const onSubmitForm = (values: UsersFormValuesType, {resetForm}: {resetForm: () => void}) => {
        let friend = convertFriendValueToBoolean(values.friend);
        setFilter({term: values.term, friend: friend});
        resetForm();
    };

    return (
        <Formik initialValues={{term: filter.term, friend: String(filter.friend)}}
                enableReinitialize={true}
                onSubmit={onSubmitForm}>
            {() => (
                <Form className={style.usersForm}>
                    <div className={style.input}>
                        <Field component={Input} placeholder="Term" type="text" name="term"/>
                        <div className={style.select}>
                            <Field name="friend" as="select">
                                <option value="null">All users</option>
                                <option value="true">Follow users</option>
                                <option value="false">Unfollow users</option>
                            </Field>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button type="submit">Find</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UsersForm;