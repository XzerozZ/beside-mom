export interface MomInfo {
  id: string;
  u_pid: string;
  img: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
export interface MomRawItem {
  u_id: string;
  u_pid: string;
  email: string;
  fname: string;
  lname: string;
}
export interface MomMappedItem {
  id: string;
  email: string;
  name: string;
  u_pid: string;
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
  rh_type:string;
  birthWeight: string;
  birthHeight: string;
  note: string;
  growthData: GrowthData[];
  beforebirth: number;
  
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

export interface AppointmentAPI_id {
  id: string;
  momname: string;
  topic: string;
  date: string;
  day: string;
  daydate: string;
  doctor: string;
  status: AppointmentStatus;
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
]
type AppointmentStatus = "สำเร็จ" | "ยกเลิก" | "เลื่อน" | "นัดแล้ว";
export interface Appointmentpage {
  a_id: string;
  user_id: string;
  name: string;
  date: string;
  time: string;
  doctor: string;
  status: AppointmentStatus;
}

export interface AppointmentApiData {
  id: string;
  name: string;
  title?: string;
  date: string;
  start_time: string;
  doctor: string;
  status: number;
  building?: string;
  requirement?: string;
}

export interface AppointmentApiData_id {
  id: string;
  user_id: string;
  name: string;
  date: string;
  start_time: string;
  doctor: string;
  status: number;
}

export interface MomApiData {
  u_id: string;
  fname: string;
  lname: string;
}

export interface KidApiData {
  u_id: string;
  image_link: string;
  fname: string;
  lname: string;
  uname: string;
  sex: string;
  birth_date: string;
  blood_type: string;
  rh_type:string;
  weight: number;
  length: number;
  note: string;
  growth: GrowthApiData[];
  beforebirth: number;
  adjusted_days: number;
  adjusted_months: number;
  adjusted_years: number;
  real_days: number;
  real_months: number;
  real_years: number;
 
}

export interface GrowthApiData {
  G_id: string;
  created_at: string;
  months: number;
  weight: number;
  length: number;
}

export interface MomApiResponse {
  u_id: string;
  u_pid: string;
  image_link: string;
  fname: string;
  lname: string;
  email: string;
  kids?: KidApiData[];
}

export interface EvaluateData {
  E_id: string;
  period_id: number;
  status: boolean;
  solution_status: string;
  completed_at: string | null;
}

export interface Quiz {
  question: string;
}

export interface Quizdevelopment {
  quiz_id: number;
  question: string;
  desc: string;
  solution: string;
  suggestion: string;
  banner: string;
  category: { ID: number; category: string };
  period: { ID: number; period: string };
}

export interface History {
  quiz: Quiz;
}

export interface EvaluateDetail {
  solution_status: string;
  Histories: History[];
}

export interface EvaluatePeriods {
  [periodKey: string]: EvaluateDetail;
}

export interface EvaluateDataAPI {
  [category: string]: EvaluatePeriods;
}

export interface MomStory {
  id: string;
  title: string;
  banner: string;
  publish_at: string;
}

export interface Asset {
  asset_id: string;
  link: string;
}

export interface BabyCareData {
  c_id: string;
  type: string;
  title: string;
  desc: string;
  banner: string;
  user_id: string;
  assets: Asset[];
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  label: string;
  icon?: string;
}

export interface SidebarProps {
  selectedItem: string;
}

export interface TopBarSectionProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export interface FAQ {
  Q_id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface MomData {
  id: string;
  email: string;
  name: string;
  u_pid: string;
}

export interface KidApiDataEdit {
  u_id: string;
  image_link: string;
  fname: string;
  lname: string;
  uname: string;
  sex: string;
  birth_date: string;
  blood_type: string;
  rh_type:string;
  weight: number;
  length: number;
  note: string;
  growth: GrowthApiData[];
}

export interface GrowthApiDataEdit {
  G_id: string;
  created_at: string;
  months: number;
  weight: number;
  length: number;
}

export interface MomApiDataEdit {
  u_id: string;
  u_pid: string;
  image_link: string;
  fname: string;
  lname: string;
  email: string;
  kids?: KidApiData[];
}

export interface BabyInfoUpdate {
  id: string;
  img: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  rh_type:string;
  birthWeight: string;
  birthHeight: string;
  note: string;
  growthData: GrowthData[];
  beforebirth: number;
  adjusted_days: number;
  adjusted_months: number;
  adjusted_years: number;
  real_days: number;
  real_months: number;
  real_years: number;
  
}