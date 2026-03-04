"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { generateWhatsAppLink, CheckoutData } from "@/lib/whatsapp";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const { language } = useLanguage();
    const { addToast } = useToast();

    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        countryCode: "+52",
        phone: "",
        deliveryType: "delivery",
        address: "",
        referencias: "",
        paymentMethod: "Efectivo al recibir",
        notes: ""
    });

    // Auto-update default country code when language changes ONLY if the user hasn't typed a phone yet
    useEffect(() => {
        if (!formData.phone) {
            setFormData(prev => ({
                ...prev,
                countryCode: language === 'en' ? '+1' : '+52'
            }));
        }
    }, [language, formData.phone]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">{language === 'es' ? 'No hay productos en tu pedido' : 'Your order is empty'}</h1>
                <p className="text-slate-500 mb-8">{language === 'es' ? 'Agrega algo delicioso desde nuestro menú para poder continuar.' : 'Add something delicious from our menu to continue.'}</p>
                <Link href="/" className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-colors">
                    {language === 'es' ? 'Explorar Menú' : 'Explore Menu'}
                </Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "name") {
            // Only allow letters, spaces, and basic accented characters
            const sanitizedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
            return;
        }

        if (name === "phone") {
            // Only allow numbers, max 10 digits
            const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.phone.length < 10) {
            const errorMsg = language === 'es' ? "El número de teléfono debe tener 10 dígitos." : "Phone number must be 10 digits.";
            addToast(errorMsg, "error");
            return;
        }

        const checkoutData: CheckoutData = {
            name: formData.name,
            countryCode: formData.countryCode,
            phone: formData.phone,
            deliveryType: formData.deliveryType as "delivery" | "pickup",
            address: formData.address,
            referencias: formData.referencias,
            paymentMethod: formData.paymentMethod,
            notes: formData.notes,
            cartTotal
        };

        const link = generateWhatsAppLink(cart, checkoutData, language);

        // Clear cart after sending to whatsapp
        clearCart();
        // Use window.open to open whatsapp in new tab
        window.open(link, '_blank');
        // Redirect to home
        router.push("/");
    };

    return (
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/20 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 text-center">{language === 'es' ? 'Finaliza tu Pedido' : 'Complete Your Order'}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Checkout Form */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
                        <h2 className="text-xl font-bold mb-6 pb-4 border-b">{language === 'es' ? 'Datos de Entrega' : 'Delivery Details'}</h2>

                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Nombre Completo *' : 'Full Name *'}</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                        placeholder={language === 'es' ? "Ej. Juan Pérez" : "Ex. John Doe"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Teléfono *' : 'Phone *'}</label>
                                    <div className="relative flex items-center w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            className="bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-2 py-3 text-slate-600 dark:text-slate-300 font-medium text-sm h-full outline-none cursor-pointer appearance-none text-center min-w-[60px]"
                                        >
                                            <option value="+52">🇲🇽 +52</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+34">🇪🇸 +34</option>
                                            <option value="+54">🇦🇷 +54</option>
                                            <option value="+57">🇨🇴 +57</option>
                                            <option value="+56">🇨🇱 +56</option>
                                        </select>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            maxLength={10}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-transparent px-4 py-3 outline-none transition-all placeholder:text-slate-400"
                                            placeholder={language === 'es' ? "555 123 4567" : "555 123 4567"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Tipo de Entrega *' : 'Delivery Type *'}</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.deliveryType === 'delivery' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400'}`}>
                                        <input type="radio" name="deliveryType" value="delivery" checked={formData.deliveryType === 'delivery'} onChange={handleChange} className="hidden" />
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        <span className="font-medium">{language === 'es' ? 'Envío a domicilio' : 'Delivery'}</span>
                                    </label>
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.deliveryType === 'pickup' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400'}`}>
                                        <input type="radio" name="deliveryType" value="pickup" checked={formData.deliveryType === 'pickup'} onChange={handleChange} className="hidden" />
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                        <span className="font-medium">{language === 'es' ? 'Recoger en sucursal' : 'Pickup'}</span>
                                    </label>
                                </div>
                            </div>

                            {formData.deliveryType === 'delivery' && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Dirección de Envío *' : 'Delivery Address *'}</label>
                                        <input
                                            required={formData.deliveryType === 'delivery'}
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                            placeholder={language === 'es' ? "Calle, número, colonia..." : "Street, number, neighborhood..."}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Referencias del domicilio (Opcional)' : 'Address References (Optional)'}</label>
                                        <textarea
                                            name="referencias"
                                            value={formData.referencias}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                            placeholder={language === 'es' ? "Ej. Casa blanca con portón negro, entre calle X y calle Y..." : "Ex. White house with black gate..."}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Método de Pago *' : 'Payment Method *'}</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value={language === 'es' ? "Efectivo al recibir" : "Cash on delivery"}>{language === 'es' ? 'Efectivo al recibir' : 'Cash on delivery'}</option>
                                    <option value={language === 'es' ? "Tarjeta al recibir (Llevar terminal)" : "Card on delivery (Bring terminal)"}>{language === 'es' ? 'Tarjeta al recibir (Terminal)' : 'Card on delivery (Terminal)'}</option>
                                    <option value={language === 'es' ? "Transferencia / Sinpe" : "Wire Transfer"}>{language === 'es' ? 'Transferencia Electrónica' : 'Wire Transfer'}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{language === 'es' ? 'Notas Adicionales (Opcional)' : 'Additional Notes (Optional)'}</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    placeholder={language === 'es' ? "Ej. Traer cambio de $500, tocar el timbre 2 veces..." : "Ex. Bring change for $500..."}
                                    rows={3}
                                />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-slate-900 text-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-slate-800">{language === 'es' ? 'Resumen de tu Pedido' : 'Order Summary'}</h2>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-700">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <span className="font-bold text-primary">{item.quantity}x</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">{item.product.name[language]}</p>
                                            {(item.selectedExtras.length > 0 || item.removedIngredients.length > 0) && (
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                                    {item.selectedExtras.map(e => `+${typeof e.name === 'string' ? e.name : e.name[language]}`).join(', ')}
                                                    {item.selectedExtras.length > 0 && item.removedIngredients.length > 0 && ', '}
                                                    {item.removedIngredients.map(i => `-${i}`).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <span className="font-semibold text-sm">
                                            {new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format((language === 'en' ? (item.product.priceUSD || item.product.price) + item.selectedExtras.reduce((s, e) => s + (e.priceUSD || e.price || 0), 0) : item.product.price + item.selectedExtras.reduce((s, e) => s + (e.price || 0), 0)) * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-400">Subtotal</span>
                                    <span>{new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format(cartTotal)}</span>
                                </div>
                                {formData.deliveryType === 'delivery' && (
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-slate-400">{language === 'es' ? 'Costo de Envío' : 'Shipping Cost'}</span>
                                        <span className="text-green-400 text-sm font-medium">{language === 'es' ? 'Por calcular en WhatsApp' : 'To be calculated on WhatsApp'}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
                                    <span className="text-lg font-bold">{language === 'es' ? 'Total a pagar' : 'Total'}</span>
                                    <span className="text-2xl font-bold text-primary">{new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format(cartTotal)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/30"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" /></svg>
                                <span>{language === 'es' ? 'Enviar Pedido por WhatsApp' : 'Send Order via WhatsApp'}</span>
                            </button>
                            <p className="text-xs text-slate-400 text-center mt-4">
                                {language === 'es' ? 'Serás redirigido a WhatsApp para confirmar los detalles finales y el tiempo de entrega.' : 'You will be redirected to WhatsApp to confirm final details and delivery time.'}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
