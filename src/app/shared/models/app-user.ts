export interface AppUser {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;
  somatotype: number;
  weight?: number;
  maxCalories?: number;
  maxProteins?: number;
  maxCarbs?: number;
  maxFats?: number;
}
