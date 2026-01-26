import { apiFetch } from "./http";
import { API_ENDPOINTS } from "./endpoints";

// export interface InfoBeforeReportResponse {
//   result: {
//     image: string | null;
//     marka: string;
//     model: string;
//     year: number;
//     power: number;
//   };
// }

export interface InfoBeforeReportSuccess {
  image: string | null;
  marka: string;
  model: string;
  year: number;
  power: number;
}

export interface InfoBeforeReportError {
  ERROR: string;
}

export type InfoBeforeReportResult =
  | InfoBeforeReportSuccess
  | InfoBeforeReportError
  | null;

export interface InfoBeforeReportResponse {
  result: InfoBeforeReportResult;
}

export function isInfoBeforeReportError(
  result: InfoBeforeReportResult
): result is InfoBeforeReportError {
  return Boolean(result && typeof result === "object" && "ERROR" in result);
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