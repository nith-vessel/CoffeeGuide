import type { PageServerLoad } from "./$types";
import { getClient } from "../../packages/client";

export const load = (async () => {
  const client = getClient();
  const coffeeList = await client.getCoffeeList();
  return { coffeeList };
}) satisfies PageServerLoad;
