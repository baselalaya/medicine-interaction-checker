export interface User {
  id: string;
  email: string;
}

export interface InteractionResult {
  id?: string;
  medicines: string[];
  result: string;
  created_at?: string;
}

export type Database = {
  public: {
    Tables: {
      ai_requests: {
        Row: {
          id: string;
          user_id: string;
          medicines: string[];
          result: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medicines: string[];
          result: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          medicines?: string[];
          result?: string;
          created_at?: string;
        };
      };
    };
  };
};
