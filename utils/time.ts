

export function formatISODateToString(date: string): string {
    return date.replace(/T.*/, '').split('-').reverse().join('.')
}