// Converting dd-mm-yyyy format to age
export function getAgeRepresentation(dateString: string): string {
    // Parse the input date string
    const [day, month, year] = dateString.split('-');

    // Create Date objects for birthdate and current date
    const birthDate = new Date(+year, +month - 1, +day);
    const currentDate = new Date();

    // Calculate the difference between dates
    const diffMs = currentDate.getTime() - birthDate.getTime();
    const ageDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calculate years, months, and days
    const years = Math.floor(ageDays / 365);
    const remainingDays = ageDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    // Adjust for leap years and months with fewer days
    const adjustedMonths = months + Math.floor(days / 28);
    const adjustedDays = days % 28;

    // Round up the age to the nearest whole number
    const roundedAge = Math.ceil(years);

    // Format the age representation
    // return `${roundedAge} years ${adjustedMonths} months ${adjustedDays} days old`;
    return `${roundedAge}`;
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Converting age to dd-mm-yyyy format
export function ageToString(age: number): string {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
    return formatDate(birthDate);
}

