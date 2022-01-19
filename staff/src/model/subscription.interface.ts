import { PackageDetails } from './package.interface';
import { IStaff } from './staff.interface';
import { User } from './user.interface';

export enum SubscriptionPackageType {
	TenantPackage = 'tenantPackage',
	PaymentLink = 'paymentLink',
	ConsultantFee = 'consultantFee',
}
export enum SubscriptionPaymentMode {
	Online = 'online',
	Cash = 'cash',
	Gateway = 'gateway',
}

export enum PaymentReviewStatus {
	NotSent = 'not-sent',
	Sent = 'sent',
	Received = 'received',
}

// paymentReviewStatus: {
// 	type: String,
// 	enum: ['not-sent', 'sent', 'received'],
// 	default: 'not-sent',
// },
// paymentReview: {
// 	type: String,
// },
// paymentRating: {
// 	type: Number,
// },

export interface Subscription {
	id: string;
	mainAmount: number;
	paidAmount: number;
	totalPropertyAllowed: number;
	remainingProperties: number;
	subscriptionNumber: number;
	user: User;
	packageType: SubscriptionPackageType;
	package: string;
	packageId: PackageDetails;
	orderId: string;
	paymentId: string;
	createdAt: Date;
	updatedAt: Date;
	dealBy: null | IStaff;
	paymentReviewStatus: PaymentReviewStatus;
	paymentReview: string;
	paymentRating: number;
	paymentMode: SubscriptionPaymentMode;
	name?: string;
	email?: string;
	number?: string;
}
