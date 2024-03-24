const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.table([contact]);
    } else {
      console.log("Contact not found");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let contacts = JSON.parse(data);
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === filteredContacts.length) {
      console.log("Contact not found");
      return;
    }
    fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact removed successfully");
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Contact added successfully");
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
