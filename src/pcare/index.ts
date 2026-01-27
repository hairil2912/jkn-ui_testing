import { CachedApi } from '../base.js';
import { PCareBaseApi } from './base.js';
import { Alergi } from './alergi.js';
import { Dokter } from './dokter.js';
import { Kelompok } from './kelompok.js';
import { Kesadaran } from './kesadaran.js';
import { Kunjungan } from './kunjungan.js';
import { MCU } from './mcu.js';
import { Obat } from './obat.js';
import { Pendaftaran } from './pendaftaran.js';
import { Peserta } from './peserta.js';
import { Poli } from './poli.js';
import { Prognosa } from './prognosa.js';
import { Provider } from './provider.js';
import { Referensi } from './referensi.js';
import { Rujukan } from './rujukan.js';
import { Skrinning } from './skrinning.js';
import { Spesialis } from './spesialis.js';
import { StatusPulang } from './status-pulang.js';
import { Tindakan } from './tindakan.js';
import { SendOption } from '../fetcher.js';

type RequestOption = SendOption;

/**
 * Custom request untuk endpoint yang belum tersedia di submodul
 */
class CustomRequest extends PCareBaseApi {
	async request<T>(option: RequestOption) {
		return this.send<T>(option);
	}
}

export class PCare {
	private static instance: PCare | undefined;

	private constructor(private readonly cache: CachedApi) {}

	static getInstance(cache: CachedApi): PCare {
		if (!this.instance) {
			this.instance = new PCare(cache);
		}
		return this.instance;
	}

	get peserta() {
		return this.cache.get('pcare_peserta', Peserta);
	}

	get kunjungan() {
		return this.cache.get('pcare_kunjungan', Kunjungan);
	}

	get rujukan() {
		return this.cache.get('pcare_rujukan', Rujukan);
	}

	get obat() {
		return this.cache.get('pcare_obat', Obat);
	}

	get tindakan() {
		return this.cache.get('pcare_tindakan', Tindakan);
	}

	get referensi() {
		return this.cache.get('pcare_referensi', Referensi);
	}

	get dokter() {
		return this.cache.get('pcare_dokter', Dokter);
	}

	get kelompok() {
		return this.cache.get('pcare_kelompok', Kelompok);
	}

	get kesadaran() {
		return this.cache.get('pcare_kesadaran', Kesadaran);
	}

	get mcu() {
		return this.cache.get('pcare_mcu', MCU);
	}

	get pendaftaran() {
		return this.cache.get('pcare_pendaftaran', Pendaftaran);
	}

	get poli() {
		return this.cache.get('pcare_poli', Poli);
	}

	get provider() {
		return this.cache.get('pcare_provider', Provider);
	}

	get spesialis() {
		return this.cache.get('pcare_spesialis', Spesialis);
	}

	get statusPulang() {
		return this.cache.get('pcare_statusPulang', StatusPulang);
	}

	get alergi() {
		return this.cache.get('pcare_alergi', Alergi);
	}

	get prognosa() {
		return this.cache.get('pcare_prognosa', Prognosa);
	}

	get skrinning() {
		return this.cache.get('pcare_skrinning', Skrinning);
	}

	/**
	 * Custom request untuk endpoint yang belum tersedia di submodul
	 * Gunakan ini untuk request custom ke endpoint pcare yang spesifik
	 */
	get request() {
		return this.cache.get('pcare_request', CustomRequest);
	}
}
