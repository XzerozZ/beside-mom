// Utility function สำหรับการเรียก API ผ่าน proxy เพื่อแก้ปัญหา CORS บน Android
export const apiRequest = async (
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: FormData | string | object;
    headers?: Record<string, string>;
    useProxy?: boolean; // option เพื่อเลือกใช้ proxy หรือไม่
  } = {}
) => {
  const { method = 'GET', body, headers = {}, useProxy = true } = options;
  
  // ตรวจสอบว่าอยู่ใน environment ที่ต้องใช้ proxy หรือไม่
  const needsProxy = useProxy && (
    // ตรวจสอบ User Agent สำหรับ Android หรือ Mobile devices
    typeof navigator !== 'undefined' && 
    (navigator.userAgent.includes('Android') || 
     navigator.userAgent.includes('Mobile') ||
     navigator.userAgent.includes('iPhone') ||
     navigator.userAgent.includes('iPad'))
  );

  let url: string;
  let requestHeaders: Record<string, string> = { ...headers };
  let requestBody: FormData | string | undefined;

  if (needsProxy) {
    // ใช้ API proxy
    url = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
  } else {
    // เรียก API โดยตรง
    url = `${process.env.NEXT_PUBLIC_url}${endpoint}`;
  }

  // จัดการ body
  if (body) {
    if (body instanceof FormData) {
      requestBody = body;
    } else if (typeof body === 'object') {
      requestBody = JSON.stringify(body);
      requestHeaders['Content-Type'] = 'application/json';
    } else {
      requestBody = body;
    }
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (requestBody) {
    requestOptions.body = requestBody;
  }

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Helper function สำหรับ GET requests
export const apiGet = async (endpoint: string, token?: string, useProxy = true) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiRequest(endpoint, {
    method: 'GET',
    headers,
    useProxy,
  });
};

// Helper function สำหรับ POST requests
export const apiPost = async (endpoint: string, body: FormData | object, token?: string, useProxy = true) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiRequest(endpoint, {
    method: 'POST',
    body,
    headers,
    useProxy,
  });
};

// Helper function สำหรับ PUT requests
export const apiPut = async (endpoint: string, body: FormData | object, token?: string, useProxy = true) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiRequest(endpoint, {
    method: 'PUT',
    body,
    headers,
    useProxy,
  });
};

// Helper function สำหรับ DELETE requests
export const apiDelete = async (endpoint: string, token?: string, useProxy = true) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiRequest(endpoint, {
    method: 'DELETE',
    headers,
    useProxy,
  });
};
