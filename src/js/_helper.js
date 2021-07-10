export const getDomElement = (selector) => {
    return document.querySelector(selector)
}

export const id = () => {
    return Math.floor(Math.random() * 1000000) + 1
}