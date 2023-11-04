import api from "../../api/apiSlice";

const galleryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    insertImage: builder.mutation({
      query: (data) => ({
        url: `/gallery/insert-image`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),

    getAllData: builder.query({
      query: () => ({
        url: `/gallery`,
      }),
    }),

    deleteImages: builder.mutation({
      query: (selectedImages) => ({
        url: `/gallery/delete`,
        method: "DELETE",
        body: selectedImages,
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useInsertImageMutation,
  useGetAllDataQuery,
  useDeleteImagesMutation,
} = galleryApi;
