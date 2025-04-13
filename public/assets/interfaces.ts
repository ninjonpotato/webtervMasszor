export interface Service {
    name:string;
    selected: boolean;
    employees: string[];
    img: string;
    text: string;
  }
  export interface Employee {
    name:string;
    selected: boolean;
    leiras: string;
    img: string;
  }

  export interface Hir {
    headline:string,
    text:string,
    img: string | null
  } 

  export interface Review {
    name:string,
    body:string
  }
  export interface Table {
    time:string;
    hely:string;
  }