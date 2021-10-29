import React, {FC} from "react";
import style from "./ProfileDataForm.module.scss";
import {Field, Form, Formik} from "formik";
import {Input} from "../../../common/FormElements/FormElements";
import {emptyForm} from "../../../../utils/validators/validators";
import {ProfileType} from "../../../../types/types";

type Props = {
    profile: ProfileType | null
    updateProfile: (profile: ProfileType) => void
    disableDataForm: () => void
};

const ProfileDataForm: FC<Props> = ({updateProfile, profile, disableDataForm}) => {
    const submitForm = (values: any, {resetForm}: {resetForm: () => void}) => {
        updateProfile(values);
        disableDataForm();
        resetForm();
    };

    return (
        <div className={style.profileDataForm}>
            <Formik initialValues={{fullName: profile!.fullName,
                                    aboutMe: profile!.aboutMe,
                                    lookingForAJob: profile!.lookingForAJob,
                                    lookingForAJobDescription: profile!.lookingForAJobDescription,
                                    contacts: {
                                        github: profile!.contacts.github, vk: profile!.contacts.vk,
                                        facebook: profile!.contacts.facebook, instagram: profile!.contacts.instagram,
                                        twitter: profile!.contacts.twitter, website: profile!.contacts.website,
                                        youtube: profile!.contacts.youtube, mainLink: profile!.contacts.mainLink}}}
                    onSubmit={submitForm}
            >
                {({errors, touched}) => (
                    <Form>
                        <div className={style.input}>
                            <span className={style.description}>Full Name</span>
                            <Field component={Input}
                                   className={errors.fullName && touched.fullName && style.errorField}
                                   validate={emptyForm} name="fullName"/>
                        </div>
                        <div className={style.input}>
                            <span className={style.description}>About Me</span>
                            <Field component={Input}
                                   className={errors.aboutMe && touched.aboutMe && style.errorField}
                                   validate={emptyForm} name="aboutMe"/>
                        </div>
                        <div className={style.checkbox}>
                            <label className={style.checkboxLabel}>
                                <Field component={Input} type='checkbox' name="lookingForAJob"/>
                                <span className={style.checkSpan}>

                                </span>
                                Looking For A Job
                            </label>
                        </div>
                        <div className={style.input}>
                            <span className={style.description}>Looking For A Job Description</span>
                            <Field component={Input}
                                   className={errors.lookingForAJobDescription && touched.lookingForAJobDescription
                                                                               && style.errorField}
                                   validate={emptyForm} name="lookingForAJobDescription"/>
                        </div>
                        <div className={style.contacts}>
                            <div className={style.contactsTitle}>Contacts</div>
                            <div className={style.input}>
                                <span className={style.description}>GitHub</span>
                                <Field component={Input} name="contacts.github"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Vk</span>
                                <Field component={Input} name="contacts.vk"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Facebook</span>
                                <Field component={Input} name="contacts.facebook"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Instagram</span>
                                <Field component={Input} name="contacts.instagram"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Twitter</span>
                                <Field component={Input} name="contacts.twitter"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Website</span>
                                <Field component={Input} name="contacts.website"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>YouTube</span>
                                <Field component={Input} name="contacts.youtube"/>
                            </div>
                            <div className={style.input}>
                                <span className={style.description}>Main Link</span>
                                <Field component={Input} name="contacts.mainLink"/>
                            </div>
                        </div>
                        <button type='submit'>Save</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileDataForm;