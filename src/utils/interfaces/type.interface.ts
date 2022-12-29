import { User } from 'src/users/entities/user.entity';

export type UrlQuery = {
  paginate?: string;
  limit?: number;
  page?: number;
  type?: number;
  query?: string;
};

export type PaginateType<T> = {
  docs: Array<T>;
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: null | number;
  nextPage?: null | number;
};

export type IncludeIdSchema<T> = T & { _id?: string };

export type RequestUser = Request & {
  user: User;
};

export type iLoginDetails = {
  email: string;
  password: string;
  userType: number;
  userTypeId: string;
};

// export type MailBody = {
//   subject: string;
//   to: string | string[];
//   body: string;
// };
