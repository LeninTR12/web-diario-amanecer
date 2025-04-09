export const stringIsNumber = (value: string) => {
    const regex = /^\d+$/;
    return regex.test(value);    
}