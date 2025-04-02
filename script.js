fetch("https://api.jsonbin.io/v3/b/67ed3bf48960c979a57cf53f", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2a$10$ckeEEBqkAjavrXvKNdAJo.FSeD7uKDSV98YZete3agyvG2VG6WdxS"
    },
    body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ip: fetch("https://api64.ipify.org?format=json")
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => "Unknown")
    })
});
