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
          investor_level: 'standard' | 'gold' | 'platinum';
          member_since: string;
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
          investor_level?: 'standard' | 'gold' | 'platinum';
          member_since?: string;
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
          investor_level?: 'standard' | 'gold' | 'platinum';
          member_since?: string;
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
      project_documents: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          file_url: string;
          document_type: 'pdf' | 'certificate' | 'legal' | 'financial' | 'other';
          issuer: string | null;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          file_url: string;
          document_type: 'pdf' | 'certificate' | 'legal' | 'financial' | 'other';
          issuer?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          file_url?: string;
          document_type?: 'pdf' | 'certificate' | 'legal' | 'financial' | 'other';
          issuer?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'project_documents_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          }
        ];
      };
      saved_projects: {
        Row: {
          telegram_id: string;
          project_id: string;
          created_at: string;
        };
        Insert: {
          telegram_id: string;
          project_id: string;
          created_at?: string;
        };
        Update: {
          telegram_id?: string;
          project_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'saved_projects_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'saved_projects_telegram_id_fkey';
            columns: ['telegram_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['telegram_id'];
          }
        ];
      };
      chat_messages: {
        Row: {
          id: string;
          telegram_id: string;
          role: 'user' | 'assistant';
          message: string;
          project_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          telegram_id: string;
          role: 'user' | 'assistant';
          message: string;
          project_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          telegram_id?: string;
          role?: 'user' | 'assistant';
          message?: string;
          project_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_messages_telegram_id_fkey';
            columns: ['telegram_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['telegram_id'];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          telegram_id: string;
          title: string;
          body: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          telegram_id: string;
          title: string;
          body?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          telegram_id?: string;
          title?: string;
          body?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_telegram_id_fkey';
            columns: ['telegram_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['telegram_id'];
          }
        ];
      };
      document_downloads: {
        Row: {
          id: string;
          telegram_id: string;
          document_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          telegram_id: string;
          document_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          telegram_id?: string;
          document_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'document_downloads_document_id_fkey';
            columns: ['document_id'];
            isOneToOne: false;
            referencedRelation: 'project_documents';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'document_downloads_telegram_id_fkey';
            columns: ['telegram_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['telegram_id'];
          }
        ];
      };
      featured_products: {
        Row: {
          id: string;
          title: string;
          category: 'marble_slabs' | 'granite_slabs' | 'souvenirs' | 'tiles' | 'other';
          price: number;
          currency: string;
          unit: string;
          image: string;
          description: string | null;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          category: 'marble_slabs' | 'granite_slabs' | 'souvenirs' | 'tiles' | 'other';
          price: number;
          currency?: string;
          unit: string;
          image: string;
          description?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: 'marble_slabs' | 'granite_slabs' | 'souvenirs' | 'tiles' | 'other';
          price?: number;
          currency?: string;
          unit?: string;
          image?: string;
          description?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          category: string;
          project_type: 'construction' | 'processing' | 'other';
          status: 'HOT' | 'NEW' | 'ACTIVE' | 'FUNDED';
          roi: number;
          payback: number;
          payback_years: number;
          expected_return: number;
          amount: number;
          investment_required: number;
          investment_raised: number;
          funding_percentage: number;
          spots_left: number | null;
          investors_count: number;
          image: string;
          images: string[];
          gallery_images: string[];
          highlight: boolean;
          description: string;
          location: string;
          risk_level: string;
          trust_level: 'verified_government' | 'verified_private' | 'pending_verification' | 'unverified';
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
          project_type?: 'construction' | 'processing' | 'other';
          status?: 'HOT' | 'NEW' | 'ACTIVE' | 'FUNDED';
          roi: number;
          payback: number;
          payback_years?: number;
          expected_return?: number;
          amount: number;
          investment_required?: number;
          investment_raised?: number;
          spots_left?: number | null;
          investors_count?: number;
          image: string;
          images?: string[];
          gallery_images?: string[];
          highlight?: boolean;
          description: string;
          location: string;
          risk_level: string;
          trust_level?: 'verified_government' | 'verified_private' | 'pending_verification' | 'unverified';
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
          project_type?: 'construction' | 'processing' | 'other';
          status?: 'HOT' | 'NEW' | 'ACTIVE' | 'FUNDED';
          roi?: number;
          payback?: number;
          payback_years?: number;
          expected_return?: number;
          amount?: number;
          investment_required?: number;
          investment_raised?: number;
          spots_left?: number | null;
          investors_count?: number;
          image?: string;
          images?: string[];
          gallery_images?: string[];
          highlight?: boolean;
          description?: string;
          location?: string;
          risk_level?: string;
          trust_level?: 'verified_government' | 'verified_private' | 'pending_verification' | 'unverified';
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
      hero_images: {
        Row: {
          id: string;
          title: string;
          image_url: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          image_url: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          title?: string;
          image_url?: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };
    };
}
