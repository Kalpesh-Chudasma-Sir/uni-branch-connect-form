
import { FormData } from "./formSchema";

export const branchInviteLinks = {
  CE: "https://chat.whatsapp.com/ce-branch-invite",
  CSE: "https://chat.whatsapp.com/cse-branch-invite",
  EC: "https://chat.whatsapp.com/ec-branch-invite",
  CIVIL: "https://chat.whatsapp.com/civil-branch-invite",
  MECH: "https://chat.whatsapp.com/mech-branch-invite",
  EE: "https://chat.whatsapp.com/ee-branch-invite",
} as const;

export const getBranchInviteLink = (branch: FormData["branch"]) => {
  return branchInviteLinks[branch];
};

export const generateWhatsAppMessage = (
  fullName: string,
  branch: string,
  inviteLink: string
) => {
  return `Hi ${fullName}! 🎓\n\nWelcome to the ${branch} Branch WhatsApp Group!\n\nJoin here: ${inviteLink}\n\nBest regards,\nUniversity Team`;
};

export const openWhatsAppWithMessage = (message: string, phoneNumber?: string) => {
  const encodedMessage = encodeURIComponent(message);
  const baseUrl = "https://wa.me/";
  const url = phoneNumber 
    ? `${baseUrl}${phoneNumber}?text=${encodedMessage}`
    : `${baseUrl}?text=${encodedMessage}`;
  
  window.open(url, "_blank");
};
