import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import { Command } from 'commander';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.log('Усі контакти:', allContacts);
      break;

    case 'get':
      if (id) {
        // Обробка дії "get" з id
        const contactById = await getContactById(id);
        if (contactById) {
          console.log('Контакт за ID:', contactById);
        } else {
          console.log('Контакт не знайдений за вказаним ID.');
        }
      } else {
        console.warn('ID is required for "get" action.');
      }
      break;

    case 'add':
      if (name && email && phone) {
        const newContact = await addContact(name, email, phone);
        console.log('Доданий контакт:', newContact);
      } else {
        console.warn('Name, email, and phone are required for "add" action.');
      }
      break;

    case 'remove':
      if (id) {
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log('Видалений контакт:', removedContact);
        } else {
          console.log('Контакт не знайдений за вказаним ID.');
        }
      } else {
        console.warn('ID is required for "remove" action.');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
