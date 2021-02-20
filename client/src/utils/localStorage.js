// This is for local storage helper functions mainly to persist log ins for now.

const sevenDays = 604800000;

export function setItem(key, data, ttl = sevenDays) {
    const now = new Date();

    const item = {
        data,
        expires: now.getTime() + ttl;
    }
    localStorage.setItem(key, JSON.stringify(item))''
}

export function getItem(key) {
    let item = localStorage.getItem(key);
    // If item can not be found return null
    if(!item) {
        return null;
    }
    item = JSON.parse(item);
    const now = new Date();
    // If item is expired delete and return null
    if (now.getTime() > item.expires) {
        localStorage.removeItem(key);
        return null;
    }
    // Else, return the data. 
    return item.data;
}
