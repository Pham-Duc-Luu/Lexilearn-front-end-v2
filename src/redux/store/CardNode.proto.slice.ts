import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node as NodeFlow,
  type Edge,
} from '@xyflow/react';
import _ from 'lodash';
import { v4 } from 'uuid';
export type CustomNode = {
  text?: string;
};

export type CustomtNodeType = NodeFlow<
  CustomNode,
  'frontNode' | 'meaningNode' | 'exampleNode'
>;

export interface CardNodeProto {
  allNodes: CustomtNodeType[];
  edges: Edge[];
}

const initialState: CardNodeProto = {
  edges: [],
  allNodes: [
    // {
    //   id: "front",
    //   position: { x: 0, y: 0 },
    //   data: { text: "" },
    //   type: "frontNode",
    //   dragHandle: ".drag-handle__custom",
    // },
  ],
};

export const CardNodeProtoSlice = createSlice({
  initialState,
  name: 'CardNodeProtoSlice',
  reducers: {
    addNode: (state, payload: PayloadAction<CustomtNodeType['type']>) => {
      const newNode: CustomtNodeType = {
        id: v4(),
        position: {
          x:
            state.allNodes.length >= 2
              ? state.allNodes[state.allNodes.length - 1].position.x
              : state.allNodes[0].measured?.width! * 2,
          y:
            state.allNodes.length >= 2
              ? state.allNodes[state.allNodes.length - 1].position.y +
                state.allNodes[state.allNodes.length - 1].measured?.height! +
                100
              : 0,
        },
        dragHandle: '.drag-handle__custom',
        data: {
          text: '',
        },
        type: payload.payload,
      };

      const newEdge: Edge = {
        id: v4(),
        source: state.allNodes[0].id,
        target: newNode.id,
        animated: true,
      };

      state.edges.push(newEdge);
      state.allNodes.push(newNode);
    },
    initNode: (state) => {
      state.allNodes = [
        {
          id: 'front',
          position: { x: 0, y: 0 },
          data: { text: '' },
          type: 'frontNode',
          dragHandle: '.drag-handle__custom',
        },
      ];
      state.edges = [];
    },
    deleteNode: (state, payload: PayloadAction<String>) => {
      state.allNodes &&
        _.remove(state.allNodes, function (node) {
          return node.id === payload.payload;
        });
      state.edges &&
        _.remove(state.edges, function (edge) {
          return (
            edge.target === payload.payload || edge.source === payload.payload
          );
        });
    },
    onNodesChange: (state, payload) => {
      state.allNodes = applyNodeChanges(payload.payload, state.allNodes);
    },
    onEdgesChange: (state, payload) => {
      state.edges = applyEdgeChanges(payload.payload, state.edges);
    },
    onConnect: (state, payload) => {
      state.edges = addEdge(payload.payload, state.edges);
    },
    setNode: (state, payload) => {
      state.allNodes = payload.payload;
    },
    setEdges: (state, payload) => {
      state.edges = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  initNode,
  addNode,
  onEdgesChange,
  onConnect,
  setEdges,
  deleteNode,
  setNode,
} = CardNodeProtoSlice.actions;

export default CardNodeProtoSlice.reducer;
