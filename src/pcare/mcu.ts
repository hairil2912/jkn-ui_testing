import { PCareBaseApi } from './base.js';

export class MCU extends PCareBaseApi {
	/**
	 * Get Data MCU
	 * GET /MCU/kunjungan/{nomorKunjungan}
	 * Parameter 1: Nomor Kunjungan
	 */
	async kunjungan(params: {
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdMCU: number;
				noKunjungan: string;
				kdProvider: string;
				tglPelayanan: string;
				tekananDarahSistole: number;
				tekananDarahDiastole: number;
				radiologiFoto: string | null;
				darahRutinHemo: number;
				darahRutinLeu: number;
				darahRutinErit: number;
				darahRutinLaju: number;
				darahRutinHema: number;
				darahRutinTrom: number;
				lemakDarahHDL: number;
				lemakDarahLDL: number;
				lemakDarahChol: number;
				lemakDarahTrigli: number;
				gulaDarahSewaktu: number;
				gulaDarahPuasa: number;
				gulaDarahPostPrandial: number;
				gulaDarahHbA1c: number;
				fungsiHatiSGOT: number;
				fungsiHatiSGPT: number;
				fungsiHatiGamma: number;
				fungsiHatiProtKual: number;
				fungsiHatiAlbumin: number;
				fungsiGinjalCrea: number;
				fungsiGinjalUreum: number;
				fungsiGinjalAsam: number;
				fungsiJantungABI: number;
				fungsiJantungEKG: string | null;
				fungsiJantungEcho: string | null;
				funduskopi: string | null;
				pemeriksaanLain: string | null;
				keterangan: string | null;
			}[];
		}>({
			name: this.name + 'Kunjungan',
			path: ['/MCU/kunjungan/:nomorKunjungan', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data MCU
	 * POST /MCU
	 * Content-Type: text/plain
	 */
	async add(params: { request?: string } | Record<string, unknown>) {
		let data: Record<string, unknown>;
		if (typeof (params as { request?: string }).request === 'string') {
			try {
				data = JSON.parse((params as { request: string }).request) as Record<string, unknown>;
			} catch {
				throw new Error('Request Body (JSON) harus berupa JSON valid');
			}
		} else {
			data = params as Record<string, unknown>;
		}
		return this.send<unknown>({
			name: this.name + 'Add',
			path: '/MCU',
			method: 'POST',
			data
		});
	}

	/**
	 * Edit Data MCU
	 * PUT /MCU
	 * Content-Type: text/plain
	 */
	async edit(params: { request?: string } | Record<string, unknown>) {
		let data: Record<string, unknown>;
		if (typeof (params as { request?: string }).request === 'string') {
			try {
				data = JSON.parse((params as { request: string }).request) as Record<string, unknown>;
			} catch {
				throw new Error('Request Body (JSON) harus berupa JSON valid');
			}
		} else {
			data = params as Record<string, unknown>;
		}
		return this.send<unknown>({
			name: this.name + 'Edit',
			path: '/MCU',
			method: 'PUT',
			data
		});
	}

	/**
	 * Delete Data MCU
	 * DELETE /MCU/{kdMCU}/kunjungan/{nomorKunjungan}
	 * Parameter 1: Kode MCU
	 * Parameter 2: Nomor Kunjungan
	 */
	async delete(params: {
		/** Kode MCU */
		kdMCU: number | string;
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<null>({
			name: this.name + 'Delete',
			path: ['/MCU/:kdMCU/kunjungan/:nomorKunjungan', { kdMCU: Number(params.kdMCU), nomorKunjungan: params.nomorKunjungan }],
			method: 'DELETE'
		});
	}
}
