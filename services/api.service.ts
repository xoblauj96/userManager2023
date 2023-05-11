
export class APIService {
    static okRes(data: any, message: string = 'OK', status: number = 1) {
        return { data, message, status }
    }

    static errRes(data: any, message: string = 'Error', status: number = 0) {
        return { data, message, status }
    }

    static validateSuperAdmin(k: string): boolean {
        if (k === Keys.superadminkey) return true;
        else return false;
    }
}

enum Keys {
    jwtKey = 'Dx4YsbptOGuHmL94qdC2YAPqsUFpzJkc',
    superadminkey = '9F58A83B7628211D6E739976A3E3A'
}