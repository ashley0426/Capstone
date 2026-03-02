export interface FormErrorsUpdatePassword {
    password: {
        sufficentLength: boolean;
        hasLetter: boolean;
        hasNumber: boolean;
        hasCapital: boolean;
        // hasSpecialChar: boolean; Is this perhaps overkill for old people.
    },
    passwordValid: string | null;
    confirmPassword: string | null;
    oldPassword: string | null;
}
