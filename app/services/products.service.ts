// /* API´S QUE CONECTAN AL BACK-END */

import { api } from '@/lib/api';
import { Product } from '@/lib/product';

// Mapeo de campos del backend (español) a frontend (inglés)
const mapBackendProduct = (backendProduct: any): Product => {
  // Mapear categorías del backend al frontend
  const categoryMap: Record<string, Product['category']> = {
    'COOKIES': 'cookies',
    'TARTAS': 'pies',
    'PASTELES': 'cakes',
    'FACTURAS': 'pastries',
    'CHOCOLATES': 'chocolates',
    'OTROS': 'otros',
  };

  return {
    id: backendProduct.id,
    name: backendProduct.nombre || '',
    description: backendProduct.descripcion || '',
    shortDescription: backendProduct.descripcionCorta || '', //eliminar esta propiedad
    price: Number(backendProduct.precioVenta) || 0,
    costPrice: Number(backendProduct.precioCosto) || 0,
    stock: backendProduct.stockActual || 0,
    sold: backendProduct.totalVendidos ?? 0,
    rating: backendProduct.calificacion ?? 0,
    reviewCount: backendProduct.cantReseñas ?? 0,
    imageUrl: backendProduct.imagenUrl || '',
    category: categoryMap[backendProduct.categoria || 'OTROS'] || 'otros',
    tags: backendProduct.tags ?? [],
    featured: backendProduct.destacado ?? false,
    active: backendProduct.activo ?? true,
    ingredients: backendProduct.ingredientes ?? [],
    allergens: backendProduct.alergenos ?? [],
  };
};

// Mapeo de campos del frontend (inglés) a backend (español)
const mapFrontendProduct = (frontendProduct: Omit<Product, 'id'>) => {
  // Mapear categorías del frontend al backend
  const categoryMap: Record<string, string> = {
    'cookies': 'COOKIES',
    'pies': 'TARTAS',
    'cakes': 'PASTELES',
    'pastries': 'FACTURAS',
    'chocolates': 'CHOCOLATES',
    'otros': 'OTROS',
  };

  return {
    nombre: frontendProduct.name || '',
    descripcion: frontendProduct.description || '',
    descripcionCorta: frontendProduct.shortDescription || '', //eliminar esta propiedad
    precioVenta: Number(frontendProduct.price) || 0,
    precioCosto: Number(frontendProduct.costPrice) || 0,
    stockActual: Number(frontendProduct.stock) || 0,
    categoria: categoryMap[frontendProduct.category || 'otros'] || 'OTROS',
    imagenUrl: frontendProduct.imageUrl || '',
    tags: frontendProduct.tags ?? [],
    ingredientes: frontendProduct.ingredients ?? [],
    alergenos: frontendProduct.allergens ?? [],
    destacado: frontendProduct.featured ?? false,
  };
};

// ─────────── CREA UN PRODUCTO ─────────────
export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  const backendData = mapFrontendProduct(productData);
  const { data } = await api.post<any>('/api/v1/products', backendData);
  return mapBackendProduct(data);
}

// ────────── OBTIENE TODOS LOS PRODUCTOS ─────────────
export async function getProducts(): Promise<Product[]> {
  const response = await api.get<any>('/api/v1/products');
  // El backend devuelve {success: true, data: {items: [], meta: {...}}}
  const data = response.data?.data || response.data;
  const products = Array.isArray(data) ? data : (data?.items || []);
  return products.map(mapBackendProduct);
}

// ────────── OBTIENE UN PRODUCTO POR ID ─────────────
export async function getProductById(productId: string): Promise<Product>{
  const { data } = await api.get<any>(`/api/v1/products/${productId}`);
  return mapBackendProduct(data);
}



// ────────── ACTUALIZA UN PRODUCTO ─────────────
export async function updateProduct(productId: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> {
  const backendData: any = {};
  if (productData.name !== undefined) backendData.nombre = productData.name;
  if (productData.description !== undefined) backendData.descripcion = productData.description;
  if (productData.shortDescription !== undefined) backendData.descripcionCorta = productData.shortDescription;
  if (productData.price !== undefined) backendData.precioVenta = productData.price;
  if (productData.costPrice !== undefined) backendData.precioCosto = productData.costPrice;
  if (productData.stock !== undefined) backendData.stockActual = productData.stock;
  if (productData.category !== undefined) backendData.categoria = productData.category?.toUpperCase() || 'OTROS';
  if (productData.imageUrl !== undefined) backendData.imagenUrl = productData.imageUrl;
  if (productData.tags !== undefined) backendData.tags = productData.tags;
  if (productData.ingredients !== undefined) backendData.ingredientes = productData.ingredients;
  if (productData.allergens !== undefined) backendData.alergenos = productData.allergens;
  if (productData.featured !== undefined) backendData.destacado = productData.featured;

  const { data } = await api.patch<any>(`/api/v1/products/${productId}`, backendData);
  return mapBackendProduct(data);
}

// ────────── ELIMINA UN PRODUCTO (Soft Delete) ─────────────
export async function deleteProduct(productId: string): Promise<Product>{
  const { data } = await api.delete<any>(`/api/v1/products/${productId}`);
  return mapBackendProduct(data);
}

// ────────── ELIMINA UN PRODUCTO PERMANENTEMENTE (Hard Delete) ─────────────
export async function hardDeleteProduct(productId: string): Promise<Product>{
  const { data } = await api.delete<any>(`/api/v1/products/${productId}/hard`);
  return mapBackendProduct(data);
}

// ────────── ACTIVA/DESACTIVA UN PRODUCTO ─────────────
export async function toggleProductStatus(productId: string, isActive: boolean): Promise<Product>{
  const { data } = await api.patch<any>(`/api/v1/products/${productId}`, {
    activo: isActive
  });
  return mapBackendProduct(data);
}

