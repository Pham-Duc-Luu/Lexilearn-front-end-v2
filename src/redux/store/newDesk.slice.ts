import { Flashcard } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  Node as NodeFlow,
} from '@xyflow/react';
import * as lodash from 'lodash';
import { v4 } from 'uuid';

export type CardType = 'front' | 'back';

export interface ReoderVocabCardItem {
  id: string;
  word?: CardContent;
  mean?: CardContent;
  examples?: CardContent[];
}

export const languages: string[] = [
  'English',
  'Japanese',
  'Chinese',
  'other',
] as const;

export const CardType = ['word', 'mean', 'example', 'other'] as const;

export interface CardContent {
  text?: string;
  image?: string;
  sound?: string;
  lanuage?: (typeof languages)[number];
  index?: number;
}

// * this is the blueprint of desk information
export interface IDeskInformation {
  deskName?: string;
  deskDescription?: string;
  deskThumbnail?: string;
  deskIcon?: string;
  deskIsPublic?: true;
  deskId?: string;
}

export type CustomNode = {
  index?: number;
  [key: string]: unknown; // Index signature to satisfy Record<string, unknown>
} & CardContent;

export type CustomtNodeType = NodeFlow<CustomNode, (typeof CardType)[number]>;

export interface NewDeskType {
  deskInformation: IDeskInformation;
  reoderCards: ReoderVocabCardItem[];
  // currentReoderCard?: ReoderVocabCardItem;
  currentReoderCardIndex?: string;
  allNodes: CustomtNodeType[];
  exampleLimitNumber: number;
  edges: Edge[];
}

