import axios from "axios";

export interface Item {
    items: Array<{ fileUrl: string }>;
}

export async function fetchData(): Promise<Item | undefined>{
        const INPUT_API_ENDPOINT: string =
            "https://rest-test-eight.vercel.app/api/test";
        const response = await axios.get<Item>(INPUT_API_ENDPOINT);
        return response.data;
}
