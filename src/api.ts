interface ApiResponse {
    success: boolean;
    error?: string;
    [key: string]: any;
}

async function requestApi(method: string, path: string, headers?: Record<string, string>, body?: string): Promise<ApiResponse> {
    try {
        return await fetch(
            'http://localhost:8080/api/' + path,
            { method, headers, body }
        ).then(res => res.json());
    }
    catch {
        return {
            success: false,
            error: 'Network error'
        };
    }
}

export async function getApi(path: string) {
    // return requestApi('GET', path);
    return fakeRequestApi('GET', path);
}

export async function postApi(path: string, body: object) {
    // return requestApi('POST', path, { 'Content-Type': 'application/json' }, JSON.stringify(body));
    return fakeRequestApi('POST', path, { 'Content-Type': 'application/json' }, JSON.stringify(body));
}


// Fake API
async function fakeRequestApi(method: string, path: string, headers?: Record<string, string>, body?: string): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    switch (path) {
        case 'popular':
            return {
                success: true,
                popular: Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    title: `Фильм ${i + 1}`,
                    poster: `https://placehold.co/160x240.png?text=Фильм+${i + 1}`
                }))
            }
        case 'recommends':
            return {
                success: true,
                recommends: Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    title: `Фильм ${i + 1}`,
                    poster: `https://placehold.co/160x240.png?text=Фильм+${i + 1}`
                }))
            }
        default:
            return {
                success: false,
                error: 'Not found'
            }
    }
};