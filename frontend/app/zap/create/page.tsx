"use client";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  StepEdge,
  Position,
  Handle,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Trigger" } },
  {
    id: "n2",
    position: { x: 150, y: 100 },
    data: { label: "Node 2" },
  },
];

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2", type: "step" }];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const x = (lastNode?.position?.x || 0) + 150;
    const y = (lastNode?.position?.y || 0) + 50;

    setNodes((nds) => [
      ...nds,
      {
        id: `n${nds.length + 1}`,
        position: { x, y },
        data: { label: `Node ${nds.length + 1}` },
      },
    ]);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // ✅ Prevent modal open while typing
  const onNodeClick = (event, node) => {
    if (event.target.tagName.toLowerCase() === "input") return;
    setSelectedNode(node);
    setShowModal(true);
  };

  // 🟢 CHANGED — unified function to update node label for both Trigger & other nodes
  const updateNodeLabel = (nodeId, newLabel) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, label: newLabel } } : n
      )
    );
  };

  return (
    <div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          node={selectedNode}
          onSelect={(newLabel) => updateNodeLabel(selectedNode.id, newLabel)} // 🟢 CHANGED
        />
      )}

      <div style={{ height: "100vh", width: "100vw" }}>
        <button
          className="fixed right-5 top-5 bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded-full shadow-md transition z-10"
          onClick={addNode}
        >
          + Add Node
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

// 💬 Modal Component
function Modal({ onClose, node, onSelect }) {
  const [data, setData] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🟢 CHANGED — single fetch logic for both trigger & non-trigger nodes
  useEffect(() => {
    if (!node) return;

    setLoading(true);

    if (node.data.label === "Trigger") {
      fetch(`http://localhost:5000/api/v1/triggers/available`)
        .then((res) => res.json())
        .then((res) => {
          console.log("✅ Trigger Data :::", res);
          setData(res);
          setAvailableActions([]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Trigger fetch error:", err);
          setLoading(false);
        });
    } else {
      fetch(`http://localhost:5000/api/v1/actions/available`)
        .then((res) => res.json())
        .then((res) => {
          console.log("✅ Action Data :::", res);
          setAvailableActions(res);
          setData([]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Action fetch error:", err);
          setLoading(false);
        });
    }
  }, [node]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-5 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">Select Node Action</h3>

        {loading ? (
          <p>Loading...</p>
        ) : node.data.label === "Trigger" ? (
          // ✅ Trigger Node List
          <div className="space-y-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  onSelect(item.id); // 🟢 CHANGED — updates Trigger node name
                  onClose();
                }}
              >
                <img src={item.image} alt={item.id} width={24} height={24} />
                <span className="text-gray-800 font-medium">{item.id}</span>
              </div>
            ))}
          </div>
        ) : (
          // ✅ Non-Trigger (Action) Node List
          <div className="space-y-2">
            {availableActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  onSelect(action.id); // 🟢 CHANGED — updates other node name
                  onClose();
                }}
              >
                <img
                  src={action.image}
                  alt={action.id}
                  width={24}
                  height={24}
                />
                <span className="text-gray-800 font-medium">{action.id}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// 🧩 Custom Node Component
export function TextUpdaterNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #333",
        borderRadius: 8,
        background: "white",
        minWidth: 120,
        textAlign: "center",
      }}
    >
      <div>
        <label>Text:</label>
        <input
          defaultValue={data.label}
          style={{ marginLeft: 5 }}
          className="nodrag"
        />
      </div>

      <Handle type="target" position={Position.Top} style={{ background: "blue" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "green" }} />
    </div>
  );
}

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { step: StepEdge };

export default Flow;
