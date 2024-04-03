import { Email } from "@/types/email";
import React, { useState } from "react";

interface EmailOverlayProps {
  onSend: (email: Email) => void;
  updateEmail: (email: Email) => void;
  email: Email;
}

export const EmailOverlay = ({
  email,
  onSend,
  updateEmail,
}: EmailOverlayProps) => {
  return (
    <div className="fixed bottom-0 right-0 m-4 max-w-sm w-full bg-white shadow-lg border rounded-lg">
      <div className="p-4">
        <input
          type="text"
          placeholder="To"
          value={email.receiver}
          onChange={(e) => {
            updateEmail({ ...email, receiver: e.target.value });
          }}
          className="w-full p-2 mb-2 border rounded text-sm"
        />
        <input
          type="text"
          placeholder="Subject"
          value={email.subject}
          onChange={(e) => {
            updateEmail({ ...email, subject: e.target.value });
          }}
          className="w-full p-2 mb-2 border rounded text-sm"
        />
        <textarea
          placeholder="Body"
          value={email.body}
          onChange={(e) => {
            updateEmail({ ...email, body: e.target.value });
          }}
          className="w-full p-2 border rounded resize-none text-sm"
          rows={10}
        ></textarea>
        <div className="text-right mt-2">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
