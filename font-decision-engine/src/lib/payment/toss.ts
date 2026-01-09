// src/lib/payment/toss.ts
// Toss Payments integration

export interface TossPaymentRequest {
  orderId: string
  orderName: string
  amount: number
  customerName?: string
  customerEmail?: string
  customerMobilePhone?: string
  successUrl: string
  failUrl: string
}

export interface TossPaymentConfirmRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export interface TossPaymentResponse {
  paymentKey: string
  orderId: string
  orderName: string
  status: 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'ABORTED' | 'EXPIRED'
  requestedAt: string
  approvedAt?: string
  totalAmount: number
  method: string
  receipt?: {
    url: string
  }
  card?: {
    company: string
    number: string
    installmentPlanMonths: number
    isInterestFree: boolean
    approveNo: string
    useCardPoint: boolean
    cardType: string
    ownerType: string
  }
  virtualAccount?: {
    accountNumber: string
    accountType: string
    bank: string
    customerName: string
    dueDate: string
    expired: boolean
  }
  transfer?: {
    bank: string
    settlementStatus: string
  }
  mobilePhone?: {
    carrier: string
    customerMobilePhone: string
    settlementStatus: string
  }
  easyPay?: {
    provider: string
    amount: number
    discountAmount: number
  }
}

// Toss Payments API base URL
const TOSS_API_URL = 'https://api.tosspayments.com/v1'

// Client key for frontend SDK
export function getTossClientKey(): string {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
  if (!clientKey) {
    // Return test key for development
    return 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
  }
  return clientKey
}

// Secret key for server-side API calls
function getTossSecretKey(): string {
  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    // Return test key for development
    return 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'
  }
  return secretKey
}

// Generate authorization header for Toss API
function getAuthHeader(): string {
  const secretKey = getTossSecretKey()
  const encoded = Buffer.from(`${secretKey}:`).toString('base64')
  return `Basic ${encoded}`
}

// Confirm payment (server-side)
export async function confirmTossPayment(
  request: TossPaymentConfirmRequest
): Promise<{ success: boolean; data?: TossPaymentResponse; error?: string }> {
  try {
    const response = await fetch(`${TOSS_API_URL}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey: request.paymentKey,
        orderId: request.orderId,
        amount: request.amount,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || '결제 승인에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: data as TossPaymentResponse,
    }
  } catch (error) {
    console.error('Toss payment confirmation error:', error)
    return {
      success: false,
      error: '결제 처리 중 오류가 발생했습니다.',
    }
  }
}

// Get payment details (server-side)
export async function getTossPayment(
  paymentKey: string
): Promise<{ success: boolean; data?: TossPaymentResponse; error?: string }> {
  try {
    const response = await fetch(`${TOSS_API_URL}/payments/${paymentKey}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || '결제 정보를 가져올 수 없습니다.',
      }
    }

    return {
      success: true,
      data: data as TossPaymentResponse,
    }
  } catch (error) {
    console.error('Toss payment fetch error:', error)
    return {
      success: false,
      error: '결제 정보 조회 중 오류가 발생했습니다.',
    }
  }
}

// Cancel payment (server-side)
export async function cancelTossPayment(
  paymentKey: string,
  cancelReason: string
): Promise<{ success: boolean; data?: TossPaymentResponse; error?: string }> {
  try {
    const response = await fetch(`${TOSS_API_URL}/payments/${paymentKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cancelReason,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || '결제 취소에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: data as TossPaymentResponse,
    }
  } catch (error) {
    console.error('Toss payment cancellation error:', error)
    return {
      success: false,
      error: '결제 취소 중 오류가 발생했습니다.',
    }
  }
}

// Generate a unique order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 8)
  return `ORD-${timestamp}-${randomPart}`.toUpperCase()
}

// Format amount for display
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}
