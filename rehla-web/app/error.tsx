"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        maxWidth: 560,
        margin: "80px auto",
        padding: 24,
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        حدث خطأ غير متوقع
      </h1>
      <p style={{ color: "#666", marginBottom: 20 }}>
        نعتذر، حدث خلل أثناء تحميل هذه الصفحة. حاول مرة أخرى.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 24px",
          borderRadius: 999,
          border: "none",
          background: "#1F3A35",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        إعادة المحاولة
      </button>
      {error?.digest && (
        <p style={{ fontSize: 12, color: "#999", marginTop: 16 }}>
          رمز الخطأ: {error.digest}
        </p>
      )}
    </div>
  );
}
