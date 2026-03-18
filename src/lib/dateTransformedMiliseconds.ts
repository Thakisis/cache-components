export function dateTransformedMiliseconds(dateRaw: string) {
   const date = new Date(
    dateRaw.endsWith("Z") ? dateRaw : `${dateRaw}Z`,
    ).getTime();
    return date;
}