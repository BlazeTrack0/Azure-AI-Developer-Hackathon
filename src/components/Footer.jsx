import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <div className="max-w-6xl mx-auto px-8 lg:px-12">
                <div className="mt-16 py-8 border-t border-gray-800">
                    <div className="grid grid-cols-3 gap-8 text-gray-400">
                        <div>
                            <h3 className="text-black font-bold mb-4">MAPS</h3>
                            <ul className="font-bold space-y-2">
                                <li>
                                    <Link to="/live-fire-map" className="hover:text-blue-600 transition-colors">
                                        LIVE FIRE MAP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/heat-map" className="hover:text-blue-600 transition-colors">
                                        HEAT MAP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/spreading-map" className="hover:text-blue-600 transition-colors">
                                        SPREADING MAP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/wind-map" className="hover:text-blue-600 transition-colors">
                                        WIND MAP
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-black font-bold mb-4">RESOURCES</h3>
                            <ul className="font-bold space-y-2">
                                <li>
                                    <Link to="/water-sources-map" className="hover:text-blue-600 transition-colors">
                                        WATER SOURCES
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/outpost-sources-map" className="hover:text-blue-600 transition-colors">
                                        OUTPOST LOCATIONS
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/weather-map" className="hover:text-blue-600 transition-colors">
                                        WEATHER MAP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/graphics" className="hover:text-blue-600 transition-colors">
                                        ANALYTICS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-black font-bold mb-4">INFORMATION</h3>
                            <ul className="font-bold space-y-2">
                                <li>
                                    <Link to="/about" className="hover:text-blue-600 transition-colors">
                                        ABOUT US
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/help" className="hover:text-blue-600 transition-colors">
                                        HELP CENTER
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/information" className="hover:text-blue-600 transition-colors">
                                        FIRE INFORMATION
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/info" className="hover:text-blue-600 transition-colors">
                                        RESOURCES
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
