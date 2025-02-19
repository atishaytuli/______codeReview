import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";

const App = () => {
  const [code, setCode] = useState(`function hello () {\n  enter code here \n}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    import("prismjs").then((Prism) => {
      import("prismjs/components/prism-javascript").then(() => {
        Prism.highlightAll();
      });
    });
  }, []);
  
  const reviewCode = async () => {
    try {
      const response = await axios.post("https://codereview-d0f3.onrender.com/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review. Please try again.");
    }
  };

  return (
    <main>
      <div className="left">
        <div className="editor-header">
          <div className="status-icons">
            <div className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>
        </div>

        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            className="code-editor"
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              backgroundColor: "#1E1E1E",
              color: "#ffffff",
              overflowY: "auto",
            }}
          />
        </div>

        <div onClick={reviewCode} className="review">
          Review Code
        </div>
      </div>

      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review || "Click &nbsp;  _______________Review Code &nbsp; to Cut Code Review Time & Bugs in Half and Clean Code tips in (hinglish). "}
        </Markdown>
      </div>
    </main>
  );
};

export default App;
