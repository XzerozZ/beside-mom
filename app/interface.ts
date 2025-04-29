export interface ButtonProps {
    title: string;
    textSize?: string;
    boxSize?: string;
    onClick?: () => void;
}

export interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    id: string;
    className: string;
    placeholder: string;
    
}

export interface ChartProps {
    gender: string
    GrowthRecord: GrowthRecord[]
}

export interface Role {
    r_id: number;
    role: string;
  }
  
export interface Growth {
    length: number;
    months: number;
    weight: number;
  }
  
export interface Kid {
    u_id: string;
    fname: string;
    lname: string;
    uname: string;
    sex: string;
    birth_date: string;
    blood_type: string;
    weight: number;
    length: number;
    note: string;
    image_link: string;
    user_id: string;
    growth: Growth[];
    created_at: string;
    updated_at: string;
  }
  
export interface User {
    u_id: string;
    fname: string;
    lname: string;
    email: string;
    image_link: string;
    role: Role;
    kids: Kid[];
    created_at: string;
    updated_at: string;
  }

export interface BabyCardProps {
    name: string;
    image: string;
    uid: string;
}


export interface KidProfile {
    age: number;
    birthdate: string;
    birthlength: number;
    birthweight: number;
    days: number;
    firstname: string;
    growth: Growth[]; // Array of Growth
    id: string;
    lastname: string;
    months: number;
    note: string;
    sex: string;
    username: string;
    blood: string;
    image_link: string;
  }
  

export interface GrowthRecord {
    length: number;
    months: number;
    weight: number;
  }

export interface WeightGrowth {
    month: number;
    weight: number;
  }

  export interface LengthGrowth {
    month: number;
    length: number;
  }

  export interface WeigthLengthGrowth {
    weight: number;
    length: number;
  }

  export interface Appointment {
    building: string;
    date: string;        // ISO date string, e.g., "2025-05-01T00:00:00Z"
    doctor: string;
    id: string;          // UUID
    name: string;
    requirement: string;
    start_time: string;  // ISO time string (although "0000-01-01" is strange)
    status: number;
    title: string;
    user_id: string;     // UUID
  }
  
  export interface QuestionAnswer {
    Q_id: string;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
  }

  export interface VideoClip {
    banner: string;
    count_like: number;
    description: string;
    id: string;
    link: string;
    publish_at: string;
    title: string;
    view: number;
  }