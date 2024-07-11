import { useShell } from "@dxos/react-client";
import { Filter, create, useQuery, useSpace } from "@dxos/react-client/echo";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "./Contact";
import { ContactsList } from "./ContactsList";
import { ContactType } from "../types/types";
import { DynamicEchoSchema, ReactiveObject } from "@dxos/echo-schema";
import Header from "./Header";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export const ContactsPage = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();
  const space = useSpace(spaceKey);
  const shell = useShell();
  const [persistedContactType, setPersistedContactType] = useState<DynamicEchoSchema | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!space) {
    console.log("WARNING: space not found!");
  }

  useEffect(() => {
    if (space) {
      let contactType = space?.db.schemaRegistry.getRegisteredByTypename("dxos.app.contacts.Contact");
      if (!contactType) {
        contactType = space.db.schemaRegistry.add(ContactType);
      }
      setPersistedContactType(contactType);
    }
  }, [space]);

  const contacts = useQuery(
    space,
    persistedContactType ? Filter.schema(persistedContactType) : () => false,
    {},
    [persistedContactType]
  );

  const [selectedContact, setSelectedContact] = useState<ReactiveObject<any> | null>(contacts[0] || null);

  const handleSelectContact = (contact: ReactiveObject<any>) => {
    setIsSidebarOpen(false);
    setSelectedContact(contact);
  };

  const handleCreateContact = useCallback(() => {
    const contact = create(persistedContactType, {});
    space.db.add(contact);
    handleSelectContact(contact);
  }, [space.db, persistedContactType]);

  const handleDeleteContact = (contact: DynamicEchoSchema) => {
    space.db.remove(contact);
    setSelectedContact(null);
  };

  return (
    <div className="flex min-h-screen">

      <div className="flex flex-grow">
        <ContactsList
          contacts={contacts}
          onSelect={handleSelectContact}
          onCreate={handleCreateContact}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-row w-full h-full">
          <Header
            onInviteClick={async () => {
              if (!space) return;
              void shell.shareSpace({ spaceKey: space?.key });
            }} />
          {selectedContact !== null ? (
            <Contact
              key={selectedContact.id}
              contact={selectedContact}
              onCreate={handleCreateContact}
              onDelete={handleDeleteContact}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          ) : (
            <div className="flex flex-grow items-center justify-center bg-background">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Contacts App</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-full mb-4 md:hidden"
                  >
                    All Contacts
                  </Button>
                  <Button
                    onClick={handleCreateContact}
                    className="w-full"
                  >
                    Create New Contact
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
                  <p>
                    Made with{" "}
                    <a className="text-primary hover:underline" href="https://dxos.org">
                      DXOS
                    </a>
                  </p>
                  <a
                    className="text-primary hover:underline mt-2"
                    href="https://github.com/dxos/contacts-app"
                  >
                    View Source
                  </a>
                </CardFooter>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};