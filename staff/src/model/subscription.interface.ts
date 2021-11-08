import { IStaff } from './staff.interface';
import { User } from './user.interface';

export enum SubscriptionPackageType {
	TenantPackage = 'tenantPackage',
	PaymentLink = 'paymentLink',
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
	orderId: string;
	paymentId: string;
	createdAt: Date;
	updatedAt: Date;
	dealBy: null | IStaff;
	paymentReviewStatus: PaymentReviewStatus;
	paymentReview: string;
	paymentRating: number;
}
