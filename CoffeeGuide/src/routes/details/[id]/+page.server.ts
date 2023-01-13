import type { PageServerLoad } from "./$types";
import { getClient } from "../../../../packages/client";
export const load = (async ({ params }) => {
  const client = getClient();
  const coffee = await client.getCoffee({ name: params.id });

  return { coffee };
}) satisfies PageServerLoad;
