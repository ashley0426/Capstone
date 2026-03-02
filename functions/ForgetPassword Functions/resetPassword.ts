import axios from "axios";

export async function resetPassword(email: string) {

    try {
        const response = await axios.post('https://plusplaygroundhub-6c6uz4csla-ts.a.run.app/user/reset/',
            {
                email: email,

            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.status;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status;
            console.error('Error fetching data:', error.message, 'Status code:', statusCode);

            return statusCode;
        }
    }
}