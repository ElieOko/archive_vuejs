// userService.ts

import { ref, type Ref } from 'vue';
import type { IUserApp } from './interface';


const user: Ref<IUserApp | null> = ref(null);

export function setUser(userData: IUserApp): void {
  localStorage.setItem('user', JSON.stringify(userData));
}

export function getUser(): IUserApp | null {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
}
export function clearUser(): void {
  localStorage.removeItem('user');
}

