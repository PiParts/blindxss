(async function() {
    // Get Public IP Address
    let ip = "Unknown";
    try {
        let res = await fetch("https://api64.ipify.org?format=json");
        let data = await res.json();
        ip = data.ip;
    } catch (e) {}

    // Get KSA Time in 12-hour format
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
        let res = await fetch("https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f", {
            method: "GET",
            headers: { "X-Master-Key": "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS" }
        });
        let json = await res.json();
        existingData = json.record || [];
    } catch (e) {}

    // Append new data
    existingData.push({ ip: ip, timestamp: ksaTime });

    // Update JSONBin with the new data
    fetch("https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS"
        },
        body: JSON.stringify(existingData)
    });
})();
