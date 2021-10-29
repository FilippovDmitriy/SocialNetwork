import React, {ChangeEvent, FC} from "react";
import style from "./ProfileSetImage.module.scss";
import classNames from "classnames";

type Props = {
    className: string
    setProfilePhotoFile: (file: File) => void
};

const ProfileSetImage: FC<Props> = ({className, setProfilePhotoFile}) => {

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (!!e.target.files) {
            const image = e.target.files[0];
            setProfilePhotoFile(image);
        }
    };

    return (
        <div className={classNames(style.setImage, {[style.active]: className})}>
            <label className={style.select} htmlFor="file">
                <span>Select new image</span>
            </label>
            <input onChange={onPhotoSelected} id="file" accept=".jpg, .jpeg, .png, .gif" type="file"/>
        </div>
    );
};

export default ProfileSetImage;