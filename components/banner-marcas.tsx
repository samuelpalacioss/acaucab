export default function BannerMarcas() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">Nuestros Aliados</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4 mb-8">
            Orgullosos de colaborar con las mejores cervezas venezolanas
          </p>
        </div>
        <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-6 sm:gap-4 sm:max-w-xl lg:mx-0 lg:max-w-none lg:gap-14 pb-8">
          <img
            alt="Choroni"
            src="/choroni.svg"
            width={158}
            height={48}
            className="max-h-6 sm:max-h-7 md:max-h-8 w-auto object-contain"
          />
          <img
            alt="Zulia"
            src="/zulia.svg"
            width={158}
            height={48}
            className="max-h-6 sm:max-h-7 md:max-h-8 w-auto object-contain"
          />
          <img
            alt="Solera"
            src="/solera.svg"
            width={158}
            height={48}
            className="max-h-6 sm:max-h-7 md:max-h-8 w-auto object-contain"
          />
          <img
            alt="Polar"
            src="/polar.svg"
            width={158}
            height={48}
            className="max-h-6 sm:max-h-7 md:max-h-8 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
