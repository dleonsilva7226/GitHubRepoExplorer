import { SupabaseClient } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import { AddFavoriteRepoRequest } from "../interfaces/types";

export const addUserFavRepo = async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient): Promise<void> => {
  try {
    console.log("Received request to add favorite repo");
    const body: AddFavoriteRepoRequest = req.body
    console.log("Request body:", body);
    const { githubRepoId, name, description, starCount, language, repoUrl } = body
    const userId: number | undefined = req.user?.user.id
    console.log("User ID from token:", userId);

    // Validate input
    if (
      !githubRepoId || typeof githubRepoId !== "number" ||
      !name || typeof name !== "string" ||
      starCount === undefined || starCount === null || typeof starCount !== "number" ||
      !repoUrl || typeof repoUrl !== "string" || !userId
    ) {
      console.error("Validation failed:", { githubRepoId, name, starCount, repoUrl, userId, hasDescription: !!description, hasLanguage: !!language });
      res.status(400).json({
        success: false,
        message: "Missing required fields: userId, githubRepoId, name, starCount, or repoUrl",
      })
      return
    }
    
    // Description and language are optional, but ensure they're strings
    const safeDescription = description || '';
    const safeLanguage = language || '';

    // Check if the repository already exists for the user
    const { data: existingRepo, error: checkError } = await supabase
      .from("FavoriteRepo") // use "FavoriteRepo" if table is capitalized
      .select("*")
      .eq("userId", userId)
      .eq("githubRepoId", githubRepoId)
      .maybeSingle()

    if (checkError) {
      throw checkError
    }

    if (existingRepo) {
      res.status(409).json({
        success: false,
        message: "Repository already exists in favorites",
      })
      return
    }

    // Insert the new favorite repo
    console.log("Inserting favorite repo:", { userId, githubRepoId, name, description: safeDescription, starCount, language: safeLanguage, repoUrl });
    const { error: insertError } = await supabase
      .from("FavoriteRepo")
      .insert([
        {
          userId,
          githubRepoId,
          name,
          description: safeDescription,
          starCount,
          language: safeLanguage,
          repoUrl,
        },
      ])

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw insertError
    }
    
    console.log("Successfully inserted favorite repo");

    // After successful insert, fetch all favorites to return to frontend
    // Frontend expects an array of repos, not just a success message
    const { data: updatedFavorites, error: fetchError } = await supabase
      .from("FavoriteRepo")
      .select("id, name, description, starCount, repoUrl, language, githubRepoId")
      .eq("userId", userId)

    if (fetchError) {
      throw fetchError
    }

    res.status(200).json(updatedFavorites || [])
  } catch (error: any) {
    console.error("Error adding favorite repository:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    })
  }
}