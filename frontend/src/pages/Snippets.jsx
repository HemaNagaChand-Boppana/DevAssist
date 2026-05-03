import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function Snippets() {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // FETCH SNIPPETS
  const fetchSnippets = async () => {
    const res = await axios.get("http://localhost:5000/snippets");
    setSnippets(res.data);
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  // SAVE / UPDATE
  const saveSnippet = async () => {
    if (!title || !code) return;

    if (selectedId) {
      await axios.put(`http://localhost:5000/snippets/${selectedId}`, {
        title,
        code,
      });
    } else {
      await axios.post("http://localhost:5000/snippets", {
        title,
        code,
      });
    }

    setTitle("");
    setCode("");
    setSelectedId(null);
    fetchSnippets();
  };

  // DELETE
  const deleteSnippet = async (id) => {
    await axios.delete(`http://localhost:5000/snippets/${id}`);
    fetchSnippets();
  };

  // LOAD
  const loadSnippet = (s) => {
    setTitle(s.title);
    setCode(s.code);
    setSelectedId(s._id);
  };

  // FILE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
      setTitle(file.name);
      setSelectedId(null);
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen flex bg-[#0f172a] text-white overflow-hidden">

      {/* LEFT PANEL */}
      <div className="flex-1 min-w-0 flex flex-col p-6 gap-4">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => (window.location.href = "/home")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            ← Home
          </button>

          <label className="bg-indigo-600 px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition">
            Upload File
            <input type="file" hidden onChange={handleFileUpload} />
          </label>
        </div>

        {/* FILE NAME */}
        <input
          placeholder="File name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#1e293b] p-2 rounded"
        />

        {/* EDITOR */}
        <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v)}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSnippet}
          className="bg-green-500 py-2 rounded hover:bg-green-600 transition"
        >
          {selectedId ? "Update Snippet" : "Save Snippet"}
        </button>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        className={`${
          collapsed ? "w-12" : "w-72"
        } flex-shrink-0 bg-[#020617] border-l border-gray-700 
        transition-all duration-300 ease-in-out flex flex-col`}
      >

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {collapsed ? "→" : "←"}
        </button>

        {!collapsed && (
          <>
            <h2 className="px-3 text-sm text-gray-400 mb-2">Snippets</h2>

            <div className="flex-1 overflow-auto px-2">
              {snippets.map((s) => (
                <div
                  key={s._id}
                  className="flex justify-between items-center p-2 hover:bg-gray-800 rounded cursor-pointer group"
                >
                  <span onClick={() => loadSnippet(s)}>
                    {s.title}
                  </span>

                  {/* DELETE MENU STYLE */}
                  <button
                    onClick={() => deleteSnippet(s._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
                  >
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Snippets;