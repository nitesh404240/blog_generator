import axios from "axios";
import { useEffect, useState } from "react";

const API =
  "https://blog-generator-bs34.onrender.com";

function App() {

  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // fetch blogs
  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        `${API}/blog/get-blogs`
      );

      setBlogs(response.data.blogs);

    } catch (error) {

      console.log(error);

    }

  };

  // generate blog
  const generateBlog = async () => {

    if (!category) return;

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/blog/create`,
        {
          category,
        }
      );

      setBlogs((prev) => [
        response.data.blog,
        ...prev,
      ]);

      setCategory("");

    } catch (error) {

      console.log(error);

      alert("Failed to generate blog");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* navbar */}
        <div style={styles.navbar}>

          <h1 style={styles.logo}>
            AI Blog Studio
          </h1>

          <button style={styles.navButton}>
            Explore Blogs
          </button>

        </div>

        {/* hero */}
        <div style={styles.heroSection}>

          <h1 style={styles.heroHeading}>
            Generate AI Blogs
            <br />
            In Seconds
          </h1>

          <p style={styles.heroText}>
            Create professional blogs using AI and manage them in one dashboard.
          </p>

          <div style={styles.inputWrapper}>

            <input
              type="text"
              placeholder="Enter topic like AI, Space, Crypto..."
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              style={styles.input}
            />

            <button
              onClick={generateBlog}
              style={styles.generateButton}
            >
              {
                loading
                  ? "Generating..."
                  : "Generate Blog"
              }
            </button>

          </div>

        </div>

        {/* blogs */}
        <div style={styles.blogGrid}>

          {
            blogs.map((blog) => (

              <div
                key={blog._id}
                style={styles.blogCard}
              >

                <div style={styles.categoryBadge}>
                  {blog.category}
                </div>

                <p style={styles.blogContent}>
                  {
                    blog.content.length > 500
                      ? blog.content.substring(0, 500) + "..."
                      : blog.content
                  }
                </p>

                <button
                  style={styles.readMoreButton}
                  onClick={() => setSelectedBlog(blog)}
                >
                  Read More
                </button>

              </div>

            ))
          }

        </div>

        {/* modal */}
        {
          selectedBlog && (

            <div style={styles.modalOverlay}>

              <div style={styles.modal}>

                <button
                  style={styles.closeButton}
                  onClick={() =>
                    setSelectedBlog(null)
                  }
                >
                  X
                </button>

                <p style={styles.modalCategory}>
                  {selectedBlog.category}
                </p>

                <p style={styles.modalContent}>
                  {selectedBlog.content}
                </p>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "30px",
    borderBottom: "1px solid #1e293b",
    marginBottom: "70px",
  },

  logo: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#38bdf8",
    letterSpacing: "1px",
  },

  navButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  heroSection: {
    marginBottom: "70px",
  },

  heroHeading: {
    fontSize: "70px",
    lineHeight: "1.1",
    marginBottom: "20px",
    maxWidth: "900px",
  },

  heroText: {
    color: "#94a3b8",
    fontSize: "20px",
    marginBottom: "40px",
    maxWidth: "700px",
    lineHeight: "1.7",
  },

  inputWrapper: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  input: {
    flex: 1,
    minWidth: "320px",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #334155",
    outline: "none",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
  },

  generateButton: {
    padding: "18px 28px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(to right, #2563eb, #7c3aed)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
  },

  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
    gap: "28px",
  },

  blogCard: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    padding: "28px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  categoryBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "30px",
    background: "#1d4ed8",
    marginBottom: "22px",
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  blogContent: {
    color: "#cbd5e1",
    lineHeight: "1.9",
    marginBottom: "25px",
    fontSize: "15px",
    whiteSpace: "pre-wrap",
  },

  readMoreButton: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },

  modal: {
    width: "100%",
    maxWidth: "1000px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#0f172a",
    padding: "45px",
    borderRadius: "26px",
    position: "relative",
    border: "1px solid #1e293b",
  },

  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  modalCategory: {
    color: "#60a5fa",
    marginBottom: "20px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  modalContent: {
    lineHeight: "2",
    color: "#cbd5e1",
    whiteSpace: "pre-wrap",
    fontSize: "18px",
  },

};

export default App;