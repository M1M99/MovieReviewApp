'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function WelcomePage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          to: session.user.email,
          subject: "Welcome!",
          text: "You Logged In Successfully!",
        }),
      });
    }
  }, [session]);

  return <div>Hi, {session?.user?.name}! Email Sent...</div>;
}
