export const getElement = (id) => document.getElementById(id);

export const getInputValue = (id) => getElement(id).value;

export const setInputValue = (id, value) => {
  getElement(id).value = value;
};

export const setText = (id, text) => {
  getElement(id).textContent = text;
};

export const setTextColor = (id, color) => {
  getElement(id).style.color = color;
};
