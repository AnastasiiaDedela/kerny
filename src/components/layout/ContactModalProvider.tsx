'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { ContactModal } from '@/components/layout/ContactModal';

const ContactModalContext = createContext<(() => void) | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={() => setOpen(true)}>
      {children}
      <ContactModal open={open} onOpenChange={setOpen} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const openContactModal = useContext(ContactModalContext);
  if (!openContactModal) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return openContactModal;
}
