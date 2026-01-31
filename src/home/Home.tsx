import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Home = () => {
  const navigate = useNavigate();

  // Initial State
  const [headerStr, setHeaderStr] = useState(`{\n  "alg": "HS256",\n  "typ": "JWT"\n}`);
  const [payloadStr, setPayloadStr] = useState(`{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "role": "user"\n}`);
  const [encodedToken, setEncodedToken] = useState({ header: "", payload: "", signature: "" });
  const [backendResponse, setBackendResponse] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Helper to encode Base64URL
  const base64UrlEncode = (str: string) => {
    try {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    } catch (e) {
      return "ERROR";
    }
  };

  // Re-calculate token when inputs change
  useEffect(() => {
    const encHeader = base64UrlEncode(headerStr);
    const encPayload = base64UrlEncode(payloadStr);
    // Dummy Signature (constant for HS256 simulation unless we implement real HMAC in browser)
    // For visual purposes, we just keep a static signature resembling a real one.
    // If user changes algo to 'none', we should ideally show empty signature in exploit scenario logic.
    let signature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    // Simple logic to reflect "none" algo visual
    if (headerStr.includes('"alg": "none"') || headerStr.includes('"alg":"none"')) {
      signature = "";
    }

    setEncodedToken({
      header: encHeader,
      payload: encPayload,
      signature: signature
    });
  }, [headerStr, payloadStr]);


  const sendToBackend = () => {
    setBackendResponse(null);
    try {
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);

      // Mock Backend Verification Logic
      let isValid = false;
      let message = "";

      // 1. Check Algorithm
      if (header.alg === 'none') {
        // Vulnerability: Backend accepted none!
        isValid = true;
      } else if (header.alg === 'HS256') {
        // Normal validation (mocked)
        // In a real exploit, we can't generate a valid signature for 'admin' without the secret.
        // So if they changed the payload but kept HS256, signature verification would fail.
        // We verify if payload 'role' was changed.
        const originalPayload = JSON.parse(`{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "role": "user"\n}`);
        if (payload.role !== originalPayload.role) {
          // Signature mismatch simulation
          isValid = false;
          message = "401 Unauthorized: Signature Verification Failed! (You don't have the secret)";
        } else {
          isValid = true;
        }
      }

      if (isValid) {
        if (payload.role === 'admin') {
          message = "200 OK: Welcome, ADMIN! Here is the flag: FLAG{jwt_none_algo_master}";
        } else {
          message = `200 OK: Welcome, ${payload.name}. You are a standard user.`;
        }
      }

      setBackendResponse(message);

    } catch (e) {
      setBackendResponse("400 Bad Request: Invalid JSON format");
    }
  };


  return (
    <Card className="w-full max-w-4xl shadow-xl border-t-4 border-indigo-500 animate-in fade-in zoom-in duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-indigo-900">JWT Exploit Playground</CardTitle>
        <CardDescription className="text-center">
          Modify the token below to verify if your backend is secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">

        {/* Encoded View */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-gray-500 uppercase">Encoded Token (Live)</h3>
          <div className="bg-slate-100 p-4 rounded-lg break-all font-mono text-xl shadow-inner border border-slate-200 leading-relaxed">
            <span className="text-red-500">{encodedToken.header}</span>
            <span className="text-black">.</span>
            <span className="text-purple-600">{encodedToken.payload}</span>
            <span className="text-black">.</span>
            <span className="text-blue-500">{encodedToken.signature}</span>
          </div>
        </div>

        {/* Decoded Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-red-600 font-bold">Header</Label>
            <Textarea
              value={headerStr}
              onChange={(e) => setHeaderStr(e.target.value)}
              className="font-mono text-sm min-h-[150px] bg-red-50 border-red-200 focus:ring-red-500"
            />
            <p className="text-xs text-gray-400">Try changing "alg" to "none"</p>
          </div>

          <div className="space-y-2">
            <Label className="text-purple-600 font-bold">Payload</Label>
            <Textarea
              value={payloadStr}
              onChange={(e) => setPayloadStr(e.target.value)}
              className="font-mono text-sm min-h-[150px] bg-purple-50 border-purple-200 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-400">Try changing "role" to "admin"</p>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-100">
          <Button
            size="lg"
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold shadow-md transform active:scale-95 transition-all"
            onClick={sendToBackend}
          >
            Send to Backend
          </Button>

          {backendResponse && (
            <div className={`w-full p-4 rounded-md font-mono text-sm font-semibold border-l-4 ${backendResponse.startsWith("200") ? "bg-green-50 text-green-800 border-green-500" : "bg-red-50 text-red-800 border-red-500"}`}>
              {backendResponse}
            </div>
          )}
        </div>

        <div className="flex justify-center pt-6">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-auto"
          >
            Logout
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default Home;