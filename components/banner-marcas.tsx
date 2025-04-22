export default function BannerMarcas() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-black">Nuestros Aliados</h2>
          <p className="text-gray-600 text-xl mt-4 mb-8">
            Orgullosos de colaborar con las mejores cervezas venezolanas
          </p>
        </div>
        <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5 pb-8">
          <img
            alt="Avila"
            src="/avila.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Choroni"
            src="/choroni.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Zulia"
            src="/zulia.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Solera"
            src="/solera.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Polar"
            src="/polar.svg"
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-8 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  );
}
