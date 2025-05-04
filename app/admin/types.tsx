export interface MomInfo {
  u_id: string;
  img: string;
  email: string;
  fname?: string;
  lname?: string;
}

export interface BabyInfo {
  u_id: string;
  image_link: string;
  fname: string;
  lname: string;
  uname: string;
  sex: string;
  birth_date: string;
  blood_type: string;
  weight: string;
  length: string;
  note: string;
  growth: GrowthData[];
}

export interface GrowthData {
  G_id: number;
  created_at: string;
  date: string;
  months: number;
  weight: number;
  length: number;
}

export interface GrowthDataUse {
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

export interface BabyCareItemRes {
  c_id: number;
  title: string;
  type: string;
  updated_at: string;
  banner: string;
  description: string;
}