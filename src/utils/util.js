export const getDayId = (dateString) => {
    const date = new Date(dateString);
    if(date.getDay() === 0){
        return 7; // Sunday
    }
    return date.getDay();
}