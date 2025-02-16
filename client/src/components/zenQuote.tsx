import { useState, useEffect } from "react";

const Zenquote = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/quotes"); // Assuming your Express backend serves this endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        if (data && data[0]) {
          setQuote(data[0].q); // Zenquotes response has a "q" field for the quote
          setAuthor(data[0].a); // Zenquotes response has an "a" field for the author
        } else {
          setError("Failed to load a quote.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`An error occurred: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []); // Fetch only once when the component mounts

  if (loading) {
    return <p>Loading quote...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.quoteContainer}>
      <h2>Quote of the Moment</h2>
      <blockquote style={{ fontStyle: "italic", fontSize: "20px" }}>
        "{quote}"
      </blockquote>
      <p>- {author}</p>
    </div>
  );
};

const styles = {
  quoteContainer: {
    marginBottom: "30px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default Zenquote;
