export const generateConnectionCode = async (): Promise<string> => {
  const code = Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000);
  return code;
};