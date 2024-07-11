import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactiveObject } from "@dxos/echo-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export type ContactProps = {
  contact: ReactiveObject<any> | null;
  onCreate: () => void;
  onDelete: (contact: ReactiveObject<any>) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const contactIsEmpty = (contact: ReactiveObject<any>) => {
  return (
    !contact.firstName &&
    !contact.lastName &&
    !contact.email &&
    !contact.phone &&
    !contact.website
  );
};

export const Contact = ({
  contact,
  onCreate,
  onDelete,
  isSidebarOpen,
  setIsSidebarOpen,
}: ContactProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState<ReactiveObject<any>>(
    JSON.parse(JSON.stringify(contact))
  );

  useEffect(() => {
    setFormState(JSON.parse(JSON.stringify(contact)));
  }, [JSON.stringify(contact)]);

  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contactIsEmpty(contact)) {
      setEditMode(true);
      setTimeout(() => firstNameInputRef.current?.focus(), 0);
    }
  }, [contact, setEditMode]);

  const updateContactField = useCallback(
    (field: string, newValue: any) => {
      contact[field] = newValue;
    },
    [contact]
  );

  return (
    <Card className="flex-grow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {editMode ? (
            <div className="flex space-x-2">
              <Input
                ref={firstNameInputRef}
                value={formState?.firstName}
                onChange={(e) =>
                  setFormState((state) => ({ ...state, firstName: e.target.value }))
                }
                onBlur={(e) => updateContactField("firstName", e.target.value)}
                className="text-2xl font-bold"
                placeholder="First Name"
              />
              <Input
                value={formState?.lastName}
                onChange={(e) =>
                  setFormState((state) => ({ ...state, lastName: e.target.value }))
                }
                onBlur={(e) => updateContactField("lastName", e.target.value)}
                className="text-2xl font-bold"
                placeholder="Last Name"
              />
            </div>
          ) : (
            <span className="text-2xl font-bold">
              {formState?.firstName || '\u00A0'} {formState?.lastName || '\u00A0'}
            </span>
          )}
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            All Contacts
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {["email", "phone", "website"].map((field) => (
          <div key={field} className="mb-4">
            <Label htmlFor={field} className="text-sm text-muted-foreground">
              {field}
            </Label>
            {editMode ? (
              <Input
                id={field}
                type="text"
                value={formState[field]}
                onChange={(e) =>
                  setFormState((state) => ({ ...state, [field]: e.target.value }))
                }
                onBlur={(e) => updateContactField(field, e.target.value)}
              />
            ) : (
              <div className="py-2">{formState[field] || '\u00A0'}</div>
            )}
          </div>
        ))}
        {editMode && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-4">Delete Contact</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the contact.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(contact)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
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
  );
};