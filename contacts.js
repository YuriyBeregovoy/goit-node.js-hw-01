const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

function listContacts() {
  try {
    const data = fs.readFileSync(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function getContactById(contactId) {
  const contacts = listContacts();
  const foundContact = contacts.find(contact => contact.id === contactId);
  return foundContact || null;
}

function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1)[0];
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}
