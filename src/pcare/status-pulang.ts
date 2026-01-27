import { PCareBaseApi } from './base.js';

export class StatusPulang extends PCareBaseApi {
	/**
	 * Get Status Pulang
	 * GET /statuspulang/rawatInap/{rawatInap}
	 * Parameter 1: Jika rawat inap maka diisi true, sebaliknya diisi false
	 */
	async rawatInap(params: {
		/** Jika rawat inap maka diisi true, sebaliknya diisi false */
		rawatInap: boolean | string;
	}) {
		const rawatInapValue = typeof params.rawatInap === 'string' ? params.rawatInap === 'true' : params.rawatInap;
		return this.send<{
			count: number;
			list: {
				kdStatusPulang: string;
				nmStatusPulang: string;
			}[];
		}>({
			name: this.name + 'RawatInap',
			path: ['/statuspulang/rawatInap/:rawatInap', { rawatInap: rawatInapValue ? 'true' : 'false' }],
			method: 'GET'
		});
	}
}
