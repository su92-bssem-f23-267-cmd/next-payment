import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank You',
    description: 'Your payment was successful.',
};

export default function ThankYouPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <svg
                    className="w-16 h-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    ></path>
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. Your order has been successfully processed.
                You will receive a confirmation email shortly.
            </p>
            <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
                Back to Home
            </Link>
        </div>
    );
}
