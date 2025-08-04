import axios from "axios";
import type { User, UserInfo } from "../types/userType";

const api = axios.create({
  baseURL: 'http://localhost:8000', // thay đổi nếu backend khác port
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function loginUser(email: string, password: string): Promise<User> {
    const response = await api.post<User>
    ('/user/login',
    new URLSearchParams({username: email,password: password}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  return response.data;
}

export async function registerUser(email: string, username: string, password: string, role: string): Promise<User> {
  const response = await api.post<User>
  (
    '/user/register',
    ({email, username, password, role}),
    {
      headers: {
        'Content-Type': "application/json",
      },
    }
  );
  return response.data
}

export async function getAllUsers(): Promise<UserInfo[]> {
  try{
    const response = await api.get<UserInfo[]>('/user/allUsers');
  return response.data;
  }
  catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}


export async function deleteUser(username: string): Promise<void> {
  try{
    await api.delete(`/user/deleteUser/${username}`);
  }
  catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}

export async function updateUserRole(username: string, role: string): Promise<void> {
  try{
    await api.put(`/user/updateRole/${username}`,{ role } );
  }
  catch (error) {
    console.error("Failed to update user role:", error);
    throw error;
  }
}