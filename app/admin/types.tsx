export interface MomInfo {
  id: string;
  img: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
export interface MomRawItem {
  u_id: string;
  email: string;
  fname: string;
  lname: string;
}
export interface MomMappedItem {
  id: string;
  email: string;
  name: string;
}
export interface ContentBabycareItem {
  c_id: string;
  title: string;
  updated_at: string;
  type: string;
  banner: string;
}


export interface MappedBabycareItem {
  id: string;
  title: string;
  date: string;
  type: string;
  thumbnail: string;
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
  length: number;
}

export interface Appointment {
  id: number;
  momname: string;
  doctor: string;

  status: string;
  topic: string;
  day: string;
  date: string;
  number: string;
  time: string;
  location: string;
  info: string;
}

export   const doctors = [
  { id: "1", name: "นพ. สมชาย ใจดี" },
  { id: "2", name: "พญ. สมหญิง รักษาดี" },
  { id: "3", name: "นพ. วิชัย สุขภาพดี" },
  { id: "4", name: "พญ. นงนุช ชำนาญการ" },
  { id: "5", name: "ชิณภัทร สุขทอง" },
];