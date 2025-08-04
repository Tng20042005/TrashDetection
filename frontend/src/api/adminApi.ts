import axios from "axios";
import type { Admin } from "../types/adminType";

const api = axios.create({
  baseURL: 'http://localhost:8000', // Change if backend is on a different port
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export async function loginAdmin(email: string, password: string): Promise<Admin> {
    const response = await api.post<Admin>(
    '/admin/login',
    new URLSearchParams({username: email, password: password }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data;
}