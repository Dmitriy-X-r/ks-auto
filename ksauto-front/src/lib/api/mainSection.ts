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
      count: string;
      count_text: string;
    };

    block2: {
      title: string;
      title_url1: string;
      title_url1_text: string;
      title_url1_img: string;

      title_url2: string;
      title_url2_text: string;
      title_url2_img: string;

      title_url3: string;
      title_url3_text: string;
      title_url3_img: string;

      title_url4: string;
      title_url4_text: string;
      title_url4_img: string;
    };

    block3: {
      list: Array<{ url: string; name: string }>;
      all: string;
    };
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