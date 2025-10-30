import React from "react";

export default function LayoutEditor({ layout, setLayout, onClose }) {
  const moveItem = (index, direction) => {
    const newLayout = [...layout];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newLayout.length) return;
    [newLayout[index], newLayout[targetIndex]] = [
      newLayout[targetIndex],
      newLayout[index],
    ];
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 16 }}>Editar Layout do Dashboard</h3>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {layout.map((section, i) => (
            <li
              key={section}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f3f4f6",
                padding: "8px 12px",
                borderRadius: 6,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>{section}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => moveItem(i, -1)}
                  style={{
                    border: "none",
                    background: "#e5e7eb",
                    borderRadius: 4,
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                >
                  ▲
                </button>
                <button
                  onClick={() => moveItem(i, 1)}
                  style={{
                    border: "none",
                    background: "#e5e7eb",
                    borderRadius: 4,
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                >
                  ▼
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "right", marginTop: 16 }}>
          <button
            onClick={onClose}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
