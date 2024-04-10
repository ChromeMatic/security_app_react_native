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
      Account: {
        Row: {
          biometrics: boolean | null
          created_at: string
          edited_at: string | null
          id: string
          payment: string | null
        }
        Insert: {
          biometrics?: boolean | null
          created_at?: string
          edited_at?: string | null
          id?: string
          payment?: string | null
        }
        Update: {
          biometrics?: boolean | null
          created_at?: string
          edited_at?: string | null
          id?: string
          payment?: string | null
        }
        Relationships: []
      }
      Alarm: {
        Row: {
          alarm_status: boolean | null
          created_at: string
          edited_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          alarm_status?: boolean | null
          created_at?: string
          edited_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          alarm_status?: boolean | null
          created_at?: string
          edited_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Alarm_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
        ]
      }
      "SecurityComapanyInfo ": {
        Row: {
          compnay_name: string
          contact_info: string
          created_at: string
          edited_at: string | null
          id: string
        }
        Insert: {
          compnay_name: string
          contact_info: string
          created_at?: string
          edited_at?: string | null
          id?: string
        }
        Update: {
          compnay_name?: string
          contact_info?: string
          created_at?: string
          edited_at?: string | null
          id?: string
        }
        Relationships: []
      }
      user_location: {
        Row: {
          accuracy: number
          altitude: number
          altitudeAccuracy: number
          created_at: string
          heading: number
          id: string
          latitude: number
          longitude: number
          speed: number
          user_id: string
        }
        Insert: {
          accuracy: number
          altitude: number
          altitudeAccuracy: number
          created_at?: string
          heading: number
          id?: string
          latitude: number
          longitude: number
          speed: number
          user_id?: string
        }
        Update: {
          accuracy?: number
          altitude?: number
          altitudeAccuracy?: number
          created_at?: string
          heading?: number
          id?: string
          latitude?: number
          longitude?: number
          speed?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_location_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "UserAccount"
            referencedColumns: ["user_Id"]
          },
        ]
      }
      UserAccount: {
        Row: {
          created_at: string
          edited_at: string | null
          email_address: string
          frist_name: string
          id: string
          last_name: string
          user_Id: string
        }
        Insert: {
          created_at?: string
          edited_at?: string | null
          email_address: string
          frist_name: string
          id?: string
          last_name: string
          user_Id: string
        }
        Update: {
          created_at?: string
          edited_at?: string | null
          email_address?: string
          frist_name?: string
          id?: string
          last_name?: string
          user_Id?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
