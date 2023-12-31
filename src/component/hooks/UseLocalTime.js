import { useState, useEffect } from 'react';
import axios from 'axios';

const useLocalTime = (ip) => {
  const [localTime, setLocalTime] = useState('');
  const [hourFromLocalTime, setHourFromLocalTime] = useState(null);

  useEffect(() => {
    const fetchIP = async () => {
      const IP = ip
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
        const timeResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        const { timezone } = timeResponse.data;
        const localDate = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
        setLocalTime(localDate);
      } catch (error) {
        console.error('Error fetching IP and local time:', error);
      }
    };

    fetchIP();
  }, []);


  useEffect(() => {
    function extractHour(inputString) {
      const numberMatch = inputString.match(/\d+/);

      if (numberMatch) {
        let number = parseInt(numberMatch[0], 10);

        if (inputString.includes('PM')) {
          number = number === 12 ? 12 : number + 12;
        } else if (inputString.includes('AM') && number === 12) {
          number = 0;
        }

        return number;
      }

      return null;
    }

    const hour = extractHour(localTime);
    setHourFromLocalTime(hour);
  }, [localTime]);

  return hourFromLocalTime;
};

export default useLocalTime;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useLocalTime = (ip) => {
//   const [hourFromLocalTime, setHourFromLocalTime] = useState(null);

//   useEffect(() => {
//     const fetchLocalTime = async () => {
//       if(ip) {
//         try {
//           const timeResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
//           const { timezone } = timeResponse.data;
//           const localDate = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
//           const hour = extractHour(localDate);
//           setHourFromLocalTime(hour);
//         } catch (error) {
//           console.error('Error fetching local time:', error);
//         }
//       }
//     };

//     fetchLocalTime();
//   }, [ip]);

//   function extractHour(inputString) {
//     const numberMatch = inputString.match(/\d+/);

//     if (numberMatch) {
//       let number = parseInt(numberMatch[0], 10);

//       if (inputString.includes('PM')) {
//         number = number === 12 ? 12 : number + 12;
//       } else if (inputString.includes('AM') && number === 12) {
//         number = 0;
//       }

//       return number;
//     }

//     return null;
//   }

//   return hourFromLocalTime;
// };

// export default useLocalTime;