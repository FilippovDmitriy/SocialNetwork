export const emptyForm = (value: string) => {
    let errors;
    if (value === '') {
        errors = 'empty';
    }
    return errors;
}

export const maxLength = (length: number) => (value: string) => {
    let errors;
    if (value.length >= length) {
        errors = 'Max length';
    }
    return errors;
}