const initialState: NewDeskType = {
  reoderCards: [],
  edges: [],
  deskInformation: { deskIsPublic: true },
  exampleLimitNumber: 2,
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

export const NewDeskProtoSlice = createSlice({
  initialState,
  name: 'newDeskProtoSlice',
  reducers: {
    setReoderVocabCard: (
      state,
      payload: PayloadAction<ReoderVocabCardItem[]>
    ) => {
      state.reoderCards && (state.reoderCards = payload.payload);
    },
    initNewReorderCard: (state, payload: PayloadAction<Flashcard>) => {
      state.reoderCards.push({
        id: payload.payload.id,
      });

      state.currentReoderCardIndex = payload.payload.id;
    },
    setNewDeskInformation: (
      state,
      payload: PayloadAction<NewDeskType['deskInformation']>
    ) => {
      state.deskInformation = payload.payload;
    },

    // /**
    //  *
    //  * @param id
    //  */
    addReorderVocabCard: (state) => {
      state.reoderCards.push({ id: v4(), word: {} });

      state.currentReoderCardIndex =
        state.reoderCards[state.reoderCards.length - 1].id;
    },
    removReoderVocabCard: (
      state,
      payload: PayloadAction<ReoderVocabCardItem['id']>
    ) => {
      state.reoderCards &&
        lodash.remove(state.reoderCards, function (card) {
          return card.id === payload.payload;
        });

      if (
        state.currentReoderCardIndex === payload.payload ||
        state.reoderCards.length === 0
      ) {
        state.currentReoderCardIndex = undefined;
        state.allNodes = [];
        state.edges = [];
      }
    },
    onReoderVocabCardItemChange: (
      state,
      payload: PayloadAction<ReoderVocabCardItem>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === payload.payload.id;
        }
      );

      if (currentCardItemIndex >= 0) {
        state.reoderCards[currentCardItemIndex] = payload.payload;
      }
    },
    onReoderVocabCardItemFrontChange: (
      state,
      payload: PayloadAction<Pick<ReoderVocabCardItem, 'id' | 'word'>>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === payload.payload.id;
        }
      );

      if (currentCardItemIndex >= 0) {
        state.reoderCards[currentCardItemIndex] = {
          ...state.reoderCards[currentCardItemIndex],
          word: payload.payload.word,
        };
      }
    },
    onReoderVocabCardItemBackChange: (
      state,
      payload: PayloadAction<Pick<ReoderVocabCardItem, 'id' | 'mean'>>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === payload.payload.id;
        }
      );

      if (currentCardItemIndex >= 0) {
        state.reoderCards[currentCardItemIndex] = {
          ...state.reoderCards[currentCardItemIndex],
          mean: payload.payload.mean,
        };
      }
    },
    updateReoderCarditem: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: CardType;
        data: CardContent;
        id: ReoderVocabCardItem['id'];
      }>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === payload.id;
        }
      );
      // IMPORTANT: only update when find the card with id
      if (currentCardItemIndex >= 0) {
        // * update the front card
        if (payload.type === 'front') {
          state.reoderCards[currentCardItemIndex].word = payload.data;
        }
        // * update the back card
        if (payload.type === 'back') {
          state.reoderCards[currentCardItemIndex].mean = payload.data;
        }
      }
    },
    setCurrentReoderVocabCardItem: (
      state,
      payload: PayloadAction<ReoderVocabCardItem['id']>
    ) => {
      state.currentReoderCardIndex = payload.payload;
    },

    addExampleToCurrentCardItem: (state, payload: PayloadAction<string>) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === state.currentReoderCardIndex;
        }
      );

      if (!state.reoderCards[currentCardItemIndex].examples) {
        state.reoderCards[currentCardItemIndex].examples = [];
      }

      if (
        currentCardItemIndex >= 0 &&
        state.reoderCards[currentCardItemIndex].examples &&
        state.reoderCards[currentCardItemIndex].examples?.length <
          state.exampleLimitNumber
      ) {
        !state.reoderCards[currentCardItemIndex].examples &&
          (state.reoderCards[currentCardItemIndex].examples = []);

        const newExample: CardContent = {
          index: state.reoderCards[currentCardItemIndex].examples.length,
          text: '',
        };
        state.reoderCards[currentCardItemIndex].examples.push(newExample);

        const newNode: CustomtNodeType = {
          id: `example-${newExample.index}`,
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
          data: newExample,
          type: 'example',
        };

        const newEdge: Edge = {
          id: v4(),
          source: state.allNodes[0].id,
          target: newNode.id,
          animated: true,
        };

        state.edges.push(newEdge);
        state.allNodes.push(newNode);
      }
    },

    addMeanToCurrentCardItem: (state, payload: PayloadAction<string>) => {
      const currentCardItemIndex = lodash.findIndex(
        state.reoderCards,
        function (o) {
          return o.id === state.currentReoderCardIndex;
        }
      );

      if (
        currentCardItemIndex >= 0 &&
        !state.reoderCards[currentCardItemIndex].mean
      ) {
        !state.reoderCards[currentCardItemIndex].examples &&
          (state.reoderCards[currentCardItemIndex].examples = []);
        const newMean: CardContent = {
          index: 0,
          text: '',
        };
        state.reoderCards[currentCardItemIndex].mean = newMean;
        const newNode: CustomtNodeType = {
          id: 'mean',
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
          data: newMean,
          type: 'mean',
        };

        const newEdge: Edge = {
          id: v4(),
          source: state.allNodes[0].id,
          target: newNode.id,
          animated: true,
        };

        state.edges.push(newEdge);
        state.allNodes.push(newNode);
      }
    },
    addNode: (state, { payload }: PayloadAction<CustomtNodeType['type']>) => {
      for (let index = 0; index < state.reoderCards.length; index++) {
        const element = state.reoderCards[index];

        !state.reoderCards[index].examples &&
          (state.reoderCards[index].examples = []);

        if (element.id === state.currentReoderCardIndex) {
          // * check if the mean node is already existing
          if (payload === 'mean' && element.mean) {
            break;
          } else {
            state.reoderCards[index].mean = {
              index: 0,
            };
            const newNode: CustomtNodeType = {
              id: 'mean',
              position: {
                x:
                  state.allNodes.length >= 2
                    ? state.allNodes[state.allNodes.length - 1].position.x
                    : state.allNodes[0].measured?.width! * 2,
                y:
                  state.allNodes.length >= 2
                    ? state.allNodes[state.allNodes.length - 1].position.y +
                      state.allNodes[state.allNodes.length - 1].measured
                        ?.height! +
                      100
                    : 0,
              },
              dragHandle: '.drag-handle__custom',
              data: { index: 0 },
              type: payload,
            };

            const newEdge: Edge = {
              id: v4(),
              source: state.allNodes[0].id,
              target: newNode.id,
              animated: true,
            };

            state.edges.push(newEdge);
            state.allNodes.push(newNode);
          }

          if (payload === 'example') {
            state.reoderCards[index].examples?.push({
              index: state.reoderCards[index].examples?.length,
            });
            const newNode: CustomtNodeType = {
              id: `example-${state.reoderCards[index].examples?.length}`,
              position: {
                x:
                  state.allNodes.length >= 2
                    ? state.allNodes[state.allNodes.length - 1].position.x
                    : state.allNodes[0].measured?.width! * 2,
                y:
                  state.allNodes.length >= 2
                    ? state.allNodes[state.allNodes.length - 1].position.y +
                      state.allNodes[state.allNodes.length - 1].measured
                        ?.height! +
                      100
                    : 0,
              },
              dragHandle: '.drag-handle__custom',
              data: { index: state.reoderCards[index].examples?.length },
              type: payload,
            };

            const newEdge: Edge = {
              id: v4(),
              source: state.allNodes[0].id,
              target: newNode.id,
              animated: true,
            };

            state.edges.push(newEdge);
            state.allNodes.push(newNode);
          }

          break;
        }
      }
    },
    initNode: (state) => {
      state.allNodes = [
        {
          id: 'front',
          position: { x: 0, y: 0 },
          data: { index: 0 },
          type: 'word',
          dragHandle: '.drag-handle__custom',
        },
      ];
      state.edges = [];
    },
    initNodeFromVocalList: (state, payload: PayloadAction<string>) => {
      const vocalCard = lodash.find(state.reoderCards, function (o) {
        return o.id === payload.payload;
      });
      // * init the node list
      state.allNodes = [];
      if (vocalCard) {
        if (!vocalCard.word) {
          vocalCard.word = {
            text: '',
          };
        }
        // * init front node
        state.allNodes.push({
          id: 'front',
          data: vocalCard.word ? vocalCard.word : {},
          position: { x: 0, y: 0 },
          type: 'word',
          measured: { width: 442, height: 168 },
          dragHandle: '.drag-handle__custom',
        });

        // * init meaning node
        vocalCard.mean &&
          state.allNodes.push({
            id: 'meaning',
            position: {
              x:
                state.allNodes.length >= 2
                  ? state.allNodes[state.allNodes.length - 1].position.x
                  : state.allNodes[0].measured?.width! * 2,
              y:
                state.allNodes.length >= 2
                  ? state.allNodes[state.allNodes.length - 1].position.y +
                    state.allNodes[state.allNodes.length - 1].measured
                      ?.height! +
                    100
                  : 0,
            },
            dragHandle: '.drag-handle__custom',
            data: vocalCard.mean ? vocalCard.mean : {},
            measured: { width: 442, height: 168 },
            type: 'mean',
          });

        // * init example node
        vocalCard.examples?.map((item, index) => {
          state.allNodes.push({
            id: `example-${index}`,
            position: {
              x:
                state.allNodes.length >= 2
                  ? state.allNodes[state.allNodes.length - 1].position.x
                  : state.allNodes[0].measured?.width! * 2,
              y:
                state.allNodes.length >= 2
                  ? state.allNodes[state.allNodes.length - 1].position.y +
                    state.allNodes[state.allNodes.length - 1].measured
                      ?.height! +
                    100
                  : 0,
            },
            dragHandle: '.drag-handle__custom',
            data: item,
            measured: { width: 442, height: 168 },
            type: 'example',
          });
        });

        // * init connect
        state.edges = [];
        for (let i = 1; i < state.allNodes.length; i++) {
          const frontNode = state.allNodes[0];
          const currNode = state.allNodes[i];
          state.edges.push({
            id: `${frontNode.id}-${currNode.id}`,
            source: frontNode.id,
            target: currNode.id,
            animated: true,
          });
        }
      }
    },
    deleteNode: (state, payload: PayloadAction<String>) => {
      state.allNodes &&
        lodash.remove(state.allNodes, function (node) {
          return node.id === payload.payload;
        });
      state.edges &&
        lodash.remove(state.edges, function (edge) {
          return (
            edge.target === payload.payload || edge.source === payload.payload
          );
        });
    },
    onNodesChange: (state, payload) => {
      state.allNodes = applyNodeChanges(payload.payload, state.allNodes);
    },
    onNodeContentsChange: (
      state,
      { payload }: PayloadAction<Pick<CustomtNodeType, 'data' | 'type'>>
    ) => {
      // * get the current card in the list of reorder card
      const currentVocabCardIndex = lodash.findIndex(
        state.reoderCards,
        function (card) {
          return card.id === state.currentReoderCardIndex;
        }
      );

      if (currentVocabCardIndex < 0) {
        return;
      }

      switch (payload.type) {
        case 'word':
          state.reoderCards &&
            (state.reoderCards[currentVocabCardIndex].word = {
              ...state.reoderCards[currentVocabCardIndex].word,
              ...payload.data,
            });
          break;

        case 'mean':
          state.reoderCards &&
            (state.reoderCards[currentVocabCardIndex].mean = {
              ...state.reoderCards[currentVocabCardIndex].mean,
              text: payload.data.text,
            });
          break;

        case 'example':
          if (
            state.reoderCards &&
            state.reoderCards[currentVocabCardIndex].examples
          ) {
            for (
              let index = 0;
              index < state.reoderCards[currentVocabCardIndex].examples.length;
              index++
            ) {
              const element =
                state.reoderCards[currentVocabCardIndex].examples[index];
              if (element.index === payload.data.index) {
                state.reoderCards[currentVocabCardIndex].examples[index] = {
                  ...state.reoderCards[currentVocabCardIndex].examples[index],
                  ...payload.data,
                };

                break;
              }
            }
          }

          break;

        default:
          break;
      }
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

export const {
  // setCurrentReoderVocabCard,
  addExampleToCurrentCardItem,
  //   addReorderVocabCard,
  removReoderVocabCard,
  setCurrentReoderVocabCardItem,
  setReoderVocabCard,
  onNodesChange,
  initNode,
  addNode,
  onEdgesChange,
  onConnect,
  setEdges,
  initNodeFromVocalList,
  deleteNode,
  onNodeContentsChange,
  addMeanToCurrentCardItem,
  onReoderVocabCardItemBackChange,
  onReoderVocabCardItemChange,
  updateReoderCarditem,
  onReoderVocabCardItemFrontChange,
  setNode,
  initNewReorderCard,
  setNewDeskInformation,
  addReorderVocabCard,
} = NewDeskProtoSlice.actions;

export default NewDeskProtoSlice.reducer;
