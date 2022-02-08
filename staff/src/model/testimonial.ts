export interface ITestimonial {
	id: string;
	name: string;
	description: string;
	photo: string;
	status: 'active' | 'inactive';
	createdAt: Date;
	updatedAt: Date;
}

export type FetchTestimonialResponseData = {
	testimonials: ITestimonial[];
	totalDocs: number;
};
