import type { Country } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import CountryCard from "@/components";

async function getCountriesName(name: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/all/`);
  const countries: Country[] = await response.json();
  return countries.find((country: Country) => country.name.common === name)!;
}

// Trazer nome e bandeira do país usando o valor de cada Country
async function getCountryBorders(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all/`);
  const countries: Country[] = await response.json();
  const country = countries.find((country: Country) => country.name.common === name)!;

  return country.borders?.map((border) => {
    const borderByCountry = countries.find(country => country.cca3 === border)
    return {
      name: borderByCountry?.name.common,
      flag: borderByCountry?.flags.svg,
      flagAlt: borderByCountry?.flags.alt

    }
  })
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {

  const country = await getCountriesName(decodeURI(name));

  const borderCountries = await getCountryBorders(decodeURI(name));

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
    <section>
      <h2 className="mt-12 text-2xl text-indigo-800">
        <b>🌎 Borders:</b>
      </h2>
      <div className="grid grid-cols-4 w-full gap-2 my-3">
        {borderCountries?.map((border, index) => 
        <CountryCard key={index} {...border} />
        )}
      </div>
    </section>
    </section>
  );
}
