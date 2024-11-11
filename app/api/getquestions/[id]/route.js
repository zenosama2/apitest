// app/api/mcqs/[id]/route.js
import { aMCQ, bMCQ, cMCQ, dMCQ, masterMCQ } from '@/app/models/mcq'

// Define the models array
const allModels = [aMCQ, bMCQ, cMCQ, dMCQ, masterMCQ];

export async function GET(request, { params }) {
  try {
    const { id, additionalId } = params;
    
    console.log("Fetching collection with ID:", id);
    console.log("Additional ID (if any):", additionalId);

    // Find the first collection
    let collection = null;
    for (const Model of allModels) {
      try {
        collection = await Model.findById(id);
        if (collection) {
          break;
        }
      } catch (err) {
        continue;
      }
    }

    if (!collection) {
      return Response.json({ 
        message: "Collection not found",
        searchedId: id 
      }, { status: 404 });
    }

    let combinedQuestions = collection.questions;

    // If containsSelection is true and additionalId exists
    if (collection.containsSelection && additionalId) {
      let additionalCollection = null;
      for (const Model of allModels) {
        try {
          additionalCollection = await Model.findById(additionalId);
          if (additionalCollection) break;
        } catch (err) {
          continue;
        }
      }

      if (!additionalCollection) {
        return Response.json({ 
          message: "Additional collection not found",
          searchedId: additionalId 
        }, { status: 404 });
      }

      // Combine questions from both collections
      combinedQuestions = [
        ...collection.questions,
        ...additionalCollection.questions
      ];
    }

    return Response.json({
      message: "MCQs fetched successfully",
      mcqs: combinedQuestions,
      name: collection.collectionName,
      duration: collection.duration
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching MCQs:", error.message);
    console.error("Stack trace:", error.stack);
    
    return Response.json({
      message: "Internal Server Error",
      error: error.message,
      searchedId: params.id
    }, { status: 500 });
  }
}