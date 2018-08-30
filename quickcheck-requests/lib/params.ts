export const getParameter = (name: string) => {
  if (process.env[name] == undefined)
    throw new Error(`Required parameter ${name} not in environment!`);
  return process.env[name];
};
