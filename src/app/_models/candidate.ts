export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  availability: number;
  experience_years: number;
  curriculum_vitae: string;
  application_status: string;
  message: string;
}

export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  isDeleting: boolean;
  // tslint:disable-next-line:variable-name
  is_superuser: boolean;
}

//
// export class Candidate {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthdate: string;
//   phoneNumber: string;
//   availability: number;
//   experienceYears: number;
//   cv: string;
//   mailStatus: string;
//   token: string;
// }
