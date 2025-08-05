export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      agent_interactions: {
        Row: {
          agent_type: string | null
          content: string | null
          id: string
          interaction_type: string | null
          payload: Json | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          agent_type?: string | null
          content?: string | null
          id?: string
          interaction_type?: string | null
          payload?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          agent_type?: string | null
          content?: string | null
          id?: string
          interaction_type?: string | null
          payload?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "agent_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          corners: number | null
          data_coverage_level: string | null
          def_line_breaks_around: number | null
          def_line_breaks_attempted: number | null
          def_line_breaks_over: number | null
          def_line_breaks_through: number | null
          dribble_success_rate: number | null
          fouls_committed: number | null
          free_kicks: number | null
          game_mode: string | null
          id: string
          is_ranked: boolean | null
          match_type: string | null
          offsides: number | null
          pass_accuracy: number | null
          passes_attempted: number | null
          penalty_kicks: number | null
          raw_json: Json | null
          red_cards: number | null
          score_opponent: number | null
          score_user: number | null
          shot_accuracy: number | null
          shots_total: number | null
          source_agent: string | null
          source_image_url: string | null
          tackle_success_rate: number | null
          tackles_total: number | null
          timestamp: string | null
          user_id: string | null
          yellow_cards: number | null
        }
        Insert: {
          corners?: number | null
          data_coverage_level?: string | null
          def_line_breaks_around?: number | null
          def_line_breaks_attempted?: number | null
          def_line_breaks_over?: number | null
          def_line_breaks_through?: number | null
          dribble_success_rate?: number | null
          fouls_committed?: number | null
          free_kicks?: number | null
          game_mode?: string | null
          id?: string
          is_ranked?: boolean | null
          match_type?: string | null
          offsides?: number | null
          pass_accuracy?: number | null
          passes_attempted?: number | null
          penalty_kicks?: number | null
          raw_json?: Json | null
          red_cards?: number | null
          score_opponent?: number | null
          score_user?: number | null
          shot_accuracy?: number | null
          shots_total?: number | null
          source_agent?: string | null
          source_image_url?: string | null
          tackle_success_rate?: number | null
          tackles_total?: number | null
          timestamp?: string | null
          user_id?: string | null
          yellow_cards?: number | null
        }
        Update: {
          corners?: number | null
          data_coverage_level?: string | null
          def_line_breaks_around?: number | null
          def_line_breaks_attempted?: number | null
          def_line_breaks_over?: number | null
          def_line_breaks_through?: number | null
          dribble_success_rate?: number | null
          fouls_committed?: number | null
          free_kicks?: number | null
          game_mode?: string | null
          id?: string
          is_ranked?: boolean | null
          match_type?: string | null
          offsides?: number | null
          pass_accuracy?: number | null
          passes_attempted?: number | null
          penalty_kicks?: number | null
          raw_json?: Json | null
          red_cards?: number | null
          score_opponent?: number | null
          score_user?: number | null
          shot_accuracy?: number | null
          shots_total?: number | null
          source_agent?: string | null
          source_image_url?: string | null
          tackle_success_rate?: number | null
          tackles_total?: number | null
          timestamp?: string | null
          user_id?: string | null
          yellow_cards?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      penalties: {
        Row: {
          card_type: string | null
          id: string
          imposed_at: string | null
          paid: boolean | null
          reason: string | null
          token_fine: number | null
          user_id: string | null
        }
        Insert: {
          card_type?: string | null
          id?: string
          imposed_at?: string | null
          paid?: boolean | null
          reason?: string | null
          token_fine?: number | null
          user_id?: string | null
        }
        Update: {
          card_type?: string | null
          id?: string
          imposed_at?: string | null
          paid?: boolean | null
          reason?: string | null
          token_fine?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "penalties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "penalties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_metrics: {
        Row: {
          custom_json: Json | null
          defensive_efficiency: number | null
          id: string
          match_id: string | null
          overall_performance: number | null
          pass_efficiency: number | null
          possession_efficiency: number | null
          shot_efficiency: number | null
          user_id: string | null
        }
        Insert: {
          custom_json?: Json | null
          defensive_efficiency?: number | null
          id?: string
          match_id?: string | null
          overall_performance?: number | null
          pass_efficiency?: number | null
          possession_efficiency?: number | null
          shot_efficiency?: number | null
          user_id?: string | null
        }
        Update: {
          custom_json?: Json | null
          defensive_efficiency?: number | null
          id?: string
          match_id?: string | null
          overall_performance?: number | null
          pass_efficiency?: number | null
          possession_efficiency?: number | null
          shot_efficiency?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processed_metrics_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "processed_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "processed_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      replay_uploads: {
        Row: {
          ai_difficulty_tag: string | null
          content_type: string | null
          id: string
          match_id: string | null
          reward_amount: number | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_difficulty_tag?: string | null
          content_type?: string | null
          id?: string
          match_id?: string | null
          reward_amount?: number | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_difficulty_tag?: string | null
          content_type?: string | null
          id?: string
          match_id?: string | null
          reward_amount?: number | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replay_uploads_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replay_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "replay_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      streaming_rewards: {
        Row: {
          id: string
          issued_at: string | null
          match_id: string | null
          reward_amount: number | null
          stream_url: string | null
          user_id: string | null
          validated: boolean | null
        }
        Insert: {
          id?: string
          issued_at?: string | null
          match_id?: string | null
          reward_amount?: number | null
          stream_url?: string | null
          user_id?: string | null
          validated?: boolean | null
        }
        Update: {
          id?: string
          issued_at?: string | null
          match_id?: string | null
          reward_amount?: number | null
          stream_url?: string | null
          user_id?: string | null
          validated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "streaming_rewards_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "streaming_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "streaming_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plans: {
        Row: {
          checkpoints: Json | null
          end_date: string | null
          id: string
          penalty_applied: boolean | null
          reward_issued: boolean | null
          stake_amount: number | null
          start_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          checkpoints?: Json | null
          end_date?: string | null
          id?: string
          penalty_applied?: boolean | null
          reward_issued?: boolean | null
          stake_amount?: number | null
          start_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          checkpoints?: Json | null
          end_date?: string | null
          id?: string
          penalty_applied?: boolean | null
          reward_issued?: boolean | null
          stake_amount?: number | null
          start_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "training_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_plans: {
        Row: {
          ended_at: string | null
          id: string
          plan: string
          source: string | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          ended_at?: string | null
          id?: string
          plan: string
          source?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          ended_at?: string | null
          id?: string
          plan?: string
          source?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats_summary: {
        Row: {
          avg_defensive_efficiency: number | null
          avg_overall_performance: number | null
          avg_pass_efficiency: number | null
          avg_possession_efficiency: number | null
          avg_shot_efficiency: number | null
          draws: number | null
          goals_conceded: number | null
          goals_scored: number | null
          last_match_at: string | null
          losses: number | null
          matches_played: number | null
          performance_trend_5: number | null
          user_id: string
          win_rate: number | null
          wins: number | null
        }
        Insert: {
          avg_defensive_efficiency?: number | null
          avg_overall_performance?: number | null
          avg_pass_efficiency?: number | null
          avg_possession_efficiency?: number | null
          avg_shot_efficiency?: number | null
          draws?: number | null
          goals_conceded?: number | null
          goals_scored?: number | null
          last_match_at?: string | null
          losses?: number | null
          matches_played?: number | null
          performance_trend_5?: number | null
          user_id: string
          win_rate?: number | null
          wins?: number | null
        }
        Update: {
          avg_defensive_efficiency?: number | null
          avg_overall_performance?: number | null
          avg_pass_efficiency?: number | null
          avg_possession_efficiency?: number | null
          avg_shot_efficiency?: number | null
          draws?: number | null
          goals_conceded?: number | null
          goals_scored?: number | null
          last_match_at?: string | null
          losses?: number | null
          matches_played?: number | null
          performance_trend_5?: number | null
          user_id?: string
          win_rate?: number | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_stats_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          discord_id: string | null
          id: string
          last_match_at: string | null
          matches_count: number | null
          platform_auth_id: string | null
          status: string | null
          subscription_status: string | null
          username: string
          whop_id: string | null
        }
        Insert: {
          created_at?: string | null
          discord_id?: string | null
          id?: string
          last_match_at?: string | null
          matches_count?: number | null
          platform_auth_id?: string | null
          status?: string | null
          subscription_status?: string | null
          username: string
          whop_id?: string | null
        }
        Update: {
          created_at?: string | null
          discord_id?: string | null
          id?: string
          last_match_at?: string | null
          matches_count?: number | null
          platform_auth_id?: string | null
          status?: string | null
          subscription_status?: string | null
          username?: string
          whop_id?: string | null
        }
        Relationships: []
      }
      weekly_rankings: {
        Row: {
          id: string
          rank_type: string | null
          rankings: Json | null
          week_start: string | null
        }
        Insert: {
          id?: string
          rank_type?: string | null
          rankings?: Json | null
          week_start?: string | null
        }
        Update: {
          id?: string
          rank_type?: string | null
          rankings?: Json | null
          week_start?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      coach_user_view: {
        Row: {
          avg_overall_performance: number | null
          last_match_at: string | null
          matches_played: number | null
          performance_trend_5: number | null
          user_id: string | null
          username: string | null
          win_rate: number | null
        }
        Relationships: []
      }
      rivalizer_matchmaking_view: {
        Row: {
          avg_overall_performance: number | null
          matches_played: number | null
          user_id: string | null
          win_rate: number | null
        }
        Insert: {
          avg_overall_performance?: number | null
          matches_played?: number | null
          user_id?: string | null
          win_rate?: number | null
        }
        Update: {
          avg_overall_performance?: number | null
          matches_played?: number | null
          user_id?: string | null
          win_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "coach_user_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_stats_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
