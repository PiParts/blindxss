(async () => {
    const binUrl = "https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f";
    const masterKey = "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS";

    try {
        // Fetch IP
        let { ip } = await (await fetch("https://api.ipify.org?format=json")).json();

        // Get KSA Time
        let timestamp = new Intl.DateTimeFormat('en-SA', {
            timeZone: 'Asia/Riyadh',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(new Date());

        // Get User-Agent
        let userAgent = navigator.userAgent;

        // Fetch existing records
        let existingData = (await (await fetch(binUrl, { headers: { "X-Master-Key": masterKey } })).json()).record?.records || [];

        // Append new record & update JSONBin
        existingData.push({ ip, timestamp, userAgent });
        await fetch(binUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Master-Key": masterKey },
            body: JSON.stringify({ records: existingData })
        });

    } catch (e) {
        console.error("Error:", e);
    }
})();
