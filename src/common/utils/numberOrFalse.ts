const isInt = (str: string) => {
    const x = Number(str);
    return !isNaN(x) && parseInt(str, 10) === Number(str);
};

export const numberOrFalse = (str: string) => {
    if (isInt(str)) {
        return parseInt(str, 10);
    }
    return false;
};
