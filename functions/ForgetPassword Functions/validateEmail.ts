/* 
    Regex for email validation checks if there is at least one '@' and, after any amount of characters, a proceeding '.'
*/

export function validateEmail(email: string, setIsValidEmail: React.Dispatch<any>) {
    if(email.length == 0) setIsValidEmail('empty');
    else if (!email.match('.[@].+[.].+')) setIsValidEmail('invalid');
    else setIsValidEmail('valid');
}
