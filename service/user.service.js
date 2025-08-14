import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = process.env.GITHUB_TOKEN;

      if (token) {
        headers.set("Authorization", `token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersService: builder.query({
      query: () => "users",
    }),
    getUserDetailsService: builder.query({
      query: (username) => `users/${username}`,
    }),
    getSearchUsersService: builder.query({
      query: (searchTerm) => `search/users?q=${encodeURIComponent(searchTerm)}`,
    }),
  }),
});

export const {
  useGetUsersServiceQuery,
  useGetUserDetailsServiceQuery,
  useGetSearchUsersServiceQuery,
} = userApi;
