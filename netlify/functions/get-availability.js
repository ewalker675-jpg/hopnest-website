const https = require('https');

exports.handler = async function(event, context) {
  const roomId = event.queryStringParameters.roomid || '699023';
  const token = event.queryStringParameters.token || '89db58bee5303154709421779bdefac0';
  
  const icalUrl = `https://api.beds24.com/ical/bookings.ics?roomid=${roomId}&token=${token}`;
  
  try {
    const icsText = await new Promise((resolve, reject) => {
      https.get(icalUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`Failed to load feed, status code: ${res.statusCode}`));
          }
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
    
    const bookedDates = parseICS(icsText);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookedDates })
    };
  } catch (error) {
    console.error("Error fetching Beds24 availability:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

function parseICS(icsText) {
  const bookedDates = new Set();
  
  const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match;
  
  while ((match = eventRegex.exec(icsText)) !== null) {
    const eventContent = match[1];
    
    const startMatch = eventContent.match(/DTSTART(?:;VALUE=DATE)?:?(\d{8})/);
    const endMatch = eventContent.match(/DTEND(?:;VALUE=DATE)?:?(\d{8})/);
    
    if (startMatch && endMatch) {
      const startStr = startMatch[1];
      const endStr = endMatch[1];
      
      const startYear = parseInt(startStr.substring(0, 4));
      const startMonth = parseInt(startStr.substring(4, 6)) - 1;
      const startDay = parseInt(startStr.substring(6, 8));
      
      const endYear = parseInt(endStr.substring(0, 4));
      const endMonth = parseInt(endStr.substring(4, 6)) - 1;
      const endDay = parseInt(endStr.substring(6, 8));
      
      const startDate = new Date(Date.UTC(startYear, startMonth, startDay));
      const endDate = new Date(Date.UTC(endYear, endMonth, endDay));
      
      let cur = new Date(startDate);
      while (cur < endDate) {
        const yyyy = cur.getUTCFullYear();
        const mm = String(cur.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(cur.getUTCDate()).padStart(2, '0');
        bookedDates.add(`${yyyy}-${mm}-${dd}`);
        cur.setUTCDate(cur.getUTCDate() + 1);
      }
    }
  }
  
  return Array.from(bookedDates);
}
