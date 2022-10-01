export const targetAPI = 'http://bioinfo07.mu.edu.tr:8080';
export default {
  submitForm: `${targetAPI}/forms/create-pdf`,
  uploadImage: `${targetAPI}/image`,
  getForms: `${targetAPI}/forms/get-forms`,
  accessForm: `${targetAPI}/forms/access-form`,
  getFormsFolders: `${targetAPI}/forms/get-drive-folders`,
  sendMail: `${targetAPI}/mailer/send`,
  login: `${targetAPI}/auth/login`,
};
export const secretToken = 'kedikldtr20accesstoken22';
