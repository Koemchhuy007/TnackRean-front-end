import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import NodeClass from "./NodeClass";

export default function Studentnode() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:8000/classes")
      .then((res) => res.json())
      .then((data) => setNodes(data));
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {nodes.map((node) => (
          <div key={node.id}>
            <NodeClass node={node} setNodes={setNodes} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
