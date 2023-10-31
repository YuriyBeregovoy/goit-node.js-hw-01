

import { readFileSync, writeFileSync } from 'fs/promises';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
const newId = uuidv4();


const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  try {
    const data = readFileSync(contactsPath, 'utf-8');
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
  writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: newId, name, email, phone };
  contacts.push(newContact);
  writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default { listContacts, getContactById, removeContact, addContact };