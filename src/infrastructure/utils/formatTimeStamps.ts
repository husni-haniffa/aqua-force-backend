type AnyObject = Record<string, any>

/**
 * Recursively formats all Date fields in an object or array of objects
 * @param data - object, array of objects, or single object
 * @param fields - optional list of fields to format (default: createdAt, updatedAt)
 * @param locale - locale string for formatting (default: en-GB)
 */
export function formatTimestamps(
    data: AnyObject | AnyObject[],
    fields: string[] = ["createdAt", "updatedAt"],
    locale = "en-GB"
): any {
    if (Array.isArray(data)) {
        return data.map(item => formatTimestamps(item, fields, locale))
    }

    const formatted: AnyObject = { ...data._doc || data } // support Mongoose document

    fields.forEach(field => {
        if (formatted[field] && formatted[field] instanceof Date) {
            formatted[field] = formatted[field].toLocaleString(locale, {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        }
    })

    return formatted
}
