// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePrompt = async () => {
    if (!idea.trim()) {
      setError("कृपया कोई विचार लिखें!");
      return;
    }
    setError("");
    setLoading(true);
    setPrompt("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() })
      });

      const data = await res.json();

      if (res.ok) {
        setPrompt(data.prompt);
      } else {
        setError(data.error || "कुछ गड़बड़ हुई, कृपया दोबारा कोशिश करें।");
      }
    } catch (err) {
      setError("नेटवर्क त्रुटि। कृपया इंटरनेट चेक करें।");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      alert("प्रॉम्प्ट कॉपी हो गया!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#4F46E5", fontSize: "2.2rem" }}>✨ PromptDost</h1>
      <p>अपना साधारण विचार लिखें — हम बना देंगे <strong>AI के लिए परफेक्ट प्रॉम्प्ट</strong>!</p>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="उदाहरण: मुझे एक एक्सपेंस ट्रैकर ऐप का Play Store डिस्क्रिप्शन चाहिए"
        style={{
          width: "100%",
          height: "100px",
          marginTop: "1rem",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

      <button
        onClick={generatePrompt}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: loading ? "#ccc" : "#4F46E5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "बना रहा है... 🤖" : "प्रॉम्प्ट बनाएं"}
      </button>

      {prompt && (
        <div style={{ marginTop: "2rem" }}>
          <h3>आपका ऑप्टिमाइज़्ड प्रॉम्प्ट:</h3>
          <pre
            style={{
              background: "#f9fafb",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "15px",
              marginTop: "10px"
            }}
          >
            {prompt}
          </pre>
          <button
            onClick={copyToClipboard}
            style={{
              marginTop: "12px",
              padding: "8px 16px",
              backgroundColor: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            कॉपी करें ✅
          </button>
        </div>
      )}

      <footer style={{ marginTop: "3rem", fontSize: "14px", color: "#6b7280" }}>
        <p>Powered by OpenRouter • सभी मॉडल्स फ्री टियर पर चलते हैं</p>
      </footer>
    </div>
  );
}
