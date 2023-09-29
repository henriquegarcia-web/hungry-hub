/* eslint-disable @typescript-eslint/no-explicit-any */

// ====================== TYPES ====================== //

type Subscription = {
  sessionId: string
  planId: string
  planType: string
  planStartDate: string
  planEndDate: string
  planDuration: string
}

// ==================== INTERFACES =================== //

export interface ISigninUser {
  adminEmail: string
  adminPassword: string
}

export interface ISignupUser {
  adminName: string
  adminEmail: string
  adminPhone: string
  adminPassword: string
}

export interface IUserData {
  adminId: string
  adminName: string
  adminEmail: string
  adminPhone: string
  adminRegisteredAt: number
  adminSubscription?: Subscription
}

export interface ICompanyData {
  companyId: string
  companyName: string
}

// export interface ISigninAdmin extends ISigninUser {}
