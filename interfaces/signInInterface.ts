export interface UserDetails {
    country: string;
    dob: string;
    email: string;
    email_consent: boolean;
    first_name: string;
    last_name: string;
    gender: string;
    interests: string[];
    postcode: number;
    permissions: {
        delete_others: boolean;
        update_others: boolean;
        update_self: boolean;
    };
}
export interface VerificationToken {
    displayName?: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
}

interface verificationVerified {
    aud: string;
    auth_time: number;
    email: string;
    email_verified: boolean;
    exp: number;
    firebase: {
        identities: {
            email: string[];
        };
        sign_in_provider: string;
    };
    iat: number;
    iss: string;
    sub: string;
    uid: string;
    user_id: string;
}

interface Meta {
    phrase: string;
    status: number;
    timestamp: number;
}

export interface LoginResponseData {
    data: {
        details: UserDetails;
        verification: {
            token: VerificationToken;
            verified: verificationVerified;
        };
    };
    response: Meta;
}