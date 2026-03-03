import Image from "next/image";

export default function PromoSection() {
    return (
        <section className="pt-6 pb-2 px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Card 1: 2x1 Burgers */}
                <div className="relative h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden group">
                    <Image
                        src="/images/products/hamburguesa/hamburguesa-clasica.webp"
                        alt="Classic Burgers"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 text-white z-10">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-4">
                            OFERTA DEL DÍA
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">2x1 en Classic Burgers</h2>
                        <p className="max-w-xs text-slate-200 mb-6 text-sm md:text-base">
                            Solo por hoy, disfruta del doble de sabor por el mismo precio.
                        </p>
                        <button className="bg-white text-primary font-semibold px-6 py-2.5 rounded-full w-max hover:bg-slate-100 transition-colors shadow-lg">
                            Pedir ahora
                        </button>
                    </div>
                </div>

                {/* Card 2: Nuevas Artesanas */}
                <div className="relative h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden group">
                    <Image
                        src="/images/products/pizza/pizza-de-peperoni.webp"
                        alt="Pizza Artesanal"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 text-white z-10">
                        <span className="bg-[#EAB308] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-4">
                            PIZZA PRO
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">Nuevas Artesanas</h2>
                        <p className="max-w-xs text-slate-200 mb-6 text-sm md:text-base">
                            Ingredientes frescos y masa fermentada por 48 horas.
                        </p>
                        <button className="bg-white text-[#EAB308] font-semibold px-6 py-2.5 rounded-full w-max hover:bg-slate-100 transition-colors shadow-lg">
                            Ver menú
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
