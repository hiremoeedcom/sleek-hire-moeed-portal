export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          priority: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          subject: string
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          priority?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          subject: string
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          priority?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          subject?: string
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      estimates: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string | null
          description: string | null
          email: string
          estimated_cost_max: number
          estimated_cost_min: number
          features: string[] | null
          id: string
          name: string
          project_type: Database["public"]["Enums"]["project_type"]
          status: Database["public"]["Enums"]["estimate_status"] | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          estimated_cost_max: number
          estimated_cost_min: number
          features?: string[] | null
          id?: string
          name: string
          project_type: Database["public"]["Enums"]["project_type"]
          status?: Database["public"]["Enums"]["estimate_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          estimated_cost_max?: number
          estimated_cost_min?: number
          features?: string[] | null
          id?: string
          name?: string
          project_type?: Database["public"]["Enums"]["project_type"]
          status?: Database["public"]["Enums"]["estimate_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quotations: {
        Row: {
          amount: number
          contact_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          estimate_id: string | null
          id: string
          quote_number: string
          status: string | null
          title: string
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          amount: number
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate_id?: string | null
          id?: string
          quote_number: string
          status?: string | null
          title: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          amount?: number
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate_id?: string | null
          id?: string
          quote_number?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      contact_status:
        | "new"
        | "contacted"
        | "quoted"
        | "in_progress"
        | "completed"
        | "cancelled"
      estimate_status:
        | "pending"
        | "reviewed"
        | "quoted"
        | "accepted"
        | "rejected"
      project_type:
        | "website"
        | "webapp"
        | "mobile"
        | "fullstack"
        | "ecommerce"
        | "api"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_status: [
        "new",
        "contacted",
        "quoted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      estimate_status: [
        "pending",
        "reviewed",
        "quoted",
        "accepted",
        "rejected",
      ],
      project_type: [
        "website",
        "webapp",
        "mobile",
        "fullstack",
        "ecommerce",
        "api",
      ],
    },
  },
} as const
