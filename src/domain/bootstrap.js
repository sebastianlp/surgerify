import { getUser } from "./auth";

/**
 * This function bootstrap the application initial data
 * Currently the user data if there is a user logged in
 */
async function bootstrapApplicationData() {
  const data = await getUser();

  if (!data) {
    return {
      user: null
    };
  }

  const { user } = data;

  return {
    user
  };
}

export { bootstrapApplicationData };
