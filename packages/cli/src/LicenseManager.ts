import { LICENSE_QUOTAS, UNLIMITED_LICENSE_QUOTA } from './constants';

export class LicenseManager {
	constructor(e: any) {}

	log(e: string, t: string): void {
		console.log(`[${t}] ${e}`);
	}

	isInitialized(): boolean {
		return true;
	}

	async initialize(): Promise<void> {
		return;
	}

	async reload(): Promise<void> {
		return;
	}

	reset(): void {
		return;
	}

	async computeDeviceFingerprint(): Promise<any> {
		return null;
	}

	async activate(e: any): Promise<void> {
		return;
	}

	async renew(): Promise<void> {
		return;
	}

	async _renew(
		options: { detachFloatingEntitlements?: boolean; cause?: string } = {},
	): Promise<void> {
		return;
	}

	hasCert(): boolean {
		return true;
	}

	isTerminated(): boolean {
		return false;
	}

	getExpiryDate(): Date {
		return new Date();
	}

	getTerminationDate(): Date {
		return new Date();
	}

	isValid(e: boolean = true): boolean {
		return true;
	}

	hasFeatureEnabled(e: string, t: boolean = true): boolean {
		return true;
	}

	hasFeatureDefined(e: string, t: boolean = true): boolean {
		return true;
	}

	hasQuotaLeft(e: string, t: number): boolean {
		return true;
	}

	getFeatureValue(e: string, t: boolean = true): any {
		let value = null;
		switch (e) {
			case 'planName':
				value = 'Demonstration';
				break;
			case LICENSE_QUOTAS.USERS_LIMIT:
			case LICENSE_QUOTAS.TRIGGER_LIMIT:
			case LICENSE_QUOTAS.VARIABLES_LIMIT:
			case LICENSE_QUOTAS.WORKFLOW_HISTORY_PRUNE_LIMIT:
			case LICENSE_QUOTAS.TEAM_PROJECT_LIMIT:
				value = UNLIMITED_LICENSE_QUOTA;
				break;
		}
		console.log({
			feature: e,
			value,
		});
		return value;
	}

	updateCurrentFeatures(): void {
		return;
	}

	getFeatures(): any {
		return {};
	}

	getCurrentEntitlements(): any[] {
		return [];
	}

	getManagementJwt(): string {
		return '';
	}

	getConsumerId(): string | undefined {
		return undefined;
	}

	isRenewalDue(): boolean {
		return false;
	}

	formatDuration(e: number): string {
		return `${e} seconds`;
	}

	toString(): string {
		return 'LicenseManager';
	}

	triggerOnFeatureChangeCallback(): void {
		return;
	}

	setTimerForNextEntitlementChange(): void {
		return;
	}

	async renewalCron(options: { force: boolean }): Promise<void> {
		return;
	}

	async initCert(): Promise<void> {
		return;
	}

	stringifyCertContainer(e: any): string {
		return JSON.stringify(e);
	}

	parseLicenseCertContainerStr(e: string): any {
		return JSON.parse(e);
	}

	parseLicenseKeyStr(e: string): any {
		return {};
	}

	validateLicenseKey(e: string): any {
		return {};
	}

	getIssuerCert(): string {
		return '';
	}

	async shutdown(): Promise<void> {
		return;
	}
}
