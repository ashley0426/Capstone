export interface FormErrors {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: {
        sufficentLength: boolean;
        hasLetter: boolean;
        hasNumber: boolean;
        hasCapital: boolean;
        // hasSpecialChar: boolean; Is this perhaps overkill for old people.
    },
    passwordValid: string | null;
    confirmPassword: string | null;
    postcode: string | null;
    age: string | null;
    country: string | null;
    gender: string | null;
}
export interface UpdatePageFormErrors {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    postcode: string | null;
    age: string | null;
    country: string | null;
    gender: string | null;
}
export interface RegistrationResponse {
    data: {
        email: string;
        token: {
            id_token: string;
            refresh: string;
        };
        uid: string;
        verified: boolean;
    };
    response: {
        message: string;
        phrase: string;
        status: number;
        timestamp: number; // Assuming it's a Unix timestamp
    };
}

export type FormName = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'postcode' | 'age' | 'gender' | 'country';