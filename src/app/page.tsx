"use client";

import { ContactDetail } from "@/components/ContactDetail";
import ContactsList from "@/components/ContactsList";
import { dummyData } from "@/dummyData";
import { Contact } from "@/types/contact";
import { useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>(dummyData);
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >(undefined);

  // Find the selected contact based on selectedContactId
  const selectedContact = contacts.find(
    (contact) => contact.id === selectedContactId
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <h1>CopilotKit 🪁 - CRM App</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left-hand Side Area: List of Contacts */}
        <div className="w-64 bg-gray-100 overflow-auto">
          <ContactsList
            contacts={contacts}
            selectedContactId={selectedContactId}
            onSelectContact={(contact) => {
              setSelectedContactId(contact.id);
            }}
          />
        </div>

        {/* Main Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-auto">
          {selectedContact ? (
            <ContactDetail
              contact={selectedContact}
              onUpdateContact={(contact) => {
                setContacts((prevContacts) =>
                  prevContacts.map((c) => (c.id === contact.id ? contact : c))
                );
              }}
            />
          ) : (
            <div className="text-gray-800 text-base items-center justify-center  flex h-full">
              Please select a contact
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
