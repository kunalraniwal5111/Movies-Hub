import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                method: "POST",
                body: newGenre,
            }),
        }),
        //    since we are changing something hence mutation
        updateGenre: builder.mutation({
            query: ({id, updateGenre}) => ({
                url: `${GENRE_URL}/${id}`,
                method: "PUT",
                body: updateGenre
            }),
        }),

        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: "DELETE"
            }),
        }),

        // using query in this case instead of mutation
        fetchGenres: builder.query({
            query: () => `${GENRE_URL}/genres`,
        }),

    }),
});

export const { useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useFetchGenresQuery } = genreApiSlice