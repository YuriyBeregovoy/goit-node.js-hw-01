const { v4: uuidv4 } = require('uuid');



const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

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

async function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };