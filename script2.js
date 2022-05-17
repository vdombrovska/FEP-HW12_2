let template;
const contact = {};
let contactsList = []
const DELETE_BTN = 'delete';
const LINE_SELECTOR = '.line';
const STORAGE_KEY = 'contactsList';

const contactForm = document.querySelector('#newForm');
const contactsListEl = document.querySelector('#contactsList');
const userTemplate = document.querySelector('#userTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onAddBtnClick);
contactsListEl.addEventListener('click', onDeleteBtnClick);

initalition ();

function onAddBtnClick(element) {
    element.preventDefault();

    const newContact = getContact();

    if (isAllFieldsCorrect(newContact)) {
        addContact(newContact);
        clearInputs();
    } else {
        alert('Please check your data');
    }
}

function onDeleteBtnClick(element) {
    if (element.target.classList.contains(DELETE_BTN)) {
        const tr = findLine(element.target);
        deleteContact (tr);
    }
}

function initalition() {
    contactsList = restoreData();
    renderList();
}
function getContact() {
    formInputs.forEach((input) => { contact[input.name] = input.value;});
    return contact;
}

function isAllFieldsCorrect(contact) {
    return (
        isFirstNameCorrect(contact.firstName) &&
        isLastNameCorrect(contact.lastName) &&
        isPhoneCorrect(contact.phone)
    );
}

function isFirstNameCorrect(value) {
    return value !== '';
}

function isLastNameCorrect(value) {
    return value !== '';
}

function isPhoneCorrect(value) {
    return value !== '' && !isNaN(value);
}

function createNewLineHTML ( contact){
    return  interpolate(userTemplate, contact);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }
    return template;
}

function addContact(contact) {
    contact.id = Date.now();
    contactsList.push(contact);
    renderList();
    saveData();
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(createNewLineHTML).join('\n');
}

function clearInputs (){
    contact.firstName = '';
    contact.lastName = '';
    contact.phone = '';
}

function findLine(el) {
    return el.closest(LINE_SELECTOR);
}

function deleteContact(el) {
    el.remove();
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsList));
}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}
