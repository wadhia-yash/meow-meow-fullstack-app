// src/components/DocumentDashboard.tsx
import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DocumentData } from "../types/DocumentData";
import MeowMeowService from "../service/MeowMeowService";

const DocumentDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDocuments(items);
  };

  const getMeowMeows = async () => {
    try {
      setLoading(true);
      const _response = await MeowMeowService.getMeowMeows();
      if (!_response.ok) {
        return;
      }
      const _meowmeowData = await _response.json();
      console.log("meow meow", _meowmeowData);
      setDocuments(_meowmeowData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch("/data.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDocuments(data);
    //     setLoading(false);
    //   });
    getMeowMeows();
  }, []);

  const thumbnails: { [key in DocumentData["type"]]: string } = {
    "bank-draft": require("../assets/gif/cat-draft.gif"),
    "bill-of-lading": require("../assets/gif/cat-lading.gif"),
    invoice: require("../assets/gif/cat-invoice.gif"),
    "bank-draft-2": require("../assets/gif/cat-draft-2.gif"),
    "bill-of-lading-2": require("../assets/gif/cat-lading-2.gif"),
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollbar-custom mr-1 h-full overflow-y-auto py-12 max-sm:pt-8 md:py-24">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="document" type="group">
          {(provided) => (
            <div
              className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {documents.map((doc: DocumentData, index: number) => {
                return (
                  <Draggable
                    key={doc.type}
                    draggableId={doc.type}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="relative cursor-grab flex flex-col items-center justify-center overflow-hidden text-balance rounded-xl border bg-gray-50/50 px-4 py-6 text-center shadow hover:bg-gray-50 hover:shadow-inner dark:border-gray-800/70 dark:bg-gray-950/20 dark:hover:bg-gray-950/40 max-sm:px-4 sm:h-64 sm:pb-4 xl:pt-8"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {imageLoading[doc.type] && (
                          <div className="spinner">Loading...</div>
                        )}
                        <ModalImage
                          small={thumbnails[doc.type]}
                          large={thumbnails[doc.type]}
                          className="mb-2 aspect-square size-28 flex-none rounded-full object-cover sm:mb-6 cursor-pointer"
                          alt={doc.title}
                          hideDownload={true}
                          hideZoom={true}
                        />
                        <h3>{doc.title}</h3>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DocumentDashboard;
