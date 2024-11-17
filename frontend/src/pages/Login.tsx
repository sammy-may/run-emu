import React from "react";

const Login = () => {
    return (
        <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700 p-6 space-y-4 px-6 py-8 mx-auto max-w-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white text-left">
                Sign in to your account
            </h1>
            <form action="#" className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="text-white font-medium text-sm mb-2 block text-left"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        className="border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="text-white font-medium text-sm mb-2 block text-left"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••••••"
                        className="border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                id="remember"
                                aria-describedby="remember"
                                className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 ring-offset-gray-800 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-white">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="text-sm font-medium hover:underline text-indigo-500"
                    >
                        Forgot password?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
                >
                    Sign in
                </button>
                <p className="text-sm font-light text-gray-400">
                    Don't have an account yet?{" "}
                    <a
                        href="#"
                        className="font-medium hover:underline text-indigo-500"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
