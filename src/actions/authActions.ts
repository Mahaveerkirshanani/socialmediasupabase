// actions/authActions.ts
"use server"
import { createClient } from "@/lib/supabase/supabaseServer";
import { LoginFormValues, RegisterFormValues } from "../../types";

export async function signup(values: RegisterFormValues) {
  const supabase = createClient();



  if (!values.email || !values.password || !values.username || !values.confirmPassword) {
    return {
      status: 400,
      error: 'All fields are required.',
    };
  }

  try {
    // Check if username is already taken
    const { data: userData, error: findErr } = await supabase
      .from('users')
      .select('id')
      .eq('username', values.username);

    if (findErr) {
      return { status: 500, error: 'Internal server error' };
    }

    if (userData && userData.length > 0) {
      return {
        status: 400,
        error: 'User already exists',
      };
    }

    // Sign up the user
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
          name: values.name,
        },
      },
    });

    if (signUpError) {
      return { status: 400, error: signUpError.message };
    }

    // Automatically sign in the user after successful signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      return { status: 400, error: signInError.message };
    }

    return { status: 200, data: { email: values.email, name: values.name } };
  } catch (error) {
    return { status: 500, error: 'An unexpected error occurred.' };
  }
}


export async function login(values: LoginFormValues) {
  const supabase = createClient();

  // Validate required fields
  if (!values.email || !values.password) {
    return {
      status: 400,
      error: 'Email and password are required.',
    };
  }

  try {
    // Attempt to sign in the user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    // Check if there was an error during sign-in
    if (signInError) {
      return { status: 400, error: signInError.message };
    }

    // Successfully signed in
    return { status: 200, data: signInData };
  } catch (error) {
    // Handle unexpected errors
    return { status: 500, error: 'An unexpected error occurred during login.' };
  }
}


