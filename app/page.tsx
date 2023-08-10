type Country = {
  name: {
    common: string;
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
        <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl " key={ country.name.common }>
      <h1 >{country.name.common}</h1>
      </article>
      ))}
    </section>
  )
}
