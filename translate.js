const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// 1. Update Interfaces
content = content.replace(
    'export interface ProductCustomization {\r\n    name: string;\r\n    price?: number;\r\n}',
    `export type LocalizedString = { es: string; en: string };\r\n\r\nexport interface ProductCustomization {\r\n    name: LocalizedString | string;\r\n    price?: number;\r\n}`
).replace(
    'export interface ProductCustomization {\n    name: string;\n    price?: number;\n}',
    `export type LocalizedString = { es: string; en: string };\n\nexport interface ProductCustomization {\n    name: LocalizedString | string;\n    price?: number;\n}`
);

content = content.replace(
    '    name: string;\n    description: string;',
    '    name: LocalizedString;\n    description: LocalizedString;'
).replace(
    '    name: string;\r\n    description: string;',
    '    name: LocalizedString;\r\n    description: LocalizedString;'
);

content = content.replace(
    '    name: string;\n}',
    '    name: LocalizedString;\n}'
).replace(
    '    name: string;\r\n}',
    '    name: LocalizedString;\r\n}'
);

// We need a translation map for everything
const translations = {
    // Categories
    '"Hamburguesas"': '{ es: "Hamburguesas", en: "Burgers" }',
    '"Pizzas"': '{ es: "Pizzas", en: "Pizzas" }',
    '"Tacos"': '{ es: "Tacos", en: "Tacos" }',
    '"Bebidas"': '{ es: "Bebidas", en: "Beverages" }',
    '"Postres"': '{ es: "Postres", en: "Desserts" }',
    '"Paquetes"': '{ es: "Paquetes", en: "Combos" }',

    // Burgers
    '"Hamburguesa Clásica"': '{ es: "Hamburguesa Clásica", en: "Classic Burger" }',
    '"Carne de res 150g, lechuga, tomate, queso cheddar y aderezo especial."': '{ es: "Carne de res 150g, lechuga, tomate, queso cheddar y aderezo especial.", en: "150g beef patty, lettuce, tomato, cheddar cheese, and special dressing." }',

    '"Hamburguesa BBQ Rodeo"': '{ es: "Hamburguesa BBQ Rodeo", en: "Rodeo BBQ Burger" }',
    '"Carne de res 200g, aros de cebolla crujientes, tocino y abundante salsa BBQ."': '{ es: "Carne de res 200g, aros de cebolla crujientes, tocino y abundante salsa BBQ.", en: "200g beef patty, crispy onion rings, bacon, and plenty of BBQ sauce." }',

    '"Crispy Chicken Burger"': '{ es: "Crispy Chicken Burger", en: "Crispy Chicken Burger" }',
    '"Pechuga de pollo empanizada súper crujiente con ensalada de col y mayonesa picante."': '{ es: "Pechuga de pollo empanizada súper crujiente con ensalada de col y mayonesa picante.", en: "Super crispy breaded chicken breast with coleslaw and spicy mayo." }',

    '"Veggie Master"': '{ es: "Veggie Master", en: "Veggie Master" }',
    '"Medallón de garbanzo y lentejas, espinaca fresca, aguacate y vegan mayo."': '{ es: "Medallón de garbanzo y lentejas, espinaca fresca, aguacate y vegan mayo.", en: "Chickpea and lentil patty, fresh spinach, avocado, and vegan mayo." }',

    '"Hawaiana Tropical"': '{ es: "Hawaiana Tropical", en: "Tropical Hawaiian" }',
    '"Carne de res, jamón, piña asada, queso manchego y teriyaki."': '{ es: "Carne de res, jamón, piña asada, queso manchego y teriyaki.", en: "Beef patty, ham, grilled pineapple, manchego cheese, and teriyaki sauce." }',

    '"Monster Triple"': '{ es: "Monster Triple", en: "Triple Monster" }',
    '"3 carnes de res de 150g, triple queso, tocino, huevo frito y aderezo especial."': '{ es: "3 carnes de res de 150g, triple queso, tocino, huevo frito y aderezo especial.", en: "Three 150g beef patties, triple cheese, bacon, fried egg, and special dressing." }',

    '"Mushroom Swiss"': '{ es: "Mushroom Swiss", en: "Mushroom Swiss" }',
    '"Carne de res, champiñones salteados, queso suizo y cebolla caramelizada."': '{ es: "Carne de res, champiñones salteados, queso suizo y cebolla caramelizada.", en: "Beef patty, sautéed mushrooms, Swiss cheese, and caramelized onions." }',

    '"Pulled Pork Heaven"': '{ es: "Pulled Pork Heaven", en: "Pulled Pork Heaven" }',
    '"Cerdo desmenuzado en salsa BBQ ahumada, ensalada de repollo en pan brioche."': '{ es: "Cerdo desmenuzado en salsa BBQ ahumada, ensalada de repollo en pan brioche.", en: "Smoked BBQ pulled pork, coleslaw on a brioche bun." }',

    '"Spicy Jalapeño"': '{ es: "Spicy Jalapeño", en: "Spicy Jalapeño" }',
    '"Carne de res, queso pepper jack, jalapeños asados y mayonesa de chipotle."': '{ es: "Carne de res, queso pepper jack, jalapeños asados y mayonesa de chipotle.", en: "Beef patty, pepper jack cheese, roasted jalapeños, and chipotle mayo." }',

    '"Fish Fillet Burger"': '{ es: "Fish Fillet Burger", en: "Fish Fillet Burger" }',
    '"Filete de pescado blanco empanizado, salsa tártara y lechuga fresca."': '{ es: "Filete de pescado blanco empanizado, salsa tártara y lechuga fresca.", en: "Breaded white fish fillet, tartar sauce, and fresh lettuce." }',

    // Pizzas
    '"Pizza Pepperoni (Grande)"': '{ es: "Pizza Pepperoni (Grande)", en: "Pepperoni Pizza (Large)" }',
    '"Auténtica pizza napolitana con extra pepperoni y queso mozzarella fundido."': '{ es: "Auténtica pizza napolitana con extra pepperoni y queso mozzarella fundido.", en: "Authentic Neapolitan pizza with extra pepperoni and melted mozzarella cheese." }',

    '"Pizza 4 Quesos"': '{ es: "Pizza 4 Quesos", en: "4 Cheese Pizza" }',
    '"Mezcla de queso mozzarella, parmesano, gouda y roquefort."': '{ es: "Mezcla de queso mozzarella, parmesano, gouda y roquefort.", en: "Blend of mozzarella, parmesan, gouda, and roquefort cheese." }',

    '"Pizza Margarita Clásica"': '{ es: "Pizza Margarita Clásica", en: "Classic Margherita Pizza" }',
    '"Salsa de tomate casera, mozzarella fresca, albahaca y aceite de oliva."': '{ es: "Salsa de tomate casera, mozzarella fresca, albahaca y aceite de oliva.", en: "Homemade tomato sauce, fresh mozzarella, basil, and olive oil." }',

    '"Hawaiana Original"': '{ es: "Hawaiana Original", en: "Original Hawaiian" }',
    '"Doble porción de jamón, trozos de piña dulce y extra mozzarella."': '{ es: "Doble porción de jamón, trozos de piña dulce y extra mozzarella.", en: "Double ham, sweet pineapple chunks, and extra mozzarella." }',

    '"Pizza Mexicana"': '{ es: "Pizza Mexicana", en: "Mexican Pizza" }',
    '"Carne molida, chorizo, jalapeños, cebolla morada y pimientos."': '{ es: "Carne molida, chorizo, jalapeños, cebolla morada y pimientos.", en: "Ground beef, chorizo, jalapeños, red onion, and bell peppers." }',

    '"Amantes de la Carne"': '{ es: "Amantes de la Carne", en: "Meat Lovers" }',
    '"Pepperoni, jamón, salchicha italiana, tocino y carne molida."': '{ es: "Pepperoni, jamón, salchicha italiana, tocino y carne molida.", en: "Pepperoni, ham, Italian sausage, bacon, and ground beef." }',

    '"Veggie Supreme"': '{ es: "Veggie Supreme", en: "Veggie Supreme" }',
    '"Pimientos, aceitunas negras, champiñones, cebolla morada y espinacas."': '{ es: "Pimientos, aceitunas negras, champiñones, cebolla morada y espinacas.", en: "Bell peppers, black olives, mushrooms, red onion, and spinach." }',

    '"Prosciutto & Arugula"': '{ es: "Prosciutto & Arugula", en: "Prosciutto & Arugula" }',
    '"Prosciutto italiano, arúgula fresca, tomates cherry y reducción balsámica."': '{ es: "Prosciutto italiano, arúgula fresca, tomates cherry y reducción balsámica.", en: "Italian prosciutto, fresh arugula, cherry tomatoes, and balsamic reduction." }',

    '"BBQ Chicken Pizza"': '{ es: "BBQ Chicken Pizza", en: "BBQ Chicken Pizza" }',
    '"Pechuga de pollo a la parrilla, salsa BBQ, cebolla morada y cilantro."': '{ es: "Pechuga de pollo a la parrilla, salsa BBQ, cebolla morada y cilantro.", en: "Grilled chicken breast, BBQ sauce, red onion, and cilantro." }',

    '"Pizza Diavola"': '{ es: "Pizza Diavola", en: "Diavola Pizza" }',
    '"Salami picante, hojuelas de chile seco y un toque de aceite picante."': '{ es: "Salami picante, hojuelas de chile seco y un toque de aceite picante.", en: "Spicy salami, red pepper flakes, and a touch of chili oil." }',

    // Tacos
    '"Orden Tacos al Pastor (5 pz)"': '{ es: "Orden Tacos al Pastor (5 pz)", en: "Al Pastor Tacos Order (5 pcs)" }',
    '"Tacos tradicionales al pastor con piña, cebolla y cilantro."': '{ es: "Tacos tradicionales al pastor con piña, cebolla y cilantro.", en: "Traditional al pastor tacos with pineapple, onion, and cilantro." }',

    '"Orden Tacos de Bistec (5 pz)"': '{ es: "Orden Tacos de Bistec (5 pz)", en: "Steak Tacos Order (5 pcs)" }',
    '"Suave bistec de res a la plancha, acompañados de cebollitas asadas."': '{ es: "Suave bistec de res a la plancha, acompañados de cebollitas asadas.", en: "Tender grilled steak, served with roasted grilled onions." }',

    '"Orden Tacos de Suadero (5 pz)"': '{ es: "Orden Tacos de Suadero (5 pz)", en: "Suadero Tacos Order (5 pcs)" }',
    '"Suadero confitado lentamente hasta que se derrite en tu boca."': '{ es: "Suadero confitado lentamente hasta que se derrite en tu boca.", en: "Slow-cooked suadero that melts in your mouth." }',

    '"Orden Tacos Campechanos (5 pz)"': '{ es: "Orden Tacos Campechanos (5 pz)", en: "Campechanos Tacos Order (5 pcs)" }',
    '"Irresistible mezcla de bistec, longaniza y un toque de chicharrón seco."': '{ es: "Irresistible mezcla de bistec, longaniza y un toque de chicharrón seco.", en: "Irresistible mix of steak, longaniza, and a touch of dry chicharrón." }',

    '"Orden Tacos de Barbacoa (4 pz)"': '{ es: "Orden Tacos de Barbacoa (4 pz)", en: "Barbacoa Tacos Order (4 pcs)" }',
    '"Barbacoa de hoyo estilo hidalgo, servida con consomé pequeño."': '{ es: "Barbacoa de hoyo estilo hidalgo, servida con consomé pequeño.", en: "Hidalgo-style pit-roasted barbacoa, served with a small consomé." }',

    '"Tacos de Pescado Baja (3 pz)"': '{ es: "Tacos de Pescado Baja (3 pz)", en: "Baja Fish Tacos (3 pcs)" }',
    '"Filete rebozado, ensalada de col morada y aderezo chipotle-mayo."': '{ es: "Filete rebozado, ensalada de col morada y aderezo chipotle-mayo.", en: "Battered fish fillet, purple cabbage salad, and chipotle mayo dressing." }',

    '"Tacos de Camarón Queso (3 pz)"': '{ es: "Tacos de Camarón Queso (3 pz)", en: "Shrimp & Cheese Tacos (3 pcs)" }',
    '"Camarones al mojo de ajo envueltos en costra de queso manchego."': '{ es: "Camarones al mojo de ajo envueltos en costra de queso manchego.", en: "Garlic shrimp wrapped in a manchego cheese crust." }',

    '"Orden Flautas de Pollo (4 pz)"': '{ es: "Orden Flautas de Pollo (4 pz)", en: "Chicken Flautas Order (4 pcs)" }',
    '"Tacos dorados de pollo bañados en salsa verde, crema y queso fresco."': '{ es: "Tacos dorados de pollo bañados en salsa verde, crema y queso fresco.", en: "Crispy chicken tacos bathed in green salsa, sour cream, and fresh cheese." }',

    '"Volcán de Pastor"': '{ es: "Volcán de Pastor", en: "Al Pastor Volcán" }',
    '"Tostada crujiente con costra de queso y abundante carne al pastor."': '{ es: "Tostada crujiente con costra de queso y abundante carne al pastor.", en: "Crispy tostada with a cheese crust and plenty of al pastor meat." }',

    '"Gringa de Pastor (Grande)"': '{ es: "Gringa de Pastor (Grande)", en: "Al Pastor Gringa (Large)" }',
    '"Tortilla de harina de 25cm con queso fundido y carne al pastor."': '{ es: "Tortilla de harina de 25cm con queso fundido y carne al pastor.", en: "10-inch flour tortilla with melted cheese and al pastor meat." }',

    // Bebidas
    '"Refresco de Cola 600ml"': '{ es: "Refresco de Cola 600ml", en: "Cola Soda 600ml" }',
    '"Bebida gasificada fría."': '{ es: "Bebida gasificada fría.", en: "Cold carbonated drink." }',
    '"Coca-Cola 600ml"': '{ es: "Coca-Cola 600ml", en: "Coca-Cola 600ml" }',

    '"Agua de Horchata 1L"': '{ es: "Agua de Horchata 1L", en: "Horchata Water 1L" }',
    '"Agua fresca tradicional mexicana."': '{ es: "Agua fresca tradicional mexicana.", en: "Traditional Mexican refreshing drink." }',

    '"Agua de Jamaica 1L"': '{ es: "Agua de Jamaica 1L", en: "Hibiscus Water 1L" }',
    '"Agua fresca natural de flor de jamaica."': '{ es: "Agua fresca natural de flor de jamaica.", en: "Natural refreshing hibiscus flower drink." }',

    '"Limonada con Mineral"': '{ es: "Limonada con Mineral", en: "Sparkling Lemonade" }',
    '"Limonada natural preparada con agua mineral y un toque de sal."': '{ es: "Limonada natural preparada con agua mineral y un toque de sal.", en: "Natural lemonade prepared with sparkling water and a touch of salt." }',

    '"Cerveza Clara 355ml"': '{ es: "Cerveza Clara 355ml", en: "Light Beer 355ml" }',
    '"Refrescante cerveza clara servida bien fría."': '{ es: "Refrescante cerveza clara servida bien fría.", en: "Refreshing light beer served ice cold." }',

    '"Cerveza Oscura 355ml"': '{ es: "Cerveza Oscura 355ml", en: "Dark Beer 355ml" }',
    '"Cerveza estilo amber lager, con notas tostadas."': '{ es: "Cerveza estilo amber lager, con notas tostadas.", en: "Amber lager style beer, with toasted notes." }',

    '"Malteada Clásica de Chocolate"': '{ es: "Malteada Clásica de Chocolate", en: "Classic Chocolate Milkshake" }',
    '"Batido espeso de helado de chocolate con crema batida."': '{ es: "Batido espeso de helado de chocolate con crema batida.", en: "Thick chocolate ice cream shake with whipped cream." }',

    '"Malteada de Fresa"': '{ es: "Malteada de Fresa", en: "Strawberry Milkshake" }',
    '"Batido elaborado con fresas naturales y helado de vainilla."': '{ es: "Batido elaborado con fresas naturales y helado de vainilla.", en: "Shake made with fresh strawberries and vanilla ice cream." }',

    '"Café Americano"': '{ es: "Café Americano", en: "Americano Coffee" }',
    '"Café de grano recién tostado (caliente o en las rocas)."': '{ es: "Café de grano recién tostado (caliente o en las rocas).", en: "Freshly roasted coffee bean (hot or on the rocks)." }',

    '"Frappé Moka"': '{ es: "Frappé Moka", en: "Mocha Frappé" }',
    '"Delicioso café frío licuado con chocolate y crema batida."': '{ es: "Delicioso café frío licuado con chocolate y crema batida.", en: "Delicious cold blended coffee with chocolate and whipped cream." }',

    // Postres
    '"Pay de Limón Helado"': '{ es: "Pay de Limón Helado", en: "Frozen Lemon Pie" }',
    '"Nuestra receta secreta con costra de galleta maría."': '{ es: "Nuestra receta secreta con costra de galleta maría.", en: "Our secret recipe with a Maria cookie crust." }',

    '"Cheesecake de Frambuesa"': '{ es: "Cheesecake de Frambuesa", en: "Raspberry Cheesecake" }',
    '"Cremoso pastel de queso bañado en coulis de frambuesa fresca."': '{ es: "Cremoso pastel de queso bañado en coulis de frambuesa fresca.", en: "Creamy cheesecake topped with fresh raspberry coulis." }',

    '"Brownie de Chocolate con Helado"': '{ es: "Brownie de Chocolate con Helado", en: "Chocolate Brownie with Ice Cream" }',
    '"Brownie caliente, nueces, helado de vainilla y salsa de chocolate."': '{ es: "Brownie caliente, nueces, helado de vainilla y salsa de chocolate.", en: "Warm brownie, walnuts, vanilla ice cream, and chocolate sauce." }',

    '"Tiramisú Italiano"': '{ es: "Tiramisú Italiano", en: "Italian Tiramisu" }',
    '"Clásico postre italiano con soletas remojadas en café y mascarpone."': '{ es: "Clásico postre italiano con soletas remojadas en café y mascarpone.", en: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone." }',

    '"Flan Napolitano Casero"': '{ es: "Flan Napolitano Casero", en: "Homemade Neapolitan Flan" }',
    '"Cremoso flan con caramelo oscuro."': '{ es: "Cremoso flan con caramelo oscuro.", en: "Creamy flan with dark caramel." }',

    '"Orden de Churros (4 pz)"': '{ es: "Orden de Churros (4 pz)", en: "Churros Order (4 pcs)" }',
    '"Churros espolvoreados con canela y azúcar, incluye salsa de chocolate."': '{ es: "Churros espolvoreados con canela y azúcar, incluye salsa de chocolate.", en: "Churros dusted with cinnamon and sugar, includes chocolate sauce." }',

    '"Crepas Rellenas de Nutella"': '{ es: "Crepas Rellenas de Nutella", en: "Nutella Filled Crepes" }',
    '"Delgadas crepas rellenas de crema de avellana y espolvoreadas con azúcar glass."': '{ es: "Delgadas crepas rellenas de crema de avellana y espolvoreadas con azúcar glass.", en: "Thin crepes filled with hazelnut spread and dusted with powdered sugar." }',

    '"Copa de Helado"': '{ es: "Copa de Helado", en: "Ice Cream Cup" }',
    '"Dos bolas de helado (vainilla, chocolate o fresa) con galleta oblea."': '{ es: "Dos bolas de helado (vainilla, chocolate o fresa) con galleta oblea.", en: "Two scoops of ice cream (vanilla, chocolate, or strawberry) with a wafer cookie." }',

    '"Gelatina de Mosaico"': '{ es: "Gelatina de Mosaico", en: "Mosaic Gelatin" }',
    '"Cubos de gelatina de sabores encapsulados en gelatina de leche."': '{ es: "Cubos de gelatina de sabores encapsulados en gelatina de leche.", en: "Flavored gelatin cubes encapsulated in milk gelatin." }',

    '"Rebanada Pastel de Zanahoria"': '{ es: "Rebanada Pastel de Zanahoria", en: "Carrot Cake Slice" }',
    '"Pastel especiado con betún de queso crema crujiente de nueces."': '{ es: "Pastel especiado con betún de queso crema crujiente de nueces.", en: "Spiced cake with cream cheese frosting and crunchy walnuts." }',

    // Paquetes
    '"Combo Pareja"': '{ es: "Combo Pareja", en: "Couples Combo" }',
    '"Incluye 2 Hamburguesas Clásicas, 2 Papas a la francesa (medianas) y 2 refrescos."': '{ es: "Incluye 2 Hamburguesas Clásicas, 2 Papas a la francesa (medianas) y 2 refrescos.", en: "Includes 2 Classic Burgers, 2 medium French fries, and 2 sodas." }',

    '"Paquete Familiar Pizzería"': '{ es: "Paquete Familiar Pizzería", en: "Family Pizzeria Package" }',
    '"1 Pizza Grande de 2 ingredientes, 1 Orden de alitas (10 pz) y 1 Refresco 2L."': '{ es: "1 Pizza Grande de 2 ingredientes, 1 Orden de alitas (10 pz) y 1 Refresco 2L.", en: "1 Large 2-topping Pizza, 1 Order of Wings (10 pcs), and 1 2L Soda." }',

    '"Mega Taquiza (Para 4 personass)"': '{ es: "Mega Taquiza (Para 4 personass)", en: "Mega Taquiza (For 4 people)" }',
    '"1 Kilo de Pastor, tortillas, salsas, limones, 4 refrescos y frijoles charros."': '{ es: "1 Kilo de Pastor, tortillas, salsas, limones, 4 refrescos y frijoles charros.", en: "1 Kilo of Pastor meat, tortillas, salsas, limes, 4 sodas, and charro beans." }',

    '"Cajita Niño"': '{ es: "Cajita Niño", en: "Kid\'s Meal Box" }',
    '"Hamburguesa sencilla (solo carne y queso), papas chicas, jugo o agua y juguete sorpresa."': '{ es: "Hamburguesa sencilla (solo carne y queso), papas chicas, jugo o agua y juguete sorpresa.", en: "Simple burger (just meat and cheese), small fries, juice or water, and a surprise toy." }',

    '"Combo Partido"': '{ es: "Combo Partido", en: "Game Day Combo" }',
    '"2 Pizzas Grandes (Peperoni/Hawaiana), 20 alitas bufalo, aros de cebolla y 2 Six de cerveza."': '{ es: "2 Pizzas Grandes (Peperoni/Hawaiana), 20 alitas bufalo, aros de cebolla y 2 Six de cerveza.", en: "2 Large Pizzas (Pepperoni/Hawaiian), 20 buffalo wings, onion rings, and two 6-packs of beer." }',

    '"Combo Promoción del Día"': '{ es: "Combo Promoción del Día", en: "Daily Promo Combo" }',
    '"Hamburguesa sencilla, porción pequeña de papas y refresco."': '{ es: "Hamburguesa sencilla, porción pequeña de papas y refresco.", en: "Simple burger, small portion of fries, and soda." }',

    '"Caja de Super Nachos Al Pastor"': '{ es: "Caja de Super Nachos Al Pastor", en: "Super Al Pastor Nachos Box" }',
    '"Totopos de maíz bañados en queso líquido, carne al pastor, pico de gallo, jalapeños y crema. Da para 3 personas."': '{ es: "Totopos de maíz bañados en queso líquido, carne al pastor, pico de gallo, jalapeños y crema. Da para 3 personas.", en: "Corn tortilla chips smothered in liquid cheese, al pastor meat, pico de gallo, jalapeños, and sour cream. Serves 3." }',

    '"Caja Degustación de Postres"': '{ es: "Caja Degustación de Postres", en: "Dessert Tasting Box" }',
    '"Incluye 1 porción de Tiramisú, 1 Pay de limón, 1 Brownie y 2 Crepas."': '{ es: "Incluye 1 porción de Tiramisú, 1 Pay de limón, 1 Brownie y 2 Crepas.", en: "Includes 1 portion of Tiramisu, 1 Lemon Pie, 1 Brownie, and 2 Crepes." }',

    '"Tacos para Dos"': '{ es: "Tacos para Dos", en: "Tacos for Two" }',
    '"10 tacos variados (pastor y bistec), guacamole y 2 cervezas claras."': '{ es: "10 tacos variados (pastor y bistec), guacamole y 2 cervezas claras.", en: "10 assorted tacos (pastor and steak), guacamole, and 2 light beers." }',

    '"Mega Burger Box"': '{ es: "Mega Burger Box", en: "Mega Burger Box" }',
    '"4 Hamburguesas Variadas, Papas Gajo familiares, 8 alitas y Aros de cebolla."': '{ es: "4 Hamburguesas Variadas, Papas Gajo familiares, 8 alitas y Aros de cebolla.", en: "4 Assorted Burgers, family potato wedges, 8 wings, and Onion rings." }',
};

// Also apply for extras, just a rough replace for `name: "String"`
const extraTranslations = {
    '"Doble carne"': '{ es: "Doble carne", en: "Double patty" }',
    '"Extra tocino"': '{ es: "Extra tocino", en: "Extra bacon" }',
    '"Extra queso"': '{ es: "Extra queso", en: "Extra cheese" }',
    '"Extra Carne 200g"': '{ es: "Extra Carne 200g", en: "Extra Patty 200g" }',
    '"Orilla rellena de queso"': '{ es: "Orilla rellena de queso", en: "Cheese stuffed crust" }',
    '"Extra pepperoni"': '{ es: "Extra pepperoni", en: "Extra pepperoni" }'
};

Object.entries(translations).forEach(([es, obj]) => {
    // Replace names
    content = content.replace(`name: ${es}`, `name: ${obj}`);
    // Replace descriptions
    content = content.replace(`description: ${es}`, `description: ${obj}`);
});

Object.entries(extraTranslations).forEach(([es, obj]) => {
    content = content.replace(new RegExp(`name: ${es}`, 'g'), `name: ${obj}`);
});

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Translated correctly');
