import Link from 'next/link'
import Image from 'next/image'


export default function CountryCard({
    name,
    flag,
    flagAlt 
}: {
    name: string,
    flag: string,
    flagAlt: string
}) {
    return (
        <Link 
          href={`/country/${name}`} 
          key={name}
        >
          <article 
            className="h-64 min-w-full p-2 bg-lightgray border-2 rounded-xl hover:border-indigo-400 transition-all hover:shadow-xl"
          >
            <div className="relative w-full h-40 p2 overflow-hidden rounded-xl">
              <Image 
                src={flag} 
                alt={flagAlt} 
                fill 
                className="object-cover" 
              />
            </div>
            <h1 className="font-bold text-xl text-center mt-1 overflow-hidden">
              {name}
            </h1>
          </article>
        </Link>
    )
}