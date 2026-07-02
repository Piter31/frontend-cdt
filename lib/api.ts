/**
 * lib/api.ts
 * Cliente HTTP tipado para conectar el frontend Next.js con la API de Corazón de Trufa.
 *
 * Uso en el frontend:
 *   import { api } from '@/lib/api'
 *   const { data } = await api.products.list()
 */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://corazon-trufa-api-production.up.railway.app'
  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
})

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';


  
// ── Tipos compartidos ──────────────────────────────────────────
// export type Categoria =
//   | 'COOKIES'
//   | 'TARTAS'
//   | 'PASTELES'
//   | 'FACTURAS'
//   | 'CHOCOLATES'
//   | 'OTROS';

// export type MetodoPago = 'QR' | 'LINK' | 'EFECTIVO' | 'TRANSFERENCIA';
// export type EstadoVenta = 'PENDIENTE' | 'PAGADA' | 'CANCELADA' | 'DEVUELTA';

// export interface Product {
//   id: string;
//   nombre: string;
//   descripcion?: string;
//   descripcionCorta?: string;
//   imagenUrl?: string;
//   categoria: Categoria;
//   precioCosto: number;
//   precioVenta: number;
//   stockActual: number;
//   stockMinimo: number;
//   totalVendidos: number;
//   calificacion: number;
//   cantReseñas: number;
//   destacado: boolean;
//   activo: boolean;
//   tags: string[];
//   ingredientes: string[];
//   alergenos: string[];
//   margen: number;
//   stockCritico: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface SaleItem {
//   id: string;
//   productId: string;
//   cantidad: number;
//   precioUnitario: number;
//   subtotal: number;
//   product?: Product;
// }

// export interface Sale {
//   id: string;
//   fechaCreacion: string;
//   total: number;
//   metodoPago: MetodoPago;
//   estado: EstadoVenta;
//   clienteNombre?: string;
//   clienteTelefono?: string;
//   notas?: string;
//   items: SaleItem[];
// }

// export interface PaginatedResponse<T> {
//   items: T[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     hasNextPage: boolean;
//     hasPrevPage: boolean;
//   };
// }

// export interface ApiWrapper<T> {
//   success: boolean;
//   data: T;
//   timestamp: string;
// }

// export interface DashboardStats {
//   ventas: {
//     montoTotal: number;
//     cantidadTotal: number;
//     montoHoy: number;
//     cantidadHoy: number;
//     montoMes: number;
//   };
//   ganancias: {
//     gananciaTotal: number;
//     margenPromedio: number;
//   };
//   stock: {
//     totalProductos: number;
//     stockCriticoCount: number;
//     stockCritico: { id: string; nombre: string; stockActual: number; stockMinimo: number }[];
//   };
//   topProductos: {
//     productId: string;
//     nombre: string;
//     imagenUrl?: string;
//     cantidadVendida: number;
//     ingresoTotal: number;
//     precioVenta: number;
//   }[];
//   distribucionPago: { metodo: MetodoPago; cantidad: number; monto: number }[];
//   ultimasVentas: {
//     id: string;
//     fecha: string;
//     total: number;
//     metodoPago: MetodoPago;
//     estado: EstadoVenta;
//     productos: string[];
//   }[];
// }

// // ── Fetch helper con tipado ────────────────────────────────────
// async function request<T>(
//   path: string,
//   options?: RequestInit,
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       ...options?.headers,
//     },
//     ...options,
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw {
//       status: res.status,
//       message: json.message ?? 'Error desconocido',
//       error: json.error ?? 'Error',
//     };
//   }

//   // Desenvuelve el wrapper { success, data, timestamp }
//   return (json as ApiWrapper<T>).data;
// }

// // ── API Client ─────────────────────────────────────────────────
// export const api = {
//   // ── Productos ────────────────────────────────────────────────
//   products: {
//     list: (params?: {
//       search?: string;
//       categoria?: Categoria;
//       activo?: boolean;
//       destacado?: boolean;
//       page?: number;
//       limit?: number;
//       sortBy?: string;
//       sortOrder?: 'asc' | 'desc';
//     }) => {
//       const qs = params
//         ? '?' + new URLSearchParams(
//             Object.entries(params)
//               .filter(([, v]) => v !== undefined)
//               .map(([k, v]) => [k, String(v)]),
//           ).toString()
//         : '';
//       return request<PaginatedResponse<Product>>(`/products${qs}`);
//     },

//     get: (id: string) => request<Product>(`/products/${id}`),

//     create: (data: Partial<Product>) =>
//       request<Product>('/products', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     update: (id: string, data: Partial<Product>) =>
//       request<Product>(`/products/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(data),
//       }),

//     remove: (id: string) =>
//       request<{ id: string; activo: false }>(`/products/${id}`, {
//         method: 'DELETE',
//       }),

//     adjustStock: (
//       id: string,
//       cantidad: number,
//       operacion: 'sumar' | 'restar' | 'establecer',
//     ) =>
//       request<Product>(`/products/${id}/stock`, {
//         method: 'PATCH',
//         body: JSON.stringify({ cantidad, operacion }),
//       }),

//     lowStock: () => request<Product[]>('/products/low-stock'),
//   },

//   // ── Ventas ───────────────────────────────────────────────────
//   sales: {
//     create: (data: {
//       metodoPago: MetodoPago;
//       items: { productId: string; cantidad: number }[];
//       clienteNombre?: string;
//       clienteTelefono?: string;
//       notas?: string;
//     }) =>
//       request<Sale>('/sales', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     list: (params?: {
//       desde?: string;
//       hasta?: string;
//       metodoPago?: MetodoPago;
//       page?: number;
//       limit?: number;
//     }) => {
//       const qs = params
//         ? '?' + new URLSearchParams(
//             Object.entries(params)
//               .filter(([, v]) => v !== undefined)
//               .map(([k, v]) => [k, String(v)]),
//           ).toString()
//         : '';
//       return request<PaginatedResponse<Sale>>(`/sales${qs}`);
//     },

//     get: (id: string) => request<Sale>(`/sales/${id}`),

//     stats: () => request<DashboardStats>('/sales/stats'),

//     cancel: (id: string) =>
//       request<{ id: string; estado: 'CANCELADA' }>(`/sales/${id}/cancel`, {
//         method: 'PATCH',
//       }),
//   },

//   // ── Pagos ────────────────────────────────────────────────────
//   payments: {
//     generate: (data: {
//       saleId?: string;
//       monto: number;
//       metodo: MetodoPago;
//       descripcion?: string;
//       clienteNombre?: string;
//     }) =>
//       request<{
//         paymentLogId: string;
//         referencia: string;
//         metodo: MetodoPago;
//         monto: number;
//         estado: string;
//         qr?: { url: string; imageUrl: string; instrucciones: string };
//         link?: { url: string; instrucciones: string };
//         expiraEn?: string;
//       }>('/payments/generate', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     simulate: (paymentLogId: string) =>
//       request<{ paymentLogId: string; estado: string; saleId?: string }>(
//         `/payments/${paymentLogId}/simulate`,
//         { method: 'POST' },
//       ),

//     history: (limit?: number) =>
//       request<any[]>(`/payments/history${limit ? `?limit=${limit}` : ''}`),
//   },
// };
