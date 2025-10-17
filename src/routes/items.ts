import { IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem, updateItem, deleteItem } from "../controller/items";
import { 
  sendSuccess, 
  sendMessage, 
  handleBadRequest, 
  handleNotFound, 
  handleMethodNotAllowed, 
  handleInvalidJson 
} from "../utils/response";

// https://localhost:4000/items
export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/items")) {
    
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;
    
    // GET all items
    if (req.method === "GET" && !id) {
      sendSuccess(res, getItems());
      return;
    }
    
    // GET item by ID
    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        handleBadRequest(res, "Invalid item ID");
        return;
      }
      const item = getItemById(id);
      if (!item) {
        handleNotFound(res, "Item not found");
        return;
      }
      sendSuccess(res, item);
      return;
    }
    
    // POST - Create new item
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const { name, quantity, purchasedStatus } = JSON.parse(body);
          
          if (!name || typeof name !== "string") {
            handleBadRequest(res, "Name is required and must be a string");
            return;
          }
          if (quantity === undefined || typeof quantity !== "number") {
            handleBadRequest(res, "Quantity is required and must be a number");
            return;
          }
          if (purchasedStatus === undefined || typeof purchasedStatus !== "boolean") {
            handleBadRequest(res, "Purchased status is required and must be a boolean");
            return;
          }
          
          const newItem = addItem(name, quantity, purchasedStatus);
          sendSuccess(res, newItem, 201);
          return;
        } catch (error) {
          handleInvalidJson(res);
        }
      });
      return;
    }
    
    // PUT - Update item
    if (req.method === "PUT" && id) {
      if (isNaN(id)) {
        handleBadRequest(res, "Invalid item ID");
        return;
      }
      let body = "";
      req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const { name, quantity, purchasedStatus } = JSON.parse(body);
          
          // Validate types if provided
          if (name !== undefined && typeof name !== "string") {
            handleBadRequest(res, "Name must be a string");
            return;
          }
          if (quantity !== undefined && typeof quantity !== "number") {
            handleBadRequest(res, "Quantity must be a number");
            return;
          }
          if (purchasedStatus !== undefined && typeof purchasedStatus !== "boolean") {
            handleBadRequest(res, "Purchased status must be a boolean");
            return;
          }
          
          // Check if at least one field is provided
          if (name === undefined && quantity === undefined && purchasedStatus === undefined) {
            handleBadRequest(res, "At least one field (name, quantity, or purchasedStatus) must be provided");
            return;
          }
          
          const updatedItem = updateItem(id, name, quantity, purchasedStatus);
          if (!updatedItem) {
            handleNotFound(res, "Item not found");
            return;
          }
          
          sendSuccess(res, updatedItem);
          return;
        } catch (error) {
          handleInvalidJson(res);
        }
      });
      return;
    }
    
    // DELETE - Delete item
    if (req.method === "DELETE" && id) {
      if (isNaN(id)) {
        handleBadRequest(res, "Invalid item ID");
        return;
      }
      const deleted = deleteItem(id);
      if (!deleted) {
        handleNotFound(res, "Item not found");
        return;
      }
      sendMessage(res, "Item deleted successfully");
      return;
    }
    
    handleMethodNotAllowed(res, "Method not allowed on /items");
    return;
  }
};
