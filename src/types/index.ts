export type UserRole = 'patient' | 'family' | 'clinician'

export interface NutritionEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  water: number;
  notes?: string;
}

export interface AssessmentResult {
  cancerType: string;
  treatmentStage: string;
  symptoms: string[];
  nutritionMode: 'western' | 'integrated';
  bmi?: number;
  weight?: number;
  height?: number;
  age?: number;
  nrsScore?: number;
}
