export const generateRandomString = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = crypto.getRandomValues(new Uint32Array(length));
  return array.reduce((str, value) => {
    return str + chars[value % chars.length];
  }, "");
};
