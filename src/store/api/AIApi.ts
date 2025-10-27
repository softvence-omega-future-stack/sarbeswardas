import { baseApi } from "./baseApi";
import {
  AiSendPrompt,
  GetAllSessionResponse,
  PlanResponse,
  SessionHistoryResponse,
  SubscribePlanPayload,
  SubscribePlanResponse,
} from "./types/auth";

interface AiMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

const AIApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSession: builder.mutation<AiMessage, AiSendPrompt>({
      query: (data) => ({
        url: "/ai/send",
        method: "POST",
        body: data,
        skipToast: true,
      }),
      invalidatesTags: ["Session"],
    }),

    getAllSession: builder.query<GetAllSessionResponse, void>({
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
  useSendSessionMutation,
  useGetAllSessionQuery,
  useGetSingleSessionQuery,
  useDeleteSessionMutation,
  useGetAllPlanQuery,
  useBuyPlanMutation,
} = AIApi;

export default AIApi;
