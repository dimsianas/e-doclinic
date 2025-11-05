export function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
}

export function formatDateYMD(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return (`${year}-${month}-${day}`);
}

export function formatTime(time) {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
}

export function formatTimeFromDateTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}