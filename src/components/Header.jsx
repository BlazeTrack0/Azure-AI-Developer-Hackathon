import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-[22px] font-bold text-[#1a237e] hover:text-blue-600 transition-colors duration-300">
                            Blaze Track
                        </Link>
                        
                        <nav className="hidden sm:block">
                            <ul className="flex space-x-8">
                                <li>
                                    <Link 
                                        to="/maps" 
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                    >
                                        Maps
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/graphics" 
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                    >
                                        Graphics
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/about" 
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/help" 
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                    >
                                        Help
                                    </Link>
                                </li>

                                <li>
                                    <Link 
                                        to="/information" 
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                    >
                                        Information
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Mobil menü butonu */}
                    <div className="sm:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil menü (varsayılan olarak gizli) */}
            <div className="hidden sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/maps">Maps</Link>
                    <Link to="/help">Help</Link>
                    <Link to="/graphics">Graphics</Link>
                    <Link to="/information">Information</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
