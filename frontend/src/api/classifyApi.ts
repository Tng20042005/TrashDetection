import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000', // change if backend is on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function classifyImage(image: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', image);
    try {
        const response = await api.post('/classify/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error classifying image:", error);
        throw error;
    }
}

