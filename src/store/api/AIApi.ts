import { baseApi } from "./baseApi";
import {
  AiSendPrompt,
  AllSessionResponse,
  PlanResponse,
  SessionHistoryResponse,
  SubscribePlanPayload,
  SubscribePlanResponse,
  UpdateSessionPayload,
} from "./types/auth";
import { AiResponse, ImageApiResponse } from "./types/profile";

const AIApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSessionForText: builder.mutation<AiResponse, AiSendPrompt>({
      query: (data) => ({
        url: "/ai/send",
        method: "POST",
        body: data,
        skipToast: true,
      }),
      invalidatesTags: ["Session"],
    }),
    sendSessionForImage: builder.mutation<ImageApiResponse, AiSendPrompt>({
      query: (data) => ({
        url: "/ai/generate-image",
        method: "POST",
        body: data,
        skipToast: true,
      }),
      invalidatesTags: ["Session"],
    }),

    getAllSession: builder.query<AllSessionResponse, void>({
      query: () => ({
        url: "/ai/sessions",
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    getSingleSession: builder.query<SessionHistoryResponse, string>({
      query: (session_id) => ({
        url: `/ai/session/${session_id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Session", id }],
    }),

    deleteSession: builder.mutation<void, string>({
      query: (session_id) => ({
        url: `/ai/session/${session_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
    updateSession: builder.mutation<void, UpdateSessionPayload>({
      query: (data) => ({
        url: `/ai/session/update-title`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    getAllPlan: builder.query<PlanResponse, void>({
      query: () => ({
        url: "/plan/all",
        method: "GET",
      }),
    }),
    buyPlan: builder.mutation<SubscribePlanResponse, SubscribePlanPayload>({
      query: (subscribedPlanId) => ({
        url: "/plan/checkout",
        method: "POST",
        body: subscribedPlanId,
        skipToast: true,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useSendSessionForTextMutation,
  useSendSessionForImageMutation,
  useGetAllSessionQuery,
  useGetSingleSessionQuery,
  useLazyGetSingleSessionQuery,
  useDeleteSessionMutation,
  useUpdateSessionMutation,
  useGetAllPlanQuery,
  useBuyPlanMutation,
} = AIApi;

export default AIApi;
