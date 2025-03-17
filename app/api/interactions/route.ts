import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeMedicineInteractions } from '@/lib/openai'
import { formatDate } from '@/lib/utils';

const medicineSchema = z.object({
  medicines: z.array(z.string()).min(2, "Please enter at least two medicines"),
});

export async function POST(request: Request) {
  try {
    // Create a Supabase client
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to use this feature" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = medicineSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { medicines } = validation.data;
    
    // Get analysis from OpenAI with rate limiting
    const { result, error } = await analyzeMedicineInteractions(medicines, session.user.id, supabase);
    
    if (error) {
      return NextResponse.json(
        { error },
        { status: 429 }
      );
    }
    
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error in interactions API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
