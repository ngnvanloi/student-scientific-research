import { z } from "zod";
import {
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  type QueryObserverOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

export type Meta = {
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
  limit: number;
  total_item: number;
  total_page: number;
  total_images?: string[];
};

type Page<I> = {
  data: I[];
  debug: any; // or a more specific type if you know the shape of 'debug'
  message: string;
  meta: Meta;
  success: boolean;
};

export type InfiniteQueryResponse<T> = {
  pageParams: number[];
  pages: Page<T>[];
};

export interface ApiResponseWithArray<T> {
  data: T[];
  meta: Meta;
  message: string;
  success: boolean;
}

export interface ApiResponseWithObject<T> {
  data: T;
  message: string;
  success: boolean;
  request_time: number;
}

// NVL custom
export interface ITokenResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
    expires: string;
    account: Account;
  };
}
// get account
export interface IDataWithTokenResponseFromAPI<T> {
  data: {
    tokenResponse: {
      accessToken: string;
      refreshToken: string;
      expires: string;
      account: T;
    };
  };
  additionalData: any;
  message: string;
  statusCode: number;
  code: string;
}

// for post/get
export interface IDataResponseFromAPI<T> {
  data: T;
  additionalData?: any;
  message: string | any;
  statusCode: number;
  code: string;
}
export interface IResponseFromAPI<> {
  message: string;
  statusCode: number;
  code: string;
}
export interface IListDataResponseFromAPI<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface IDataRetrievedResponseFromAPI<T> {
  data: T[];
  message?: string;
  statusCode: number;
  code: string;
}
export type APIErrorResponse = {
  errorCode: string;
  errorMessage: string;
};
export interface IListPostResponseFromAPI<T> {}
// ==========

export interface ErrorResponse {
  response?: {
    config: {
      baseURL: string;
      url: string;
      params: Record<string, unknown>;
      method: "get" | "post" | "put" | "delete";
    };
    data?: {
      message: string;
      success: false;
      errors?: Record<string, string[]>;
      error_code?: string;
    };
    status: number;
    statusText: string | undefined;
  };
  message?: string;
  request?: unknown;
}

export type ListParams = {
  page?: number;
  limit?: number;
  keyword?: string;
  sort_by?: string;
  enable_format_data?: boolean;
  thumb_size?: string;
  not_in?: string;
  me?: boolean;
};

export type MutationLifeCycle = {
  onMutate?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  onSettled?: () => void;
};

export interface MediaType {
  uri: string;
  type?: string;
  width: number;
  height: number;
  mime: string;
}

export type _QueryOptions = Omit<
  UseInfiniteQueryOptions<any, Error>,
  "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

export const BaseSchema = z.object({
  id: z.number().min(1),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type InfiniteQueryResult<T> = {
  pageParams: number[];
  pages: {
    data: T[];
    debug: any; // or a more specific type if you know the shape of 'debug'
    message: string;
    meta: Meta;
    success: boolean;
  }[];
};

export type VideoMetadata = {
  creationTime: string;
  height: string;
  width: string;
  extension: string;
  duration: string;
  size: string;
};

export type ImageMetadata = {
  ImageWidth: number;
  ImageHeight: number;
  Orientation: number;
  size: number;
  extension: string;
  exif: { [key: string]: string };
};

export type _UseQueryOptions = {
  enabled?: boolean;
  gcTime?: number;
  staleTime?: number;
};

export type UseAppQuery<F, T> = {
  filters: F extends { filters: infer U } ? U : never;
  options?: {
    initialData?: ApiResponseWithObject<T>;
    enabled?: boolean;
    gcTime?: number;
    staleTime?: number;
    placeholderData?: ApiResponseWithObject<T>;
  };
};
export type AppInfiniteData<T> = {
  pages: {
    data: T[];
    meta: Meta;
    message: string;
    success: boolean;
    request_time: number;
  }[];
  pageParams: null[];
};

export type UseAppInfiniteQuery<F, T> = {
  filters: {
    page?: number;
    limit?: number;
    keyword?: string;
    sort_by?: "created_at.desc" | "created_at.asc";
    not_in?: string;
  } & (F extends { filters: infer U } ? U : {});
  options?: Omit<
    UndefinedInitialDataInfiniteOptions<
      ApiResponseWithArray<T>,
      Error,
      {
        pages: ApiResponseWithArray<T>[];
      }
    >,
    | "queryKey"
    | "getNextPageParam"
    | "initialPageParam"
    | "getPreviousPageParam"
    | "initialData"
    | "placeholderData"
  > & {
    initialData?: AppInfiniteData<T>;
    placeholderData?: AppInfiniteData<T>;
  };
};
