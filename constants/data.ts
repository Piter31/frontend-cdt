// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   shortDescription: string;
//   price: number;
//   costPrice: number;
//   stock: number;
//   sold: number;
//   rating: number;
//   reviewCount: number;
//   imageUrl: string;
//   category: "cookies" | "pies" | "cakes" | "pastries" | "chocolates";
//   tags: string[];
//   featured?: boolean;
//   ingredients: string[];
//   allergens: string[];
// }

export const PRODUCTS: Product[] = [
//   // {
//   //   id: "1",
//   //   name: "Cookies de Doble Chocolate",
//   //   description:
//   //     "Irresistibles cookies artesanales con una base de masa oscura rica en cacao y chips de chocolate belga de alta calidad. Crujientes por fuera, con un interior suave y fundente que libera notas profundas de chocolate negro. Elaboradas con manteca clarificada y vainilla bourbon de Madagascar.",
//   //   shortDescription: "Crujientes por fuera, fundentes por dentro",
//   //   price: 1800,
//   //   costPrice: 800,
//   //   stock: 24,
//   //   sold: 152,
//   //   rating: 4.9,
//   //   reviewCount: 87,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
//   //   category: "cookies",
//   //   tags: ["chocolate", "bestseller", "artesanal"],
//   //   featured: true,
//   //   ingredients: [
//   //     "Harina 000",
//   //     "Manteca clarificada",
//   //     "Cacao belga 70%",
//   //     "Chips de chocolate",
//   //     "Huevos de campo",
//   //     "Vainilla bourbon",
//   //     "Azúcar mascabo",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "2",
//   //   name: "Lemon Pie Clásico",
//   //   description:
//   //     "Un equilibrio perfecto entre acidez y dulzor: masa sablée elaborada con manteca francesa, relleno de crema de limón con ralladura fresca y merengue italiano tostado al soplete. Cada porción es una oda a la tradición pastelera con un toque moderno en su presentación.",
//   //   shortDescription: "Cítrico, cremoso y con merengue italiano",
//   //   price: 4200,
//   //   costPrice: 1800,
//   //   stock: 8,
//   //   sold: 94,
//   //   rating: 4.8,
//   //   reviewCount: 63,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
//   //   category: "pies",
//   //   tags: ["limón", "merengue", "clásico"],
//   //   featured: true,
//   //   ingredients: [
//   //     "Masa sablée",
//   //     "Crema de limón",
//   //     "Limones frescos",
//   //     "Claras de huevo",
//   //     "Azúcar refinada",
//   //     "Manteca francesa",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "3",
//   //   name: "Pastafrola de Membrillo",
//   //   description:
//   //     "Nuestra versión premium de la pastafrola argentina de siempre. Masa frola con manteca de primera calidad y toque de ralladura de naranja, rellena con dulce de membrillo artesanal de larga cocción. El enrejado se realiza a mano con la dedicación de siempre.",
//   //   shortDescription: "Tradición argentina en cada bocado",
//   //   price: 3500,
//   //   costPrice: 1400,
//   //   stock: 12,
//   //   sold: 211,
//   //   rating: 4.7,
//   //   reviewCount: 129,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
//   //   category: "pies",
//   //   tags: ["membrillo", "tradicional", "argentina"],
//   //   featured: false,
//   //   ingredients: [
//   //     "Harina 0000",
//   //     "Manteca",
//   //     "Azúcar impalpable",
//   //     "Huevos",
//   //     "Dulce de membrillo artesanal",
//   //     "Ralladura de naranja",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "4",
//   //   name: "Alfajores de Maicena",
//   //   description:
//   //     "Delicados alfajores con tapas de maicena que se deshacen en la boca, rellenos con dulce de leche repostero de producción propia y bañados en azúcar impalpable. La receta familiar que perfeccionamos durante años hasta lograr la textura perfecta.",
//   //   shortDescription: "Se deshacen en la boca con dulce de leche",
//   //   price: 2200,
//   //   costPrice: 900,
//   //   stock: 36,
//   //   sold: 445,
//   //   rating: 5.0,
//   //   reviewCount: 201,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600&q=80",
//   //   category: "cookies",
//   //   tags: ["alfajor", "dulce de leche", "bestseller"],
//   //   featured: true,
//   //   ingredients: [
//   //     "Maicena",
//   //     "Harina",
//   //     "Manteca",
//   //     "Yemas de huevo",
//   //     "Dulce de leche repostero",
//   //     "Azúcar impalpable",
//   //     "Esencia de vainilla",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "5",
//   //   name: "Tarta de Frutos Rojos",
//   //   description:
//   //     "Una tarta elegante con base de masa dulce, crema pastelera de vainilla real y una corona de fresones, frambuesas y moras frescas de temporada. Glaseada con gelatina de brillo para un acabado de confitería parisina que la hace irresistible a la vista y al paladar.",
//   //   shortDescription: "Frutos rojos frescos sobre crema de vainilla",
//   //   price: 5800,
//   //   costPrice: 2500,
//   //   stock: 5,
//   //   sold: 67,
//   //   rating: 4.9,
//   //   reviewCount: 44,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
//   //   category: "pies",
//   //   tags: ["frutos rojos", "crema", "premium"],
//   //   featured: false,
//   //   ingredients: [
//   //     "Masa dulce",
//   //     "Crema pastelera",
//   //     "Fresones",
//   //     "Frambuesas",
//   //     "Moras",
//   //     "Vainilla real",
//   //     "Gelatina de brillo",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "6",
//   //   name: "Brownies de Trufa",
//   //   description:
//   //     "La joya de nuestra carta: brownies de textura densa y fudgy elaborados con cobertura de chocolate amargo al 72%, manteca y azúcar mascabo. Con trozos de trufa de chocolate negro en su interior que se funden al morderlos. Una experiencia para amantes del chocolate serio.",
//   //   shortDescription: "Fudgy con trufa de chocolate amargo 72%",
//   //   price: 2800,
//   //   costPrice: 1200,
//   //   stock: 18,
//   //   sold: 183,
//   //   rating: 4.8,
//   //   reviewCount: 96,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
//   //   category: "cakes",
//   //   tags: ["chocolate", "trufa", "premium"],
//   //   featured: true,
//   //   ingredients: [
//   //     "Cobertura 72% cacao",
//   //     "Manteca",
//   //     "Azúcar mascabo",
//   //     "Huevos",
//   //     "Harina",
//   //     "Trufa de chocolate",
//   //     "Sal marina",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
//   // {
//   //   id: "7",
//   //   name: "Canelones de Ricota y Nuez",
//   //   description:
//   //     "Medialunas de grasa y dulce elaboradas con la técnica del hojaldrado francés aplicada a la tradición argentina. Masa con múltiples capas de manteca, cocidas a la perfección y glaseadas con almíbar de vainilla. Crujientes, doradas y absolutamente adictivas.",
//   //   shortDescription: "Hojaldradas, doradas y con almíbar de vainilla",
//   //   price: 1500,
//   //   costPrice: 600,
//   //   stock: 40,
//   //   sold: 328,
//   //   rating: 4.6,
//   //   reviewCount: 155,
//   //   imageUrl:
//   //     "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
//   //   category: "pastries",
//   //   tags: ["medialunas", "hojaldrado", "desayuno"],
//   //   featured: false,
//   //   ingredients: [
//   //     "Harina 000",
//   //     "Manteca de hojaldrar",
//   //     "Leche",
//   //     "Levadura fresca",
//   //     "Azúcar",
//   //     "Sal",
//   //     "Almíbar de vainilla",
//   //   ],
//   //   allergens: ["Gluten", "Lácteos", "Huevo"],
//   // },
// //   {
// //     id: "8",
// //     name: "Trufas de Chocolate Belga",
// //     description:
// //       "Selección de trufas artesanales elaboradas con ganache de cobertura belga Callebaut y aromatizadas con diferentes ingredientes: café expresso, licor de naranja, pimienta rosa y flor de sal. Presentadas en caja de regalo con papel de seda. Ideales para obsequio.",
// //     shortDescription: "Surtido de ganaches en cobertura belga",
// //     price: 3200,
// //     costPrice: 1400,
// //     stock: 15,
// //     sold: 89,
// //     rating: 4.9,
// //     reviewCount: 52,
// //     imageUrl:
// //       "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
// //     category: "chocolates",
// //     tags: ["regalo", "chocolate belga", "premium"],
// //     featured: true,
// //     ingredients: [
// //       "Cobertura Callebaut",
// //       "Crema de leche",
// //       "Manteca",
// //       "Café expresso",
// //       "Licor de naranja",
// //       "Flor de sal",
// //       "Pimienta rosa",
// //     ],
// //     allergens: ["Lácteos"],
// //   },
];

export interface AdminMetrics {
  totalSales: number;
  todaySales: number;
  criticalStock: number;
  estimatedProfit: number;
}

export function getAdminMetrics(): AdminMetrics {
  const totalSales = PRODUCTS.reduce((acc, p) => acc + p.sold * p.price, 0);
  const todaySales = Math.floor(
    PRODUCTS.reduce((acc, p) => acc + (p.sold % 5) * p.price, 0)
  );
  const criticalStock = PRODUCTS.filter((p) => p.stock <= 10).length;
  const estimatedProfit = PRODUCTS.reduce(
    (acc, p) => acc + p.sold * (p.price - p.costPrice),
    0
  );
  return { totalSales, todaySales, criticalStock, estimatedProfit };
}

export const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "cookies & alfajores", label: "Cookies & Alfajores" },
  { value: "tartas", label: "Tartas" },
  // { value: "cakes", label: "Pasteles" },
  // { value: "pastries", label: "Facturas" },
  { value: "chocolates", label: "Chocolates" },
];