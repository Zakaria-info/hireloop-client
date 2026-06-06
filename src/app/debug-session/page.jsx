'use client';

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function DebugSessionPage() {
  const { data: session, isPending } = useSession();
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [apiHeaders, setApiHeaders] = useState({});
  const cookies = typeof document !== 'undefined' ? document.cookie : '';

  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch('/api/auth/get-session', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        setApiHeaders(headers);

        const data = await response.json();
        console.log('API Full Response:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          headers: headers
        });
        setApiResponse(data);
      } catch (error) {
        console.error('API Error:', error);
        setApiError(error.message);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', color: '#fff', background: '#000' }}>
      <h1>Debug Session</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#222', borderRadius: '5px', border: '1px solid #444' }}>
        <h2>Cookies:</h2>
        <p>{cookies || 'No cookies found'}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#222', borderRadius: '5px', border: '1px solid #444' }}>
        <h2>useSession() Hook Result:</h2>
        <p><strong>isPending:</strong> {isPending ? 'true' : 'false'}</p>
        <p><strong>session:</strong></p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#222', borderRadius: '5px', border: '1px solid #444' }}>
        <h2>Direct API Call - Response Headers:</h2>
        <pre>{JSON.stringify(apiHeaders, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#222', borderRadius: '5px', border: '1px solid #444' }}>
        <h2>Direct API Call - Response Body:</h2>
        <p><strong>Error:</strong> {apiError || 'None'}</p>
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      </div>
    </div>
  );
}
