import { IStaff } from './staff.interface';
import { User } from './user.interface';

export enum SubscriptionPackageType {
	TenantPackage = 'tenantPackage',
	PaymentLink = 'paymentLink',
}

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
}
