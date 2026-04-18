# API Documentation

## Base URL
http://localhost:3000

---

## GET /api/analytics

### Description
Fetch all aggregated sensor data sorted by latest timestamp.

### Response
Array of sensor aggregation objects.

### Fields

- id
- location
- windowEnd
- AvgIceThickness
- MinIceThickness
- MaxIceThickness
- AvgSurfaceTemperature
- MaxSnowAccumulation
- AvgExternalTemperature
- Count
- safetyStatus

---

## Notes
- Data is aggregated every 5 minutes
- Used for dashboard visualization