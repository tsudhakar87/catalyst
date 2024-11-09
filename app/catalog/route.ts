import { getCSCatalog } from "../lib/getCSCatalog";

export async function GET(request: Request) {
  const courses = await getCSCatalog();

  return new Response(JSON.stringify(courses), {
    status: 200
  })
}
