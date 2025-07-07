// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const { to, subject, text } = await req.json();

//   try {
//     await resend.emails.send({
//       from: "Movie App <polad197820@gmail.com>",
//       to,
//       subject,
//       text,
//     });
//     return new Response("Email sent");
//   } catch (err) {
//     console.error(err);
//     return new Response("Email error", { status: 500 });
//   }
// }
