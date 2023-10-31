import {
  listContacts,
  removeContact,
  addContact,
} from "./contacts.js";

async function main() {
  // Вивести список контактів
  const allContacts = await listContacts();
  console.log('Усі контакти:', allContacts);

  // Додати новий контакт
  const newContact = await addContact('John Doe', 'johndoe@example.com', '123-456-7890');
  console.log('Доданий контакт:', newContact);

  // Видалити контакт за ID
  const removedContact = await removeContact(newContact.id);
  console.log('Видалений контакт:', removedContact);
  
  // Оновити список контактів
  const updatedContacts = await listContacts();
  console.log('Оновлений список контактів:', updatedContacts);
}

main();