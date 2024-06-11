// import config from "./config";
// import { IUser } from "./types";

// export const fetchUser = async (
//   token: string,
//   thunkApi: Thunk
// ): Promise<IUser> => {
//   const response = await fetch(config.USER_ENDPOINT, {
//     method: "GET",
//     headers: {
//       "authorization": `Bearer ${token}`,
//     }
//   });

//   if (!response.ok) {
//     throw new Error("Error updating token");
//   }

//   const data = (await response.json()) as IResponseToken;

//   if (data.error) {
//     throw new Error(`Error updating token: ${data.error}`);
//   }

//   data.start_timestamp = new Date().getTime();
//   return data;
// };
