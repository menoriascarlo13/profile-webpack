export default (text = "Hello, Webpack!") => {
    const element = document.createElement("h1");

    element.innerHTML = text;

    console.log('i was done');

    return element;
};