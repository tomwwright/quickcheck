export type Request = {
  uri: string;
  method: "get" | "head" | "put" | "post" | "patch" | "delete";
  headers: { [key: string]: string };
  body: string;
};
