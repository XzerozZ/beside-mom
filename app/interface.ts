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

  export interface Evaluation {
    E_id: string;
    period_id: number;
    status: boolean;
    solution_status: string;
    evaluate_times: number;
    done_times: number;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
  }

  export interface Asset {
    asset_id: string;
    link: string;
  }
  
  export interface CareItem {
    c_id: string;
    type: string;
    title: string;
    desc: string;
    banner: string;
    user_id: string;
    assets: Asset[];
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  }

export  interface QuizCategory {
    ID: number;
    category: string;
  }
  
  export interface QuizPeriod {
    ID: number;
    period: string;
  }
  
  export interface Quiz {
    quiz_id: number;
    question: string;
    desc: string;
    solution: string;
    suggestion: string;
    banner: string;
    category_id: number;
    period_id: number;
    category: QuizCategory;
    period: QuizPeriod;
    created_at: string;
    updated_at: string;
  }
  
  export interface QuizHistory {
    H_id: string;
    quiz_id: number;
    answer: boolean;
    status: boolean;
    evaluate_times: number;
    done_times: number;
    quiz: Quiz;
    created_at: string;
    updated_at: string;
  }
  


  export interface QuizCategory2 {
    ID: number;
    category: string;
  }
  
  export interface QuizPeriod2 {
    ID: number;
    period: string;
  }
  
  export interface Quiz2 {
    quiz_id: number;
    question: string;
    desc: string;
    solution: string;
    suggestion: string;
    banner: string;
    category_id: number;
    period_id: number;
    category: QuizCategory;
    period: QuizPeriod;
    created_at: string;
    updated_at: string;
  }
  
  export interface History {
    H_id: string;
    quiz_id: number;
    answer: boolean;
    status: boolean;
    evaluate_times: number;
    done_times: number;
    quiz: Quiz;
    created_at: string;
    updated_at: string;
  }
  
  export interface HistoryItem {
    Histories: History[];
    solution_status: string;
    DoneAt: string;
  }
  
  export type HistoryData = Record<string, HistoryItem>;
  

 export interface QuizResult {
    id: string;
    Histories: History[];
    solution_status: string;
    DoneAt: string;
  }