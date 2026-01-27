import { PCareBaseApi } from './base.js';

export class Kelompok extends PCareBaseApi {
	/**
	 * Get Club Prolanis
	 * GET /kelompok/club/{kodeJenisKelompok}
	 * Parameter 1: Kode Jenis Kelompok (01: Diabetes Melitus, 02: Hipertensi)
	 */
	async club(params: {
		/** Kode Jenis Kelompok (01: DM, 02: Hipertensi) */
		kodeJenisKelompok: string;
	}) {
		return this.send<{
			count: number;
			list: {
				clubId: number;
				jnsKelompok: { kdProgram: string; nmProgram: string };
				tglMulai: string;
				tglAkhir: string | null;
				alamat: string;
				nama: string;
				ketua_noHP: string;
				ketua_nama: string;
			}[];
		}>({
			name: this.name + 'Club',
			path: ['/kelompok/club/:kodeJenisKelompok', params],
			method: 'GET'
		});
	}

	/**
	 * Get Kegiatan Kelompok
	 * GET /kelompok/kegiatan/{bulan}
	 * Parameter 1: Bulan, format dd-mm-yyyy
	 */
	async kegiatan(params: {
		/** Bulan, format dd-mm-yyyy */
		bulan: string;
	}) {
		return this.send<{
			count: number;
			list: {
				eduId: string;
				clubProl: {
					clubId: number;
					jnsKelompok: { kdProgram: string; nmProgram: string };
					tglMulai: string;
					tglAkhir: string | null;
					alamat: string;
					nama: string;
					ketua_noHP: string;
					ketua_nama: string;
				};
				tglPelayanan: string;
				kegiatan: { nama: string; kode: string };
				kelompok: { nama: string; kode: string };
				materi: string;
				pembicara: string;
				lokasi: string;
				keterangan: string;
				biaya: number;
			}[];
		}>({
			name: this.name + 'Kegiatan',
			path: ['/kelompok/kegiatan/:bulan', params],
			method: 'GET'
		});
	}

	/**
	 * Get Peserta Kegiatan Kelompok
	 * GET /kelompok/peserta/{eduId}
	 * Parameter 1: eduId
	 */
	async peserta(params: {
		/** eduId */
		eduId: string;
	}) {
		return this.send<{
			count: number;
			list: {
				eduId: string;
				peserta: {
					noKartu: string;
					nama: string;
					hubunganKeluarga: string;
					sex: string;
					tglLahir: string;
					tglMulaiAktif: string;
					tglAkhirBerlaku: string;
					kdProviderPst: { kdProvider: string; nmProvider: string };
					kdProviderGigi: { kdProvider: string | null; nmProvider: string | null };
					jnsKelas: { nama: string; kode: string };
					jnsPeserta: { nama: string; kode: string };
					golDarah: string;
					noHP: string | null;
					noKTP: string;
					pstProl: string;
					pstPrb: string;
					aktif: boolean;
					ketAktif: string;
					asuransi: {
						kdAsuransi: string | null;
						nmAsuransi: string | null;
						noAsuransi: string | null;
						cob: boolean;
					};
					tunggakan: number;
				};
			}[];
		}>({
			name: this.name + 'Peserta',
			path: ['/kelompok/peserta/:eduId', params],
			method: 'GET'
		});
	}

	/**
	 * Add Kegiatan Kelompok
	 * POST /kelompok/kegiatan
	 * Content-Type: text/plain
	 */
	async addKegiatan(params: {
		eduId?: string | null;
		clubId: number;
		tglPelayanan: string;
		kdKegiatan: string;
		kdKelompok: string;
		materi: string;
		pembicara: string;
		lokasi: string;
		keterangan: string;
		biaya: number;
	}) {
		const data = {
			...params,
			clubId: Number(params.clubId),
			biaya: Number(params.biaya),
			eduId: params.eduId || null
		};
		return this.send<unknown>({
			name: this.name + 'AddKegiatan',
			path: '/kelompok/kegiatan',
			method: 'POST',
			data
		});
	}

	/**
	 * Add Peserta Kegiatan Kelompok
	 * POST /kelompok/peserta
	 * Content-Type: text/plain
	 */
	async addPeserta(params: {
		eduId: string;
		noKartu: string;
	}) {
		return this.send<unknown>({
			name: this.name + 'AddPeserta',
			path: '/kelompok/peserta',
			method: 'POST',
			data: params
		});
	}

	/**
	 * Delete Kegiatan Kelompok
	 * DELETE /kelompok/kegiatan/{eduId}
	 * Parameter 1: eduId
	 */
	async deleteKegiatan(params: {
		/** eduId */
		eduId: string;
	}) {
		return this.send<null>({
			name: this.name + 'DeleteKegiatan',
			path: ['/kelompok/kegiatan/:eduId', params],
			method: 'DELETE'
		});
	}

	/**
	 * Delete Peserta Kegiatan Kelompok
	 * DELETE /kelompok/peserta/{eduId}/{noKartu}
	 * Parameter 1: eduId, Parameter 2: Nomor Kartu Peserta
	 */
	async deletePeserta(params: {
		/** eduId */
		eduId: string;
		/** Nomor Kartu Peserta */
		noKartu: string;
	}) {
		return this.send<null>({
			name: this.name + 'DeletePeserta',
			path: ['/kelompok/peserta/:eduId/:noKartu', params],
			method: 'DELETE'
		});
	}
}
