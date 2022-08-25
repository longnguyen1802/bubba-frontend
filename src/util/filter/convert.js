export const convertDate = (date) => {
    if (!date) {
        return "";
    }
    const divide = date.split('T');
    return divide[0];
}