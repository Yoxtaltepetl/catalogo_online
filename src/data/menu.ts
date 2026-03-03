export type LocalizedString = { es: string; en: string };

export interface ProductCustomization {
    name: LocalizedString | string;
    price?: number; // mxn
    priceUSD?: number;
}

export interface Product {
    id: string;
    name: LocalizedString;
    description: LocalizedString;
    price: number; // mxn
    priceUSD?: number;
    image: string;
    categoryId: string;
    tags?: string[];
    isPopular?: boolean;
    isPromo?: boolean;
    rating?: number;
    extras?: ProductCustomization[];
    removables?: string[];
}

export interface Category {
    id: string;
    name: LocalizedString;
}

export const categories: Category[] = [
    { id: "hamburguesas", name: { es: "Hamburguesas", en: "Burgers" } },
    { id: "pizzas", name: { es: "Pizzas", en: "Pizzas" } },
    { id: "tacos", name: { es: "Tacos", en: "Tacos" } },
    { id: "bebidas", name: { es: "Bebidas", en: "Beverages" } },
    { id: "postres", name: { es: "Postres", en: "Desserts" } },
    { id: "paquetes", name: { es: "Paquetes", en: "Combos" } }
];

export const products: Product[] = [
    // --- HAMBURGUESAS ---
    {
        id: "hamburguesa-clasica", name: { es: "Hamburguesa Clásica", en: "Classic Burger" }, description: { es: "Carne de res 150g, lechuga, tomate, queso cheddar y aderezo especial.", en: "150g beef patty, lettuce, tomato, cheddar cheese, and special dressing." }, price: 120, priceUSD: 6, image: "/images/products/hamburguesa/hamburguesa-clasica.webp", categoryId: "hamburguesas", isPopular: true, isPromo: true, rating: 4.8, tags: ["Res", "Clásicas"], extras: [{ name: { es: "Doble carne", en: "Double patty" }, price: 40, priceUSD: 2 }, { name: { es: "Extra tocino", en: "Extra bacon" }, price: 20, priceUSD: 1 }, { name: { es: "Extra queso", en: "Extra cheese" }, price: 15, priceUSD: 1 }], removables: ["Sin cebolla", "Sin tomate", "Sin aderezo", "Sin pepinillos"]
    },
    {
        id: "hamburguesa-bbq", name: { es: "Hamburguesa BBQ Rodeo", en: "Rodeo BBQ Burger" }, description: { es: "Carne de res 200g, aros de cebolla crujientes, tocino y abundante salsa BBQ.", en: "200g beef patty, crispy onion rings, bacon, and plenty of BBQ sauce." }, price: 160, priceUSD: 8, image: "/images/products/hamburguesa/hamburguesa-bbq.webp", categoryId: "hamburguesas", isPopular: true, isPromo: true, tags: ["Res", "Especiales", "BBQ"], extras: [{ name: { es: "Extra Carne 200g", en: "Extra Patty 200g" }, price: 60, priceUSD: 3 }, { name: { es: "Extra tocino", en: "Extra bacon" }, price: 20, priceUSD: 1 }], removables: ["Sin aros de cebolla", "Sin BBQ", "Sin tocino"]
    },
    {
        id: "hamburguesa-crispy-chicken", name: { es: "Crispy Chicken Burger", en: "Crispy Chicken Burger" }, description: { es: "Pechuga de pollo empanizada súper crujiente con ensalada de col y mayonesa picante.", en: "Super crispy breaded chicken breast with coleslaw and spicy mayo." }, price: 140, priceUSD: 7, image: "/images/products/hamburguesa/hamburguesa-crispy-chicken.webp", categoryId: "hamburguesas", tags: ["Pollo", "Picantes"]
    },
    {
        id: "hamburguesa-vegana", name: { es: "Veggie Master", en: "Veggie Master" }, description: { es: "Medallón de garbanzo y lentejas, espinaca fresca, aguacate y vegan mayo.", en: "Chickpea and lentil patty, fresh spinach, avocado, and vegan mayo." }, price: 150, priceUSD: 8, image: "/images/products/hamburguesa/hamburguesa-vegana.webp", categoryId: "hamburguesas", tags: ["Veganas", "Saludables"]
    },
    {
        id: "hamburguesa-hawaiana", name: { es: "Hawaiana Tropical", en: "Tropical Hawaiian" }, description: { es: "Carne de res, jamón, piña asada, queso manchego y teriyaki.", en: "Beef patty, ham, grilled pineapple, manchego cheese, and teriyaki sauce." }, price: 135, priceUSD: 7, image: "/images/products/hamburguesa/hamburguesa-hawaiana.webp", categoryId: "hamburguesas", tags: ["Res", "Especiales", "Dulce"]
    },
    {
        id: "hamburguesa-monster", name: { es: "Monster Triple", en: "Triple Monster" }, description: { es: "3 carnes de res de 150g, triple queso, tocino, huevo frito y aderezo especial.", en: "Three 150g beef patties, triple cheese, bacon, fried egg, and special dressing." }, price: 220, priceUSD: 11, image: "/images/products/hamburguesa/hamburguesa-monster.webp", categoryId: "hamburguesas", isPopular: true, tags: ["Gourmet", "Doble/Triple"]
    },
    {
        id: "hamburguesa-portobello", name: { es: "Mushroom Swiss", en: "Mushroom Swiss" }, description: { es: "Carne de res, champiñones salteados, queso suizo y cebolla caramelizada.", en: "Beef patty, sautéed mushrooms, Swiss cheese, and caramelized onions." }, price: 155, priceUSD: 8, image: "/images/products/hamburguesa/hamburguesa-portobello.webp", categoryId: "hamburguesas", tags: ["Gourmet", "Res"]
    },
    {
        id: "hamburguesa-pulled-pork", name: { es: "Pulled Pork Heaven", en: "Pulled Pork Heaven" }, description: { es: "Cerdo desmenuzado en salsa BBQ ahumada, ensalada de repollo en pan brioche.", en: "Smoked BBQ pulled pork, coleslaw on a brioche bun." }, price: 165, priceUSD: 9, image: "/images/products/hamburguesa/hamburguesa-pulled-pork.webp", categoryId: "hamburguesas", tags: ["Cerdo", "Especiales"]
    },
    {
        id: "hamburguesa-spicy-jalapeno", name: { es: "Spicy Jalapeño", en: "Spicy Jalapeño" }, description: { es: "Carne de res, queso pepper jack, jalapeños asados y mayonesa de chipotle.", en: "Beef patty, pepper jack cheese, roasted jalapeños, and chipotle mayo." }, price: 145, priceUSD: 8, image: "/images/products/hamburguesa/hamburguesa-spicy-jalapeno.webp", categoryId: "hamburguesas", tags: ["Picantes", "Res"]
    },
    {
        id: "hamburguesa-pescado", name: { es: "Fish Fillet Burger", en: "Fish Fillet Burger" }, description: { es: "Filete de pescado blanco empanizado, salsa tártara y lechuga fresca.", en: "Breaded white fish fillet, tartar sauce, and fresh lettuce." }, price: 130, priceUSD: 7, image: "/images/products/hamburguesa/hamburguesa-pescado.webp", categoryId: "hamburguesas", tags: ["Pescado", "Ligeras"]
    },

    // --- PIZZAS ---
    {
        id: "pizza-peperoni", name: { es: "Pizza Pepperoni (Grande)", en: "Pepperoni Pizza (Large)" }, description: { es: "Auténtica pizza napolitana con extra pepperoni y queso mozzarella fundido.", en: "Authentic Neapolitan pizza with extra pepperoni and melted mozzarella cheese." }, price: 220, priceUSD: 11, image: "/images/products/pizza/pizza-de-peperoni.webp", categoryId: "pizzas", isPromo: true, tags: ["Clásicas", "Carne"], extras: [{ name: { es: "Orilla rellena de queso", en: "Cheese stuffed crust" }, price: 40, priceUSD: 2 }, { name: { es: "Extra pepperoni", en: "Extra pepperoni" }, price: 30, priceUSD: 2 }]
    },
    {
        id: "pizza-cuatro-quesos", name: { es: "Pizza 4 Quesos", en: "4 Cheese Pizza" }, description: { es: "Mezcla de queso mozzarella, parmesano, gouda y roquefort.", en: "Blend of mozzarella, parmesan, gouda, and roquefort cheese." }, price: 250, priceUSD: 13, image: "/images/products/pizza/pizza-cuatr-quesos.webp", categoryId: "pizzas", tags: ["Especiales", "Vegetariana"], extras: [{ name: { es: "Orilla rellena de queso", en: "Cheese stuffed crust" }, price: 40, priceUSD: 2 }]
    },
    {
        id: "pizza-margarita", name: { es: "Pizza Margarita Clásica", en: "Classic Margherita Pizza" }, description: { es: "Salsa de tomate casera, mozzarella fresca, albahaca y aceite de oliva.", en: "Homemade tomato sauce, fresh mozzarella, basil, and olive oil." }, price: 190, priceUSD: 10, image: "/images/products/pizza/pizza-margarita.webp", categoryId: "pizzas", tags: ["Clásicas", "Vegetariana"]
    },
    {
        id: "pizza-hawaiana", name: { es: "Hawaiana Original", en: "Original Hawaiian" }, description: { es: "Doble porción de jamón, trozos de piña dulce y extra mozzarella.", en: "Double ham, sweet pineapple chunks, and extra mozzarella." }, price: 210, priceUSD: 11, image: "/images/products/pizza/pizza-hawaiana.webp", categoryId: "pizzas", isPopular: true, tags: ["Clásicas", "Dulce"]
    },
    {
        id: "pizza-mexicana", name: { es: "Pizza Mexicana", en: "Mexican Pizza" }, description: { es: "Carne molida, chorizo, jalapeños, cebolla morada y pimientos.", en: "Ground beef, chorizo, jalapeños, red onion, and bell peppers." }, price: 240, priceUSD: 12, image: "/images/products/pizza/pizza-mexicana.webp", categoryId: "pizzas", tags: ["Picantes", "Especiales"]
    },
    {
        id: "pizza-carnivora", name: { es: "Amantes de la Carne", en: "Meat Lovers" }, description: { es: "Pepperoni, jamón, salchicha italiana, tocino y carne molida.", en: "Pepperoni, ham, Italian sausage, bacon, and ground beef." }, price: 280, priceUSD: 14, image: "/images/products/pizza/pizza-carnivora.webp", categoryId: "pizzas", isPopular: true, tags: ["Carne", "Gourmet"]
    },
    {
        id: "pizza-vegetariana", name: { es: "Veggie Supreme", en: "Veggie Supreme" }, description: { es: "Pimientos, aceitunas negras, champiñones, cebolla morada y espinacas.", en: "Bell peppers, black olives, mushrooms, red onion, and spinach." }, price: 215, priceUSD: 11, image: "/images/products/pizza/Pizza-vegetariana.webp", categoryId: "pizzas", tags: ["Veganas", "Vegetariana"]
    },
    {
        id: "pizza-prosciutto", name: { es: "Prosciutto & Arugula", en: "Prosciutto & Arugula" }, description: { es: "Prosciutto italiano, arúgula fresca, tomates cherry y reducción balsámica.", en: "Italian prosciutto, fresh arugula, cherry tomatoes, and balsamic reduction." }, price: 290, priceUSD: 15, image: "/images/products/pizza/pizza-proscuito.webp", categoryId: "pizzas", tags: ["Gourmet", "Especiales"]
    },
    {
        id: "pizza-bbq-chicken", name: { es: "BBQ Chicken Pizza", en: "BBQ Chicken Pizza" }, description: { es: "Pechuga de pollo a la parrilla, salsa BBQ, cebolla morada y cilantro.", en: "Grilled chicken breast, BBQ sauce, red onion, and cilantro." }, price: 235, priceUSD: 12, image: "/images/products/pizza/pizza-bbq-chiken.webp", categoryId: "pizzas", tags: ["Cerdo/Pollo", "BBQ"]
    },
    {
        id: "pizza-diavola", name: { es: "Pizza Diavola", en: "Diavola Pizza" }, description: { es: "Salami picante, hojuelas de chile seco y un toque de aceite picante.", en: "Spicy salami, red pepper flakes, and a touch of chili oil." }, price: 230, priceUSD: 12, image: "/images/products/pizza/pizza-diavola.webp", categoryId: "pizzas", tags: ["Picantes", "Clásicas"]
    },

    // --- TACOS ---
    {
        id: "tacos-pastor", name: { es: "Orden Tacos al Pastor (5 pz)", en: "Al Pastor Tacos Order (5 pcs)" }, description: { es: "Tacos tradicionales al pastor con piña, cebolla y cilantro.", en: "Traditional al pastor tacos with pineapple, onion, and cilantro." }, price: 90, priceUSD: 5, image: "/images/products/tacos/tacos-al-pastor.webp", categoryId: "tacos", isPopular: true, isPromo: true, tags: ["Cerdo", "Tradicionales"], removables: ["Sin cebolla", "Sin cilantro", "Sin piña"]
    },
    {
        id: "tacos-bistec", name: { es: "Orden Tacos de Bistec (5 pz)", en: "Steak Tacos Order (5 pcs)" }, description: { es: "Suave bistec de res a la plancha, acompañados de cebollitas asadas.", en: "Tender grilled steak, served with roasted grilled onions." }, price: 110, priceUSD: 6, image: "/images/products/tacos/tacos-bistec.webp", categoryId: "tacos", tags: ["Res", "Tradicionales"]
    },
    {
        id: "tacos-suadero", name: { es: "Orden Tacos de Suadero (5 pz)", en: "Suadero Tacos Order (5 pcs)" }, description: { es: "Suadero confitado lentamente hasta que se derrite en tu boca.", en: "Slow-cooked suadero that melts in your mouth." }, price: 100, priceUSD: 5, image: "/images/products/tacos/tacos-suadero.webp", categoryId: "tacos", tags: ["Res", "Tradicionales"]
    },
    {
        id: "tacos-campechanos", name: { es: "Orden Tacos Campechanos (5 pz)", en: "Campechanos Tacos Order (5 pcs)" }, description: { es: "Irresistible mezcla de bistec, longaniza y un toque de chicharrón seco.", en: "Irresistible mix of steak, longaniza, and a touch of dry chicharrón." }, price: 120, priceUSD: 6, image: "/images/products/tacos/taco-campechano.webp", categoryId: "tacos", isPopular: true, isPromo: true, tags: ["Mixtos", "Tradicionales"]
    },
    {
        id: "tacos-barbacoa", name: { es: "Orden Tacos de Barbacoa (4 pz)", en: "Barbacoa Tacos Order (4 pcs)" }, description: { es: "Barbacoa de hoyo estilo hidalgo, servida con consomé pequeño.", en: "Hidalgo-style pit-roasted barbacoa, served with a small consomé." }, price: 130, priceUSD: 7, image: "/images/products/tacos/tacos-barbacoa.webp", categoryId: "tacos", tags: ["Especialidad", "Res"]
    },
    {
        id: "tacos-pescado", name: { es: "Tacos de Pescado Baja (3 pz)", en: "Baja Fish Tacos (3 pcs)" }, description: { es: "Filete rebozado, ensalada de col morada y aderezo chipotle-mayo.", en: "Battered fish fillet, purple cabbage salad, and chipotle mayo dressing." }, price: 115, priceUSD: 6, image: "/images/products/tacos/tacos-pescado.webp", categoryId: "tacos", tags: ["Mariscos", "Gourmet"]
    },
    {
        id: "tacos-camaron", name: { es: "Tacos de Camarón Queso (3 pz)", en: "Shrimp & Cheese Tacos (3 pcs)" }, description: { es: "Camarones al mojo de ajo envueltos en costra de queso manchego.", en: "Garlic shrimp wrapped in a manchego cheese crust." }, price: 140, priceUSD: 7, image: "/images/products/tacos/tacos-camaron.webp", categoryId: "tacos", tags: ["Mariscos", "Gourmet"]
    },
    {
        id: "tacos-dorados", name: { es: "Orden Flautas de Pollo (4 pz)", en: "Chicken Flautas Order (4 pcs)" }, description: { es: "Tacos dorados de pollo bañados en salsa verde, crema y queso fresco.", en: "Crispy chicken tacos bathed in green salsa, sour cream, and fresh cheese." }, price: 95, priceUSD: 5, image: "/images/products/tacos/tacos-dorados.webp", categoryId: "tacos", tags: ["Pollo", "Fritos"]
    },

    // --- BEBIDAS ---
    { id: "coca-cola", name: { es: "Coca-Cola 600ml", en: "Coca-Cola 600ml" }, description: { es: "Bebida gasificada fría.", en: "Cold carbonated drink." }, price: 35, priceUSD: 2, image: "/images/products/bebidas/coca-cola.webp", categoryId: "bebidas", tags: ["Refrescos", "Frías"] },
    { id: "agua-horchata", name: { es: "Agua de Horchata 1L", en: "Horchata Water 1L" }, description: { es: "Agua fresca tradicional mexicana.", en: "Traditional Mexican refreshing drink." }, price: 45, priceUSD: 3, image: "/images/products/bebidas/agua-horchata.webp", categoryId: "bebidas", isPromo: true, tags: ["Aguas Frescas", "Frías"] },
    { id: "agua-jamaica", name: { es: "Agua de Jamaica 1L", en: "Hibiscus Water 1L" }, description: { es: "Agua fresca natural de flor de jamaica.", en: "Natural refreshing hibiscus flower drink." }, price: 45, priceUSD: 3, image: "/images/products/bebidas/agua-jamaica.webp", categoryId: "bebidas", tags: ["Aguas Frescas", "Frías"] },
    { id: "limonada-mineral", name: { es: "Limonada con Mineral", en: "Sparkling Lemonade" }, description: { es: "Limonada natural preparada con agua mineral y un toque de sal.", en: "Natural lemonade prepared with sparkling water and a touch of salt." }, price: 40, priceUSD: 2, image: "/images/products/bebidas/limonada-mineral.webp", categoryId: "bebidas", tags: ["Frías", "Preparadas"] },
    { id: "cerveza-clara", name: { es: "Cerveza Clara 355ml", en: "Light Beer 355ml" }, description: { es: "Refrescante cerveza clara servida bien fría.", en: "Refreshing light beer served ice cold." }, price: 50, priceUSD: 3, image: "/images/products/bebidas/cerveza-clara.webp", categoryId: "bebidas", tags: ["Cervezas", "Alcohol"] },
    { id: "cerveza-oscura", name: { es: "Cerveza Oscura 355ml", en: "Dark Beer 355ml" }, description: { es: "Cerveza estilo amber lager, con notas tostadas.", en: "Amber lager style beer, with toasted notes." }, price: 50, priceUSD: 3, image: "/images/products/bebidas/cerveza-oscura.webp", categoryId: "bebidas", tags: ["Cervezas", "Alcohol"] },
    { id: "malteada-chocolate", name: { es: "Malteada Clásica de Chocolate", en: "Classic Chocolate Milkshake" }, description: { es: "Batido espeso de helado de chocolate con crema batida.", en: "Thick chocolate ice cream shake with whipped cream." }, price: 70, priceUSD: 4, image: "/images/products/bebidas/malteada-chocolate.webp", categoryId: "bebidas", tags: ["Malteadas", "Dulces"] },
    { id: "malteada-fresa", name: { es: "Malteada de Fresa", en: "Strawberry Milkshake" }, description: { es: "Batido elaborado con fresas naturales y helado de vainilla.", en: "Shake made with fresh strawberries and vanilla ice cream." }, price: 70, priceUSD: 4, image: "/images/products/bebidas/malteada-de-fresa.webp", categoryId: "bebidas", tags: ["Malteadas", "Dulces"] },
    { id: "cafe-americano", name: { es: "Café Americano", en: "Americano Coffee" }, description: { es: "Café de grano recién tostado (caliente o en las rocas).", en: "Freshly roasted coffee bean (hot or on the rocks)." }, price: 30, priceUSD: 2, image: "/images/products/bebidas/cafe-americano.webp", categoryId: "bebidas", tags: ["Café", "Calientes"] },
    { id: "frappe-moka", name: { es: "Frappé Moka", en: "Mocha Frappé" }, description: { es: "Delicioso café frío licuado con chocolate y crema batida.", en: "Delicious cold blended coffee with chocolate and whipped cream." }, price: 80, priceUSD: 4, image: "/images/products/bebidas/frappe-moka.webp", categoryId: "bebidas", isPopular: true, tags: ["Café", "Frías", "Dulces"] },

    // --- POSTRES ---
    { id: "pay-limon", name: { es: "Pay de Limón Helado", en: "Frozen Lemon Pie" }, description: { es: "Nuestra receta secreta con costra de galleta maría.", en: "Our secret recipe with a Maria cookie crust." }, price: 60, priceUSD: 3, image: "/images/products/postres/pay-limon.webp", categoryId: "postres", tags: ["Tartas", "Cítricos"] },
    { id: "cheesecake-frambuesa", name: { es: "Cheesecake de Frambuesa", en: "Raspberry Cheesecake" }, description: { es: "Cremoso pastel de queso bañado en coulis de frambuesa fresca.", en: "Creamy cheesecake topped with fresh raspberry coulis." }, price: 75, priceUSD: 4, image: "/images/products/postres/cheesecake-de-frambuesa.webp", categoryId: "postres", isPopular: true, isPromo: true, tags: ["Pasteles", "Frutos Rojos"] },
    { id: "brownie-helado", name: { es: "Brownie de Chocolate con Helado", en: "Chocolate Brownie with Ice Cream" }, description: { es: "Brownie caliente, nueces, helado de vainilla y salsa de chocolate.", en: "Warm brownie, walnuts, vanilla ice cream, and chocolate sauce." }, price: 85, priceUSD: 5, image: "/images/products/postres/brownie-helado.webp", categoryId: "postres", tags: ["Chocolate", "Helados"] },
    { id: "tiramisu", name: { es: "Tiramisú Italiano", en: "Italian Tiramisu" }, description: { es: "Clásico postre italiano con soletas remojadas en café y mascarpone.", en: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone." }, price: 90, priceUSD: 5, image: "/images/products/postres/tiramisu.webp", categoryId: "postres", tags: ["Pasteles", "Café"] },
    { id: "flan-napolitano", name: { es: "Flan Napolitano Casero", en: "Homemade Neapolitan Flan" }, description: { es: "Cremoso flan con caramelo oscuro.", en: "Creamy flan with dark caramel." }, price: 50, priceUSD: 3, image: "/images/products/postres/flan-napolitano.webp", categoryId: "postres", tags: ["Tradicionales", "Dulces"] },
    { id: "churros", name: { es: "Orden de Churros (4 pz)", en: "Churros Order (4 pcs)" }, description: { es: "Churros espolvoreados con canela y azúcar, incluye salsa de chocolate.", en: "Churros dusted with cinnamon and sugar, includes chocolate sauce." }, price: 65, priceUSD: 4, image: "/images/products/postres/churros.webp", categoryId: "postres", isPopular: true, tags: ["Tradicionales", "Fritos"] },
    { id: "crepas-Nutella", name: { es: "Crepas Rellenas de Nutella", en: "Nutella Filled Crepes" }, description: { es: "Delgadas crepas rellenas de crema de avellana y espolvoreadas con azúcar glass.", en: "Thin crepes filled with hazelnut spread and dusted with powdered sugar." }, price: 75, priceUSD: 4, image: "/images/products/postres/crepas-Nutella.webp", categoryId: "postres", tags: ["Chocolate", "Dulces"] },
    { id: "helado-vainilla", name: { es: "Copa de Helado", en: "Ice Cream Cup" }, description: { es: "Dos bolas de helado (vainilla, chocolate o fresa) con galleta oblea.", en: "Two scoops of ice cream (vanilla, chocolate, or strawberry) with a wafer cookie." }, price: 45, priceUSD: 3, image: "/images/products/postres/helado-vainilla.webp", categoryId: "postres", tags: ["Helados"] },
    { id: "gelatina-mosaico", name: { es: "Gelatina de Mosaico", en: "Mosaic Gelatin" }, description: { es: "Cubos de gelatina de sabores encapsulados en gelatina de leche.", en: "Flavored gelatin cubes encapsulated in milk gelatin." }, price: 35, priceUSD: 2, image: "/images/products/postres/gelatina-mosaico.webp", categoryId: "postres", tags: ["Tradicionales", "Ligeros"] },
    { id: "pastel-zanahoria", name: { es: "Rebanada Pastel de Zanahoria", en: "Carrot Cake Slice" }, description: { es: "Pastel especiado con betún de queso crema crujiente de nueces.", en: "Spiced cake with cream cheese frosting and crunchy walnuts." }, price: 70, priceUSD: 4, image: "/images/products/postres/pastel-zanahoria.webp", categoryId: "postres", tags: ["Pasteles", "Dulces"] },

    // --- PAQUETES ---
    {
        id: "paquete-pareja", name: { es: "Combo Pareja", en: "Couples Combo" }, description: { es: "Incluye 2 Hamburguesas Clásicas, 2 Papas a la francesa (medianas) y 2 refrescos.", en: "Includes 2 Classic Burgers, 2 medium French fries, and 2 sodas." }, price: 290, priceUSD: 15, image: "/images/products/paquetes/combo-pareja.webp", categoryId: "paquetes", isPopular: true, tags: ["Parejas", "Hamburguesas"]
    },
    {
        id: "paquete-familiar-pizza", name: { es: "Paquete Familiar Pizzería", en: "Family Pizzeria Package" }, description: { es: "1 Pizza Grande de 2 ingredientes, 1 Orden de alitas (10 pz) y 1 Refresco 2L.", en: "1 Large 2-topping Pizza, 1 Order of Wings (10 pcs), and 1 2L Soda." }, price: 420, priceUSD: 21, image: "/images/products/paquetes/paquete-familiar-pizza.webp", categoryId: "paquetes", tags: ["Familiar", "Pizzas"]
    },
    {
        id: "paquete-tacos", name: { es: "Mega Taquiza (Para 4 personass)", en: "Mega Taquiza (For 4 people)" }, description: { es: "1 Kilo de Pastor, tortillas, salsas, limones, 4 refrescos y frijoles charros.", en: "1 Kilo of Pastor meat, tortillas, salsas, limes, 4 sodas, and charro beans." }, price: 580, priceUSD: 29, image: "/images/products/paquetes/paquete-tacos.webp", categoryId: "paquetes", tags: ["Taquizas", "Familiar"]
    },
    {
        id: "paquete-infantil", name: { es: "Cajita Niño", en: "Kid's Meal Box" }, description: { es: "Hamburguesa sencilla (solo carne y queso), papas chicas, jugo o agua y juguete sorpresa.", en: "Simple burger (just meat and cheese), small fries, juice or water, and a surprise toy." }, price: 110, priceUSD: 6, image: "/images/products/paquetes/paquete-infantil.webp", categoryId: "paquetes", tags: ["Infantil"]
    },
    {
        id: "paquete-futbol", name: { es: "Combo Partido", en: "Game Day Combo" }, description: { es: "2 Pizzas Grandes (Peperoni/Hawaiana), 20 alitas bufalo, aros de cebolla y 2 Six de cerveza.", en: "2 Large Pizzas (Pepperoni/Hawaiian), 20 buffalo wings, onion rings, and two 6-packs of beer." }, price: 890, priceUSD: 45, image: "/images/products/paquetes/paquete-futbol.webp", categoryId: "paquetes", tags: ["Fiestas", "Grandes"]
    },
    {
        id: "combo-estudihambre", name: { es: "Combo Promoción del Día", en: "Daily Promo Combo" }, description: { es: "Hamburguesa sencilla, porción pequeña de papas y refresco.", en: "Simple burger, small portion of fries, and soda." }, price: 95, priceUSD: 5, image: "/images/products/paquetes/paquete-estudihambre.webp", categoryId: "paquetes", isPromo: true, tags: ["Individual", "Ofertas"]
    },
    {
        id: "super-nachos", name: { es: "Caja de Super Nachos Al Pastor", en: "Super Al Pastor Nachos Box" }, description: { es: "Totopos de maíz bañados en queso líquido, carne al pastor, pico de gallo, jalapeños y crema. Da para 3 personas.", en: "Corn tortilla chips smothered in liquid cheese, al pastor meat, pico de gallo, jalapeños, and sour cream. Serves 3." }, price: 180, priceUSD: 9, image: "/images/products/paquetes/paquete-nachos.webp", categoryId: "paquetes", tags: ["Botanas", "Parejas"]
    },
    {
        id: "combo-postres", name: { es: "Caja Degustación de Postres", en: "Dessert Tasting Box" }, description: { es: "Incluye 1 porción de Tiramisú, 1 Pay de limón, 1 Brownie y 2 Crepas.", en: "Includes 1 portion of Tiramisu, 1 Lemon Pie, 1 Brownie, and 2 Crepes." }, price: 250, priceUSD: 13, image: "/images/products/paquetes/combo-postres.webp", categoryId: "paquetes", tags: ["Dulces", "Fiestas"]
    },
    {
        id: "combo-tacos-pareja", name: { es: "Tacos para Dos", en: "Tacos for Two" }, description: { es: "10 tacos variados (pastor y bistec), guacamole y 2 cervezas claras.", en: "10 assorted tacos (pastor and steak), guacamole, and 2 light beers." }, price: 290, priceUSD: 15, image: "/images/products/paquetes/combo-tacos-pareja.webp", categoryId: "paquetes", isPromo: true, tags: ["Parejas", "Tacos"]
    },
    {
        id: "mega-burger-box", name: { es: "Mega Burger Box", en: "Mega Burger Box" }, description: { es: "4 Hamburguesas Variadas, Papas Gajo familiares, 8 alitas y Aros de cebolla.", en: "4 Assorted Burgers, family potato wedges, 8 wings, and Onion rings." }, price: 650, priceUSD: 33, image: "/images/products/paquetes/mega-burguer-box.webp", categoryId: "paquetes", tags: ["Familiar", "Hamburguesas"]
    }
];
