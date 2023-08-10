import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string;
  }

  flags: {
    svg: string;
    alt: string;
  }
}

// Fetch de dados usando o hook do Next.js - 13
async function getCountries(): Promise<Country[]> {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  return data
}

export default async function Home() {
  const countries = await getCountries()
  return (
    <section className='grid grid-cols-6 w-full container gap-2 mt-16'>
      {countries.map((country) => (
        <Link 
        href={`/country/${country.name.common}`} 
        key={ country.name.common }
        >
        <article 
        className="h-64 min-w-full p-2 bg-lightgray border-2 rounded-xl hover:border-indigo-400 transition-all hover:shadow-xl"
        >
          <div className="relative w-full h-40 p2 overflow-hidden rounded-xl">
        <Image 
        src={country.flags.svg} 
        alt={country.flags.alt} 
        fill 
        className="object-cover" />
        </div>

      <h1 className="font-bold text-xl text-center mt-1 overflow-hidden">{country.name.common}</h1>
      </article>
      </Link>
      ))}
    </section>
  )
}
