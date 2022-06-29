export const withCapitalLetter = (str: string | undefined) => {
    if (str) return str.substring(0, 1).toUpperCase() + str.substring(1);
};
