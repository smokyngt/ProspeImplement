import { format } from 'date-fns';

/**
 * Formats a date to a readable string.
 * @param date - The date to format.
 * @param dateFormat - The format string (default: 'yyyy-MM-dd').
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, dateFormat: string = 'yyyy-MM-dd'): string => {
    return format(date, dateFormat);
};

/**
 * Formats a string to title case.
 * @param str - The string to format.
 * @returns The formatted title case string.
 */
export const formatTitleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Formats a number to a currency string.
 * @param amount - The amount to format.
 * @param currency - The currency symbol (default: '$').
 * @returns The formatted currency string.
 */
export const formatCurrency = (amount: number, currency: string = '$'): string => {
    return `${currency}${amount.toFixed(2)}`;
};