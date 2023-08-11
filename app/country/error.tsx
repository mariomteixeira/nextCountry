'use client';

import Link from "next/link";
import Image from "next/image";

export default function Error() {
  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-indigo-800 my-14">
        Oops, we found an error when tried to find this country.
      </h1>
      <Link className="flex items-center" href="/">
        <Image className="py-2" src="/backBtn.svg" alt="Voltar" width={24} height={24} />
          Back
      </Link>
    </section>
  );
}