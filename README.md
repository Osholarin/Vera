# Vera
A smart sensor and decision making agriculture software and hardware platform


brew install mosquitto
brew services start mosquitto
```

On Windows, there's a direct installer at mosquitto.org. That's it — no Docker needed, runs as a native service.

---

## Revised 1-Month Skeleton Plan (No Docker)

Since you're building a skeleton that touches all parts, here's what "skeleton" means for each layer and a realistic 4-week split:

### What "Skeleton" Means Per Layer

**Hardware** — One working ESP8266 node that reads all 4 sensors and publishes a valid JSON payload to the broker every 30 seconds. No deep sleep, no OTA, no TLS for now.

**Broker** — Mosquitto installed natively, running locally, no auth for now (add a password file, skip TLS until Phase 2).

**Core Backend** — A single Python/Node app that subscribes to MQTT, writes readings to a SQLite file (skip PostgreSQL/TimescaleDB for the skeleton — you can migrate later), and exposes 3-4 REST endpoints plus a WebSocket.

**Prediction Service** — A single Python script/endpoint with the rule-based model only. No ML, no queue. Core backend calls it directly over HTTP.

**Geospatial Service** — A stub endpoint that returns hardcoded/mock zone data. You're not fetching real Sentinel-2 scenes in month one, just proving the connection works.

**PWA** — A React app with a dashboard page showing live sensor readings via WebSocket, a basic field map with a placeholder zone, and a soil health score card. Installable as a PWA.

---

### Week-by-Week

**Week 1 — Hardware + Broker**
Get real data flowing. Wire the ESP8266, write the firmware, stand up Mosquitto, verify the JSON payload arrives. By end of week 1 you should be able to run `mosquitto_sub -t farms/# -v` and watch live readings scroll past.

**Week 2 — Core Backend**
MQTT listener → SQLite writer → REST API (`GET /readings`, `GET /nodes`, `GET /farms/:id/soil-health`). Add a WebSocket that pushes new readings as they arrive. Test with Postman/Bruno and a simple HTML page that connects to the WebSocket.

**Week 3 — Prediction Service + Geospatial Stub**
Build the rule-based scorer as a small FastAPI app. Wire the core backend to call it after each reading is saved. Build the geospatial stub — a FastAPI app with one endpoint that returns fake zone JSON. Connect both to the core backend.

**Week 4 — PWA**
Dashboard with live WebSocket readings, soil health score card, a Leaflet map with one fake zone overlay, basic alert if moisture drops below a threshold. Get it installable as a PWA (manifest + service worker).

---

### Revised Folder Structure (No Docker, Skeleton)

Since you're running everything natively, drop the `infra/` folder and simplify considerably:
```
farmpulse/
│
├── hardware/
│   └── firmware/
│       ├── main.py              # Boot, read sensors, publish MQTT
│       ├── sensors.py           # All sensor reading functions
│       ├── mqtt_client.py       # Connect + publish helpers
│       └── config.py            # Wi-Fi creds, broker IP, node ID
│
├── broker/
│   └── mosquitto.conf           # Minimal config (port, log path)
│
├── core-backend/
│   ├── main.py                  # App entry point
│   ├── mqtt_listener.py         # Subscribes to broker
│   ├── db.py                    # SQLite setup + queries
│   ├── api.py                   # REST routes
│   ├── websocket.py             # WS manager
│   ├── scheduler.py             # Triggers prediction after each reading
│   └── requirements.txt
│
├── prediction-service/
│   ├── main.py                  # FastAPI app + POST /predict route
│   ├── rule_model.py            # Threshold-based soil health logic
│   ├── schemas.py               # Input/output models
│   └── requirements.txt
│
├── geospatial-service/
│   ├── main.py                  # FastAPI app + GET /zones route
│   ├── mock_data.py             # Hardcoded zone + index data for now
│   └── requirements.txt
│
├── pwa/
│   ├── public/
│   │   ├── manifest.json
│   │   └── icons/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FieldMap.tsx
│   │   │   └── SoilHealth.tsx
│   │   ├── components/
│   │   │   ├── NodeCard.tsx
│   │   │   ├── SensorGauge.tsx
│   │   │   └── AlertBanner.tsx
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts
│   │   │   └── useReadings.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── main.tsx
│   └── package.json
│
├── .env.example
└── README.md