'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Panel,
    BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Save, MousePointer2, Share2, Layers, Trash2 } from 'lucide-react';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'default',
        data: { label: 'Neural Core' },
        position: { x: 250, y: 5 },
        className: '!bg-emerald-500/10 !border-emerald-500/30 !text-emerald-500 !rounded-2xl !p-4 !font-bold !shadow-xl !shadow-emerald-900/10'
    },
];

const initialEdges: Edge[] = [];

export default function MindmapPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const fetchGraph = async () => {
        try {
            const res = await fetch(`${API_URL}/forge/mindmap`);
            const { nodes: backendNodes, edges: backendEdges } = await res.json();
            if (backendNodes.length > 0) {
                setNodes(backendNodes.map((n: any) => ({
                    id: n.id,
                    position: { x: n.positionX, y: n.positionY },
                    data: { label: n.label, ...n.data },
                    type: n.type
                })));
            }
            if (backendEdges.length > 0) {
                setEdges(backendEdges);
            }
        } catch (err) {
            console.error('Failed to fetch graph', err);
            // Fallback to localStorage
            const saved = localStorage.getItem('forgedev-mindmap');
            if (saved) {
                const { nodes: sNodes, edges: sEdges } = JSON.parse(saved);
                setNodes(sNodes);
                setEdges(sEdges);
            }
        }
    };

    useEffect(() => {
        fetchGraph();
    }, []);

    const onSave = useCallback(async () => {
        setLoading(true);
        // Persist to local storage as backup
        localStorage.setItem('forgedev-mindmap', JSON.stringify({ nodes, edges }));

        try {
            await Promise.all(nodes.map(n =>
                fetch(`${API_URL}/forge/mindmap/nodes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: n.id,
                        label: n.data.label,
                        position: n.position,
                        type: n.type || 'default',
                        data: n.data
                    })
                })
            ));
            // TODO: Implement edge persistence in API
        } catch (err) {
            console.error('Failed to save to backend', err);
        } finally {
            setLoading(false);
        }
    }, [nodes, edges, API_URL]);

    const addNode = useCallback(() => {
        const id = `${Date.now()}`;
        const newNode: Node = {
            id,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: 'New Concept' },
            className: '!bg-zinc-900 !border-zinc-800 !text-zinc-200 !rounded-xl !p-3 !border-l-4 !border-l-emerald-500'
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    return (
        <div className="h-full w-full bg-black relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                colorMode="dark"
                className="bg-transparent"
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#18181b"
                />
                <Controls
                    className="!bg-zinc-900 !border-zinc-800 !fill-white !rounded-xl !overflow-hidden !shadow-2xl"
                />
                <MiniMap
                    className="!bg-zinc-900 !border-zinc-800 !rounded-2xl !overflow-hidden transition-all opacity-20 hover:opacity-100"
                    nodeColor="#10b981"
                    maskColor="rgba(0, 0, 0, 0.8)"
                />

                <Panel position="top-right" className="flex flex-col gap-2 p-4">
                    <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-2 rounded-2xl flex gap-1 shadow-2xl">
                        <button
                            onClick={addNode}
                            className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all active:scale-90"
                            title="Add Node"
                        >
                            <Plus size={18} />
                        </button>
                        <button
                            onClick={onSave}
                            disabled={loading}
                            className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all active:scale-90 disabled:opacity-50"
                            title="Save Workspace"
                        >
                            <Save size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <div className="w-[1px] h-10 bg-zinc-800 mx-1"></div>
                        <button
                            className="p-3 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all"
                            title="Select Mode"
                        >
                            <MousePointer2 size={18} />
                        </button>
                        <button
                            className="p-3 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all"
                            title="Layers"
                        >
                            <Layers size={18} />
                        </button>
                    </div>

                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 px-4 py-2 rounded-full flex items-center gap-2 self-end">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Graph Active</span>
                    </div>
                </Panel>

                <Panel position="bottom-left" className="p-4">
                    <div className="max-w-[200px] bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl space-y-3 shadow-2xl">
                        <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Graph Statistics</h4>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">Nodes</span>
                            <span className="text-sm font-mono text-zinc-200">{nodes.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">Connections</span>
                            <span className="text-sm font-mono text-zinc-200">{edges.length}</span>
                        </div>
                        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest mt-2 transition-colors">
                            Auto-Layout
                        </button>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}
