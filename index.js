const contacts = require('./contacts');

const newContact = contacts.addContact('John Doe', 'johndoe@example.com', '123-456-7890');
console.log('Доданий контакт:', newContact);

const allContacts = contacts.listContacts();
console.log('Контакти:', allContacts);

const contactById = contacts.getContactById(newContact.id);
console.log('Контакт за ID:', contactById);

const removedContact = contacts.removeContact(newContact.id);
console.log('Видалений контакт:', removedContact);

const updatedContacts = contacts.listContacts();
console.log('Оновлений список контактів:', updatedContacts);