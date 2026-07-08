/**
 * Cliente HTTP tipado para conectar el frontend Next.js con la API de Corazón de Trufa.
 *
 * Uso en el frontend:
 *   import { api } from '@/lib/api'
 */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://corazon-trufa-api-production.up.railway.app'
})
