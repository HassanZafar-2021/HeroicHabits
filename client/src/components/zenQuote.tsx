import { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://heroic-habits.onrender.com";

const Zenquote = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/quotes`); // ✅ Corrected API URL
      if (!response.ok) {
        throw new Error(`Failed to fetch quote (Status: ${response.status})`);
      }

      const data = await response.json();
      if (data && data[0]) {
        setQuote(data[0].q || "No quote available.");
        setAuthor(data[0].a || "Unknown"); // ✅ Default to 'Unknown' if missing
      } else {
        setError("No quote received from API.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error fetching quote: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote on mount
  }, []);

  if (loading) {
    return <p>Loading quote...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.quoteContainer}>
      <h2>Quote of the Moment</h2>
      <blockquote style={styles.quoteText}>"{quote}"</blockquote>
      <p style={styles.authorText}>- {author}</p>
      <button style={styles.refreshButton} onClick={fetchQuote}>
        Refresh Quote
      </button>
    </div>
  );
};

const styles = {
  quoteContainer: {
    marginBottom: "30px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
  },
  quoteText: {
    fontStyle: "italic",
    fontSize: "20px",
    marginBottom: "10px",
  },
  authorText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  refreshButton: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default Zenquote;
