"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  StepEdge,

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import  { TextUpdaterNode } from "../../components/model/Model"
import Modal from "../../components/model/Model";

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    type: "textUpdater",
    data: {
      label: "Trigger",
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
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const router = useRouter();
  const session = useSession();

  const [openSideBarModel, setOpenSideBarModel] = useState(false);

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

      await axios.post("http://localhost:5000/api/v1/zap", payload, {
        withCredentials: true,
      });
      router.push("/dashboard");
      toast.success("Successfully created!");
    } catch (error) {
      console.error("Error publishing zap:", error);
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
    (changes) => setNodes((nds ) => applyNodeChanges(changes, nds)),
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
    setTimeout(() => setShowModal(true), 0); 
  };
  

  const updateNodeData = (nodeId : string, newLabel : string, newImage : string) => {
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
      {showModal && selectedNode && (
        <Modal
          onClose={() => setShowModal(false)}
          node={selectedNode}
          onSelect={(newLabel, newImage) =>
            updateNodeData(selectedNode.id, newLabel, newImage)
          }
        />
      )}

      <div style={{ height: "100vh", width: "100vw" }}>
        <button
          onClick={publishZap}
          className="fixed right-5 top-5 bg-gray-700 hover:bg-gray-800 mt-10 text-white text-sm px-4 py-2 rounded-full shadow-md transition z-10"
        >
          Publish Zap
        </button>

        <button
          className="fixed right-5 top-20 bg-orange-500 mt-8 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded-full shadow-md transition z-10"
          onClick={addNode}
        >
          + Add Node
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ textUpdater: TextUpdaterNode }}
          edgeTypes={{ step: StepEdge }}
          onNodesChange={onNodesChange }
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


export default Flow;
