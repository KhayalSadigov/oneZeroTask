function calculateDiscount(menuItem, date) {
    // http://localhost:2121/api/menu/70?date=2024-09-19T11:00:00.000Z
    // Nümunə request üçün link

    const currentDate = new Date(date);
    const { rate } = menuItem;
  
    if (!rate.isEnabled) {
      // Endirim aktiv deyilsə, normal qiymət qaytar
      return menuItem.priceSell;
    }
  
    // Endirim tarixlərinin götürülməsi
    const discountStartDate = new Date(rate.schedule.from);
    const discountEndDate = new Date(rate.schedule.to);
  
    if (currentDate < discountStartDate || currentDate > discountEndDate) {
      // Tarix endirim aralığında deyilsə, normal qiymət qaytar 
      return menuItem.priceSell;
    }
  
    // Haftanın gününü ve saatleri kontrol et
    const dayOfWeek = currentDate.getDay(); // sunday=0, monday=1, ... saturday=6
    //Komputerdə saat problemi var idi deyə qarışır ona görədə -4 yazılıb    
    const hourOfDay = currentDate.getHours()-4 ;// 0 , 1 , 2 , ... 23 


    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayOfWeek];
    
    if (!rate.schedule.weekdays[weekday].isWorking) {
      // Verilmiş date , həftənin günündə endirim qəbul etmirsə normal qiymət qaytarılır
      return menuItem.priceSell;
    }
  
    // Günün saat aralığını kontrol edilməsi
    const { from, to } = rate.schedule.weekdays[weekday]; //00:00 , 01:00 , 02:00 ... 23:00
    fromTime = from[0]==0 ? from[1] : from[0] + from[1] ;// Saat 01:00 və 11:00 kimi halları nəzərə alaq(İlk rəqəm 0 olma ehtimalı)
    toTime = to[0]==0 ? to[1] : to[0] + to[1] ;// Saat 01:00 və 11:00 kimi halları nəzərə alaq(İlk rəqəm 0 olma ehtimalı)
    
    if (fromTime && toTime && (hourOfDay < fromTime || hourOfDay > toTime)) { // From və To varsa, eyni zamanda bizim verdiyimiz date bunlar arasında deyilsə normal qiymət qaytarılsın
      return menuItem.priceSell;
    }
  
    // Endirim hesablama
    if (rate.isFixed) {
      return menuItem.priceSell - rate.amount; // Sabit endirim
    } else {
      return menuItem.priceSell - (menuItem.priceSell * (rate.amount / 100)); // Faiz ilə endirim
    }
  }
  
  module.exports = calculateDiscount;