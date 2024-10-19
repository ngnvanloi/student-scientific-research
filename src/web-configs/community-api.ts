import queryString from "query-string";
import ky from "ky";
import { auth } from "@/auth";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  headers?: Record<string, string>;
  params?: Record<string, object> | null;
  timeout?: number;
}
// KHỞI TẠO CẤU TRÚC MỘT REQUEST
let httpCommunity = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
});
// SET LẠI ACCESS TOKEN CHO CURRENT USER
export function setAuthToken(token: string | undefined) {
  if (!token) {
    httpCommunity = httpCommunity.extend({
      prefixUrl: process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL,
      headers: {
        Authorization: undefined,
      },
    });
  } else {
    httpCommunity = httpCommunity.extend({
      prefixUrl: process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// export const refreshAndStoreBranchToken = async () => {
//   const session = await auth();
//   try {
//     setAuthToken(undefined);
//     const res = session?.user?.refresh_token;

//     setAuthToken(res.data.branch_token);
//   } catch (error) {
//     console.error("refreshAndStoreBranchToken error ", error);
//   }
// };

export const communityRequest = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    if (endpoint && endpoint.startsWith("/")) {
      throw new Error("Endpoint must not begin with a slash");
    }

    const { data, headers, method, params } = options;
    let input: string | Request = "";

    if (endpoint.startsWith("http")) {
      input = new Request(
        endpoint + (params ? "?" + queryString.stringify(params) : "")
      );
    } else {
      input = endpoint + (params ? "?" + queryString.stringify(params) : "");
    }

    const res = await httpCommunity(input, {
      method: method ?? "GET",
      json: data,
      headers: headers ?? {},
    }).json();

    return res as T;
  } catch (error) {
    throw error;
  }
};
