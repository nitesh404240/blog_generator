import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // fetch blogs
  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/blog/get"
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
        "http://localhost:8000/blog/create",
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

              {/* <h2 style={styles.blogTitle}>
                {blog.title}
              </h2> */}

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

              {/* <h1 style={styles.modalTitle}>
                {selectedBlog.title}
              </h1> */}

              <p style={styles.modalContent}>
                {selectedBlog.content}
              </p>

            </div>

          </div>

        )
      }

    </div>

  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "30px",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "60px",
  },

  logo: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  navButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  heroSection: {
    textAlign: "center",
    marginBottom: "60px",
  },

  heroHeading: {
    fontSize: "64px",
    marginBottom: "20px",
    lineHeight: "1.2",
  },

  heroText: {
    color: "#94a3b8",
    fontSize: "18px",
    marginBottom: "40px",
  },

  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  input: {
    width: "500px",
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid #334155",
    outline: "none",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
  },

  generateButton: {
    padding: "18px 24px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right, #2563eb, #7c3aed)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
  },

  blogCard: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    padding: "25px",
    borderRadius: "20px",
  },

  categoryBadge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "20px",
    background: "#1d4ed8",
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },

  blogTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    lineHeight: "1.4",
  },

  blogContent: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    marginBottom: "20px",
    whiteSpace: "pre-wrap",
  },

  readMoreButton: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
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
  },

  modal: {
    width: "80%",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#0f172a",
    padding: "40px",
    borderRadius: "20px",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "red",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  modalCategory: {
    color: "#60a5fa",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  modalTitle: {
    fontSize: "42px",
    marginBottom: "30px",
  },

  modalContent: {
    lineHeight: "2",
    color: "#cbd5e1",
    whiteSpace: "pre-wrap",
    fontSize: "18px",
  },

};

export default App;