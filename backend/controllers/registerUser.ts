import { NextFunction, Request, Response } from 'express';
import { RegisterRequest } from "../interfaces/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SupabaseClient } from "@supabase/supabase-js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
  supabase: SupabaseClient
): Promise<void> => {
  const { email, password }: RegisterRequest = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email or password missing"
    });
    return;
  }

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Email not properly formatted"
    });
    return;
  }

  // Check if user already exists
  const { data: existingUser, error: existingError } = await supabase
    .from('User')
    .select('id, email')
    .eq('email', email)
    .limit(1);

  if (existingError) {
    console.error("Supabase error:", existingError);
    res.status(500).json({ success: false, message: "Database query failed" });
    return;
  }

  if (existingUser && existingUser.length > 0) {
    res.status(403).json({
      success: false,
      message: "User email already in database"
    });
    return;
  }

  // Hash password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  // Create new user
  const { data: insertedUser, error: insertError } = await supabase
    .from('User')
    .insert([{ email, password: hash }])
    .select('id, email') // only return what you need
    .single();

  if (insertError || !insertedUser) {
    console.error("Supabase insert error:", insertError);
    res.status(500).json({
      success: false,
      message: "Failed to register new user"
    });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      success: false,
      message: "JWT secret not set"
    });
    return;
  }

  const token = jwt.sign(
    {
      id: insertedUser.id,
      email: insertedUser.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: insertedUser.id,
      email: insertedUser.email
    },
    token
  });
};
