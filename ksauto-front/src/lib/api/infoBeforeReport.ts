import { apiFetch } from "./http";
import { API_ENDPOINTS } from "./endpoints";

export interface InfoBeforeReportResponse {
  result: {
    image: string | null;
    marka: string;
    model: string;
    year: number;
    power: number;
  };
}

export function getInfoBeforeReport(searchPhrase: string) {
  return apiFetch<InfoBeforeReportResponse>(
    API_ENDPOINTS.info_before_report,
    {
      params: {
        device_: "next",
        app_version: "0.9.0",
        SEARCH_PHRASE: searchPhrase,
      },
    }
  );
}