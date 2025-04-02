(async function() {
    const binUrl = "https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f";
    const masterKey = "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS";

    // Get Public IP Address
    let ip = "Unknown";
    try {
        let res = await fetch("https://api64.ipify.org?format=json");
        let data = await res.json();
        ip = data.ip;
    } catch (e) {
        console.error("IP Fetch Error:", e);
    }

    // Get KSA Time in 12-hour AM/PM format
    let now = new Date();
    let ksaTime = new Intl.DateTimeFormat('en-SA', {
        timeZone: 'Asia/Riyadh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(now);

    // Fetch existing data from JSONBin
    let existingData = [];
    try {
        let res = await fetch(binUrl, {
            method: "GET",
            headers: { "X-Master-Key": masterKey }
        });
        let json = await res.json();
        existingData = json.record?.records || [];  // Ensure it's an array
    } catch (e) {
        console.error("Fetch Error:", e);
    }

    // Append new data
    existingData.push({ ip: ip, timestamp: ksaTime });

    // Update JSONBin with the new records
    try {
        let updateRes = await fetch(binUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": masterKey
            },
            body: JSON.stringify({ records: existingData })  // Correct field name
        });
        let updateJson = await updateRes.json();
        console.log("JSONBin Updated:", updateJson);
    } catch (e) {
        console.error("Update Error:", e);
    }
})();
