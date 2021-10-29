import React from "react";

const withFormElement = (Element) => ({field, form, ...restProps}) => {
    return (
            <Element {...field} {...restProps}/>
    )
};

export default withFormElement;