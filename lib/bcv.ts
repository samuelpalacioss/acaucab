'use server'

export async function getBCV() {
    try {
        const response = await fetch('https://pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=default&rounded_price=true');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}