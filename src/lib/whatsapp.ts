import { CartItem } from "@/context/CartContext";

export interface CheckoutData {
    name: string;
    countryCode: string;
    phone: string;
    deliveryType: "delivery" | "pickup";
    address?: string;
    referencias?: string;
    paymentMethod: string;
    notes?: string;
    cartTotal: number;
}

// Define the WhatsApp phone number here (include country code without + sign)
const RESTAURANT_WHASTAPP_NUMBER = "2381953443"; // Example MX number

export function generateWhatsAppLink(cart: CartItem[], data: CheckoutData, language: 'es' | 'en'): string {
    let message = language === 'es' ? `*¡Hola! Quiero hacer un pedido para ${data.deliveryType === 'delivery' ? 'Envío a domicilio' : 'Recoger en sucursal'}*\n\n` : `*Hi! I want to place an order for ${data.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}*\n\n`;

    message += language === 'es' ? `*Datos del Cliente:*\n` : `*Customer Details:*\n`;
    message += language === 'es' ? `- Nombre: ${data.name}\n` : `- Name: ${data.name}\n`;
    message += language === 'es' ? `- Teléfono: ${data.countryCode} ${data.phone}\n` : `- Phone: ${data.countryCode} ${data.phone}\n`;
    if (data.deliveryType === 'delivery' && data.address) {
        message += language === 'es' ? `- Dirección: ${data.address}\n` : `- Address: ${data.address}\n`;
        if (data.referencias) {
            message += language === 'es' ? `- Referencias: ${data.referencias}\n` : `- References: ${data.referencias}\n`;
        }
    }
    message += language === 'es' ? `- Método de pago: ${data.paymentMethod}\n\n` : `- Payment method: ${data.paymentMethod}\n\n`;

    message += language === 'es' ? `*------------ MI PEDIDO ------------*\n\n` : `*------------- MY ORDER -------------*\n\n`;

    cart.forEach((item) => {
        const basePrice = language === 'en' ? (item.product.priceUSD || item.product.price) : item.product.price;
        const extrasTotal = item.selectedExtras.reduce((sum, extra) => {
            const extraPrice = language === 'en' ? (extra.priceUSD || extra.price || 0) : (extra.price || 0);
            return sum + extraPrice;
        }, 0);
        const itemTotal = (basePrice + extrasTotal) * item.quantity;

        const currencySymbol = language === 'es' ? 'MXN ' : 'USD ';

        message += `* ${item.quantity}x ${item.product.name[language]}* (${currencySymbol}${itemTotal.toFixed(2)})\n`;

        if (item.selectedExtras.length > 0) {
            const extrasNames = item.selectedExtras.map(e => typeof e.name === 'string' ? e.name : e.name[language]).join(', ');
            message += language === 'es' ? `   + Extras: ${extrasNames}\n` : `   + Extras: ${extrasNames}\n`;
        }

        if (item.removedIngredients.length > 0) {
            const removedNames = item.removedIngredients.join(', ');
            message += language === 'es' ? `   - Sin: ${removedNames}\n` : `   - Without: ${removedNames}\n`;
        }

        if (item.notes) {
            message += language === 'es' ? `   - Notas: _${item.notes}_\n` : `   - Notes: _${item.notes}_\n`;
        }

        message += `\n`;
    });

    message += `*-----------------------------------*\n\n`;

    if (data.notes) {
        message += language === 'es' ? `*Notas Generales del Pedido:*\n_${data.notes}_\n\n` : `*General Order Notes:*\n_${data.notes}_\n\n`;
    }

    const totalCurrency = language === 'es' ? 'MXN' : 'USD';
    message += language === 'es' ? `*TOTAL A PAGAR: ${totalCurrency} ${data.cartTotal.toFixed(2)}*\n\n` : `*TOTAL TO PAY: ${totalCurrency} ${data.cartTotal.toFixed(2)}*\n\n`;
    message += language === 'es' ? `¡Gracias! Quedo en espera de confirmación.` : `Thank you! Waiting for confirmation.`;

    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${RESTAURANT_WHASTAPP_NUMBER}?text=${encodedMessage}`;
}
