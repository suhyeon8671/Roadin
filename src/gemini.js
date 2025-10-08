import { getGenerativeModel, getAI } from "firebase/ai";
import { app } from "./firebase";

// Initialize the AI service
const ai = getAI(app);

// Get the generative model
export const model = getGenerativeModel(ai, {
  model: "gemini-2.0-flash",
  location: "us-central1",
});
