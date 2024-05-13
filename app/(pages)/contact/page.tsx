import ContactForm from "@/components/ContactForm";
import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-3xl mb-4 font-medium">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
