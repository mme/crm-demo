import { Contact } from "@/types/contact";
import clsx from "clsx";
import React from "react";

interface ContactsListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  contacts = [...contacts];

  // sort contacts by last name
  contacts.sort((a, b) => {
    const nameA = a.name.split(" ").slice(-1)[0];
    const nameB = b.name.split(" ").slice(-1)[0];
    return nameA.localeCompare(nameB);
  });
  return (
    <div className="flex flex-col mt-2">
      {contacts.map((contact, index) => (
        <React.Fragment key={contact.id}>
          <div
            className={clsx(
              "flex items-center p-3 cursor-pointer",
              selectedContactId === contact.id
                ? "ring-2 ring-blue-500 ring-inset bg-blue-100 rounded-lg"
                : "hover:bg-gray-200"
            )}
            onClick={() => {
              onSelectContact(contact);
            }}
          >
            <img
              src={contact.pic}
              alt={contact.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-gray-600">{contact.company}</div>
            </div>
          </div>
          {index < contacts.length - 1 && <hr className="" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContactsList;
