import { NextFunction, Request, Response } from "express"
import { ErrorResponse } from "../interfaces/types"
import { SupabaseClient } from "@supabase/supabase-js"

export const deleteUserFavRepo = async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient): Promise<void> => {
  try {
    // Get githubRepoId from route params (not body)
    const githubRepoId = parseInt(req.params.id, 10)
    const userId = req.user?.user.id

    if (
      !userId || typeof userId !== "number" ||
      !githubRepoId || isNaN(githubRepoId)
    ) {
      const missingIdErrorResponse: ErrorResponse = {
        success: false,
        message: "Missing githubRepoId or userId",
      }
      res.status(400).json(missingIdErrorResponse)
      return
    }

    // Check if the repo exists and is owned by the user
    // Use githubRepoId field (not the database id) to match the route param
    const { data: existingRepo, error: findError } = await supabase
      .from("FavoriteRepo")
      .select("*")
      .eq("userId", userId)
      .eq("githubRepoId", githubRepoId)
      .maybeSingle()

    if (findError) {
      console.error("Error checking repo existence:", findError)
      throw findError
    }

    if (!existingRepo) {
      res.status(404).json({
        success: false,
        message: "Non-existent repo ID or user does not own favorite repo",
      })
      return
    }

    // Attempt deletion - delete by githubRepoId and userId
    const { error: deleteError } = await supabase
      .from("FavoriteRepo")
      .delete()
      .eq("userId", userId)
      .eq("githubRepoId", githubRepoId)

    if (deleteError) {
      res.status(500).json({
        success: false,
        message: "Deletion of favorite repository failed.",
      })
      return
    }

    // After successful deletion, fetch all remaining favorites to return to frontend
    // Frontend expects an array of repos, not just a success message
    const { data: updatedFavorites, error: fetchError } = await supabase
      .from("FavoriteRepo")
      .select("id, name, description, starCount, repoUrl, language, githubRepoId")
      .eq("userId", userId)

    if (fetchError) {
      console.error("Error fetching updated favorites:", fetchError)
      // Still return success, but with empty array
      res.status(200).json([])
      return
    }

    // Return updated favorites array
    res.status(200).json(updatedFavorites || [])
  } catch (error) {
    console.error("Error deleting favorite repository:", error)
    res.status(500).json({ message: "Internal server error." })
  }
}
