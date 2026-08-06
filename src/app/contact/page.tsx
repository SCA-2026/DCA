import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Decentrix Africa",
  description:
    "Get in touch with Decentrix Africa for Web3 marketing, community, and market entry across Africa.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
