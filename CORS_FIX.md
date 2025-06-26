# แก้ปัญหา CORS บน Android

## ปัญหาที่เกิดขึ้น
เมื่อใช้แอปพลิเคชันบน Android แล้วเกิดข้อผิดพลาด CORS (Cross-Origin Resource Sharing) ขณะเรียก API

## สาเหตุ
- Android WebView และ Mobile Browser มีการจำกัด CORS policy ที่เข้มงวดกว่า Desktop Browser
- การเรียก API จาก client-side โดยตรงจะเจอปัญหา CORS บน mobile devices

## วิธีแก้ไข

### 1. สร้าง API Proxy Route
สร้าง API route ใน Next.js เพื่อทำหน้าที่เป็น proxy สำหรับการเรียก external API:
- `app/api/proxy/route.ts` - API proxy handler
- รองรับ GET, POST, PUT, DELETE methods
- เพิ่ม CORS headers ที่เหมาะสม

### 2. สร้าง API Helper Functions
สร้าง utility functions เพื่อจัดการการเรียก API:
- `app/utils/apiHelper.ts` - Helper functions สำหรับเรียก API
- ตรวจสอบ User Agent เพื่อใช้ proxy บน mobile devices
- รองรับทั้ง FormData และ JSON requests

### 3. ปรับปรุง Configuration
- `middleware.ts` - เพิ่ม CORS middleware
- `next.config.ts` - เพิ่ม CORS headers configuration

### 4. แก้ไขไฟล์ที่เรียก API
แทนที่การใช้ `fetch()` โดยตรงด้วย helper functions:

```typescript
// เดิม
const res = await fetch(\`\${process.env.NEXT_PUBLIC_url}/question\`, {
  headers: {
    Authorization: \`Bearer \${token}\`,
  },
});

// ใหม่
import { apiGet } from "../utils/apiHelper";
const res = await apiGet('/question', token);
```

## การใช้งาน API Helper Functions

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/apiHelper";

// GET request
const response = await apiGet('/endpoint', token);

// POST request with FormData
const formData = new FormData();
formData.append('key', 'value');
const response = await apiPost('/endpoint', formData, token);

// POST request with JSON
const jsonData = { key: 'value' };
const response = await apiPost('/endpoint', jsonData, token);

// PUT request
const response = await apiPut('/endpoint', data, token);

// DELETE request
const response = await apiDelete('/endpoint', token);
```

## การทำงาน
1. Helper functions จะตรวจสอบ User Agent
2. หากเป็น mobile device จะใช้ proxy route (`/api/proxy`)
3. หากเป็น desktop จะเรียก API โดยตรง
4. Proxy route จะเพิ่ม CORS headers ที่เหมาะสม

## ข้อดี
- แก้ปัญหา CORS บน Android/Mobile devices
- ยังคงประสิทธิภาพสูงบน Desktop (เรียก API โดยตรง)
- รองรับทั้ง FormData และ JSON requests
- ง่ายต่อการนำไปใช้กับโค้ดที่มีอยู่

## การทดสอบ
1. ทดสอบบน Desktop browser - ควรทำงานปกติ
2. ทดสอบบน Android browser/WebView - ควรไม่เจอ CORS error
3. ตรวจสอบ Network tab ว่าใช้ proxy route บน mobile devices
