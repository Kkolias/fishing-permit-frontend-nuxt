

export function formatISODateToString(date: string): string {
    return date.replace(/T.*/, '').split('-').reverse().join('.')
}

export function toLocaleString(date: Date | string): string {
    return new Date(date).toLocaleString()
}
export function toLocaleDateString(date: Date | string): string {
    return new Date(date).toLocaleDateString()
}
export function toLocaleTimeString(date: Date | string): string {
    return new Date(date).toLocaleTimeString()
}