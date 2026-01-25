import { apiFetch } from "./http";
import { API_ENDPOINTS } from "./endpoints";

export interface MainSectionResponse {
  result: {
    block1: {
      title: string;
      sub_title: string;
      title_url1: string;
      title_url1_text: string;
      title_url2: string;
      title_url2_text: string;
      count: string;       // число в строке
      count_text: string;  // слово, например "предложений"
    };
    // block2 и block3 пока не нужны
  };
}

export function getMainSection() {
    return apiFetch<MainSectionResponse>(
        API_ENDPOINTS.main_sections,
        {
            params: {
                device_: "next",
                app_version: "0.9.0",
            },
        }
    );
}