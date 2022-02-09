const keyValues = {
    text: "innerText",
    html: "innerHTML",
    cls: "className"
};
const dom = {
    createElement: function (element, props = {}) {
        const newElement = document.createElement(element);

        for(let prop in props) {
            const value = keyValues[prop] === undefined ? prop : keyValues[prop];
            newElement[value] = props[prop];
        }
        return newElement;
    },
    getById: (elementId) => {
        return document.getElementById(elementId);
    },
    appendById: (elementId, element) => {
        document.getElementById(elementId).appendChild(elementId);
    },
    appendByElement(element, child) {
        element.appendChild(child);
    },
    appendByMultiple: (element, elementsArray) => {
        for (let f of elementsArray) {
            element.appendChild(f);
        }
    }
}

export default dom;