"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
  return (
    <FloatingWhatsApp
      phoneNumber="+254768054542"
      accountName="Yuricart"
      avatar="/logo.png"
      chatMessage="Hello, how can we help you?"
      statusMessage="Available 24/7"
      placeholder="Type something..."
      darkMode={true}
      notification={true}
      notificationSound={true}
      //   notificationSoundSrc="https://kwiqsoft.com/assets/whatsapp-notification.mp3"
    />
  );
}
