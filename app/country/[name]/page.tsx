import type { Country } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

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

  // API do Next para formatação de números usando Intl.NumberFormat
  const formatter = Intl.NumberFormat('en-US', {notation: "compact"} )

  return (
    <section className="flex flex-col container">
    <h1 className="text-5xl text-center font-bold text-indigo-800 my-14">
      {country.name.common}
    </h1>
    <Link className="flex items-center" href="/">
      <Image className="py-2" src="/backBtn.svg" alt="Voltar" width={24} height={24} />
       Back 
    </Link>
    <article className="flex justify-between min-w-full p-10 bg-zinc-700 rounded-xl">
      <section>
        {country.capital && (
        <h2 className="text-xl text-white mt-2" >
        <b>🏙️ Capital:</b> {country.capital}
          </h2>
          )}
        <h2 className="text-xl text-white mt-2" >
        <b>🗺️ Continent:</b> {country.region} {country.subregion && ` - ${country.subregion}`}
          </h2>
        <h2 className="text-xl text-white mt-2" >
        <b>👨‍👩‍👧‍👦 Population:</b> {formatter.format(country.population)}
          </h2>
        
        {country.languages && (
        <h2 className="text-xl text-white mt-2" >
        <b>🗣️ Languages:</b>
        {Object.values(country.languages).map((language) => (
          <span 
            key={language} 
            className="inline-block ml-1 mr-1 px-2 text-md text-white bg-indigo-700 rounded-xl"
            >
            {language}
          </span>
        ))}
          </h2> 
        )}
      </section>
      <div className="relative h-auto w-96">
        <Image 
        src={country.flags.svg} 
        alt={country.flags.alt} 
        fill
        className="object-cover rounded-xl" 
        />
      </div>
    </article>
    </section>
  );
}
