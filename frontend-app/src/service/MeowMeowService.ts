class MeowMeowService {
    private static BASE_URL: string = "http://localhost:8080/meow-meow";

    public static async getMeowMeows(): Promise<Response> {
        try {
            const response = await fetch(this.BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch MeowMeows :'-(`)
        }
    }
};

export default MeowMeowService