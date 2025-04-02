(async () => {
    const binUrl = "https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f";
    const masterKey = "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS";

    try {
        // Fetch IP
        const { ip } = await (await fetch("https://api.ipify.org?format=json")).json();

        // Get KSA Time in 12-hour AM/PM format
        const timestamp = new Intl.DateTimeFormat('en-SA', {
            timeZone: 'Asia/Riyadh',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(new Date());

        // Get User-Agent
        const userAgent = navigator.userAgent;

        // Fetch existing records from JSONBin
        const { record } = await (await fetch(binUrl, { headers: { "X-Master-Key": masterKey } })).json();
        const existingData = record?.records || [];

        // Append new record
        existingData.push({ ip, timestamp, userAgent });

        // Update JSONBin with the new records
        await fetch(binUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": masterKey
            },
            body: JSON.stringify({ records: existingData })
        });

    } catch (e) {
        console.error("Error:", e);
    }
})();
