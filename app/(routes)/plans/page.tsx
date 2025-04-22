import React from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const subscriptions = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        badge: {
            text: 'Free Forever',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        features: [
            '3 users included',
            '1GB of storage',
            'Basic email support',
            'Community forum access'
        ],
        button: {
            bgColor: 'bg-green-600',
            hoverBgColor: 'hover:bg-green-500',
            focusRingColor: 'focus:ring-green-600',
            textColor: 'text-white'
        }
    },
    {
        id: 'starter',
        name: 'Starter',
        price: 20,
        badge: {
            text: 'Popular',
            bgColor: 'bg-indigo-100',
            textColor: 'text-indigo-800'
        },
        features: [
            '10 users included',
            '2GB of storage',
            'Email support',
            'Help center access'
        ],
        button: {
            bgColor: 'bg-indigo-600',
            hoverBgColor: 'hover:bg-indigo-500',
            focusRingColor: 'focus:ring-indigo-600',
            textColor: 'text-white'
        }
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 30,
        badge: {
            text: 'Best Value',
            bgColor: 'bg-white',
            textColor: 'text-indigo-600'
        },
        features: [
            '20 users included',
            '5GB of storage',
            'Priority email support',
            'Help center access',
            'Phone support',
            'Community access'
        ],
        button: {
            bgColor: 'bg-white',
            hoverBgColor: 'hover:bg-indigo-50',
            focusRingColor: 'focus:ring-white',
            textColor: 'text-indigo-600'
        },
        isPro: true
    }
]

const page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link 
                    href="/dashboard" 
                    className="mb-8 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose Your Plan
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Select the perfect plan for your team's needs
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {subscriptions.map((subscription) => (
                        <div 
                            key={subscription.id}
                            className={`relative flex flex-col rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                subscription.isPro 
                                    ? 'bg-indigo-600' 
                                    : 'bg-white ring-1 ring-gray-200 hover:ring-indigo-200'
                            }`}
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                                <span className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${subscription.badge.bgColor} ${subscription.badge.textColor}`}>
                                    {subscription.badge.text}
                                </span>
                            </div>
                            <div className="text-center">
                                <h2 className={`text-2xl font-bold ${subscription.isPro ? 'text-white' : 'text-gray-900'}`}>
                                    {subscription.name}
                                </h2>
                                <p className="mt-4">
                                    <span className={`text-4xl font-bold ${subscription.isPro ? 'text-white' : 'text-gray-900'}`}>
                                        ${subscription.price}
                                    </span>
                                    <span className={`text-base font-medium ${subscription.isPro ? 'text-indigo-100' : 'text-gray-500'}`}>
                                        /month
                                    </span>
                                </p>
                            </div>

                            <ul className="mt-8 space-y-4">
                                {subscription.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check className={`h-5 w-5 ${subscription.isPro ? 'text-white' : 'text-indigo-600'}`} />
                                        <span className={`ml-3 ${subscription.isPro ? 'text-indigo-100' : 'text-gray-600'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-8">
                                <Link 
                                    href="#" 
                                    className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        subscription.isPro 
                                            ? `${subscription.button.bgColor} ${subscription.button.textColor} ${subscription.button.hoverBgColor} focus:ring-white focus:ring-offset-indigo-600`
                                            : `${subscription.button.bgColor} ${subscription.button.textColor} ${subscription.button.hoverBgColor} focus:ring-indigo-600 focus:ring-offset-2`
                                    }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page