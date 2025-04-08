export interface MomInfo {
  id: string;
  img: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface BabyInfo {
  id: string;
  img: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  birthWeight: string;
  birthHeight: string;
  note: string;
  growthData: GrowthData[];
}

export interface GrowthData {
  date: string;
  weight: number;
  height: number;
}

export interface Appointment {
  id: number;
  momname: string;
  doctor: string;
  type: string;
  status: string;
  topic: string;
  day: string;
  date: string;
  number: string;
  time: string;
  location: string;
  info: string;
}
