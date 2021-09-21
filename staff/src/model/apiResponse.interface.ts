export interface ServerResponse<T> {
	status: 'success' | 'fail';
	token?: string;
	data: T;
}
export interface DashboardData {
	totalLeads: number;
	newLeads: number;
	activeLeads: number;
	clientSupportLeads: number;
	bdmLeads: number;
	holdLeads: number;
	forwardedLeads: number;
}
