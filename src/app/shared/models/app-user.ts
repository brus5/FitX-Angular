export interface AppUser {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;
  somatotype: string;
  weight?: number;
  maxCalories?: number;
  maxProteins?: number;
  maxCarbs?: number;
  maxFats?: number;
}
