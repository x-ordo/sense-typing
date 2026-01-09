// src/types/order.ts
// Order-related type definitions

export interface Order {
  id: string
  order_number: string
  user_id: string | null
  email: string
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
  subtotal: number
  discount: number
  total: number
  currency: string
  payment_method: string | null
  payment_id: string | null
  payment_data: Record<string, unknown> | null
  billing_name: string | null
  billing_email: string | null
  billing_phone: string | null
  notes: string | null
  paid_at: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  font_id: string | null
  font_name: string
  foundry: string | null
  license_type: 'personal' | 'commercial' | 'enterprise'
  price: number
  created_at: string
}

export interface Download {
  id: string
  order_item_id: string
  user_id: string | null
  download_token: string
  download_count: number
  max_downloads: number
  expires_at: string | null
  last_downloaded_at: string | null
  created_at: string
}

export interface OrderWithItems extends Order {
  items: OrderItem[]
}

export interface OrderWithItemsAndDownloads extends OrderWithItems {
  downloads: Download[]
}
