
import newData from "../commons/newData.json";
import axios from "axios";


var cachedData; // Önbellek, başta boş
 // Verinin yüklenip yüklenmediğini kontrol eder



export const fetchData = () => {
    // Eğer önbellek doluysa direkt onu döndür
    if (cachedData) {
        console.log("Önbellekten veri döndü.");
        console.log(cachedData, "cachedData")
        return [cachedData];
    } else {
        console.log("Önbellekte veri yok, yeni veri yükleniyor...");
        console.log(newData, "newData")
        return newData;
    }

};



export const fetchAllSources = async (latitude,longitude) => {
        try {
            const response = await axios.post('https://azure-backend-116334440043.us-central1.run.app/live-fire/all', {
                latitude: latitude,
                longitude: longitude
            });
            console.log('Tüm kaynakları verisi:', response.data);
            cachedData = response.data;

            return [response.data];
        } catch (error) {
            console.error('Tüm kaynakları verisi alınırken hata oluştu:', error);
            return null;
        }
      };






