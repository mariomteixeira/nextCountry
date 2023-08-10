import type { Country } from "@/app/page";

async function getCountriesName(name: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  return (await response.json())[0];
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountriesName(name);
  return (
    <h1>{country.name.common}</h1>
  );
}
