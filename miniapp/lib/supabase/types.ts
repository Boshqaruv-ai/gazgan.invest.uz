export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          telegram_id: string;
          first_name: string | null;
          last_name: string | null;
          username: string | null;
          language_code: string | null;
          photo_url: string | null;
          last_seen_at: string;
          created_at: string;
        };
        Insert: {
          telegram_id: string;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          language_code?: string | null;
          photo_url?: string | null;
          last_seen_at?: string;
          created_at?: string;
        };
        Update: {
          telegram_id?: string;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          language_code?: string | null;
          photo_url?: string | null;
          last_seen_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          telegram_id: string;
          project_id: string;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          telegram_id: string;
          project_id: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          telegram_id?: string;
          project_id?: string;
          message?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'leads_telegram_id_fkey';
            columns: ['telegram_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['telegram_id'];
          }
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          category: string;
          roi: number;
          payback: number;
          amount: number;
          image: string;
          highlight: boolean;
          description: string;
          location: string;
          risk_level: string;
          timeline: unknown;
          roi_breakdown: unknown;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          category: string;
          roi: number;
          payback: number;
          amount: number;
          image: string;
          highlight?: boolean;
          description: string;
          location: string;
          risk_level: string;
          timeline?: unknown;
          roi_breakdown?: unknown;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          roi?: number;
          payback?: number;
          amount?: number;
          image?: string;
          highlight?: boolean;
          description?: string;
          location?: string;
          risk_level?: string;
          timeline?: unknown;
          roi_breakdown?: unknown;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
