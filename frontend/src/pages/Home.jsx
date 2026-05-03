import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Editor from "@monaco-editor/react";

function Home() {
  const [code, setCode] = useState("// Write Java code here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [chat, setChat] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));

    const saved = localStorage.getItem("snippetCode");
    if (saved) {
      setCode(saved);
      localStorage.removeItem("snippetCode");
    }
  }, []);

  // ▶ RUN
  const runCode = async () => {
    setOutput("Running...");

    try {
      const res = await axios.post("http://localhost:5000/run", {
        code,
        input
      });

      setOutput(res.data.output);
    } catch {
      setOutput("Error running code");
    }
  };

  // 🤖 AI
  const askAI = async () => {
    setChat("Thinking...");

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: code
      });

      setChat(res.data.content);
    } catch {
      setChat("AI Error");
    }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-white flex flex-col">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-700 bg-[#020617]">
        <h1 className="text-2xl font-semibold text-indigo-400">DevAssist</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => (window.location.href = "/snippets")}
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Snippets
          </button>

          {user && (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 px-8 py-6 gap-6 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="flex-[2] flex flex-col gap-4">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Main.java</span>

            <div className="flex gap-3">
              <button
                onClick={runCode}
                className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                ▶ Run
              </button>

              <button
                onClick={askAI}
                className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                AI Debug
              </button>
            </div>
          </div>

          {/* EDITOR (FIXED HEIGHT - NO RESIZE BUG) */}
          <div className="border border-gray-700 rounded-xl overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="java"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v)}
            />
          </div>

          {/* INPUT */}
          <div>
            <h2 className="text-sm text-gray-400 mb-1">Custom Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 bg-[#1e293b] p-3 rounded-lg text-sm"
              placeholder="Enter input here..."
            />
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col gap-4">

          {/* OUTPUT */}
          <div>
            <h2 className="text-sm text-gray-400 mb-1">Output</h2>
            <div className="bg-black p-3 rounded-lg h-32 overflow-auto text-green-400 text-sm">
              <pre>{output}</pre>
            </div>
          </div>

          {/* AI */}
          <div className="flex-1 overflow-auto">
            <h2 className="text-sm text-gray-400 mb-2">AI Assistant</h2>

            {chat && (
              <div className="bg-black p-4 rounded-lg relative">
                <button
                  onClick={() => navigator.clipboard.writeText(chat)}
                  className="absolute top-2 right-2 text-xs bg-gray-700 px-2 py-1 rounded"
                >
                  Copy
                </button>

                <pre className="text-green-400 text-sm whitespace-pre-wrap">
                  {chat}
                </pre>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;