import emailjs from "emailjs-com";

export const sendEmail = async (input) => {
  const { serviceId, templateId, templateParams, userId } = input;
  const data = await emailjs.send(serviceId, templateId, templateParams, userId);
  return data;
};
