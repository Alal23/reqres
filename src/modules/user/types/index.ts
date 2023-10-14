export interface UserAddProps {
  name: string;
  job: string;
}

export interface UserId {
  id: number;
}

export interface UserUpdateProps extends UserId, UserAddProps {}
