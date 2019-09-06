export interface AppUser {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;
  weight?: number;
  maxCalories?: number;
  maxProteins?: number;
  maxCarbs?: number;
  maxFats?: number;
}
