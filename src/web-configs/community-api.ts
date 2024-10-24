import queryString from "query-string";
import ky from "ky";
import { auth } from "@/auth";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: object | FormData; // Định dạng data có thể là object hoặc FormData
  headers?: Record<string, string>;
  params?: Record<string, object> | null;
  timeout?: number;
}

// KHỞI TẠO KY INSTANCE CƠ BẢN
let httpCommunity = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (request) => {
        // Kiểm tra và log headers
        const headersObj: Record<string, string> = {};
        request.headers.forEach((value, key) => {
          headersObj[key] = value;
        });
        console.log("Headers being sent: ", headersObj);

        // Thêm Authorization token nếu cần
        // const token = localStorage.getItem("token");
        // const token =
        //   "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoib3JnYW5pemVyIiwiZXhwIjoxNzI5NTc0MTMzLCJpc3MiOiJzZW1pbmFyLW1hbmFnZW1lbnQtYmUiLCJhdWQiOiJzZW1pbmFyLW1hbmFnZW1lbnQtZmUifQ._-yKsd0zZE2TmSF-fvBF7USB3E7Z-auRBgvRnntqgFw";
        // if (token) {
        //   request.headers.set("Authorization", `Bearer ${token}`);
        // }
      },
    ],
  },
});

// SET ACCESS TOKEN CHO CÁC REQUEST
export function setAuthToken(token: string | undefined) {
  if (!token) {
    console.log("Token is undefined, removing Authorization header.");
    httpCommunity = httpCommunity.extend({
      headers: {
        Authorization: undefined,
      },
    });
  } else {
    console.log("Setting Authorization header with token:", token);
    httpCommunity = httpCommunity.extend({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// XỬ LÝ REQUEST VỚI KY INSTANCE
export const communityRequest = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    if (endpoint.startsWith("/")) {
      throw new Error("Endpoint must not begin with a slash");
    }

    const { data, headers, method, params } = options;
    let input: string | Request = "";

    // Xử lý params
    if (endpoint.startsWith("http")) {
      input = new Request(
        endpoint + (params ? "?" + queryString.stringify(params) : "")
      );
    } else {
      input = endpoint + (params ? "?" + queryString.stringify(params) : "");
    }

    // Thiết lập headers động dựa trên loại dữ liệu
    const contentTypeHeader =
      data instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          };

    // Gửi request với dữ liệu tương ứng (FormData hoặc JSON)
    const res = await httpCommunity(input, {
      method: method ?? "GET",
      body: data instanceof FormData ? data : JSON.stringify(data), // Nếu là FormData, sử dụng trực tiếp
      headers: {
        ...contentTypeHeader, // Áp dụng header content type phù hợp
        ...headers,
      },
    }).json();

    return res as T;
  } catch (error) {
    throw error;
  }
};
