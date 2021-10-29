import React, {FC} from "react";
import style from './Preloader.module.scss';
import classNames from "classnames";

type Props = {
    className?: string
};

const Preloader: FC<Props> = ({className}) => {
    return (
        <div className={classNames(style.preloader,
            {[style.posA]: className === 'posA', [style.posR]: className !== 'posA'})}>
            <div className={style.spinner}>

            </div>
        </div>
    );
};

export default Preloader;