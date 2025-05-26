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
      alerts: {
        Row: {
          buyer_found: string | null
          id: number
          market_price: number | null
          produce_id: number | null
          status: string | null
        }
        Insert: {
          buyer_found?: string | null
          id?: number
          market_price?: number | null
          produce_id?: number | null
          status?: string | null
        }
        Update: {
          buyer_found?: string | null
          id?: number
          market_price?: number | null
          produce_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_produce_id_fkey"
            columns: ["produce_id"]
            isOneToOne: false
            referencedRelation: "produce"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: number
          joined_at: string | null
          name: string | null
          phone: string | null
          points: number | null
        }
        Insert: {
          id?: number
          joined_at?: string | null
          name?: string | null
          phone?: string | null
          points?: number | null
        }
        Update: {
          id?: number
          joined_at?: string | null
          name?: string | null
          phone?: string | null
          points?: number | null
        }
        Relationships: []
      }
      farmers: {
        Row: {
          created_at: string | null
          farm_name: string | null
          id: number
          location: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          farm_name?: string | null
          id?: number
          location?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          farm_name?: string | null
          id?: number
          location?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "farmers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      produce: {
        Row: {
          crop_name: string | null
          date_uploaded: string | null
          farmer_id: number | null
          id: number
          image_url: string | null
          location: string | null
          quantity: number | null
        }
        Insert: {
          crop_name?: string | null
          date_uploaded?: string | null
          farmer_id?: number | null
          id?: number
          image_url?: string | null
          location?: string | null
          quantity?: number | null
        }
        Update: {
          crop_name?: string | null
          date_uploaded?: string | null
          farmer_id?: number | null
          id?: number
          image_url?: string | null
          location?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "produce_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
