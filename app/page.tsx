import CountryCard from "@/components";
import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
};

// Fetch de dados usando o hook do Next.js - 13
async function getCountries(): Promise<Country[]> {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data;
}

export default async function Home() {
  const countries = await getCountries();
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full container gap-2 mt-16'>
      {countries.map((country) => (
        <CountryCard 
        key={country.name.common}
        name={country.name.common} 
        flag={country.flags.svg}
        flagAlt={country.flags.alt}
         />
      ))}
    </section>
  );
}
