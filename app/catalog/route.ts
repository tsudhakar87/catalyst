import { getCSCatalog } from "../lib/getCSCatalog";

export async function GET(request: Request) {
  getCSCatalog();

  return new Response("Hello world!", {
    status: 200
  })
}
