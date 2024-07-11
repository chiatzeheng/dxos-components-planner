import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContactType } from "../types/types";

export type ContactsListProps = {
  contacts: ContactType[];
  onSelect: (contact: ContactType) => void;
  onCreate: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const contactNameIsBlank = (contact: ContactType) => {
  return contact.firstName === "" && contact.lastName === "";
};

export const ContactsList = ({
  contacts,
  onSelect,
  onCreate,
  isSidebarOpen,
  setIsSidebarOpen,
}: ContactsListProps) => {
  const ContactsContent = (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 ">
        <h2 className="text-2xl font-bold">10x</h2>
        <div className="space-x-2">

          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <ul className="space-y-2 p-4">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="p-3 rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => onSelect(contact)}
            >
              <div className="text-sm font-medium">
                {contactNameIsBlank(contact)
                  ? "Unnamed Contact"
                  : `${contact.firstName} ${contact.lastName}`}
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {/* <div className="p-4 border-t">
        <Button onClick={onCreate} className="w-full">
          Create New Contact
        </Button>
      </div> */}
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(true)}
      >
        Open Contacts
      </Button>
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-background
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {ContactsContent}
      </aside>
    </>
  );
};

export default ContactsList;