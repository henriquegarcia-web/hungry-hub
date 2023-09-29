/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from 'moment'

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

export interface ICompanyLocation {
  companyCep: string
  companyAddress: string
  companyAddressNumber: string
  companyDistrict: string
  companyCity: string
}

export interface ICompanyContactMethods {
  companyPhone?: string
  companyWhatsapp?: string
  companyEmail?: string
  companyFacebook?: string
  companyInstagram?: string
  companyWebsite?: string
}

export interface ICompanySchedule {
  day: string
  openTime: moment.Moment
  closeTime: moment.Moment
}

export interface IProduct {
  productId: string
  productImage: string
  productName: string
  productPrice: number
  productDescription: string
}

export interface ICategory {
  id: string
  name: string
  products: IProduct[]
}

export interface ICompanyData {
  companyActive: boolean
  companyLogo?: string
  companyBanner?: string
  companyName?: string
  companyId?: string
  companyDescription?: string
  companyLocation?: ICompanyLocation
  companyContacts?: ICompanyContactMethods
  companySchedules?: ICompanySchedule[]
  companyMenu?: ICategory[]
}

export interface IUserData {
  adminId: string
  adminName: string
  adminEmail: string
  adminPhone: string
  adminRegisteredAt: number
  adminSubscription?: Subscription
  adminCompanyInfo?: ICompanyData
}

// export interface ISigninAdmin extends ISigninUser {}
