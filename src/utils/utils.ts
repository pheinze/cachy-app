import { Decimal } from 'decimal.js';

export function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export function parseDecimal(value: string | number | null | undefined): Decimal {
    if (value === null || value === undefined) {
        return new Decimal(0);
    }
    // Convert to string to handle both numbers and strings uniformly
    const stringValue = String(value).replace(',', '.').trim();

    // If the string is empty after trimming, it's a 0.
    if (stringValue === '') {
        return new Decimal(0);
    }

    // Check if the result is a finite number
    if (!isFinite(Number(stringValue))) {
        return new Decimal(0);
    }

    // If all checks pass, create the new Decimal
    return new Decimal(stringValue);
}

export function formatDynamicDecimal(value: Decimal | string | number | null | undefined, maxPlaces = 4): string {
    if (value === null || value === undefined) return '-';

    const dec = new Decimal(value);
    if (dec.isNaN()) return '-';

    // Format to a fixed number of decimal places, then remove trailing zeros
    const formatted = dec.toFixed(maxPlaces);

    // If it's a whole number after formatting, return it without decimals.
    if (new Decimal(formatted).isInteger()) {
        return new Decimal(formatted).toFixed(0);
    }

    // Otherwise, remove only the trailing zeros and the decimal point if it's the last char
    return formatted.replace(/0+$/, '').replace(/\.$/, '');
}
