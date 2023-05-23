import { emailSender } from '@wasp/email/index.js';

interface SendChatInviteArgs {
  email: string;
  code: string;
}

export const sendChatInvite = async (args: SendChatInviteArgs, context: any): Promise<void> => {

  const date = new Date();
  const year = date.getFullYear();

  await emailSender.send({
    from: {
      name: 'Chat App',
      email: 'andrews.spies@xneelo.com'
    },
    to: args.email,
    subject: 'Chat Invite',
    text: `Hey! Wanna chat?\nConnect using this code: ${args.code}.\nSent from Wasp Chat Demo on ${date}.`,
    html: `<h2>Chat Invite Request</h2>
           <p>Hey! Wanna chat?</p><p>Connect using this code: <strong>${args.code}</strong></p>
           <p>Sent from Wasp Chat Demo on ${date}.</p>
           <p><small>Wasp Chat Demo &copy; ${year}</small></p>`
  });
};
