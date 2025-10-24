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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    type: "textUpdater",
    data: {
      label: "Trigger" ,
      image:
        "https://mailparser.io/wp-content/uploads/2018/08/what-is-a-webhook-1024x536.jpeg",
    },
  },
  {
    id: "n2",
    position: { x: 200, y: 150 },
    type: "textUpdater",
    data: { label: "Action 1" },
  },
];

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2", type: "step" }];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const router = useRouter()
  const session = useSession()

 
  const publishZap = async () => {
    try {
      
      const actionNodes = nodes.filter((n) => n.data.label !== "Trigger");
      
      const payload = {

        userId: session.data?.user?.id || session.data,
        availableTriggerId: actionNodes[0]?.data?.label || "Unknown Trigger",
        triggerMetadata: {
          image: actionNodes[0]?.data?.image || null,
        },
        actions: actionNodes
          .filter((node) => node.id !== "n1") 
          .map((node) => ({
            availableActionId: node.data.label,
            actionMetadata: node.data.image ? { image: node.data.image } : {},
          })),
      };


      const res = await axios.post(
        "http://localhost:5000/api/v1/zap",
        payload,
        { withCredentials: true }
      );
      router.push("/dashboard")
      toast.success('Successfully created!');
      
    } catch (error) {
      console.error("❌ Error publishing zap:", error);
    }
  };

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const x = (lastNode?.position?.x || 0) + 180;
    const y = (lastNode?.position?.y || 0) + 80;

    setNodes((nds) => [
      ...nds,
      {
        id: `n${nds.length + 1}`,
        position: { x, y },
        type: "textUpdater",
        data: { label: `Action ${nds.length + 1}` },
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

  const onNodeClick = (event, node) => {
    if (event.target.tagName.toLowerCase() === "input") return;
    setSelectedNode(node);
    setShowModal(true);
  };

  const updateNodeData = (nodeId, newLabel, newImage) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, label: newLabel, image: newImage } }
          : n
      )
    );
  };

  return (
    <div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          node={selectedNode}
          onSelect={(newLabel, newImage) =>
            updateNodeData(selectedNode.id, newLabel, newImage)
          }
        />
      )}

      <div style={{ height: "100vh", width: "100vw" }}>
        {/* ✅ Publish Zap Button */}
        <button
          onClick={publishZap}
          className="fixed right-5 top-5 bg-gray-700 hover:bg-gray-800 mt-10 text-white text-sm px-4 py-2 rounded-full shadow-md transition z-10"
        >
          Publish Zap
        </button>

        <button
          className="fixed right-5 top-5 bg-orange-500 hover:bg-orange-600 mt-20 text-white text-sm px-3 py-2 rounded-full shadow-md transition z-10"
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

  useEffect(() => {
    if (!node) return;

    setLoading(true);

    if (node.data.label === "Trigger") {
      fetch(`http://localhost:5000/api/v1/triggers/available`)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setAvailableActions([]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Trigger fetch error:", err);
          setLoading(false);
        });
    } else {
      fetch(`http://localhost:5000/api/v1/actions/available`)
        .then((res) => res.json())
        .then((res) => {
          setAvailableActions(res);
          setData([]);
          setLoading(false);
          
        })
        .catch((err) => {
          console.error("Action fetch error:", err);
          setLoading(false);
        });
    }
  }, [node]);

  return (
    <div
      className="fixed inset-0 bg-gray-400 flex justify-center items-center z-50"
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
          <div className="space-y-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  onSelect(item.id, item.image);
                  onClose();
                }}
              >
                <img src={item.image} alt={item.id} width={24} height={24} />
                <span className="text-gray-800 font-medium">{item.id}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {availableActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  onSelect(action.id, action.image);
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
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 mt-4"
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
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "2px solid #333",
        borderRadius: 8,
        background: "white",
        padding: "8px 12px",
        minWidth: 180,
        minHeight: 70,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {data.image && (
        <img
          src={data.image}
          alt={data.label}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      )}

      <div
        style={{
          flex: 1,
          textAlign: "left",
          fontWeight: 600,
          fontSize: 14,
          color: "#333",
        }}
      >
        {data.label}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "blue" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "green" }}
      />
    </div>
  );
}

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { step: StepEdge };

export default Flow;
