"use client";
import { useState, useEffect } from "react";
import {
  Position,
  Handle,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Image from "next/image";
import MetaDataModel from "./MetaDataModel";


export default function Modal({
    onClose,
    node,
    onSelect,

  }: {
    onClose: () => void;
    node: NodeTypes;
    onSelect: (newLabel: string, newImage: string) => void;
    selectedNode : NodeTypes
  }) {
    const [actionid , setActionId] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [availableActions, setAvailableActions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [ openMetaDataModel , setOpenMetaDataModel ] = useState(false);
   
    useEffect(() => {
      if (!node) return;
      setLoading(true);
  
      const url =
        node.data.label === "Trigger"
          ? "http://localhost:5000/api/v1/triggers/available"
          : "http://localhost:5000/api/v1/actions/available";
  
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (node.data.label === "Trigger") {
            setData(res);
            setAvailableActions([]);
          } else {
            setAvailableActions(res);
            setData([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }, [node]);
  
    return (
      <div>
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
                      <Image src={item.image} alt={item.id} width={24} height={24}  unoptimized={true}/>
                      <span className="text-gray-800 font-medium">{item.id}</span>
                    </div>
                  ))}
                </div>
              ) : openMetaDataModel ? < MetaDataModel onclose={onClose}  actionid={actionid} node={node} /> : (
                <div className="space-y-2">
                  {availableActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => {
                        setOpenMetaDataModel(true);
                        console.log("oncliked clikcked ")
                        setActionId(action.id);
                        onSelect(action.id, action.image);
                      }}
                    >
                      <Image
                        src={action.image}
                        alt={action.id}
                        width={24}
                        height={24}
                        unoptimized={true}
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
      </div>
    );
  }
  
  export  function TextUpdaterNode({ data }) {
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
          <Image
          unoptimized={true}
            src={data.image}
            alt={data.label}
            height={50}
            width={50}
            style={{
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
  