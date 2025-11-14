import { Request, Response, NextFunction } from 'express'
import { LoginRequest } from "../interfaces/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SupabaseClient } from "@supabase/supabase-js";

export const loginUser = async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient): Promise<void> => {
  const { email, password } = req.body as LoginRequest;
  console.log(email)
  console.log(password)

  if (!email || !password) {
    res.status(400).json({ message: "Need to provide email or password" });
    return;
  }


  const { data } = await supabase.from("User").select('*')

  console.log(data)

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Email not properly formatted" });
    return;
  }

  const { data: userArray, error } = await supabase
    .from('User')
    .select('id, email, password')
    .eq('email', email)
    .limit(1); // Just get one

  if (error) {
    console.error('Supabase error:', error);
    res.status(500).json({ success: false, message: "Database query failed" });
    return;
  }


  const currentUser = userArray?.[0];
  console.log(userArray)

  if (!currentUser) {
    res.status(403).json({
      success: false,
      message: "Email address not in database",
    });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      success: false,
      message: "JWT secret not set",
    });
    return;
  }

  const hashedPassword: string = currentUser.password;

  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: currentUser.id,
          email: currentUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(200).json({
        success: true,
        message: "Correct. User Login Happening Now",
        user: {
          id: currentUser.id,
          email: currentUser.email,
        },
        token,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Passwords do not match",
      });
    }
  } catch (err) {
    console.error("Error verifying password:", err);
    res.status(400).json({
      success: false,
      message: "Error occurred with password verification",
    });
  }
};
