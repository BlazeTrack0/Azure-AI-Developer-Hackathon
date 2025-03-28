import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import AboutPage from './screens/AboutPage';
import MapPage from './screens/MapPage';
import HelpPage from './screens/HelpPage';
import InfoPage from './screens/InfoPage';
import HeatMap from './maps/HeatMap';
import Graphs from './screens/Graphs';
import NavigationMap from './maps/NavigationMap';
import SpreadingMap from './maps/SpreadingMap';
import AllInOneMap from './maps/AllInOneMap';
import LiveFireMap from './maps/LiveFireMap';
import WaterSources from './maps/WaterSources';
import OutpostSources from './maps/OutpostSources';
import IframeTest from './maps/IframeTest';
import WindMapIFrame from './maps/WindMapIFrame'; 
import WeatherMap from './maps/WeatherMap';
import InformationPage from './screens/InformationPage';
import Footer from './components/Footer';
function App() {
  return (
    <>
<BrowserRouter>
    <Header />

    <Routes> 
      <Route path="/" element={<><HomePage /> <Footer /></>} />
      <Route path="/about" element={<><AboutPage /> <Footer /></>} />
      <Route path="/maps" element={<><MapPage /> <Footer /></>} />  
      <Route path="/help" element={<><HelpPage /> <Footer /></>} />
      <Route path="/info" element={<><InfoPage /> <Footer /></>} />
      <Route path="/heat-map" element={<HeatMap />} />
      <Route path="/navigation-map" element={<><NavigationMap /></>} />
      <Route path="/spreading-map" element={<SpreadingMap />} />
      <Route path="/all-in-one" element={<AllInOneMap />} />
      <Route path="/live-fire-map" element={<LiveFireMap />} />
      <Route path="/wind-map" element={<WindMapIFrame />} />
      <Route path="/water-sources-map" element={<WaterSources />} />
      <Route path="/outpost-sources-map" element={<OutpostSources />} />
      <Route path="/iframe-test" element={<IframeTest />} />
      <Route path="/weather-map" element={<WeatherMap />} />
      <Route path="/graphics" element={<><Graphs /> <Footer /></>} />
      <Route path="/information" element={<><InformationPage /> <Footer /></>} />    
    </Routes>


    

    </BrowserRouter>
    


    </> 
  );
}

export default App;
