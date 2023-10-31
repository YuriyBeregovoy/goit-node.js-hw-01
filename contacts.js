import { promises  } from 'fs';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
const newId = uuidv4();


const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1)[0];
  await promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: newId, name, email, phone };
  contacts.push(newContact);
  await promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
