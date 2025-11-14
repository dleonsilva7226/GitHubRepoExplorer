import { SupabaseClient } from '@supabase/supabase-js'
import { Request, Response, NextFunction } from 'express'

export const getUserFavRepoData = async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient): Promise<void> => {
  try {
    const userId: number | undefined = req.user?.user.id

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' })
      return
    }

    const { data: favorites, error } = await supabase
      .from('FavoriteRepo') // adjust to your actual table name
      .select('id, name, description, starCount, repoUrl, language, githubRepoId')
      .eq('userId', userId)

    if (error) {
      console.error('Supabase fetch error:', error)
      res.status(500).json({ message: 'Error fetching favorite repositories' })
      return
    }

    // Return empty array instead of 404 - frontend expects an array
    res.status(200).json(favorites || [])
  } catch (error) {
    console.error('Error fetching favorite repositories:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
