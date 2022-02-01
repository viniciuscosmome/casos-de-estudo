
const log = (...params) => {
  setTimeout(console.log.bind(console, ...params));
}

const dateNow = () => {
  return Date.now()
}

const newElement = (element) => {
  return document.createElement(element)
}

const queryElement = (element) => {
  return document.querySelector(element)
}

const queryAllElement = (element) => {
  return document.querySelectorAll(element)
}
