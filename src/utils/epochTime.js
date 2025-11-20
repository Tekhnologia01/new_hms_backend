 const getEpochTime = (inputDate) => {
    return Math.floor(new Date(inputDate).getTime() / 1000);
};

 const convertEpochToDate = (epochTime) => { 
    if (!epochTime || isNaN(epochTime)) {
        return "Invalid Date";
    }
    return new Date(Number(epochTime) * 1000).toLocaleString();
};

 const epochToTime = (epoch) => {
    if (!epoch) return "";
    const date = new Date(epoch * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const epochToTime1 = (epoch) => {
  if (!epoch) return "";
  
  // Add 5.5 hours (19800 seconds)
  const offsetEpoch = epoch + 19800;
  const date = new Date(offsetEpoch * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};


const convertEpochToDateTime = (epochTime) => {

    try {
        if (epochTime) {
            // Convert to JavaScript Date object
            const dateObject = new Date(epochTime * 1000); // Multiply by 1000 to convert seconds to milliseconds

            // Format Date & Time
            const formattedDate = dateObject.toLocaleDateString(); // e.g., "8/21/2024"
            const formattedTime = dateObject.toLocaleTimeString(); // e.g., "10:30:00 AM"
            return {date: formattedDate, time: formattedTime}
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return null;
};
module.exports ={convertEpochToDateTime,convertEpochToDate,epochToTime,getEpochTime,epochToTime1}