import ContactForm from "@/components/ContactForm";
import { IconDeviceMobile, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-2xl w-full flex flex-col gap-3">
      <h1 className="text-3xl mb-4 font-medium">Contact Us</h1>
      <p className="text-md pb-2">
        Thank you for your interest in our products! We welcome all inquiries,
        whether you are looking to get an estimate or have any questions about
        our offerings. Please feel free to fill out the contact form below and
        send it to us, or you can also reach out directly by calling Sean, or by
        emailing us. We look forward to hearing from you and assisting with your
        wholesale needs!
      </p>
      <div className="flex items-center text-md gap-3">
        <IconMail width={20} />
        <Link
          href="mailto:hello@clavismagnetic.com"
          className="hover:text-purple-500"
        >
          hello@clavismagnetic.com
        </Link>
      </div>
      <div className="flex items-center text-md gap-2 pb-8">
        <IconDeviceMobile width={20} />
        <Link href="tel:+17036878094" className="hover:text-purple-500">
          {" "}
          +1 (703) 687 8094
        </Link>{" "}
        <span>(Sean)</span>
      </div>
      <ContactForm />
    </div>
  );
}
