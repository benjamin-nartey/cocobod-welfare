import {
  EmployeeTypeEnum,
  EmployeeStatusEnum,
  LoanTypeEnum,
} from "./lib/constants/enums";

interface NewTokensProps {
  accessToken: string;
  refreshToken: string;
}

interface DepartmentProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  loanType?: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface GenericAttributeProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TokensProps {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface RoleProps extends GenericAttributeProps {
  permissions: GenericAttributeProps[];
}

interface UserEmployeeProps {
  id: string;
  name: string;
  email: string;
  status: EmployeeStatusEnum.ACTIVE | EmployeeStatusEnum.INACTIVE;
  createdAt: Date;
  updatedAt: Date;
}

interface EmployeeProps {
  id: string;
  hireDate: Date;
  employeeType:
    | EmployeeTypeEnum.JUNIOR
    | EmployeeTypeEnum.MANAGEMENT
    | EmployeeTypeEnum.SENIOR;
  staffNumber: number;
  updatedAt: Date;
  createdAt: Date;
  user: UserEmployeeProps;
}

interface MemberProps extends EmployeeProps {
  user: {
    id: string;
    name: string;
    email: string;
    status: EmployeeStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    department: GenericAttributeProps;
    division: GenericAttributeProps;
    designation: GenericAttributeProps;
  };
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  employee: string;
  roles: RoleProps[];
  signature: {
    id: "665abb16-b920-4187-b984-171647f709b5";
    filePath: "uploads/1684155519810-283756112.png";
    createdAt: "2020-09-10";
    updatedAt: "2020-09-10";
    member: MemberProps;
  };
}

interface CommentsProps {
  id: string;
  message: string;
}

interface ApproversProps {
  id: string;
  action: string;
  meta: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface AllLoanRequestProps {
  id: string;
  loanType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  employee: EmployeeProps;
  comments: CommentsProps | null;
  approvalStage: {
    id: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    approvers: ApproversProps[];
  };
}
interface LoansRequestProps {
  data: AllLoanRequestProps[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface LoanRequestByDepartmentProps {
  loanType: string;
  departments: DepartmentProps[];
}

interface LoanProps {
  loanType:
    | LoanTypeEnum.CAR
    | LoanTypeEnum.CAR_REPAIRS
    | LoanTypeEnum.EDUCATION
    | LoanTypeEnum.HOME_OWNERSHIP
    | LoanTypeEnum.HOUSEHOLD_DURABLES
    | LoanTypeEnum.MOTOR
    | LoanTypeEnum.MOTOR_REPAIRS
    | LoanTypeEnum.RENT;
  comments?: string;
}
